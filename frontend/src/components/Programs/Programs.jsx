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
import relationshipManagerPiramalImage from '../../assets/relationship manager.jpg'
import udaanCardLogo from '../../assets/udaan_temporary_logo.png'
import udaanLogo from '../../assets/udaan_temporary_logo.png'
import piramalCardLogo from '../../assets/piramal_small.png'
import auHomeLogo from '../../assets/au_home_logo.png'
import lenskartHomeLogo from '../../assets/lenskart_home_logo.png'
import piramalHomeLogo from '../../assets/piramal_home_logo.png'
import img1 from '../../assets/au_logo.png'
import img2 from '../../assets/immmggg2.jpg'
import checkinbg from '../../assets/checkinbg.png'
import avivaDsImage from '../../assets/aviva_ds.png'
import avivaAsImage from '../../assets/aviva_as.png'
import avivaSmallLogo from '../../assets/aviva_logo_small_card.png'
import avivaLogo from '../../assets/aviva_logo.png'
import finovaCardLogo from '../../assets/finova_logo.png'
import finovaProgramImage from '../../assets/finova_program.jpg'
import finovaSmallLogo from '../../assets/finova_small_logo.png'
import mahindraProgramImage from '../../assets/desk.jpeg'
import mahindraFinanceSmallLogo from '../../assets/mahindra_finance_small_logo_logo.png'
import mahindraFinanceHomeLogo from '../../assets/mahindra_finance_logo.png'
import pgprmDesktopImage from '../../assets/RM_desktop.png'
import pgpbmDesktopImage from '../../assets/desktop.jpg'
import retailBankingDesktopImage from '../../assets/retail_banking_desktop.png'
import retailBankingMobileImage from '../../assets/retail_banking_mobile.png'
import bankingSalesDesktopImage from '../../assets/banking_sales_desktop.png'
import mobileSalesOfficerImage from '../../assets/mobile_sales_officer.png'
import elevateVrmImage from '../../assets/elevate_vrm.png'
import heroFinanceRmImage from '../../assets/hero_finance_rm.png'
import heroCoImage from '../../assets/hero_co.png'
import heroComImage from '../../assets/hero_com.png'
import rupyyProgramImage from '../../assets/rupyy.png'
import rupyyLogo from '../../assets/logo_rupyy.svg'
import rupyySmallLogo from '../../assets/rupyy_small_logo.png'
import heroLogo from '../../assets/hero_logo.svg'
import heroSmallLogo from '../../assets/hero_small_logo.png'
import houseOfFoundersImage from '../../assets/Enter.png'
import bandhanBankLogo from '../../assets/bandhan_bank_logo.svg'
import { trackMicrositeClick } from '../../utils/analytics'
import { appendUtmToUrl } from '../../services/crmService'
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
    case 'Piramal ProEdge Program': return { src: piramalHomeLogo, alt: 'Piramal Finance' }
    case 'Lenskart Program': return { src: lenskartHomeLogo, alt: 'Lenskart' }
    case 'Lenskart EyeTech Program': return { src: lenskartHomeLogo, alt: 'Lenskart' }
    case 'Aviva Nirmaan Program': return { src: avivaLogo, alt: 'Aviva' }
    case 'Finova VyaparaMitra Program': return { src: finovaCardLogo, alt: 'Finova Capital' }
    case 'Mahindra Finance Prarambh Program': return { src: mahindraFinanceHomeLogo, alt: 'Mahindra Finance' }
    case 'Housing Finance Pragati Program': return { src: heroLogo, alt: 'Hero Housing Finance' }
    case 'Rupyy AutoEdge Program': return { src: rupyyLogo, alt: 'Rupyy' }
    case 'Bandhan Bank Aspiring Bank Champions Programme': return { src: bandhanBankLogo, alt: 'Bandhan Bank' }
    case 'Postgraduate Program in Relationship Management': return null
    case 'Postgraduate Program in Banking Management': return null
    case 'Postgraduate Program Retail Banking': return null
    case 'Banking Sales Program':
    case 'Banking Sales Program - Sales Officer': return null
    case 'Entrepreneurship & Venture Creation': return null
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
      title: 'House of Founders Fellowship',
      url: 'https://house-of-founders.crack-ed.com/',
    },
    {
      id: 2,
      logo: heroSmallLogo,
      title: 'Housing Finance Pragati Program - Relationship Manager',
      url: 'https://herofinancerm.crack-ed.com/',
    },
    {
      id: 3,
      logo: heroSmallLogo,
      title: 'Housing Finance Pragati Program - Collection Officer',
      url: 'https://herofinanceco.crack-ed.com/',
    },
    {
      id: 4,
      logo: heroSmallLogo,
      title: 'Housing Finance Pragati Program - Credit and Operations Manager',
      url: 'https://herofinancecom.crack-ed.com/',
    },
    {
      id: 5,
      logo: rupyySmallLogo,
      title: 'Rupyy AutoEdge Program - Business Manager',
      url: 'https://rupyybm.crack-ed.com/',
    },

    {
      id: 6,
      logo: udaanCardLogo,
      title: 'Postgraduate Program Relationship Management - Relationship Manager',
      url: 'https://pgprm.crack-ed.com',
    },
    {
      id: 7,
      logo: udaanCardLogo,
      title: 'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager',
      url: 'https://bandhanbankassistantmanager.crack-ed.com/',
    },
    {
      id: 8,
      logo: udaanCardLogo,
      title: 'Postgraduate Program Retail Banking - Relationship Officer',
      url: 'https://pgprb.crack-ed.com',
    },
    {
      id: 9,
      logo: udaanLogo,
      title: 'Virtual Relationship Manager',
      url: 'https://elevatevrm.crack-ed.com/',
    },
    {
      id: 10,
      logo: udaanCardLogo,
      title: 'Banking Sales Program - Sales Officer',
      url: 'https://bspso.crack-ed.com',
    },
    {
      id: 11,
      logo: mahindraFinanceSmallLogo,
      title: 'Mahindra Finance Prarambh Program - Business Executive (Vehicle Loan - Field Sales)',
      url: 'https://mahindrafinancebe.crack-ed.com/',
    },
    {
      id: 12,
      logo: finovaSmallLogo,
      title: 'Finova VyaparaMitra Program - Relationship Officer',
      url: 'https://finovaro.crack-ed.com',
    },
    {
      id: 13,
      logo: piramalCardLogo,
      title: 'Piramal ProEdge Program - Relationship Manager',
      url: 'https://piramal.crack-ed.com/portal',
    },
    {
      id: 14,
      logo: avivaSmallLogo,
      title: 'Aviva Nirmaan Program - Direct Sales Executive',
      url: 'https://avivads.crack-ed.com',
    },
    {
      id: 15,
      logo: avivaSmallLogo,
      title: 'Aviva Nirmaan Program - Agency Sales Executive',
      url: 'https://avivaas.crack-ed.com',
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
      'Piramal ProEdge Program - Relationship Manager': relationshipManagerPiramalImage,
      'Mahindra Finance Prarambh Program - Business Executive (Vehicle Loan - Field Sales)': mahindraProgramImage,
      'Virtual Relationship Manager': elevateVrmImage,
      'Housing Finance Pragati Program - Relationship Manager': heroFinanceRmImage,
      'Housing Finance Pragati Program - Collection Officer': heroCoImage,
      'Housing Finance Pragati Program - Credit and Operations Manager': heroComImage,
      'Rupyy AutoEdge Program - Business Manager': rupyyProgramImage,
    }

    const newProgramsMap = {
      'House of Founders Fellowship': {
        programLabel: 'Entrepreneurship & Venture Creation',
        logo: null,
        details: '6-Month Hybrid Fellowship designed for aspiring and existing entrepreneurs.',
        duration: 'Investor-ready by graduation, with a chance to pitch your venture to investors.*',
        image: houseOfFoundersImage,
      },
      'Housing Finance Pragati Program - Relationship Manager': {
        programLabel: 'Housing Finance Pragati Program',
        logo: heroLogo,
        details: 'Join as a Relationship Manager - Mortgage Sales and secure a CTC of Rs 2.75 LPA + incentives',
        duration: '1-month program',
        image: heroFinanceRmImage,
      },
      'Housing Finance Pragati Program - Collection Officer': {
        programLabel: 'Housing Finance Pragati Program',
        logo: heroLogo,
        details: 'Join as a Collection Officer and secure a CTC of Rs 5 LPA + incentives',
        duration: '1-month program',
        image: heroCoImage,
      },
      'Housing Finance Pragati Program - Credit and Operations Manager': {
        programLabel: 'Housing Finance Pragati Program',
        logo: heroLogo,
        details: 'Join as a Credit and Operations Manager and secure a CTC of Rs 4 LPA + incentives',
        duration: '1-month program',
        image: heroComImage,
        mobileBackgroundPosition: '20% center',
      },
      'Rupyy AutoEdge Program - Business Manager': {
        programLabel: 'Rupyy AutoEdge Program',
        logo: rupyyLogo,
        details: 'Join as a Business Manager – Used Car Finance and secure a CTC of Rs 3 LPA + incentives',
        duration: '1-month program',
        image: rupyyProgramImage,
      },
      'Virtual Relationship Manager': {
        programLabel: 'Elevate Banking Program',
        logo: udaanLogo,
        details: 'Join as a Virtual Relationship Manager and secure a CTC of upto Rs 2.4 LPA',
        duration: '4-week program',
        image: elevateVrmImage,
      },
      'Piramal ProEdge Program - Relationship Manager': {
        programLabel: 'Piramal ProEdge Program',
        logo: piramalCardLogo,
        details: 'Join as a Relationship Manager with a CTC of Rs 2.74 LPA + variable',
        duration: '3.5-month program',
        image: relationshipManagerPiramalImage,
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
      'Finova VyaparaMitra Program - Relationship Officer': {
        programLabel: 'Finova VyaparaMitra Program',
        logo: finovaCardLogo,
        details: 'Join as a Relationship Officer with a CTC of Rs 2.4 LPA + variable',
        duration: '1-month program',
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
      'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager': {
        programLabel: 'Bandhan Bank Aspiring Bank Champions Programme',
        shortProgramLabel: 'Bandhan Bank Aspiring Bank Champions Programme',
        logo: bandhanBankLogo,
        details: 'Join as an Assistant Manager with a CTC of Rs 4 LPA',
        duration: '6-month program',
        image: pgpbmDesktopImage,
      },
      'Postgraduate Program Retail Banking - Relationship Officer': {
        programLabel: 'Postgraduate Program - Retail Banking',
        shortProgramLabel: 'PGP - Retail Banking',
        logo: udaanCardLogo,
        details: 'Join as a Relationship Officer - Mortgage Field Sale with a CTC of upto Rs 3.1 LPA + incentives',
        duration: '3-week program',
        image: retailBankingDesktopImage,
        mobileImage: retailBankingMobileImage,
      },
      'Banking Sales Program - Sales Officer': {
        programLabel: 'Banking Sales Program',
        logo: udaanCardLogo,
        details: 'Join as a Sales Officer with a CTC of Rs 2.5 LPA + incentives',
        duration: '1-month program',
        image: bankingSalesDesktopImage,
        mobileImage: mobileSalesOfficerImage,
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
        mobileImage: prog.mobileImage ?? prog.image,
        mobileBackgroundPosition: prog.mobileBackgroundPosition,
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
    if (card.title === 'Postgraduate Program Relationship Management - Relationship Manager') return 'PGP - Relationship Management - Relationship Manager'
    if (card.title === 'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager') return 'Bandhan Bank Aspiring Bank Champions - Assistant Manager'
    if (card.title === 'Postgraduate Program Retail Banking - Relationship Officer') return 'PGP - Retail Banking - Relationship Officer'
    if (card.title === 'Housing Finance Pragati Program - Relationship Manager') return 'Housing Finance Pragati - Relationship Manager'
    if (card.title === 'Housing Finance Pragati Program - Collection Officer') return 'Housing Finance Pragati - Collection Officer'
    if (card.title === 'Housing Finance Pragati Program - Credit and Operations Manager') return 'Housing Finance Pragati - Credit and Operations Manager'
    if (card.title === 'Rupyy AutoEdge Program - Business Manager') return 'Rupyy AutoEdge - Business Manager'
    if (card.title === 'Mahindra Finance Prarambh Program - Business Executive (Vehicle Loan - Field Sales)') return 'Mahindra Finance Prarambh - Business Executive'
    if (card.title === 'Virtual Relationship Manager') return 'Elevate Banking Program - Virtual Relationship Manager'
    return card.title
  }

  // Get display title (strip program prefix)
  const getDisplayTitle = (title) => {
    if (title === 'Mahindra Finance Prarambh Program - Business Executive (Vehicle Loan - Field Sales)') {
      return 'Business Executive'
    }
    return title
      .replace('Lenskart EyeTech Program - ', '')
      .replace('Piramal ProEdge Program - ', '')
      .replace('Aviva Nirmaan Program - ', '')
      .replace('Finova VyaparaMitra Program - ', '')
      .replace('Postgraduate Program Relationship Management - ', '')
      .replace('Bandhan Bank Aspiring Bank Champions Programme - ', '')
      .replace('Postgraduate Program Retail Banking - ', '')
      .replace('Mahindra Finance Prarambh Program - ', '')
      .replace('Housing Finance Pragati Program - ', '')
      .replace('Rupyy AutoEdge Program - ', '')
      .replace('Banking Sales Program - ', '')
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
                  const mobileBackgroundPosition =
                    details.mobileBackgroundPosition ??
                    (details.programLabel === 'Mahindra Finance Prarambh Program' ? '30% center' : 'center')
                  return (
                    <a
                      key={card.id}
                      href={appendUtmToUrl(card.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mobile-program-card-link"
                      onClick={() => trackMicrositeClick(card.title)}
                    >
                      <div className="mobile-program-card">
                        <div
                          className="mobile-program-card-image"
                          style={{
                            backgroundImage: `url(${details.mobileImage || details.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: mobileBackgroundPosition,
                            backgroundRepeat: 'no-repeat'
                          }}
                        >
                          <div className="mobile-program-card-content">
                            {(() => {
                              const logoInfo = getProgramHomeLogo(details.programLabel || 'Lenskart Program')
                              if (!logoInfo) return null
                              const isAviva = logoInfo.alt === 'Aviva'
                              const isMahindra = logoInfo.alt === 'Mahindra Finance'
                              const isBandhan = logoInfo.alt === 'Bandhan Bank'
                              return (
                                <div className={`mobile-program-card-logo${isAviva ? ' mobile-program-card-logo--aviva' : ''}${isMahindra ? ' mobile-program-card-logo--mahindra' : ''}${isBandhan ? ' mobile-program-card-logo--bandhan' : ''}`}>
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
                        <a href={appendUtmToUrl(programCards[featuredCardIndex]?.url || '#')} target="_blank" rel="noopener noreferrer" onClick={() => trackMicrositeClick(programCards[featuredCardIndex]?.title)}>
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
                      href={appendUtmToUrl(card.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="program-mini-card-link"
                      ref={(el) => (cardRefs.current[index] = el)}
                      onClick={() => trackMicrositeClick(card.title)}
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
                      href={appendUtmToUrl(programCards[0].url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="program-mini-card-link"
                      ref={(el) => (cardRefs.current[programCards.length] = el)}
                      onClick={() => trackMicrositeClick(programCards[0].title)}
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