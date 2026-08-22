import React from 'react'
import Header from '../components/Header/Header'
import ContactHero from '../components/ContactHero/ContactHero'
import Footer from '../components/Footer/Footer'
import './ContactUs.css'
import SEO from '../components/SEO/SEO'
import { PAGE_SEO } from '../seo/site'

const ContactUs = () => {
  return (
    <div className="contact-page">
      <SEO
        title={PAGE_SEO.contact.title}
        description={PAGE_SEO.contact.description}
        path={PAGE_SEO.contact.path}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact Us', path: '/contact-us' },
        ]}
      />
      <Header />
      <div className="contact-scroll-wrapper">
        <ContactHero />
        <Footer />
      </div>
    </div>
  )
}

export default ContactUs
