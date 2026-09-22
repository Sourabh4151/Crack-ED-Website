import React, { lazy, Suspense, useEffect, useState } from 'react'
import './Hero.css'

const EnquireModal = lazy(() => import('../EnquireModal/EnquireModal'))
const LogoCarousel = lazy(() => import('../LogoCarousel/LogoCarousel'))

const preloadEnquireModal = () => {
  import('../EnquireModal/EnquireModal')
}

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showCarousel, setShowCarousel] = useState(false)
  const [hasBootHero] = useState(() => typeof document !== 'undefined' && !!document.getElementById('hero-lcp'))

  useEffect(() => {
    return () => {
      const path = window.location.pathname
      if (path === '/' || path === '') return
      document.getElementById('hero-lcp-clip')?.remove()
    }
  }, [])

  useEffect(() => {
    let idleId
    let timeoutId
    let raf1
    let raf2

    const show = () => setShowCarousel(true)

    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        if (typeof window.requestIdleCallback === 'function') {
          idleId = window.requestIdleCallback(show, { timeout: 800 })
        } else {
          timeoutId = window.setTimeout(show, 0)
        }
      })
    })

    return () => {
      if (raf1) window.cancelAnimationFrame(raf1)
      if (raf2) window.cancelAnimationFrame(raf2)
      if (idleId != null && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId != null) window.clearTimeout(timeoutId)
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
      {!hasBootHero && <div className="hero-overlay"></div>}
      <div className="hero-background">
        {!hasBootHero && (
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
        )}
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
          {showCarousel ? (
            <Suspense fallback={<div className="logo-carousel-placeholder" aria-hidden="true" />}>
              <LogoCarousel />
            </Suspense>
          ) : (
            <div className="logo-carousel-placeholder" aria-hidden="true" />
          )}
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
