import React from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import Programs from '../components/Programs/Programs'
import Stats from '../components/Stats/Stats'
import Testimonial from '../components/Testimonial/Testimonial'
import Footer from '../components/Footer/Footer'
import CareerForward from '../components/CareerForward/CareerForward'
import './Home.css'
import Whychooseus from '../components/whychoseus/page'
import Analysis from '../components/analysis/page'
import Centres from '../components/Centres/page'
import Media from '../components/mediasection/page'
import Analyse from '../components/analyse/page'
import EnquireSection from '../components/EnquireSection/EnquireSection'
import Partners from '../components/partners/page'
import FloatingSteps from '../components/FloatingSteps/page'
import BidPopup from '../components/BidPopup/BidPopup'


const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <Hero />   <Programs />
      <CareerForward />
      <Whychooseus />
      <FloatingSteps />
      <Analysis />
      <Analyse />
      <Stats />
      <Centres />
      <Media />
      <Partners />
      <Testimonial />
      <EnquireSection />
      <Footer />
      <BidPopup />
      {/* <CareerForward /> */}
    </div>
  )
}

export default Home