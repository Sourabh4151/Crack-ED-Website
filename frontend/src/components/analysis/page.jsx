import React, { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './analysis.css'
import TalkToTeamCta from '../TalkToTeamCta/TalkToTeamCta'

import img1 from '../../assets/img1.png'; import img2 from '../../assets/img2.svg'; import img3 from '../../assets/img3.png';
import img4 from '../../assets/img4.png'; import img5 from '../../assets/img5.png'; import img6 from '../../assets/img6.png';
import img7 from '../../assets/img7.png'; import img8 from '../../assets/img8.png'; import img9 from '../../assets/img9.png';

gsap.registerPlugin(ScrollTrigger)

const releasePin = (el) => {
  if (!el) return
  const parent = el.parentNode
  if (parent && parent.classList && parent.classList.contains('pin-spacer')) {
    parent.replaceWith(el)
  }
}

const Card = ({ img, title, desc }) => {
  const [hover, setHover] = useState(false);

  return (
    <div 
      className="premium-card" 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}
    >
      {hover ? (
    
        <p className="hover-description">
          {desc}
        </p>
      ) : (
     
        <>
          <div className="icon-box">
            <img src={img} style={{ width: "50px", height: "50px" }} alt="" />
          </div>
          <div className="card-title">{title}</div>
        </>
      )}
    </div>
  );
};


const Analysis = () => {
  const sectionRef = useRef(null)
useLayoutEffect(() => {
  const root = sectionRef.current
  if (!root) return

  let cancelled = false
  let ctx = null

  const initAnimation = () => {
    if (cancelled || ctx) return
    if (!window.matchMedia('(min-width: 769px)').matches) return
    if (window.getComputedStyle(root).display === 'none') return

    gsap.registerPlugin(ScrollTrigger)

    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger === root) st.kill()
    })

    const slide1 = root.querySelector('.slide-layer.slide-1')
    const slide2 = root.querySelector('.slide-layer.slide-2')
    const slide3 = root.querySelector('.slide-layer.slide-3')
    if (!slide1 || !slide2 || !slide3) return

    ctx = gsap.context(() => {
      gsap.set(slide1, { zIndex: 3, yPercent: 0, pointerEvents: "auto", });
      gsap.set(slide2, { zIndex: 4, yPercent: 100, autoAlpha: 1, pointerEvents: "auto", });
      gsap.set(slide3, { zIndex: 5, yPercent: 100, autoAlpha: 1, pointerEvents: "auto", });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
          pinType: 'fixed',
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });
      tl.to(slide2, {
        yPercent: 0,
        ease: "none",
        duration: 1,
         pointerEvents: "auto",
      })
      .to(slide1, {
        yPercent: -20,
        autoAlpha: 0,
        duration: 1,
         pointerEvents: "auto",
        ease: "none"
      }, "<")
      tl.to(slide3, {
        yPercent: 0,
        duration: 1,
         pointerEvents: "auto",
        ease: "none",
      })
      .to(slide2, {
        yPercent: -20,
        autoAlpha: 0,
        duration: 1,
         pointerEvents: "auto",
        ease: "none"
      }, "<");

    }, root)

    if (cancelled && ctx) {
      ctx.revert()
      ctx = null
      return
    }

    ScrollTrigger.refresh()
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect()
        initAnimation()
      }
    },
    { rootMargin: '800px 0px' }
  )
  observer.observe(root)

  return () => {
    cancelled = true
    observer.disconnect()
    try {
      if (ctx) ctx.revert()
    } catch (_) { /* pin unwrap can throw if the node was already moved */ }
    ctx = null
    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger === root) {
        try { st.kill() } catch (_) {}
      }
    })
    releasePin(root)
  }
}, []);





  return (
    <section ref={sectionRef} className="career-forward-sectionWhychooseus">
      <div className="sticky-wrapper why-choose-us">
        
  
        <div className="slide-layer slide-1">
          <div className="cards-grid">
            <Card img={img1} title="Awareness" desc="Deep understanding of the role through field visits, corporate briefs, and manager interactions" />
            <Card img={img2} title="Breakdown" desc="Distilling role success into core and advanced skills required to perform" />
            <Card img={img3} title="Clustering" desc="Converting skills into daily micro-learning outcomes across Utthan → Aarohan → Shikhar" />
          </div>
          <h2 className="ghost-text" style={{ fontSize: '150px' }}>ANALYSE</h2>
        </div>

   
        <div className="slide-layer slide-2">
          <div className="cards-grid">
            <Card img={img4} title="Andragogy" desc="Curriculum and lesson plans based on Andragogy, Experiential Learning, and Growth Mindset" />
            <Card img={img5} title="Battle-ready" desc="AI-led simulations that allow safe, repeatable practice of real job scenarios" />
            <Card img={img6} title="Checkpoints" desc="Continuous assessments with structured feedback and remediation" />
          </div>
          <h2 className="ghost-text" style={{ fontSize: '150px' }}>BUILD</h2>
        </div>


        <div className="slide-layer slide-3">
          <div className="cards-grid">
            <Card img={img7} title="Apprenticeship" desc="Regular check-ins with candidates during OJT to understand challenges" />
            <Card img={img8} title="Benchmarking" desc="Structured inputs from reporting managers to refine role awareness, expectations and training" />
            <Card img={img9} title="Commissioning" desc="Transitioning candidates into full-time roles with a clear growth roadmap" />
          </div>
          <h2 className="ghost-text" style={{ fontSize: '150px' }}>CALIBRATE</h2>
          <TalkToTeamCta />
        </div>

      </div>
    </section>
  )
}

export default Analysis