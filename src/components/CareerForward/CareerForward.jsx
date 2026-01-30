import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CareerForward.css'

gsap.registerPlugin(ScrollTrigger)

const CareerForward = () => {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const text = textRef.current
    const content = contentRef.current
    const section = sectionRef.current

  //   const tl = gsap.timeline({
  // scrollTrigger: {
  //       trigger: section,
  //       start: "top top",
  //       end: "+=1000",
  //       scrub: 0.1,
  //     }
  //   })
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=800",        // controlled scroll
        scrub: 0.8,          // smooth
        pin: true,           // 🔥 REQUIRED
        anticipatePin: 1,
      }
    })
    tl.to(text, {
      fontSize: "110px",
      lineHeight: "105px",
      duration: 2,
      ease: "power2.inOut"
    })

    tl.to(text, {
      fontSize: "75px",
      lineHeight: "72px",
      duration: 2,
      ease: "power2.inOut"
    })
    tl.to(text, {
      opacity: 0,
      filter: "blur(15px)",
      duration: 1
    })

    tl.to(content, {
      opacity: 1,
      pointerEvents: "auto",
      duration: 1
    }, "-=0.5")

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="career-forward-section">
      <div className="sticky-wrapper">
        <h2 ref={textRef} className="career-forward-text" style={{ fontSize: '150px', lineHeight: '140px' }}>
          <span className="text-line">Ready To Move</span>
          <span className="text-line">Your Career</span>
          <span className="text-line">Forward?</span>
        </h2>
        <div ref={contentRef} className="variant5-container">
          <div className="variant5-content">
            <h2 className="variant5-heading">
              Ready To Move <br /> Your Career Forward?
            </h2>
            <p className="variant5-paragraph">
              Answer a few simple questions to understand your current skill level
              and find programs that match your career plans.
            </p>
            <button className="variant5-button">
              <span>Take Quiz</span>
            </button>
          </div>
          <div className="variant5-glow"></div>
        </div>

      </div>
    </section>
  )
}

export default CareerForward