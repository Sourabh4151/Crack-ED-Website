import React from 'react'
// import premiumProgramImage from '../../assets/premium_program.jpg'
import auPremiumLogo from '../../assets/au_premium.png'
import iimRohtakLogo from '../../assets/iim_rohtak.png'
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
            <div className="premium-program-card-tag">AURUM Bankers Program</div>
            <h3 className="premium-program-card-title">Relationship Manager</h3>
            <div className="premium-program-sponsors">
              <div className="sponsor-logo">
                <img src={auPremiumLogo} alt="AU Small Finance Bank" />
              </div>
              <div className="sponsor-logo">
                <img src={iimRohtakLogo} alt="IIM Rohtak" />
              </div>
              <div className="sponsor-logo">
                <img src={crackEdPremiumLogo} alt="CRACK-ED" />
              </div>
            </div>
            <a 
              href="https://aurmroyale.crack-ed.com/" 
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
