import React, { useState } from 'react'
import auCardLogo from '../../assets/au_card_logo.png'
import lenskartCardLogo from '../../assets/lenskart_card_logo.png'
import piramalLogo from '../../assets/piramal.png'
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
      }
    ],
    Retail: [
      {
        program: 'Lenskart EyeTech Program',
        role: 'Clinical Technician',
        details: [
          'Join as a Dispensing Optician with a CTC of Rs 2.64 LPA',
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
      }
    ]
  }

  const getIcon = (category) => {
    if (category === 'Banking') return <img src={auCardLogo} alt="AU Bank" className="program-logo-img" />
    if (category === 'Retail') return <img src={lenskartCardLogo} alt="Lenskart" className="program-logo-img" />
    if (category === 'NBFC') return <img src={piramalLogo} alt="Piramal" className="program-logo-img" />
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
        </div>

        <div className="programs-grid">
          {programs[activeTab].map((item, index) => (
            <div key={index} className="program-card">
              <div className="program-card-top">
                <div className="program-card-icon">{getIcon(activeTab)}</div>
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
                <div className="program-card-footer">
                  <a href="#" className="view-details-link">
                    View Details
                    <span className="view-details-arrow">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 4L12.5 10L7.5 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="7.5" y1="10" x2="0" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProgramsList
