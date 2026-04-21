/**
 * Shared Tiptap extensions for marketing blog editor + public HTML generation.
 * Keep in sync between AdminBlogEditor and blog rendering.
 */
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import { MarketingFontSize } from './tiptapFontSize'
import { HeadingWithToc } from './tiptapHeadingWithToc'
import {
  MarketingSpecialCallout,
  MarketingVideo,
  MarketingYoutube,
} from './tiptapMarketingNodes'

export function getTiptapExtensions () {
  return [
    StarterKit.configure({
      heading: false,
    }),
    HeadingWithToc.configure({ levels: [1, 2, 3, 4, 5, 6] }),
    Underline,
    Link.configure({
      openOnClick: true,
      HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
    }),
    Image.configure({
      inline: false,
      allowBase64: true,
    }),
    MarketingSpecialCallout,
    MarketingVideo,
    MarketingYoutube,
    TextStyle,
    Color,
    FontFamily.configure({ types: ['textStyle'] }),
    MarketingFontSize.configure({ types: ['textStyle'] }),
  ]
}
