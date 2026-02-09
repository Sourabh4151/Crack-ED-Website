import React, { useState } from 'react'
import heroImage from '../../assets/hero_section_image.png'
import LogoCarousel from '../LogoCarousel/LogoCarousel'
import EnquireModal from '../EnquireModal/EnquireModal'
import './Hero.css'

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
        <img src={heroImage} alt="Professional workspace" className="hero-bg-image" />
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
            >
              Enquire Now
            </button>
          </div>
        </div>
        <div className="hero-logo-wrap">
          <LogoCarousel />
        </div>
      </div>
      <EnquireModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  )
}

export default Hero