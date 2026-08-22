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
    const root = sectionRef.current
    if (!root) return

    let cancelled = false
    let ctx = null

    const initAnimation = () => {
      if (cancelled || ctx) return

      gsap.registerPlugin(ScrollTrigger)

      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === root) st.kill()
      })

      const chars = revealRef.current?.querySelectorAll('.char')
      if (!chars?.length) return

      const isMobile = window.matchMedia('(max-width: 768px)').matches

      ctx = gsap.context(() => {
        gsap.set(chars, {
          opacity: 0.15,
          color: "#fafafa"
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=1000",
            scrub: true,
            pin: true,
            pinType: isMobile ? 'transform' : 'fixed',
            anticipatePin: 1,
            invalidateOnRefresh: true,
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
      if (ctx) ctx.revert()
    }
  }, [])

  const paragraph = "Getting a job is tough. Keeping it is tougher. Our Job-Linked courses, powered by the ABC Framework of Job Readiness, prepare you for both."


  return (
    <section ref={sectionRef} className="career-forward-section">
      <div className="sticky-wrapper">

        <h2

          className="career-forward-text1">
          <span className="text-line">Why Choose Us</span>
        </h2>
        <p ref={revealRef} className="typing-text">

          {paragraph.split(" ").map((word, i, words) => (
            <React.Fragment key={i}>
              <span className="word">
                {word.split("").map((char, j) => (
                  <span key={j} className="char">
                    {char}
                  </span>
                ))}
              </span>
              {i < words.length - 1 ? " " : null}
            </React.Fragment>
          ))}

        </p>

      </div>
    </section>
  )
}

export default Whychooseus