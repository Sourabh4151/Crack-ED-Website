# CRACK-ED Django Backend

Django REST API with SQLite database (default). Optional PostgreSQL support.

## Setup

1. **Create and activate virtual environment** (if not already done):
   ```bash
   py -m venv .venv
   .\.venv\Scripts\Activate.ps1   # Windows PowerShell
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run migrations** (creates `db.sqlite3`):
   ```bash
   python manage.py migrate
   ```

4. **Create superuser** (optional, for admin):
   ```bash
   python manage.py createsuperuser
   ```

5. **Start the server**:
   ```bash
   python manage.py runserver
   ```
   API: http://127.0.0.1:8000/

## Endpoints

- **Health:** `GET /api/health/`
- **Examples (CRUD):** `GET/POST/PUT/PATCH/DELETE /api/examples/`
- **Admin:** http://127.0.0.1:8000/admin/

## Database

- **SQLite (default):** If no DB env vars are set, Django uses `backend/db.sqlite3`.
- **PostgreSQL:** Set either:
  - **Option 1:** `DATABASE_URL=postgresql://user:password@localhost:5432/dbname` in `.env`
  - **Option 2:** `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST` (optional, default `localhost`), `DB_PORT` (optional, default `5432`) in `.env`

  Then create the DB (e.g. `createdb cracked_db`), run `pip install -r requirements.txt` (includes `psycopg2-binary`), and run `python manage.py migrate`.

## HR login (Job Applications only)

An **HR** group exists with access only to **Job applications** in the admin. HR users do not see Leads, Quiz submissions, Examples, or Users.

**Create an HR user:**

1. Log in to Django admin as a superuser: http://127.0.0.1:8000/admin/
2. Go to **Authentication and Authorization** → **Users** → **Add user**.
3. Set username and password, then click **Save and continue editing**.
4. **Staff status:** check **Staff status** (so they can access admin). Do **not** check **Superuser status**.
5. Under **User permissions**, add the user to the **HR** group: in "Available groups" select **HR** and click the right arrow to move it to "Chosen groups".
6. Click **Save**.

HR users log in at the same URL (http://127.0.0.1:8000/admin/) and will only see **API** → **Job applications**.

## Environment

Copy `.env.example` to `.env` and set `DJANGO_SECRET_KEY` and other options for production.

## Deployment checklist

Before deploying to production, set these in your server environment (or `.env`):

| Variable | Required | Example (production) |
|----------|----------|----------------------|
| `DJANGO_SECRET_KEY` | Yes | Long random string (e.g. from `python -c "import secrets; print(secrets.token_urlsafe(50))"`) |
| `DJANGO_DEBUG` | Yes | `False` |
| `ALLOWED_HOSTS` | Yes | `crack-ed.com,api.crack-ed.com` |
| `CORS_ORIGINS` | Yes (if frontend on different domain) | `https://crack-ed.com,https://www.crack-ed.com` |
| `DB_NAME` / `DATABASE_URL` | Yes | Your production PostgreSQL credentials |

Then run:

- `python manage.py collectstatic --noinput` (to gather static files into `staticfiles/`)
- Serve the app with gunicorn/uwsgi behind nginx (or use a platform like Railway, Render, Heroku). Serve `/static/` and `/media/` from STATIC_ROOT and MEDIA_ROOT.
