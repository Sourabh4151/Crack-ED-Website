import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    // #root is the scroll container - must scroll it too for BID and Careers pages
    const root = document.getElementById('root')
    if (root) {
      root.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}

export default ScrollToTop
