import React from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import Programs from '../components/Programs/Programs'
import CareerForward from '../components/CareerForward/CareerForward'
import './Home.css'

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      <Programs />
      <CareerForward />
    </div>
  )
}

export default Home