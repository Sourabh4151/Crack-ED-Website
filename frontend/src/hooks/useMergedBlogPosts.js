import { useEffect, useMemo, useState } from 'react'
import { BLOG_POSTS } from '../data/blogPosts'
import { fetchPublishedMarketingBlogs, marketingBlogToCard } from '../services/blogApi'

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

  return { cards, loading }
}
