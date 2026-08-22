import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header/Header'
import ProgramsHero from '../components/ProgramsHero/ProgramsHero'
import ProgramsList from '../components/ProgramsList/ProgramsList'
import Footer from '../components/Footer/Footer'
import './Programs.css'
import SEO from '../components/SEO/SEO'
import { PAGE_SEO } from '../seo/site'

const Programs = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash !== '#programs-list') return
    const programsListSection = document.getElementById('programs-list')
    if (!programsListSection) return
    requestAnimationFrame(() => {
      programsListSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location])

  return (
    <div className="programs-page">
      <SEO
        title={PAGE_SEO.programs.title}
        description={PAGE_SEO.programs.description}
        path={PAGE_SEO.programs.path}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'All Programs', path: '/programs' },
        ]}
      />
      <Header />
      <ProgramsHero />
      <ProgramsList />
      <Footer />
    </div>
  )
}

export default Programs
