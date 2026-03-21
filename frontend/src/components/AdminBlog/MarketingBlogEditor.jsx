import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BubbleMenu, useEditor, useEditorState, EditorContent } from '@tiptap/react'
import { NodeSelection } from '@tiptap/pm/state'
import Placeholder from '@tiptap/extension-placeholder'
import 'tippy.js/dist/tippy.css'
import { getTiptapExtensions } from '../../lib/tiptapExtensions'
import { parseYoutubeEmbedUrl } from '../../lib/tiptapMarketingNodes'
import { uploadBlogImage } from '../../services/blogApi'
import { applyHeadingLevel } from '../../lib/marketingHeadingSelection'
import './MarketingBlogEditor.css'

const FONTS = ['Montserrat', 'Poppins', 'Inter', 'Georgia', 'Arial', 'serif', 'sans-serif']
const FONT_SIZES = ['12px', '14px', '16px', '18px', '20px', '24px', '28px']
const HEADING_LEVELS = [1, 2, 3, 4, 5, 6]

const emptyDoc = () => ({ type: 'doc', content: [{ type: 'paragraph' }] })

function isImageNodeSelected (ed) {
  if (!ed) return false
  const sel = ed.state.selection
  return sel instanceof NodeSelection && sel.node.type.name === 'image'
}

function marketingBubbleShouldShow ({ editor: ed, element, view, state, from, to }) {
  if (!ed.isEditable) return false
  const isChildOfMenu = element.contains(document.activeElement)
  if (!view.hasFocus() && !isChildOfMenu) return false
  if (state.selection instanceof NodeSelection && state.selection.node.type.name === 'image') return true
  if (ed.isActive('link')) return true
  if (ed.isActive('marketingSpecialCallout')) return true
  if (state.selection.empty) return false
  return state.doc.textBetween(from, to).length > 0
}

