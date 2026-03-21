import React, { useMemo } from 'react'
import { getSchema } from '@tiptap/core'
import { Node, DOMSerializer } from '@tiptap/pm/model'
import DOMPurify from 'dompurify'
import { getTiptapExtensions } from '../../lib/tiptapExtensions'

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
  return wrap.innerHTML
}

/**
 * Renders marketing blog content_json (Tiptap) as sanitized HTML.
 */
const BlogPostApiBody = ({ contentJson }) => {
  const html = useMemo(() => {
    const doc =
      contentJson && typeof contentJson === 'object' && contentJson.type === 'doc'
        ? contentJson
        : { type: 'doc', content: [{ type: 'paragraph' }] }
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
          'data-marketing-callout',
          'data-marketing-video',
          'data-marketing-youtube',
        ],
        ALLOW_DATA_ATTR: false,
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
