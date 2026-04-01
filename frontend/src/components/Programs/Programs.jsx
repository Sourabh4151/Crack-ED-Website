import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import lenskartStoreImage from '../../assets/lenskart_store.png'
import auBankImage from '../../assets/au_bank.png'
import lenskartLogo from '../../assets/lenskart.png'
import lenskartCardLogo from '../../assets/lenskart_card_logo.png'
import auCardLogo from '../../assets/au_card_logo.png'
import relationshipManagerImage from '../../assets/relationship manager_desktop.jpg'
import relationshipManagerMobileImage from '../../assets/relationship manager_mobile.jpg'
import goldLoanImage from '../../assets/gold loan.jpg'
import casaImage from '../../assets/bank officer.jpg'
import mblImage from '../../assets/sales officer_desktop.jpg'
import transactionOfficerImage from '../../assets/transaction officer.jpg'
import deputyCentreManagerImage from '../../assets/deputy centre manager.jpg'
import csoImage from '../../assets/cso.jpg'
import lateRecoveryOfficerImage from '../../assets/late recovery officer.jpg'
import moneyOfficerImage from '../../assets/money officer.jpg'
import csovImage from '../../assets/csov.jpg'
import lenskartRetailSalesImage from '../../assets/lenskart - retail sales associate.jpg'
import clinicalTechnicianImage from '../../assets/clinical technician.jpg'
import cashierTellerImage from '../../assets/cashier _ teller.jpg'
import virtualRelationshipManagerUdaanImage from '../../assets/virtual_relationship_manager_udaan.jpg'
import relationshipManagerRetailAgricultureImage from '../../assets/relationship_manager_retail_agriculture.jpg'
import businessLoanAssociateImage from '../../assets/business_loan_associate.jpg'
import relationshipManagerPiramalImage from '../../assets/relationship manager.jpg'
import fieldSalesExecutiveImage from '../../assets/field sales executive_desktop.jpg'
import udaanCardLogo from '../../assets/udaan_temporary_logo.png'
import piramalCardLogo from '../../assets/piramal_small.png'
import paytmCardLogo from '../../assets/paytm_small_logo.png'
import auHomeLogo from '../../assets/au_home_logo.png'
import paytmHomeLogo from '../../assets/paytm_home_logo.png'
import lenskartHomeLogo from '../../assets/lenskart_home_logo.png'
import piramalHomeLogo from '../../assets/piramal_home_logo.png'
import img1 from '../../assets/au_logo.png'
import img2 from '../../assets/immmggg2.jpg'
import checkinbg from '../../assets/checkinbg.png'
import avivaDsImage from '../../assets/aviva_ds.png'
import avivaAsImage from '../../assets/aviva_as.png'
import avivaSmallLogo from '../../assets/aviva_logo_small_card.png'
import avivaLogo from '../../assets/aviva_logo.png'
import poonawalaGaImage from '../../assets/poonawala_ga.jpg'
import poonawalaSaImage from '../../assets/poonawala_sa.png'
import poonawallaSmallLogo from '../../assets/poonawalla_logo_small_card.png'
import poonawallaLogo from '../../assets/poonawalla_logo.png'
import finovaCardLogo from '../../assets/finova_logo.png'
import finovaProgramImage from '../../assets/finova_program.jpg'
import finovaSmallLogo from '../../assets/finova_small_logo.png'
import mahindraProgramImage from '../../assets/desk.jpeg'
import mahindraFinanceSmallLogo from '../../assets/mahindra_finance_small_logo_logo.png'
import mahindraFinanceHomeLogo from '../../assets/mahindra_finance_logo.png'
import pgprmDesktopImage from '../../assets/RM_desktop.png'
import pgpbmDesktopImage from '../../assets/bandhan_desktop.jpg'
import pgcbmDesktopImage from '../../assets/desktop_PGC_bde.jpg'
import bandhanLogo from '../../assets/bandhan_bank_svg.svg'
import bandhanLogoSmall from '../../assets/bandhan_small_logo.png'
import './Programs.css'

