import React, { useState } from 'react'
import programsHeroImage from '../../assets/programs_hero.jpg'
import LogoCarousel from '../LogoCarousel/LogoCarousel'
import EnquireModal from '../EnquireModal/EnquireModal'
import './ProgramsHero.css'

const ProgramsHero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleExploreClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section className="programs-hero">
      <div className="programs-hero-overlay"></div>
      <div className="programs-hero-background">
        <img src={programsHeroImage} alt="Professional learning environment" className="programs-hero-bg-image" />
      </div>
      
      <div className="programs-hero-content">
        <div className="programs-hero-container">
          <div className="programs-hero-text-section">
            <div className="programs-hero-text-content">
              <h1 className="programs-hero-headline">
                YOUR CAREER STARTS
                <br />
                HERE
              </h1>
              <p className="programs-hero-subheadline">
                Hands-on programs designed to make you job-ready and confident from day one.
              </p>
            </div>
            <button 
              className="programs-hero-cta-button"
              onClick={handleExploreClick}
            >
              Explore Programs
            </button>
          </div>
        </div>
        <LogoCarousel />
      </div>
      <EnquireModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  )
}

export default ProgramsHero
