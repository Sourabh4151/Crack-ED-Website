/**
 * CRM Service - Handles form submissions to CRM
 * 
 * IMPORTANT SECURITY NOTE:
 * For production, this should call YOUR backend API endpoint, not the CRM directly.
 * Exposing AuthToken in frontend code is a security risk.
 * 
 * Option 1 (RECOMMENDED): Call your backend API
 *   - Frontend -> Your Backend API -> CRM
 *   - AuthToken stays secure on backend
 * 
 * Option 2 (NOT RECOMMENDED): Direct call from frontend
 *   - Frontend -> CRM (AuthToken exposed in code)
 *   - Only use for development/testing
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
  'Piramal ProEdge Program - Relationship Manager': '47',
  'Paytm Disha Program - Field Sales Executive': '55',
}

/** Base URL for our Django backend (set in .env as VITE_API_URL, or use proxy with '') */
export const getApiBase = () => (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || ''

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
  const payload = {
    firstName: firstName || '—',
    lastName: lastName || '—',
    email,
    mobile,
    program,
    center,
    sourcePage,
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

  const payload = {
    firstName,
    lastName,
    email: formData.email,
    mobile: formData.mobile,
    program: formData.program,
    center,
    sourcePage,
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
