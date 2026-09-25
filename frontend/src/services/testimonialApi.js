/**
 * Testimonials API. Admin uses the same Django staff session as marketing blogs.
 */
import { getApiBase } from './crmService'
import { initBlogAdminCsrf } from './blogApi'

export { initBlogAdminCsrf }

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

async function staffRequest (path, opts = {}) {
  const base = getApiBase()
  if (!base) throw new Error('API not configured')
  const method = opts.method || 'GET'
  const headers = { ...(opts.headers || {}) }
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

export async function fetchPublishedTestimonials () {
  const base = getApiBase()
  if (!base) return []
  try {
    const r = await fetch(`${base}/api/testimonials/`, { cache: 'no-store' })
    if (!r.ok) return []
    const data = await r.json()
    return Array.isArray(data) ? data : (data.results || [])
  } catch {
    return []
  }
}

export async function fetchAdminTestimonials () {
  const r = await staffRequest('/api/testimonials/admin/')
  if (!r.ok) throw new Error(await r.text())
  const data = await r.json()
  return Array.isArray(data) ? data : (data.results || [])
}

export async function fetchAdminTestimonial (id) {
  const r = await staffRequest(`/api/testimonials/admin/${id}/`)
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function createAdminTestimonial (payload) {
  const r = await staffRequest('/api/testimonials/admin/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function updateAdminTestimonial (id, payload) {
  const r = await staffRequest(`/api/testimonials/admin/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function deleteAdminTestimonial (id) {
  const r = await staffRequest(`/api/testimonials/admin/${id}/`, { method: 'DELETE' })
  if (!r.ok && r.status !== 204) throw new Error(await r.text())
}

export async function patchAdminTestimonialImages (id, { profileFile, postFile }) {
  const fd = new FormData()
  if (profileFile) fd.append('profile_image', profileFile)
  if (postFile) fd.append('post_image', postFile)
  const r = await staffRequest(`/api/testimonials/admin/${id}/`, {
    method: 'PATCH',
    body: fd,
  })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}
