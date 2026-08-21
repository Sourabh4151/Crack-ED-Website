import React, { useState, useEffect } from 'react'
import lenskartCardLogo from '../../assets/lenskart_card_logo.png'
// import piramalLogo from '../../assets/piramal.png'
import piramalLogo from '../../assets/piramal_small.png'

import udaanLogo from '../../assets/udaan_temporary_logo.png'
import bandhanBankLogo from '../../assets/animation_bandhan_logo.svg'
import avivaLogoSmallCard from '../../assets/aviva_logo_small_card.png'
import finovaSmallLogo from '../../assets/finova_small_logo.png'
import mahindraFinanceSmallLogo from '../../assets/mahindra_finance_small_logo_logo.png'
import kotakSmallLogo from '../../assets/kotak_small_logo.png'
import heroSmallLogo from '../../assets/hero_small_logo.png'
import rupyySmallLogo from '../../assets/rupyy_small_logo.png'
import { trackMicrositeClick, markProgramsPageVisited } from '../../utils/analytics'
import { appendUtmToUrl } from '../../services/crmService'
import './ProgramsList.css'

const PROGRAM_CATEGORIES = ['Entrepreneurship', 'Banking', 'NBFC', 'Insurance', 'Retail']
const PROGRAM_TABS = ['All', ...PROGRAM_CATEGORIES]

