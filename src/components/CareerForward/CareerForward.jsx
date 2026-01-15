import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CareerForward.css'

gsap.registerPlugin(ScrollTrigger)

const CareerForward = () => {
  const [variant, setVariant] = useState(1) // 1, 2, 3, or 5
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const paragraphRef = useRef(null)
  const buttonRef = useRef(null)
  const variant5Ref = useRef(null)

  // Define font sizes for each variant
  const getVariantStyles = (variantNum, windowWidth) => {
    let fontSize, lineHeight
    
    if (windowWidth <= 768) {
      // Mobile
      const variants = {
        1: { fontSize: 80, lineHeight: 72 },
        2: { fontSize: 60, lineHeight: 54 },
        3: { fontSize: 40, lineHeight: 36 }
      }
      return variants[variantNum] || variants[1]
    } else if (windowWidth <= 1440) {
      // Tablet
      const variants = {
        1: { fontSize: 120, lineHeight: 108 },
        2: { fontSize: 90, lineHeight: 81 },
        3: { fontSize: 50, lineHeight: 45 }
      }
      return variants[variantNum] || variants[1]
    } else {
      // Desktop
      const variants = {
        1: { fontSize: 150, lineHeight: 135 },
        2: { fontSize: 100, lineHeight: 90 },
        3: { fontSize: 60, lineHeight: 54 }
      }
      return variants[variantNum] || variants[1]
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionTop = rect.top
      const sectionBottom = rect.bottom
      const sectionHeight = rect.height
      
      // If section is above viewport (not yet visible), show Variant 1
      if (sectionBottom < 0) {
        setVariant(1)
        return
      }
      
      // If section is below viewport (scrolled past), show Variant 5
      if (sectionTop > windowHeight) {
        setVariant(5)
        return
      }
      
      // Variant 1 should stay FULL SIZE until entire section is visible AND well positioned
      // Keep Variant 1 as long as:
      // 1. Section is entering viewport (bottom not yet visible)
      // 2. Section is fully in viewport but top is still above 30% of viewport
      // This ensures user can see the full text at 150px before it starts shrinking
      
      // Case 1: Section is entering (bottom not visible yet) - keep Variant 1
      if (sectionBottom > windowHeight && sectionTop < windowHeight) {
        setVariant(1)
        return
      }
      
      // Case 2: Section is fully in viewport - keep Variant 1 until well into view
      // Keep Variant 1 until section top reaches 30% of viewport
      if (sectionTop >= 0 && sectionTop > windowHeight * 0.3) {
        setVariant(1)
        return
      }
      
      // Calculate progress for variants 2, 3, and 5
      // Progress starts when section top reaches 20% of viewport (after Variant 1 is fully visible)
      // Progress ends when section bottom reaches viewport bottom
      const progressStart = windowHeight * 0.2
      const progressEnd = -sectionHeight
      
      let progress = 0
      if (sectionTop <= progressStart && sectionTop >= progressEnd) {
        progress = (progressStart - sectionTop) / (progressStart - progressEnd)
        progress = Math.max(0, Math.min(1, progress))
      } else if (sectionTop < progressEnd) {
        progress = 1
      }
      
      // Determine variant based on progress
      // Variant 1: Section entering/fully visible (handled above)
      // Variant 2: 0% - 40% progress (section top from 20% to below viewport)
      // Variant 3: 40% - 70% progress
      // Variant 5: 70% - 100% progress (final variant with content)
      let newVariant = 2
      if (progress >= 0.70) {
        newVariant = 5
      } else if (progress >= 0.40) {
        newVariant = 3
      } else {
        newVariant = 2
      }
      
      setVariant(newVariant)
    }

    // Initial calculation
    handleScroll()

    // Add scroll event listener with throttling
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Get current window width for responsive calculations
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const currentStyles = getVariantStyles(variant, windowWidth)

  // GSAP animations for Variant 5
  useEffect(() => {
    if (variant === 5 && variant5Ref.current) {
      const heading = headingRef.current
      const paragraph = paragraphRef.current
      const button = buttonRef.current

      if (!heading || !paragraph || !button) return

      // Animate elements on mount
      const tl = gsap.timeline()
      tl.fromTo(
        [heading, paragraph, button],
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        }
      )

      // Scroll-triggered font size animation for heading
      const scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          // Animate from 60px to 40px on scroll
          const fontSize = 60 - (progress * 20)
          gsap.set(heading, {
            fontSize: `${fontSize}px`
          })
        }
      })

      return () => {
        tl.kill()
        scrollTrigger.kill()
      }
    }
  }, [variant])

  return (
    <section ref={sectionRef} className={`career-forward-section ${variant === 5 ? 'variant5-active' : ''}`}>
      {variant === 5 ? (
        <div ref={variant5Ref} className="career-forward-variant5">
          <div className="variant5-content">
            <h2 ref={headingRef} className="variant5-heading">
              Ready To Move Your Career Forward?
            </h2>
            <p ref={paragraphRef} className="variant5-paragraph">
              Answer a few simple questions to understand your current skill level and find programs that match your career plans.
            </p>
            <button ref={buttonRef} className="variant5-button">
              Take Quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="career-forward-container">
          <h2 
            className={`career-forward-text variant-${variant}`}
            style={{
              fontSize: `${currentStyles.fontSize}px`,
              lineHeight: `${currentStyles.lineHeight}px`
            }}
          >
            Ready To Move Your Career Forward?
          </h2>
        </div>
      )}
    </section>
  )
}

export default CareerForward
