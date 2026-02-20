import React, { useState, useEffect } from 'react'
import './EnquireModal.css'
import { submitLeadToCRM, isBackendUnreachable, BACKEND_DOWN_MESSAGE } from '../../services/crmService'

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

  const [errors, setErrors] = useState({
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
    'AURUM Bankers Program - Relationship Manager',
    'AURUM Bankers Program - Relationship Officer',
    'AURUM Bankers Program - Bank Officer',
    'AURUM Bankers Program - Sales Officer',
    'AURUM Bankers Program - Transaction Officer',
    'AURUM Bankers Program - Deputy Center Manager',
    'AURUM Bankers Program - Customer Service Officer',
    'AURUM Bankers Program - Deputy Late Recovery Officer',
    'AURUM Bankers Program - Money Officer',
    'AURUM Bankers Program - Customer Service Officer Valuation',
    'Udaan Program - Cashier / Teller',
    'Udaan Program - Virtual Relationship Manager',
    'Udaan Program - Relationship Manager',
    'Udaan Program - Business Loan Associate',
    'Lenskart EyeTech Program - Clinical Technician',
    'Lenskart EyeTech Program - Retail Sales Associate',
    'Piramal ProEdge Program - Relationship Manager',
    'Paytm Disha Program - Field Sales Executive',
  ]

  const validateFullName = (name) => {
    if (!name.trim()) {
      return 'Full name is required'
    }
    if (name.trim().length < 2) {
      return 'Full name must be at least 2 characters'
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      return 'Full name should only contain letters and spaces'
    }
    return ''
  }

  const validateMobileNumber = (mobile) => {
    if (!mobile) {
      return 'Mobile number is required'
    }
    if (!/^\d+$/.test(mobile)) {
      return 'Mobile number should only contain digits'
    }
    if (mobile.length !== 10) {
      return 'Mobile number must be exactly 10 digits'
    }
    return ''
  }

  const validateEmail = (email) => {
    if (!email) {
      return 'Email is required'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address'
    }
    return ''
  }

  const validateState = (state) => {
    if (!state) {
      return 'State is required'
    }
    return ''
  }

  const validateProgram = (program) => {
    if (!program) {
      return 'Program selection is required'
    }
    return ''
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let processedValue = value

    // Special handling for mobile number - only allow digits and limit to 10
    if (name === 'mobileNumber') {
      // Remove any non-digit characters
      processedValue = value.replace(/\D/g, '')
      // Limit to 10 digits
      if (processedValue.length > 10) {
        processedValue = processedValue.slice(0, 10)
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }))

    // Clear error for this field when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }))
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    let error = ''

    switch (name) {
      case 'fullName':
        error = validateFullName(value)
        break
      case 'mobileNumber':
        error = validateMobileNumber(value)
        break
      case 'emailId':
        error = validateEmail(value)
        break
      case 'state':
        error = validateState(value)
        break
      case 'program':
        error = validateProgram(value)
        break
      default:
        break
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }

  const validateForm = () => {
    const newErrors = {
      fullName: validateFullName(formData.fullName),
      mobileNumber: validateMobileNumber(formData.mobileNumber),
      emailId: validateEmail(formData.emailId),
      state: validateState(formData.state),
      program: validateProgram(formData.program)
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error !== '')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      await submitLeadToCRM(formData)
      setSubmitSuccess(true)
      setFormData({
        fullName: '',
        mobileNumber: '',
        emailId: '',
        state: '',
        program: ''
      })
      setErrors({
        fullName: '',
        mobileNumber: '',
        emailId: '',
        state: '',
        program: ''
      })
      setTimeout(() => {
        onClose()
        setSubmitSuccess(false)
      }, 1500)
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitError(isBackendUnreachable(error) ? BACKEND_DOWN_MESSAGE : 'Failed to submit. Please try again.')
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
      setErrors({
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
                onBlur={handleBlur}
                className={`enquire-modal-input ${errors.fullName ? 'enquire-modal-input-error' : ''}`}
                required
              />
              {errors.fullName && (
                <span className="enquire-modal-field-error">{errors.fullName}</span>
              )}
            </div>
            <div className="enquire-modal-form-field">
              <input
                type="tel"
                name="mobileNumber"
                placeholder="Mobile number"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                maxLength="10"
                className={`enquire-modal-input ${errors.mobileNumber ? 'enquire-modal-input-error' : ''}`}
                required
              />
              {errors.mobileNumber && (
                <span className="enquire-modal-field-error">{errors.mobileNumber}</span>
              )}
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
                onBlur={handleBlur}
                className={`enquire-modal-input ${errors.emailId ? 'enquire-modal-input-error' : ''}`}
                required
              />
              {errors.emailId && (
                <span className="enquire-modal-field-error">{errors.emailId}</span>
              )}
            </div>
            <div className="enquire-modal-form-field enquire-modal-select-wrapper">
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`enquire-modal-select ${errors.state ? 'enquire-modal-input-error' : ''}`}
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
              {errors.state && (
                <span className="enquire-modal-field-error">{errors.state}</span>
              )}
            </div>
          </div>
          
          <div className="enquire-modal-form-row">
            <div className="enquire-modal-form-field enquire-modal-select-wrapper">
              <select
                name="program"
                value={formData.program}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`enquire-modal-select ${errors.program ? 'enquire-modal-input-error' : ''}`}
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
              {errors.program && (
                <span className="enquire-modal-field-error">{errors.program}</span>
              )}
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
