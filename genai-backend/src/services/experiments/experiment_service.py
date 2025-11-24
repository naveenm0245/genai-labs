from core.database import get_database
from models.experiment import ExperimentCreate, ExperimentResponse
from bson import ObjectId
from typing import List, Optional
from datetime import datetime


async def save_experiment(experiment_data: ExperimentCreate) -> str:
    db = get_database()
    collection = db.experiments
    
    experiment_dict = {
        "user_id": experiment_data.user_id,
        "prompt": experiment_data.prompt,
        "num_responses": experiment_data.num_responses,
        "responses": [response.dict() for response in experiment_data.responses],
        "created_at": datetime.utcnow()
    }
    
    result = await collection.insert_one(experiment_dict)
    return str(result.inserted_id)


async def get_experiments_by_user(
    user_id: str,
    limit: int = 50,
    skip: int = 0
) -> List[ExperimentResponse]:
    db = get_database()
    collection = db.experiments
    
    cursor = collection.find(
        {"user_id": user_id}
    ).sort("created_at", -1).skip(skip).limit(limit)
    
    experiments = []
    async for doc in cursor:
        experiment = ExperimentResponse(
            id=str(doc["_id"]),
            user_id=doc["user_id"],
            prompt=doc["prompt"],
            num_responses=doc["num_responses"],
            responses=doc["responses"],
            created_at=doc["created_at"]
        )
        experiments.append(experiment)
    
    return experiments


async def get_experiment_by_id(experiment_id: str, user_id: str) -> Optional[ExperimentResponse]:
    db = get_database()
    collection = db.experiments
    
    if not ObjectId.is_valid(experiment_id):
        return None
    
    doc = await collection.find_one({
        "_id": ObjectId(experiment_id),
        "user_id": user_id
    })
    
    if not doc:
        return None
    
    return ExperimentResponse(
        id=str(doc["_id"]),
        user_id=doc["user_id"],
        prompt=doc["prompt"],
        num_responses=doc["num_responses"],
        responses=doc["responses"],
        created_at=doc["created_at"]
    )


async def delete_experiment(experiment_id: str, user_id: str) -> bool:
    db = get_database()
    collection = db.experiments
    
    if not ObjectId.is_valid(experiment_id):
        return False
    
    result = await collection.delete_one({
        "_id": ObjectId(experiment_id),
        "user_id": user_id
    })
    
    return result.deleted_count > 0

