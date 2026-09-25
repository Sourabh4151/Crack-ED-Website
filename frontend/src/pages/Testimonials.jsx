import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import SEO from '../components/SEO/SEO'
import { PAGE_SEO, SITE_NAME, canonicalFor } from '../seo/site'
import { fetchPublishedTestimonials } from '../services/testimonialApi'
import './Testimonials.css'

const AVATAR_COLORS = ['#0a66c2', '#7c3aed', '#0f766e', '#b45309', '#be123c', '#1d4ed8', '#047857']

function initialOf (name) {
  const trimmed = (name || '').trim()
  return trimmed ? trimmed.charAt(0).toUpperCase() : '?'
}

function colorFor (name) {
  const text = name || ''
  let hash = 0
  for (let i = 0; i < text.length; i += 1) hash = (hash + text.charCodeAt(i)) % AVATAR_COLORS.length
  return AVATAR_COLORS[hash]
}

function Stars ({ rating }) {
  const count = Math.max(1, Math.min(5, Number(rating) || 5))
  return (
    <div className="testimonials-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < count ? 'is-on' : ''}>★</span>
      ))}
    </div>
  )
}

function LinkedInMark () {
  return (
    <svg className="testimonials-li-logo" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="3" fill="#0A66C2" />
      <path fill="#fff" d="M6.7 9.3H4.4V19h2.3V9.3zM5.55 4.6A1.35 1.35 0 1 0 5.56 7.3 1.35 1.35 0 0 0 5.55 4.6zM19.6 19h-2.3v-4.7c0-1.12-.02-2.56-1.56-2.56-1.56 0-1.8 1.22-1.8 2.48V19H11.6V9.3h2.2v1.32h.03c.31-.58 1.06-1.2 2.18-1.2 2.33 0 2.76 1.53 2.76 3.52V19z" />
    </svg>
  )
}

function GoogleMark () {
  return (
    <svg className="testimonials-g-logo" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z" />
      <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.4 14.4A7.2 7.2 0 0 1 5 12c0-.8.1-1.6.4-2.4V6.5H1.4A12 12 0 0 0 0 12c0 1.9.5 3.8 1.4 5.5l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4C17.9 1.1 15.2 0 12 0 7.3 0 3.2 2.7 1.4 6.5l4 3.1C6.3 6.9 8.9 4.8 12 4.8z" />
    </svg>
  )
}

function Avatar ({ item }) {
  if (item.profile_image_url) {
    return <img className="testimonials-avatar" src={item.profile_image_url} alt="" />
  }
  return (
    <span className="testimonials-avatar testimonials-avatar--letter" style={{ background: colorFor(item.name) }}>
      {initialOf(item.name)}
    </span>
  )
}

function linkedInEmbedSrc (postUrl) {
  const raw = (postUrl || '').trim()
  if (!raw) return ''
  let url
  try {
    url = new URL(raw)
  } catch {
    return ''
  }
  if (!/(^|\.)linkedin\.com$/i.test(url.hostname)) return ''
  if (url.pathname.startsWith('/embed/feed/update/')) return url.href
  const urn = `${url.pathname}${url.search}`.match(/urn:li:(activity|share|ugcPost):(\d+)/)
  if (urn) return `https://www.linkedin.com/embed/feed/update/urn:li:${urn[1]}:${urn[2]}`
  const activity = url.pathname.match(/activity[:-](\d{8,})/)
  if (activity) return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activity[1]}`
  const ugc = url.pathname.match(/ugcPost[:-](\d{8,})/)
  if (ugc) return `https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:${ugc[1]}`
  const share = url.pathname.match(/share[:-](\d{8,})/)
  if (share) return `https://www.linkedin.com/embed/feed/update/urn:li:share:${share[1]}`
  return ''
}

function LinkedInCard ({ item }) {
  const embedSrc = linkedInEmbedSrc(item.source_url)
  if (!embedSrc) {
    return item.source_url ? (
      <a className="testimonials-li-link" href={item.source_url} target="_blank" rel="noreferrer">
        <LinkedInMark />
        View post on LinkedIn
      </a>
    ) : null
  }
  return (
    <article className="testimonials-li-card">
      <iframe
        className="testimonials-li-embed"
        src={embedSrc}
        title={item.name ? `${item.name} on LinkedIn` : 'LinkedIn post'}
        loading="lazy"
        allowFullScreen
      />
      <a className="testimonials-li-link" href={item.source_url} target="_blank" rel="noreferrer">
        <LinkedInMark />
        View post on LinkedIn
      </a>
    </article>
  )
}

function GoogleCard ({ item }) {
  const card = (
    <>
      <header className="testimonials-g-head">
        <Avatar item={item} />
        <p className="testimonials-g-name">{item.name}</p>
        <GoogleMark />
      </header>
      <Stars rating={item.rating} />
      <p className="testimonials-g-body">{item.body}</p>
    </>
  )
  if (!item.source_url) return <article className="testimonials-g-card">{card}</article>
  return (
    <a className="testimonials-g-card" href={item.source_url} target="_blank" rel="noreferrer">
      {card}
    </a>
  )
}

function testimonialsJsonLd (reviews) {
  const url = canonicalFor(PAGE_SEO.testimonials.path)
  const reviewItems = reviews
    .filter((item) => item.name && item.body)
    .map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Review',
        author: { '@type': 'Person', name: item.name },
        reviewBody: item.body,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: String(item.rating || 5),
          bestRating: '5',
        },
        url: item.source_url || url,
        itemReviewed: {
          '@type': 'EducationalOrganization',
          name: SITE_NAME,
          url: canonicalFor('/'),
        },
      },
    }))

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: PAGE_SEO.testimonials.title,
    description: PAGE_SEO.testimonials.description,
    url,
    mainEntity: reviewItems.length
      ? { '@type': 'ItemList', itemListElement: reviewItems }
      : undefined,
  }
}

const Testimonials = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const data = await fetchPublishedTestimonials()
      if (!cancelled) {
        setItems(data)
        setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const linkedin = items.filter((item) => item.kind === 'linkedin')
  const google = items.filter((item) => item.kind === 'google')

  return (
    <div className="testimonials-page">
      <SEO
        title={PAGE_SEO.testimonials.title}
        description={PAGE_SEO.testimonials.description}
        path={PAGE_SEO.testimonials.path}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Testimonials', path: '/testimonials' },
        ]}
        jsonLd={testimonialsJsonLd(google)}
      />
      <Header />
      <main>
        <section className="testimonials-block">
          <div className="testimonials-wrap">
            <h1>Not Our Words. Their Experience.</h1>
            <p className="testimonials-lead">
              See what our learners and alumni are saying about their Crack-ED journey on LinkedIn.
            </p>
            {loading ? <p className="testimonials-empty">Loading reviews…</p> : null}
            {!loading && linkedin.length === 0 ? (
              <p className="testimonials-empty">LinkedIn posts will show up here once they are published.</p>
            ) : null}
            <div className="testimonials-li-grid">
              {linkedin.map((item) => <LinkedInCard key={item.id} item={item} />)}
            </div>
          </div>
        </section>

        <section className="testimonials-block testimonials-block--google">
          <div className="testimonials-wrap">
            <h2>They Said It. We Saved It.</h2>
            <p className="testimonials-lead">
              Search Crack-ED on Google and you&apos;ll find these reviews. We just saved you the click.
            </p>
            {!loading && google.length === 0 ? (
              <p className="testimonials-empty">Google reviews will show up here once they are published.</p>
            ) : null}
            <div className="testimonials-g-grid">
              {google.map((item) => <GoogleCard key={item.id} item={item} />)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Testimonials
