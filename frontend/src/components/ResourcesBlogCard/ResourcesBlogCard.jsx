import React from 'react'
import { Link } from 'react-router-dom'
import beginnerImage from '../../assets/beginner.jpg'
import { prefetchMarketingBlogDetail } from '../../services/blogApi'
import './ResourcesBlogCard.css'

const ResourcesBlogCard = ({ title, date, description, link, image, prefetchBlogSlug }) => {
  const prefetchHandlers = prefetchBlogSlug
    ? {
        onMouseEnter: () => prefetchMarketingBlogDetail(prefetchBlogSlug),
        onFocus: () => prefetchMarketingBlogDetail(prefetchBlogSlug),
        onTouchStart: () => prefetchMarketingBlogDetail(prefetchBlogSlug),
      }
    : {}
  const isExternal = link?.startsWith('http')
  const readMore = isExternal ? (
    <a href={link} className="resources-blog-card-read-more" target="_blank" rel="noopener noreferrer" aria-label={title ? `Read ${title}` : 'Read more'}>
      Read More
    </a>
  ) : (
    <Link to={link || '/resources/blog/1'} className="resources-blog-card-read-more" aria-label={title ? `Read ${title}` : 'Read more'} {...prefetchHandlers}>
      Read More
    </Link>
  )

  return (
    <article className="resources-blog-card">
      <div className="resources-blog-card-image">
        <img src={image || beginnerImage} alt={title || ''} />
      </div>
      <div className="resources-blog-card-content">
        <h2 className="resources-blog-card-title">{title}</h2>
        <time className="resources-blog-card-date">{date}</time>
        <p className="resources-blog-card-description">{description}</p>
        {readMore}
      </div>
    </article>
  )
}

export default ResourcesBlogCard
