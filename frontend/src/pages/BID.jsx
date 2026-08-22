import React from 'react'
import Header from '../components/Header/Header'
import BIDHero from '../components/BIDHero/BIDHero'
import BIDIntro from '../components/BIDIntro/BIDIntro'
import BIDEpisodes from '../components/BIDEpisodes/BIDEpisodes'
import BIDHost from '../components/BIDHost/BIDHost'
import EnquireSection from '../components/EnquireSection/EnquireSection'
import Footer from '../components/Footer/Footer'
import './BID.css'
import SEO from '../components/SEO/SEO'
import { PAGE_SEO } from '../seo/site'

const BID = () => {
  return (
    <div className="bid-page">
      <SEO
        title={PAGE_SEO.bid.title}
        description={PAGE_SEO.bid.description}
        path={PAGE_SEO.bid.path}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Badhta India Dekho', path: '/badhta-india-dekho' },
        ]}
      />
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

