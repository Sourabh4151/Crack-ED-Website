import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import icon1 from '../../assets/icon1.png'
import icon2 from '../../assets/icon2.png'
import icon3 from '../../assets/icon3.png'
import icon4 from '../../assets/icon4.png'
import './Stats.css'

gsap.registerPlugin(ScrollTrigger)

const Stats = () => {
  const statsGridRef = useRef(null)

  useEffect(() => {
    const grid = statsGridRef.current
    if (!grid) return

    let cancelled = false
    let ctx = null

    const createTriggers = () => {
      if (cancelled || ctx) return

      const cards = grid.querySelectorAll('.stat-card')
      if (!cards.length) return

      gsap.registerPlugin(ScrollTrigger)
      ScrollTrigger.config({ ignoreMobileResize: true })

      cards.forEach((card) => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === card) st.kill()
        })
      })

      ctx = gsap.context(() => {
        cards.forEach((card) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top top+=100',
            end: 'bottom top',
            toggleClass: { targets: card, className: 'stat-card--at-top' },
            invalidateOnRefresh: true,
          })
        })
      }, grid)

      if (cancelled) {
        ctx.revert()
        ctx = null
        return
      }

      ScrollTrigger.refresh()
    }

    const pinsReady = () =>
      !!document.querySelector(
        '.pin-spacer, .career-forward-sectionWhychooseus, .analyse'
      )

    // Create after pins above (Why Choose Us / CALIBRATE) have been built,
    // otherwise start/end are measured too early and the class never toggles.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        observer.disconnect()

        const deadline = Date.now() + 2500
        const waitForPins = () => {
          if (cancelled) return
          if (pinsReady() || Date.now() > deadline) {
            createTriggers()
            // Pin spacers can land one frame later than the section itself.
            requestAnimationFrame(() => ScrollTrigger.refresh())
            setTimeout(() => { if (!cancelled) ScrollTrigger.refresh() }, 200)
            return
          }
          requestAnimationFrame(waitForPins)
        }
        waitForPins()
      },
      { rootMargin: '200px 0px' }
    )
    observer.observe(grid)

    return () => {
      cancelled = true
      observer.disconnect()
      if (ctx) ctx.revert()
    }
  }, [])

  const stats = [
    {
      id: 1,
      icon: icon1,
      value: "12+ Programs",
      description: "A growing portfolio of job-linked programs across high-demand industries.",
      hoverText: "CROSS SECTOR CAREERS"
    },
    {
      id: 2,
      icon: icon2,
      value: "Avg CTC of Rs 3.2 LPA",
      description: "Our learners don't just get trained, they get paid what they deserve.",
      hoverText: "GROWTH THAT PAYS"
    },
    {
      id: 3,
      icon: icon3,
      value: "5000+ Learners",
      description: "Thousands of learners have already trusted Crack-ED to build their careers.",
      hoverText: "PROOF, NOT PROMISES"
    },
    {
      id: 4,
      icon: icon4,
      value: "5 Centers",
      description: "A real, on-ground presence where training and hiring actually happens.",
      hoverText: "NATION WIDE FOOTPRINT"
    }
  ]

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-header">
          <div className="stats-badge">Numbers at a glance</div>
          <h2 className="stats-subtitle">Where programs convert into careers, at real scale.</h2>
        </div>
        <div ref={statsGridRef} className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-card">
              <div className="stat-icon">
                <img src={stat.icon} alt="" />
              </div>
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-description">{stat.description}</p>
              <div className="stat-hover-text">{stat.hoverText}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
