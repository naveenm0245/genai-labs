from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional
from services.chat.async_chat import async_chat
from services.metrics.metrics import calculate_quality_metrics
from services.experiments.experiment_service import (
    save_experiment,
    get_experiments_by_user,
    get_experiment_by_id,
    delete_experiment
)
from models.experiment import ExperimentCreate, ExperimentResponseModel
import asyncio

router = APIRouter()


class ChatMessage(BaseModel):
    role: str
    content: str


class ParameterRange(BaseModel):
    min: float
    max: float
    step: float


class ExperimentRequest(BaseModel):
    prompt: str
    user_id: str
    num_responses: int = 3
    temperature_range: Optional[ParameterRange] = None
    top_p_range: Optional[ParameterRange] = None
    max_tokens_range: Optional[ParameterRange] = None
    # Fixed parameters (if ranges not provided, use these)
    temperature: Optional[float] = 0.7
    top_p: Optional[float] = 1.0
    max_tokens: Optional[int] = 2048
    min_tokens: Optional[int] = None
    frequency_penalty: Optional[float] = None
    presence_penalty: Optional[float] = None


class ExperimentResponse(BaseModel):
    response_id: int
    content: str
    parameters: dict
    metrics: dict


@router.post("/generate-batch")
async def generate_batch(request: ExperimentRequest):
    messages = [{"role": "user", "content": request.prompt}]
    
    # Generate parameter combinations
    parameter_combinations = []
    
    if request.num_responses <= 0:
        request.num_responses = 3
    
    # Generate parameter sets
    for i in range(request.num_responses):
        params = {}
        
        # Handle temperature
        if request.temperature_range:
            step_size = (request.temperature_range.max - request.temperature_range.min) / max(1, request.num_responses - 1)
            params["temperature"] = round(request.temperature_range.min + (i * step_size), 2)
        else:
            params["temperature"] = request.temperature or 0.7
        
        # Handle top_p
        if request.top_p_range:
            step_size = (request.top_p_range.max - request.top_p_range.min) / max(1, request.num_responses - 1)
            params["top_p"] = round(request.top_p_range.min + (i * step_size), 2)
        else:
            params["top_p"] = request.top_p or 1.0
        
        # Handle max_tokens
        if request.max_tokens_range:
            step_size = (request.max_tokens_range.max - request.max_tokens_range.min) / max(1, request.num_responses - 1)
            params["max_tokens"] = int(request.max_tokens_range.min + (i * step_size))
        else:
            params["max_tokens"] = request.max_tokens or 2048
        
        # Add fixed parameters
        if request.min_tokens is not None:
            params["min_tokens"] = request.min_tokens
        if request.frequency_penalty is not None:
            params["frequency_penalty"] = request.frequency_penalty
        if request.presence_penalty is not None:
            params["presence_penalty"] = request.presence_penalty
        
        parameter_combinations.append(params)
    
    # Generate responses in parallel using AsyncOpenAI
    async def generate_single_response(idx: int, params: dict):
        """Generate a single response with error handling."""
        try:
            response_content = await async_chat(messages, **params)
            metrics = calculate_quality_metrics(response_content)
            
            return {
                "response_id": idx + 1,
                "content": response_content,
                "parameters": params,
                "metrics": metrics
            }
        except Exception as e:
            return {
                "response_id": idx + 1,
                "content": f"Error generating response: {str(e)}",
                "parameters": params,
                "metrics": {
                    "completeness": 0.0,
                    "coherence": 0.0,
                    "length_appropriateness": 0.0,
                    "structural_quality": 0.0,
                    "overall_quality": 0.0
                }
            }
    
    # Create tasks for parallel execution
    tasks = [
        generate_single_response(idx, params)
        for idx, params in enumerate(parameter_combinations)
    ]
    
    # Execute all tasks in parallel
    responses = await asyncio.gather(*tasks)
    
    # Sort by response_id to maintain order
    responses = sorted(responses, key=lambda x: x["response_id"])
    
    # Convert responses to ExperimentResponseModel for saving
    experiment_responses = [
        ExperimentResponseModel(
            response_id=r["response_id"],
            content=r["content"],
            parameters=r["parameters"],
            metrics=r["metrics"]
        )
        for r in responses
    ]
    
    # Save experiment to MongoDB
    experiment_data = ExperimentCreate(
        user_id=request.user_id,
        prompt=request.prompt,
        num_responses=len(responses),
        responses=experiment_responses
    )
    
    experiment_id = await save_experiment(experiment_data)
    
    return {
        "experiment_id": experiment_id,
        "prompt": request.prompt,
        "num_responses": len(responses),
        "responses": responses
    }


@router.get("/experiments")
async def list_experiments(
    user_id: str = Query(..., description="User ID to fetch experiments for"),
    limit: int = Query(50, ge=1, le=100, description="Maximum number of experiments to return"),
    skip: int = Query(0, ge=0, description="Number of experiments to skip")
):
    """
    Get list of experiments for a specific user.
    """
    experiments = await get_experiments_by_user(user_id, limit=limit, skip=skip)
    return {
        "experiments": [exp.dict() for exp in experiments],
        "count": len(experiments)
    }


@router.get("/experiments/{experiment_id}")
async def get_experiment(
    experiment_id: str,
    user_id: str = Query(..., description="User ID to verify ownership")
):
    """
    Get a specific experiment by ID.
    """
    experiment = await get_experiment_by_id(experiment_id, user_id)
    if not experiment:
        raise HTTPException(status_code=404, detail="Experiment not found")
    return experiment.dict()


@router.delete("/experiments/{experiment_id}")
async def delete_experiment_endpoint(
    experiment_id: str,
    user_id: str = Query(..., description="User ID to verify ownership")
):
    """
    Delete a specific experiment by ID.
    """
    deleted = await delete_experiment(experiment_id, user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Experiment not found")
    return {"message": "Experiment deleted successfully"}

