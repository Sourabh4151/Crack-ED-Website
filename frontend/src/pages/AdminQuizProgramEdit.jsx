import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  initBlogAdminCsrf,
  fetchBlogAdminSession,
  fetchAdminQuizProgram,
  createAdminQuizProgram,
  updateAdminQuizProgram,
} from '../services/quizApi'
import { getApiBase } from '../services/crmService'
import './AdminBlogs.css'
import SEO from '../components/SEO/SEO'
import { PAGE_SEO } from '../seo/site'

const AdminQuizProgramEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = !id

  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [duration, setDuration] = useState('')
  const [link, setLink] = useState('')
  const [fee, setFee] = useState('0')
  const [sortOrder, setSortOrder] = useState('0')
  const [isActive, setIsActive] = useState(true)
  const [isFallback, setIsFallback] = useState(false)
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
          navigate('/marketing/quiz')
          return
        }
      } catch {
        if (!cancelled) navigate('/marketing/quiz')
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
    if (!sessionReady) return
    if (isNew) {
      setLoading(false)
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const row = await fetchAdminQuizProgram(id)
        if (cancelled) return
        setName(row.name || '')
        setDetails(row.details || '')
        setDuration(row.duration || '')
        setLink(row.link || '')
        setFee(String(row.fee ?? 0))
        setSortOrder(String(row.sort_order ?? 0))
        setIsActive(row.is_active !== false)
        setIsFallback(!!row.is_fallback)
      } catch (e) {
        if (!cancelled) setError(String(e.message || e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [sessionReady, isNew, id])

  const handleSave = async () => {
    setError('')
    if (!name.trim()) {
      setError('Program name is required and should match the CRM program name.')
      return
    }
    setSaving(true)
    const payload = {
      name: name.trim(),
      details: details.trim(),
      duration: duration.trim(),
      link: link.trim(),
      fee: Number(fee) || 0,
      sort_order: Number(sortOrder) || 0,
      is_active: isActive,
      is_fallback: isFallback,
    }
    try {
      if (isNew) {
        await createAdminQuizProgram(payload)
      } else {
        await updateAdminQuizProgram(id, payload)
      }
      navigate('/marketing/quiz')
    } catch (e) {
      setError(String(e.message || e))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="admin-blog-viewport">
      <SEO
        title={isNew ? PAGE_SEO.adminQuizProgramNew.title : PAGE_SEO.adminQuizProgramEdit.title}
        description={PAGE_SEO.adminQuizProgramEdit.description}
        robots={PAGE_SEO.adminQuizProgramEdit.robots}
        includeOrganization={false}
      />
      <div className="admin-blogs-page">
        <header className="admin-blogs-header">
          <h1>{isNew ? 'New quiz program' : 'Edit quiz program'}</h1>
          <p className="admin-blogs-sub">
            <Link className="admin-blogs-link" to="/marketing/quiz">← Back to quiz</Link>
          </p>
        </header>

        {error && <div className="admin-blogs-banner admin-blogs-banner--error">{error}</div>}
        {loading ? <p className="admin-blogs-muted">Loading…</p> : null}

        <div className="admin-blog-edit-grid">
          <label className="admin-blog-edit-full">
            Program name
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="admin-blog-edit-full">
            Result details (CTC line)
            <input type="text" value={details} onChange={(e) => setDetails(e.target.value)} />
          </label>
          <label>
            Duration
            <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
          </label>
          <label>
            Microsite link
            <input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
          </label>
          <label>
            Fee (tie-break)
            <input type="number" min="0" value={fee} onChange={(e) => setFee(e.target.value)} />
          </label>
          <label>
            Sort order
            <input type="number" min="0" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
          </label>
          <label className="admin-blog-edit-check">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
            Active in dropdowns
          </label>
          <label className="admin-blog-edit-check">
            <input type="checkbox" checked={isFallback} onChange={(e) => setIsFallback(e.target.checked)} />
            Fallback if quiz cannot pick a winner
          </label>
        </div>

        <div className="admin-blogs-actions">
          <button type="button" className="admin-blogs-btn admin-blogs-btn--primary" onClick={handleSave} disabled={saving || loading}>
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button type="button" className="admin-blogs-btn" onClick={() => navigate('/marketing/quiz')} disabled={saving}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminQuizProgramEdit
