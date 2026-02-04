import React, { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header/Header'
import EnquireSection from '../components/EnquireSection/EnquireSection'
import ExploreOtherBlogs from '../components/ExploreOtherBlogs/ExploreOtherBlogs'
import Footer from '../components/Footer/Footer'
import { BLOG_POSTS } from '../data/blogPosts'
import './BlogPost.css'

const INTRO_TERMS = ['Property Evaluation (Tech Underwriting)', 'Credit Underwriting', 'Legal Underwriting', '(Tech Underwriting)', 'Tech Underwriting']

function wrapIntroTerms (text) {
  if (typeof text !== 'string') return [text]
  const segments = []
  let remaining = text
  let key = 0
  while (remaining.length > 0) {
    let found = false
    for (const term of INTRO_TERMS) {
      const idx = remaining.indexOf(term)
      if (idx !== -1) {
        if (idx > 0) segments.push(remaining.slice(0, idx))
        segments.push(<span key={`intro-${key++}`} className="blog-post-term-intro">{term}</span>)
        remaining = remaining.slice(idx + term.length)
        found = true
        break
      }
    }
    if (!found) {
      segments.push(remaining)
      break
    }
  }
  return segments.length > 0 ? segments : [text]
}

const BlogPost = () => {
  const { id } = useParams()
  const post = BLOG_POSTS.find((p) => p.id === id)
  const [tocExpanded, setTocExpanded] = useState(true)
  const [activeTocIndex, setActiveTocIndex] = useState(0)
  const scrollRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [id])

  useEffect(() => {
    if (!post?.toc?.length || !scrollRef.current) return
    const sections = scrollRef.current.querySelectorAll('[data-toc-section]')
    sections.forEach((el, i) => {
      el.id = `toc-${i}`
      el.setAttribute('data-toc-index', String(i))
    })
  }, [id, post?.toc?.length])

  useEffect(() => {
    if (!post?.toc?.length || !scrollRef.current) return
    const scrollEl = scrollRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const idx = parseInt(entry.target.getAttribute('data-toc-index'), 10)
            if (!Number.isNaN(idx)) setActiveTocIndex(idx)
        }
      },
      { root: scrollEl, rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    )
    const nodes = scrollRef.current.querySelectorAll('[data-toc-index]')
    nodes.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [id, post?.toc?.length])

  if (!post) {
    return (
      <div className="blog-post-page">
        <Header />
        <div className="blog-post-scroll">
          <div className="blog-post-not-found">
            <p>Blog post not found.</p>
          <Link to="/resources" className="blog-post-back">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to All Blogs
          </Link>
          </div>
          <Footer />
        </div>
      </div>
    )
  }

  return (
    <div className="blog-post-page">
      <Header />
      <div className="blog-post-scroll" ref={scrollRef}>
        <article className="blog-post">
          <div className="blog-post-inner">
            <Link to="/resources" className="blog-post-back" aria-label="Back to blog listing">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to All Blogs
            </Link>
            <div className="blog-post-badges">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-post-badge">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="blog-post-title">{post.title}</h1>
            <time className="blog-post-date">{post.date}</time>
            {post.author && (
              <p className="blog-post-author">Author – {post.author}</p>
            )}
            <div className="blog-post-body">
              <div className="blog-post-content">
                {post.videoUrl && (() => {
                  try {
                    const url = new URL(post.videoUrl)
                    const v = url.searchParams.get('v')
                    const t = url.searchParams.get('t')
                    if (!v) return null
                    const start = t ? `?start=${parseInt(String(t).replace(/s$/, ''), 10) || 0}` : ''
                    const embedSrc = `https://www.youtube.com/embed/${v}${start}`
                    return (
                      <div className="blog-post-video-wrap">
                        <iframe
                          src={embedSrc}
                          title="YouTube video"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="blog-post-video"
                        />
                      </div>
                    )
                  } catch {
                    return null
                  }
                })()}
                <div className="blog-post-text">
                  {post.content.split('\n\n').map((para, i) => {
                    const isIntroHeading = i === 0 && para.trim() === 'Introduction'
                    const isFirstSection = i === 0 && post.id !== '4' && post.id !== '5'
                    return (
                      <p key={i} data-toc-section={isFirstSection ? '' : undefined} className={isIntroHeading ? 'blog-post-intro-heading' : undefined}>
                        {para}
                      </p>
                    )
                  })}
                </div>
                {!(post.id === '6' && !post.bodyImage) && (
                  <div className="blog-post-image-wrap">
                    <img src={post.bodyImage || post.image} alt="" className="blog-post-image" />
                  </div>
                )}
                {post.contentAfterImage ? (
                  <div className="blog-post-text">
                    {post.contentAfterImage.split('\n\n').map((para, i) => {
                      const isEmergingTrends = para.trim() === 'Emerging Trends and In-Demand Skills'
                      const isKeySkills = para.trim() === 'Key Skills Gained from a Banking Course'
                      const isShortTitle = para.trim().length < 80
                      const isHeading = (i === 0 && isShortTitle) || isKeySkills || isEmergingTrends
                      const isTocSection = (i === 0 && isShortTitle) || isKeySkills || isEmergingTrends
                      return (
                        <p key={i} data-toc-section={isTocSection ? '' : undefined} className={isHeading ? 'blog-post-intro-heading' : undefined}>
                          {wrapIntroTerms(para)}
                        </p>
                      )
                    })}
                  </div>
                ) : (
                  <div className="blog-post-text">
                    {post.content.split('\n\n').slice(0, 2).map((para, i) => (
                      <p key={i} className={i === 0 ? 'blog-post-intro-heading' : undefined}>
                        {para}
                      </p>
                    ))}
                  </div>
                )}
                {post.bodyImage2 && (
                  <div className={`blog-post-image-wrap${post.id === '5' ? ' blog-post-image-wrap--constrained' : ''}`}>
                    <img src={post.bodyImage2} alt="Career paths in banking" className="blog-post-image" />
                  </div>
                )}
                {post.contentAfterImage2 && (() => {
                  const parts = post.contentAfterImage2.split('\n\n').map((p) => p.trim()).filter(Boolean)
                  const rolePattern = /^(Bank Officer|Credit Associate|Legal Associate|Tech Associate): (.+)$/
                  const listItems = parts.filter((p) => rolePattern.test(p))
                  const nonListParts = parts.filter((p) => !rolePattern.test(p))
                  const heading = nonListParts[0]
                  if (listItems.length === 0) {
                    if (nonListParts.length === 1) {
                      return (
                        <div className="blog-post-text">
                          <p data-toc-section="">{nonListParts[0]}</p>
                        </div>
                      )
                    }
                    if (post.id === '4' && nonListParts.length >= 3) {
                      return (
                        <div className="blog-post-text">
                          <p>{nonListParts[0]}</p>
                          <p data-toc-section="" className="blog-post-intro-heading">{nonListParts[1]}</p>
                          {nonListParts.slice(2).map((para, i) => (
                            <p key={i}>{para}</p>
                          ))}
                        </div>
                      )
                    }
                    return (
                      <div className="blog-post-text">
                        <p data-toc-section="" className="blog-post-intro-heading">{heading}</p>
                        {nonListParts.slice(1).map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                    )
                  }
                  const intro = nonListParts[1]
                  const closing = nonListParts[nonListParts.length - 1]
                  return (
                    <div className="blog-post-text">
                      <p data-toc-section="" className="blog-post-intro-heading">{heading}</p>
                      <p>{intro}</p>
                      <ul className="blog-post-role-list">
                        {listItems.map((item, i) => {
                          const match = item.match(rolePattern)
                          if (!match) return null
                          const [, title, description] = match
                          return (
                            <li key={i}>
                              <strong className="blog-post-role-title">{title}</strong>: {description}
                            </li>
                          )
                        })}
                      </ul>
                      <p>{closing}</p>
                    </div>
                  )
                })()}
                {post.bodyImage3 && (
                  <div className={`blog-post-image-wrap${post.id === '5' ? ' blog-post-image-wrap--constrained' : ''}`}>
                    <img src={post.bodyImage3} alt="Real world case study" className="blog-post-image" />
                  </div>
                )}
                {post.contentAfterImage3 && (
                  <div className="blog-post-text">
                    {post.contentAfterImage3.split('\n\n').map((para, i) => (
                      <p key={i} data-toc-section={i === 0 && post.id !== '5' ? '' : undefined} className={i === 0 && post.id !== '5' ? 'blog-post-intro-heading' : undefined}>
                        {para}
                      </p>
                    ))}
                  </div>
                )}
                {post.bodyImage4 && (
                  <div className="blog-post-image-wrap">
                    <img src={post.bodyImage4} alt="Best job placement success" className="blog-post-image" />
                  </div>
                )}
                {post.contentAfterImage4 && (
                  <div className="blog-post-text">
                    {post.id === '5'
                      ? (() => {
                          const parts = post.contentAfterImage4.split('\n\n').map((p) => p.trim()).filter(Boolean)
                          return parts.map((para, i) =>
                            i === 1 ? (
                              <p key={i} data-toc-section="" className="blog-post-intro-heading">{para}</p>
                            ) : (
                              <p key={i}>{para}</p>
                            )
                          )
                        })()
                      : post.contentAfterImage4.split('\n\n').map((para, i) => (
                          <p key={i} data-toc-section={i === 0 && post.id !== '4' ? '' : undefined} className={i === 0 && post.id !== '4' ? 'blog-post-intro-heading' : undefined}>
                            {para}
                          </p>
                        ))}
                  </div>
                )}
                {post.bodyImage5 && (
                  <div className="blog-post-image-wrap">
                    <img src={post.bodyImage5} alt="" className="blog-post-image" />
                  </div>
                )}
                {post.contentAfterImage5 && (
                  <div className="blog-post-text">
                    {post.id === '4'
                      ? (() => {
                          const parts = post.contentAfterImage5.split('\n\n').map((p) => p.trim()).filter(Boolean)
                          return parts.map((para, i) =>
                            i === 1 ? (
                              <p key={i} data-toc-section="" className="blog-post-intro-heading">{para}</p>
                            ) : (
                              <p key={i}>{para}</p>
                            )
                          )
                        })()
                      : post.contentAfterImage5.split('\n\n').map((para, i) => (
                          <p key={i} data-toc-section={i === 0 ? '' : undefined} className={i === 0 ? 'blog-post-intro-heading' : undefined}>
                            {para}
                          </p>
                        ))}
                  </div>
                )}
                {post.contentAfterImage6 && (
                  <div className="blog-post-text blog-post-cta">
                    {post.contentAfterImage6.split('\n\n').map((para, i) => (
                      <p key={i} data-toc-section={i === 0 ? '' : undefined} className={i === 0 ? 'blog-post-intro-heading' : undefined}>
                        {para}
                      </p>
                    ))}
                    {post.ctaLinks && post.ctaLinks.length > 0 && (
                      <div className="blog-post-cta-links" data-toc-section="">
                        {post.ctaLinks.map((cta, i) => (
                          <a key={i} href={cta.href} className="blog-post-cta-link">
                            {cta.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {post.bodyImage6 && (
                  <div className="blog-post-image-wrap">
                    <img src={post.bodyImage6} alt="" className="blog-post-image" />
                  </div>
                )}
                {post.contentAfterImage7 && (
                  <div className="blog-post-text">
                    {post.contentAfterImage7.split('\n\n').map((para, i) => (
                      <p key={i} data-toc-section={i === 0 ? '' : undefined} className={i === 0 ? 'blog-post-intro-heading' : undefined}>
                        {para}
                      </p>
                    ))}
                  </div>
                )}
                {post.contentAfterImage8 && (
                  <div className="blog-post-text">
                    {post.contentAfterImage8.split('\n\n').map((para, i) => (
                      <p key={i} data-toc-section={i === 0 ? '' : undefined} className={i === 0 ? 'blog-post-intro-heading' : undefined}>
                        {para}
                      </p>
                    ))}
                  </div>
                )}
                {post.bodyImage8 && (
                  <div className="blog-post-image-wrap">
                    <img src={post.bodyImage8} alt="" className="blog-post-image" />
                  </div>
                )}
                {post.contentAfterImage9 && (
                  <div className="blog-post-text">
                    {post.contentAfterImage9.split('\n\n').map((para, i) => (
                      <p key={i} data-toc-section={i === 0 ? '' : undefined} className={i === 0 ? 'blog-post-intro-heading' : undefined}>
                        {para}
                      </p>
                    ))}
                  </div>
                )}
                {post.contentAfterImage10 && (
                  <div className="blog-post-text">
                    {post.contentAfterImage10.split('\n\n').map((para, i) => (
                      <p key={i} data-toc-section={i === 0 ? '' : undefined} className={i === 0 ? 'blog-post-intro-heading' : undefined}>
                        {para}
                      </p>
                    ))}
                  </div>
                )}
                {post.toc?.length > 10 && (
                  <div data-toc-section="" aria-hidden="true" style={{ height: 0, overflow: 'hidden' }} />
                )}
              </div>
              <aside className={`blog-post-toc${!tocExpanded ? ' blog-post-toc--collapsed' : ''}`} aria-label="Table of contents">
                <div className="blog-post-toc-header">
                  <h2 className="blog-post-toc-title">Table of Content</h2>
                  <button
                    type="button"
                    className="blog-post-toc-toggle"
                    aria-expanded={tocExpanded}
                    aria-label={tocExpanded ? 'Collapse table of contents' : 'Expand table of contents'}
                    onClick={() => setTocExpanded((v) => !v)}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div className="blog-post-toc-list-wrap" style={{ display: tocExpanded ? undefined : 'none' }}>
                  <ol className={`blog-post-toc-list${post.tocNumbers ? ' blog-post-toc-list--custom' : ''}`}>
                    {post.toc.map((item, i) => {
                      const num = post.tocNumbers && post.tocNumbers[i]
                      const numLabel = num !== undefined && num !== '' ? `${num}. ` : ''
                      return (
                        <li key={i} className={activeTocIndex === i ? 'active' : ''}>
                          {post.tocNumbers && <span className="blog-post-toc-num">{numLabel}</span>}
                          <a href={`#toc-${i}`} onClick={(e) => { e.preventDefault(); document.getElementById(`toc-${i}`)?.scrollIntoView({ behavior: 'smooth' }) }}>
                            {item}
                          </a>
                        </li>
                      )
                    })}
                  </ol>
                </div>
              </aside>
            </div>
          </div>
        </article>
        <div className="blog-post-end-line" aria-hidden="true" />
        <ExploreOtherBlogs currentPostId={post.id} />
        {post.toc?.length && post.toc[post.toc.length - 1] === 'Enquire Now' && !post.ctaLinks ? (
          <div data-toc-section="">
            <EnquireSection />
          </div>
        ) : (
          <EnquireSection />
        )}
        <Footer />
      </div>
    </div>
  )
}

export default BlogPost
