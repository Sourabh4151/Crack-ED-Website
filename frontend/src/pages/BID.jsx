import React from 'react'
import Header from '../components/Header/Header'
import BIDHero from '../components/BIDHero/BIDHero'
import BIDIntro from '../components/BIDIntro/BIDIntro'
import BIDEpisodes from '../components/BIDEpisodes/BIDEpisodes'
import BIDHost from '../components/BIDHost/BIDHost'
import EnquireSection from '../components/EnquireSection/EnquireSection'
import Footer from '../components/Footer/Footer'
import './BID.css'

const BID = () => {
  return (
    <div className="bid-page">
      <Header />
      <main>
        <BIDHero />
        <BIDIntro />
        <BIDEpisodes />
        <BIDHost />
        <EnquireSection />
      </main>
      <Footer />
    </div>
  )
}

export default BID

