import React from 'react'
import bidLogo from '../../assets/bid_logo.png'
import './BIDHero.css'

const BIDHero = () => {
  return (
    <section className="bid-hero">
      <div className="bid-hero-background" aria-hidden="true" />

      <div className="bid-hero-content">
        <div className="bid-hero-inner">
          <img src={bidLogo} alt="Badhta India Dekho logo" className="bid-hero-logo" />

          <div className="bid-hero-text">
            <h1 className="bid-hero-title">BADHTA INDIA DEKHO</h1>

            <p className="bid-hero-subtitle">
              A podcast by Crack-ED and CarDekho Group spotlighting the grit, grind, and growth
              of Bharat&apos;s entrepreneurs. From first sales to major setbacks, each episode
              uncovers the real journeys behind resilient businesses shaping India&apos;s future.
            </p>

            <a
              href="https://www.youtube.com/@BadhtaIndiaDekho/videos"
              target="_blank"
              rel="noreferrer"
              className="bid-hero-cta"
            >
              Listen to the latest episode
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BIDHero

