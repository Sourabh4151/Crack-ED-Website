import React, { useMemo } from 'react'
import { getSchema } from '@tiptap/core'
import { Node, DOMSerializer } from '@tiptap/pm/model'
import DOMPurify from 'dompurify'
import { getTiptapExtensions } from '../../lib/tiptapExtensions'

function paragraphIsWhitespaceEmpty (node) {
  if (!node || node.type !== 'paragraph') return false
  const children = Array.isArray(node.content) ? node.content : []
  if (children.length === 0) return true
  const text = children
    .map((child) => {
      if (child.type === 'text') return child.text || ''
      if (child.type === 'hardBreak') return '\n'
      return '\u0000'
    })
    .join('')
    .trim()
  return text === '' && children.every((c) => c.type === 'text' || c.type === 'hardBreak')
}

/** Drop leading empty paragraphs so admin/editor newlines do not reserve a huge gap on the live blog. */
function trimLeadingEmptyParagraphs (doc) {
  if (!doc || doc.type !== 'doc' || !Array.isArray(doc.content)) return doc
  let i = 0
  while (i < doc.content.length && paragraphIsWhitespaceEmpty(doc.content[i])) {
    i += 1
  }
  if (i === 0) return doc
  return { ...doc, content: doc.content.slice(i) }
}

/**
 * Serialize Tiptap JSON to HTML using the real DOM (not @tiptap/html + zeed-dom),
 * which drops inline `style` on marks (font-family, color, etc.).
 */
function marketingJsonToHtml (docJson, extensions) {
  if (typeof document === 'undefined') return ''
  const schema = getSchema(extensions)
  const root = Node.fromJSON(schema, docJson)
  const fragment = DOMSerializer.fromSchema(schema).serializeFragment(root.content)
  const wrap = document.createElement('div')
  wrap.appendChild(fragment)
  const tocNodes = wrap.querySelectorAll('[data-marketing-toc-heading="true"]')
  tocNodes.forEach((el, idx) => {
    el.setAttribute('id', `api-toc-${idx}`)
  })
  return wrap.innerHTML
}

/**
 * Renders marketing blog content_json (Tiptap) as sanitized HTML.
 */
const BlogPostApiBody = ({ contentJson }) => {
  const html = useMemo(() => {
    const docRaw =
      contentJson && typeof contentJson === 'object' && contentJson.type === 'doc'
        ? contentJson
        : { type: 'doc', content: [{ type: 'paragraph' }] }
    const doc = trimLeadingEmptyParagraphs(docRaw)
    try {
      const raw = marketingJsonToHtml(doc, getTiptapExtensions())
      return DOMPurify.sanitize(raw, {
        ADD_TAGS: ['iframe', 'video'],
        ADD_ATTR: [
          'target',
          'rel',
          'style',
          'controls',
          'playsinline',
          'allowfullscreen',
          'allow',
          'loading',
          'title',
          'class',
          'id',
          'data-marketing-callout',
          'data-marketing-video',
          'data-marketing-youtube',
          'data-marketing-toc-heading',
        ],
        ALLOW_DATA_ATTR: true,
      })
    } catch {
      return ''
    }
  }, [contentJson])

  return (
    <div
      className="blog-post-text blog-post-api-html"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default BlogPostApiBody
