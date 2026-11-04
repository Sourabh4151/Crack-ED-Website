import React from 'react'
import bidLogo from '../../assets/bid_logo.png'
import './BIDHero.css'

const GUEST_FORM_URL = import.meta.env.VITE_BID_PODCAST_GUEST_FORM_URL

const PODCAST_STATS = ['50+ Episodes', '1.5Cr+ Views', '150K+ Subscribers']

const GuestMicIcon = () => (
  <svg
    className="bid-hero-guest-icon"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M6.5 11.5a5.5 5.5 0 0 0 11 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M12 17v3.5M9.5 20.5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

const BIDHero = () => {
  return (
    <section className="bid-hero">
      <div className="bid-hero-background" aria-hidden="true" />

      <div className="bid-hero-content">
        <div className="bid-hero-inner">
          <img src={bidLogo} alt="BID Podcast logo" className="bid-hero-logo" width="220" height="80" decoding="async" />

          <div className="bid-hero-text">
            <h1 className="bid-hero-title">BADHTA INDIA DEKHO</h1>

            <p className="bid-hero-subtitle">
              A podcast by Crack-ED and CarDekho Group spotlighting the grit, grind, and growth
              of Bharat&apos;s entrepreneurs. From first sales to major setbacks, each episode
              uncovers the real journeys behind resilient businesses shaping India&apos;s future.
            </p>

            <ul className="bid-hero-stats" aria-label="Podcast statistics">
              {PODCAST_STATS.map((stat) => (
                <li key={stat}>{stat}</li>
              ))}
            </ul>

            <div className="bid-hero-actions">
              <a
                href="https://www.youtube.com/@BadhtaIndiaDekho/videos"
                target="_blank"
                rel="noreferrer"
                className="bid-hero-cta"
              >
                Listen to the latest episode
              </a>

              {GUEST_FORM_URL ? (
                <a
                  href={GUEST_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bid-hero-guest"
                >
                  Be a Guest
                  <GuestMicIcon />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BIDHero

