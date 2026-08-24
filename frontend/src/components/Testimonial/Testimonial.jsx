import React, { useState, useEffect, useRef, useCallback } from 'react'
import AntimaMishra from '../../assets/Antima Mishra.png'
import PoojaMehta from '../../assets/Pooja Mehta.jpeg'
import ShreyaVerma from '../../assets/Shreya_Verma.webp'
import KashyapGoswami from '../../assets/Kashyap_Goswami.webp'
import Vishwendra from '../../assets/Vishwendra.jpg'
import Lokesh from '../../assets/Lokesh-h4THR9Fp.jpg.jpeg'
import Krishankant from '../../assets/Krishankant.webp'
import MayankKaushal from '../../assets/Mayank_Kaushal.webp'
import AmanChauraisa from '../../assets/Aman_Chauraisa.webp'
import PavanTyagi from '../../assets/Pavan_Tyagi.webp'
import Prakash from '../../assets/Prakash.webp'
import RahulChaudhary from '../../assets/Rahul_Chaudhary.webp'
import Ajay from '../../assets/Ajay.webp'
import Shubham from '../../assets/Shubham.png'
import Rohit from '../../assets/Rohit.png'
import Rohitash from '../../assets/Rohitash.png'
import Kuldeep from '../../assets/Kuldeep.png'
import IlaKumari from '../../assets/Ila Kumari .jpeg'
import Abhijeet from '../../assets/Abhijeet.jpeg'
import './Testimonial.css'

