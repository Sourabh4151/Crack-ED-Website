import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/crack-ed_logo.png'
import instagramIcon from '../../assets/instagram_footer.png'
import linkedinIcon from '../../assets/linkedin_footer.png'
import facebookIcon from '../../assets/facebook_footer.png'
import youtubeIcon from '../../assets/youtube_footer.png'
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
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/programs">Programs</Link></li>
                <li><a href="http://blogs.crack-ed.com/">Resources</a></li>
                <li><Link to="/badhta-india-dekho">BID Podcast</Link></li>
              </ul>
            </div>

            {/* Job-Linked Programs Section */}
            <div className="footer-column">
              <h3 className="footer-heading">JOB-LINKED PROGRAMS</h3>
              <ul className="footer-links footer-job-links">
                <li><Link to="/programs" className="footer-program-heading">AURUM Bankers Program</Link></li>
                <li><a href="https://aurmroyale.crack-ed.com/" target="_blank" rel="noopener noreferrer">Relationship Manager</a></li>
                <li><a href="https://aubank.ro.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Relationship Officer</a></li>
                <li><a href="https://aubankbo.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Bank Officer</a></li>
                <li><a href="https://aubankso.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Sales Officer</a></li>
                <li><a href="https://aubankmo.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Money Officer</a></li>
                <li><a href="https://aubankto.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Transaction Officer</a></li>
                <li><a href="https://aubankcso.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Customer Service Officer</a></li>
                <li><a href="https://aubankbcso.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Customer Service Officer Valuation</a></li>
                <li><a href="https://aubankcm.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Deputy Center Manager</a></li>
                <li><a href="https://aubanklro.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Deputy Late Recovery Officer</a></li>
                <li><Link to="/programs" className="footer-program-heading">Lenskart Eyetech Program</Link></li>
                <li><a href="https://lenskart.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Clinical Technician</a></li>
                <li><a href="https://lenskartrsa.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Retail Sales Associate</a></li>
                <li><Link to="/programs" className="footer-program-heading">Piramal ProEdge Program</Link></li>
                <li><a href="https://piramal.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Relationship Manager</a></li>
                <li><Link to="/programs" className="footer-program-heading">Udaan Program</Link></li>
                <li><a href="https://udaan.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Cashier / Teller</a></li>
                <li><Link to="/programs" className="footer-program-heading">Paytm Disha Program</Link></li>
                <li><a href="https://paytm.crack-ed.com/portal" target="_blank" rel="noopener noreferrer">Field Sales Executive</a></li>
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
                  <a href="https://www.instagram.com/crack_ed_now/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
                    <img src={instagramIcon} alt="Instagram" />
                  </a>
                  <a href="https://www.linkedin.com/company/crack-ed/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
                    <img src={linkedinIcon} alt="LinkedIn" />
                  </a>
                  <a href="https://www.facebook.com/people/Crack-ED-Bridging-the-Skill-Gap/100083683071884/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon">
                    <img src={facebookIcon} alt="Facebook" />
                  </a>
                  <a href="https://www.youtube.com/@CrackEDit" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-icon">
                    <img src={youtubeIcon} alt="YouTube" />
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
