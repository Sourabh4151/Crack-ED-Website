import React, { useEffect, useRef, useState } from 'react'
import linkedinIcon from '../../assets/linkedin.png'
import instagramIcon from '../../assets/instagram.png'
import './BIDIntro.css'

const BIDIntro = () => {
  const sectionRef = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true)
      },
      { threshold: 0.5, rootMargin: '0px' }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`bid-intro${isInView ? ' in-view' : ''}`}
    >
      <div className="bid-intro-inner">
        <h2 className="bid-intro-heading">Badhta India Dekho. Badhta India Suno.</h2>
        <div className="bid-intro-accent" aria-hidden="true" />

        <p className="bid-intro-body">
          Badhta India Dekho is a podcast that brings you real stories of entrepreneurs building
          from the ground up across Bharat. Created by Crack-ED and CarDekho Group, the podcast
          dives into the journeys of founders who have faced early struggles, made tough choices,
          and found creative ways to grow. We explore their first wins, funding challenges,
          pandemic pivots, and the resilience that keeps them moving forward. Whether you&apos;re
          an aspiring entrepreneur, a curious listener, or someone who values honest stories, this
          podcast offers an inside look at the people shaping the future of India.
        </p>

        <div className="bid-intro-follow">
          <span className="bid-intro-follow-label">FOLLOW US</span>
          <div className="bid-intro-socials">
            <a
              href="https://www.linkedin.com/company/badhta-india-dekho/"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow on LinkedIn"
            >
              <img src={linkedinIcon} alt="" className="bid-intro-social-icon" />
            </a>
            <a
              href="https://www.instagram.com/badhtaindiadekho/"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow on Instagram"
            >
              <img src={instagramIcon} alt="" className="bid-intro-social-icon" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BIDIntro

