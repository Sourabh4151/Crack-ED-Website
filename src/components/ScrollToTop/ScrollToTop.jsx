import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.querySelector('.bid-page, .careers-page, .job-detail-page')?.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
