import os
import json
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()
client = genai.Client()

SYSTEM_INSTRUCTION = """
You are a medical education assistant. Analyze the user's symptoms and suggest probable conditions and recommended next steps.

Rules:
1. You must include a prominent educational disclaimer.
2. Keep the tone objective, cautious, and strictly educational.
3. Do not attempt to provide a definitive diagnosis.
4. Assess the general severity of the described symptoms (Low, Medium, High, or Emergency).
5. Always respond strictly in valid JSON format matching this exact schema:
{
  "disclaimer": "Educational use only disclaimer text here.",
  "severity": "Low",
  "probable_conditions": ["Condition 1", "Condition 2"],
  "next_steps": ["Step 1", "Step 2"],
  "questions_for_doctor": ["Question 1", "Question 2"]
}
6. If the user's input is not related to human health or symptoms (e.g., coding questions, general trivia, gibberish), return this exact JSON:
{
  "disclaimer": "Invalid query.",
  "severity": "None",
  "probable_conditions": ["Non-medical query detected."],
  "next_steps": ["Please enter actual physical or mental health symptoms."],
  "questions_for_doctor": []
}
"""

def analyze_symptoms_with_gemini(symptoms_text: str, past_history: list) -> dict:
    try:
        # Build the conversation history
        formatted_contents = []
        for past_turn in past_history:
            formatted_contents.append(
                {"role": "user", "parts": [{"text": f"User Symptoms: {past_turn['symptoms_text']}"}]}
            )
            formatted_contents.append(
                {"role": "model", "parts": [{"text": json.dumps(past_turn['llm_response'])}]}
            )
            
        # Append the current request
        formatted_contents.append(
            {"role": "user", "parts": [{"text": f"User Symptoms: {symptoms_text}"}]}
        )

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=formatted_contents,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION,
                response_mime_type="application/json"
            )
        )
        
        return json.loads(response.text)
        
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return {
            "error": "Failed to generate a response. Please try again later.",
            "disclaimer": "System error. Please consult a doctor for medical emergencies."
        }