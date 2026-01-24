import React from 'react'
import Header from '../components/Header/Header'
import CareersHero from '../components/CareersHero/CareersHero'
import CareersTransition from '../components/CareersTransition/CareersTransition'
import LifeAtCrackED from '../components/LifeAtCrackED/LifeAtCrackED'
import Values from '../components/Values/Values'
import OpenRoles from '../components/OpenRoles/OpenRoles'
import Footer from '../components/Footer/Footer'
import './Careers.css'

const Careers = () => {
  return (
    <div className="careers-page">
      <Header />
      <CareersHero />
      <CareersTransition />
      <LifeAtCrackED />
      <Values />
      <OpenRoles />
      {/* Additional components will be added here */}
      <Footer />
    </div>
  )
}

export default Careers
