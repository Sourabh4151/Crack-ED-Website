import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  initBlogAdminCsrf,
  loginBlogAdmin,
  logoutBlogAdmin,
  fetchBlogAdminSession,
} from '../services/blogApi'
import { fetchAdminBrochures, saveAdminBrochure } from '../services/brochureApi'
import { getApiBase } from '../services/crmService'
import './AdminBlogs.css'
import SEO from '../components/SEO/SEO'
import { PAGE_SEO } from '../seo/site'

const MAX_PDF_BYTES = 25 * 1024 * 1024

function formatUpdated (value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString()
}

const AdminBrochures = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [sessionUser, setSessionUser] = useState(null)
  const [items, setItems] = useState([])
  const [names, setNames] = useState({})
  const [files, setFiles] = useState({})
  const [fileInputKeys, setFileInputKeys] = useState({})
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(false)
  const [savingSlug, setSavingSlug] = useState('')

  const base = getApiBase()

  const applyItems = (rows) => {
    const list = Array.isArray(rows) ? rows : []
    setItems(list)
    setNames((prev) => {
      const next = { ...prev }
      list.forEach((row) => {
        if (next[row.slug] === undefined) next[row.slug] = row.download_name || ''
      })
      return next
    })
  }

  const load = async () => {
    setError('')
    setLoading(true)
    try {
      applyItems(await fetchAdminBrochures())
    } catch (e) {
      setError(String(e.message || e))
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!base) return
      try {
        await initBlogAdminCsrf()
        const session = await fetchBlogAdminSession()
        if (cancelled) return
        setSessionUser(session)
        if (session) {
          setLoading(true)
          try {
            const rows = await fetchAdminBrochures()
            if (!cancelled) applyItems(rows)
          } catch (e) {
            if (!cancelled) setError(String(e.message || e))
          } finally {
            if (!cancelled) setLoading(false)
          }
        }
      } catch {
        if (!cancelled) {
          setSessionUser(null)
          setItems([])
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [base])

  const handleLogin = async () => {
    setError('')
    setNotice('')
    setLoading(true)
    try {
      await initBlogAdminCsrf()
      const session = await loginBlogAdmin(username.trim(), password)
      setSessionUser(session)
      setPassword('')
      applyItems(await fetchAdminBrochures())
    } catch (e) {
      setSessionUser(null)
      setItems([])
      setError(String(e.message || e))
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setError('')
    setNotice('')
    setLoading(true)
    try {
      await logoutBlogAdmin()
      setSessionUser(null)
      setItems([])
      setPassword('')
      setFiles({})
    } catch (e) {
      setError(String(e.message || e))
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (event, row) => {
    event.preventDefault()
    const file = files[row.slug] || null
    const downloadName = (names[row.slug] || '').trim()
    if (!downloadName) {
      setError('Enter the filename visitors should get.')
      return
    }
    if (file && file.size > MAX_PDF_BYTES) {
      setError('PDF must be 25 MB or smaller.')
      return
    }
    if (file && !file.name.toLowerCase().endsWith('.pdf')) {
      setError('Upload a PDF file.')
      return
    }

    setError('')
    setNotice('')
    setSavingSlug(row.slug)
    try {
      const saved = await saveAdminBrochure(row.slug, { file, downloadName })
      setItems((prev) => prev.map((item) => (item.slug === saved.slug ? saved : item)))
      setNames((prev) => ({ ...prev, [saved.slug]: saved.download_name || '' }))
      setFiles((prev) => ({ ...prev, [row.slug]: null }))
      setFileInputKeys((prev) => ({ ...prev, [row.slug]: (prev[row.slug] || 0) + 1 }))
      if (!saved.has_file) {
        setNotice(`${saved.name} saved. Upload a PDF to replace the file already on that microsite.`)
      } else if (file) {
        setNotice(`${saved.name} updated. The next brochure download on that microsite uses this PDF.`)
      } else {
        setNotice(`${saved.name} saved. The download filename is updated.`)
      }
    } catch (e) {
      setError(String(e.message || e))
    } finally {
      setSavingSlug('')
    }
  }

  return (
    <div className="admin-blog-viewport">
      <SEO
        title={PAGE_SEO.adminBrochures.title}
        description={PAGE_SEO.adminBrochures.description}
        path={PAGE_SEO.adminBrochures.path}
        robots={PAGE_SEO.adminBrochures.robots}
        includeOrganization={false}
      />
      <div className="admin-blogs-page">
        <header className="admin-blogs-header">
          <h1>Marketing — Brochures</h1>
          <p className="admin-blogs-sub">
            Upload a PDF for any microsite. The next visitor download uses that file.
            Same login as <Link className="admin-blogs-link" to="/marketing/blogs">blogs</Link>,
            {' '}<Link className="admin-blogs-link" to="/marketing/quiz">the career quiz</Link>,
            {' '}and <Link className="admin-blogs-link" to="/marketing/testimonials">testimonials</Link>.
          </p>
        </header>

        {!base && (
          <div className="admin-blogs-banner admin-blogs-banner--warn">
            <strong>VITE_API_URL</strong> is not set. Add it to <code>frontend/.env</code> and restart Vite.
          </div>
        )}

        {!sessionUser ? (
          <section className="admin-blogs-token">
            <label htmlFor="admin-username">Marketing login</label>
            <div className="admin-blogs-token-row">
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && username && password) handleLogin()
                }}
              />
              <button type="button" className="admin-blogs-btn" onClick={handleLogin} disabled={loading || !username || !password}>
                Login
              </button>
            </div>
          </section>
        ) : (
          <section className="admin-blogs-token">
            <label>Signed in</label>
            <div className="admin-blogs-token-row">
              <input type="text" value={sessionUser.username || ''} disabled />
              <button type="button" className="admin-blogs-btn" onClick={handleLogout} disabled={loading}>
                Logout
              </button>
              <button type="button" className="admin-blogs-btn" onClick={load} disabled={loading}>
                Refresh
              </button>
            </div>
          </section>
        )}

        {error && <div className="admin-blogs-banner admin-blogs-banner--error">{error}</div>}
        {notice && <div className="admin-blogs-banner admin-blogs-banner--ok">{notice}</div>}
        {loading ? <p className="admin-blogs-muted">Loading…</p> : null}

        {sessionUser && (
          <div className="admin-brochure-list">
            {items.map((row) => {
              const selected = files[row.slug]
              const saving = savingSlug === row.slug
              return (
                <form key={row.slug} className="admin-brochure-card" onSubmit={(event) => handleSave(event, row)}>
                  <h2>{row.name}</h2>
                  <p className="admin-brochure-meta">{row.slug}</p>
                  <label htmlFor={`brochure-name-${row.slug}`}>Download filename</label>
                  <input
                    id={`brochure-name-${row.slug}`}
                    type="text"
                    value={names[row.slug] ?? ''}
                    onChange={(event) => setNames((prev) => ({ ...prev, [row.slug]: event.target.value }))}
                  />
                  <label htmlFor={`brochure-file-${row.slug}`}>Replace PDF</label>
                  <input
                    id={`brochure-file-${row.slug}`}
                    key={`${row.slug}-${fileInputKeys[row.slug] || 0}`}
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={(event) => {
                      const next = event.target.files && event.target.files[0] ? event.target.files[0] : null
                      setFiles((prev) => ({ ...prev, [row.slug]: next }))
                    }}
                  />
                  <p className="admin-brochure-meta">
                    {row.has_file ? (
                      <>
                        Current file updated {formatUpdated(row.updated_at)}.
                        {' '}
                        <a className="admin-blogs-link" href={`${base}${row.file_path}`} target="_blank" rel="noreferrer">
                          View PDF
                        </a>
                      </>
                    ) : (
                      'No upload yet. This microsite still serves the PDF built into the site.'
                    )}
                    {selected ? ` Selected: ${selected.name}` : ''}
                  </p>
                  <div className="admin-brochure-actions">
                    <button type="submit" className="admin-blogs-btn admin-blogs-btn--primary" disabled={saving || loading}>
                      {saving ? 'Saving…' : 'Save'}
                    </button>
                  </div>
                </form>
              )
            })}
          </div>
        )}

        {sessionUser && items.length === 0 && !loading ? (
          <p className="admin-blogs-muted">No microsites yet.</p>
        ) : null}
      </div>
    </div>
  )
}

export default AdminBrochures
