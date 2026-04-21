import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './RefundPolicy.css'

const RefundPolicy = () => {
  return (
    <div className="refund-page">
      <Header />
      <main className="refund-main">
        <section className="refund-card">
          <h1 className="refund-title">Refunds, Returns &amp; Cancellations</h1>

          <p className="refund-text">
            At Crack-ED, we offer offline courses that ensure job readiness for specific roles. We expect the candidates
            to thoroughly review the curriculum and offerings before making any payments related to this role.
          </p>

          <h2 className="refund-subtitle">Refunds</h2>
          <p className="refund-text">
            All payments made to pursue any course at Crack-ED are non refundable. We encourage users to review our
            offerings and terms thoroughly before making a purchase.
          </p>

          <h2 className="refund-subtitle">Cancellations</h2>
          <p className="refund-text">
            A candidate is deemed to have shown interest in the program after paying the registration fee. If a
            candidate wants to back out due to whatever reasons (being away/withdraw from the course following which
            his/her seat will become open), NO refund of the registration fee or the course fee that has been made
            will be entertained.{' '}
            <span className="refund-nowrap">
              Reach out to{' '}
              <a className="refund-email" href="mailto:crack-ed@girnarsoft.com">
                crack-ed@girnarsoft.com
              </a>{' '}
              for any clarification.
            </span>
          </p>

          <h2 className="refund-subtitle">Returns</h2>
          <p className="refund-text">
            Crack-ED does not offer returns as our services are educational in nature and do not deal in physical
            products. We advise users to carefully review the service details and terms before making a purchase. For
            any concerns, please contact us at{' '}
            <a className="refund-email" href="mailto:crack-ed@girnarsoft.com">
              crack-ed@girnarsoft.com
            </a>
            .
          </p>

          <h2 className="refund-subtitle">Need Help?</h2>
          <p className="refund-text">
            For any questions or additional clarification regarding our Refunds &amp; Cancellation Policy, feel free to
            contact us at{' '}
            <a className="refund-email" href="mailto:crack-ed@girnarsoft.com">
              crack-ed@girnarsoft.com
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default RefundPolicy

