/**
 * In-memory cache + single-flight for public marketing blog detail JSON.
 * Makes repeat visits, listing→post navigation, and admin "View" feel instant.
 */
import { getApiBase } from './crmService'

const TTL_MS = 10 * 60 * 1000

const cache = new Map()
const inflight = new Map()

function normKey (lookup) {
  return String(lookup || '').trim().toLowerCase()
}

export function peekMarketingBlogDetailCache (lookup) {
  const k = normKey(lookup)
  const e = cache.get(k)
  if (!e) return null
  if (Date.now() - e.ts > TTL_MS) {
    cache.delete(k)
    return null
  }
  return e.data
}

export function seedMarketingBlogDetailCache (lookup, data) {
  if (!data || typeof data !== 'object') return
  const k = normKey(lookup || data.slug)
  cache.set(k, { data, ts: Date.now() })
}

export function invalidateMarketingBlogDetailCache (lookup) {
  cache.delete(normKey(lookup))
}

async function fetchUncached (lookup) {
  const base = getApiBase()
  if (!base) throw new Error('API not configured')
  const r = await fetch(`${base}/api/blogs/detail/${encodeURIComponent(lookup)}/`, {
    cache: 'no-store',
  })
  if (!r.ok) throw new Error('Not found')
  return r.json()
}

export async function fetchMarketingBlogDetailWithCache (lookup) {
  const hit = peekMarketingBlogDetailCache(lookup)
  if (hit) return hit

  const k = normKey(lookup)
  let p = inflight.get(k)
  if (!p) {
    p = fetchUncached(lookup)
      .then((data) => {
        cache.set(k, { data, ts: Date.now() })
        inflight.delete(k)
        return data
      })
      .catch((err) => {
        inflight.delete(k)
        throw err
      })
    inflight.set(k, p)
  }
  return p
}

export function prefetchMarketingBlogDetail (lookup) {
  if (!getApiBase()) return
  if (peekMarketingBlogDetailCache(lookup)) return
  void fetchMarketingBlogDetailWithCache(lookup).catch(() => {})
}
