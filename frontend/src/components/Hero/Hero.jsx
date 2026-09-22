import React, { lazy, Suspense, useEffect, useState } from 'react'
import './Hero.css'

const EnquireModal = lazy(() => import('../EnquireModal/EnquireModal'))
const LogoCarousel = lazy(() => import('../LogoCarousel/LogoCarousel'))

const preloadEnquireModal = () => {
  import('../EnquireModal/EnquireModal')
}

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const boot = document.getElementById('hero-lcp')
    if (!boot) return undefined

    const hideBoot = () => {
      boot.style.visibility = 'hidden'
    }

    const img = document.querySelector('.hero-bg-image')
    if (img?.complete) {
      hideBoot()
    } else {
      img?.addEventListener('load', hideBoot, { once: true })
    }
    const fallback = window.setTimeout(hideBoot, 2500)
    return () => {
      img?.removeEventListener('load', hideBoot)
      window.clearTimeout(fallback)
      boot.remove()
    }
  }, [])

  const handleEnquireClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-background">
        <img
          src="/hero_section_image.webp"
          alt="Professional workspace"
          className="hero-bg-image"
          width="1376"
          height="768"
          loading="eager"
          fetchpriority="high"
          decoding="sync"
        />
      </div>

      <div className="hero-content">
        <div className="hero-container">
          <div className="hero-text-section">
            <div className="hero-text-content">
              <h1 className="hero-headline">
                UPSKILL TODAY,
                <br />
                <span className="hero-headline-line">
                  <span className="crack-text">CRACK</span> THE WORLD
                </span>
                <br />
                TOMORROW
              </h1>
              <p className="hero-subheadline">
                Apply. Learn with our ABC model. Get hired.
              </p>
            </div>
            <button
              className="hero-cta-button"
              onClick={handleEnquireClick}
              onMouseEnter={preloadEnquireModal}
              onFocus={preloadEnquireModal}
            >
              Enquire Now
            </button>
          </div>
        </div>
        <div className="hero-logo-wrap">
          <Suspense fallback={<div className="logo-carousel-placeholder" aria-hidden="true" />}>
            <LogoCarousel />
          </Suspense>
        </div>
      </div>
      {isModalOpen && (
        <Suspense fallback={null}>
          <EnquireModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </Suspense>
      )}
    </section>
  )
}

export default Hero
