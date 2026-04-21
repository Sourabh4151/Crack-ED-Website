import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import './ResourcesFilter.css'

const CATEGORIES = [
  { id: 'interview', label: 'Interview' },
  { id: 'upskilling', label: 'Upskilling' },
  { id: 'career', label: 'Career' },
]

const tagMatchesCategory = (tags, categoryId) => {
  if (!categoryId || categoryId === 'all') return true
  return (tags || []).some((t) => String(t).toLowerCase() === categoryId)
}

const ResourcesFilter = ({ blogCards = [], activeCategory = 'all', onCategoryChange }) => {
  const [active, setActive] = useState(activeCategory)

  const filteredCards = useMemo(
    () => blogCards.filter((c) => tagMatchesCategory(c.tags, active)),
    [blogCards, active]
  )

  const handleClick = (id) => {
    setActive(id)
    onCategoryChange?.(id)
  }

  return (
    <section className="resources-filter">
      <div className="resources-filter-inner">
        {/* Frame 549: vertical flow, 1200px fill, gap 24px */}
        <div className="resources-filter-frame" role="tablist" aria-label="Filter blogs by category">
          {/* Row 1: All Blogs — simple badge (not a button) */}
          <div className="resources-filter-row resources-filter-row--all">
            <span className="resources-filter-all-badge">All Blogs</span>
          </div>
          {/* Row 2: Interview, Upskilling, Career — horizontal, gap 24px, hug 35px */}
          <div className="resources-filter-row resources-filter-row--categories">
            {CATEGORIES.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active === id}
                className={`resources-filter-category ${active === id ? 'resources-filter-category--active' : ''}`}
                onClick={() => handleClick(id)}
              >
                {label}
              </button>
            ))}
          </div>
          {/* Row 3: Blog cards grid (Frame 519) — below Interview Upskilling Career */}
          <div className="resources-filter-grid" aria-label="Blog posts">
            {filteredCards.map((card) => (
              <article key={`${card.source || 'x'}-${card.id}`} className="resources-filter-card">
                <div className="resources-filter-card-image">
                  <img src={card.image} alt="" />
                </div>
                <div className="resources-filter-card-content">
                  <h2 className="resources-filter-card-title">{card.title}</h2>
                  <time className="resources-filter-card-date">{card.date}</time>
                  <div className="resources-filter-card-tags">
                    {(card.tags || []).map((tag) => (
                      <span key={tag} className="resources-filter-card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {card.excerpt ? (
                    <p className="resources-filter-card-excerpt">{card.excerpt}</p>
                  ) : null}
                  <div className="resources-filter-card-footer">
                    <div className="resources-filter-card-divider" aria-hidden="true" />
                    <Link
                      to={`/resources/blog/${card.id}`}
                      className="resources-filter-card-read-more"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResourcesFilter
