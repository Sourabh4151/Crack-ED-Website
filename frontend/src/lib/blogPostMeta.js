import { SITE_URL, DEFAULT_TITLE } from '../seo/site'

/**
 * @param {{ pageTitle?: string, description?: string }} opts
 */
export function staticSeoDescription (post) {
  const raw = (post?.content || '').split(/\n\n/)[0] || ''
  const plain = raw.replace(/\s+/g, ' ').trim()
  if (!plain) return post?.title || DEFAULT_TITLE
  return plain.length > 160 ? `${plain.slice(0, 157)}…` : plain
}

/** Absolute URL for og:image when the app only has a root-relative path. */
export function absolutizeMediaUrl (url) {
  if (!url) return ''
  if (/^https?:\/\//i.test(url)) return url
  try {
    return new URL(url, SITE_URL).href
  } catch {
    return url
  }
}
