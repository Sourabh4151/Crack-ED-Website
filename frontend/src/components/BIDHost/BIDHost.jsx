import React, { useEffect, useRef, useState } from 'react'
import founderImage from '../../assets/founder.jpg'
import './BIDHost.css'

const BIDHost = () => {
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
      className={`bid-host${isInView ? ' in-view' : ''}`}
    >
      <div className="bid-host-inner">
        <p className="bid-host-pill">Meet The Host</p>

        <h2 className="bid-host-heading">
          The voice behind the conversations shaping a growing India.
        </h2>

        <div className="bid-host-card">
          <div className="bid-host-image-wrapper">
            <img
              src={founderImage}
              alt="Debojit Sen, Founder & CEO of Crack-ED"
              className="bid-host-image"
            />
          </div>

          <div className="bid-host-content">
            <div>
              <h3 className="bid-host-name">Debojit Sen</h3>
              <p className="bid-host-role">Founder &amp; CEO, Crack-ED</p>
              <div className="bid-host-accent" aria-hidden="true" />
            </div>

            <p className="bid-host-body">
              With over 12 years of experience across Ed-Tech, Auto-Tech, and Media, Debojit has
              led high-impact P&amp;L and sales functions at scale. After spending a decade in the
              ed-tech ecosystem, he saw a clear gap between what education teaches and what the
              professional world actually demands. That insight led to the creation of Crack-ED,
              built to bridge this gap with real exposure and job-ready learning.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BIDHost

