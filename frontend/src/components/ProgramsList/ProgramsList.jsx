import React, { useState } from 'react'
import auCardLogo from '../../assets/au_card_logo.png'
import lenskartCardLogo from '../../assets/lenskart_card_logo.png'
// import piramalLogo from '../../assets/piramal.png'
import piramalLogo from '../../assets/piramal_small.png'

import udaanLogo from '../../assets/udaan_temporary_logo.png'
import paytmLogo from '../../assets/paytm_small_logo.png'
import poonawallaLogoSmallCard from '../../assets/poonawalla_logo_small_card.png'
import avivaLogoSmallCard from '../../assets/aviva_logo_small_card.png'
import finovaSmallLogo from '../../assets/finova_small_logo.png'
import './ProgramsList.css'

const ProgramsList = () => {
  const [activeTab, setActiveTab] = useState('Banking')

  const programs = {
    Banking: [
      {
        program: 'AURUM Bankers Program',
        role: 'Relationship Manager',
        details: [
          'Join as a Relationship Manager with a CTC of Rs 5.5 LPA + PLP',
          '6-month program'
        ]
      },
      {
        program: 'AURUM Bankers Program',
        role: 'Bank Officer',
        details: [
          'Join as a Bank Officer with a CTC of Rs 3.5 LPA + PLP',
          '4-month program'
        ]
      },
      {
        program: 'AURUM Bankers Program',
        role: 'Relationship Officer',
        details: [
          'Join as a Relationship Officer with a CTC of Rs 2.7 LPA + PLP',
          '2-month program'
        ]
      },
      {
        program: 'AURUM Bankers Program',
        role: 'Sales Officer',
        details: [
          'Join as a Sales Officer with a CTC of Rs 2.7 LPA + PLP',
          '2-month program'
        ]
      },
      {
        program: 'AURUM Bankers Program',
        role: 'Money Officer',
        details: [
          'Join as a Money Officer with a CTC of Rs 2.75 LPA + PLP',
          '2-month program'
        ]
      },
      {
        program: 'AURUM Bankers Program',
        role: 'Transaction Officer',
        details: [
          'Join as a Transaction Officer with a CTC of upto Rs 2.7 LPA + PLP',
          '2-month program'
        ]
      },
      {
        program: 'AURUM Bankers Program',
        role: 'Customer Service Officer',
        details: [
          'Join as a Customer Service Officer with a CTC of Rs 2.75 LPA + PLP',
          '2-month program'
        ]
      },
      {
        program: 'AURUM Bankers Program',
        role: 'Deputy Center Manager',
        details: [
          'Join as a Deputy Center Manager with a CTC of upto Rs 2.05 LPA + PLP',
          '2-month program'
        ]
      },
      {
        program: 'AURUM Bankers Program',
        role: 'Deputy Late Recovery Officer',
        details: [
          'Join as a Deputy Late Recovery Officer with a CTC of upto Rs 2.05 LPA + PLP',
          '2-month program'
        ]
      },
      {
        program: 'AURUM Bankers Program',
        role: 'Customer Service Officer Valuation',
        details: [
          'Join as a Customer Service Officer Valuation with a CTC of Rs 2.7 LPA + PLP',
          '2.5-month program'
        ]
      },
      {
        program: 'Udaan Program',
        role: 'Cashier / Teller',
        details: [
          'Join as a Cashier / Teller with a CTC of upto Rs 3.5 LPA',
          '2-month program'
        ]
      },
      {
        program: 'Udaan Program',
        role: 'Virtual Relationship Manager',
        details: [
          'Join as a Virtual Relationship Manager with a CTC of upto Rs 2.8 LPA',
          '4-week program'
        ]
      },
      {
        program: 'Udaan Program',
        role: 'Relationship Manager',
        details: [
          'Join as a Relationship Manager with a CTC of upto Rs 6.5 LPA',
          '3-week program'
        ]
      },
      {
        program: 'Udaan Program',
        role: 'Business Loan Associate',
        details: [
          'Join as a Business Loan Associate with a CTC of upto Rs 2.8 LPA',
          '3-week program'
        ]
      }
    ],
    Retail: [
      {
        program: 'Lenskart EyeTech Program',
        role: 'Clinical Technician',
        details: [
          'Join as a Clinical Technician with a CTC of Rs 2.64 LPA',
          '6-month program'
        ]
      },
      {
        program: 'Lenskart EyeTech Program',
        role: 'Retail Sales Associate',
        details: [
          'Join as a Retail Sales Associate with a CTC of Rs 3 LPA + incentives',
          '9-week program'
        ]
      }
    ],
    NBFC: [
      {
        program: 'Piramal ProEdge Program',
        role: 'Relationship Manager',
        details: [
          'Join as a Relationship Manager with a CTC of Rs 2.74 LPA + variable',
          '13-week program'
        ]
      },
      {
        program: 'Paytm Disha Program',
        role: 'Field Sales Executive',
        details: [
          'Join as a Field Sales Executive with a CTC of Rs 2.5 LPA + incentives',
          '2-week program (virtual)'
        ]
      }
      ,
      {
        program: 'VyaparaMitra Program',
        role: 'Relationship Officer',
        details: [
          'Join as a Relationship Officer with a CTC of Rs 2.4 LPA + variable',
          '3-month program'
        ]
      },
      {
        program: 'FinPro Career Program - Gold Assayer',
        role: 'Gold Assayer',
        details: [
          'Join as a Gold Assayer with a CTC of Rs 2.5 LPA + incentives',
          '1.5-month program'
        ]
      },
      {
        program: 'FinPro Career Program - Sales Executive',
        role: 'Sales Executive',
        details: [
          'Join as a Sales Executive with a CTC of upto Rs 2.76 LPA + incentives',
          '3-week program'
        ]
      }
    ]
    ,
    Insurance: [
      {
        program: 'Aviva Nirmaan Program - Direct Sales Executive',
        role: 'Direct Sales Executive',
        details: [
          'Join as a Front Line Sales Executive - Direct Sales with a CTC of Rs 3.5 LPA + variable',
          '3-month program'
        ]
      },
      {
        program: 'Aviva Nirmaan Program - Agency Sales Executive',
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
    if (category === 'Banking') {
      switch (role) {
        case 'Relationship Manager':
          return item?.program === 'Udaan Program' ? 'https://udaanrm.crack-ed.com' : 'https://aurmroyale.crack-ed.com/'
        case 'Relationship Officer':
          return 'https://aubank.ro.crack-ed.com/portal'
        case 'Bank Officer':
          return 'https://aubankbo.crack-ed.com/portal'
        case 'Sales Officer':
          return 'https://aubankso.crack-ed.com/portal'
        case 'Transaction Officer':
          return 'https://aubankto.crack-ed.com/portal'
        case 'Deputy Center Manager':
          return 'https://aubankcm.crack-ed.com/portal'
        case 'Customer Service Officer':
          return 'https://aubankcso.crack-ed.com/portal'
        case 'Deputy Late Recovery Officer':
          return 'https://aubanklro.crack-ed.com/portal'
        case 'Money Officer':
          return 'https://aubankmo.crack-ed.com/portal'
        case 'Customer Service Officer Valuation':
          return 'https://aubankbcso.crack-ed.com/portal'
        case 'Cashier / Teller':
          return 'https://udaan.crack-ed.com/portal'
        case 'Virtual Relationship Manager':
          return 'https://udaanvrm.crack-ed.com'
        case 'Business Loan Associate':
          return 'https://udaanbusiness.crack-ed.com'
        default:
          return null
      }
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
      switch (role) {
        case 'Relationship Manager':
          return 'https://piramal.crack-ed.com/portal'
        case 'Relationship Officer':
          return 'https://finovaro.crack-ed.com'
        case 'Field Sales Executive':
          return 'https://paytm.crack-ed.com/portal'
        case 'Gold Assayer':
          return 'http://poonawallaga.crack-ed.com/'
        case 'Sales Executive':
          return 'http://poonawallase.crack-ed.com/'
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
    if (category === 'Banking' && item?.program === 'Udaan Program') {
      return <img src={udaanLogo} alt="Udaan" className="program-logo-img program-logo-udaan" />
    }
    if (category === 'Banking') return <img src={auCardLogo} alt="AU Bank" className="program-logo-img" />
    if (category === 'Retail') return <img src={lenskartCardLogo} alt="Lenskart" className="program-logo-img" />
    if (category === 'NBFC' && item?.program === 'Paytm Disha Program') {
      return <img src={paytmLogo} alt="Paytm" className="program-logo-img program-logo-paytm" />
    }
    if (category === 'NBFC' && item?.program && item.program.startsWith('FinPro Career Program')) {
      return <img src={poonawallaLogoSmallCard} alt="Poonawalla" className="program-logo-img program-logo-poonawalla" />
    }
    if (category === 'NBFC' && item?.program && item.program.startsWith('VyaparaMitra Program')) {
      return <img src={finovaSmallLogo} alt="Finova" className="program-logo-img program-logo-finova" />
    }
    if (category === 'NBFC') return <img src={piramalLogo} alt="Piramal" className="program-logo-img program-logo-piramal" />
    if (category === 'Insurance') return <img src={avivaLogoSmallCard} alt="Aviva" className="program-logo-img program-logo-aviva" />
    return null
  }

  return (
    <section className="programs-list">
      <div className="programs-list-container">
        <button className="explore-other-programs">Explore Other Programs</button>
        
        <div className="programs-tabs">
          <button
            className={`program-tab ${activeTab === 'Banking' ? 'active' : ''}`}
            onClick={() => setActiveTab('Banking')}
          >
            Banking
          </button>
          <button
            className={`program-tab ${activeTab === 'Retail' ? 'active' : ''}`}
            onClick={() => setActiveTab('Retail')}
          >
            Retail
          </button>
          <button
            className={`program-tab ${activeTab === 'NBFC' ? 'active' : ''}`}
            onClick={() => setActiveTab('NBFC')}
          >
            NBFC
          </button>
        <button
          className={`program-tab ${activeTab === 'Insurance' ? 'active' : ''}`}
          onClick={() => setActiveTab('Insurance')}
        >
          Insurance
        </button>
        </div>

        <div className="programs-grid">
          {programs[activeTab].map((item, index) => {
            const link = getProgramLink(activeTab, item)
            return (
              <a
                key={index}
                href={link || '#'}
                className="program-card"
                target={link ? '_blank' : undefined}
                rel={link ? 'noopener noreferrer' : undefined}
                onClick={!link ? (e) => e.preventDefault() : undefined}
              >
                <div className="program-card-top">
                  <div className="program-card-icon">{getIcon(activeTab, item)}</div>
                  <div className="program-card-header">
                    <div className="program-card-name">{item.program}</div>
                    <div className="program-card-role">{item.role}</div>
                  </div>
                </div>
                <div className="program-card-content">
                  <div className="program-card-details">
                    {item.details.map((detail, idx) => (
                      <div key={idx} className="program-detail-item">
                        <span className="checkmark"></span>
                        <span className="detail-text">{detail}</span>
                      </div>
                    ))}
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
