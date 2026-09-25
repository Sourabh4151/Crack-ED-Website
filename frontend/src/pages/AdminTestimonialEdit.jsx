import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {
  initBlogAdminCsrf,
  fetchBlogAdminSession,
} from '../services/blogApi'
import {
  createAdminTestimonial,
  updateAdminTestimonial,
  fetchAdminTestimonial,
  patchAdminTestimonialImages,
} from '../services/testimonialApi'
import { getApiBase } from '../services/crmService'
import './AdminBlogs.css'
import SEO from '../components/SEO/SEO'
import { PAGE_SEO } from '../seo/site'

const AdminTestimonialEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = !id

  const [kind, setKind] = useState('linkedin')
  const [name, setName] = useState('')
  const [headline, setHeadline] = useState('')
  const [body, setBody] = useState('')
  const [rating, setRating] = useState(5)
  const [timeLabel, setTimeLabel] = useState('')
  const [connectionLabel, setConnectionLabel] = useState('3rd')
  const [hashtags, setHashtags] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')
  const [sortOrder, setSortOrder] = useState(0)
  const [isPublished, setIsPublished] = useState(false)
  const [profileFile, setProfileFile] = useState(null)
  const [postFile, setPostFile] = useState(null)
  const [profileUrl, setProfileUrl] = useState('')
  const [postUrl, setPostUrl] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(!isNew)
  const [sessionReady, setSessionReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        if (!getApiBase()) return
        await initBlogAdminCsrf()
        const session = await fetchBlogAdminSession()
        if (!session && !cancelled) {
          navigate('/marketing/testimonials')
          return
        }
      } catch {
        if (!cancelled) navigate('/marketing/testimonials')
        return
      } finally {
        if (!cancelled) setSessionReady(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [navigate])

  useEffect(() => {
    if (!sessionReady || isNew) {
      if (sessionReady) setLoading(false)
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const row = await fetchAdminTestimonial(id)
        if (cancelled) return
        setKind(row.kind || 'linkedin')
        setName(row.name || '')
        setHeadline(row.headline || '')
        setBody(row.body || '')
        setRating(row.rating || 5)
        setTimeLabel(row.time_label || '')
        setConnectionLabel(row.connection_label || '')
        setHashtags(row.hashtags || '')
        setSourceUrl(row.source_url || '')
        setSortOrder(row.sort_order || 0)
        setIsPublished(!!row.is_published)
        setProfileUrl(row.profile_image_url || '')
        setPostUrl(row.post_image_url || '')
      } catch (e) {
        setError(String(e.message || e))
      } finally {
        setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [id, isNew, sessionReady])

  const handleSave = async () => {
    setError('')
    if (kind === 'linkedin') {
      if (!sourceUrl.trim()) {
        setError('Paste the LinkedIn post URL.')
        return
      }
    } else if (!name.trim() || !body.trim()) {
      setError('Name and review text are required.')
      return
    }
    if (!getApiBase()) {
      setError('VITE_API_URL is not set.')
      return
    }
    setSaving(true)
    try {
      const payload = {
        kind,
        name: name.trim(),
        headline: headline.trim(),
        body: body.trim(),
        rating: Number(rating) || 5,
        time_label: timeLabel.trim(),
        connection_label: connectionLabel.trim(),
        hashtags: hashtags.trim(),
        source_url: sourceUrl.trim(),
        sort_order: Number(sortOrder) || 0,
        is_published: isPublished,
      }
      const saved = isNew
        ? await createAdminTestimonial(payload)
        : await updateAdminTestimonial(id, payload)
      if ((profileFile || postFile) && saved?.id) {
        await patchAdminTestimonialImages(saved.id, { profileFile, postFile })
      }
      navigate('/marketing/testimonials')
    } catch (e) {
      setError(String(e.message || e))
    } finally {
      setSaving(false)
    }
  }

  const adminSeo = (
    <SEO
      title={isNew ? 'New Testimonial | CRACK-ED' : 'Edit Testimonial | CRACK-ED'}
      description={PAGE_SEO.adminTestimonialEdit.description}
      path={isNew ? '/marketing/testimonials/new' : `/marketing/testimonials/edit/${id}`}
      robots={PAGE_SEO.adminTestimonialEdit.robots}
      includeOrganization={false}
    />
  )

  if (loading || !sessionReady) {
    return (
      <div className="admin-blog-viewport">
        {adminSeo}
        <div className="admin-blogs-page">
          <p className="admin-blogs-muted">Loading…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-blog-viewport">
      {adminSeo}
      <div className="admin-blogs-page admin-blog-edit">
        <p>
          <Link className="admin-blogs-link" to="/marketing/testimonials">
            ← Back to list
          </Link>
        </p>
        <h1>{isNew ? 'New testimonial' : `Edit testimonial #${id}`}</h1>
        {error ? <div className="admin-blogs-banner admin-blogs-banner--error">{error}</div> : null}

        <div className="admin-blog-edit-grid">
          <label>
            Type
            <select value={kind} onChange={(e) => setKind(e.target.value)}>
              <option value="linkedin">LinkedIn post</option>
              <option value="google">Google review</option>
            </select>
          </label>
          {kind === 'linkedin' ? (
            <label className="admin-blog-edit-full">
              LinkedIn post URL
              <input value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} placeholder="https://www.linkedin.com/posts/..." />
              <span className="admin-blogs-muted">Paste the post link. The page embeds it the same way LinkedIn does.</span>
            </label>
          ) : (
            <>
              <label>
                Name
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nikhil Attri" />
              </label>
              <label>
                Star rating
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </label>
              <label className="admin-blog-edit-full">
                Review text
                <textarea rows={8} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Paste the full Google review here" />
                <span className="admin-blogs-muted">A Google link does not load the review. Paste the name and the full text so the card can show it.</span>
              </label>
              <label>
                Profile photo
                <input type="file" accept="image/*" onChange={(e) => setProfileFile(e.target.files?.[0] || null)} />
                {profileUrl ? <span className="admin-blogs-muted">Current photo is saved.</span> : null}
              </label>
            </>
          )}
          <label>
            Sort order
            <input type="number" min="0" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
          </label>
          <label className="admin-blog-edit-check">
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
            Published
          </label>
        </div>

        <div className="admin-blogs-actions">
          <button type="button" className="admin-blogs-btn admin-blogs-btn--primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminTestimonialEdit
