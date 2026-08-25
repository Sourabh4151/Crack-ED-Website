import React from 'react'
import Header from '../components/Header/Header'
import AboutHero from '../components/AboutHero/AboutHero'
import BuildingCareers from '../components/BuildingCareers/BuildingCareers'
import OurVision from '../components/OurVision/OurVision'
import Values from '../components/Values/Values'
import Leadership from '../components/Leadership/Leadership'
import Centres from '../components/Centres/page'
import EnquireSection from '../components/EnquireSection/EnquireSection'
import Footer from '../components/Footer/Footer'
import './About.css'
import SEO from '../components/SEO/SEO'
import { PAGE_SEO } from '../seo/site'

const About = () => {
  return (
    <div className="about-page">
      <SEO
        title={PAGE_SEO.about.title}
        description={PAGE_SEO.about.description}
        path={PAGE_SEO.about.path}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' },
        ]}
      />
      <Header />
      <AboutHero />
      <BuildingCareers />
      <OurVision />
      <Values />
      <Leadership />
      <Centres />
      <EnquireSection />
      <Footer />
    </div>
  )
}

export default About

