/**
 * CRM Service - Handles form submissions via your backend only.
 *
 * Flow: Frontend -> Your Backend API -> (DB + NoPaperForms CRM).
 * The backend holds NOPAPERFORMS_ACCESS_KEY / NOPAPERFORMS_SECRET_KEY; the frontend never calls the CRM directly.
 *
 * submitLeadToCRM / submitQuizLeadToCRM: use these (they call your backend).
 * submitLeadToCRMDirect / submitQuizLeadToCRMDirect: deprecated; delegate to backend (no browser-side CRM keys).
 */

// Program → NoPaperForms cf_program (keep in sync with backend api/constants.py PROGRAM_TO_CENTER)
const PROGRAM_TO_CF_PROGRAM_MAP = {
  'Lenskart EyeTech Program - Clinical Technician': 'Lenskart - CT',
  'Lenskart EyeTech Program - Retail Sales Associate': 'Lenskart - RSA',
  'Udaan Program - Cashier / Teller': 'HDFC - Teller',
  'Udaan Program - Virtual Relationship Manager': 'HDFC - VRM',
  'Udaan Program - Relationship Manager': 'HDFC - RM',
  'Udaan Program - Business Loan Associate': 'HDFC - Buisiness',
  'Piramal ProEdge Program - Relationship Manager': 'Piramal - RM',
  'Paytm Disha Program - Field Sales Executive': 'Paytm - FSE',
  'Aviva Nirmaan Program - Agency Sales Executive': 'Aviva - AS',
  'Aviva Nirmaan Program - Direct Sales Executive': 'Aviva - DS',
  'Poonawalla FinPro Career Program - Sales Executive': 'Poonawalla - SE',
  'Poonawalla FinPro Career Program - Gold Assayer': 'Poonawalla - GA',
  'Finova VyaparaMitra Program - Relationship Officer': 'Finova - RO',
  'PGP - Banking Management': 'Bandhan Bank - AM',
  'PGP - Relationship Management': 'Relationship Manager',
  'PGC - Banking Management': 'IndusInd',
  'Mahindra Finance Prarambh Program - Business Executive': 'Mahindra - BE',
  // Full titles (career quiz & site) — same IDs as shorthand above
  'Postgraduate Program Relationship Management - Relationship Manager': 'Relationship Manager',
  'Postgraduate Program Banking Management - Assistant Manager': 'Bandhan Bank - AM',
  'Postgraduate Certification Banking Management - Business Development Executive': 'IndusInd',
  'Mahindra Finance Prarambh Program - Business Executive (Vehicle Loan - Field Sales)': 'Mahindra - BE',
  'PGP - Retail Banking - Relationship Officer': 'Axis - RO',
  'Banking Sales Program - Sales Officer': 'Banking Sales',
}

