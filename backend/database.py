import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# This will now grab your Atlas URI from the .env file
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise ValueError("No MONGO_URI found in environment variables.")

# Initialize the MongoDB client using the Atlas string
client = MongoClient(MONGO_URI)

# Select the database and collection
# Atlas will automatically create 'symptom_checker_db' if it doesn't exist yet
db = client["symptom_checker_db"]
history_collection = db["history"]