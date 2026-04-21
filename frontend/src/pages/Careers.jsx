import React from 'react'
import Header from '../components/Header/Header'
import CareersHero from '../components/CareersHero/CareersHero'
import CareersTransition from '../components/CareersTransition/CareersTransition'
import LifeAtCrackED from '../components/LifeAtCrackED/LifeAtCrackED'
import OpenRoles from '../components/OpenRoles/OpenRoles'
import Footer from '../components/Footer/Footer'
import './Careers.css'

const Careers = () => {
  return (
    <div className="careers-page">
      <Header />
      <div className="careers-scroll-wrapper">
        <CareersHero />
        <CareersTransition />
        <LifeAtCrackED />
        <OpenRoles />
        <Footer />
      </div>
    </div>
  )
}

export default Careers
