import React from 'react'
import Header from '../components/Header/Header'
import InfluencerCareerForward from '../components/InfluencerCareerForward/InfluencerCareerForward'
import Footer from '../components/Footer/Footer'
import './Influencer.css'

const Influencer = () => {
  return (
    <div className="influencer-page">
      <Header />
      <InfluencerCareerForward />
      <Footer />
    </div>
  )
}

export default Influencer

