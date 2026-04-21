import React from 'react'
// import premiumProgramImage from '../../assets/premium_program.jpg'
import iimLucknowLogo from '../../assets/iim_lucknow.svg'
import crackEdPremiumLogo from '../../assets/crack-ed_premium.png'
import premiumProgramImage from '../../assets/relationship manager_desktop.jpg'
import './PremiumProgram.css'

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
            <div className="premium-program-sponsors">
              <div className="sponsor-logo">
                <img src={crackEdPremiumLogo} alt="CRACK-ED" />
              </div>
              <div className="sponsor-logo">
                <img src={iimLucknowLogo} alt="IIM Lucknow" style={{ width: '146px', height: '44.92px' }} />
              </div>
            </div>
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
