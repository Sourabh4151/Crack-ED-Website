import React, { useEffect, useState } from 'react'
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
import SEO from '../components/SEO/SEO'
import { PAGE_SEO } from '../seo/site'

const DESKTOP_MQ = '(min-width: 769px)'

const Home = () => {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia(DESKTOP_MQ).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ)
    const sync = () => setIsDesktop(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return (
    <div className="home-page">
      <SEO
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        path={PAGE_SEO.home.path}
        includeWebsite
      />
      <Header />
      <Hero />   <Programs />
      <CareerForward />
      <Whychooseus />
      <FloatingSteps />
      {isDesktop ? <Analysis /> : <Analyse />}
      <Stats />
      <Centres />
      <Media />
      <Partners />
      <Testimonial />
      <EnquireSection />
      <Footer />
      {/* <CareerForward /> */}
    </div>
  )
}

export default Home