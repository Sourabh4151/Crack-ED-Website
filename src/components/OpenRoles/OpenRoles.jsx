import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './OpenRoles.css'

const OpenRoles = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [filters, setFilters] = useState({
    jobType: '',
    workMode: '',
    location: ''
  })
  const filtersRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setIsFiltersOpen(false)
      }
    }

    if (isFiltersOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isFiltersOpen])

  const jobs = [
    {
      id: 1,
      title: 'Sales Executive - B2B',
      type: 'FULL TIME',
      workMode: 'WORK FROM OFFICE',
      positions: 3,
      location: 'GURUGRAM, SECTOR 62'
    },
    {
      id: 2,
      title: 'Marketing Specialist',
      type: 'PART TIME',
      workMode: 'WORK FROM HOME',
      positions: 2,
      location: 'GURUGRAM, SECTOR 62'
    },
    {
      id: 3,
      title: 'Software Developer - Frontend',
      type: 'FULL TIME',
      workMode: 'WORK FROM OFFICE',
      positions: 5,
      location: 'GURUGRAM, SECTOR 62'
    },
    {
      id: 4,
      title: 'Technical Support Engineer',
      type: 'FULL TIME',
      workMode: 'WORK FROM OFFICE',
      positions: 4,
      location: 'GURUGRAM, SECTOR 62'
    }
  ]

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value
    }))
  }

  const clearFilters = () => {
    setFilters({
      jobType: '',
      workMode: '',
      location: ''
    })
  }

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesJobType = !filters.jobType || job.type === filters.jobType
    const matchesWorkMode = !filters.workMode || job.workMode === filters.workMode
    const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase())
    
    return matchesSearch && matchesJobType && matchesWorkMode && matchesLocation
  })

  const activeFiltersCount = Object.values(filters).filter(v => v !== '').length

  return (
    <section className="open-roles-section">
      <div className="open-roles-container">
        <div className="open-roles-header">
          <div className="open-roles-badge">Open Roles</div>
          <h2 className="open-roles-title">
            Find a role that matches your skills, curiosity, and ambition.
          </h2>
        </div>
        
        <div className="open-roles-search-container">
          <div className="open-roles-search-wrapper">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="rgba(250, 250, 250, 0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 19L14.65 14.65" stroke="rgba(250, 250, 250, 0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              className="open-roles-search-input"
              placeholder="Search role"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="open-roles-filters-wrapper" ref={filtersRef}>
            <button 
              className="open-roles-filters-button"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5H17M5 10H15M7 15H13" stroke="rgba(250, 250, 250, 0.7)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Filters
              {activeFiltersCount > 0 && (
                <span className="open-roles-filter-badge">{activeFiltersCount}</span>
              )}
            </button>
            
            {isFiltersOpen && (
              <div className="open-roles-filters-dropdown">
                <div className="open-roles-filter-group">
                  <label className="open-roles-filter-label">Job Type</label>
                  <div className="open-roles-filter-options">
                    {['FULL TIME', 'PART TIME', 'CONTRACT', 'INTERNSHIP'].map(type => (
                      <button
                        key={type}
                        className={`open-roles-filter-option ${filters.jobType === type ? 'active' : ''}`}
                        onClick={() => handleFilterChange('jobType', type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="open-roles-filter-group">
                  <label className="open-roles-filter-label">Mode</label>
                  <div className="open-roles-filter-options">
                    {['WORK FROM HOME', 'WORK FROM OFFICE', 'HYBRID'].map(mode => (
                      <button
                        key={mode}
                        className={`open-roles-filter-option ${filters.workMode === mode ? 'active' : ''}`}
                        onClick={() => handleFilterChange('workMode', mode)}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="open-roles-filter-group">
                  <label className="open-roles-filter-label">Location</label>
                  <input
                    type="text"
                    className="open-roles-filter-location-input"
                    placeholder="Enter location"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                  />
                </div>
                
                {activeFiltersCount > 0 && (
                  <button className="open-roles-clear-filters" onClick={clearFilters}>
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="open-roles-list">
          {filteredJobs.map((job) => (
            <div 
              key={job.id} 
              className="open-roles-card"
              onClick={() => {
                navigate(`/careers/job/${job.id}`)
                // Scroll to top after navigation
                setTimeout(() => {
                  window.scrollTo(0, 0)
                }, 0)
              }}
            >
              <div className="open-roles-card-content">
                <div className="open-roles-card-main">
                  <h3 className="open-roles-job-title">{job.title}</h3>
                  <div className="open-roles-job-details">
                    <span className="open-roles-job-detail">{job.type}</span>
                    <span className="open-roles-job-detail">{job.workMode}</span>
                    <span className="open-roles-job-detail">{job.positions} POSITIONS</span>
                    <span className="open-roles-job-location">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8.5C9.10457 8.5 10 7.60457 10 6.5C10 5.39543 9.10457 4.5 8 4.5C6.89543 4.5 6 5.39543 6 6.5C6 7.60457 6.89543 8.5 8 8.5Z" stroke="rgba(250, 250, 250, 0.7)" strokeWidth="1.5"/>
                        <path d="M2.5 6.5C2.5 4.01472 4.51472 2.5 7 2.5C9.48528 2.5 11.5 4.01472 11.5 6.5C11.5 8.98528 7 13.5 7 13.5C7 13.5 2.5 8.98528 2.5 6.5Z" stroke="rgba(250, 250, 250, 0.7)" strokeWidth="1.5"/>
                      </svg>
                      {job.location}
                    </span>
                  </div>
                </div>
                <button 
                  className="open-roles-card-arrow"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/careers/job/${job.id}`)
                    // Scroll to top after navigation
                    setTimeout(() => {
                      window.scrollTo(0, 0)
                    }, 0)
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="rgba(250, 250, 250, 0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OpenRoles
