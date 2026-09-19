import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initClarity, trackClarityPage } from '../../utils/clarity'

/**
 * Loads Microsoft Clarity (when configured) and tags client-side route changes.
 * Must render inside the React Router tree.
 */
export default function ClarityTracker() {
  const location = useLocation()

  useEffect(() => {
    initClarity()
  }, [])

  useEffect(() => {
    trackClarityPage(location.pathname)
  }, [location.pathname])

  return null
}
