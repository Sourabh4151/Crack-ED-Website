import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  initBlogAdminCsrf,
  fetchBlogAdminSession,
  fetchAdminQuizQuestion,
  createAdminQuizQuestion,
  updateAdminQuizQuestion,
  fetchAdminQuizPrograms,
} from '../services/quizApi'
import { getApiBase } from '../services/crmService'
import './AdminBlogs.css'
import SEO from '../components/SEO/SEO'
import { PAGE_SEO } from '../seo/site'

const emptyOptions = () => (
  ['A', 'B', 'C', 'D'].map((mapping) => ({
    mapping,
    text: '',
    program_1: null,
    program_2: null,
    program_3: null,
  }))
)

const AdminQuizQuestionEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = !id

  const [order, setOrder] = useState('')
  const [question, setQuestion] = useState('')
  const [isPublished, setIsPublished] = useState(true)
  const [options, setOptions] = useState(emptyOptions)
  const [programs, setPrograms] = useState([])
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
        const list = await fetchAdminQuizPrograms()
        if (!cancelled) setPrograms(Array.isArray(list) ? list : [])
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
        const row = await fetchAdminQuizQuestion(id)
        if (cancelled) return
        setOrder(row.order ?? '')
        setQuestion(row.question || '')
        setIsPublished(!!row.is_published)
        const byMap = {}
        for (const opt of row.options || []) {
          byMap[opt.mapping] = opt
        }
        setOptions(['A', 'B', 'C', 'D'].map((mapping) => ({
          mapping,
          text: byMap[mapping]?.text || '',
          program_1: byMap[mapping]?.program_1 ?? null,
          program_2: byMap[mapping]?.program_2 ?? null,
          program_3: byMap[mapping]?.program_3 ?? null,
        })))
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

  const setOptionField = (index, field, value) => {
    setOptions((prev) => prev.map((opt, i) => (
      i === index ? { ...opt, [field]: value } : opt
    )))
  }

  const handleSave = async () => {
    setError('')
    const orderNum = Number(order)
    if (!Number.isInteger(orderNum) || orderNum < 1) {
      setError('Order must be a positive whole number (1 = first question).')
      return
    }
    if (!question.trim()) {
      setError('Question text is required.')
      return
    }
    setSaving(true)
    const payload = {
      order: orderNum,
      question: question.trim(),
      is_published: isPublished,
      options: options.map((opt) => ({
        mapping: opt.mapping,
        text: (opt.text || '').trim(),
        program_1: opt.program_1 || null,
        program_2: opt.program_2 || null,
        program_3: opt.program_3 || null,
      })),
    }
    try {
      if (isNew) {
        await createAdminQuizQuestion(payload)
      } else {
        await updateAdminQuizQuestion(id, payload)
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
        title={isNew ? PAGE_SEO.adminQuizQuestionNew.title : PAGE_SEO.adminQuizQuestionEdit.title}
        description={PAGE_SEO.adminQuizQuestionEdit.description}
        robots={PAGE_SEO.adminQuizQuestionEdit.robots}
        includeOrganization={false}
      />
      <div className="admin-blogs-page">
        <header className="admin-blogs-header">
          <h1>{isNew ? 'New quiz question' : 'Edit quiz question'}</h1>
          <p className="admin-blogs-sub">
            <Link className="admin-blogs-link" to="/marketing/quiz">← Back to quiz</Link>
          </p>
        </header>

        {error && <div className="admin-blogs-banner admin-blogs-banner--error">{error}</div>}
        {loading ? <p className="admin-blogs-muted">Loading…</p> : null}

        <div className="admin-blog-edit-grid">
          <label>
            Order
            <input type="number" min="1" value={order} onChange={(e) => setOrder(e.target.value)} />
          </label>
          <label className="admin-blog-edit-check">
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
            Published
          </label>
          <label className="admin-blog-edit-full">
            Question
            <textarea rows={3} value={question} onChange={(e) => setQuestion(e.target.value)} />
          </label>
        </div>

        <h2 className="admin-blog-edit-h2">Options (A–D) and program scoring</h2>
        <p className="admin-blogs-sub">Each selected option adds +1 to up to three programs. Add programs first if a name is missing from the list.</p>

        {options.map((opt, index) => (
          <div key={opt.mapping} className="admin-quiz-option-card">
            <h3 className="admin-quiz-option-title">Option {opt.mapping}</h3>
            <label>
              Answer text
              <input
                type="text"
                value={opt.text}
                onChange={(e) => setOptionField(index, 'text', e.target.value)}
              />
            </label>
            <div className="admin-quiz-program-row">
              {['program_1', 'program_2', 'program_3'].map((field, i) => (
                <label key={field}>
                  Program {i + 1}
                  <select
                    value={opt[field] || ''}
                    onChange={(e) => setOptionField(index, field, e.target.value ? Number(e.target.value) : null)}
                  >
                    <option value="">— none —</option>
                    {programs.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </div>
        ))}

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

export default AdminQuizQuestionEdit
