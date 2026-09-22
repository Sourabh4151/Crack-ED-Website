import Clarity from '@microsoft/clarity'

const RAW_PROJECT_ID = String(import.meta.env.VITE_CLARITY_PROJECT_ID || '').trim()

// Clarity project IDs are short alphanumeric strings from the project dashboard.
const PROJECT_ID_PATTERN = /^[A-Za-z0-9]{8,32}$/

const PLACEHOLDERS = new Set([
  '',
  'yourprojectid',
  'your_project_id',
  'your-project-id',
])

let initialized = false

function getClarityProjectId() {
  if (!RAW_PROJECT_ID) return ''
  if (PLACEHOLDERS.has(RAW_PROJECT_ID.toLowerCase())) return ''
  if (!PROJECT_ID_PATTERN.test(RAW_PROJECT_ID)) return ''
  return RAW_PROJECT_ID
}

function startClarity(projectId) {
  if (initialized || typeof window === 'undefined') return
  Clarity.init(projectId)
  initialized = true
  trackClarityPage(window.location.pathname)
}

/**
 * Load Microsoft Clarity once when a valid Project ID is configured.
 * Does not send user identifiers or other personal data.
 * Scheduled after idle so the hero/LCP path is not competing with Clarity.
 */
export function initClarity() {
  if (initialized || typeof window === 'undefined') return
  const projectId = getClarityProjectId()
  if (!projectId) return

  const start = () => startClarity(projectId)
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(start, { timeout: 4000 })
  } else {
    window.setTimeout(start, 2000)
  }
}

/**
 * Tag SPA route changes so recordings and heatmaps can be filtered by page.
 * Pathname only — query strings are omitted to avoid leaking URL-borne data.
 */
export function trackClarityPage(pathname) {
  if (!initialized || typeof window === 'undefined') return
  if (typeof window.clarity !== 'function') return
  if (typeof pathname !== 'string' || pathname.startsWith('/marketing')) return

  try {
    Clarity.setTag('page_path', pathname || '/')
  } catch {
    // Clarity stub may not be ready yet; skip this navigation.
  }
}
