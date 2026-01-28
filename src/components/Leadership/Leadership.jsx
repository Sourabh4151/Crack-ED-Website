import React from 'react'
import debojitSen from '../../assets/debojit_sen.jpg'
import vipinSingh from '../../assets/vipin_singh.jpeg'
import ankitMittal from '../../assets/ankit_mittal.jpg'
import bhavanaAnand from '../../assets/bhavana_anand.jpg'
import nabeelAkhtar from '../../assets/nabeel_akhtar.jpg'
import amanRawat from '../../assets/aman_rawat.jpg'
import pawanBhati from '../../assets/pawan_bhati.jpeg'
import panchaliMoitra from '../../assets/panchali_moitra.jpg'
import './Leadership.css'

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="white"/>
  </svg>
)

const Leadership = () => {
  const leaders = [
    { name: 'Debojit Sen', title: 'Founder & CEO', image: debojitSen, linkedin: '#' },
    { name: 'Ankit Mittal', title: 'Corporate & Strategy Head', image: ankitMittal, linkedin: '#' },
    { name: 'Vipin Singh', title: 'CPTO', image: vipinSingh, linkedin: '#' },
    { name: 'Bhavana Anand', title: 'Operations Head', image: bhavanaAnand, linkedin: '#' },
    { name: 'Nabeel Akhtar', title: 'Sales Head - B2B', image: nabeelAkhtar, linkedin: '#' },
    { name: 'Aman Rawat', title: 'Sales Head - B2C', image: amanRawat, linkedin: '#' },
    { name: 'Pawan Bhati', title: 'Head - Special Projects', image: pawanBhati, linkedin: '#' },
    { name: 'Panchali Moitra', title: 'Learning Design Head', image: panchaliMoitra, linkedin: '#' }
  ]

  return (
    <section className="leadership-section">
      <div className="leadership-container">
        <div className="leadership-header">
          <div className="leadership-badge">Leadership</div>
          <h2 className="leadership-title">The People Steering Crack-ED Towards Real Impact</h2>
        </div>
        <div className="leadership-grid">
          {leaders.map((leader) => (
            <div key={leader.name} className={`leadership-card ${leader.name.replace(/\s+/g, '-').toLowerCase()}`}>
              <div className="leadership-card-image-wrap">
                <img src={leader.image} alt={leader.name} className="leadership-card-image" />
                {/* Black strip overlays bottom of image – image shows through (transparent to strip) */}
                <div className="leadership-card-text-frame">
                  <div className="leadership-card-details">
                    <div className="leadership-card-details-text">
                      <h3 className="leadership-card-name">{leader.name}</h3>
                      <p className="leadership-card-role">{leader.title}</p>
                    </div>
                    <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="leadership-linkedin" aria-label={`${leader.name} on LinkedIn`}>
                      <LinkedInIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Leadership
