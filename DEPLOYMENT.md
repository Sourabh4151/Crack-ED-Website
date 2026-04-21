# CRACK-ED – Deployment guide

Production site: **[https://crack-ed.com/](https://crack-ed.com/)**

Use this checklist so you **don’t have to change code** for deploy; set environment variables and build steps instead. All examples below use `crack-ed.com`.

---

## Backend (Django)

### 1. Environment variables (required for production)

Set these on your server (e.g. in `.env` or your host’s env config):

| Variable | Production value |
|----------|------------------|
| `DJANGO_SECRET_KEY` | Generate a new one: `python -c "import secrets; print(secrets.token_urlsafe(50))"` |
| `DJANGO_DEBUG` | `False` |
| `ALLOWED_HOSTS` | Your API domain(s), comma-separated, e.g. `crack-ed.com,api.crack-ed.com` |
| `CORS_ORIGINS` | Your frontend URL(s), comma-separated, e.g. `https://crack-ed.com,https://www.crack-ed.com` |
| `DB_NAME` + `DB_USER` + `DB_PASSWORD` + `DB_HOST` + `DB_PORT` | Or use `DATABASE_URL` (PostgreSQL) |
| **`EXTRAEDGE_AUTH_TOKEN`** | **Your Extraaedge CRM auth token** (from Extraaedge). Required for leads/quiz to be forwarded to CRM. If missing, leads save in Django only. |

### 1b. Leads not appearing in Extraaedge CRM?

If leads show in Django admin but **not** in Extraaedge (crack-ed.extraaedge.com):

1. **Set `EXTRAEDGE_AUTH_TOKEN` in production**  
   The backend only forwards to CRM when this env var is set.  
   - If you use a **.env file** on the server: add `EXTRAEDGE_AUTH_TOKEN=your-token` in `backend/.env` (same value as in `.env.example` or the one provided by Extraaedge).  
   - If you use a **host dashboard** (Railway, Render, Heroku, etc.): add `EXTRAEDGE_AUTH_TOKEN` in the project’s Environment / Config Vars and redeploy.

2. **Confirm the variable is loaded**  
   After deploy, check backend logs when a lead is submitted. If you see  
   `[API] EXTRAEDGE_AUTH_TOKEN not set; skipping CRM forward`  
   then the token is still not available to the app (wrong env name, .env not in working directory, or host not injecting it).

3. **Redeploy** after adding or changing env vars so the running process picks them up.

### 2. Commands before first deploy

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
```

### 3. Run in production

- Use **gunicorn** (or uWSGI) instead of `runserver`, e.g. `gunicorn config.wsgi:application --bind 0.0.0.0:8000`
- Put **nginx** (or similar) in front; serve `/static/` from `backend/staticfiles` and `/media/` from `backend/media`
- Or deploy to a platform (Railway, Render, Heroku, etc.) and set the env vars there

**No code changes needed** – CORS and CSRF origins are read from `CORS_ORIGINS` and `ALLOWED_HOSTS`.

---

## Frontend (Vite / React)

### 1. Point API to production

When building for production, the frontend must call your **production API URL**, not `localhost`.

Set when building (e.g. in your CI or host’s build env):

```bash
VITE_API_URL=https://api.crack-ed.com
npm run build
```

If you build without `VITE_API_URL`, the app will use relative `/api` (only works if you serve the frontend and proxy `/api` to the backend on the same host).

### 2. Build

```bash
cd frontend
npm ci
npm run build
```

Output is in `frontend/dist/`. Serve that folder with nginx, Netlify, Vercel, etc.

### 3. Optional: proxy in production

If the frontend and backend are on the same domain (e.g. [crack-ed.com](https://crack-ed.com/) and `crack-ed.com/api`), you can proxy `/api` in nginx (or your host) to the Django app and **omit** `VITE_API_URL` so the app uses relative `/api` URLs.

---

## Summary

| Item | Action (no code change) |
|------|--------------------------|
| Backend secret | Set `DJANGO_SECRET_KEY` |
| Backend debug off | Set `DJANGO_DEBUG=False` |
| Backend host | Set `ALLOWED_HOSTS=crack-ed.com,api.crack-ed.com` |
| Backend CORS/CSRF | Set `CORS_ORIGINS=https://crack-ed.com,https://www.crack-ed.com` |
| Backend DB | Use PostgreSQL via `DB_*` or `DATABASE_URL` |
| **Extraaedge CRM** | Set `EXTRAEDGE_AUTH_TOKEN` (production env or `backend/.env`) so leads are forwarded to CRM |
| Frontend API URL | Set `VITE_API_URL=https://api.crack-ed.com` when running `npm run build` (or leave unset if using same-domain proxy) |
| Static/media | Run `collectstatic`; serve `staticfiles/` and `media/` |

After setting env vars and running the commands above, the project is ready to deploy without further code edits.
