from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from typing import Optional

load_dotenv()

class MongoDB:
    client: Optional[AsyncIOMotorClient] = None
    database = None

mongodb = MongoDB()

async def connect_to_mongo():
    """Create database connection"""
    mongodb_uri = os.getenv("MONGODB_URI")
    if not mongodb_uri:
        raise ValueError("MONGODB_URI environment variable is not set")
    
    mongodb.client = AsyncIOMotorClient(mongodb_uri)
    mongodb.database = mongodb.client.get_database("genai_labs")
    print("Connected to MongoDB")
    print(f"Using database: genai_labs")
    
    # Create indexes for better query performance
    await create_indexes()

async def close_mongo_connection():
    """Close database connection"""
    if mongodb.client:
        mongodb.client.close()
        print("Disconnected from MongoDB")

async def create_indexes():
    """Create database indexes for optimal query performance"""
    db = mongodb.database
    if db is None:
        return
    
    experiments_collection = db.experiments
    
    # Compound index for history page queries: filter by user_id, sort by created_at descending
    # This significantly speeds up the get_experiments_by_user query
    # MongoDB can also use the prefix (user_id) for queries that only filter by user_id
    try:
        await experiments_collection.create_index(
            [("user_id", 1), ("created_at", -1)],
            name="user_id_created_at_idx",
            background=True
        )
        print("Created index: user_id_created_at_idx (for optimized history queries)")
    except Exception as e:
        # Index creation is idempotent, but catch any unexpected errors
        print(f"Index creation note: {e}")


def get_database():
    """Get database instance"""
    if mongodb.database is None:
        raise RuntimeError("Database not initialized. Call connect_to_mongo() first.")
    return mongodb.database

