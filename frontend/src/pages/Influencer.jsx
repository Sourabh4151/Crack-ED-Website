import React from 'react'
import Header from '../components/Header/Header'
import InfluencerCareerForward from '../components/InfluencerCareerForward/InfluencerCareerForward'
import Footer from '../components/Footer/Footer'
import './Influencer.css'
import SEO from '../components/SEO/SEO'
import { PAGE_SEO } from '../seo/site'

const Influencer = () => {
  return (
    <div className="influencer-page">
      <SEO
        title={PAGE_SEO.influencer.title}
        description={PAGE_SEO.influencer.description}
        path={PAGE_SEO.influencer.path}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Career Quiz', path: '/influencer' },
        ]}
      />
      <Header />
      <InfluencerCareerForward />
      <Footer />
    </div>
  )
}

export default Influencer