const ProgramsList = () => {
  useEffect(() => { markProgramsPageVisited() }, [])

  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const programs = {
    Entrepreneurship: [
      {
        program: 'Entrepreneurship & Venture Creation',
        role: 'House of Founders Fellowship',
        details: [
          '6-Month Hybrid Fellowship designed for aspiring and existing entrepreneurs.',
          'Investor-ready by graduation, with a chance to pitch your venture to investors.*'
        ]
      }
    ],
    Banking: [
      {
        program: 'Postgraduate Program',
        role: 'Relationship Manager',
        isPremium: true,
        details: [
          'Join as a Relationship Manager with a CTC of Rs 5.5 LPA + incentives',
          '6-month program'
        ]
      },
      {
        program: 'Bandhan Bank Aspiring Bank Champions Programme',
        role: 'Assistant Manager',
        isPremium: true,
        details: [
          'Join as an Assistant Manager with a CTC of 4 LPA*',
          '6-month program'
        ],
        disclaimer: '*Variable Pay for all eligible employees will be paid over and above their Annual Fixed Pay. This is however subject to performance of the Bank, Department, and Individual*'
      },
      {
        program: 'Postgraduate Program',
        role: 'Relationship Officer',
        details: [
          'Join as a Relationship Officer - Mortgage Field Sale with a CTC of upto Rs 3.1 LPA + incentives',
          '3-week program'
        ]
      },
      {
        program: 'Elevate Banking Program',
        role: 'Virtual Relationship Manager',
        details: [
          'Join as a Virtual Relationship Manager and secure a CTC of upto Rs 2.4 LPA',
          '4-week program'
        ]
      },
      {
        program: 'Banking Sales Program',
        role: 'Sales Officer',
        details: [
          'Join as a Sales Officer with a CTC of Rs 2.75 LPA',
          '3-week program'
        ]
      },
      {
        program: 'Samriddhi Program',
        role: 'Field Executive',
        details: [
          'Join as a Field Executive and secure a CTC of upto Rs 2.22 LPA + incentives',
          '1-week program'
        ]
      }
    ],
    Retail: [
      {
        program: 'Lenskart EyeTech Program',
        role: 'Clinical Technician',
        admissionClosed: true,
        details: [
          'Join as a Clinical Technician with a CTC of Rs 2.64 LPA',
          '6-month program'
        ]
      },
      {
        program: 'Lenskart EyeTech Program',
        role: 'Retail Sales Associate',
        admissionClosed: true,
        details: [
          'Join as a Retail Sales Associate with a CTC of Rs 3.5 LPA',
          '5-week program'
        ]
      }
    ],
    NBFC: [
      {
        program: 'Hero Housing Finance Pragati Program',
        role: 'Collection Officer',
        details: [
          'Join as a Collection Officer and secure a CTC of Rs 5 LPA + incentives',
          '1-month program'
        ]
      },
      {
        program: 'Hero Housing Finance Pragati Program',
        role: 'Credit and Operations Manager',
        details: [
          'Join as a Credit and Operations Manager and secure a CTC of Rs 4 LPA + incentives',
          '1-month program'
        ]
      },
      {
        program: 'Hero Housing Finance Pragati Program',
        role: 'Relationship Manager',
        details: [
          'Join as a Relationship Manager - Mortgage Sales and secure a CTC of Rs 2.75 LPA + incentives',
          '1-month program'
        ]
      },
      {
        program: 'Rupyy AutoEdge Program',
        role: 'Business Manager',
        details: [
          'Join as a Business Manager – Used Car Finance and secure a CTC of Rs 3 LPA + incentives',
          '1-month program'
        ]
      },
      {
        program: 'Mahindra Finance Prarambh Program',
        role: 'Business Executive',
        details: [
          'Join as a Business Executive (Vehicle Loan - Field Sales) with a CTC of Rs 3.5 LPA + incentives',
          '1-month online program'
        ]
      },
      {
        program: 'Talent Accelerator Program',
        role: 'Sales Executive',
        details: [
          'Join as a Sales Executive at Kotak Prime and secure a CTC of Rs 2.75 LPA + incentives',
          '1-month program'
        ]
      },
      {
        program: 'Finova VyaparaMitra Program',
        role: 'Relationship Officer',
        admissionClosed: true,
        details: [
          'Join as a Relationship Officer with a CTC of Rs 2.4 LPA + variable',
          '1-month program'
        ]
      },
      {
        program: 'Piramal ProEdge Program',
        role: 'Relationship Manager',
        details: [
          'Join as a Relationship Manager with a CTC of Rs 2.74 LPA + Variable upto 3 LPA',
          '3.5-month program'
        ]
      }
    ]
    ,
    Insurance: [
      {
        program: 'Aviva Nirmaan Program',
        role: 'Direct Sales Executive',
        details: [
          'Join as a Front Line Sales Executive - Direct Sales with a CTC of Rs 3.5 LPA + variable',
          '3-month program'
        ]
      },
      {
        program: 'Aviva Nirmaan Program',
        role: 'Agency Sales Executive',
        details: [
          'Join as a Front Line Sales Executive - Agency Sales with a CTC of Rs 3.5 LPA + variable',
          '3-month program'
        ]
      }
    ]
  }

  const getProgramLink = (category, item) => {
    const role = item?.role
    const program = item?.program
    if (category === 'Entrepreneurship') {
      if (role === 'House of Founders Fellowship') return 'https://house-of-founders.crack-ed.com/'
      return null
    }
    if (category === 'Banking') {
      if (program === 'Postgraduate Program' && role === 'Relationship Manager') return 'https://pgprm.crack-ed.com'
      if (program === 'Bandhan Bank Aspiring Bank Champions Programme' && role === 'Assistant Manager') {
        return 'https://bandhanbankassistantmanager.crack-ed.com/'
      }
      if (program === 'Postgraduate Program' && role === 'Relationship Officer') return 'https://pgprb.crack-ed.com'
      if (program === 'Banking Sales Program' && role === 'Sales Officer') return 'https://bspso.crack-ed.com'
      if (program === 'Samriddhi Program' && role === 'Field Executive') return 'https://axisquessfse.crack-ed.com/'
      if (program === 'Elevate Banking Program' && role === 'Virtual Relationship Manager') return 'https://elevatevrm.crack-ed.com/'
      return null
    }

    if (category === 'Retail') {
      switch (role) {
        case 'Clinical Technician':
          return 'https://lenskart.crack-ed.com/portal'
        case 'Retail Sales Associate':
          return 'https://lenskartrsa.crack-ed.com/portal'
        default:
          return null
      }
    }

    if (category === 'NBFC') {
      if (program === 'Hero Housing Finance Pragati Program' && role === 'Relationship Manager') {
        return 'https://herofinancerm.crack-ed.com/'
      }
      if (program === 'Hero Housing Finance Pragati Program' && role === 'Collection Officer') {
        return 'https://herofinanceco.crack-ed.com/'
      }
      if (program === 'Hero Housing Finance Pragati Program' && role === 'Credit and Operations Manager') {
        return 'https://herofinancecom.crack-ed.com/'
      }
      if (program === 'Rupyy AutoEdge Program' && role === 'Business Manager') {
        return 'https://rupyybm.crack-ed.com/'
      }
      if (program === 'Mahindra Finance Prarambh Program' && role === 'Business Executive') {
        return 'https://mahindrafinancebe.crack-ed.com/'
      }
      if (program === 'Talent Accelerator Program' && role === 'Sales Executive') {
        return 'https://kotakmahindraso.crack-ed.com/'
      }
      switch (role) {
        case 'Relationship Manager':
          return 'https://piramal.crack-ed.com/portal'
        case 'Relationship Officer':
          return 'https://finovaro.crack-ed.com'
        default:
          return null
      }
    }
    
    if (category === 'Insurance') {
      switch (role) {
        case 'Direct Sales Executive':
          return 'https://avivads.crack-ed.com'
        case 'Agency Sales Executive':
          return 'https://avivaas.crack-ed.com'
        default:
          return null
      }
    }

    return null
  }

  const getIcon = (category, item) => {
    const program = item?.program
    const useUdaanLogo =
      program === 'Postgraduate Program' ||
      program === 'Banking Sales Program' ||
      program === 'Samriddhi Program' ||
      program === 'Elevate Banking Program'
    if (category === 'Entrepreneurship') {
      return <img src={udaanLogo} alt="Udaan" className="program-logo-img program-logo-udaan" />
    }
    if (category === 'Banking' && program === 'Bandhan Bank Aspiring Bank Champions Programme') {
      return <img src={bandhanBankLogo} alt="Bandhan Bank" className="program-logo-img program-logo-bandhan" />
    }
    if (category === 'Banking' && useUdaanLogo) {
      return <img src={udaanLogo} alt="Udaan" className="program-logo-img program-logo-udaan" />
    }
    if (category === 'Banking') return <img src={udaanLogo} alt="Udaan" className="program-logo-img program-logo-udaan" />
    if (category === 'Retail') return <img src={lenskartCardLogo} alt="Lenskart" className="program-logo-img" />
    if (category === 'NBFC' && item?.program && item.program.startsWith('Finova VyaparaMitra Program')) {
      return <img src={finovaSmallLogo} alt="Finova" className="program-logo-img program-logo-finova" />
    }
    if (category === 'NBFC' && item?.program === 'Hero Housing Finance Pragati Program') {
      return <img src={heroSmallLogo} alt="Hero Housing Finance" className="program-logo-img program-logo-hero" />
    }
    if (category === 'NBFC' && item?.program === 'Rupyy AutoEdge Program') {
      return <img src={rupyySmallLogo} alt="Rupyy" className="program-logo-img program-logo-rupyy" />
    }
    if (category === 'NBFC' && program === 'Mahindra Finance Prarambh Program') {
      return <img src={mahindraFinanceSmallLogo} alt="Mahindra Finance" className="program-logo-img program-logo-mahindra" />
    }
    if (category === 'NBFC' && program === 'Talent Accelerator Program') {
      return <img src={kotakSmallLogo} alt="Kotak Prime" className="program-logo-img program-logo-kotak" />
    }
    if (category === 'NBFC') return <img src={piramalLogo} alt="Piramal" className="program-logo-img program-logo-piramal" />
    if (category === 'Insurance') return <img src={avivaLogoSmallCard} alt="Aviva" className="program-logo-img program-logo-aviva" />
    return null
  }

  const withCategory = (category, items) => items.map((item) => ({ ...item, category }))

  const sortClosedToEnd = (items) => [
    ...items.filter((item) => !item.admissionClosed),
    ...items.filter((item) => item.admissionClosed),
  ]

  const getAllProgramsInOrder = () => [
    ...withCategory('Entrepreneurship', programs.Entrepreneurship),
    ...withCategory('NBFC', programs.NBFC.slice(0, 5)),
    ...withCategory('Banking', programs.Banking),
    ...withCategory('NBFC', programs.NBFC.slice(5)),
    ...withCategory('Insurance', programs.Insurance),
    ...withCategory('Retail', programs.Retail),
  ]

  const displayedPrograms =
    activeTab === 'All'
      ? sortClosedToEnd(getAllProgramsInOrder())
      : activeTab === 'NBFC'
        ? sortClosedToEnd(programs.NBFC.map((item) => ({ ...item, category: activeTab })))
        : programs[activeTab].map((item) => ({ ...item, category: activeTab }))

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const filteredPrograms = normalizedQuery
    ? displayedPrograms.filter((item) => {
        const searchable = [item.program, item.role, item.category, ...item.details]
          .join(' ')
          .toLowerCase()
        return searchable.includes(normalizedQuery)
      })
    : displayedPrograms

  return (
    <section id="programs-list" className="programs-list">
      <div className="programs-list-container">
        <div className="explore-other-programs">Explore Other Programs</div>
        
        <div className="programs-tabs">
          {PROGRAM_TABS.map((tab) => (
            <button
              key={tab}
              className={`program-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="programs-search">
          <svg
            className="programs-search-icon"
            width="24"
            height="24"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
              stroke="rgba(250, 250, 250, 0.7)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 19L14.65 14.65"
              stroke="rgba(250, 250, 250, 0.7)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="search"
            className="programs-search-input"
            placeholder="Search Program"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search programs"
          />
        </div>

        <div className="programs-grid">
          {filteredPrograms.map((item, index) => {
            const isClosed = Boolean(item.admissionClosed)
            const link = getProgramLink(item.category, item)
            return (
              <a
                key={`${item.category}-${item.program}-${item.role}-${index}`}
                href={appendUtmToUrl(link || '#')}
                className="program-card"
                target={link ? '_blank' : undefined}
                rel={link ? 'noopener noreferrer' : undefined}
                onClick={
                  !link
                    ? (e) => e.preventDefault()
                    : () => trackMicrositeClick(`${item.program} - ${item.role}`)
                }
              >
                <div className="program-card-top">
                  <div className="program-card-icon">{getIcon(item.category, item)}</div>
                  <div className="program-card-header">
                    <div className="program-card-name">{item.program}</div>
                    <div className="program-card-role">{item.role}</div>
                  </div>
                </div>
                <div className="program-card-content">
                  <div className={`program-card-details${isClosed ? ' program-card-details--closed' : ''}${item.isPremium ? ' program-card-details--premium' : ''}`}>
                    {item.isPremium && (
                      <span className="program-premium-badge">Premium Program</span>
                    )}
                    {isClosed && (
                      <span className="program-admission-closed">Admission Closed</span>
                    )}
                    {item.details.map((detail, idx) => (
                      <div key={idx} className="program-detail-item">
                        <span className="checkmark"></span>
                        <span className="detail-text">{detail}</span>
                      </div>
                    ))}
                    {item.disclaimer && (
                      <p className="program-disclaimer">{item.disclaimer}</p>
                    )}
                  </div>
                </div>
                <div className="program-card-footer">
                  <span className="view-details-link">
                    View Details
                    <span className="view-details-arrow">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 4L12.5 10L7.5 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="7.5" y1="10" x2="0" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </span>
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProgramsList
