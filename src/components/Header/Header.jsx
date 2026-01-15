import React, { useState, useEffect, useRef } from 'react'
import logoImage from '../../assets/crack-ed_logo.png'
import './Header.css'

const Header = () => {
  const [isProgramsOpen, setIsProgramsOpen] = useState(false)
  const [isAurumSubmenuOpen, setIsAurumSubmenuOpen] = useState(false)
  const [isLenskartSubmenuOpen, setIsLenskartSubmenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
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

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <img src={logoImage} alt="CRACK-ED Logo" className="logo-icon" />
        </div>
        
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="https://crack-ed.com/about-us/" className="nav-link">About Us</a>
            </li>
            <li 
              className="nav-item nav-item-dropdown"
              onMouseEnter={() => {
                clearAllTimeouts()
                setIsProgramsOpen(true)
              }}
              onMouseLeave={() => {
                closeTimeoutRef.current = setTimeout(() => {
                  setIsProgramsOpen(false)
                  setIsAurumSubmenuOpen(false)
                  setIsLenskartSubmenuOpen(false)
                }, 150)
              }}
            >
              <a href="#programs" className="nav-link">
                Programs
                <svg className="dropdown-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              {isProgramsOpen && (
                <ul 
                  className="dropdown-menu"
                  onMouseEnter={() => {
                    clearAllTimeouts()
                    setIsProgramsOpen(true)
                  }}
                  onMouseLeave={() => {
                    closeTimeoutRef.current = setTimeout(() => {
                      setIsProgramsOpen(false)
                      setIsAurumSubmenuOpen(false)
                      setIsLenskartSubmenuOpen(false)
                    }, 150)
                  }}
                >
                  <li 
                    className="dropdown-item-with-submenu"
                    onMouseEnter={() => {
                      clearAllTimeouts()
                      setIsAurumSubmenuOpen(true)
                      setIsProgramsOpen(true)
                    }}
                    onMouseLeave={() => {
                      aurumTimeoutRef.current = setTimeout(() => {
                        setIsAurumSubmenuOpen(false)
                      }, 150)
                    }}
                  >
                    <a href="#programs/aurum-bankers" className="dropdown-link-with-arrow">
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
                          setIsAurumSubmenuOpen(!isAurumSubmenuOpen)
                        }}
                      >
                        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    {isAurumSubmenuOpen && (
                      <ul 
                        className="nested-dropdown-menu"
                        onMouseEnter={() => {
                          clearAllTimeouts()
                          setIsAurumSubmenuOpen(true)
                          setIsProgramsOpen(true)
                        }}
                        onMouseLeave={() => {
                          aurumTimeoutRef.current = setTimeout(() => {
                            setIsAurumSubmenuOpen(false)
                          }, 150)
                        }}
                      >
                        <li><a href="https://crack-ed.com/pgprm/">Relationship Manager</a></li>
                        <li><a href="https://aubank.ro.crack-ed.com/portal">Relationship Officer</a></li>
                        <li><a href="https://aubankbo.crack-ed.com/portal">Bank Officer</a></li>
                        <li><a href="https://aubankso.crack-ed.com/portal">Sales Officer</a></li>
                        <li><a href="https://aubankto.crack-ed.com/portal">Transaction Officer</a></li>
                        <li><a href="https://aubankcm.crack-ed.com/portal">Deputy Center Manager</a></li>
                        <li><a href="https://aubankcso.crack-ed.com/portal">Customer Service Officer</a></li>
                        <li><a href="https://aubanklro.crack-ed.com/portal">Late Recovery Officer</a></li>
                        <li><a href="https://aubankmo.crack-ed.com/portal">Money Officer</a></li>
                        <li><a href="https://aubankbcso.crack-ed.com/portal">Customer Service Officer Valuation</a></li>
                      </ul>
                    )}
                  </li>
                  <li><a href="https://piramal.crack-ed.com/portal">Piramal ProEdge Program</a></li>
                  <li 
                    className="dropdown-item-with-submenu"
                    onMouseEnter={() => {
                      clearAllTimeouts()
                      setIsLenskartSubmenuOpen(true)
                      setIsProgramsOpen(true)
                    }}
                    onMouseLeave={() => {
                      lenskartTimeoutRef.current = setTimeout(() => {
                        setIsLenskartSubmenuOpen(false)
                      }, 150)
                    }}
                  >
                    <a href="#programs/lenskart-eyetech" className="dropdown-link-with-arrow">
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
                          setIsLenskartSubmenuOpen(!isLenskartSubmenuOpen)
                        }}
                      >
                        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    {isLenskartSubmenuOpen && (
                      <ul 
                        className="nested-dropdown-menu"
                        onMouseEnter={() => {
                          clearAllTimeouts()
                          setIsLenskartSubmenuOpen(true)
                          setIsProgramsOpen(true)
                        }}
                        onMouseLeave={() => {
                          lenskartTimeoutRef.current = setTimeout(() => {
                            setIsLenskartSubmenuOpen(false)
                          }, 150)
                        }}
                      >
                        <li><a href="https://lenskart.crack-ed.com/portal">Dispensing Optician</a></li>
                        <li><a href="https://lenskartrsa.crack-ed.com/portal">Retail Sales Officer</a></li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>
            <li className="nav-item">
              <a href="#resources" className="nav-link">Resources</a>
            </li>
            <li className="nav-item">
              <a href="https://crack-ed.com/badhta-india-dekho-podcast/" className="nav-link">Badhta India Dekho</a>
            </li>
            <li className="nav-item">
              <a href="https://crack-ed.com/careers/" className="nav-link">Careers</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header