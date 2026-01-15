import React from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import Programs from '../components/Programs/Programs'
import Stats from '../components/Stats/Stats'
import Testimonial from '../components/Testimonial/Testimonial'
import CareerForward from '../components/CareerForward/CareerForward'
import './Home.css'

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      <Programs />
      <Stats />
      <Testimonial />
      {/* <CareerForward /> */}
    </div>
  )
}

export default Home