const MarketingBlogEditor = ({ value, onChange, editable = true }) => {
  const [mediaOpen, setMediaOpen] = useState(false)
  const mediaWrapRef = useRef(null)
  const extensions = useMemo(
    () => [
      ...getTiptapExtensions(),
      Placeholder.configure({
        placeholder: 'Write your blog content here…',
      }),
    ],
    []
  )

  const editor = useEditor({
    extensions,
    content: value && value.type === 'doc' ? value : emptyDoc(),
    editable,
    onUpdate: ({ editor: ed }) => {
      onChange?.(ed.getJSON())
    },
  })

  useEffect(() => {
    if (!editor || !value || value.type !== 'doc') return
    const current = JSON.stringify(editor.getJSON())
    const next = JSON.stringify(value)
    if (current !== next) {
      editor.commands.setContent(value, false)
    }
  }, [editor, value])

  useEffect(() => {
    if (!mediaOpen) return
    const onDocMouseDown = (e) => {
      if (mediaWrapRef.current && !mediaWrapRef.current.contains(e.target)) {
        setMediaOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [mediaOpen])

  const addImage = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file || !editor) return
      try {
        const { url } = await uploadBlogImage(file)
        editor.chain().focus().setImage({ src: url }).run()
      } catch (e) {
        alert(e.message || 'Image upload failed')
      }
    }
    input.click()
  }

  const addVideoFromUrl = () => {
    if (!editor) return
    const url = window.prompt('Video URL (direct link to .mp4 or other supported format)', 'https://')
    if (url === null) return
    const trimmed = url.trim()
    if (!trimmed) return
    try {
      // eslint-disable-next-line no-new
      new URL(trimmed)
    } catch {
      alert('Please enter a valid URL.')
      return
    }
    editor.chain().focus().insertMarketingVideo(trimmed).run()
  }

  const addYoutubeEmbed = () => {
    if (!editor) return
    const raw = window.prompt('YouTube link or embed URL', 'https://www.youtube.com/watch?v=')
    if (raw === null) return
    const embed = parseYoutubeEmbedUrl(raw)
    if (!embed) {
      alert('Could not read a YouTube video from that link.')
      return
    }
    editor.chain().focus().insertMarketingYoutube(embed).run()
  }

  const setLink = () => {
    if (!editor) return
    const prev = editor.getAttributes('link').href
    const href = window.prompt('URL', prev || 'https://')
    if (href === null) return
    if (href === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href }).run()
  }

  const imageSelected = useEditorState({
    editor,
    selector: ({ editor: ed }) => Boolean(ed && isImageNodeSelected(ed)),
  })

  const textStyleAttrs = useEditorState({
    editor,
    selector: ({ editor: ed }) => (ed ? ed.getAttributes('textStyle') : {}),
  })

  const removeSelectedImage = () => {
    if (!editor || !isImageNodeSelected(editor)) return
    editor.chain().focus().deleteSelection().run()
  }

  if (!editor) return null

  return (
    <div className="marketing-blog-editor">
      <div className="marketing-blog-editor-toolbar" role="toolbar" aria-label="Document blocks and styles">
        {HEADING_LEVELS.map((level) => (
          <button
            key={level}
            type="button"
            className={
              editor.isActive('heading', { level })
                ? 'is-active marketing-blog-editor-heading-btn'
                : 'marketing-blog-editor-heading-btn'
            }
            title="With text selected inside one paragraph, only the selection becomes a heading; otherwise the whole paragraph toggles."
            onClick={() => applyHeadingLevel(editor, level)}
          >
            H{level}
          </button>
        ))}
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          List
        </button>
        <button
          type="button"
          className={editor.isActive('marketingSpecialCallout') ? 'is-active' : ''}
          onClick={() => editor.chain().focus().insertMarketingSpecialCallout().run()}
          title="Insert highlighted callout block"
        >
          Special text
        </button>
        <button
          type="button"
          className="marketing-blog-editor-remove-callout"
          disabled={!editor.isActive('marketingSpecialCallout')}
          onClick={() => editor.chain().focus().removeMarketingSpecialCallout().run()}
          title="Remove the special box (text stays as normal paragraphs)"
        >
          Remove special
        </button>
        <div className="marketing-blog-editor-media-wrap" ref={mediaWrapRef}>
          <button
            type="button"
            className="marketing-blog-editor-media-trigger"
            aria-expanded={mediaOpen}
            aria-haspopup="menu"
            onClick={() => setMediaOpen((o) => !o)}
          >
            Media
            <span className="marketing-blog-editor-media-chevron" aria-hidden>
              ▾
            </span>
          </button>
          {mediaOpen ? (
            <div className="marketing-blog-editor-media-menu" role="menu" aria-label="Insert media">
              <button
                type="button"
                className="marketing-blog-editor-media-item"
                role="menuitem"
                onClick={() => {
                  setMediaOpen(false)
                  addImage()
                }}
              >
                <span className="marketing-blog-editor-media-icon" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <circle cx="8.5" cy="10" r="1.5" fill="currentColor" stroke="none" />
                    <path d="M21 15l-5-5-4 4-2-2-4 4" />
                  </svg>
                </span>
                <span>Insert image</span>
              </button>
              <button
                type="button"
                className="marketing-blog-editor-media-item"
                role="menuitem"
                onClick={() => {
                  setMediaOpen(false)
                  addVideoFromUrl()
                }}
              >
                <span className="marketing-blog-editor-media-icon" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="6" width="15" height="12" rx="2" />
                    <path d="M17 10l5-3v10l-5-3V10z" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                <span>Insert video</span>
              </button>
              <button
                type="button"
                className="marketing-blog-editor-media-item"
                role="menuitem"
                onClick={() => {
                  setMediaOpen(false)
                  addYoutubeEmbed()
                }}
              >
                <span className="marketing-blog-editor-media-icon marketing-blog-editor-media-icon--yt" aria-hidden>
                  <svg width="18" height="14" viewBox="0 0 24 18" fill="currentColor">
                    <path d="M23.5 4.5s-.2-1.6-1-2.3c-.9-1-2-1-2.4-1.1C17.3 1 12 1 12 1s-5.3 0-8.1.1c-.4 0-1.5.1-2.4 1.1-.8.7-1 2.3-1 2.3S0 6.4 0 8.3v1.4c0 1.9.5 3.8.5 3.8s.2 1.6 1 2.3c.9 1 2.1.9 2.6 1 1.9.2 8 .2 8 .2s5.3 0 8.1-.1c.4 0 1.5-.1 2.4-1.1.8-.7 1-2.3 1-2.3s.5-1.9.5-3.8V8.3c0-1.9-.5-3.8-.5-3.8zM9.5 12.5V6.2l6.2 3.15-6.2 3.15z" />
                  </svg>
                </span>
                <span>Embed YouTube</span>
              </button>
            </div>
          ) : null}
        </div>
        <button
          type="button"
          className="marketing-blog-editor-remove-image"
          disabled={!imageSelected}
          onClick={removeSelectedImage}
          title="Delete the selected image from the post"
        >
          Remove image
        </button>
        <span className="marketing-blog-editor-sep" />
        <label className="marketing-blog-editor-color">
          Text
          <input
            type="color"
            onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
            aria-label="Text color"
          />
        </label>
        <select
          className="marketing-blog-editor-font"
          value={textStyleAttrs.fontFamily || ''}
          onChange={(e) => {
            const v = e.target.value
            if (!editor) return
            if (v) editor.chain().focus().setFontFamily(v).run()
            else editor.chain().focus().unsetFontFamily().run()
          }}
          aria-label="Font family"
        >
          <option value="">Font…</option>
          {FONTS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <select
          className="marketing-blog-editor-font marketing-blog-editor-font-size"
          value={textStyleAttrs.fontSize || ''}
          onChange={(e) => {
            const v = e.target.value
            if (!editor) return
            if (v) editor.chain().focus().setFontSize(v).run()
            else editor.chain().focus().unsetFontSize().run()
          }}
          aria-label="Font size"
        >
          <option value="">Size…</option>
          {FONT_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <p className="marketing-blog-editor-toolbar-hint" role="note">
          <strong>Tip:</strong> Use <strong>H1–H6</strong> for real section titles (SEO and accessibility). Use <strong>Size…</strong> for small inline emphasis only. Select text first for size or font; choose “Size…” / “Font…” again to clear.
        </p>
      </div>
      <div className="marketing-blog-editor-body">
        <BubbleMenu
          editor={editor}
          pluginKey="marketingInlineBubble"
          shouldShow={marketingBubbleShouldShow}
          tippyOptions={{
            theme: 'marketing-bubble',
            duration: [160, 120],
            placement: 'top',
            offset: [0, 10],
            zIndex: 10050,
            moveTransition: 'transform 0.15s ease-out',
          }}
          className="marketing-blog-bubble-menu"
        >
          <div
            className="marketing-blog-bubble-inner"
            role="toolbar"
            aria-label={imageSelected ? 'Image' : 'Inline formatting'}
          >
            {imageSelected ? (
              <button
                type="button"
                className="marketing-blog-bubble-remove-image"
                onClick={removeSelectedImage}
                title="Remove this image"
              >
                Remove image
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className={editor.isActive('bold') ? 'is-active' : ''}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                >
                  Bold
                </button>
                <button
                  type="button"
                  className={editor.isActive('italic') ? 'is-active' : ''}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                  Italic
                </button>
                <button
                  type="button"
                  className={editor.isActive('underline') ? 'is-active' : ''}
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                >
                  Underline
                </button>
                <button
                  type="button"
                  className={editor.isActive('link') ? 'is-active' : ''}
                  onClick={setLink}
                >
                  Link
                </button>
                {editor.isActive('marketingSpecialCallout') ? (
                  <button
                    type="button"
                    className="marketing-blog-bubble-remove-callout"
                    onClick={() => editor.chain().focus().removeMarketingSpecialCallout().run()}
                    title="Remove special box"
                  >
                    Remove box
                  </button>
                ) : null}
              </>
            )}
          </div>
        </BubbleMenu>
        <EditorContent editor={editor} className="marketing-blog-editor-content" />
      </div>
    </div>
  )
}

export default MarketingBlogEditor
