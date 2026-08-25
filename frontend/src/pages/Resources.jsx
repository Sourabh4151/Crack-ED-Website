import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import ResourcesHero from '../components/ResourcesHero/ResourcesHero'
import ResourcesBlogList from '../components/ResourcesBlogList/ResourcesBlogList'
import ResourcesFilter from '../components/ResourcesFilter/ResourcesFilter'
import EnquireSection from '../components/EnquireSection/EnquireSection'
import Footer from '../components/Footer/Footer'
import { useMergedBlogPosts } from '../hooks/useMergedBlogPosts'
import { fetchFeaturedMarketingBlog, prefetchMarketingBlogDetail } from '../services/blogApi'
import './Resources.css'
import SEO from '../components/SEO/SEO'
import { PAGE_SEO } from '../seo/site'

const Resources = () => {
  const { cards } = useMergedBlogPosts()
  const [featuredFromApi, setFeaturedFromApi] = useState(null)

  useEffect(() => {
    fetchFeaturedMarketingBlog().then(setFeaturedFromApi)
  }, [])

  useEffect(() => {
    const slug = featuredFromApi?.slug
    if (slug) prefetchMarketingBlogDetail(slug)
  }, [featuredFromApi?.slug])

  return (
    <div className="resources-page">
      <SEO
        title={PAGE_SEO.resources.title}
        description={PAGE_SEO.resources.description}
        path={PAGE_SEO.resources.path}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/resources' },
        ]}
      />
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
