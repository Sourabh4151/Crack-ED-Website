import React, { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
import Analyse from '../components/analyse/page'
import EnquireSection from '../components/EnquireSection/EnquireSection'
import Partners from '../components/partners/page'
import FloatingSteps from '../components/FloatingSteps/page'
import SEO from '../components/SEO/SEO'
import { PAGE_SEO } from '../seo/site'

gsap.registerPlugin(ScrollTrigger)

const DESKTOP_MQ = '(min-width: 769px)'
const CALIBRATE_PIN_SELECTORS = '.analyse, .career-forward-sectionWhychooseus'

const unpinCalibrateSections = () => {
  const nodes = document.querySelectorAll(CALIBRATE_PIN_SELECTORS)
  if (!nodes.length) return
  ScrollTrigger.getAll().forEach((st) => {
    for (const node of nodes) {
      if (st.trigger === node) {
        st.kill()
        break
      }
    }
  })
}

const Home = () => {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia(DESKTOP_MQ).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ)
    const onBreakpoint = () => {
      unpinCalibrateSections()
      setIsDesktop(mq.matches)
    }
    mq.addEventListener('change', onBreakpoint)
    return () => mq.removeEventListener('change', onBreakpoint)
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
      <main>
        <Hero />   <Programs />
        <Whychooseus />
        <FloatingSteps />
        {isDesktop ? <Analysis /> : <Analyse />}
        <Stats />
        <Testimonial />
        <CareerForward />
        <Media />
        <Partners />
        <EnquireSection />
      </main>
      <Footer />
      {/* <CareerForward /> */}
    </div>
  )
}

export default Home