import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/crack-ed_logo.png'
import './Footer.css'

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand and Copyright Section */}
          <div className="footer-brand">
            <Link to="/">
              <img src={logo} alt="CRACK-ED" className="footer-logo" />
            </Link>
            <p className="footer-copyright">© 2026 CRACK-ED. All rights reserved.</p>
          </div>

          {/* Grouped Sections: Quick Links, Job-Linked Programs, and Contact */}
          <div className="footer-sections-group">
            {/* Quick Links Section */}
            <div className="footer-column footer-quick-links">
              <h3 className="footer-heading">QUICK LINKS</h3>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><a href="https://crack-ed.com/about-us/" target="_blank" rel="noopener noreferrer">About Us</a></li>
                <li><Link to="/programs">Programs</Link></li>
                <li><a href="#resources" onClick={(e) => { e.preventDefault(); scrollToSection('resources'); }}>Resources</a></li>
                <li><a href="https://crack-ed.com/badhta-india-dekho-podcast/" target="_blank" rel="noopener noreferrer">BID Podcast</a></li>
              </ul>
            </div>

            {/* Job-Linked Programs Section */}
            <div className="footer-column">
              <h3 className="footer-heading">JOB-LINKED PROGRAMS</h3>
              <ul className="footer-links footer-job-links">
                <li><Link to="/programs" className="footer-program-heading">AURUM Bankers Program</Link></li>
                <li><a href="https://crack-ed.com/pgprm/" target="_blank" rel="noopener noreferrer">Relationship Manager</a></li>
                <li><a href="https://aubank.ro.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Gold Loan</a></li>
                <li><a href="https://aubankbo.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">CASA</a></li>
                <li><a href="https://aubankso.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Microbusiness Loan</a></li>
                <li><a href="https://aubankmo.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Money Officer</a></li>
                <li><a href="https://aubankto.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Transaction Officer</a></li>
                <li><a href="https://aubankcso.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Customer Service Officer</a></li>
                <li><a href="https://aubankbcso.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Valuation</a></li>
                <li><a href="https://aubankcm.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Deputy Center Manager</a></li>
                <li><a href="https://aubanklro.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Deputy Late Recovery Officer</a></li>
                <li><Link to="/programs" className="footer-program-heading">Lenskart Eyetech Program</Link></li>
                <li><a href="https://lenskart.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Clinical Technician</a></li>
                <li><a href="https://lenskartrsa.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Retail Sales Associate</a></li>
              </ul>
            </div>

            {/* Contact Us and Follow Us Section */}
            <div className="footer-column footer-contact-column">
              <div className="footer-contact">
                <h3 className="footer-heading">CONTACT US</h3>
                <div className="contact-info">
                  <div className="contact-item">
                    <svg className="contact-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 1.66667C6.325 1.66667 3.33333 4.65833 3.33333 8.33333C3.33333 13.75 10 18.3333 10 18.3333C10 18.3333 16.6667 13.75 16.6667 8.33333C16.6667 4.65833 13.675 1.66667 10 1.66667ZM10 10.4167C8.61667 10.4167 7.5 9.3 7.5 7.91667C7.5 6.53333 8.61667 5.41667 10 5.41667C11.3833 5.41667 12.5 6.53333 12.5 7.91667C12.5 9.3 11.3833 10.4167 10 10.4167Z" fill="white"/>
                    </svg>
                    <a href="https://maps.app.goo.gl/K7dZtRrPfwoFDUo86" target="_blank" rel="noopener noreferrer" className="contact-link">7th floor, Imperia Mindspace. Sector 62, Golf Course Road, Gurgaon</a>
                  </div>
                  <div className="contact-item">
                    <svg className="contact-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.6667 3.33333H3.33333C2.41286 3.33333 1.66667 4.07952 1.66667 5V15C1.66667 15.9205 2.41286 16.6667 3.33333 16.6667H16.6667C17.5871 16.6667 18.3333 15.9205 18.3333 15V5C18.3333 4.07952 17.5871 3.33333 16.6667 3.33333ZM16.6667 5L10 9.58333L3.33333 5H16.6667ZM3.33333 15V6.66667L10 11.25L16.6667 6.66667V15H3.33333Z" fill="white"/>
                    </svg>
                    <span>crack-ed@gimarsoft.com</span>
                  </div>
                </div>
              </div>
              <div className="footer-social">
                <h3 className="footer-heading">FOLLOW US</h3>
                <div className="social-icons">
                  <a href="#" aria-label="Instagram" className="social-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="white"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="LinkedIn" className="social-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="white"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="Facebook" className="social-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="white"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="YouTube" className="social-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="white"/>
                    </svg>
                  </a>
                </div>
              </div>
              {/* Mobile Copyright Section */}
              <div className="footer-mobile-copyright">
                <hr className="footer-divider" />
                <p className="footer-copyright-mobile">© 2026 CRACK-ED. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
