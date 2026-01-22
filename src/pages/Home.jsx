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
import Media from '../components/mediasection/page'

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <Hero />   <Programs />
       {/* <CareerForward /> */}
      <Whychooseus />
      <Analysis />
   
      <Stats />
      <Media />
      <Testimonial />
      <Footer />
      {/* <CareerForward /> */}
    </div>
  )
}

export default Home