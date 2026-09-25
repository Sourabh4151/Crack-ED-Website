import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  initBlogAdminCsrf,
  loginBlogAdmin,
  logoutBlogAdmin,
  fetchBlogAdminSession,
} from '../services/blogApi'
import { fetchAdminTestimonials, deleteAdminTestimonial } from '../services/testimonialApi'
import { getApiBase } from '../services/crmService'
import './AdminBlogs.css'
import SEO from '../components/SEO/SEO'
import { PAGE_SEO } from '../seo/site'

const AdminTestimonials = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [sessionUser, setSessionUser] = useState(null)
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const base = getApiBase()

  const load = async () => {
    setError('')
    setLoading(true)
    try {
      const data = await fetchAdminTestimonials()
      setItems(data)
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
        if (session) await load()
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
    setLoading(true)
    try {
      await initBlogAdminCsrf()
      const session = await loginBlogAdmin(username.trim(), password)
      setSessionUser(session)
      setPassword('')
      await load()
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
    setLoading(true)
    try {
      await logoutBlogAdmin()
      setSessionUser(null)
      setItems([])
      setPassword('')
    } catch (e) {
      setError(String(e.message || e))
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (row) => {
    if (!window.confirm(`Delete the testimonial from ${row.name}?`)) return
    setError('')
    try {
      await deleteAdminTestimonial(row.id)
      await load()
    } catch (e) {
      setError(String(e.message || e))
    }
  }

  return (
    <div className="admin-blog-viewport">
      <SEO
        title={PAGE_SEO.adminTestimonials.title}
        description={PAGE_SEO.adminTestimonials.description}
        path={PAGE_SEO.adminTestimonials.path}
        robots={PAGE_SEO.adminTestimonials.robots}
        includeOrganization={false}
      />
      <div className="admin-blogs-page">
        <header className="admin-blogs-header">
          <h1>Marketing — Testimonials</h1>
          <p className="admin-blogs-sub">
            LinkedIn posts and Google reviews shown on the public testimonials page.
            Also manage <Link className="admin-blogs-link" to="/marketing/blogs">blogs</Link>.
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
            </div>
          </section>
        )}

        {error && <div className="admin-blogs-banner admin-blogs-banner--error">{error}</div>}

        <div className="admin-blogs-actions">
          <button type="button" className="admin-blogs-btn admin-blogs-btn--primary" onClick={() => navigate('/marketing/testimonials/new')} disabled={!sessionUser}>
            New testimonial
          </button>
          <button type="button" className="admin-blogs-btn" onClick={load} disabled={loading || !sessionUser}>
            Refresh
          </button>
          <Link className="admin-blogs-btn" to="/testimonials">View page</Link>
        </div>

        {loading ? <p className="admin-blogs-muted">Loading…</p> : null}

        <table className="admin-blogs-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Name</th>
              <th>Published</th>
              <th>Order</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.kind === 'google' ? 'Google' : 'LinkedIn'}</td>
                <td>{row.name || row.source_url || '—'}</td>
                <td>{row.is_published ? 'Yes' : 'No'}</td>
                <td>{row.sort_order}</td>
                <td>
                  <Link className="admin-blogs-link" to={`/marketing/testimonials/edit/${row.id}`}>
                    Edit
                  </Link>
                  {' · '}
                  <button type="button" className="admin-blogs-link" onClick={() => handleDelete(row)} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {items.length === 0 && !loading && sessionUser ? (
          <p className="admin-blogs-muted">No testimonials yet. Create one with &quot;New testimonial&quot;.</p>
        ) : null}
      </div>
    </div>
  )
}

export default AdminTestimonials
