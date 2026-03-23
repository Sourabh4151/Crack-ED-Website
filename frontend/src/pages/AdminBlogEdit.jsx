import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import MarketingBlogEditor from '../components/AdminBlog/MarketingBlogEditor'
import {
  createAdminBlog,
  updateAdminBlog,
  fetchAdminBlog,
  patchAdminBlogCover,
  getBlogAdminToken,
} from '../services/blogApi'
import { getApiBase } from '../services/crmService'
import './AdminBlogs.css'

const emptyDoc = () => ({ type: 'doc', content: [{ type: 'paragraph' }] })

const AdminBlogEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = !id

  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [dateDisplay, setDateDisplay] = useState('')
  const [tagsStr, setTagsStr] = useState('Career, Interview')
  const [author, setAuthor] = useState('')
  const [contentJson, setContentJson] = useState(emptyDoc)
  const [hideFromResources, setHideFromResources] = useState(false)
  const [featuredOnResources, setFeaturedOnResources] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [coverFile, setCoverFile] = useState(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(!isNew)

  useEffect(() => {
    if (isNew || !getBlogAdminToken()) {
      setLoading(false)
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const row = await fetchAdminBlog(id)
        if (cancelled) return
        setSlug(row.slug || '')
        setTitle(row.title || '')
        setExcerpt(row.excerpt || '')
        setDateDisplay(row.date_display || '')
        setTagsStr(Array.isArray(row.tags) ? row.tags.join(', ') : '')
        setAuthor(row.author || '')
        setContentJson(row.content_json && row.content_json.type === 'doc' ? row.content_json : emptyDoc())
        setHideFromResources(!!row.hide_from_resources)
        setFeaturedOnResources(!!row.featured_on_resources)
        setIsPublished(!!row.is_published)
      } catch (e) {
        setError(String(e.message || e))
      } finally {
        setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [id, isNew])

  const parseTags = () =>
    tagsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

  const handleSave = async () => {
    setError('')
    if (!slug.trim() || !title.trim()) {
      setError('Slug and title are required.')
      return
    }
    if (!getApiBase()) {
      setError('VITE_API_URL is not set.')
      return
    }
    if (!getBlogAdminToken()) {
      setError('Save your admin token on the blogs list page first.')
      return
    }
    setSaving(true)
    try {
      const payload = {
        slug: slug.trim().toLowerCase().replace(/\s+/g, '-'),
        title: title.trim(),
        excerpt: excerpt.trim(),
        date_display: dateDisplay.trim(),
        tags: parseTags(),
        content_json: contentJson,
        hide_from_resources: hideFromResources,
        featured_on_resources: featuredOnResources,
        is_published: isPublished,
        author: author.trim(),
      }
      let saved
      if (isNew) {
        saved = await createAdminBlog(payload)
      } else {
        saved = await updateAdminBlog(id, payload)
      }
      if (coverFile && saved?.id) {
        await patchAdminBlogCover(saved.id, coverFile)
      }
      navigate('/marketing/blogs')
    } catch (e) {
      setError(String(e.message || e))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="admin-blog-viewport">
        <div className="admin-blogs-page">
          <p className="admin-blogs-muted">Loading…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-blog-viewport">
      <div className="admin-blogs-page admin-blog-edit">
      <p>
        <Link className="admin-blogs-link" to="/marketing/blogs">
          ← Back to list
        </Link>
      </p>
      <h1>{isNew ? 'New blog' : `Edit blog #${id}`}</h1>

      {error ? <div className="admin-blogs-banner admin-blogs-banner--error">{error}</div> : null}

      <div className="admin-blog-edit-grid">
        <label>
          Slug (URL)
          <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="my-awesome-post" />
        </label>
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Blog title" />
        </label>
        <label className="admin-blog-edit-full">
          Excerpt (card / SEO)
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} />
        </label>
        <label>
          Display date
          <input value={dateDisplay} onChange={(e) => setDateDisplay(e.target.value)} placeholder="MARCH 18, 2026" />
        </label>
        <label>
          Tags (comma-separated)
          <input value={tagsStr} onChange={(e) => setTagsStr(e.target.value)} placeholder="Career, Interview" />
        </label>
        <label>
          Author
          <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Optional" />
        </label>
        <label className="admin-blog-edit-check">
          <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
          Published
        </label>
        <label className="admin-blog-edit-check">
          <input type="checkbox" checked={hideFromResources} onChange={(e) => setHideFromResources(e.target.checked)} />
          Hide from /resources grid
        </label>
        <label className="admin-blog-edit-check">
          <input
            type="checkbox"
            checked={featuredOnResources}
            onChange={(e) => setFeaturedOnResources(e.target.checked)}
          />
          Featured banner on /resources
        </label>
        <label className="admin-blog-edit-full">
          Cover image (optional — uploads after save)
          <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} />
        </label>
      </div>

      <h2 className="admin-blog-edit-h2">Content</h2>
      <MarketingBlogEditor value={contentJson} onChange={setContentJson} />

      <div className="admin-blogs-actions" style={{ marginTop: 24 }}>
        <button type="button" className="admin-blogs-btn admin-blogs-btn--primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button type="button" className="admin-blogs-btn" onClick={() => navigate('/marketing/blogs')} disabled={saving}>
          Cancel
        </button>
      </div>
      </div>
    </div>
  )
}

export default AdminBlogEdit
