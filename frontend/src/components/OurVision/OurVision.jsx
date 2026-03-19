import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './OurVision.css'

gsap.registerPlugin(ScrollTrigger)

const OurVision = () => {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const revealRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = revealRef.current?.querySelectorAll('.char')
      if (!chars?.length) return

      gsap.set(chars, {
        opacity: 0.15,
        color: '#fafafa'
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1000',
          scrub: true,
          pin: true,
        }
      })

      tl.to(
        chars,
        {
          opacity: 1,
          stagger: 0.035,
          ease: 'none',
          duration: 4
        },
        0
      )
    })

    return () => ctx.revert()
  }, [])

  const paragraph =
    'Starting with Bharat, our vision is to transform global youth into more employable individuals'

  return (
    <section ref={sectionRef} className="our-vision-section">
      <div className="our-vision-sticky-wrapper">
        <h2 ref={textRef} className="our-vision-heading">
          <span className="our-vision-heading-line">OUR VISION</span>
        </h2>
        <p ref={revealRef} className="our-vision-typing-text" lang="en">
          {paragraph.split('').map((char, i) => (
            <span key={i} className="char">
              {char === ' ' ? ' ' : char}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

export default OurVision
