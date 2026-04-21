
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CareerForward.css'
import CareerQuiz from '../CareerQuiz/page'

gsap.registerPlugin(ScrollTrigger)

const CareerForward = () => {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const contentRef = useRef(null)
  const [showQuiz, setShowQuiz] = useState(false)

  useEffect(() => {

    ScrollTrigger.config({ ignoreMobileResize: true });

    const text = textRef.current
    const content = contentRef.current

    // Use GSAP Context for better cleanup in React
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=600",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,

          invalidateOnRefresh: false,

          // pinType: window.innerWidth < 768 ? "fixed" : "transform"
          pinType: "fixed"
        }
      })


      tl.to(text, {
        fontSize: window.innerWidth < 768 ? "60px" : "110px",
        lineHeight: window.innerWidth < 768 ? "60px" : "105px",
        duration: 2,
        ease: "none"
      })
        .to(text, {
          fontSize: window.innerWidth < 768 ? "40px" : "75px",
          lineHeight: window.innerWidth < 768 ? "45px" : "72px",
          duration: 2,
          ease: "none"
        })
        .to(text, {
          opacity: 0,
          filter: "blur(15px)",
          duration: 1
        })
        .to(content, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 1
        }, "-=0.5")

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="career-forward-section11">
      <div className="sticky-wrapperCareerForward">

        <h2 ref={textRef} className="career-forward-text" style={{ fontSize: '150px', lineHeight: '140px' }}>
          <span className="text-line">Ready To Move</span>
          <span className="text-line">Your Career</span>
          <span className="text-line">Forward?</span>
        </h2>


        <div ref={contentRef} className="variant5-container123">
          <div className="variant5-content">
            <h2 className="variant5-heading">
              Ready To Move <br /> Your Career Forward?
            </h2>
            <p className="variant5-paragraph">
              Answer a few simple questions to understand your current skill level
              and find programs that match your career plans.
            </p>

            {!showQuiz && (
              <button
                className="variant5-button"
                onClick={() => setShowQuiz(true)}
              >
                <span>Take Quiz</span>
              </button>
            )}
          </div>

          <div className="variant5-right-section">

            <div className="variant5-glow"></div>

            {showQuiz && (
              <div className="quiz-fade-in">
                <CareerQuiz />
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}

export default CareerForward