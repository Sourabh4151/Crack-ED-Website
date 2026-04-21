import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import ResourcesHero from '../components/ResourcesHero/ResourcesHero'
import ResourcesBlogList from '../components/ResourcesBlogList/ResourcesBlogList'
import ResourcesFilter from '../components/ResourcesFilter/ResourcesFilter'
import EnquireSection from '../components/EnquireSection/EnquireSection'
import Footer from '../components/Footer/Footer'
import { useMergedBlogPosts } from '../hooks/useMergedBlogPosts'
import { fetchFeaturedMarketingBlog } from '../services/blogApi'
import './Resources.css'

const Resources = () => {
  const { cards } = useMergedBlogPosts()
  const [featuredFromApi, setFeaturedFromApi] = useState(null)

  useEffect(() => {
    fetchFeaturedMarketingBlog().then(setFeaturedFromApi)
  }, [])

  return (
    <div className="resources-page">
      <Header />
      <div className="resources-scroll-wrapper">
        <ResourcesHero />
        <main id="resources-content" className="resources-content">
          <ResourcesBlogList featuredFromApi={featuredFromApi} />
        </main>
        <ResourcesFilter blogCards={cards} />
        <EnquireSection />
        <Footer />
      </div>
    </div>
  )
}

export default Resources
