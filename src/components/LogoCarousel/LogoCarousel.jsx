import React from 'react'
import lenskartLogo from '../../assets/lenskart.png'
import paytmLogo from '../../assets/paytm.png'
import piramalLogo from '../../assets/piramal.png'
import testbookLogo from '../../assets/testbook.png'
import './LogoCarousel.css'

const LogoCarousel = () => {
  const logos = [
    { name: 'Lenskart', image: lenskartLogo },
    { name: 'Paytm', image: paytmLogo },
    { name: 'Piramal Finance', image: piramalLogo },
    { name: 'Testbook', image: testbookLogo },
  ]

  // Duplicate logos for seamless infinite scroll (need 2 sets to loop smoothly)
  const duplicatedLogos = [...logos, ...logos]

  return (
    <div className="logo-carousel-container">
      <div className="logo-carousel-track">
        {duplicatedLogos.map((logo, index) => (
          <div key={index} className="logo-carousel-item">
            <img 
              src={logo.image} 
              alt={logo.name} 
              className="logo-image"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LogoCarousel