import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './JobDetail.css'

const JobDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    // Scroll to top when component mounts or route changes
    window.scrollTo(0, 0)
  }, [id])
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    resume: null
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      resume: e.target.files[0]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  // Job data - in a real app, this would come from an API
  const job = {
    id: id || '1',
    title: 'Operations Executive',
    type: 'FULL TIME',
    workMode: 'WORK FROM OFFICE',
    positions: 2,
    location: 'GURUGRAM, SECTOR 62',
    description: {
      aboutUs: "At Crack-ED, we are on a mission to empower young professionals through our industry-ready Post Graduate Programs (PGPs). We believe a smooth and supportive journey leads to long-term success and that journey starts with our Operations team.",
      roleOverview: "We are looking for a detail-oriented and proactive Operations Executive to ensure a seamless experience for our PGP candidates from onboarding to batch completion. You will play a critical role in making sure processes run smoothly, loans are processed timely, and candidates feel supported throughout their learning journey.",
      responsibilities: [
        {
          title: "Seamless Onboarding:",
          description: "Facilitate a smooth onboarding experience for all selected candidates of our PGP programs. Coordinate documentation, orientation, and communication to ensure a positive first impression."
        },
        {
          title: "Batch Management:",
          description: "Oversee batch-wise scheduling, student lists, attendance tracking, and coordination with the academic team to ensure classes run efficiently. Manage communication related to schedule updates, session links, and program milestones."
        },
        {
          title: "Operational Support:",
          description: "Support end-to-end execution of operational tasks such as certificate generation, feedback collection, issue resolution, and escalation management."
        },
        {
          title: "Process Improvement:",
          description: "Identify gaps in operational workflows and suggest improvements to enhance efficiency and student experience."
        },
        {
          title: "Data Management & Reporting:",
          description: "Maintain accurate records of candidate status, loan processing, and batch data. Share timely reports with stakeholders for transparency and planning."
        },
        {
          title: "Email Writing:",
          description: "Be proficient in writing professional emails, ensuring timely and accurate updates about trainings are shared with our corporate partners and all other relevant stakeholders."
        }
      ]
    }
  }

  return (
    <div className="job-detail-page">
      <Header />
      <section className="job-detail-section">
        <div className="job-detail-container">
          <button className="job-detail-back-link" onClick={() => navigate('/careers')}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L6 10L12 16" stroke="rgba(250, 250, 250, 0.75)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to listings
          </button>

          <div className="job-detail-header">
            <div className="job-detail-title-section">
              <h1 className="job-detail-title">{job.title}</h1>
              <div className="job-detail-meta">
                <span className="job-detail-meta-item">{job.type}</span>
                <span className="job-detail-meta-item">{job.workMode}</span>
                <span className="job-detail-meta-item">{job.positions} POSITIONS</span>
                <span className="job-detail-location">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8.5C9.10457 8.5 10 7.60457 10 6.5C10 5.39543 9.10457 4.5 8 4.5C6.89543 4.5 6 5.39543 6 6.5C6 7.60457 6.89543 8.5 8 8.5Z" stroke="rgba(180, 187, 186, 1)" strokeWidth="1.5"/>
                    <path d="M2.5 6.5C2.5 4.01472 4.51472 2.5 7 2.5C9.48528 2.5 11.5 4.01472 11.5 6.5C11.5 8.98528 7 13.5 7 13.5C7 13.5 2.5 8.98528 2.5 6.5Z" stroke="rgba(180, 187, 186, 1)" strokeWidth="1.5"/>
                  </svg>
                  {job.location}
                </span>
              </div>
            </div>
            <button 
              className="job-detail-apply-button"
              onClick={() => {
                const formSection = document.getElementById('apply-form-section')
                if (formSection) {
                  formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
            >
              Apply Now
            </button>
          </div>

          <div className="job-detail-separator"></div>

          <div className="job-detail-content">
            <div className="job-detail-description">
              <div className="job-detail-section-block">
                <h2 className="job-detail-section-heading">About Us:</h2>
                <p className="job-detail-section-text">{job.description.aboutUs}</p>
              </div>

              <div className="job-detail-section-block">
                <h2 className="job-detail-section-heading">Role Overview:</h2>
                <p className="job-detail-section-text">{job.description.roleOverview}</p>
              </div>

              <div className="job-detail-section-block">
                <h2 className="job-detail-section-heading">Key Responsibilities:</h2>
                {job.description.responsibilities.map((responsibility, index) => (
                  <div key={index} className="job-detail-responsibility">
                    <h3 className="job-detail-responsibility-title">{responsibility.title}</h3>
                    <p className="job-detail-responsibility-text">{responsibility.description}</p>
                  </div>
                ))}
              </div>

              <div id="apply-form-section" className="job-detail-apply-form-section">
                <form onSubmit={handleSubmit} className="job-detail-apply-form">
                  <h2 className="job-detail-apply-form-title">Apply For This Role</h2>
                  <div className="job-detail-form-separator"></div>
                  <div className="job-detail-form-field">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="job-detail-form-input"
                      required
                    />
                  </div>
                  <div className="job-detail-form-field">
                    <input
                      type="tel"
                      name="mobileNumber"
                      placeholder="Mobile number"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className="job-detail-form-input"
                      required
                    />
                  </div>
                  <div className="job-detail-form-field">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email ID"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="job-detail-form-input"
                      required
                    />
                  </div>
                  <div className="job-detail-form-field">
                    <label className="job-detail-upload-label">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="job-detail-file-input"
                      />
                      <div className="job-detail-upload-box">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.5 12.5V16.25C17.5 16.5815 17.3683 16.8995 17.1339 17.1339C16.8995 17.3683 16.5815 17.5 16.25 17.5H3.75C3.41848 17.5 3.10054 17.3683 2.86612 17.1339C2.6317 16.8995 2.5 16.5815 2.5 16.25V12.5" stroke="rgba(250, 250, 250, 0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5.83331 8.33333L9.99998 12.5L14.1666 8.33333" stroke="rgba(250, 250, 250, 0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M10 12.5V2.5" stroke="rgba(250, 250, 250, 0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Upload Resume</span>
                      </div>
                    </label>
                  </div>
                  <div className="job-detail-form-actions">
                    <button type="submit" className="job-detail-submit-button">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default JobDetail
