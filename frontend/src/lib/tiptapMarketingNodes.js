/**
 * Custom block nodes for marketing blogs (editor + server HTML parity).
 */
import { Node, mergeAttributes } from '@tiptap/core'

export const MarketingSpecialCallout = Node.create({
  name: 'marketingSpecialCallout',
  group: 'block',
  content: 'paragraph+',
  defining: true,
  parseHTML () {
    return [
      { tag: 'div[data-marketing-callout]' },
      { tag: 'div.marketing-special-callout' },
    ]
  },
  renderHTML ({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-marketing-callout': 'true',
        class: 'marketing-special-callout',
      }),
      0,
    ]
  },
  addCommands () {
    return {
      insertMarketingSpecialCallout:
        () =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'This is special text' }],
              },
            ],
          }),
      /** Unwrap callout: keep inner paragraphs, drop the tinted box */
      removeMarketingSpecialCallout:
        () =>
        ({ tr, state, dispatch }) => {
          const { $from } = state.selection
          for (let d = $from.depth; d > 0; d--) {
            const node = $from.node(d)
            if (node.type.name !== this.name) continue
            const start = $from.before(d)
            const end = $from.after(d)
            tr.replaceWith(start, end, node.content)
            dispatch?.(tr)
            return true
          }
          return false
        },
    }
  },
})

export const MarketingVideo = Node.create({
  name: 'marketingVideo',
  group: 'block',
  atom: true,
  draggable: true,
  addAttributes () {
    return {
      src: { default: null },
    }
  },
  parseHTML () {
    return [
      {
        tag: 'video[data-marketing-video]',
        getAttrs: (el) => ({ src: el.getAttribute('src') }),
      },
    ]
  },
  renderHTML ({ node, HTMLAttributes }) {
    return [
      'video',
      mergeAttributes(HTMLAttributes, {
        src: node.attrs.src,
        controls: true,
        playsinline: 'true',
        'data-marketing-video': 'true',
        class: 'marketing-inline-video',
      }),
    ]
  },
  addCommands () {
    return {
      insertMarketingVideo:
        (src) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs: { src } }),
    }
  },
})

export const MarketingYoutube = Node.create({
  name: 'marketingYoutube',
  group: 'block',
  atom: true,
  draggable: true,
  addAttributes () {
    return {
      src: { default: null },
    }
  },
  parseHTML () {
    return [
      {
        tag: 'div[data-marketing-youtube]',
        getAttrs: (el) => {
          const iframe = el.querySelector('iframe')
          return { src: (iframe && iframe.getAttribute('src')) || null }
        },
      },
    ]
  },
  renderHTML ({ node }) {
    return [
      'div',
      { class: 'marketing-youtube-wrap', 'data-marketing-youtube': 'true' },
      [
        'iframe',
        {
          src: node.attrs.src,
          title: 'YouTube video',
          allowfullscreen: 'true',
          allow:
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
          loading: 'lazy',
        },
      ],
    ]
  },
  addCommands () {
    return {
      insertMarketingYoutube:
        (src) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs: { src } }),
    }
  },
})

export function parseYoutubeEmbedUrl (input) {
  const s = String(input || '').trim()
  if (!s) return null
  if (/^https:\/\/www\.youtube\.com\/embed\//i.test(s)) return s.split('&')[0]
  let m = s.match(/youtube\.com\/watch\?[^#]*v=([a-zA-Z0-9_-]{6,})/i)
  if (m) return `https://www.youtube.com/embed/${m[1]}`
  m = s.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/i)
  if (m) return `https://www.youtube.com/embed/${m[1]}`
  m = s.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/i)
  if (m) return `https://www.youtube.com/embed/${m[1]}`
  return null
}
