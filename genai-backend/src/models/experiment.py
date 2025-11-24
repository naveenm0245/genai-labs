from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime


class ExperimentResponseModel(BaseModel):
    """Model for individual response in an experiment"""
    response_id: int
    content: str
    parameters: Dict[str, Any]
    metrics: Dict[str, float]


class ExperimentCreate(BaseModel):
    """Model for creating a new experiment"""
    user_id: str
    prompt: str
    num_responses: int
    responses: List[ExperimentResponseModel]


class ExperimentResponse(BaseModel):
    """Response model for API"""
    id: str
    user_id: str
    prompt: str
    num_responses: int
    responses: List[ExperimentResponseModel]
    created_at: datetime

