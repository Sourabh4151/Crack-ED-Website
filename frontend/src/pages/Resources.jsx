import React from 'react'
import Header from '../components/Header/Header'
import ResourcesHero from '../components/ResourcesHero/ResourcesHero'
import ResourcesBlogList from '../components/ResourcesBlogList/ResourcesBlogList'
import ResourcesFilter from '../components/ResourcesFilter/ResourcesFilter'
import EnquireSection from '../components/EnquireSection/EnquireSection'
import Footer from '../components/Footer/Footer'
import './Resources.css'

const Resources = () => {
  return (
    <div className="resources-page">
      <Header />
      <div className="resources-scroll-wrapper">
        <ResourcesHero />
        <main id="resources-content" className="resources-content">
          <ResourcesBlogList />
        </main>
        <ResourcesFilter />
        <EnquireSection />
        <Footer />
      </div>
    </div>
  )
}

export default Resources
