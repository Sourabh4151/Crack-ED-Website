import { useEffect } from 'react'
import {
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  canonicalFor,
  organizationJsonLd,
  websiteJsonLd,
  breadcrumbJsonLd,
} from '../../seo/site'

const JSON_LD_ATTR = 'data-seo-jsonld'

function upsertMeta (attr, key, content) {
  const selector = `meta[${attr}="${key}"]`
  let node = document.head.querySelector(selector)
  if (!content) {
    if (node) node.remove()
    return
  }
  if (!node) {
    node = document.createElement('meta')
    node.setAttribute(attr, key)
    document.head.appendChild(node)
  }
  node.setAttribute('content', content)
}

function upsertLink (rel, href) {
  let node = document.head.querySelector(`link[rel="${rel}"]`)
  if (!href) {
    if (node) node.remove()
    return
  }
  if (!node) {
    node = document.createElement('link')
    node.setAttribute('rel', rel)
    document.head.appendChild(node)
  }
  node.setAttribute('href', href)
}

function setJsonLdScripts (payloads) {
  document.head.querySelectorAll(`script[${JSON_LD_ATTR}]`).forEach((node) => node.remove())
  payloads.forEach((payload) => {
    if (!payload) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute(JSON_LD_ATTR, 'true')
    script.text = JSON.stringify(payload)
    document.head.appendChild(script)
  })
}

function SEO ({
  title,
  description,
  path,
  canonical,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  ogType = 'website',
  robots = 'index, follow',
  twitterCard = 'summary_large_image',
  breadcrumbs,
  jsonLd,
  includeWebsite = false,
  includeOrganization = true,
}) {
  useEffect(() => {
    const pageTitle = title || DEFAULT_TITLE
    const pageDescription = description || DEFAULT_DESCRIPTION
    const url = canonical || canonicalFor(path)
    const image = ogImage || DEFAULT_OG_IMAGE
    const isNoIndex = /noindex/i.test(robots)

    document.title = pageTitle
    upsertMeta('name', 'description', pageDescription)
    upsertMeta('name', 'robots', robots)
    upsertLink('canonical', url)

    upsertMeta('property', 'og:title', ogTitle || pageTitle)
    upsertMeta('property', 'og:description', ogDescription || pageDescription)
    upsertMeta('property', 'og:type', ogType)
    upsertMeta('property', 'og:url', ogUrl || url)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:site_name', SITE_NAME)

    upsertMeta('name', 'twitter:card', twitterCard)
    upsertMeta('name', 'twitter:title', ogTitle || pageTitle)
    upsertMeta('name', 'twitter:description', ogDescription || pageDescription)
    upsertMeta('name', 'twitter:image', image)

    const structured = []
    if (!isNoIndex) {
      if (includeOrganization) structured.push(organizationJsonLd())
      if (includeWebsite) structured.push(websiteJsonLd())
      if (breadcrumbs?.length) structured.push(breadcrumbJsonLd(breadcrumbs))
    }
    if (Array.isArray(jsonLd)) {
      structured.push(...jsonLd.filter(Boolean))
    } else if (jsonLd) {
      structured.push(jsonLd)
    }
    setJsonLdScripts(structured)
  }, [
    title,
    description,
    path,
    canonical,
    ogTitle,
    ogDescription,
    ogUrl,
    ogImage,
    ogType,
    robots,
    twitterCard,
    includeWebsite,
    includeOrganization,
    JSON.stringify(breadcrumbs || null),
    JSON.stringify(jsonLd || null),
  ])

  return null
}

export default SEO
