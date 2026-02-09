import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './BuildingCareers.css'

const BuildingCareers = () => {
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
      className={`building-careers${isInView ? ' in-view' : ''}`}
    >
      <div className="building-careers-inner">
        <h2 className="building-careers-heading">Building Careers That Matter</h2>
        <div className="building-careers-accent" aria-hidden="true" />
        <div className="building-careers-body">
          <p className="building-careers-paragraph">
            At Crack-ED, we know that talent is everywhere but opportunity is not. That's why we focus on bringing real skills and meaningful support to learners across India, from bustling cities to smaller towns. We believe everyone deserves a fair shot at building a career they love.
          </p>
          <p className="building-careers-paragraph">
            Our programs are designed to be accessible, affordable, and most importantly, useful. We don't just teach, we guide you every step of the way, from learning new skills to landing your first job. Success is more than a certificate; it is about real growth and confidence.
          </p>
          <p className="building-careers-paragraph">
            We are here to close the gap between what education offers and what the professional world demands. When you bring your passion, we will bring the tools and support you need to take that next step forward.
          </p>
        </div>
        <Link to="/programs" className="building-careers-cta">
          Explore Programs
        </Link>
      </div>
    </section>
  )
}

export default BuildingCareers
