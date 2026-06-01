import React from 'react'
import premiumProgramImage from '../../assets/relationship manager_desktop.jpg'
import './PremiumProgram.css'

const programHighlights = [
  'Join as a Relationship Manager with a CTC of Rs 5.5 LPA + incentives',
  '6-month program',
]

const PremiumProgram = () => {
  return (
    <section id="premium-program" className="premium-program">
      <div className="premium-program-container">
        <div className="premium-program-tag">Premium Program</div>
        <h2 className="premium-program-heading">
          Build client confidence. Get hired as a Relationship Manager.
        </h2>
        <div className="premium-program-card">
          <div className="premium-program-card-background">
            <img 
              src={premiumProgramImage} 
              alt="Premium program professional" 
              className="premium-program-image"
            />
            <div className="premium-program-card-overlay"></div>
          </div>
          <div className="premium-program-card-content">
            <div className="premium-program-card-tag">PGP - Relationship Management</div>
            <h3 className="premium-program-card-title">Relationship Manager</h3>
            <ul className="premium-program-highlights">
              {programHighlights.map((highlight) => (
                <li key={highlight} className="premium-program-highlight">
                  <span className="premium-program-checkmark" aria-hidden="true" />
                  <span className="premium-program-highlight-text">{highlight}</span>
                </li>
              ))}
            </ul>
            <a 
              href="https://pgprm.crack-ed.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="premium-program-learn-more"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PremiumProgram
