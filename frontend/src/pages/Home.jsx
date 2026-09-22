import React, { lazy, Suspense, useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import LazySection from '../components/LazySection/LazySection'
import './Home.css'
import SEO from '../components/SEO/SEO'
import { PAGE_SEO } from '../seo/site'

const Programs = lazy(() => import('../components/Programs/Programs'))
const Whychooseus = lazy(() => import('../components/whychoseus/page'))
const FloatingSteps = lazy(() => import('../components/FloatingSteps/page'))
const Analysis = lazy(() => import('../components/analysis/page'))
const Analyse = lazy(() => import('../components/analyse/page'))
const Stats = lazy(() => import('../components/Stats/Stats'))
const Testimonial = lazy(() => import('../components/Testimonial/Testimonial'))
const CareerForward = lazy(() => import('../components/CareerForward/CareerForward'))
const Media = lazy(() => import('../components/mediasection/page'))
const Partners = lazy(() => import('../components/partners/page'))
const EnquireSection = lazy(() => import('../components/EnquireSection/EnquireSection'))
const Footer = lazy(() => import('../components/Footer/Footer'))

const DESKTOP_MQ = '(min-width: 769px)'
const CALIBRATE_PIN_SELECTORS = '.analyse, .career-forward-sectionWhychooseus'

const unpinCalibrateSections = async () => {
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
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
      // Let Analysis/Analyse useEffect cleanup revert pins before React
      // unmounts. Killing ScrollTrigger here races with that revert and can
      // crash React (blank #root) during 375↔1440 swaps.
      setIsDesktop(mq.matches)
    }
    mq.addEventListener('change', onBreakpoint)
    return () => {
      mq.removeEventListener('change', onBreakpoint)
      unpinCalibrateSections()
      const { body, documentElement } = document
      body.style.overflow = ''
      body.style.position = ''
      body.style.height = ''
      body.style.top = ''
      body.style.overscrollBehavior = ''
      documentElement.style.overflow = ''
      documentElement.style.position = ''
      documentElement.style.height = ''
    }
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
        <Hero />
        <LazySection minHeight="80vh" rootMargin="200px 0px" idleTimeout={1800}>
          <Suspense fallback={<div className="home-below-fold-placeholder" aria-hidden="true" />}>
            <Programs />
          </Suspense>
        </LazySection>
        <LazySection minHeight="100vh" rootMargin="400px 0px">
          <Suspense fallback={<div className="home-below-fold-placeholder" aria-hidden="true" />}>
            <Whychooseus />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="400px 0px">
          <Suspense fallback={null}>
            <FloatingSteps />
          </Suspense>
        </LazySection>
        <LazySection minHeight="80vh" rootMargin="400px 0px">
          <Suspense fallback={null}>
            {isDesktop ? <Analysis /> : <Analyse />}
          </Suspense>
        </LazySection>
        <LazySection rootMargin="400px 0px">
          <Suspense fallback={null}>
            <Stats />
          </Suspense>
        </LazySection>
        <LazySection minHeight="480px" rootMargin="400px 0px">
          <Suspense fallback={null}>
            <Testimonial />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="400px 0px">
          <Suspense fallback={null}>
            <CareerForward />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="400px 0px">
          <Suspense fallback={null}>
            <Media />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="400px 0px">
          <Suspense fallback={null}>
            <Partners />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="400px 0px">
          <Suspense fallback={null}>
            <EnquireSection />
          </Suspense>
        </LazySection>
      </main>
      <LazySection rootMargin="600px 0px">
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </LazySection>
    </div>
  )
}

export default Home
