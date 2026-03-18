import React from 'react'
import { Link } from 'react-router-dom'
import { BLOG_POSTS } from '../../data/blogPosts'
import '../ResourcesFilter/ResourcesFilter.css'
import './ExploreOtherBlogs.css'

const ExploreOtherBlogs = ({ currentPostId }) => {
  const otherPosts = BLOG_POSTS.filter((p) => p.id !== currentPostId && !p.hideFromResources).slice(0, 3)

  if (otherPosts.length === 0) return null

  return (
    <section className="explore-other-blogs" aria-label="Explore other blogs">
      <div className="explore-other-blogs-inner">
        <h2 className="explore-other-blogs-heading">Explore Other Blogs</h2>
        <div className="explore-other-blogs-grid resources-filter-grid">
          {otherPosts.map((post) => (
            <Link
              key={post.id}
              to={`/resources/blog/${post.id}`}
              className="explore-other-blogs-card-link"
            >
              <article className="resources-filter-card">
                <div className="resources-filter-card-image">
                  <img src={post.image} alt="" />
                </div>
                <div className="resources-filter-card-content">
                  <h2 className="resources-filter-card-title">{post.title}</h2>
                  <time className="resources-filter-card-date">{post.date}</time>
                  <div className="resources-filter-card-tags">
                    {post.tags?.map((tag) => (
                      <span key={tag} className="resources-filter-card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="resources-filter-card-footer">
                    <div className="resources-filter-card-divider" aria-hidden="true" />
                    <span className="resources-filter-card-read-more">Read More</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExploreOtherBlogs
