import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoImage from '../../assets/crack-ed_logo.png'
import './Header.css'

/** Programs grouped for the header dropdown; Banking is expanded by default. */
const PROGRAM_CATEGORIES = [
  {
    id: 'banking',
    label: 'Banking',
    items: [
      {
        label: 'Postgraduate Program',
        children: [
          { label: 'Relationship Management', href: 'https://pgprm.crack-ed.com/' },
          { label: 'Retail Banking', href: 'https://pgprb.crack-ed.com' },
          { label: 'Banking Management', href: 'https://pgpam.crack-ed.com/' },
        ],
      },
      {
        label: 'Udaan Program',
        children: [
          { label: 'Cashier / Teller', href: 'https://udaan.crack-ed.com/portal' },
          { label: 'Virtual Relationship Manager', href: 'https://udaanvrm.crack-ed.com' },
          { label: 'Relationship Manager', href: 'https://udaanrm.crack-ed.com' },
          { label: 'Business Loan Associate', href: 'https://udaanbusiness.crack-ed.com' },
        ],
      },
      { label: 'PGC - Banking Management', href: 'https://pgcbm.crack-ed.com' },
      { label: 'Banking Sales Program', href: 'https://bspso.crack-ed.com' },
      { label: 'Mahindra Finance Prarambh Program', href: 'https://mahindrafinancebe.crack-ed.com/' },
    ],
  },
  {
    id: 'retail',
    label: 'Retail',
    items: [
      {
        label: 'Lenskart Eyetech Program',
        children: [
          { label: 'Clinical Technician', href: 'https://lenskart.crack-ed.com/portal' },
          { label: 'Retail Sales Associate', href: 'https://lenskartrsa.crack-ed.com/portal' },
        ],
      },
    ],
  },
  {
    id: 'nbfc',
    label: 'NBFC',
    items: [
      { label: 'Piramal ProEdge Program', href: 'https://piramal.crack-ed.com/portal' },
      { label: 'Finova VyaparaMitra Program', href: 'https://finovaro.crack-ed.com' },
      { label: 'Paytm Disha Program', href: 'https://paytm.crack-ed.com/portal' },
      {
        label: 'Poonawalla FinPro Career Program',
        children: [
          { label: 'Gold Assayer', href: 'http://poonawallaga.crack-ed.com/' },
          { label: 'Sales Executive', href: 'http://poonawallase.crack-ed.com/' },
        ],
      },
    ],
  },
  {
    id: 'insurance',
    label: 'Insurance',
    items: [
      {
        label: 'Aviva Nirmaan Program',
        children: [
          { label: 'Direct Sales Executive', href: 'https://avivads.crack-ed.com' },
          { label: 'Agency Sales Executive', href: 'https://avivaas.crack-ed.com' },
        ],
      },
    ],
  },
]

