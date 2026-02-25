import React, { useEffect, useState } from 'react'
import './BidPopup.v2.css'
import bidImg from '../../assets/bid_pop_up.jpg'

const YT_URL = 'https://www.youtube.com/watch?v=OF1jFbyOJOE'

const BidPopup = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let showTimer = null
    let closeTimer = null
    try {
      const seen = sessionStorage.getItem('bid_popup_seen_v1')
      if (!seen) {
        // show popup after 5 seconds
        showTimer = setTimeout(() => {
          setVisible(true)
          // auto-close 15s after shown
          closeTimer = setTimeout(() => {
            handleClose()
          }, 15000)
        }, 2000)
      }
    } catch (e) {
      // ignore storage errors
    }
    return () => {
      if (showTimer) clearTimeout(showTimer)
      if (closeTimer) clearTimeout(closeTimer)
    }
    // run only on mount
  }, [])

  const markSeen = () => {
    try {
      sessionStorage.setItem('bid_popup_seen_v1', '1')
    } catch (e) {
      // ignore
    }
  }

  const handleClose = () => {
    setVisible(false)
    markSeen()
  }

  const handleWatch = () => {
    window.open(YT_URL, '_blank', 'noopener,noreferrer')
    handleClose()
  }

  if (!visible) return null

  return (
    <div className="bid-popup-overlay" role="dialog" aria-modal="true">
      <div className="bid-popup">
        <div className="bid-popup-media">
          <img src={bidImg} alt="Watch Episode" className="bid-popup-image" />
          <button
            className="bid-popup-close"
            aria-label="Close pop up"
            onClick={handleClose}
          >
            ×
          </button>
        </div>
        <div className="bid-popup-bottom">
          <div className="bid-popup-actions">
            <button className="bid-popup-watch" onClick={handleWatch}>
              Watch Episode
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BidPopup

