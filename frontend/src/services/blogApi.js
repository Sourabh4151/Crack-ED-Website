/**
 * Marketing blogs API (Django). Requires VITE_API_URL in .env (e.g. http://127.0.0.1:8000).
 * Admin writes need BLOG_ADMIN_TOKEN on backend + X-Admin-Token header.
 */
import { getApiBase } from './crmService'

const adminTokenKey = 'crack_ed_blog_admin_token'

export function getBlogAdminToken () {
  if (typeof sessionStorage === 'undefined') return ''
  return sessionStorage.getItem(adminTokenKey) || ''
}

export function setBlogAdminToken (token) {
  if (typeof sessionStorage === 'undefined') return
  if (token) sessionStorage.setItem(adminTokenKey, token.trim())
  else sessionStorage.removeItem(adminTokenKey)
}

export async function fetchPublishedMarketingBlogs () {
  const base = getApiBase()
  if (!base) return []
  try {
    const r = await fetch(`${base}/api/blogs/`)
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
    const r = await fetch(`${base}/api/blogs/featured/`)
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
  const r = await fetch(`${base}/api/blogs/detail/${encodeURIComponent(lookup)}/`)
  if (!r.ok) throw new Error('Not found')
  return r.json()
}

export async function fetchAdminBlogList () {
  const base = getApiBase()
  const token = getBlogAdminToken()
  if (!base || !token) throw new Error('Missing API or token')
  const r = await fetch(`${base}/api/blogs/admin/`, {
    headers: { 'X-Admin-Token': token },
  })
  if (!r.ok) throw new Error(await r.text())
  const data = await r.json()
  return Array.isArray(data) ? data : (data.results || [])
}

export async function createAdminBlog (payload) {
  const base = getApiBase()
  const token = getBlogAdminToken()
  const r = await fetch(`${base}/api/blogs/admin/`, {
    method: 'POST',
    headers: {
      'X-Admin-Token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function updateAdminBlog (id, payload) {
  const base = getApiBase()
  const token = getBlogAdminToken()
  const r = await fetch(`${base}/api/blogs/admin/${id}/`, {
    method: 'PATCH',
    headers: {
      'X-Admin-Token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function patchAdminBlogCover (id, file) {
  const base = getApiBase()
  const token = getBlogAdminToken()
  const fd = new FormData()
  fd.append('cover_image', file)
  const r = await fetch(`${base}/api/blogs/admin/${id}/`, {
    method: 'PATCH',
    headers: { 'X-Admin-Token': token },
    body: fd,
  })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function fetchAdminBlog (id) {
  const base = getApiBase()
  const token = getBlogAdminToken()
  const r = await fetch(`${base}/api/blogs/admin/${id}/`, {
    headers: { 'X-Admin-Token': token },
  })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function uploadBlogImage (file) {
  const base = getApiBase()
  const token = getBlogAdminToken()
  const fd = new FormData()
  fd.append('file', file)
  const r = await fetch(`${base}/api/blogs/upload/`, {
    method: 'POST',
    headers: { 'X-Admin-Token': token },
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
