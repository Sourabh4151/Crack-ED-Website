import '@tiptap/extension-text-style'
import { Extension } from '@tiptap/core'

/**
 * Inline font-size on the shared textStyle mark (works with Color + FontFamily).
 * @see https://tiptap.dev/api/extensions/font-family (same pattern)
 */
export const MarketingFontSize = Extension.create({
  name: 'marketingFontSize',

  addOptions () {
    return {
      types: ['textStyle'],
    }
  },

  addGlobalAttributes () {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) =>
              element.style.fontSize?.replace(/['"]+/g, '') ?? null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {}
              return {
                style: `font-size: ${attributes.fontSize}`,
              }
            },
          },
        },
      },
    ]
  },

  addCommands () {
    return {
      setFontSize:
        (fontSize) =>
          ({ chain }) =>
            chain().setMark('textStyle', { fontSize }).run(),

      unsetFontSize:
        () =>
          ({ chain }) =>
            chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run(),
    }
  },
})