const Header = () => {
  const location = useLocation()
  const [isProgramsOpen, setIsProgramsOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState(['banking'])
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const closeTimeoutRef = useRef(null)

  const scrollThreshold = 50

  const getScrollTarget = () => {
    const path = location.pathname
    if (path === '/badhta-india-dekho') return document.querySelector('.bid-page')
    if (path === '/resources') return document.querySelector('.resources-scroll-wrapper')
    if (path.startsWith('/resources/blog/')) return document.querySelector('.blog-post-scroll')
    if (path === '/careers') return document.querySelector('.careers-scroll-wrapper')
    if (path.startsWith('/careers/job/')) return document.querySelector('.job-detail-page')
    if (path === '/influencer') return document.querySelector('.influencer-page')
    if (path === '/refund-policy') return document.querySelector('.refund-page')
    if (path === '/privacy-policy') return document.querySelector('.privacy-page')
    if (path === '/terms-conditions') return document.querySelector('.terms-page')
    return null
  }

  const getScrollPosition = (target) => {
    if (!target) return window.scrollY
    return target.scrollTop
  }

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  useEffect(() => {
    const scrollTarget = getScrollTarget()
    const target = scrollTarget || window

    const handleScroll = () => {
      const scrollPosition = getScrollPosition(scrollTarget)
      setIsScrolled(scrollPosition > scrollThreshold)
    }

    handleScroll()

    target.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      target.removeEventListener('scroll', handleScroll)
      clearCloseTimeout()
    }
  }, [location.pathname])

  useEffect(() => {
    if (isProgramsOpen) {
      setExpandedCategories(['banking'])
    }
  }, [isProgramsOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
        setIsProgramsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && window.innerWidth <= 768) {
        const nav = document.querySelector('.nav')
        const hamburger = document.querySelector('.hamburger-menu')
        if (nav && hamburger && !nav.contains(event.target) && !hamburger.contains(event.target)) {
          closeMobileMenu()
        }
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (!isMobileMenuOpen) {
      setIsProgramsOpen(false)
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsProgramsOpen(false)
  }

  const handleProgramsNavClick = (e) => {
    /* Mobile: go straight to /programs — no in-nav dropdown */
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      closeMobileMenu()
      return
    }
    e.preventDefault()
    clearCloseTimeout()
    setIsProgramsOpen((open) => !open)
  }

  /** Accordion: only one category open; opening another closes Banking (and all others). */
  const toggleProgramsCategory = (id) => {
    setExpandedCategories((prev) => {
      if (prev.includes(id)) {
        return []
      }
      return [id]
    })
  }

  const renderProgramItem = (item, idx) => {
    if (item.children) {
      return (
        <li key={`${item.label}-${idx}`} className="programs-dropdown-subgroup">
          <span className="programs-dropdown-subgroup-label">{item.label}</span>
          <ul className="programs-dropdown-sublist">
            {item.children.map((child) => (
              <li key={child.href}>
                <a
                  href={child.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                >
                  {child.label}
                </a>
              </li>
            ))}
          </ul>
        </li>
      )
    }
    return (
      <li key={item.href}>
        <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>
          {item.label}
        </a>
      </li>
    )
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMobileMenu} aria-label="Go to home">
          <img src={logoImage} alt="CRACK-ED Logo" className="logo-icon" />
        </Link>

        <button
          className="hamburger-menu"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        <nav className={`nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={closeMobileMenu}>
                About Us
              </Link>
            </li>
            <li
              className={`nav-item nav-item-dropdown ${isProgramsOpen ? 'active' : ''}`}
              onMouseEnter={() => {
                if (window.innerWidth > 768) {
                  clearCloseTimeout()
                  setIsProgramsOpen(true)
                }
              }}
              onMouseLeave={() => {
                if (window.innerWidth > 768) {
                  closeTimeoutRef.current = setTimeout(() => {
                    setIsProgramsOpen(false)
                  }, 280)
                }
              }}
            >
              <Link
                to="/programs"
                className="nav-link"
                onClick={handleProgramsNavClick}
                title="Programs — open menu on desktop; full list on mobile"
              >
                Programs
                <svg className="dropdown-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              {isProgramsOpen && (
                <div
                  className="dropdown-menu programs-dropdown-menu"
                  onMouseEnter={() => {
                    if (window.innerWidth > 768) {
                      clearCloseTimeout()
                      setIsProgramsOpen(true)
                    }
                  }}
                  onMouseLeave={() => {
                    if (window.innerWidth > 768) {
                      closeTimeoutRef.current = setTimeout(() => {
                        setIsProgramsOpen(false)
                      }, 280)
                    }
                  }}
                >
                  <div className="programs-dropdown-inner">
                    <Link
                      to="/programs"
                      className="programs-dropdown-all"
                      onClick={() => {
                        closeMobileMenu()
                        setIsProgramsOpen(false)
                      }}
                    >
                      All Programs
                    </Link>
                    <ul className="programs-dropdown-categories">
                      {PROGRAM_CATEGORIES.map((cat) => {
                        const isExpanded = expandedCategories.includes(cat.id)
                        return (
                          <li key={cat.id} className={`programs-dropdown-category ${isExpanded ? 'is-open' : ''}`}>
                            <button
                              type="button"
                              className="programs-dropdown-category-toggle"
                              aria-expanded={isExpanded}
                              onClick={() => toggleProgramsCategory(cat.id)}
                            >
                              <span>{cat.label}</span>
                              <svg
                                className="programs-dropdown-chevron"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden
                              >
                                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                            {isExpanded && (
                              <ul className="programs-dropdown-category-list">
                                {cat.items.map((item, i) => renderProgramItem(item, i))}
                              </ul>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </li>
            <li className="nav-item">
              <Link to="/resources" className="nav-link" onClick={closeMobileMenu}>Resources</Link>
            </li>
            <li className="nav-item">
              <Link to="/badhta-india-dekho" className="nav-link" onClick={closeMobileMenu}>
                Badhta India Dekho
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/careers" className="nav-link" onClick={closeMobileMenu}>Careers</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
