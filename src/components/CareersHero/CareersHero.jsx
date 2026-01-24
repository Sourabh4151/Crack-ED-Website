import React from 'react'
import careersHeroImage from '../../assets/Careers_hero.jpg'
import './CareersHero.css'

const CareersHero = () => {
  const handleSeeOpeningsClick = () => {
    // Scroll to job openings section when implemented
    const openingsSection = document.getElementById('job-openings')
    if (openingsSection) {
      openingsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="careers-hero">
      <div className="careers-hero-overlay"></div>
      <div className="careers-hero-background">
        <img src={careersHeroImage} alt="Team at CRACK-ED" className="careers-hero-bg-image" />
      </div>
      
      <div className="careers-hero-content">
        <div className="careers-hero-container">
          <div className="careers-hero-text-section">
            <div className="careers-hero-text-content">
              <h1 className="careers-hero-headline">
                JOIN US IN SHAPING
                <br />
                TOMORROW'S FUTURE
              </h1>
              <p className="careers-hero-subheadline">
                We're on a mission to change how the world learns. Bring your ideas, and let's make it happen together.
              </p>
            </div>
            <button 
              className="careers-hero-cta-button"
              onClick={handleSeeOpeningsClick}
            >
              See Openings
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CareersHero
