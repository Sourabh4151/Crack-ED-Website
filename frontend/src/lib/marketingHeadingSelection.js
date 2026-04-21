import { Fragment } from '@tiptap/pm/model'
import { TextSelection } from '@tiptap/pm/state'

function paragraphDepth ($pos) {
  for (let d = $pos.depth; d > 0; d--) {
    if ($pos.node(d).type.name === 'paragraph') return d
  }
  return -1
}

/**
 * Apply H1–H6. If the user selected text inside a single paragraph (e.g. one block
 * with soft line breaks), split into before / heading(selection) / after so neighbors
 * stay normal paragraphs. Otherwise matches default toggleHeading behavior.
 */
export function applyHeadingLevel (editor, level) {
  if (!editor) return false

  const { state } = editor
  const view = editor.view
  const { from, to, empty } = state.selection

  if (empty) {
    return editor.chain().focus().toggleHeading({ level }).run()
  }

  const $from = state.doc.resolve(from)
  const $to = state.doc.resolve(to)
  const dFrom = paragraphDepth($from)
  const dTo = paragraphDepth($to)
  if (dFrom < 0 || dFrom !== dTo || $from.before(dFrom) !== $to.before(dTo)) {
    return editor.chain().focus().toggleHeading({ level }).run()
  }

  const parent = $from.node(dFrom)
  if (parent.type.name !== 'paragraph') {
    return editor.chain().focus().toggleHeading({ level }).run()
  }

  const innerStart = $from.start(dFrom)
  const offsetStart = from - innerStart
  const offsetEnd = to - innerStart

  if (offsetStart < 0 || offsetEnd > parent.content.size || offsetStart >= offsetEnd) {
    return editor.chain().focus().toggleHeading({ level }).run()
  }

  if (offsetStart === 0 && offsetEnd === parent.content.size) {
    return editor.chain().focus().toggleHeading({ level }).run()
  }

  const paragraph = state.schema.nodes.paragraph
  const heading = state.schema.nodes.heading
  if (!paragraph || !heading) return false

  const blocks = []
  if (offsetStart > 0) {
    blocks.push(paragraph.create(null, parent.slice(0, offsetStart).content))
  }
  blocks.push(heading.create({ level }, parent.slice(offsetStart, offsetEnd).content))
  if (offsetEnd < parent.content.size) {
    blocks.push(paragraph.create(null, parent.slice(offsetEnd, parent.content.size).content))
  }

  const posBefore = $from.before(dFrom)
  const posAfter = $from.after(dFrom)
  const tr = state.tr.replaceWith(posBefore, posAfter, Fragment.from(blocks))

  let walk = posBefore
  for (const n of blocks) {
    if (n.type.name === 'heading') {
      const endInside = walk + 1 + n.content.size
      tr.setSelection(TextSelection.create(tr.doc, endInside))
      break
    }
    walk += n.nodeSize
  }

  view.dispatch(tr)
  view.focus()
  return true
}
