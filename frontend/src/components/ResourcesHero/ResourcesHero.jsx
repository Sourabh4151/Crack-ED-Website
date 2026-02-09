import React from 'react'
import resourcesHeroImage from '../../assets/resources_hero.jpg'
import './ResourcesHero.css'

const ResourcesHero = () => {
  const handleStartLearningClick = () => {
    const contentSection = document.getElementById('resources-content')
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="resources-hero">
      <div className="resources-hero-overlay"></div>
      <div className="resources-hero-background">
        <img src={resourcesHeroImage} alt="Professional learning environment" className="resources-hero-bg-image" />
      </div>
      
      <div className="resources-hero-content">
        <div className="resources-hero-container">
          <div className="resources-hero-text-section">
            <div className="resources-hero-text-content">
              <h1 className="resources-hero-headline">
                FUEL YOUR CURIOSITY
              </h1>
              <p className="resources-hero-subheadline">
                Whether you're just starting out or looking to level up, you'll find stories you can relate to, tips you can use, and insights that'll push you closer to your goals.
              </p>
            </div>
            <button 
              className="resources-hero-cta-button"
              onClick={handleStartLearningClick}
            >
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResourcesHero
