/**
 * Career quiz CMS API (Django). Same staff session + CSRF as marketing blogs.
 */
import { getApiBase } from './crmService'
import {
  initBlogAdminCsrf,
  loginBlogAdmin,
  logoutBlogAdmin,
  fetchBlogAdminSession,
} from './blogApi'

export { initBlogAdminCsrf, loginBlogAdmin, logoutBlogAdmin, fetchBlogAdminSession }

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

async function quizRequest (path, opts = {}) {
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

async function parseList (r) {
  if (!r.ok) throw new Error(await r.text())
  const data = await r.json()
  return Array.isArray(data) ? data : (data.results || [])
}

export async function fetchQuizConfig () {
  const base = getApiBase()
  if (!base) return null
  try {
    const r = await fetch(`${base}/api/quiz/config/`, { cache: 'no-store' })
    if (!r.ok) return null
    return await r.json()
  } catch {
    return null
  }
}

export async function fetchAdminQuizQuestions () {
  return parseList(await quizRequest('/api/quiz/admin/questions/'))
}

export async function fetchAdminQuizQuestion (id) {
  const r = await quizRequest(`/api/quiz/admin/questions/${id}/`)
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function createAdminQuizQuestion (payload) {
  const r = await quizRequest('/api/quiz/admin/questions/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function updateAdminQuizQuestion (id, payload) {
  const r = await quizRequest(`/api/quiz/admin/questions/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function deleteAdminQuizQuestion (id) {
  const r = await quizRequest(`/api/quiz/admin/questions/${id}/`, { method: 'DELETE' })
  if (!r.ok && r.status !== 204) throw new Error(await r.text())
}

export async function fetchAdminQuizPrograms () {
  return parseList(await quizRequest('/api/quiz/admin/programs/'))
}

export async function fetchAdminQuizProgram (id) {
  const r = await quizRequest(`/api/quiz/admin/programs/${id}/`)
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function createAdminQuizProgram (payload) {
  const r = await quizRequest('/api/quiz/admin/programs/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function updateAdminQuizProgram (id, payload) {
  const r = await quizRequest(`/api/quiz/admin/programs/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function deleteAdminQuizProgram (id) {
  const r = await quizRequest(`/api/quiz/admin/programs/${id}/`, { method: 'DELETE' })
  if (!r.ok && r.status !== 204) throw new Error(await r.text())
}
