import React, { useState, useEffect } from 'react'
import './EnquireModal.css'
import { submitLeadToCRMDirect } from '../../services/crmService'

const EnquireModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    emailId: '',
    state: '',
    program: ''
  })

  const states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'
  ]

  const programs = [
    'AURUM Bankers Relationship Manager',
    'AURUM Bankers Relationship Officer',
    'AURUM Bankers Bank Officer',
    'AURUM Bankers Sales Officer',
    'AURUM Bankers Transaction Officer',
    'AURUM Bankers Deputy Center Manager',
    'AURUM Bankers Customer Service Officer',
    'AURUM Bankers Late Recovery Officer',
    'AURUM Bankers Money Officer',
    'AURUM Bankers Customer Service Officer Valuation',
    'Lenskart Dispensing Optician Program',
    'Lenskart Retail Sales Officer Program'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      // Call CRM API directly
      await submitLeadToCRMDirect(formData)
      
      setSubmitSuccess(true)
      
      // Reset form
      setFormData({
        fullName: '',
        mobileNumber: '',
        emailId: '',
        state: '',
        program: ''
      })
      
      // Close modal after 1.5 seconds
      setTimeout(() => {
        onClose()
        setSubmitSuccess(false)
      }, 1500)
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitError('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose()
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        fullName: '',
        mobileNumber: '',
        emailId: '',
        state: '',
        program: ''
      })
      setSubmitError(null)
      setSubmitSuccess(false)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="enquire-modal-overlay" onClick={handleOverlayClick}>
      <div className="enquire-modal-container">
        <div className="enquire-modal-header">
          <div className="enquire-modal-title-section">
            <h2 className="enquire-modal-title">Enquire Now</h2>
            <p className="enquire-modal-subtitle">Have questions? We're here to help.</p>
          </div>
          <button className="enquire-modal-close" onClick={handleClose} disabled={isSubmitting}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <form className="enquire-modal-form" onSubmit={handleSubmit}>
          <div className="enquire-modal-form-row">
            <div className="enquire-modal-form-field">
              <input
                type="text"
                name="fullName"
                placeholder="Full name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="enquire-modal-input"
                required
              />
            </div>
            <div className="enquire-modal-form-field">
              <input
                type="tel"
                name="mobileNumber"
                placeholder="Mobile number"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="enquire-modal-input"
                required
              />
            </div>
          </div>
          
          <div className="enquire-modal-form-row">
            <div className="enquire-modal-form-field">
              <input
                type="email"
                name="emailId"
                placeholder="Email ID"
                value={formData.emailId}
                onChange={handleInputChange}
                className="enquire-modal-input"
                required
              />
            </div>
            <div className="enquire-modal-form-field enquire-modal-select-wrapper">
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="enquire-modal-select"
                required
              >
                <option value="">State</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>{state}</option>
                ))}
              </select>
              <svg className="enquire-modal-select-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          <div className="enquire-modal-form-row">
            <div className="enquire-modal-form-field enquire-modal-select-wrapper">
              <select
                name="program"
                value={formData.program}
                onChange={handleInputChange}
                className="enquire-modal-select"
                required
              >
                <option value="">Select program</option>
                {programs.map((program, index) => (
                  <option key={index} value={program}>{program}</option>
                ))}
              </select>
              <svg className="enquire-modal-select-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          {submitError && (
            <div className="enquire-modal-error">
              {submitError}
            </div>
          )}
          
          {submitSuccess && (
            <div className="enquire-modal-success">
              Thank you! Your enquiry has been submitted successfully.
            </div>
          )}
          
          <div className="enquire-modal-form-actions">
            <button 
              type="submit" 
              className="enquire-modal-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EnquireModal
