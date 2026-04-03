from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import datetime
from datetime import timedelta 

from gemini_client import analyze_symptoms_with_gemini
from database import history_collection  # <-- This fixes your NameError

app = FastAPI(title="Healthcare Symptom Checker API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Added session_id to track users
class SymptomRequest(BaseModel):
    session_id: str
    symptoms: str

@app.post("/api/check-symptoms")
async def check_symptoms(request: SymptomRequest):
    if not request.symptoms or len(request.symptoms.strip()) == 0:
        raise HTTPException(status_code=400, detail="Symptoms text cannot be empty.")
    
    # Fetch past history for this specific user/session
    user_history_cursor = history_collection.find({"session_id": request.session_id}).sort("timestamp", 1)
    past_history = list(user_history_cursor)
    
    # Pass history to Gemini along with the new symptoms
    result = analyze_symptoms_with_gemini(request.symptoms, past_history)
    
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
        
    # Save the new interaction to MongoDB, linked to the session_id
    try:
        document = {
            "session_id": request.session_id,
            "symptoms_text": request.symptoms,
            "llm_response": result,
            "timestamp": datetime.datetime.utcnow()
        }
        history_collection.insert_one(document)
    except Exception as e:
        print(f"Failed to save to database: {e}")
        
    return result

@app.get("/")
def read_root():
    return {"status": "API is running"}

from datetime import timedelta # Add this import at the top

@app.get("/api/history/{session_id}")
def get_history(session_id: str):
    # Fetch the history for this specific user, sorted by newest first
    records = history_collection.find({"session_id": session_id}).sort("timestamp", -1)
    
    history_list = []
    for record in records:
        # Add 5 hours and 30 minutes to the UTC timestamp from MongoDB
        ist_time = record["timestamp"] + timedelta(hours=5, minutes=30)
        
        history_list.append({
            "id": str(record["_id"]), 
            "timestamp": ist_time, 
            "symptoms": record["symptoms_text"],
            "response": record["llm_response"]
        })
        
    return history_list