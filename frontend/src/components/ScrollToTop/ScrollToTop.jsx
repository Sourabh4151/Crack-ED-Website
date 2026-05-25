import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PAGE_SCROLL_WRAPPER = {
  '/careers': '.careers-scroll-wrapper',
  '/contact-us': '.contact-scroll-wrapper',
  '/resources': '.resources-scroll-wrapper',
}

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const wrapperSelector = PAGE_SCROLL_WRAPPER[pathname]
    const wrapper = wrapperSelector ? document.querySelector(wrapperSelector) : null
    if (wrapper) {
      wrapper.scrollTo(0, 0)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}

export default ScrollToTop
