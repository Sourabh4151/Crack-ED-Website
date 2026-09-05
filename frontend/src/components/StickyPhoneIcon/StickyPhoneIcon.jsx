import React, { useState, useEffect, useCallback } from 'react'
import './StickyPhoneIcon.css'

const PHONE_NUMBER = '8810331340'
const PHONE_DISPLAY = '+91 881033 1340'

const StickyPhoneIcon = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handleIconClick = () => {
    setIsPopupOpen(prev => !prev)
  }

  const handleCallClick = () => {
    window.location.href = `tel:${PHONE_NUMBER}`
    setIsPopupOpen(false)
  }

  const handleClosePopup = useCallback(() => {
    setIsPopupOpen(false)
  }, [])

  // Close popup on scroll
  useEffect(() => {
    if (!isPopupOpen) return

    const handleScroll = () => {
      setIsPopupOpen(false)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isPopupOpen])

  return (
    <>
      {isPopupOpen && (
        <div className="sticky-phone-popup-overlay" onClick={handleClosePopup}>
          <div className="sticky-phone-popup" onClick={(e) => e.stopPropagation()}>
            <button className="sticky-phone-popup-close" onClick={handleClosePopup} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h3 className="sticky-phone-popup-title">Talk to Us</h3>
            <p className="sticky-phone-popup-subtitle">Our team is ready to help you</p>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="sticky-phone-popup-call-btn"
              onClick={handleCallClick}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M18.3333 14.1V16.6C18.3343 16.8321 18.2867 17.0618 18.1937 17.2745C18.1008 17.4871 17.9644 17.678 17.7934 17.8349C17.6224 17.9918 17.4205 18.1112 17.2002 18.1856C16.9799 18.26 16.7461 18.2876 16.515 18.2667C13.9521 17.988 11.4893 17.1127 9.32499 15.7083C7.31151 14.4289 5.60443 12.7218 4.32499 10.7083C2.91664 8.53535 2.04119 6.06221 1.76666 3.48999C1.74583 3.25963 1.77324 3.02647 1.84711 2.80663C1.92097 2.58679 2.03965 2.38507 2.1956 2.21416C2.35155 2.04326 2.54131 1.90672 2.75283 1.81327C2.96435 1.71981 3.19292 1.6715 3.42499 1.67166H5.92499C6.32941 1.66768 6.72148 1.81149 7.02812 2.07575C7.33476 2.34001 7.53505 2.69972 7.59166 3.09166C7.69718 3.87497 7.89287 4.64408 8.17499 5.38333C8.28699 5.66828 8.31125 5.98024 8.2449 6.27975C8.17854 6.57926 8.02436 6.85298 7.79999 7.06666L6.74166 8.125C7.92793 10.2034 9.67656 11.9521 11.755 13.1383L12.8133 12.08C13.027 11.8556 13.3007 11.7015 13.6002 11.6351C13.8998 11.5687 14.2117 11.593 14.4967 11.705C15.2359 11.9871 16.005 12.1828 16.7883 12.2883C17.1931 12.3455 17.556 12.5498 17.8206 12.8611C18.0853 13.1725 18.2263 13.5687 18.2167 13.975L18.3333 14.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      )}
      <button
        className={`sticky-phone-icon ${isPopupOpen ? 'active' : ''}`}
        onClick={handleIconClick}
        aria-label="Talk to Us"
        title="Talk to Us"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5342 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.271 2.11999 4.18001C2.09501 3.90347 2.12787 3.62477 2.21649 3.36163C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00027 4.10999 2.00001H7.10999C7.5953 1.99523 8.06579 2.16708 8.43376 2.48354C8.80173 2.79999 9.04207 3.23945 9.10999 3.72001C9.23662 4.68007 9.47144 5.62273 9.80999 6.53001C9.94454 6.88793 9.97366 7.27692 9.8939 7.65089C9.81415 8.02485 9.62886 8.36812 9.35999 8.64001L8.08999 9.91001C9.51355 12.4136 11.5865 14.4865 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1859 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="sticky-phone-pulse"></span>
      </button>
    </>
  )
}

export default StickyPhoneIcon