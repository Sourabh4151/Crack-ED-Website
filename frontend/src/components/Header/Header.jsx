import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoImage from '../../assets/crack-ed_logo.png'
import './Header.css'

const Header = () => {
  const location = useLocation()
  const [isProgramsOpen, setIsProgramsOpen] = useState(false)
  const [isUdaanSubmenuOpen, setIsUdaanSubmenuOpen] = useState(false)
  const [isLenskartSubmenuOpen, setIsLenskartSubmenuOpen] = useState(false)
  const [isFinProSubmenuOpen, setIsFinProSubmenuOpen] = useState(false)
  const [isAvivaSubmenuOpen, setIsAvivaSubmenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const closeTimeoutRef = useRef(null)
  const udaanTimeoutRef = useRef(null)
  const lenskartTimeoutRef = useRef(null)
  const finproTimeoutRef = useRef(null)
  const avivaTimeoutRef = useRef(null)

  // On BID, Resources, and Careers the page uses an inner scroll container, so window.scrollY stays 0.
  // Listen to the actual scroll container so the header gets the black background when scrolled.
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
  
  const clearAllTimeouts = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    if (udaanTimeoutRef.current) {
      clearTimeout(udaanTimeoutRef.current)
      udaanTimeoutRef.current = null
    }
    if (lenskartTimeoutRef.current) {
      clearTimeout(lenskartTimeoutRef.current)
      lenskartTimeoutRef.current = null
    }
    if (finproTimeoutRef.current) {
      clearTimeout(finproTimeoutRef.current)
      finproTimeoutRef.current = null
    }
    if (avivaTimeoutRef.current) {
      clearTimeout(avivaTimeoutRef.current)
      avivaTimeoutRef.current = null
    }
  }

  useEffect(() => {
    const scrollTarget = getScrollTarget()
    const target = scrollTarget || window

    const handleScroll = () => {
      const scrollPosition = getScrollPosition(scrollTarget)
      setIsScrolled(scrollPosition > scrollThreshold)
    }

    // Set initial state in case the container is already scrolled (e.g. after navigation)
    handleScroll()

    target.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      target.removeEventListener('scroll', handleScroll)
      clearAllTimeouts()
    }
  }, [location.pathname])

  // Close mobile menu on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
        setIsProgramsOpen(false)
        setIsUdaanSubmenuOpen(false)
        setIsLenskartSubmenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isMobileMenuOpen])

  // No body scroll lock - we use an overlay that unmounts when menu closes (avoids unlock bugs)

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
      setIsLenskartSubmenuOpen(false)
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsProgramsOpen(false)
    setIsUdaanSubmenuOpen(false)
    setIsLenskartSubmenuOpen(false)
  }

  const toggleProgramsMobile = () => {
    setIsProgramsOpen(!isProgramsOpen)
    setIsUdaanSubmenuOpen(false)
    setIsLenskartSubmenuOpen(false)
    setIsFinProSubmenuOpen(false)
    setIsAvivaSubmenuOpen(false)
  }

  const toggleUdaanSubmenuMobile = () => {
    setIsUdaanSubmenuOpen(!isUdaanSubmenuOpen)
  }

  const toggleLenskartSubmenuMobile = () => {
    setIsLenskartSubmenuOpen(!isLenskartSubmenuOpen)
  }
 
  const toggleFinProSubmenuMobile = () => {
    setIsFinProSubmenuOpen(!isFinProSubmenuOpen)
  }
 
  const toggleAvivaSubmenuMobile = () => {
    setIsAvivaSubmenuOpen(!isAvivaSubmenuOpen)
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
                  clearAllTimeouts()
                  setIsProgramsOpen(true)
                }
              }}
              onMouseLeave={() => {
                if (window.innerWidth > 768) {
                  closeTimeoutRef.current = setTimeout(() => {
                    setIsProgramsOpen(false)
                    setIsUdaanSubmenuOpen(false)
                    setIsLenskartSubmenuOpen(false)
                  }, 300)
                }
              }}
            >
              <Link 
                to="/programs" 
                className="nav-link"
                onClick={closeMobileMenu}
                title="Click to view all programs"
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
                        setIsUdaanSubmenuOpen(false)
                        setIsLenskartSubmenuOpen(false)
                      }, 300)
                    }
                  }}
                >
                  <li><a href="https://piramal.crack-ed.com/portal" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Piramal ProEdge Program</a></li>
                  <li><a href="https://finovaro.crack-ed.com" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Finova VyaparaMitra Program</a></li>
                  <li><a href="https://pgprm.crack-ed.com/" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>PGP - Relationship Management
                  </a></li>
                  <li><a href="https://bandhanbankam.crack-ed.com/" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Bandhan Career Bridge Program</a></li>
                  <li><a href="https://pgcbm.crack-ed.com" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>PGC - Banking Management</a></li>
                  <li><a href="https://mahindrafinancebe.crack-ed.com/" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Mahindra Finance Prarambh Program</a></li>
                  <li 
                    className={`dropdown-item-with-submenu ${isUdaanSubmenuOpen ? 'active' : ''}`}
                    onMouseEnter={() => {
                      if (window.innerWidth > 768) {
                        clearAllTimeouts()
                        setIsUdaanSubmenuOpen(true)
                        setIsLenskartSubmenuOpen(false)
                        setIsProgramsOpen(true)
                      }
                    }}
                    onMouseLeave={() => {
                      if (window.innerWidth > 768) {
                        udaanTimeoutRef.current = setTimeout(() => {
                          setIsUdaanSubmenuOpen(false)
                        }, 150)
                      }
                    }}
                  >
                    <a 
                      href="#programs/udaan" 
                      className="dropdown-link-with-arrow"
                      onClick={(e) => {
                        if (window.innerWidth <= 768) {
                          e.preventDefault()
                          toggleUdaanSubmenuMobile()
                        }
                      }}
                    >
                      Udaan Program
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
                            toggleUdaanSubmenuMobile()
                          } else {
                            setIsUdaanSubmenuOpen(!isUdaanSubmenuOpen)
                          }
                        }}
                      >
                        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    {isUdaanSubmenuOpen && (
                      <ul 
                        className="nested-dropdown-menu"
                        onMouseEnter={() => {
                          if (window.innerWidth > 768) {
                            clearAllTimeouts()
                            setIsUdaanSubmenuOpen(true)
                            setIsProgramsOpen(true)
                          }
                        }}
                        onMouseLeave={() => {
                          if (window.innerWidth > 768) {
                            udaanTimeoutRef.current = setTimeout(() => {
                              setIsUdaanSubmenuOpen(false)
                            }, 150)
                          }
                        }}
                      >
                        <li><a href="https://udaan.crack-ed.com/portal" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Cashier / Teller</a></li>
                        <li><a href="https://udaanvrm.crack-ed.com" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Virtual Relationship Manager</a></li>
                        <li><a href="https://udaanrm.crack-ed.com" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Relationship Manager</a></li>
                        <li><a href="https://udaanbusiness.crack-ed.com" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Business Loan Associate</a></li>
                      </ul>
                    )}
                  </li>
                  <li><a href="https://paytm.crack-ed.com/portal" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Paytm Disha Program</a></li>
                  <li 
                    className={`dropdown-item-with-submenu ${isLenskartSubmenuOpen ? 'active' : ''}`}
                    onMouseEnter={() => {
                      if (window.innerWidth > 768) {
                        clearAllTimeouts()
                        setIsUdaanSubmenuOpen(false)
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
                        <li><a href="https://lenskart.crack-ed.com/portal" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Clinical Technician</a></li>
                        <li><a href="https://lenskartrsa.crack-ed.com/portal" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Retail Sales Associate</a></li>
                      </ul>
                    )}
                  </li>
                  <li 
                    className={`dropdown-item-with-submenu ${isFinProSubmenuOpen ? 'active' : ''}`}
                    onMouseEnter={() => {
                      if (window.innerWidth > 768) {
                        clearAllTimeouts()
                        setIsUdaanSubmenuOpen(false)
                        setIsLenskartSubmenuOpen(false)
                        setIsFinProSubmenuOpen(true)
                        setIsProgramsOpen(true)
                      }
                    }}
                    onMouseLeave={() => {
                      if (window.innerWidth > 768) {
                        finproTimeoutRef.current = setTimeout(() => {
                          setIsFinProSubmenuOpen(false)
                        }, 150)
                      }
                    }}
                  >
                    <a 
                      href="#programs/finpro" 
                      className="dropdown-link-with-arrow"
                      onClick={(e) => {
                        if (window.innerWidth <= 768) {
                          e.preventDefault()
                          toggleFinProSubmenuMobile()
                        }
                      }}
                    >
                      Poonawalla FinPro Career Program
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
                            toggleFinProSubmenuMobile()
                          } else {
                            setIsFinProSubmenuOpen(!isFinProSubmenuOpen)
                          }
                        }}
                      >
                        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    {isFinProSubmenuOpen && (
                      <ul 
                        className="nested-dropdown-menu"
                        onMouseEnter={() => {
                          if (window.innerWidth > 768) {
                            clearAllTimeouts()
                            setIsFinProSubmenuOpen(true)
                            setIsProgramsOpen(true)
                          }
                        }}
                        onMouseLeave={() => {
                          if (window.innerWidth > 768) {
                            finproTimeoutRef.current = setTimeout(() => {
                              setIsFinProSubmenuOpen(false)
                            }, 150)
                          }
                        }}
                      >
                        <li><a href="http://poonawallaga.crack-ed.com/" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Gold Assayer</a></li>
                        <li><a href="http://poonawallase.crack-ed.com/" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Sales Executive</a></li>
                      </ul>
                    )}
                  </li>
                  <li 
                    className={`dropdown-item-with-submenu ${isAvivaSubmenuOpen ? 'active' : ''}`}
                    onMouseEnter={() => {
                      if (window.innerWidth > 768) {
                        clearAllTimeouts()
                        setIsUdaanSubmenuOpen(false)
                        setIsLenskartSubmenuOpen(false)
                        setIsFinProSubmenuOpen(false)
                        setIsAvivaSubmenuOpen(true)
                        setIsProgramsOpen(true)
                      }
                    }}
                    onMouseLeave={() => {
                      if (window.innerWidth > 768) {
                        avivaTimeoutRef.current = setTimeout(() => {
                          setIsAvivaSubmenuOpen(false)
                        }, 150)
                      }
                    }}
                  >
                    <a 
                      href="#programs/aviva" 
                      className="dropdown-link-with-arrow"
                      onClick={(e) => {
                        if (window.innerWidth <= 768) {
                          e.preventDefault()
                          toggleAvivaSubmenuMobile()
                        }
                      }}
                    >
                      Aviva Nirmaan Program
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
                            toggleAvivaSubmenuMobile()
                          } else {
                            setIsAvivaSubmenuOpen(!isAvivaSubmenuOpen)
                          }
                        }}
                      >
                        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    {isAvivaSubmenuOpen && (
                      <ul 
                        className="nested-dropdown-menu"
                        onMouseEnter={() => {
                          if (window.innerWidth > 768) {
                            clearAllTimeouts()
                            setIsAvivaSubmenuOpen(true)
                            setIsProgramsOpen(true)
                          }
                        }}
                        onMouseLeave={() => {
                          if (window.innerWidth > 768) {
                            avivaTimeoutRef.current = setTimeout(() => {
                              setIsAvivaSubmenuOpen(false)
                            }, 150)
                          }
                        }}
                      >
                        <li><a href="https://avivads.crack-ed.com" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Direct Sales Executive</a></li>
                        <li><a href="https://avivaas.crack-ed.com" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Agency Sales Executive</a></li>
                      </ul>
                    )}
                  </li>
                </ul>
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