/** Base URL for our Django backend (set in .env as VITE_API_URL, or use proxy with '') */
export const getApiBase = () => (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || ''

/** Message shown when backend is not running or unreachable */
export const BACKEND_DOWN_MESSAGE = 'Backend is not running or unreachable. Your response was not saved. Please try again later.'

/**
 * Returns true if the error is due to backend/network being unreachable (e.g. backend stopped).
 */
export const isBackendUnreachable = (error) => {
  if (!error) return false
  const msg = (error.message || '').toLowerCase()
  if (error.name === 'TypeError' && (msg.includes('fetch') || msg.includes('network'))) return true
  if (msg.includes('failed to fetch') || msg.includes('network error')) return true
  return false
}

/** Standard UTM parameter names */
const UTM_PARAM_NAMES = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

/**
 * Get UTM parameters from the current URL. If present, they are stored in sessionStorage
 * so they persist across navigation (e.g. user lands with ?utm_source=google then submits later).
 * @returns {{ [key: string]: string }} Object with utm_* keys and string values (only keys that are set).
 */
export const getUtmParams = () => {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const utm = {}
  for (const name of UTM_PARAM_NAMES) {
    const value = params.get(name)
    if (value != null && value.trim() !== '') utm[name] = String(value).trim().slice(0, 500)
  }
  if (Object.keys(utm).length > 0) {
    try {
      sessionStorage.setItem('crack_ed_utm', JSON.stringify(utm))
    } catch (_) {}
  }
  const stored = (() => {
    try {
      const raw = sessionStorage.getItem('crack_ed_utm')
      return raw ? JSON.parse(raw) : {}
    } catch (_) {
      return {}
    }
  })()
  return { ...stored, ...utm }
}

/**
 * Read only stored UTM params from sessionStorage (no URL read, no write).
 * Used when preserving UTM in the URL on navigation.
 * @returns {{ [key: string]: string }}
 */
export const getStoredUtmParams = () => {
  if (typeof window === 'undefined') return {}
  try {
    const raw = sessionStorage.getItem('crack_ed_utm')
    return raw ? JSON.parse(raw) : {}
  } catch (_) {
    return {}
  }
}

/**
 * Build search string that merges current search with stored UTM params (stored wins for utm_*).
 * Preserves non-UTM query params from current URL.
 */
export const buildSearchWithUtm = (currentSearch, storedUtm) => {
  if (!storedUtm || Object.keys(storedUtm).length === 0) return currentSearch
  const current = new URLSearchParams(currentSearch)
  for (const [key, value] of Object.entries(storedUtm)) {
    if (key.startsWith('utm_') && value != null && String(value).trim() !== '') {
      current.set(key, String(value).trim().slice(0, 500))
    }
  }
  const str = current.toString()
  return str ? `?${str}` : ''
}

/**
 * Split full name into first and last name
 */
const splitName = (fullName) => {
  const str = (fullName || '').toString().trim()
  if (!str) return { firstName: '', lastName: '' }
  const nameParts = str.split(/\s+/)
  if (nameParts.length === 1) {
    return { firstName: nameParts[0], lastName: '' }
  }
  const lastName = nameParts.slice(-1)[0]
  const firstName = nameParts.slice(0, -1).join(' ')
  return { firstName, lastName }
}

/** NoPaperForms cf_program label for the selected program (empty if unknown). */
export const getCfProgramByProgram = (program) => {
  const v = PROGRAM_TO_CF_PROGRAM_MAP[program]
  return v != null && String(v).trim() !== '' ? String(v).trim() : ''
}

/**
 * Stored on Lead.center / submit payload; same as cf_program when known, else '0'.
 */
export const getCenterByProgram = (program) => getCfProgramByProgram(program) || '0'

/**
 * Submit lead to CRM via YOUR backend API (RECOMMENDED)
 * 
 * Replace '/api/submit-lead' with your actual backend endpoint
 */
export const submitLeadToCRM = async (formData) => {
  const fullName = formData?.fullName ?? ''
  const { firstName, lastName } = splitName(fullName)
  const program = formData?.program ?? ''
  const center = getCenterByProgram(program)
  const cfProgram = getCfProgramByProgram(program)
  const email = (formData?.emailId ?? formData?.email ?? '').toString().trim()
  const mobile = (formData?.mobileNumber ?? formData?.mobile ?? '').toString().replace(/\D/g, '').slice(0, 15)

  const sourcePage = typeof window !== 'undefined' ? (window.location.pathname || window.location.href || '') : ''
  const utmParams = getUtmParams()
  const queryText = (formData?.query ?? '').toString().trim().slice(0, 2000)
  const payload = {
    fullName: fullName || undefined,
    firstName: firstName || '—',
    lastName: lastName || '', // leave empty when no last name so CRM shows blank, not "—"
    email,
    mobile,
    program,
    center,
    ...(cfProgram ? { cfProgram } : {}),
    state: formData?.state || '',
    sourcePage,
    ...(queryText ? { query: queryText } : {}),
    ...(Object.keys(utmParams).length > 0 ? { utmParams } : {}),
  }

  const apiBase = getApiBase() // use same base for consistency
  const url = `${apiBase}/api/submit-lead/`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      console.error('Backend submit-lead failed:', response.status, data)
      throw new Error(data?.error || `HTTP ${response.status}`)
    }
    return { success: true, data }
  } catch (error) {
    console.error('Error submitting lead to backend:', error)
    throw error
  }
}

/**
 * @deprecated Use submitLeadToCRM — forwards via Django to NoPaperForms (keys stay on the server).
 */
export const submitLeadToCRMDirect = async (formData) => {
  return submitLeadToCRM(formData)
}

/**
 * Submit quiz lead to CRM via YOUR backend API
 * Uses program from "Your Perfect Fit" (backend maps to CRM program/course field)
 */
export const submitQuizLeadToCRM = async (formData) => {
  const { firstName, lastName } = splitName(formData.name)
  const center = getCenterByProgram(formData.program)
  const cfProgram = getCfProgramByProgram(formData.program)
  const sourcePage = typeof window !== 'undefined' ? (window.location.pathname || window.location.href || '') : ''
  const utmParams = getUtmParams()

  const payload = {
    firstName,
    lastName,
    email: formData.email,
    mobile: formData.mobile,
    program: formData.program,
    center,
    ...(cfProgram ? { cfProgram } : {}),
    state: formData.state || '',
    sourcePage,
    ...(Object.keys(utmParams).length > 0 ? { utmParams } : {}),
  }

  const url = `${getApiBase()}/api/submit-lead/`
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const data = await response.json().catch(() => ({}))
    return { success: true, data }
  } catch (error) {
    console.error('Error submitting quiz lead:', error)
    throw error
  }
}

/**
 * @deprecated Post to /api/quiz/submit/ (same as Career Quiz). CRM keys remain on the backend.
 */
export const submitQuizLeadToCRMDirect = async (formData) => {
  const sourcePage =
    typeof window !== 'undefined' ? (window.location.pathname || window.location.href || '') : ''
  const utmParams = getUtmParams()
  const perfect = formData.program
  const cfProgram = getCfProgramByProgram(perfect)
  const payload = {
    name: formData.name,
    email: formData.email,
    mobile: formData.mobile,
    program: formData.program,
    bestFit: formData.program,
    ...(cfProgram ? { cfProgram } : {}),
    sourcePage,
    ...(Object.keys(utmParams).length > 0 ? { utmParams } : {}),
  }
  const response = await fetch(`${getApiBase()}/api/quiz/submit/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data?.error || `HTTP ${response.status}`)
  }
  return { success: true, data }
}
