/**
 * Microsite brochure catalog. Same staff session as marketing blogs.
 */
import { getApiBase } from './crmService'

function getCsrfTokenFromCookie () {
  if (typeof document === 'undefined') return ''
  const parts = (document.cookie || '').split(';').map((value) => value.trim())
  for (const part of parts) {
    if (part.startsWith('csrftoken=')) {
      return decodeURIComponent(part.slice('csrftoken='.length))
    }
  }
  return ''
}

async function readError (response) {
  const text = await response.text()
  try {
    const data = JSON.parse(text)
    if (data && data.detail) return String(data.detail)
  } catch {
    /* response was not JSON */
  }
  return text || 'Request failed'
}

async function brochureRequest (path, opts = {}) {
  const base = getApiBase()
  if (!base) throw new Error('API not configured')
  const method = opts.method || 'GET'
  const headers = { ...(opts.headers || {}) }
  if (!['GET', 'HEAD', 'OPTIONS'].includes(method.toUpperCase())) {
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

export async function fetchAdminBrochures () {
  const response = await brochureRequest('/api/brochures/admin/')
  if (!response.ok) throw new Error(await readError(response))
  return response.json()
}

export async function saveAdminBrochure (slug, { file, downloadName }) {
  const body = new FormData()
  body.append('download_name', downloadName)
  if (file) body.append('file', file)
  const response = await brochureRequest(`/api/brochures/admin/${slug}/`, {
    method: 'POST',
    body,
  })
  if (!response.ok) throw new Error(await readError(response))
  return response.json()
}
