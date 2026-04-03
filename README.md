# Healthcare Symptom Checker

A full-stack web application that uses AI-powered analysis to help users understand their symptoms and get educational health insights. The application combines a FastAPI backend with Google Gemini integration and a modern React frontend.

**⚠️ Disclaimer:** This tool is for educational purposes only and should not be used for medical diagnosis or treatment. Always consult with qualified healthcare professionals for medical advice.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Architecture](#project-architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Frontend Components](#frontend-components)
- [Database Schema](#database-schema)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The Healthcare Symptom Checker is a web application that allows users to:

1. **Input symptoms** in natural language
2. **Receive AI-powered analysis** powered by Google Gemini
3. **Track symptom history** across sessions for users (no authentication yet)
4. **Get educational insights** including probable conditions, severity assessment, and recommended next steps

The backend tracks user sessions and maintains conversation history to provide contextual analysis, while the frontend provides an intuitive interface for symptom input and result visualization.

---

## Features

- 🔍 **AI-Powered Analysis**: Uses Google Gemini API to analyze symptoms and suggest probable conditions
- 📊 **Severity Assessment**: Evaluates symptom severity (Low, Medium, High, Emergency)
- 📱 **Responsive UI**: React-based frontend with intuitive tab-based navigation
- 🔐 **Session Management**: Tracks user sessions for persistent history
- 💾 **MongoDB Integration**: Stores user interactions and historical data
- ⚠️ **Safety Disclaimers**: Prominent educational disclaimers on all analyses
- 📚 **Integration-Ready**: RESTful API for easy integration with other applications

---

## Project Architecture

```
Healthcare Symptom Checker
├── Backend (FastAPI)
│   ├── main.py (API Endpoints) 
│   ├── gemini_client.py 
│   └── database.py (MongoDB Connection)
└── Frontend (React + Vite)
    ├── User Login
    ├── Symptom Input Component
    ├── Results Display
    ├── History Tracking
    └── Disclaimer
```

### Tech Stack

**Backend:**

- FastAPI (Web framework)
- Google GenAI (AI integration)
- Python 3.10+

**Frontend:**

- React 19.2+
- Vite (Build tool)

**Database:**

- MongoDB Atlas(Document storage)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.10 or higher**
- **Node.js 16.0 or higher** (with npm)
- **MongoDB Atlas Key**
- **Google Gemini API Key**

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Sri170303/Health-Care-Symptom-Checkerhttps://github.com/Sri170303/Health-Care-Symptom-Checker
cd Health-Care-Symptom-Checker
```

### 2. Backend Setup

Navigate to the backend directory and install Python dependencies:

```bash
cd backend
pip install -r requirements.txt
```

**Backend Dependencies:**

- `fastapi` - Web framework
- `google-genai` - Google Gemini API client
- `pymongo` - MongoDB driver
- `python-dotenv` - Environment variable management
- `uvicorn` - ASGI server

### 3. Frontend Setup

Navigate to the frontend directory and install Node.js dependencies:

```bash
cd ../frontend
npm install
```

---

## Configuration

### Backend Configuration

Create a `.env` file in the `backend/` directory with the following variables:

```env
 Google Gemini API
GOOGLE_API_KEY=your_google_api_key_here

# MongoDB
MONGODB_URI=mongodb://localhost:27017



```

**Environment Variables:**

- `GOOGLE_API_KEY`: Your Google Gemini API key (required)
- `MONGODB_URI`: MongoDB connection string
- `MONGODB_DB_NAME`: Database name (default: healthcare_symptom_checker)
- `MONGODB_COLLECTION_NAME`: Collection name for history (default: symptom_history)

### Frontend Configuration

The frontend is configured to connect to the backend API running on `http://localhost:8000`. 

---

## Running the Application

### Backend

Start the FastAPI server:

```bash
cd backend
python main.py
```

Or using Uvicorn directly:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at:

- **Main API**: `http://localhost:8000`
- **API Docs**: `http://localhost:8000/docs` (Swagger UI)
- **ReDoc**: `http://localhost:8000/redoc`

### Frontend

Start the development server:

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` (or another port if 5173 is busy).

---

## Project Structure

### Backend Structure

```
backend/
├── main.py                 # FastAPI application and routes
├── gemini_client.py       # Google Gemini API integration
├── database.py            # MongoDB connection and setup
├── requirements.txt       # Python dependencies
└── .env                   # Environment variables (create this file)
```

### Frontend Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Disclaimer.jsx      # Educational disclaimer display
│   │   ├── SymptomInput.jsx    # User input form
│   │   ├── ResultsDisplay.jsx  # Results visualization
│   │   ├── History.jsx         # User history tracking
│   │   └── Login.jsx           # User authentication
│   ├── App.jsx              # Main application component
│   ├── App.css              # Application styles
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── package.json             # Node.js dependencies
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint configuration
└── index.html              # HTML entry point
```

---

## API Documentation

### Endpoints

#### Check Symptoms

**POST** `/api/check-symptoms`

Analyzes user symptoms and returns AI-powered insights.

**Request Body:**

```json
{
  "session_id": "user_session_123",
  "symptoms": "I have a headache and fever for 2 days"
}
```

**Response:**

```json
{
  "disclaimer": "Educational use only disclaimer...",
  "severity": "Medium",
  "probable_conditions": [
    "Common Cold",
    "Influenza",
    "Viral Fever"
  ],
  "next_steps": [
    "Rest and stay hydrated",
    "Monitor temperature regularly",
    "Consult a healthcare provider if symptoms worsen"
  ],
  "questions_for_doctor": [
    "Do you have any other symptoms?",
    "Have you been exposed to sick individuals?"
  ]
}
```

**Error Response:**

```json
{
  "detail": "Symptoms text cannot be empty."
}
```

---

## Frontend Components

### Component Overview

| Component              | Purpose                                      |
| ---------------------- | -------------------------------------------- |
| **App.jsx**            | Main application component, state management |
| **SymptomInput.jsx**   | Form for entering symptoms                   |
| **ResultsDisplay.jsx** | Display AI analysis results                  |
| **History.jsx**        | View previous symptom checks                 |
| **Login.jsx**          | User authentication and session management   |
| **Disclaimer.jsx**     | Educational disclaimer display               |

### Component Flow

```
App
├── Login (Authentication)
├── SymptomInput (User Input)
├── ResultsDisplay (Results)
├── History (Past Records)
└── Disclaimer (Safety Notice)
```

---

## Database Schema

### MongoDB Collection: `symptom_history`

Each document represents a user interaction:

```json
{
  "_id": ObjectId,
  "session_id": "user_session_123",
  "symptoms_text": "I have a headache and fever",
  "llm_response": {
    "disclaimer": "...",
    "severity": "Medium",
    "probable_conditions": ["..."],
    "next_steps": ["..."],
    "questions_for_doctor": ["..."]
  },
  "timestamp": ISODate("2024-01-15T10:30:00Z")
}
```

**Fields:**

- `session_id`: Unique identifier for the user session
- `symptoms_text`: Raw symptom input from user
- `llm_response`: Parsed JSON response from Gemini API
- `timestamp`: When the interaction occurred

---

## Development

### Running Linter

Check code quality with ESLint:

```bash
cd frontend
npm run lint
```

### Hot Reload

Both backend and frontend support hot reload during development:

- **Backend**: Use `--reload` flag with uvicorn
- **Frontend**: Vite automatically reloads on file changes

---

## Troubleshooting

### Issue: "Google API Key not found"

- Solution: Ensure `.env` file exists in the backend directory with `GOOGLE_API_KEY` set

### Issue: "MongoDB connection refused"

- Solution: Verify MongoDB is running and `MONGODB_URI` in `.env` is correct

### Issue: CORS errors in frontend

- Solution: Ensure backend CORS middleware is properly configured (already enabled in main.py)

### Issue: "Cannot find module" errors

- Solution: Run `npm install` in frontend directory or `pip install -r requirements.txt` in backend

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add your feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a Pull Request

---

## Quick Start Checklist

- [ ] Install Python 3.10+
- [ ] Install Node.js 16+
- [ ] Clone repository
- [ ] Create `.env` file with Google API key and MongoDB URI
- [ ] Install backend dependencies: `pip install -r requirements.txt`
- [ ] Install frontend dependencies: `npm install`
- [ ] Start backend: `python main.py`
- [ ] Start frontend: `npm run dev`
- [ ] Visit `http://localhost:5173`
