const DEFAULT_DOCUMENT_TITLE = 'CRACK-ED - Upskill Today, Crack the World Tomorrow'

const managedNodes = new Set()

/**
 * @param {{ pageTitle: string, description?: string, imageUrl?: string }} opts
 */
export function applyBlogPostMeta ({ pageTitle, description, imageUrl }) {
  document.title = pageTitle || DEFAULT_DOCUMENT_TITLE

  const desc = (description || '').trim() || pageTitle || ''
  const clipped = desc.length > 320 ? `${desc.slice(0, 317)}…` : desc

  let metaDesc = document.querySelector('meta[name="description"]')
  if (!metaDesc) {
    metaDesc = document.createElement('meta')
    metaDesc.setAttribute('name', 'description')
    document.head.appendChild(metaDesc)
  }
  managedNodes.add(metaDesc)
  metaDesc.setAttribute('content', clipped)

  const ensureOg = (property, content) => {
    if (!content) return
    let node = document.querySelector(`meta[property="${property}"]`)
    if (!node) {
      node = document.createElement('meta')
      node.setAttribute('property', property)
      document.head.appendChild(node)
    }
    managedNodes.add(node)
    node.setAttribute('content', content)
  }

  ensureOg('og:title', pageTitle)
  ensureOg('og:description', clipped)
  ensureOg('og:type', 'article')
  if (imageUrl) ensureOg('og:image', imageUrl)

  let tw = document.querySelector('meta[name="twitter:card"]')
  if (!tw) {
    tw = document.createElement('meta')
    tw.setAttribute('name', 'twitter:card')
    document.head.appendChild(tw)
  }
  managedNodes.add(tw)
  tw.setAttribute('content', imageUrl ? 'summary_large_image' : 'summary')
}

export function clearBlogPostMeta () {
  document.title = DEFAULT_DOCUMENT_TITLE
  managedNodes.forEach((el) => {
    try {
      el.remove()
    } catch {
      /* ignore */
    }
  })
  managedNodes.clear()
}

export function staticSeoDescription (post) {
  const raw = (post?.content || '').split(/\n\n/)[0] || ''
  const plain = raw.replace(/\s+/g, ' ').trim()
  if (!plain) return post?.title || ''
  return plain.length > 160 ? `${plain.slice(0, 157)}…` : plain
}

/** Absolute URL for og:image when the app only has a root-relative path. */
export function absolutizeMediaUrl (url) {
  if (!url || typeof window === 'undefined') return url || ''
  if (/^https?:\/\//i.test(url)) return url
  try {
    return new URL(url, window.location.origin).href
  } catch {
    return url
  }
}
