import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './TermsConditions.css'

const TermsConditions = () => {
  return (
    <div className="terms-page">
      <Header />
      <main className="terms-main">
        <section className="terms-card">
          <h1 className="terms-title">Terms &amp; Conditions</h1>

          <p className="terms-text">
            These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of the Crack-Ed.com website and services.
            By accessing or using our website, you agree to abide by these Terms. If you do not agree with any part of
            these Terms, please refrain from using our website.
          </p>

          <h2 className="terms-subtitle">User Responsibilities</h2>
          <ul className="terms-list">
            <li>
              You are responsible for maintaining the confidentiality of your account information and for all activities
              that occur under your account.
            </li>
            <li>
              You agree not to use our website for any unlawful or prohibited purposes, including but not limited to
              hacking, spamming, or distributing malicious software.
            </li>
          </ul>

          <h2 className="terms-subtitle">Intellectual Property</h2>
          <ul className="terms-list">
            <li>
              All content, logos, trademarks, and materials on Crack-Ed.com are the property of Crack-Ed or its licensors
              and are protected by copyright and intellectual property laws.
            </li>
            <li>
              You may not reproduce, modify, distribute, or exploit any content from our website without prior written
              consent from Crack-Ed.
            </li>
          </ul>

          <h2 className="terms-subtitle">Payment and Refunds</h2>
          <ul className="terms-list">
            <li>
              Payment for services or products offered on Crack-Ed.com is due at the time of purchase unless otherwise
              specified.
            </li>
            <li>Refunds are issued according to our Refund Policy, which is available on our website.</li>
          </ul>

          <h2 className="terms-subtitle">Disclaimer of Warranties</h2>
          <ul className="terms-list">
            <li>
              Crack-Ed.com is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of
              any kind, either express or implied.
            </li>
            <li>
              We do not guarantee that our website will be uninterrupted, error-free, or free from viruses or harmful
              components.
            </li>
          </ul>

          <h2 className="terms-subtitle">Limitation of Liability</h2>
          <ul className="terms-list">
            <li>
              In no event shall Crack-Ed or its affiliates be liable for any indirect, incidental, special, or
              consequential damages arising out of or in connection with your use of our website or services.
            </li>
          </ul>

          <h2 className="terms-subtitle">Governing Law</h2>
          <ul className="terms-list">
            <li>
              These Terms shall be governed by and construed in accordance with the laws of [your Jurisdiction], without
              regard to its conflict of law provisions.
            </li>
          </ul>

          <h2 className="terms-subtitle">Changes to Terms</h2>
          <ul className="terms-list">
            <li>
              We reserve the right to update or modify these Terms at any time without prior notice. Any changes will be
              effective immediately upon posting on our website.
            </li>
          </ul>

          <h2 className="terms-subtitle">Contact Us</h2>
          <p className="terms-text">
            If you have any questions or concerns regarding these Terms or our services, please contact us at{' '}
            <a className="terms-email" href="mailto:crack-ed@girnarsoft.com">
              crack-ed@girnarsoft.com
            </a>
            .
          </p>

          <p className="terms-updated">Last updated: 9th April 2024</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default TermsConditions

