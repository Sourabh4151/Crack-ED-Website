import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './PrivacyPolicy.css'

const PrivacyPolicy = () => {
  return (
    <div className="privacy-page">
      <Header />
      <main className="privacy-main">
        <section className="privacy-card">
          <h1 className="privacy-title">Privacy Policy</h1>

          <p className="privacy-text">
            At Crack-Ed.com, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and
            protect your personal information when you visit our website or use our services.
          </p>

          <h2 className="privacy-subtitle">Information We Collect</h2>
          <p className="privacy-text">
            When you visit Crack-Ed.com, we may collect personal information that you voluntarily provide, such as your
            name, email address, phone number, and any other information you choose to share with us. We may also
            collect non-personal information, such as your IP address, browser type, and device information, for
            analytics and website optimization purposes.
          </p>

          <h2 className="privacy-subtitle">How We Use Your Information</h2>
          <p className="privacy-text">
            We use your information to:
          </p>
          <ul className="privacy-list">
            <li>Provide and improve our services, products, and customer support.</li>
            <li>Communicate with you regarding your inquiries, orders, and account information.</li>
            <li>Personalize your experience on our website and tailor our offerings to your preferences.</li>
            <li>Send promotional emails, newsletters, and updates about our products and services, unless you opt out.</li>
          </ul>

          <h2 className="privacy-subtitle">Data Security</h2>
          <p className="privacy-text">
            We implement industry-standard security measures to protect your personal information from unauthorized
            access, disclosure, alteration, or destruction. However, please note that no method of transmission over the
            internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="privacy-subtitle">Third-Party Disclosure</h2>
          <p className="privacy-text">
            We do not sell, trade, or otherwise transfer your personal information to third parties without your
            consent, except as required by law or as necessary to fulfill our services (e.g., processing payments,
            shipping orders).
          </p>

          <h2 className="privacy-subtitle">Cookies</h2>
          <p className="privacy-text">
            Crack-Ed.com uses cookies and similar technologies to enhance your browsing experience, analyze website
            traffic, and track user interactions. You can adjust your browser settings to disable cookies or receive
            alerts when cookies are being used. Please note that disabling cookies may affect the functionality of
            certain features on our websites.
          </p>

          <h2 className="privacy-subtitle">Contact Us</h2>
          <p className="privacy-text">
            If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information,
            please contact us at{' '}
            <a className="privacy-email" href="mailto:crack-ed@girnarsoft.com">
              crack-ed@girnarsoft.com
            </a>
            .
          </p>

          <h2 className="privacy-subtitle">Changes to Privacy Policy</h2>
          <p className="privacy-text">
            We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this
            page, and your continued use of Crack-Ed.com signifies your acceptance of the updated Privacy Policy.
          </p>

          <p className="privacy-updated">Last updated: 9th April 2024</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default PrivacyPolicy

