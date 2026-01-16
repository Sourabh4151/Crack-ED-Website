/**
 * CRM Service - Handles form submissions to CRM
 */

// Program to Center mapping
const PROGRAM_TO_CENTER_MAP = {
  'AURUM Bankers Relationship Manager': '67', // Update with correct center ID if needed
  'AURUM Bankers Relationship Officer': '48',
  'AURUM Bankers Bank Officer': '1',
  'AURUM Bankers Sales Officer': '49',
  'AURUM Bankers Transaction Officer': '59',
  'AURUM Bankers Deputy Center Manager': '62',
  'AURUM Bankers Customer Service Officer': '60',
  'AURUM Bankers Late Recovery Officer': '63',
  'AURUM Bankers Money Officer': '65',
  'AURUM Bankers Customer Service Officer Valuation': '66',
  'Lenskart Dispensing Optician Program': '38',
  'Lenskart Retail Sales Officer Program': '61',
}

/**
 * Split full name into first and last name
 */
const splitName = (fullName) => {
  const nameParts = fullName.trim().split(/\s+/)
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
 * Submit lead directly to CRM
 */
export const submitLeadToCRMDirect = async (formData) => {
  const { firstName, lastName } = splitName(formData.fullName)
  const center = getCenterByProgram(formData.program)

  const payload = {
    Source: 'crack-ed',
    AuthToken: 'crack-ed_29-01-2025',
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
