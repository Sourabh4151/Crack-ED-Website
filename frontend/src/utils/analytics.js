// Analytics utility for GA4 custom events

const DEBUG_ANALYTICS = false

const JOURNEY_KEY = 'crack_ed_journey'
const VISITED_PROGRAMS_KEY = 'crack_ed_visited_programs'

/**
 * Mark that the user visited the programs/explore page.
 */
export function markProgramsPageVisited() {
  sessionStorage.setItem(VISITED_PROGRAMS_KEY, 'true')
}

/**
 * Mark that the user completed the quiz (results shown).
 */
export function markQuizCompleted() {
  sessionStorage.setItem(JOURNEY_KEY, 'quiz')
}

/**
 * Determine the journey type: "quiz" > "explore" > "direct"
 */
function getJourney() {
  if (sessionStorage.getItem(JOURNEY_KEY) === 'quiz') return 'quiz'
  if (sessionStorage.getItem(VISITED_PROGRAMS_KEY) === 'true') return 'explore'
  return 'direct'
}

/**
 * Fire the microsite_click event.
 * @param {string} programName - The name of the program clicked
 */
export function trackMicrositeClick(programName) {
  if (window.gtag) {
    window.gtag('event', 'microsite_click', {
      journey: getJourney(),
      program_name: programName,
    })
  }
}

/**
 * Determine page_type from the current pathname.
 */
function getPageType() {
  const path = window.location.pathname
  if (path === '/') return 'home'
  if (path === '/programs') return 'programs'
  if (path === '/about') return 'about'
  if (path === '/careers') return 'careers'
  if (path === '/influencer') return 'influencer'
  if (path === '/resources') return 'resources'
  if (path.startsWith('/resources/blog/')) return 'blog_post'
  if (path.startsWith('/careers/job/')) return 'job_detail'
  return path.replace(/^\//, '') || 'home'
}

/**
 * Fire the generate_lead event on successful enquiry form submission.
 */
export function trackGenerateLead() {
  if (window.gtag) {
    window.gtag('event', 'generate_lead', {
      page_type: getPageType(),
    })
  }
}
