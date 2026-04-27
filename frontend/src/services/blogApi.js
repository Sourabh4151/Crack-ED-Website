/**
 * Marketing blogs API (Django). Requires VITE_API_URL in .env (e.g. http://127.0.0.1:8000).
 * Admin auth uses Django staff session + CSRF.
 */
import { getApiBase } from './crmService'

function getCsrfTokenFromCookie () {
  if (typeof document === 'undefined') return ''
  const raw = document.cookie || ''
  const parts = raw.split(';').map((v) => v.trim())
  for (const p of parts) {
    if (p.startsWith('csrftoken=')) {
      return decodeURIComponent(p.slice('csrftoken='.length))
    }
  }
  return ''
}

async function blogRequest (path, opts = {}) {
  const base = getApiBase()
  if (!base) throw new Error('API not configured')
  const method = opts.method || 'GET'
  const headers = {
    ...(opts.headers || {}),
  }
  const needsCsrf = !['GET', 'HEAD', 'OPTIONS'].includes(method.toUpperCase())
  if (needsCsrf) {
    const csrf = getCsrfTokenFromCookie()
    if (!csrf) throw new Error('CSRF token missing. Please refresh and log in again.')
    headers['X-CSRFToken'] = csrf
  }
  return fetch(`${base}${path}`, {
    ...opts,
    method,
    headers,
    credentials: 'include',
  })
}

export async function initBlogAdminCsrf () {
  const r = await blogRequest('/api/blogs/auth/csrf/')
  if (!r.ok) throw new Error(await r.text())
}

export async function loginBlogAdmin (username, password) {
  const r = await blogRequest('/api/blogs/auth/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function logoutBlogAdmin () {
  const r = await blogRequest('/api/blogs/auth/logout/', {
    method: 'POST',
  })
  if (!r.ok) throw new Error(await r.text())
}

export async function fetchBlogAdminSession () {
  const r = await blogRequest('/api/blogs/auth/session/')
  if (!r.ok) return null
  return r.json()
}

export async function fetchPublishedMarketingBlogs () {
  const base = getApiBase()
  if (!base) return []
  try {
    const r = await fetch(`${base}/api/blogs/`, { cache: 'no-store' })
    if (!r.ok) return []
    return await r.json()
  } catch {
    return []
  }
}

export async function fetchFeaturedMarketingBlog () {
  const base = getApiBase()
  if (!base) return null
  try {
    const r = await fetch(`${base}/api/blogs/featured/`, { cache: 'no-store' })
    if (!r.ok) return null
    const data = await r.json()
    if (!data.blog) return null
    return data.blog
  } catch {
    return null
  }
}

export async function fetchMarketingBlogDetail (lookup) {
  const base = getApiBase()
  if (!base) throw new Error('API not configured')
  const r = await fetch(`${base}/api/blogs/detail/${encodeURIComponent(lookup)}/`, {
    cache: 'no-store',
  })
  if (!r.ok) throw new Error('Not found')
  return r.json()
}

export async function fetchAdminBlogList () {
  const r = await blogRequest('/api/blogs/admin/')
  if (!r.ok) throw new Error(await r.text())
  const data = await r.json()
  return Array.isArray(data) ? data : (data.results || [])
}

export async function createAdminBlog (payload) {
  const r = await blogRequest('/api/blogs/admin/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function updateAdminBlog (id, payload) {
  const r = await blogRequest(`/api/blogs/admin/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function patchAdminBlogCover (id, file) {
  const fd = new FormData()
  fd.append('cover_image', file)
  const r = await blogRequest(`/api/blogs/admin/${id}/`, {
    method: 'PATCH',
    body: fd,
  })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function fetchAdminBlog (id) {
  const r = await blogRequest(`/api/blogs/admin/${id}/`)
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function uploadBlogImage (file) {
  const fd = new FormData()
  fd.append('file', file)
  const r = await blogRequest('/api/blogs/upload/', {
    method: 'POST',
    body: fd,
  })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export function marketingBlogToCard (b) {
  const excerpt = typeof b.excerpt === 'string' ? b.excerpt.trim() : ''
  return {
    id: b.slug,
    apiPk: b.id,
    slug: b.slug,
    title: b.title,
    date: b.date_display || '',
    tags: Array.isArray(b.tags) ? b.tags : [],
    image: b.cover_image_url || '',
    excerpt: excerpt || undefined,
    hideFromResources: !!b.hide_from_resources,
    source: 'api',
  }
}
