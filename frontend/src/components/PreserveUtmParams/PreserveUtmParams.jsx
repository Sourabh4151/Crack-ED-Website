import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getStoredUtmParams, buildSearchWithUtm } from '../../services/crmService'

const UTM_NAMES = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

/**
 * Persist UTM params from the current URL into sessionStorage so they survive navigation.
 * Call this whenever location has UTM params (e.g. on load or when user lands on a campaign URL).
 */
function persistUtmFromSearch(search) {
  if (typeof window === 'undefined' || !search) return
  const params = new URLSearchParams(search)
  const utm = {}
  for (const name of UTM_NAMES) {
    const value = params.get(name)
    if (value != null && value.trim() !== '') utm[name] = String(value).trim().slice(0, 500)
  }
  if (Object.keys(utm).length > 0) {
    try {
      window.sessionStorage.setItem('crack_ed_utm', JSON.stringify(utm))
    } catch (_) {}
  }
}

/**
 * When the user navigates (e.g. Home with ?utm_campaign=... to /about), re-applies
 * stored UTM params to the URL so they are not lost. Also persists current URL's
 * UTM params to sessionStorage so they're available after navigation.
 */
export default function PreserveUtmParams() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // 1. Persist any UTM params from the current URL so they're stored before we navigate away
    persistUtmFromSearch(location.search)

    const stored = getStoredUtmParams()
    if (Object.keys(stored).length === 0) return

    const currentSearch = location.search || ''
    const desiredSearch = buildSearchWithUtm(currentSearch, stored)
    if (desiredSearch !== currentSearch) {
      navigate(
        { pathname: location.pathname, search: desiredSearch },
        { replace: true }
      )
    }
  }, [location.pathname, location.search, navigate])

  return null
}
