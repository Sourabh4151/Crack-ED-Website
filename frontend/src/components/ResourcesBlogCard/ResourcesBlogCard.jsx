import React, { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import beginnerImage from '../../assets/beginner.jpg'
import { prefetchMarketingBlogDetail } from '../../services/blogApi'
import './ResourcesBlogCard.css'

const ResourcesBlogCard = ({ title, date, description, link, image, prefetchBlogSlug }) => {
  const cardRef = useRef(null)

  useLayoutEffect(() => {
    const card = cardRef.current
    if (!card) return
    const content = card.querySelector('.resources-blog-card-content')
    if (!content) return

    const desktopQuery = window.matchMedia('(min-width: 1025px)')
    const gap = 24
    const minTextWidth = 380
    let stayStacked = false
    let lastCardWidth = 0

    const clearRowWidth = () => {
      card.style.removeProperty('--resources-blog-image-width')
    }

    const syncImageWidth = () => {
      const cardWidth = Math.round(card.clientWidth)
      const widthChanged = Math.abs(cardWidth - lastCardWidth) > 2
      lastCardWidth = cardWidth

      if (!desktopQuery.matches) {
        stayStacked = false
        card.classList.remove('resources-blog-card--stacked')
        clearRowWidth()
        return
      }

      const maxImageWidth = cardWidth - gap - minTextWidth
      if (maxImageWidth < 480 || (stayStacked && !widthChanged)) {
        stayStacked = true
        card.classList.add('resources-blog-card--stacked')
        clearRowWidth()
        return
      }

      card.classList.remove('resources-blog-card--stacked')

      for (let pass = 0; pass < 6; pass += 1) {
        const ideal = Math.ceil(content.getBoundingClientRect().height * (16 / 9))
        if (ideal > maxImageWidth) {
          stayStacked = true
          card.classList.add('resources-blog-card--stacked')
          clearRowWidth()
          return
        }

        const current = Number.parseFloat(card.style.getPropertyValue('--resources-blog-image-width')) || 0
        if (Math.abs(current - ideal) <= 1) {
          stayStacked = false
          return
        }
        card.style.setProperty('--resources-blog-image-width', `${ideal}px`)
      }
    }

    syncImageWidth()
    const observer = new ResizeObserver(syncImageWidth)
    observer.observe(content)
    desktopQuery.addEventListener('change', syncImageWidth)
    window.addEventListener('resize', syncImageWidth)

    return () => {
      observer.disconnect()
      desktopQuery.removeEventListener('change', syncImageWidth)
      window.removeEventListener('resize', syncImageWidth)
    }
  }, [title, description, date, image])

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
    <article className="resources-blog-card" ref={cardRef}>
      <div className="resources-blog-card-image">
        <img src={image || beginnerImage} alt={title || ''} width="400" height="240" loading="lazy" decoding="async" />
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
