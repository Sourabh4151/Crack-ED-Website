import React from 'react'
import Header from '../components/Header/Header'
import CareersHero from '../components/CareersHero/CareersHero'
import CareersTransition from '../components/CareersTransition/CareersTransition'
import LifeAtCrackED from '../components/LifeAtCrackED/LifeAtCrackED'
import OpenRoles from '../components/OpenRoles/OpenRoles'
import Footer from '../components/Footer/Footer'
import './Careers.css'
import SEO from '../components/SEO/SEO'
import { PAGE_SEO } from '../seo/site'

const Careers = () => {
  return (
    <div className="careers-page">
      <SEO
        title={PAGE_SEO.careers.title}
        description={PAGE_SEO.careers.description}
        path={PAGE_SEO.careers.path}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Careers', path: '/careers' },
        ]}
      />
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
