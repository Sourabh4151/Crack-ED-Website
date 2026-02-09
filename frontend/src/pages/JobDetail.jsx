import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { getApiBase } from '../services/crmService'
import './JobDetail.css'
import 'react-toastify/dist/ReactToastify.css'

const JobDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [jobLoading, setJobLoading] = useState(true)
  const [jobError, setJobError] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    if (!id) {
      setJobLoading(false)
      return
    }
    let cancelled = false
    setJobLoading(true)
    setJobError(null)
    const apiBase = getApiBase()
    fetch(`${apiBase}/api/jobs/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 404 ? 'Job not found' : 'Failed to load')
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setJob(data)
      })
      .catch((err) => {
        if (!cancelled) setJobError(err.message)
      })
      .finally(() => {
        if (!cancelled) setJobLoading(false)
      })
    return () => { cancelled = true }
  }, [id])

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    resume: null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.resume) {
      toast.error('Please upload your resume. Resume is required.')
      return
    }
    setIsSubmitting(true)
    try {
      const apiBase = getApiBase()
      const body = new FormData()
      body.append('fullName', formData.fullName.trim())
      body.append('mobileNumber', String(formData.mobileNumber).replace(/\D/g, '').slice(0, 15))
      body.append('email', formData.email.trim())
      body.append('jobId', id || '')
      body.append('jobTitle', job?.title || '')
      body.append('sourcePage', typeof window !== 'undefined' ? (window.location.pathname || '') : '')
      body.append('resume', formData.resume)
      const res = await fetch(`${apiBase}/api/job-apply/`, {
        method: 'POST',
        body,
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(data?.error || 'Submission failed. Please try again.')
        return
      }
      toast.success('Application submitted successfully!')
      setFormData({ fullName: '', mobileNumber: '', email: '', resume: null })
      const fileInput = document.getElementById('job-apply-resume')
      if (fileInput) fileInput.value = ''
    } catch (err) {
      console.error('Job apply error:', err)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (jobLoading) {
    return (
      <div className="job-detail-page">
        <Header />
        <section className="job-detail-section">
          <div className="job-detail-container" style={{ padding: '2rem', textAlign: 'center' }}>
            <p>Loading job...</p>
          </div>
        </section>
        <Footer />
      </div>
    )
  }
  if (jobError || !job) {
    return (
      <div className="job-detail-page">
        <Header />
        <section className="job-detail-section">
          <div className="job-detail-container" style={{ padding: '2rem', textAlign: 'center' }}>
            <p>{jobError || 'Job not found.'}</p>
            <button type="button" className="job-detail-back-link" onClick={() => navigate('/careers')} style={{ marginTop: '1rem' }}>
              Back to listings
            </button>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  const description = job.description || {}
  const responsibilities = Array.isArray(description.responsibilities) ? description.responsibilities : []

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
                <span className="job-detail-meta-item">{job.positions || 1} POSITIONS</span>
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
                <p className="job-detail-section-text">{description.aboutUs || ''}</p>
              </div>

              <div className="job-detail-section-block">
                <h2 className="job-detail-section-heading">Role Overview:</h2>
                <p className="job-detail-section-text">{description.roleOverview || ''}</p>
              </div>

              <div className="job-detail-section-block">
                <h2 className="job-detail-section-heading">Key Responsibilities:</h2>
                {responsibilities.map((responsibility, index) => (
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
                        id="job-apply-resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="job-detail-file-input"
                        required
                      />
                      <div className="job-detail-upload-box">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.5 12.5V16.25C17.5 16.5815 17.3683 16.8995 17.1339 17.1339C16.8995 17.3683 16.5815 17.5 16.25 17.5H3.75C3.41848 17.5 3.10054 17.3683 2.86612 17.1339C2.6317 16.8995 2.5 16.5815 2.5 16.25V12.5" stroke="rgba(250, 250, 250, 0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5.83331 8.33333L9.99998 12.5L14.1666 8.33333" stroke="rgba(250, 250, 250, 0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M10 12.5V2.5" stroke="rgba(250, 250, 250, 0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="job-detail-upload-text">
                          {formData.resume ? (
                            <span className="job-detail-upload-filename" style={{ color: 'var(--color-accent, #00d4aa)' }}>✓ {formData.resume.name}</span>
                          ) : (
                            <>Upload Resume <span style={{ color: 'var(--color-accent, #00d4aa)' }}>*</span></>
                          )}
                        </span>
                      </div>
                    </label>
                  </div>
                  <div className="job-detail-form-actions">
                    <button type="submit" className="job-detail-submit-button" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
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
