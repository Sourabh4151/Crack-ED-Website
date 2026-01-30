import React from 'react'
import lenskartLogo from '../../assets/lenskart.png'
import paytmLogoGreyscale from '../../assets/paytm_logo_greyscale.png'
import piramalLogoGreyscale from '../../assets/piramal_greyscale.svg'
import testbookLogo from '../../assets/testbook.png'
import LAPDP3Qlogos from '../../assets/idLAPDP3-Q_logos 2.png'
import InsuranceDekho from '../../assets/InsuranceDekho_idjmo4nKwR_1 1.png'
import auLogoGreyscale from '../../assets/au_logo_greyscale.png'
import bgimg from "../../assets/bgimage.png"
import './LogoCarousel.css'

const LogoCarousel = () => {
  const logos = [
    { name: 'AU Small Finance Bank', image: auLogoGreyscale, noFilter: true },
    { name: 'Lenskart', image: lenskartLogo },
    { name: 'Paytm', image: paytmLogoGreyscale, noFilter: true },
    { name: 'Piramal Finance', image: piramalLogoGreyscale, noFilter: true },
    { name: 'Testbook', image: LAPDP3Qlogos },
    { name: 'InsuranceDekho', image: InsuranceDekho },
  ]

  const duplicatedLogos = [...logos, ...logos]

  return (
    <div style={{position:"relative"}}>
       <div className="logo-carousel-container" >
      <div className="logo-carousel-track">
        {duplicatedLogos.map((logo, index) => (
          <div key={index} className="logo-carousel-item">
            <img 
              src={logo.image} 
              alt={logo.name} 
              className={`logo-image ${logo.noFilter ? 'logo-image-no-filter' : ''} ${logo.name === 'Paytm' ? 'logo-paytm' : ''}`}
            />
          </div>
        ))}
      </div>
    </div>
    </div>
   
  )
}

export default LogoCarousel