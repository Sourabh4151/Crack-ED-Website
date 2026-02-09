import React, { useState } from 'react'
import aboutHeroImage from '../../assets/about_hero.jpg'
import EnquireModal from '../EnquireModal/EnquireModal'
import './AboutHero.css'

const AboutHero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEnquireClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section className="about-hero">
      <div className="about-hero-overlay"></div>
      <div className="about-hero-background">
        <img src={aboutHeroImage} alt="Crack-ED team" className="about-hero-bg-image" />
      </div>

      <div className="about-hero-content">
        <div className="about-hero-container">
          <div className="about-hero-text-section">
            <div className="about-hero-text-content">
              <h1 className="about-hero-headline">
                <span className="about-hero-headline-first-line">WHERE AMBITION MEETS</span>
                <br />
                OPPORTUNITY
              </h1>
              <p className="about-hero-subheadline">
                At Crack-ED, we help motivated learners gain the skills and confidence they need to build meaningful
                careers, regardless of where they start.
              </p>
            </div>
            <button className="about-hero-cta-button" onClick={handleEnquireClick}>
              Enquire Now
            </button>
          </div>
        </div>
      </div>
      <EnquireModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  )
}

export default AboutHero

