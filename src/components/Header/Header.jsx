import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import logoImage from '../../assets/crack-ed_logo.png'
import './Header.css'

const Header = () => {
  const [isProgramsOpen, setIsProgramsOpen] = useState(false)
  const [isAurumSubmenuOpen, setIsAurumSubmenuOpen] = useState(false)
  const [isLenskartSubmenuOpen, setIsLenskartSubmenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const closeTimeoutRef = useRef(null)
  const aurumTimeoutRef = useRef(null)
  const lenskartTimeoutRef = useRef(null)
  
  const clearAllTimeouts = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    if (aurumTimeoutRef.current) {
      clearTimeout(aurumTimeoutRef.current)
      aurumTimeoutRef.current = null
    }
    if (lenskartTimeoutRef.current) {
      clearTimeout(lenskartTimeoutRef.current)
      lenskartTimeoutRef.current = null
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearAllTimeouts()
    }
  }, [])

  // Close mobile menu on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
        setIsProgramsOpen(false)
        setIsAurumSubmenuOpen(false)
        setIsLenskartSubmenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Close mobile menu when clicking outside
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
    // Close all dropdowns when toggling mobile menu
    if (!isMobileMenuOpen) {
      setIsProgramsOpen(false)
      setIsAurumSubmenuOpen(false)
      setIsLenskartSubmenuOpen(false)
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsProgramsOpen(false)
    setIsAurumSubmenuOpen(false)
    setIsLenskartSubmenuOpen(false)
  }

  const toggleProgramsMobile = () => {
    setIsProgramsOpen(!isProgramsOpen)
    setIsAurumSubmenuOpen(false)
    setIsLenskartSubmenuOpen(false)
  }

  const toggleAurumSubmenuMobile = () => {
    setIsAurumSubmenuOpen(!isAurumSubmenuOpen)
  }

  const toggleLenskartSubmenuMobile = () => {
    setIsLenskartSubmenuOpen(!isLenskartSubmenuOpen)
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <img src={logoImage} alt="CRACK-ED Logo" className="logo-icon" />
        </div>
        
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
              <a href="https://crack-ed.com/about-us/" className="nav-link">About Us</a>
            </li>
            <li 
              className={`nav-item nav-item-dropdown ${isProgramsOpen ? 'active' : ''}`}
              onMouseEnter={() => {
                if (window.innerWidth > 768) {
                  clearAllTimeouts()
                  setIsProgramsOpen(true)
                }
              }}
              onMouseLeave={() => {
                if (window.innerWidth > 768) {
                  closeTimeoutRef.current = setTimeout(() => {
                    setIsProgramsOpen(false)
                    setIsAurumSubmenuOpen(false)
                    setIsLenskartSubmenuOpen(false)
                  }, 150)
                }
              }}
            >
              <Link 
                to="/programs" 
                className="nav-link"
                onClick={(e) => {
                  if (window.innerWidth <= 768) {
                    e.preventDefault()
                    toggleProgramsMobile()
                  }
                }}
              >
                Programs
                <svg className="dropdown-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              {isProgramsOpen && (
                <ul 
                  className="dropdown-menu"
                  onMouseEnter={() => {
                    if (window.innerWidth > 768) {
                      clearAllTimeouts()
                      setIsProgramsOpen(true)
                    }
                  }}
                  onMouseLeave={() => {
                    if (window.innerWidth > 768) {
                      closeTimeoutRef.current = setTimeout(() => {
                        setIsProgramsOpen(false)
                        setIsAurumSubmenuOpen(false)
                        setIsLenskartSubmenuOpen(false)
                      }, 150)
                    }
                  }}
                >
                  <li 
                    className={`dropdown-item-with-submenu ${isAurumSubmenuOpen ? 'active' : ''}`}
                    onMouseEnter={() => {
                      if (window.innerWidth > 768) {
                        clearAllTimeouts()
                        setIsAurumSubmenuOpen(true)
                        setIsProgramsOpen(true)
                      }
                    }}
                    onMouseLeave={() => {
                      if (window.innerWidth > 768) {
                        aurumTimeoutRef.current = setTimeout(() => {
                          setIsAurumSubmenuOpen(false)
                        }, 150)
                      }
                    }}
                  >
                    <a 
                      href="#programs/aurum-bankers" 
                      className="dropdown-link-with-arrow"
                      onClick={(e) => {
                        if (window.innerWidth <= 768) {
                          e.preventDefault()
                          toggleAurumSubmenuMobile()
                        }
                      }}
                    >
                      Aurum Bankers Program
                      <svg 
                        className="submenu-arrow" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={(e) => {
                          e.preventDefault()
                          if (window.innerWidth <= 768) {
                            toggleAurumSubmenuMobile()
                          } else {
                            setIsAurumSubmenuOpen(!isAurumSubmenuOpen)
                          }
                        }}
                      >
                        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    {isAurumSubmenuOpen && (
                      <ul 
                        className="nested-dropdown-menu"
                        onMouseEnter={() => {
                          if (window.innerWidth > 768) {
                            clearAllTimeouts()
                            setIsAurumSubmenuOpen(true)
                            setIsProgramsOpen(true)
                          }
                        }}
                        onMouseLeave={() => {
                          if (window.innerWidth > 768) {
                            aurumTimeoutRef.current = setTimeout(() => {
                              setIsAurumSubmenuOpen(false)
                            }, 150)
                          }
                        }}
                      >
                        <li><a href="https://crack-ed.com/pgprm/" onClick={closeMobileMenu}>Relationship Manager</a></li>
                        <li><a href="https://aubank.ro.crack-ed.com/portal" onClick={closeMobileMenu}>Relationship Officer</a></li>
                        <li><a href="https://aubankbo.crack-ed.com/portal" onClick={closeMobileMenu}>Bank Officer</a></li>
                        <li><a href="https://aubankso.crack-ed.com/portal" onClick={closeMobileMenu}>Sales Officer</a></li>
                        <li><a href="https://aubankto.crack-ed.com/portal" onClick={closeMobileMenu}>Transaction Officer</a></li>
                        <li><a href="https://aubankcm.crack-ed.com/portal" onClick={closeMobileMenu}>Deputy Center Manager</a></li>
                        <li><a href="https://aubankcso.crack-ed.com/portal" onClick={closeMobileMenu}>Customer Service Officer</a></li>
                        <li><a href="https://aubanklro.crack-ed.com/portal" onClick={closeMobileMenu}>Late Recovery Officer</a></li>
                        <li><a href="https://aubankmo.crack-ed.com/portal" onClick={closeMobileMenu}>Money Officer</a></li>
                        <li><a href="https://aubankbcso.crack-ed.com/portal" onClick={closeMobileMenu}>Customer Service Officer Valuation</a></li>
                      </ul>
                    )}
                  </li>
                  <li><a href="https://piramal.crack-ed.com/portal" onClick={closeMobileMenu}>Piramal ProEdge Program</a></li>
                  <li 
                    className={`dropdown-item-with-submenu ${isLenskartSubmenuOpen ? 'active' : ''}`}
                    onMouseEnter={() => {
                      if (window.innerWidth > 768) {
                        clearAllTimeouts()
                        setIsLenskartSubmenuOpen(true)
                        setIsProgramsOpen(true)
                      }
                    }}
                    onMouseLeave={() => {
                      if (window.innerWidth > 768) {
                        lenskartTimeoutRef.current = setTimeout(() => {
                          setIsLenskartSubmenuOpen(false)
                        }, 150)
                      }
                    }}
                  >
                    <a 
                      href="#programs/lenskart-eyetech" 
                      className="dropdown-link-with-arrow"
                      onClick={(e) => {
                        if (window.innerWidth <= 768) {
                          e.preventDefault()
                          toggleLenskartSubmenuMobile()
                        }
                      }}
                    >
                      Lenskart Eyetech Program
                      <svg 
                        className="submenu-arrow" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={(e) => {
                          e.preventDefault()
                          if (window.innerWidth <= 768) {
                            toggleLenskartSubmenuMobile()
                          } else {
                            setIsLenskartSubmenuOpen(!isLenskartSubmenuOpen)
                          }
                        }}
                      >
                        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    {isLenskartSubmenuOpen && (
                      <ul 
                        className="nested-dropdown-menu"
                        onMouseEnter={() => {
                          if (window.innerWidth > 768) {
                            clearAllTimeouts()
                            setIsLenskartSubmenuOpen(true)
                            setIsProgramsOpen(true)
                          }
                        }}
                        onMouseLeave={() => {
                          if (window.innerWidth > 768) {
                            lenskartTimeoutRef.current = setTimeout(() => {
                              setIsLenskartSubmenuOpen(false)
                            }, 150)
                          }
                        }}
                      >
                        <li><a href="https://lenskart.crack-ed.com/portal" onClick={closeMobileMenu}>Clinical Technician</a></li>
                        <li><a href="https://lenskartrsa.crack-ed.com/portal" onClick={closeMobileMenu}>Retail Sales Associate</a></li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>
            <li className="nav-item">
              <a href="#resources" className="nav-link" onClick={closeMobileMenu}>Resources</a>
            </li>
            <li className="nav-item">
              <a href="https://crack-ed.com/badhta-india-dekho-podcast/" className="nav-link" onClick={closeMobileMenu}>Badhta India Dekho</a>
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