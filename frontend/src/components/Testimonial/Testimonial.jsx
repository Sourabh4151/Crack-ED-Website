import React, { useState, useEffect } from 'react'
import './Testimonial.css'

const Testimonial = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const testimonials = []

  const testimonialsToShow = isMobile ? testimonials : [...testimonials, ...testimonials]

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <div className="testimonial-header">
   
        </div>
        <div className="testimonial-cards-wrapper">
          <div className="testimonial-cards">
            {testimonialsToShow.map((testimonial, index) => (
              <div key={`${testimonial.id}-${index}`} className="testimonial-card">
                <div className="testimonial-image-container">
                  <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                  <div className="testimonial-content">
                    <h3 className="testimonial-name">{testimonial.name}</h3>
                    <p className="testimonial-title">{testimonial.title}</p>
                    <p className="testimonial-description">{testimonial.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial
