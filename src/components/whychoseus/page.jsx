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
        color: "#ffffff"
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // 🎬 ANIMATION START MARKER: Animation begins when section top hits viewport top
          end: "+=1000", // 🎬 ANIMATION END MARKER: Animation ends after scrolling 1000px
          scrub: true,
          pin: true,
          // markers: true // 🎯 VISUAL MARKERS: Shows green (start) and red (end) markers on page
        }
      })
      // 🎬 ANIMATION 1 START: Fades out the "Why Choose Us" heading (opacity to 0.15 = 15% visible, making it very faded/transparent)
      // Note: scale: 1 means no size change, just opacity fade
      tl.to(textRef.current, {
        opacity: 0.15, // Fades the heading to 15% opacity (makes it very transparent)
        scale: 1,      // Keeps the heading at normal size (no scaling)
        ease: "none",
        duration: 1
      })
      // 🎬 ANIMATION 2 START: Character reveal animation (typewriter effect)
      // This animates each individual character in the paragraph to become fully visible
      // - Starts with opacity 0.15 (faded) → animates to opacity 1 (fully visible)
      // - stagger: 0.035 = each character animates 0.035 seconds after the previous one
      // - Creates a sequential "typing" effect where letters appear one by one
      // - Timeline position -2 = starts 2 seconds BEFORE Animation 1 (starts earlier in scroll)
      tl.to(
        chars, // Targets all individual character spans in the paragraph
        {
          opacity: 1,        // Makes each character fully visible (from 0.15 to 1)
          stagger: 0.035,    // 0.035 second delay between each character (creates sequential reveal)
          ease: "none",
          duration: 4,
          markers: true    // Total animation duration: 4 seconds
        },
        -20 // 🎯 TIMELINE POSITION: -2 means this animation starts 2 seconds BEFORE Animation 1 (starts from above/earlier in scroll)
      )
    })

    return () => ctx.revert()
  }, [])

  const paragraph =
    "Because degrees don't get jobs. Skills Do.  And we have Crack-ED the formula of imbibing skills that make you job ready."


  return (
    <section ref={sectionRef} className="career-forward-section">
      <div className="sticky-wrapper">

        <h2
        //  ref={textRef} 
         className="career-forward-text">
          <span className="text-line">Why Choose Us</span>
        </h2>
        <p ref={revealRef} className="typing-text">
          {paragraph.split("").map((char, i) => (
            <span key={i} className="char">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>

      </div>
    </section>
  )
}

export default Whychooseus