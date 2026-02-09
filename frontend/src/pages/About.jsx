import React from 'react'
import Header from '../components/Header/Header'
import AboutHero from '../components/AboutHero/AboutHero'
import BuildingCareers from '../components/BuildingCareers/BuildingCareers'
import OurVision from '../components/OurVision/OurVision'
import Values from '../components/Values/Values'
import Leadership from '../components/Leadership/Leadership'
import EnquireSection from '../components/EnquireSection/EnquireSection'
import Footer from '../components/Footer/Footer'
import './About.css'

const About = () => {
  return (
    <div className="about-page">
      <Header />
      <AboutHero />
      <BuildingCareers />
      <OurVision />
      <Values />
      <Leadership />
      <EnquireSection />
      <Footer />
    </div>
  )
}

export default About

