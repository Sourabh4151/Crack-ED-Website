import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './whychoose.css'

gsap.registerPlugin(ScrollTrigger)

const Whychooseus = () => {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const contentRef = useRef(null)
  const revealRef = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = revealRef.current.querySelectorAll(".char")

      gsap.set(chars, {
        opacity: 0.15,
        color: "#fafafa"
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1000",
          scrub: true,
          pin: true
        }
      })
      tl.to(textRef.current, {
        opacity: 0.15,
        scale: 1,
        ease: "none",
        duration: 1
      })
      tl.to(
        chars,
        {
          opacity: 1,
          stagger: 0.035,
          ease: "none",
          duration: 4
        },
        0
      )
    })

    return () => ctx.revert()
  }, [])

  const paragraph = "Getting a job is tough.Keeping it is tougher.Our Job-Linked courses, powered by the ABC Framework of Job Readiness, prepare you for both."


  return (
    <section ref={sectionRef} className="career-forward-section">
      <div className="sticky-wrapper">

        <h2

          className="career-forward-text1">
          <span className="text-line">Why Choose Us</span>
        </h2>
        <p ref={revealRef} className="typing-text">

          {paragraph.split(" ").map((word, i) => (
            <span key={i} className="word">
              {word.split("").map((char, j) => (
                <span key={j} className="char">
                  {char}
                </span>
              ))}
              <span className="space">&nbsp;</span>
            </span>
          ))}

        </p>

      </div>
    </section>
  )
}

export default Whychooseus