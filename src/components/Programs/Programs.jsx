import React, { useState, useRef, useEffect } from 'react'
import lenskartStoreImage from '../../assets/lenskart_store.png'
import auBankImage from '../../assets/au_bank.png'
import lenskartLogo from '../../assets/lenskart.png'
import lenskartCardLogo from '../../assets/lenskart_card_logo.png'
import auCardLogo from '../../assets/au_card_logo.png'
import './Programs.css'

const Programs = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const carouselRef = useRef(null)
  const cardRefs = useRef([])
  const progressIntervalRef = useRef(null)
  const autoAdvanceTimeoutRef = useRef(null)

  const programCards = [
    {
      id: 1,
      logo: auCardLogo,
      title: 'AURUM Bankers Relationship Manager',
      url: 'https://crack-ed.com/pgprm/',
    },
    {
      id: 2,
      logo: auCardLogo,
      title: 'AURUM Bankers Relationship Officer',
      url: 'https://aubank.ro.crack-ed.com/portal',
    },
    {
      id: 3,
      logo: auCardLogo,
      title: 'AURUM Bankers Bank Officer',
      url: 'https://aubankbo.crack-ed.com/portal',
    },
    {
      id: 4,
      logo: auCardLogo,
      title: 'AURUM Bankers Sales Officer',
      url: 'https://aubankso.crack-ed.com/portal',
    },
    {
      id: 5,
      logo: auCardLogo,
      title: 'AURUM Bankers Transaction Officer',
      url: 'https://aubankto.crack-ed.com/portal',
    },
    {
      id: 6,
      logo: auCardLogo,
      title: 'AURUM Bankers Deputy Center Manager',
      url: 'https://aubankcm.crack-ed.com/portal',
    },
    {
      id: 7,
      logo: auCardLogo,
      title: 'AURUM Bankers Customer Service Officer',
      url: 'https://aubankcso.crack-ed.com/portal',
    },
    {
      id: 8,
      logo: auCardLogo,
      title: 'AURUM Bankers Late Recovery Officer',
      url: 'https://aubanklro.crack-ed.com/portal',
    },
    {
      id: 9,
      logo: auCardLogo,
      title: 'AURUM Bankers Money Officer',
      url: 'https://aubankmo.crack-ed.com/portal',
    },
    {
      id: 10,
      logo: auCardLogo,
      title: 'AURUM Bankers Customer Service Officer Valuation',
      url: 'https://aubankbcso.crack-ed.com/portal',
    },
    {
      id: 11,
      logo: lenskartCardLogo,
      title: 'Lenskart Dispensing Optician Program',
      url: 'https://lenskart.crack-ed.com/portal',
    },
    {
      id: 12,
      logo: lenskartCardLogo,
      title: 'Lenskart Retail Sales Officer Program',
      url: 'https://lenskartrsa.crack-ed.com/portal',
    },
  ]

  // Get current program details based on the first visible card in carousel
  const getCurrentProgramDetails = () => {
    const currentCard = programCards[currentCardIndex]
    if (!currentCard) return null

    // Check if it's an AURUM Bankers card
    if (currentCard.logo === auCardLogo) {
      // Map AURUM Bankers titles to details
      const detailsMap = {
        'AURUM Bankers Relationship Manager': {
          details: 'Join as a Relationship Manager with a CTC of Rs 5.5 LPA + PLP',
          duration: '6-months program',
        },
        'AURUM Bankers Relationship Officer': {
          details: 'Join as a Relationship Officer with a CTC of Rs 2.7 LPA + PLP',
          duration: '2-months program',
        },
        'AURUM Bankers Bank Officer': {
          details: 'Join as a Bank Officer with a CTC of Rs 3.5 LPA + PLP',
          duration: '4-months program',
        },
        'AURUM Bankers Sales Officer': {
          details: 'Join as a Sales Officer with a CTC of Rs 2.7 LPA + PLP',
          duration: '2-months program',
        },
        'AURUM Bankers Transaction Officer': {
          details: 'Join as a Transaction Officer with a CTC of upto Rs 2.7 LPA + PLP',
          duration: '2-months program',
        },
        'AURUM Bankers Deputy Center Manager': {
          details: 'Join as a Deputy Center Manager with a CTC of upto Rs 2.05 LPA + PLP',
          duration: '2-months program',
        },
        'AURUM Bankers Customer Service Officer': {
          details: 'Join as a Customer Service Officer with a CTC of Rs 2.75 LPA + PLP',
          duration: '2-months program',
        },
        'AURUM Bankers Late Recovery Officer': {
          details: 'Join as a Deputy Late Recovery Officer with a CTC of upto Rs 2.05 LPA + PLP',
          duration: '2-months program',
        },
        'AURUM Bankers Money Officer': {
          details: 'Join as a Money Officer with a CTC of Rs 2.75 LPA + PLP',
          duration: '2-months program',
        },
        'AURUM Bankers Customer Service Officer Valuation': {
          details: 'Join as a Customer Service Officer Valuation with a CTC of Rs 2.7 LPA + PLP',
          duration: '2.5-months program',
        },
      }
      return {
        logo: auCardLogo,
        title: currentCard.title,
        details: detailsMap[currentCard.title]?.details || 'Join our program',
        duration: detailsMap[currentCard.title]?.duration || '3-month program',
        image: auBankImage,
      }
    } else {
      // Lenskart cards
      const detailsMap = {
        'Lenskart Dispensing Optician Program': {
          details: 'Join as a Dispensing Optician with a CTC of Rs 2.64 LPA',
          duration: '6-months program',
        },
        'Lenskart Retail Sales Officer Program': {
          details: 'Join as a Sales Associate with a CTC of Rs 3 LPA + incentives',
          duration: '9-weeks program',
        },
      }
      return {
        logo: lenskartLogo,
        title: currentCard.title,
        details: detailsMap[currentCard.title]?.details || 'Join our program',
        duration: detailsMap[currentCard.title]?.duration || '2-month program',
        image: lenskartStoreImage,
      }
    }
  }

  const currentProgramDetails = getCurrentProgramDetails()

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = 180 // card width
      const gap = 14 // gap between cards
      const cardSpacing = cardWidth + gap
      
      // Calculate translateX based on current index
      let translateX = -(currentCardIndex * cardSpacing)
      
      // When at last index, we need to show last card + first card (circular wrap)
      // The duplicate card at the end handles this visually
      if (currentCardIndex === programCards.length) {
        // Reset to 0 after showing duplicate
        setTimeout(() => {
          if (carouselRef.current) {
            carouselRef.current.style.transition = 'none'
            carouselRef.current.style.transform = `translateX(0px)`
            setCurrentCardIndex(0)
            setTimeout(() => {
              if (carouselRef.current) {
                carouselRef.current.style.transition = 'transform 0.3s ease'
              }
            }, 50)
          }
        }, 300)
      }
      
      carouselRef.current.style.transform = `translateX(${translateX}px)`
      carouselRef.current.style.transition = 'transform 0.3s ease'
    }
  }, [currentCardIndex])

  const resetAutoAdvance = () => {
    // Clear existing timers
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current)
      autoAdvanceTimeoutRef.current = null
    }
    
    // Reset progress
    setProgress(0)
    
    // Start new auto-advance cycle (8 seconds)
    const duration = 8000 // 8 seconds
    const interval = 50 // Update every 50ms for smooth animation
    const steps = duration / interval
    const increment = 100 / steps
    
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(progressIntervalRef.current)
          progressIntervalRef.current = null
          return 100
        }
        return next
      })
    }, interval)
    
    // Auto-advance after duration
    autoAdvanceTimeoutRef.current = setTimeout(() => {
      // Move to next card without resetting auto-advance (it will reset via useEffect)
      setCurrentCardIndex((prev) => {
        // When at last card (index 11), show duplicate then reset to 0
        if (prev === programCards.length - 1) {
          return programCards.length // This will trigger the reset in useEffect
        }
        const next = prev + 1
        const maxIndex = programCards.length - 1
        // Circular: if at the end, loop to the beginning
        return next > maxIndex ? 0 : next
      })
    }, duration)
  }

  const nextCard = () => {
    // Clear auto-advance when user manually clicks
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current)
      autoAdvanceTimeoutRef.current = null
    }
    setProgress(0)
    
    setCurrentCardIndex((prev) => {
      // When at last card (index 11), show duplicate then reset to 0
      if (prev === programCards.length - 1) {
        return programCards.length // This will trigger the reset in useEffect
      }
      const next = prev + 1
      const maxIndex = programCards.length - 1
      // Circular: if at the end, loop to the beginning
      return next > maxIndex ? 0 : next
    })
  }

  const prevCard = () => {
    // Clear auto-advance when user manually clicks
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current)
      autoAdvanceTimeoutRef.current = null
    }
    setProgress(0)
    
    setCurrentCardIndex((prev) => {
      const next = prev - 1
      const maxIndex = programCards.length - 1
      // Circular: if at the beginning, loop to the end
      return next < 0 ? maxIndex : next
    })
  }

  // Initialize auto-advance on mount and when currentCardIndex changes
  useEffect(() => {
    // Skip auto-advance if we're at the duplicate position (will reset to 0)
    if (currentCardIndex !== programCards.length) {
      resetAutoAdvance()
    }
    
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      if (autoAdvanceTimeoutRef.current) {
        clearTimeout(autoAdvanceTimeoutRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCardIndex])

  return (
    <section className="programs-section">
      <div className="programs-container">
        <div className="programs-header">
          <div className="programs-header-text">
            <div className="programs-badge">100% Job-Ready Programs</div>
            <p className="programs-subtitle">Built for real roles. Backed by real employers.</p>
          </div>
          <button className="view-all-button">
            View All
            <svg className="view-all-arrow" width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 1L10 5.5L5.5 10M1 5.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div 
          className="programs-background-container"
          style={{ 
            backgroundImage: `url(${currentProgramDetails?.image || (currentCardIndex < 10 ? auBankImage : lenskartStoreImage)})` 
          }}
        >
          <div className="progress-bar-container-top">
            <div 
              className="progress-bar" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="programs-content-wrapper">
            <div className="programs-main-container">
              {currentProgramDetails && (
                <div className="program-card">
                  <div className="program-card-content">
                    <div className="program-logo-container">
                      <img src={currentProgramDetails.logo} alt="Program Logo" className="program-logo" />
                    </div>
                    <div className="program-details">
                      <h3 className="program-card-title">{currentProgramDetails.title}</h3>
                      <ul className="program-info-list">
                        <li>{currentProgramDetails.details}</li>
                        <li>{currentProgramDetails.duration}</li>
                      </ul>
                      <a href={programCards[currentCardIndex]?.url || '#'} target="_blank" rel="noopener noreferrer">
                        <button className="learn-more-button">Learn More</button>
                      </a>
                    </div>
                  </div>
                  
                  <div className="program-card-image">
                    <img src={currentProgramDetails.image} alt="Program Store" className="program-store-image" />
                  </div>
                </div>
              )}
            </div>

            <div className="program-cards-carousel">
              <div className="program-cards-wrapper">
                <div
                  className="program-cards-container"
                  ref={carouselRef}
                  onWheel={(e) => e.preventDefault()}
                  onTouchMove={(e) => e.preventDefault()}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {programCards.map((card, index) => (
                    <a
                      key={card.id}
                      href={card.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="program-mini-card-link"
                      ref={(el) => (cardRefs.current[index] = el)}
                    >
                      <div className="program-mini-card">
                        <div className="program-mini-card-logo-wrap">
                          <img src={card.logo} alt={card.title} className="program-mini-card-logo" />
                        </div>
                        <p className="program-mini-card-title">{card.title}</p>
                      </div>
                    </a>
                  ))}
                  {/* Duplicate first card at the end for circular wrapping */}
                  {programCards.length > 0 && (
                    <a
                      key={`${programCards[0].id}-duplicate`}
                      href={programCards[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="program-mini-card-link"
                      ref={(el) => (cardRefs.current[programCards.length] = el)}
                    >
                      <div className="program-mini-card">
                        <div className="program-mini-card-logo-wrap">
                          <img src={programCards[0].logo} alt={programCards[0].title} className="program-mini-card-logo" />
                        </div>
                        <p className="program-mini-card-title">{programCards[0].title}</p>
                      </div>
                    </a>
                  )}
                </div>
              </div>
              <div className="program-cards-navigation">
                <div className="navigation-controls">
                  <button className="card-nav-arrow" onClick={prevCard}>
                    ←
                  </button>
                  <span className="card-nav-indicator">{currentCardIndex + 1} / {Math.max(1, programCards.length)}</span>
                  <button className="card-nav-arrow" onClick={nextCard}>
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Programs