// Keep "LPA + PLP" on one line to prevent awkward wrapping
const DetailsText = ({ text }) => {
  if (!text) return null
  if (typeof text !== 'string') return text
  const parts = text.split(/(LPA\s*\+\s*PLP)/)
  return parts.map((part, i) =>
    /LPA\s*\+\s*PLP/.test(part) ? (
      <span key={i} style={{ whiteSpace: 'nowrap' }}>{part}</span>
    ) : (
      part
    )
  )
}

// Map program label to home logo (null = no logo)
const getProgramHomeLogo = (programLabel) => {
  switch (programLabel) {
    case 'Paytm Disha Program': return { src: paytmHomeLogo, alt: 'Paytm' }
    case 'Piramal ProEdge Program': return { src: piramalHomeLogo, alt: 'Piramal Finance' }
    case 'Lenskart Program': return { src: lenskartHomeLogo, alt: 'Lenskart' }
    case 'Lenskart EyeTech Program': return { src: lenskartHomeLogo, alt: 'Lenskart' }
    case 'Aviva Nirmaan Program': return { src: avivaLogo, alt: 'Aviva' }
    case 'Poonawalla FinPro Career Program': return { src: poonawallaLogo, alt: 'Poonawalla Fincorp' }
    case 'Finova VyaparaMitra Program': return { src: finovaCardLogo, alt: 'Finova Capital' }
    case 'Mahindra Finance Prarambh Program': return { src: mahindraFinanceHomeLogo, alt: 'Mahindra Finance' }
    case 'Bandhan Career Bridge Program': return { src: bandhanLogo, alt: 'Bandhan Bank' }
    case 'Postgraduate Program in Relationship Management': return null
    case 'Postgraduate Program in Banking Management': return null
    case 'Udaan Program': return null
    default: return null
  }
}

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
      logo: udaanCardLogo,
      title: 'Postgraduate Program Relationship Management - Relationship Manager',
      url: 'https://pgprm.crack-ed.com',
    },
    {
      id: 2,
      logo: bandhanLogoSmall,
      title: 'Bandhan Career Bridge Program - Assistant Manager',
      url: 'https://bandhanbankam.crack-ed.com/',
    },
    {
      id: 3,
      logo: udaanCardLogo,
      title: 'Postgraduate Certification Banking Management - Business Development Executive',
      url: 'https://pgcbm.crack-ed.com',
    },
    {
      id: 4,
      logo: mahindraFinanceSmallLogo,
      title: 'Mahindra Finance Prarambh Program - Business Executive (Vehicle Loan - Field Sales)',
      url: 'https://mahindrafinancebe.crack-ed.com/',
    },
    {
      id: 5,
      logo: lenskartCardLogo,
      title: 'Lenskart EyeTech Program - Clinical Technician',
      url: 'https://lenskart.crack-ed.com/portal',
    },
    {
      id: 6,
      logo: lenskartCardLogo,
      title: 'Lenskart EyeTech Program - Retail Sales Associate',
      url: 'https://lenskartrsa.crack-ed.com/portal',
    },
    {
      id: 7,
      logo: udaanCardLogo,
      title: 'Udaan Program - Cashier / Teller',
      url: 'https://udaan.crack-ed.com/portal',
    },
    {
      id: 8,
      logo: udaanCardLogo,
      title: 'Udaan Program - Virtual Relationship Manager',
      url: 'https://udaanvrm.crack-ed.com',
    },
    {
      id: 9,
      logo: udaanCardLogo,
      title: 'Udaan Program - Relationship Manager',
      url: 'https://udaanrm.crack-ed.com',
    },
    {
      id: 10,
      logo: udaanCardLogo,
      title: 'Udaan Program - Business Loan Associate',
      url: 'https://udaanbusiness.crack-ed.com',
    },
    {
      id: 11,
      logo: piramalCardLogo,
      title: 'Piramal ProEdge Program - Relationship Manager',
      url: 'https://piramal.crack-ed.com/portal',
    },
    {
      id: 12,
      logo: paytmCardLogo,
      title: 'Paytm Disha Program - Field Sales Executive',
      url: 'https://paytm.crack-ed.com/portal',
    },
    {
      id: 13,
      logo: avivaSmallLogo,
      title: 'Aviva Nirmaan Program - Direct Sales Executive',
      url: 'https://avivads.crack-ed.com',
    },
    {
      id: 14,
      logo: avivaSmallLogo,
      title: 'Aviva Nirmaan Program - Agency Sales Executive',
      url: 'https://avivaas.crack-ed.com',
    },
    {
      id: 15,
      logo: poonawallaSmallLogo,
      title: 'Poonawalla FinPro Career Program - Gold Assayer',
      url: 'http://poonawallaga.crack-ed.com/',
    },
    {
      id: 16,
      logo: poonawallaSmallLogo,
      title: 'Poonawalla FinPro Career Program - Sales Executive',
      url: 'http://poonawallase.crack-ed.com/',
    },
    {
      id: 17,
      logo: finovaSmallLogo,
      title: 'Finova VyaparaMitra Program - Relationship Officer',
      url: 'https://finovaro.crack-ed.com',
    },
  ]

  // Featured card index: the first visible card in carousel (shown on main background)
  const featuredCardIndex = currentCardIndex >= programCards.length ? 0 : currentCardIndex

  // Get program details for any card (used for featured card and mobile scroll cards)
  const getProgramDetailsForCard = (card) => {
    if (!card) return null

    // Map program titles to background images
    const imageMap = {
      'Lenskart EyeTech Program - Clinical Technician': clinicalTechnicianImage,
      'Lenskart EyeTech Program - Retail Sales Associate': lenskartRetailSalesImage,
      'Udaan Program - Cashier / Teller': cashierTellerImage,
      'Udaan Program - Virtual Relationship Manager': virtualRelationshipManagerUdaanImage,
      'Udaan Program - Relationship Manager': relationshipManagerRetailAgricultureImage,
      'Udaan Program - Business Loan Associate': businessLoanAssociateImage,
      'Piramal ProEdge Program - Relationship Manager': relationshipManagerPiramalImage,
      'Paytm Disha Program - Field Sales Executive': fieldSalesExecutiveImage,
      'Mahindra Finance Prarambh Program - Business Executive (Vehicle Loan - Field Sales)': mahindraProgramImage,
    }

    // Udaan, Piramal, Paytm programs
    const newProgramsMap = {
      'Udaan Program - Cashier / Teller': {
        programLabel: 'Udaan Program',
        logo: udaanCardLogo,
        details: 'Join as a Cashier / Teller with a CTC of upto Rs 3.5 LPA',
        duration: '2-month program',
        image: cashierTellerImage,
      },
      'Udaan Program - Virtual Relationship Manager': {
        programLabel: 'Udaan Program',
        logo: udaanCardLogo,
        details: 'Join as a Virtual Relationship Manager with a CTC of upto Rs 2.8 LPA',
        duration: '4-week program',
        image: virtualRelationshipManagerUdaanImage,
      },
      'Udaan Program - Relationship Manager': {
        programLabel: 'Udaan Program',
        logo: udaanCardLogo,
        details: 'Join as a Relationship Manager with a CTC of upto Rs 6.5 LPA',
        duration: '3-week program',
        image: relationshipManagerRetailAgricultureImage,
      },
      'Udaan Program - Business Loan Associate': {
        programLabel: 'Udaan Program',
        logo: udaanCardLogo,
        details: 'Join as a Business Loan Associate with a CTC of upto Rs 2.8 LPA',
        duration: '3-week program',
        image: businessLoanAssociateImage,
      },
      'Piramal ProEdge Program - Relationship Manager': {
        programLabel: 'Piramal ProEdge Program',
        logo: piramalCardLogo,
        details: 'Join as a Relationship Manager with a CTC of Rs 2.74 LPA + variable',
        duration: '13-week program',
        image: relationshipManagerPiramalImage,
      },
      'Paytm Disha Program - Field Sales Executive': {
        programLabel: 'Paytm Disha Program',
        logo: paytmCardLogo,
        details: 'Join as a Field Sales Executive with a CTC of Rs 2.5 LPA + incentives',
        duration: '2-week program (virtual)',
        image: fieldSalesExecutiveImage,
      },
      'Mahindra Finance Prarambh Program - Business Executive (Vehicle Loan - Field Sales)': {
        programLabel: 'Mahindra Finance Prarambh Program',
        logo: mahindraFinanceHomeLogo,
        details: 'Join as a Business Executive (Vehicle Loan - Field Sales) with a CTC of Rs 3.5 LPA + incentives',
        duration: '1-month online program',
        image: mahindraProgramImage,
      },
      'Aviva Nirmaan Program - Direct Sales Executive': {
        programLabel: 'Aviva Nirmaan Program',
        logo: avivaDsImage,
        details: 'Join as a Front Line Sales Executive - Direct Sales with a CTC of Rs 3.5 LPA + variable',
        duration: '3-month program',
        image: avivaDsImage,
      },
      'Aviva Nirmaan Program - Agency Sales Executive': {
        programLabel: 'Aviva Nirmaan Program',
        logo: avivaAsImage,
        details: 'Join as a Front Line Sales Executive - Agency Sales with a CTC of Rs 3.5 LPA + variable',
        duration: '3-month program',
        image: avivaAsImage,
      },
      'Poonawalla FinPro Career Program - Gold Assayer': {
        programLabel: 'Poonawalla FinPro Career Program',
        logo: poonawalaGaImage,
        details: 'Join as a Gold Assayer with a CTC of Rs 2.5 LPA + incentives',
        duration: '1.5-month program',
        image: poonawalaGaImage,
      },
      'Poonawalla FinPro Career Program - Sales Executive': {
        programLabel: 'Poonawalla FinPro Career Program',
        logo: poonawalaSaImage,
        details: 'Join as a Sales Executive with a CTC of upto Rs 2.76 LPA + incentives',
        duration: '3-week program',
        image: poonawalaSaImage,
      },
      'Finova VyaparaMitra Program - Relationship Officer': {
        programLabel: 'Finova VyaparaMitra Program',
        logo: finovaCardLogo,
        details: 'Join as a Relationship Officer with a CTC of Rs 2.4 LPA + variable',
        duration: '3-month program',
        image: finovaProgramImage,
      },
      'Postgraduate Program Relationship Management - Relationship Manager': {
        programLabel: 'Postgraduate Program in Relationship Management',
        shortProgramLabel: 'PGP - Relationship Management',
        logo: auCardLogo,
        details: 'Join as a Relationship Manager with a CTC of Rs 5.5 LPA + incentives',
        duration: '6-month program',
        image: pgprmDesktopImage,
      },
      'Bandhan Career Bridge Program - Assistant Manager': {
        programLabel: 'Bandhan Career Bridge Program',
        shortProgramLabel: 'Bandhan Career Bridge Program',
        logo: auCardLogo,
        details: 'Join as an Assistant Manager with a CTC of Rs 4 LPA + incentives',
        duration: '6-month program',
        image: pgpbmDesktopImage,
      },
      'Postgraduate Certification Banking Management - Business Development Executive': {
        programLabel: 'Postgraduate Certification in Banking Management',
        shortProgramLabel: 'PGC - Banking Management',
        logo: udaanCardLogo,
        details: 'Join as a Business Development Executive with a CTC of Rs 2.5 LPA + incentives',
        duration: '2-week program',
        image: pgcbmDesktopImage,
      },
    }

    if (newProgramsMap[card.title]) {
      const prog = newProgramsMap[card.title]
      return {
        logo: prog.logo,
        programLabel: prog.programLabel,
        shortProgramLabel: prog.shortProgramLabel,
        title: card.title,
        details: prog.details,
        duration: prog.duration,
        image: prog.image,
        mobileImage: prog.image,
      }
    }

    // Lenskart EyeTech cards
      const detailsMap = {
        'Lenskart EyeTech Program - Clinical Technician': {
          details: 'Join as a Clinical Technician with a CTC of Rs 2.64 LPA',
          duration: '6-months program',
        },
        'Lenskart EyeTech Program - Retail Sales Associate': {
          details: 'Join as a Sales Associate with a CTC of Rs 3.5 LPA',
          duration: '5-week program',
        },
      }
      return {
        logo: lenskartLogo,
        programLabel: 'Lenskart EyeTech Program',
        title: card.title,
        details: detailsMap[card.title]?.details || 'Join our program',
        duration: detailsMap[card.title]?.duration || '2-month program',
        image: imageMap[card.title] || lenskartStoreImage,
        mobileImage: imageMap[card.title] || lenskartStoreImage,
      }
  }

  const currentProgramDetails = getProgramDetailsForCard(programCards[featuredCardIndex])

  // Short label for small/mini program cards (PGP only)
  const getSmallCardTitle = (card) => {
    if (card.title === 'Postgraduate Program Relationship Management - Relationship Manager') return 'PGP - Relationship Management'
    if (card.title === 'Bandhan Career Bridge Program - Assistant Manager') return 'Bandhan Career Bridge Program - Assistant Manager'
    if (card.title === 'Postgraduate Certification Banking Management - Business Development Executive') return 'PGC - Banking Management'
    if (card.title === 'Mahindra Finance Prarambh Program - Business Executive (Vehicle Loan - Field Sales)') return 'Mahindra Finance Prarambh - Business Executive'
    return card.title
  }

  // Get display title (strip program prefix)
  const getDisplayTitle = (title) => {
    if (title === 'Mahindra Finance Prarambh Program - Business Executive (Vehicle Loan - Field Sales)') {
      return 'Business Executive'
    }
    return title
      .replace('Bandhan Career Bridge Program - ', '')
      .replace('Lenskart EyeTech Program - ', '')
      .replace('Udaan Program - ', '')
      .replace('Piramal ProEdge Program - ', '')
      .replace('Paytm Disha Program - ', '')
      .replace('Aviva Nirmaan Program - ', '')
      .replace('Finova VyaparaMitra Program - ', '')
      .replace('Poonawalla FinPro Career Program - ', '')
      .replace('Postgraduate Program Relationship Management - ', '')
      .replace('Postgraduate Program Banking Management - ', '')
      .replace('Postgraduate Certification Banking Management - ', '')
      .replace('Mahindra Finance Prarambh Program - ', '')
  }

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = 180 // card width
      const gap = 14 // gap between cards
      const cardSpacing = cardWidth + gap

      // Carousel shows the NEXT two cards after the featured one (main display)
      // When main shows Relationship Manager (index 0), carousel shows Bank Officer & Relationship Officer (indices 1, 2)
      const carouselStartIndex = (featuredCardIndex + 1) % programCards.length
      const translateX = -(carouselStartIndex * cardSpacing)

      carouselRef.current.style.transform = `translateX(${translateX}px)`
      carouselRef.current.style.transition = 'transform 0.3s ease'
    }
  }, [currentCardIndex, featuredCardIndex])

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
      setCurrentCardIndex((prev) => (prev + 1) % programCards.length)
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

    setCurrentCardIndex((prev) => (prev + 1) % programCards.length)
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

    setCurrentCardIndex((prev) => (prev - 1 + programCards.length) % programCards.length)
  }

  // Initialize auto-advance on mount and when currentCardIndex changes
  useEffect(() => {
    resetAutoAdvance()

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
          <div className="mobilesection">
            <div className="mobile-program-cards-wrapper">
              <div className="mobile-program-cards">
                {programCards.map((card) => {
                  const details = getProgramDetailsForCard(card)
                  if (!details) return null
                  const isMahindraProgram = details.programLabel === 'Mahindra Finance Prarambh Program'
                  return (
                    <a
                      key={card.id}
                      href={card.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mobile-program-card-link"
                    >
                      <div className="mobile-program-card">
                        <div
                          className="mobile-program-card-image"
                          style={{
                            backgroundImage: `url(${details.mobileImage || details.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: isMahindraProgram ? '30% center' : 'center',
                            backgroundRepeat: 'no-repeat'
                          }}
                        >
                          <div className="mobile-program-card-content">
                            {(() => {
                              const logoInfo = getProgramHomeLogo(details.programLabel || 'Lenskart Program')
                              if (!logoInfo) return null
                              const isPaytm = logoInfo.alt === 'Paytm'
                              const isAviva = logoInfo.alt === 'Aviva'
                              const isMahindra = logoInfo.alt === 'Mahindra Finance'
                              const isBandhan = logoInfo.alt === 'Bandhan Bank'
                              return (
                                <div className={`mobile-program-card-logo${isPaytm ? ' mobile-program-card-logo--paytm' : ''}${isAviva ? ' mobile-program-card-logo--aviva' : ''}${isMahindra ? ' mobile-program-card-logo--mahindra' : ''}${isBandhan ? ' mobile-program-card-logo--bandhan' : ''}`}>
                                  <img src={logoInfo.src} alt={logoInfo.alt} />
                                </div>
                              )
                            })()}
                            <div className="mobile-program-card-label">{details.shortProgramLabel ?? details.programLabel}</div>
                            <h3 className="mobile-program-card-title">{getDisplayTitle(details.title)}</h3>
                            <div className="mobile-program-card-details">
                              <div className="mobile-program-card-detail">
                                <img src={checkinbg} alt="check" className="mobile-program-check" />
                                <span><DetailsText text={details.details} /></span>
                              </div>
                              <div className="mobile-program-card-detail">
                                <img src={checkinbg} alt="check" className="mobile-program-check" />
                                <span>{details.duration}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="mobile-program-learn-more">
                          Learn More
                          <span className="material-symbols-outlined">north_east</span>
                        </span>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="btnadjustment">
            <Link to="/programs" className="view-all-button1">
              View All
              <span className="material-symbols-outlined">
                north_east
              </span>
            </Link>
          </div>
        </div>

        <div
          className="programs-background-container"
          style={{
            backgroundImage: `url(${currentProgramDetails?.image || lenskartStoreImage})`,
            backgroundPosition: 'center 60%'
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
                    <div className="program-card-panel">
                      {(() => {
                        const programLabel = currentProgramDetails.programLabel || 'Lenskart Program'
                        const logoInfo = getProgramHomeLogo(programLabel)
                        if (!logoInfo) return null
                        const isMahindra = logoInfo.alt === 'Mahindra Finance'
                        const isBandhan = logoInfo.alt === 'Bandhan Bank'
                        return (
                          <div className={`program-logo-above${isMahindra ? ' program-logo-above--mahindra' : ''}${isBandhan ? ' program-logo-above--bandhan' : ''}`}>
                            <img src={logoInfo.src} alt={logoInfo.alt} />
                          </div>
                        )
                      })()}
                      <div className="program-card-label">
                        {currentProgramDetails.programLabel || 'Lenskart Program'}
                      </div>
                      <div className="program-details">
                        <h3 className="program-card-title">
                          {getDisplayTitle(currentProgramDetails.title)}
                        </h3>
                        <ul className="program-info-list">
                          <li><DetailsText text={currentProgramDetails.details} /></li>
                          <li>{currentProgramDetails.duration}</li>
                        </ul>
                        <a href={programCards[featuredCardIndex]?.url || '#'} target="_blank" rel="noopener noreferrer">
                          <button className="learn-more-button">Learn More</button>
                        </a>
                      </div>
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
                        <p className="program-mini-card-title">{getSmallCardTitle(card)}</p>
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
                        <p className="program-mini-card-title">{getSmallCardTitle(programCards[0])}</p>
                      </div>
                    </a>
                  )}
                </div>
              </div>
              <div className="program-cards-navigation">
                <div className="navigation-controls">
                  <button className="card-nav-arrow" onClick={prevCard}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                  </button>
                  <span className="card-nav-indicator">{currentCardIndex + 1} / {Math.max(1, programCards.length)}</span>
                  <button className="card-nav-arrow" onClick={nextCard}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
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