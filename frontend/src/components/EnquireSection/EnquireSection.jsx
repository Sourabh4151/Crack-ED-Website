import React, { useState } from 'react'
import './EnquireSection.css'
import { submitLeadToCRMDirect, submitLeadToCRM } from '../../services/crmService'

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
]

const PROGRAMS = [
  'AURUM Bankers Program - Relationship Manager',
  'AURUM Bankers Program - Bank Officer',
  'AURUM Bankers Program - Relationship Officer',
  'AURUM Bankers Program - Sales Officer',
  'AURUM Bankers Program - Money Officer',
  'AURUM Bankers Program - Transaction Officer',
  'AURUM Bankers Program - Customer Service Officer',
  'AURUM Bankers Program - Deputy Center Manager',
  'AURUM Bankers Program - Deputy Late Recovery Officer',
  'AURUM Bankers Program - Customer Service Officer Valuation',
  'Udaan Program - Cashier / Teller',
  'Lenskart EyeTech Program - Clinical Technician',
  'Lenskart EyeTech Program - Retail Sales Associate',
  'Piramal ProEdge Program - Relationship Manager',
  'Paytm Disha Program - Field Sales Executive',
]

const EnquireSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    emailId: '',
    state: '',
    program: ''
  })
  const [errors, setErrors] = useState({})
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
    if (!formData.program) e.program = 'Program selection is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let v = value
    if (name === 'mobileNumber') v = value.replace(/\D/g, '').slice(0, 10)
    setFormData((prev) => ({ ...prev, [name]: v }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)
    try {
      try {
        await submitLeadToCRM(formData)
      } catch (backendErr) {
        console.warn('Could not save lead to backend:', backendErr)
      }
      await submitLeadToCRMDirect(formData)
      setSubmitSuccess(true)
      setFormData({ fullName: '', mobileNumber: '', emailId: '', state: '', program: '' })
    } catch (err) {
      setSubmitError('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="enquire-section">
      <div className="enquire-section-inner">
        <h2 className="enquire-section-title">Enquire Now</h2>
        <p className="enquire-section-subtitle">
          Join thousands of learners building better futures with our expert-designed programs!
        </p>
        <form className="enquire-section-form" onSubmit={handleSubmit}>
          <div className="enquire-section-form-grid">
            <div className="enquire-section-field">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className={`enquire-section-input ${errors.fullName ? 'enquire-section-input-error' : ''}`}
              />
              {errors.fullName && <span className="enquire-section-field-error">{errors.fullName}</span>}
            </div>
            <div className="enquire-section-field">
              <input
                type="tel"
                name="mobileNumber"
                placeholder="Mobile number"
                value={formData.mobileNumber}
                onChange={handleChange}
                maxLength={10}
                className={`enquire-section-input ${errors.mobileNumber ? 'enquire-section-input-error' : ''}`}
              />
              {errors.mobileNumber && <span className="enquire-section-field-error">{errors.mobileNumber}</span>}
            </div>
            <div className="enquire-section-field">
              <input
                type="email"
                name="emailId"
                placeholder="Email ID"
                value={formData.emailId}
                onChange={handleChange}
                className={`enquire-section-input ${errors.emailId ? 'enquire-section-input-error' : ''}`}
              />
              {errors.emailId && <span className="enquire-section-field-error">{errors.emailId}</span>}
            </div>
            <div className="enquire-section-field enquire-section-select-wrap">
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`enquire-section-select ${errors.state ? 'enquire-section-input-error' : ''}`}
              >
                <option value="">State</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <svg className="enquire-section-select-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {errors.state && <span className="enquire-section-field-error">{errors.state}</span>}
            </div>
            <div className="enquire-section-field enquire-section-field-full enquire-section-select-wrap">
              <select
                name="program"
                value={formData.program}
                onChange={handleChange}
                className={`enquire-section-select ${errors.program ? 'enquire-section-input-error' : ''}`}
              >
                <option value="">Select program</option>
                {PROGRAMS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <svg className="enquire-section-select-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {errors.program && <span className="enquire-section-field-error">{errors.program}</span>}
            </div>
          </div>
          {submitError && <div className="enquire-section-error">{submitError}</div>}
          {submitSuccess && <div className="enquire-section-success">Thank you! Your enquiry has been submitted successfully.</div>}
          <div className="enquire-section-actions">
            <button type="submit" className="enquire-section-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default EnquireSection
