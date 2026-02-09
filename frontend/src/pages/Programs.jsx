import React from 'react'
import Header from '../components/Header/Header'
import ProgramsHero from '../components/ProgramsHero/ProgramsHero'
import PremiumProgram from '../components/PremiumProgram/PremiumProgram'
import ProgramsList from '../components/ProgramsList/ProgramsList'
import Footer from '../components/Footer/Footer'
import './Programs.css'

const Programs = () => {
  return (
    <div className="programs-page">
      <Header />
      <ProgramsHero />
      <PremiumProgram />
      <ProgramsList />
      <Footer />
    </div>
  )
}

export default Programs
