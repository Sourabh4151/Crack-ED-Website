import { useEffect, useMemo, useState } from 'react'
import { BLOG_POSTS } from '../data/blogPosts'
import { fetchPublishedMarketingBlogs, marketingBlogToCard, prefetchMarketingBlogCard } from '../services/blogApi'

function buildStaticBlogCards () {
  return BLOG_POSTS.filter((p) => !p.hideFromResources).map((p) => ({
    id: p.id,
    title: p.title,
    date: p.date,
    tags: p.tags || [],
    image: p.image,
    excerpt: typeof p.excerpt === 'string' && p.excerpt.trim() ? p.excerpt.trim() : undefined,
    hideFromResources: false,
    source: 'static',
  }))
}

/**
 * API-published blogs first, then legacy static posts (excluding hideFromResources on static).
 * Static cards render immediately so /resources is never empty while the API is slow.
 */
export function useMergedBlogPosts () {
  const staticCards = useMemo(() => buildStaticBlogCards(), [])
  const [cards, setCards] = useState(staticCards)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      let apiCards = []
      try {
        const raw = await fetchPublishedMarketingBlogs()
        apiCards = raw
          .filter((b) => !b.hide_from_resources)
          .map(marketingBlogToCard)
      } catch {
        apiCards = []
      }
      if (!cancelled) {
        setCards([...apiCards, ...staticCards])
        setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [staticCards])

  useEffect(() => {
    const apiCards = cards.filter((c) => c.source === 'api')
    if (apiCards.length === 0) return
    const slugs = apiCards.map((c) => c.id)
    slugs.slice(0, 10).forEach((slug) => prefetchMarketingBlogCard({ source: 'api', id: slug }))
    const rest = slugs.slice(10)
    if (rest.length === 0) return
    const run = () => rest.forEach((slug) => prefetchMarketingBlogCard({ source: 'api', id: slug }))
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(run, { timeout: 4000 })
    } else {
      setTimeout(run, 300)
    }
  }, [cards])

  return { cards, loading }
}
