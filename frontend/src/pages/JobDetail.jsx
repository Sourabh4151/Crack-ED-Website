import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { getApiBase, getUtmParams, isBackendUnreachable, BACKEND_DOWN_MESSAGE } from '../services/crmService'
import './JobDetail.css'

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
  const [errors, setErrors] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    resume: ''
  })
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let nextValue = value

    // Restrict mobile number to digits only and max 10 characters
    if (name === 'mobileNumber') {
      nextValue = value.replace(/\D/g, '').slice(0, 10)
    }

    setFormData(prev => ({
      ...prev,
      [name]: nextValue
    }))

    // clear field-specific error and global messages as user edits
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }))
    setSubmitError('')
    setSubmitSuccess('')
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null
    setFormData(prev => ({
      ...prev,
      resume: file
    }))
    setErrors(prev => ({
      ...prev,
      resume: ''
    }))
    setSubmitError('')
    setSubmitSuccess('')
  }

  const validateFullName = (name) => {
    const trimmed = name.trim()
    if (!trimmed) return 'Full name is required.'
    if (trimmed.length < 3) return 'Full name must be at least 3 characters.'
    if (!/^[a-zA-Z\s.]+$/.test(trimmed)) {
      return 'Full name should contain only letters and spaces.'
    }
    return ''
  }

  const validateMobileNumber = (digits) => {
    if (!digits) return 'Mobile number is required.'
    if (!/^\d+$/.test(digits)) return 'Mobile number should contain only digits.'
    if (digits.length !== 10) return 'Mobile number must be exactly 10 digits.'
    return ''
  }

  const validateEmail = (email) => {
    const trimmed = email.trim()
    if (!trimmed) return 'Email is required.'
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(trimmed)) return 'Please enter a valid email address.'
    return ''
  }

  const validateResume = (file) => {
    if (!file) return 'Resume is required.'
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    if (file.type && !allowedTypes.includes(file.type)) {
      return 'Only PDF or Word documents are allowed for resume.'
    }
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const fullName = formData.fullName.trim()
    const mobileDigits = String(formData.mobileNumber).replace(/\D/g, '')
    const email = formData.email.trim()
    const resumeFile = formData.resume

    // Field-level validation (inline error messages)
    const newErrors = {
      fullName: validateFullName(fullName),
      mobileNumber: validateMobileNumber(mobileDigits),
      email: validateEmail(email),
      resume: validateResume(resumeFile)
    }

    setErrors(newErrors)
    setSubmitError('')
    setSubmitSuccess('')

    if (Object.values(newErrors).some(msg => msg)) {
      setSubmitError('Please correct the highlighted fields.')
      return
    }

    setIsSubmitting(true)
    try {
      const apiBase = getApiBase()
      const body = new FormData()
      body.append('fullName', fullName)
      body.append('mobileNumber', mobileDigits.slice(0, 10))
      body.append('email', email)
      body.append('jobId', id || '')
      body.append('jobTitle', job?.title || '')
      body.append('sourcePage', typeof window !== 'undefined' ? (window.location.pathname || '') : '')
      const utmParams = getUtmParams()
      if (Object.keys(utmParams).length > 0) {
        body.append('utmParams', JSON.stringify(utmParams))
      }
      body.append('resume', resumeFile)
      const res = await fetch(`${apiBase}/api/job-apply/`, {
        method: 'POST',
        body,
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setSubmitError(data?.error || 'Submission failed. Please try again.')
        setSubmitSuccess('')
        return
      }
      setSubmitSuccess('Application submitted successfully!')
      setSubmitError('')
      setFormData({ fullName: '', mobileNumber: '', email: '', resume: null })
      const fileInput = document.getElementById('job-apply-resume')
      if (fileInput) fileInput.value = ''
    } catch (err) {
      console.error('Job apply error:', err)
      setSubmitError(isBackendUnreachable(err) ? BACKEND_DOWN_MESSAGE : 'Something went wrong. Please try again.')
      setSubmitSuccess('')
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
                <form onSubmit={handleSubmit} className="job-detail-apply-form" noValidate>
                  <h2 className="job-detail-apply-form-title">Apply For This Role</h2>
                  <div className="job-detail-form-separator"></div>
                  <div className="job-detail-form-field">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`job-detail-form-input ${errors.fullName ? 'job-detail-input-error' : ''}`}
                      required
                    />
                    {errors.fullName && (
                      <span className="job-detail-field-error">{errors.fullName}</span>
                    )}
                  </div>
                  <div className="job-detail-form-field">
                    <input
                      type="tel"
                      name="mobileNumber"
                      placeholder="Mobile number"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className={`job-detail-form-input ${errors.mobileNumber ? 'job-detail-input-error' : ''}`}
                      inputMode="numeric"
                      maxLength={10}
                      required
                    />
                    {errors.mobileNumber && (
                      <span className="job-detail-field-error">{errors.mobileNumber}</span>
                    )}
                  </div>
                  <div className="job-detail-form-field">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email ID"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`job-detail-form-input ${errors.email ? 'job-detail-input-error' : ''}`}
                      required
                    />
                    {errors.email && (
                      <span className="job-detail-field-error">{errors.email}</span>
                    )}
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
                    {errors.resume && (
                      <span className="job-detail-field-error">{errors.resume}</span>
                    )}
                  </div>
                  {submitError && (
                    <div className="job-detail-form-message job-detail-form-message-error">
                      {submitError}
                    </div>
                  )}
                  {submitSuccess && (
                    <div className="job-detail-form-message job-detail-form-message-success">
                      {submitSuccess}
                    </div>
                  )}
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
