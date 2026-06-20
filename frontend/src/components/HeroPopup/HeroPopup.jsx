import React, { useEffect, useState } from 'react'
import './HeroPopup.css'
import heroPopupBg from '../../assets/hero_pop_up.png'
import heroLogo from '../../assets/hero_logo.svg'
import { trackMicrositeClick } from '../../utils/analytics'
import { appendUtmToUrl } from '../../services/crmService'

const APPLY_URL = 'https://herofinancerm.crack-ed.com/'
const STORAGE_KEY = 'hero_popup_seen_v1'

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
    trackMicrositeClick('Hero Housing Finance Pragati Program - Relationship Manager')
    window.open(appendUtmToUrl(APPLY_URL), '_blank', 'noopener,noreferrer')
    handleClose()
  }

  if (!visible) return null

  return (
    <div className="hero-popup-overlay" role="dialog" aria-modal="true" aria-labelledby="hero-popup-heading">
      <div className="hero-popup">
        <img src={heroPopupBg} alt="" className="hero-popup-bg" aria-hidden />
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
          <div className="hero-popup-logo-wrap">
            <img src={heroLogo} alt="Hero Housing Finance" className="hero-popup-logo" />
          </div>
          <div className="hero-popup-copy">
            <h2 id="hero-popup-heading" className="hero-popup-heading">
              Turn Ambition Into a Career in Housing Finance
            </h2>
            <p className="hero-popup-description">
              Build a career with Hero Housing Finance as a Relationship Manager – Mortgage Sales,
              connecting customers with home loan solutions.
            </p>
            <ul className="hero-popup-features">
              <li>Secure a CTC of Rs 2.75 LPA + incentives</li>
              <li>1-month program</li>
            </ul>
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
