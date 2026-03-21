import React, { useMemo } from 'react'
import ResourcesBlogCard from '../ResourcesBlogCard/ResourcesBlogCard'
import premiumImage from '../../assets/premium_image.jpeg'
import './ResourcesBlogList.css'

const fallbackFeatured = {
  title: '7 Skills Every Successful Relationship Manager Must Have',
  date: 'MARCH 18, 2026',
  description:
    'Discover the 7 must-have skills every relationship manager needs to succeed in client management, build trust, and grow your career.',
  link: '/resources/blog/7',
  image: premiumImage,
}

const ResourcesBlogList = ({ featuredFromApi = null, blogs }) => {
  const defaultBlog = useMemo(() => {
    if (featuredFromApi) {
      return {
        title: featuredFromApi.title,
        date: featuredFromApi.date_display || '',
        description: featuredFromApi.excerpt || '',
        link: `/resources/blog/${featuredFromApi.slug}`,
        image: featuredFromApi.cover_image_url || premiumImage,
      }
    }
    return fallbackFeatured
  }, [featuredFromApi])

  const list = blogs ?? [defaultBlog]

  return (
    <section className="resources-blog-list">
      <div className="resources-blog-list-container">
        {list.map((blog, index) => (
          <ResourcesBlogCard
            key={index}
            title={blog.title}
            date={blog.date}
            description={blog.description}
            link={blog.link}
            image={blog.image}
          />
        ))}
      </div>
    </section>
  )
}

export default ResourcesBlogList
