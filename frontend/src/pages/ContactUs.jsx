import React, { useEffect } from 'react'
import Header from '../components/Header/Header'
import ContactHero from '../components/ContactHero/ContactHero'
import Footer from '../components/Footer/Footer'
import './ContactUs.css'

const ContactUs = () => {
  useEffect(() => {
    document.title = 'Contact Us | CRACK-ED'
    return () => {
      document.title = 'CRACK-ED'
    }
  }, [])

  return (
    <div className="contact-page">
      <Header />
      <div className="contact-scroll-wrapper">
        <ContactHero />
        <Footer />
      </div>
    </div>
  )
}

export default ContactUs