const Testimonial = () => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768)
  const trackRef = useRef(null)
  const offsetRef = useRef(0)
  const pausedRef = useRef(false)
  const rafRef = useRef(null)
  const lastTimeRef = useRef(0)
  const loopingRef = useRef(false)

  const testimonials = [
    {
      id: 1,
      image: ShreyaVerma,
      name: "Shreya Verma",
      title: "Relationship Manager, Piramal Finance",
      description: "Speaking up used to scare me, but staying silent scared me more, silent about my own potential. Crack-ED didn't just train me for a job, it pushed me to find my voice. Now I sit across from customers every day, confident, clear, and in control of the conversation."
    },
    {
      id: 2,
      image: KashyapGoswami,
      name: "Kashyap Goswami",
      title: "Business Development Executive, IndusInd Bank",
      description: "A few weeks in, and I already see the difference real preparation makes. It's not just about knowing the products - it's about knowing how to show up for every customer, every conversation, every single day. That's the industry-ready mindset Crack-ED built in me."
    },
    {
      id: 3,
      image: Vishwendra,
      name: "Vishwendra",
      title: "Bank Officer, AU Small Finance Bank",
      description: "It started with a single Instagram scroll and ended a year later as a Bank Officer at AU Small Finance Bank. The change didn't happen overnight - it was the classroom sessions, the internship, and every small step Crack-ED guided me through that got me here."
    },
    {
      id: 4,
      image: Lokesh,
      name: "Lokesh",
      title: "Relationship Officer, AU Small Finance Bank",
      description: "I walked in knowing nothing about banking - no systems, no processes, no idea how a branch actually runs. Crack-ED didn't just teach me the 'what,' they showed me 'how.' Today at AU Small Finance Bank, that one small step feels like the beginning of a real career."
    },
    {
      id: 5,
      image: Krishankant,
      name: "Krishankant",
      title: "Bank Officer, AU Small Finance Bank",
      description: "I was an accountant looking for something more, and one suggestion changed everything. Seven months into my role at AU Small Finance Bank, I'm still learning every day - but I know exactly where I'm headed: leadership in banking, one target at a time."
    },
    {
      id: 6,
      image: MayankKaushal,
      name: "Mayank Kaushal",
      title: "Bank Officer, AU Small Finance Bank",
      description: "Banking operations, targets, branch processes - all of it was unfamiliar when I started. Now, working with AU Small Finance Bank, I realize that one decision to join Crack-ED's Aurum Bankers Program built the foundation for everything I'm becoming."
    },
    {
      id: 7,
      image: AmanChauraisa,
      name: "Aman Chauraisa",
      title: "Bank Officer, AU Small Finance Bank",
      description: "Approaching customers used to feel difficult. Forty-five days of training in Indore later, I was generating leads, opening accounts, and helping people make banking decisions - all with newfound confidence. Crack-ED didn't just train me, it changed how I show up every day."
    },
    {
      id: 8,
      image: PavanTyagi,
      name: "Pavan Tyagi",
      title: "Bank Officer, AU Small Finance Bank",
      description: "Two years of competitive exams, I cleared one preliminary exam before facing a tough setback - and then a new path. Mock interviews, role plays, and real mentorship at Crack-ED turned that uncertainty into a banking career I never planned for, but couldn't be prouder of."
    },
    {
      id: 9,
      image: Prakash,
      name: "Prakash",
      title: "Bank Officer, AU Small Finance Bank",
      description: "I wasn't scrolling for a career, I was just scrolling. One Crack-ED reel later, I had no job experience and a lot of curiosity - today, that curiosity has turned into a ₹27,000 incentive and a banking career that's only just getting started."
    },
    {
      id: 10,
      image: RahulChaudhary,
      name: "Rahul Chaudhary",
      title: "Bank Officer, AU Small Finance Bank",
      description: "An Instagram ad led me away from my father's transport business and into banking. A year, an ₹11,000 incentive, and one strong foundation later, I'm starting my next chapter at IndusInd Bank - in a senior role, with a 25% hike."
    },
    {
      id: 11,
      image: Ajay,
      name: "Ajay",
      title: "Bank Officer, AU Small Finance Bank",
      description: "Almost a year of searching led me to one introduction, one program with Crack-ED, and a complete shift in direction. No banking background, no experience - just the willingness to learn. That willingness already turned into a ₹6,000 incentive in a single month - and I know this is just the start."
    },
    {
      id: 12,
      image: Kuldeep,
      name: "Kuldeep Agnihotri",
      title: "Sales Officer, AU Small Finance Bank",
      description: "Learning with Crack-ED's AU Bank Microbusiness Loan course gave me clarity on customer needs, boosted my confidence, and made me more professional in my work."
    },
    {
      id: 13,
      image: Shubham,
      name: "Shubham Kumar",
      title: "Sales Officer, AU Small Finance Bank",
      description: "I started at Crack-ED with little knowledge, but their support and training helped me learn banking and grow into a more confident person."
    },
    {
      id: 14,
      image: Rohit,
      name: "Rohit Khatana",
      title: "Bank Officer, AU Small Finance Bank",
      description: "This program helped me learn core banking, develop customer-handling skills, and prepared me with the right mindset for a banking career."
    },
    {
      id: 15,
      image: Abhijeet,
      name: "Abhijeet",
      title: "Bank Officer, AU Small Finance Bank",
      description: "Crack-ED truly strengthened my banking preparation. The teachers share real experience, clear doubts patiently, and their guidance gave me confidence for my career."
    },
    {
      id: 16,
      image: IlaKumari,
      name: "Ila Kumari",
      title: "Relationship Officer, AU Small Finance Bank",
      description: "I joined Crack-ED with low confidence, but within a month I improved my grooming, communication, and personality. I'm truly happy to be here."
    },
    {
      id: 17,
      image: Rohitash,
      name: "Rohitash",
      title: "Sales Officer, AU Small Finance Bank",
      description: "Crack-ED transformed me from someone with no banking knowledge or confidence into someone who can introduce myself and speak comfortably with anyone."
    },
    {
      id: 18,
      image: AntimaMishra,
      name: "Antima Mishra",
      title: "Senior Business Development Associate, Testbook",
      description: "Before Crack-ED, I knew I wanted to grow in a professional career, but I wasn't sure where to start. The training helped me sharpen my communication, understand sales and business development, and become more confident with every interview."
    },
    {
      id: 19,
      image: PoojaMehta,
      name: "Pooja Mehta",
      title: "Senior Business Development Associate, Testbook",
      description: "The classroom sessions, practical learning, and constant guidance at Crack-ED helped me build the confidence. Getting placed as a Senior Business Development Officer at Textbook feels like a milestone I once only hoped for."
    },
  ].reverse()

  const testimonialsToShow = isMobile ? testimonials : [...testimonials, ...testimonials]

  const getStep = useCallback(() => {
    const track = trackRef.current
    if (!track?.children?.[0]) return 320
    const first = track.children[0]
    const second = track.children[1]
    if (!second) return first.getBoundingClientRect().width
    return second.offsetLeft - first.offsetLeft
  }, [])

  const getLoopWidth = useCallback(() => getStep() * testimonials.length, [getStep, testimonials.length])

  const applyTransform = useCallback((withTransition = false) => {
    const track = trackRef.current
    if (!track) return
    track.style.transition = withTransition ? 'transform 0.45s ease' : 'none'
    track.style.transform = `translateX(-${offsetRef.current}px)`
  }, [])

  const wrapOffset = useCallback(() => {
    const loopWidth = getLoopWidth()
    if (loopWidth <= 0) return
    while (offsetRef.current >= loopWidth) offsetRef.current -= loopWidth
    while (offsetRef.current < 0) offsetRef.current += loopWidth
  }, [getLoopWidth])

  const goBy = useCallback((direction) => {
    const step = getStep()
    const loopWidth = getLoopWidth()
    if (step <= 0 || loopWidth <= 0) return

    if (direction < 0 && offsetRef.current < step) {
      loopingRef.current = true
      offsetRef.current += loopWidth
      applyTransform(false)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          offsetRef.current -= step
          loopingRef.current = false
          applyTransform(true)
        })
      })
      return
    }

    offsetRef.current += direction * step
    applyTransform(true)
  }, [applyTransform, getLoopWidth, getStep])

  const handlePrev = (event) => {
    event.stopPropagation()
    goBy(-1)
  }

  const handleNext = (event) => {
    event.stopPropagation()
    goBy(1)
  }

  const handleTransitionEnd = (event) => {
    if (event.target !== trackRef.current) return
    if (loopingRef.current) return
    const loopWidth = getLoopWidth()
    if (loopWidth <= 0) return
    if (offsetRef.current >= loopWidth || offsetRef.current < 0) {
      wrapOffset()
      applyTransform(false)
    }
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) {
      offsetRef.current = 0
      if (trackRef.current) {
        trackRef.current.style.transition = 'none'
        trackRef.current.style.transform = ''
      }
      return undefined
    }

    const durationMs = 30000
    lastTimeRef.current = performance.now()

    const tick = (now) => {
      const loopWidth = getLoopWidth()
      if (!pausedRef.current && loopWidth > 0) {
        const dt = now - lastTimeRef.current
        offsetRef.current += (loopWidth / durationMs) * dt
        wrapOffset()
        applyTransform(false)
      }
      lastTimeRef.current = now
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    const handleResize = () => {
      const step = getStep()
      if (step <= 0) return
      offsetRef.current = Math.round(offsetRef.current / step) * step
      wrapOffset()
      applyTransform(false)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [applyTransform, getLoopWidth, getStep, isMobile, wrapOffset])

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <div className="testimonial-header">
   
        </div>
        <div
          className="testimonial-cards-wrapper"
          onMouseEnter={() => { pausedRef.current = true }}
          onMouseLeave={() => { pausedRef.current = false }}
          onFocus={() => { pausedRef.current = true }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              pausedRef.current = false
            }
          }}
        >
          <div
            className="testimonial-cards"
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
          >
            {testimonialsToShow.map((testimonial, index) => (
              <div key={`${testimonial.id}-${index}`} className="testimonial-card">
                <div className="testimonial-image-container">
                  <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                  <div className="testimonial-content">
                    <h3 className="testimonial-name">{testimonial.name}</h3>
                    <p className="testimonial-title">{testimonial.title}</p>
                    <p className="testimonial-description">{testimonial.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className="testimonial-nav-arrow testimonial-nav-arrow-prev" onClick={handlePrev} aria-label="Previous testimonial">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button type="button" className="testimonial-nav-arrow testimonial-nav-arrow-next" onClick={handleNext} aria-label="Next testimonial">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonial