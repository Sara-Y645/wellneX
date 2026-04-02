# WellneX

WellneX is a full-stack health insights project that helps users interpret lab values and radiology findings through a React frontend and a FastAPI backend.

## Stack

- Frontend: React, TypeScript, Vite, Tailwind, shadcn/ui
- Backend: FastAPI, Pydantic, Uvicorn
- Rules engine: JSON-based interpretation rules for lab and radiology analysis

## Project Structure

```text
wellneX/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── engines/
│   │   └── rules/
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
└── README.md
```

## Run Locally

### 1. Start the backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Backend runs at `http://127.0.0.1:8000`.

### 2. Start the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on Vite's local dev server, usually `http://localhost:5173`.

## API Endpoints

- `GET /` - health check
- `POST /api/labs/evaluate` - evaluate a single lab value
- `POST /api/labs/evaluate/batch` - evaluate multiple lab values
- `POST /api/radio/...` - radiology interpretation routes

## Notes

- The frontend currently calls the backend at `http://127.0.0.1:8000`.
- `node_modules`, virtual environments, caches, and local git metadata are intentionally excluded from version control.
- You can keep editing after every commit and push. GitHub stores snapshots of your work; it does not freeze the project.
