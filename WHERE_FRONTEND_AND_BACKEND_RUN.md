# Where Frontend and Backend Run

Quick reference for developers: where each app runs and how they connect.

---

## Backend (Django API)

| | |
|--|--|
| **Folder** | `backend/` |
| **Runs on** | **Port 8000** (default) |
| **URL** | http://localhost:8000/ or http://127.0.0.1:8000/ |
| **Admin** | http://localhost:8000/admin/ |
| **API base** | http://localhost:8000/api/ |

**How to run:**
```bash
cd backend
# Optional: activate venv first (e.g. .venv)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Server starts at **http://127.0.0.1:8000/**.

**Important:** The backend must be running for the website to save leads, quiz submissions, and job applications. If the backend is down, those forms will fail or only go to external CRM.

---

## Frontend (React + Vite)

| | |
|--|--|
| **Folder** | `frontend/` |
| **Runs on** | **Port 5174** (set in `frontend/vite.config.js`) |
| **URL** | http://localhost:5174/ or http://127.0.0.1:5174/ |

**How to run:**
```bash
cd frontend
npm install
npm run dev
```
Dev server starts at **http://localhost:5174/**.

**Important:** Developers should open the **frontend URL** (http://localhost:5174/) in the browser to use the site. Do not open the backend URL (8000) for the main website—that is only the API and admin.

---

## How They Connect (Development)

1. **Frontend** (port **5174**) is the React app the user sees.
2. **Backend** (port **8000**) is the Django API and admin.
3. **Vite proxy:** When the frontend calls `/api/...`, Vite forwards those requests to `http://localhost:8000`. So from the browser it looks like same origin (e.g. `http://localhost:5174/api/...` → backend handles it).
4. **Alternative:** Frontend can call the backend directly using `VITE_API_URL` in `frontend/.env` (e.g. `VITE_API_URL=http://localhost:8000`). Then API requests go straight to port 8000.

**Summary:** Run **both** — backend on **8000**, frontend on **5174**. Use the site at **http://localhost:5174/**.

---

## One-line summary for a developer

- **Backend:** `backend/` → `python manage.py runserver` → **http://localhost:8000** (API + admin).
- **Frontend:** `frontend/` → `npm run dev` → **http://localhost:5174** (website to use in browser).
- Both must run; frontend proxies `/api` to the backend on 8000.
