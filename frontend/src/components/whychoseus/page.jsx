import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './whychoose.css'

gsap.registerPlugin(ScrollTrigger)

const Whychooseus = () => {
  const sectionRef = useRef(null)
  const revealRef = useRef(null)
  useLayoutEffect(() => {
    const root = sectionRef.current
    if (!root) return

    let cancelled = false
    let ctx = null
    const mq = window.matchMedia('(max-width: 768px)')

    const releasePin = (el) => {
      if (!el) return
      const parent = el.parentNode
      if (parent && parent.classList && parent.classList.contains('pin-spacer')) {
        parent.replaceWith(el)
      }
    }

    const teardown = () => {
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

    const initAnimation = () => {
      if (cancelled) return

      teardown()

      gsap.registerPlugin(ScrollTrigger)

      const chars = revealRef.current?.querySelectorAll('.char')
      if (!chars?.length) return

      const isMobile = mq.matches

      if (isMobile) {
        ScrollTrigger.config({ ignoreMobileResize: true })
      }

      ctx = gsap.context(() => {
        gsap.set(chars, {
          opacity: 0.15,
          color: "#fafafa"
        })

        if (isMobile) {
          const pinHeight = `${Math.round(window.innerHeight)}px`
          const wrap = root.querySelector('.sticky-wrapper')
          gsap.set(root, {
            height: pinHeight,
            minHeight: pinHeight,
            maxHeight: pinHeight
          })
          if (wrap) {
            gsap.set(wrap, {
              height: pinHeight,
              transform: `translateY(${Math.round(window.innerHeight * 0.08)}px)`
            })
          }
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=1000",
            scrub: true,
            pin: true,
            pinType: 'fixed',
            anticipatePin: isMobile ? 0 : 1,
            invalidateOnRefresh: !isMobile,
          }
        })
        tl.to(
          chars,
          {
            opacity: 1,
            stagger: 0.035,
            ease: "none",
            duration: 4
          }
        )
      }, root)

      if (cancelled && ctx) {
        teardown()
        return
      }

      if (!isMobile) {
        ScrollTrigger.refresh()
      }
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

    const onBreakpoint = () => {
      teardown()
      gsap.set(root, {
        clearProps: 'height,minHeight,maxHeight,position,top,left,right,bottom,width,maxWidth,zIndex,margin,padding,transform,inset'
      })
      const wrap = root.querySelector('.sticky-wrapper')
      if (wrap) {
        gsap.set(wrap, { clearProps: 'height,transform' })
      }
      observer.observe(root)
    }
    mq.addEventListener('change', onBreakpoint)

    return () => {
      cancelled = true
      observer.disconnect()
      mq.removeEventListener('change', onBreakpoint)
      teardown()
    }
  }, [])

  const paragraph = "Getting a job is tough. Keeping it is tougher. Our Job-Linked courses, powered by the ABC Framework of Job Readiness, prepare you for both."


  return (
    <section ref={sectionRef} className="career-forward-section">
      <div className="sticky-wrapper">

        <h2 className="career-forward-text1">
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