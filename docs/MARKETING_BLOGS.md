# Marketing blogs (CMS-style)

Marketing can create and edit blogs from the **React admin UI** or from **Django admin**.

## Quick setup (checklist)

1. **Backend `.env`**: set `BLOG_ADMIN_TOKEN` (long random secret; must match what you paste in `/admin/blogs`).
2. **Frontend `.env`**: set `VITE_API_URL` for local dev and **again for production builds** (see below).
3. Run **`python manage.py migrate`** in `backend/`.
4. **Restart Django** after changing `BLOG_ADMIN_TOKEN` in `.env`.
5. **Slugs**: use word slugs like `my-post`, not pure numbers like `7`, so `/api/blogs/detail/7/` does not collide with a post whose **database id** is `7`.

**403 / “Failed to fetch” on `/api/blogs/admin/`:** the backend must allow the custom header `X-Admin-Token` in CORS (`CORS_ALLOW_HEADERS` in `settings.py`). Without it, the browser blocks the request from Vite (`localhost:5174`) to the API (`127.0.0.1:8000`).

## Stack

- **Editor:** Tiptap (`@tiptap/react`, StarterKit, Image, Link, Underline, TextStyle, Color, FontFamily)
- **Backend:** Django + DRF — `MarketingBlog` model, public read APIs, token-protected write APIs
- **Public site:** `/resources` merges **API-published** blogs with legacy **`blogPosts.js`** entries

## Setup

### 1. Backend `.env`

```env
# Required for marketing React UI + image upload (same value you paste in the UI)
BLOG_ADMIN_TOKEN=your-long-random-secret
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
| **Local dev** | Yes (for `/admin/blogs` and API blogs unless you rely only on the dev proxy) | `http://127.0.0.1:8000` |
| **Production** | **Yes**, when you run the production build, unless the live site calls the API on the **same origin** (e.g. `https://crack-ed.com` serves both the SPA and `/api/...` so the app can use relative URLs with an empty base). | `https://api.crack-ed.com` (no trailing slash) |

```env
# Local
VITE_API_URL=http://127.0.0.1:8000

# Production (set in CI or `.env.production` before npm run build)
# VITE_API_URL=https://api.crack-ed.com
```

After changing it: **restart** `vite` in dev; in production, **rebuild** the frontend so the new value is embedded in the bundle.

### 3. Marketing UI

Open: **`/admin/blogs`**

1. Paste the **same** token as `BLOG_ADMIN_TOKEN` → **Save & load**
2. **New blog** → fill slug, title, excerpt, tags, content, check **Published** to show on site
3. Optional: **Featured banner on /resources** (only one recommended)
4. Optional: **Cover image** (uploads after save via `PATCH`)

## API (reference)

| Method | Path | Auth |
|--------|------|------|
| GET | `/api/blogs/` | Public — published list |
| GET | `/api/blogs/featured/` | Public — `{ "blog": {...} \| null }` |
| GET | `/api/blogs/detail/<slug-or-id>/` | Public — published detail |
| POST | `/api/blogs/upload/` | Header `X-Admin-Token` |
| * | `/api/blogs/admin/` … | Header `X-Admin-Token` (CRUD) |

## URLs on the site

- Listing cards: `/resources/blog/<slug>` (API) or `/resources/blog/<id>` (legacy static)

## Security notes

- Keep `BLOG_ADMIN_TOKEN` secret; use HTTPS in production.
- Rendered HTML is passed through **DOMPurify** on the public blog page.
- Prefer storing images via upload (served under `/media/`) rather than untrusted remote URLs in HTML.
