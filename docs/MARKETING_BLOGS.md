# Marketing blogs (CMS-style)

Marketing can create and edit blogs from the **React admin UI** or from **Django admin**.

## Quick setup (checklist)

1. Create a Django **staff** user for marketing (or use an existing staff account).
2. **Frontend `.env`**: set `VITE_API_URL` for local dev and **again for production builds** (see below).
3. Run **`python manage.py migrate`** in `backend/`.
4. Restart Django after deploying backend auth/permission changes.
5. **Slugs**: use word slugs like `my-post`, not pure numbers like `7`, so `/api/blogs/detail/7/` does not collide with a post whose **database id** is `7`.

**Auth note:** `/marketing/blogs` now uses Django session login (username/password) and CSRF. You must be logged in as a **staff** user.

## Stack

- **Editor:** Tiptap (`@tiptap/react`, StarterKit, Image, Link, Underline, TextStyle, Color, FontFamily)
- **Backend:** Django + DRF — `MarketingBlog` model, public read APIs, token-protected write APIs
- **Public site:** `/resources` merges **API-published** blogs with legacy **`blogPosts.js`** entries

## Setup

### 1. Backend `.env`

```env
# Create a staff user for marketing (example):
# python manage.py createsuperuser
```

Run migrations:

```bash
cd backend
python manage.py migrate
```

### 2. Frontend `.env` — `VITE_API_URL`

Vite injects this at **build time** (`npm run build`), not on the server after deploy.

| Environment | Required? | Typical value |
|-------------|-----------|----------------|
| **Local dev** | Yes (for `/marketing/blogs` and API blogs unless you rely only on the dev proxy) | `http://127.0.0.1:8000` |
| **Production** | **Yes**, when you run the production build, unless the live site calls the API on the **same origin** (e.g. `https://crack-ed.com` serves both the SPA and `/api/...` so the app can use relative URLs with an empty base). | `https://api.crack-ed.com` (no trailing slash) |

```env
# Local
VITE_API_URL=http://127.0.0.1:8000

# Production (set in CI or `.env.production` before npm run build)
# VITE_API_URL=https://api.crack-ed.com
```

After changing it: **restart** `vite` in dev; in production, **rebuild** the frontend so the new value is embedded in the bundle.

### 3. Marketing UI

Open: **`/marketing/blogs`**

1. Sign in with a Django staff username/password
2. **New blog** → fill slug, title, excerpt, tags, content, check **Published** to show on site
3. Optional: **Featured banner on /resources** (only one recommended)
4. Optional: **Cover image** (uploads after save via `PATCH`)

## API (reference)

| Method | Path | Auth |
|--------|------|------|
| GET | `/api/blogs/` | Public — published list |
| GET | `/api/blogs/featured/` | Public — `{ "blog": {...} \| null }` |
| GET | `/api/blogs/detail/<slug-or-id>/` | Public — published detail |
| POST | `/api/blogs/auth/login/` | Public + CSRF, creates session |
| POST | `/api/blogs/auth/logout/` | Staff session |
| GET | `/api/blogs/auth/session/` | Staff session |
| POST | `/api/blogs/upload/` | Staff session + CSRF |
| * | `/api/blogs/admin/` … | Staff session + CSRF (CRUD) |

## URLs on the site

- Listing cards: `/resources/blog/<slug>` (API) or `/resources/blog/<id>` (legacy static)

## Security notes

- Keep marketing staff credentials secure; use HTTPS in production.
- Rendered HTML is passed through **DOMPurify** on the public blog page.
- Prefer storing images via upload (served under `/media/`) rather than untrusted remote URLs in HTML.
