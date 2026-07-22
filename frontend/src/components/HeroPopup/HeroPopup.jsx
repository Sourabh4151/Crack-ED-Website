import React, { useEffect, useState } from 'react'
import './HeroPopup.css'
import houseOfFoundersBg from '../../assets/Enter.png'
import tickPopup from '../../assets/tick_popup.svg'
import { trackMicrositeClick } from '../../utils/analytics'
import { appendUtmToUrl } from '../../services/crmService'

const APPLY_URL = 'https://house-of-founders.crack-ed.com/'
const STORAGE_KEY = 'hof_popup_seen_v1'

const FEATURES = [
  'Learn from Startup Founders through expert-led sessions and mentorship.',
  '156+ Hours covering strategy, finance, marketing, AI, and business growth.',
  'Exclusive investor pitching opportunity for high-potential ventures.*',
]

const HeroPopup = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let showTimer = null
    let closeTimer = null
    try {
      const seen = sessionStorage.getItem(STORAGE_KEY)
      if (!seen) {
        showTimer = setTimeout(() => {
          setVisible(true)
          closeTimer = setTimeout(() => handleClose(), 15000)
        }, 2000)
      }
    } catch {
      // ignore storage errors
    }
    return () => {
      if (showTimer) clearTimeout(showTimer)
      if (closeTimer) clearTimeout(closeTimer)
    }
  }, [])

  const markSeen = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore
    }
  }

  const handleClose = () => {
    setVisible(false)
    markSeen()
  }

  const handleApply = () => {
    trackMicrositeClick('House of Founders Fellowship')
    window.open(appendUtmToUrl(APPLY_URL), '_blank', 'noopener,noreferrer')
    handleClose()
  }

  if (!visible) return null

  return (
    <div className="hero-popup-overlay" role="dialog" aria-modal="true" aria-labelledby="hero-popup-heading">
      <div className="hero-popup">
        <img src={houseOfFoundersBg} alt="" className="hero-popup-bg" aria-hidden />
        <div className="hero-popup-shade" aria-hidden />
        <button
          type="button"
          className="hero-popup-close"
          aria-label="Close popup"
          onClick={handleClose}
        >
          ×
        </button>
        <div className="hero-popup-content">
          <div className="hero-popup-intro">
            <h2 id="hero-popup-heading" className="hero-popup-heading">
              House of Founders Fellowship
            </h2>
            <p className="hero-popup-description">
              Designed for entrepreneurs ready to build stronger businesses, make better decisions,
              and unlock their next stage of growth.
            </p>
          </div>
          <ul className="hero-popup-features">
            {FEATURES.map((feature) => (
              <li key={feature}>
                <img src={tickPopup} alt="" className="hero-popup-tick" aria-hidden />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="hero-popup-campus">
            <svg
              className="hero-popup-campus-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18C5 17.18 7.5 20 12 20C16.5 20 19 17.18 19 17.18V13.18L12 17L5 13.18Z"
                fill="currentColor"
              />
            </svg>
            <span>CAMPUS IMMERSION AT A LEADING MANAGEMENT INSTITUTE</span>
          </div>
          <button type="button" className="hero-popup-apply" onClick={handleApply}>
            Apply Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroPopup
