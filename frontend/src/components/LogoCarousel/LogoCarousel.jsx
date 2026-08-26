import React from 'react'
import lenskartLogo from '../../assets/lenskart_greyscale_new.png'
import paytmLogoGreyscale from '../../assets/paytm_greyscale_new.png'
import piramalLogoGreyscale from '../../assets/piramal_greyscale_new.png'
import testbookLogo from '../../assets/testbook.png'
import LAPDP3Qlogos from '../../assets/finova_greyscale_new.png'
import InsuranceDekho from "../../assets/insurancedekho_greyscale_new.png"
import auLogoGreyscale from '../../assets/au_logo_greyscale.png'
import greenfinchLogo from '../../assets/greenfinch_greyscale_new.png'
import nivabupaLogo from '../../assets/nivabupa_greyscale_new.png'
import skfinanceLogo from '../../assets/skfinance_greyscale_new.png'
import adityabirlaLogo from '../../assets/adityabirla_greyscale.png'
import poonawallaLogo from '../../assets/poonawalla_greyscacle_logo.png'
import avivaLogo from '../../assets/aviva_greyscale.png'
import bandhanLogo from '../../assets/bandhan_greyscale.png'
import mahindraLogo from '../../assets/mahindra_finance_greyscale.png'
import kotakLogoGreyscale from '../../assets/kotak_greyscale.png'
import heroLogoGreyscale from '../../assets/greyscale_hero.png'
import rupyyLogo from '../../assets/rupyy_greyscale_logo.png'
import './LogoCarousel.css'

const LogoCarousel = () => {
  const logos = [
    { name: 'AU Small Finance Bank', image: auLogoGreyscale, noFilter: true },
    { name: 'Lenskart', image: lenskartLogo },
    { name: 'Paytm', image: paytmLogoGreyscale, noFilter: true },
    { name: 'Piramal Finance', image: piramalLogoGreyscale, noFilter: true },
    { name: 'Hero Housing Finance', image: heroLogoGreyscale, noFilter: true },
    { name: 'Testbook', image: LAPDP3Qlogos },
    { name: 'InsuranceDekho', image: InsuranceDekho },
    { name: 'Greenfinch Global Consulting', image: greenfinchLogo, noFilter: true },
    { name: 'Niva Bupa Health Insurance', image: nivabupaLogo, noFilter: true },
    { name: 'SK Finance', image: skfinanceLogo },
    { name: 'Aditya Birla', image: adityabirlaLogo, noFilter: true },
    { name: 'Poonawalla Fincorp', image: poonawallaLogo, noFilter: true },
    { name: 'Aviva', image: avivaLogo, noFilter: true },
    { name: 'Bandhan Bank', image: bandhanLogo, noFilter: true },
    { name: 'Mahindra Finance', image: mahindraLogo, noFilter: true },
    { name: 'Kotak Mahindra Prime', image: kotakLogoGreyscale, noFilter: true },
    { name: 'Rupyy', image: rupyyLogo, noFilter: true },
  ]

  const duplicatedLogos = [...logos, ...logos]

  return (
    <div style={{ position: 'relative' }}>
      <div className="logo-carousel-container">
        <div className="logo-carousel-track">
          {duplicatedLogos.map((logo, index) => (
            <div key={index} className="logo-carousel-item">
              <img
                src={logo.image}
                alt={logo.name}
                loading={index < 3 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority="low"
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