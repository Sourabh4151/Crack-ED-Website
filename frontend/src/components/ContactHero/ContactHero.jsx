import React, { useState, useMemo } from 'react'
import contactHeroImage from '../../assets/Contact.webp'
import contactTickIcon from '../../assets/contact_tick.svg'
import { submitLeadToCRM, isBackendUnreachable, BACKEND_DOWN_MESSAGE } from '../../services/crmService'
import { trackGenerateLead } from '../../utils/analytics'
import { INDIAN_STATES, getCitiesForState } from '../../lib/indianStateCities'
import CitySelect from '../CitySelect/CitySelect'
import { LEAD_PROGRAMS } from '../../data/leadPrograms'
import './ContactHero.css'

const BENEFITS = [
  'Explore career opportunities',
  'Understand program details',
  'Get guidance from experts',
  'Start your journey with confidence',
]

const ContactHero = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    emailId: '',
    state: '',
    city: '',
    program: '',
    query: '',
  })
  const [errors, setErrors] = useState({})

  const citiesForState = useMemo(
    () => getCitiesForState(formData.state),
    [formData.state]
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validate = () => {
    const e = {}
    if (!formData.fullName.trim()) e.fullName = 'Full name is required'
    else if (formData.fullName.trim().length < 2) e.fullName = 'Full name must be at least 2 characters'
    if (!formData.mobileNumber) e.mobileNumber = 'Mobile number is required'
    else if (!/^\d{10}$/.test(formData.mobileNumber)) e.mobileNumber = 'Mobile number must be 10 digits'
    if (!formData.emailId) e.emailId = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) e.emailId = 'Please enter a valid email'
    if (!formData.state) e.state = 'State is required'
    else if (!formData.city) e.city = 'City is required'
    if (!formData.program) e.program = 'Program selection is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let v = value
    if (name === 'mobileNumber') v = value.replace(/\D/g, '').slice(0, 10)
    setFormData((prev) => {
      const next = { ...prev, [name]: v }
      if (name === 'state') next.city = ''
      return next
    })
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)
    try {
      await submitLeadToCRM(formData)
      trackGenerateLead()
      setSubmitSuccess(true)
      setFormData({
        fullName: '',
        mobileNumber: '',
        emailId: '',
        state: '',
        city: '',
        program: '',
        query: '',
      })
    } catch (err) {
      setSubmitError(isBackendUnreachable(err) ? BACKEND_DOWN_MESSAGE : 'Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact-hero">
      <div className="contact-hero-overlay contact-hero-overlay--desktop" aria-hidden="true" />
      <div className="contact-hero-background contact-hero-background--desktop" aria-hidden="true">
        <img src={contactHeroImage} alt="" className="contact-hero-bg-image" />
      </div>

      <div className="contact-hero-content">
        <div className="contact-hero-grid">
          <div className="contact-hero-copy">
            <div className="contact-hero-copy-media" aria-hidden="true">
              <img src={contactHeroImage} alt="" className="contact-hero-copy-bg-image" />
              <div className="contact-hero-copy-overlay" />
            </div>
            <div className="contact-hero-copy-inner">
              <h1 className="contact-hero-headline">Take the First Step Towards Your Career</h1>
              <p className="contact-hero-subheadline">
                Whether you have questions about programs, admissions, placements, or career opportunities,
                our team is here to guide you.
              </p>
              <ul className="contact-hero-benefits">
                {BENEFITS.map((item) => (
                  <li key={item} className="contact-hero-benefit">
                    <img src={contactTickIcon} alt="" className="contact-hero-benefit-icon" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="contact-hero-form-card">
            <h2 className="contact-hero-form-title">Talk to Our Team</h2>
            <form className="contact-hero-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-hero-form-fields">
                <div className="contact-hero-form-row">
                  <div className="contact-hero-field">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      aria-label="Full Name"
                      className={`contact-hero-input ${errors.fullName ? 'contact-hero-input-error' : ''}`}
                    />
                    {errors.fullName && <span className="contact-hero-field-error">{errors.fullName}</span>}
                  </div>
                  <div className="contact-hero-field">
                    <input
                      type="tel"
                      name="mobileNumber"
                      placeholder="Mobile number"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      maxLength={10}
                      aria-label="Mobile number"
                      className={`contact-hero-input ${errors.mobileNumber ? 'contact-hero-input-error' : ''}`}
                    />
                    {errors.mobileNumber && <span className="contact-hero-field-error">{errors.mobileNumber}</span>}
                  </div>
                </div>

                <div className="contact-hero-form-row">
                  <div className="contact-hero-field">
                    <input
                      type="email"
                      name="emailId"
                      placeholder="Email ID"
                      value={formData.emailId}
                      onChange={handleChange}
                      aria-label="Email ID"
                      className={`contact-hero-input ${errors.emailId ? 'contact-hero-input-error' : ''}`}
                    />
                    {errors.emailId && <span className="contact-hero-field-error">{errors.emailId}</span>}
                  </div>
                  <div className="contact-hero-field">
                    <div className="contact-hero-select-control">
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        aria-label="Select state"
                        className={`contact-hero-select ${errors.state ? 'contact-hero-input-error' : ''}`}
                      >
                        <option value="">State</option>
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <svg className="contact-hero-select-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {errors.state && <span className="contact-hero-field-error">{errors.state}</span>}
                  </div>
                </div>

                <div className="contact-hero-form-row">
                  <CitySelect
                    value={formData.city}
                    onChange={handleChange}
                    state={formData.state}
                    cities={citiesForState}
                    selectClassName={`contact-hero-select ${errors.city ? 'contact-hero-input-error' : ''}`}
                    fieldClassName="contact-hero-field"
                    controlClassName="contact-hero-select-control"
                    arrowClassName="contact-hero-select-arrow"
                    error={errors.city}
                    errorClassName="contact-hero-field-error"
                  />
                  <div className="contact-hero-field">
                    <div className="contact-hero-select-control">
                      <select
                        name="program"
                        value={formData.program}
                        onChange={handleChange}
                        aria-label="Select program"
                        className={`contact-hero-select ${errors.program ? 'contact-hero-input-error' : ''}`}
                      >
                        <option value="">Select program</option>
                        {LEAD_PROGRAMS.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                      <svg className="contact-hero-select-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {errors.program && <span className="contact-hero-field-error">{errors.program}</span>}
                  </div>
                </div>

                <div className="contact-hero-field contact-hero-field-full">
                  <textarea
                    name="query"
                    placeholder="Tell us what you're looking for"
                    value={formData.query}
                    onChange={handleChange}
                    aria-label="Tell us what you're looking for"
                    className="contact-hero-input contact-hero-textarea"
                    rows={4}
                  />
                </div>
              </div>

              {submitError && <div className="contact-hero-form-message contact-hero-form-message--error">{submitError}</div>}
              {submitSuccess && (
                <div className="contact-hero-form-message contact-hero-form-message--success">
                  Thank you! Our team will call you back shortly.
                </div>
              )}

              <div className="contact-hero-form-actions">
                <button type="submit" className="contact-hero-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Request a Callback'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactHero
