/**
 * CRM Service - Handles form submissions via your backend only.
 *
 * Flow: Frontend -> Your Backend API -> (DB + Extraaedge CRM).
 * The backend holds the CRM auth token (EXTRAEDGE_AUTH_TOKEN); the frontend never calls the CRM directly.
 *
 * submitLeadToCRM / submitQuizLeadToCRM: use these (they call your backend).
 * submitLeadToCRMDirect / submitQuizLeadToCRMDirect: deprecated; only for local/dev fallback if needed.
 */

// Program to Center mapping
const PROGRAM_TO_CENTER_MAP = {
  'AURUM Bankers Program - Relationship Manager': '67',
  'AURUM Bankers Program - Relationship Officer': '48',
  'AURUM Bankers Program - Bank Officer': '1',
  'AURUM Bankers Program - Sales Officer': '49',
  'AURUM Bankers Program - Transaction Officer': '59',
  'AURUM Bankers Program - Deputy Center Manager': '62',
  'AURUM Bankers Program - Customer Service Officer': '60',
  'AURUM Bankers Program - Deputy Late Recovery Officer': '63',
  'AURUM Bankers Program - Money Officer': '65',
  'AURUM Bankers Program - Customer Service Officer Valuation': '66',
  'Lenskart EyeTech Program - Clinical Technician': '38',
  'Lenskart EyeTech Program - Retail Sales Associate': '61',
  'Udaan Program - Cashier / Teller': '33',
  'Udaan Program - Virtual Relationship Manager': '68',
  'Udaan Program - Relationship Manager': '72',
  'Udaan Program - Business Loan Associate': '73',
  'Piramal ProEdge Program - Relationship Manager': '47',
  'Paytm Disha Program - Field Sales Executive': '55',
  'Aviva Nirmaan Program - Agency Sales Executive': '69',
  'Aviva Nirmaan Program - Direct Sales Executive': '70',
  'FinPro Career Program - Sales Executive': '74',
  'FinPro Career Program - Gold Assayer': '76',
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

/**
 * Get center ID based on selected program
 */
export const getCenterByProgram = (program) => {
  return PROGRAM_TO_CENTER_MAP[program] || '1' // Default to '1' if program not found
}

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
  const email = (formData?.emailId ?? formData?.email ?? '').toString().trim()
  const mobile = (formData?.mobileNumber ?? formData?.mobile ?? '').toString().replace(/\D/g, '').slice(0, 15)

  const sourcePage = typeof window !== 'undefined' ? (window.location.pathname || window.location.href || '') : ''
  const utmParams = getUtmParams()
  const payload = {
    fullName: fullName || undefined,
    firstName: firstName || '—',
    lastName: lastName || '', // leave empty when no last name so CRM shows blank, not "—"
    email,
    mobile,
    program,
    center,
    state: formData?.state || '',
    sourcePage,
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
 * Submit lead directly to CRM (NOT RECOMMENDED - Only for development)
 * 
 * WARNING: This exposes your AuthToken in the frontend code.
 * Anyone can view your source code and use your token.
 * 
 * Only use this if:
 * 1. You're in development/testing
 * 2. The CRM API allows CORS from your domain
 * 3. You understand the security implications
 */
export const submitLeadToCRMDirect = async (formData) => {
  const { firstName, lastName } = splitName(formData.fullName)
  const center = getCenterByProgram(formData.program)

  const payload = {
    Source: 'crack-ed',
    AuthToken: 'crack-ed_29-01-2025', // ⚠️ EXPOSED IN FRONTEND CODE
    FirstName: firstName,
    LastName: lastName,
    Email: formData.emailId,
    MobileNumber: parseInt(formData.mobileNumber.replace(/\D/g, ''), 10), // Remove non-digits
    State: formData.state || '',
    Center: center,
  }

  try {
    const response = await fetch('https://publisher.extraaedge.com/api/Webhook/addPublisherLead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('Error submitting lead to CRM:', error)
    throw error
  }
}

/**
 * Submit quiz lead to CRM via YOUR backend API
 * Uses program from "Your Perfect Fit" to pass Center value
 */
export const submitQuizLeadToCRM = async (formData) => {
  const { firstName, lastName } = splitName(formData.name)
  const center = getCenterByProgram(formData.program)
  const sourcePage = typeof window !== 'undefined' ? (window.location.pathname || window.location.href || '') : ''
  const utmParams = getUtmParams()

  const payload = {
    firstName,
    lastName,
    email: formData.email,
    mobile: formData.mobile,
    program: formData.program,
    center,
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
 * Submit quiz lead directly to CRM
 * Uses program from "Your Perfect Fit" to pass Center value to Extraaedge
 * NOT RECOMMENDED - Only for development. AuthToken exposed in frontend.
 */
export const submitQuizLeadToCRMDirect = async (formData) => {
  const { firstName, lastName } = splitName(formData.name)
  const center = getCenterByProgram(formData.program)

  const payload = {
    Source: 'crack-ed',
    AuthToken: 'crack-ed_29-01-2025', // ⚠️ EXPOSED IN FRONTEND CODE
    FirstName: firstName,
    LastName: lastName,
    Email: formData.email,
    MobileNumber: parseInt(String(formData.mobile).replace(/\D/g, ''), 10),
    Center: center,
  }

  try {
    const response = await fetch('https://publisher.extraaedge.com/api/Webhook/addPublisherLead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('Error submitting quiz lead to CRM:', error)
    throw error
  }
}
