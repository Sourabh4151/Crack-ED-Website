import Heading from '@tiptap/extension-heading'

export const HeadingWithToc = Heading.extend({
  addAttributes () {
    return {
      ...this.parent?.(),
      marketingToc: {
        default: false,
        parseHTML: (element) => element.getAttribute('data-marketing-toc-heading') === 'true',
        renderHTML: (attrs) => {
          if (!attrs.marketingToc) return {}
          return { 'data-marketing-toc-heading': 'true' }
        },
      },
    }
  },
})
