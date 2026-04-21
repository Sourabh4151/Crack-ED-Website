import { useEffect, useState } from 'react'
import { BLOG_POSTS } from '../data/blogPosts'
import { fetchPublishedMarketingBlogs, marketingBlogToCard } from '../services/blogApi'

/**
 * API-published blogs first, then legacy static posts (excluding hideFromResources on static).
 */
export function useMergedBlogPosts () {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const staticCards = BLOG_POSTS.filter((p) => !p.hideFromResources).map((p) => ({
        id: p.id,
        title: p.title,
        date: p.date,
        tags: p.tags || [],
        image: p.image,
        excerpt: typeof p.excerpt === 'string' && p.excerpt.trim() ? p.excerpt.trim() : undefined,
        hideFromResources: false,
        source: 'static',
      }))
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
  }, [])

  return { cards, loading }
}
