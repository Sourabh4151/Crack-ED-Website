import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  getBlogAdminToken,
  setBlogAdminToken,
  fetchAdminBlogList,
} from '../services/blogApi'
import { getApiBase } from '../services/crmService'
import './AdminBlogs.css'

const AdminBlogs = () => {
  const navigate = useNavigate()
  const [tokenInput, setTokenInput] = useState(getBlogAdminToken())
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const base = getApiBase()

  const load = async () => {
    setError('')
    setLoading(true)
    try {
      const data = await fetchAdminBlogList()
      setItems(Array.isArray(data) ? data : data.results || [])
    } catch (e) {
      setError(String(e.message || e))
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (getBlogAdminToken() && base) load()
  }, [base])

  const saveToken = () => {
    setBlogAdminToken(tokenInput)
    load()
  }

  return (
    <div className="admin-blog-viewport">
      <div className="admin-blogs-page">
      <header className="admin-blogs-header">
        <h1>Marketing — Blogs</h1>
      </header>

      {!base && (
        <div className="admin-blogs-banner admin-blogs-banner--warn">
          <strong>VITE_API_URL</strong> is not set. Add it to <code>frontend/.env</code> and restart Vite.
        </div>
      )}

      <section className="admin-blogs-token">
        <label htmlFor="admin-token">Admin token</label>
        <div className="admin-blogs-token-row">
          <input
            id="admin-token"
            type="password"
            autoComplete="off"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="X-Admin-Token value"
          />
          <button type="button" className="admin-blogs-btn" onClick={saveToken}>
            Save &amp; load
          </button>
        </div>
      </section>

      {error && <div className="admin-blogs-banner admin-blogs-banner--error">{error}</div>}

      <div className="admin-blogs-actions">
        <button type="button" className="admin-blogs-btn admin-blogs-btn--primary" onClick={() => navigate('/marketing/blogs/new')}>
          New blog
        </button>
        <button type="button" className="admin-blogs-btn" onClick={load} disabled={loading || !getBlogAdminToken()}>
          Refresh
        </button>
      </div>

      {loading ? <p className="admin-blogs-muted">Loading…</p> : null}

      <table className="admin-blogs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Slug</th>
            <th>Title</th>
            <th>Published</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.slug}</td>
              <td>{row.title}</td>
              <td>{row.is_published ? 'Yes' : 'No'}</td>
              <td>
                <Link className="admin-blogs-link" to={`/marketing/blogs/edit/${row.id}`}>
                  Edit
                </Link>
                {' · '}
                <a className="admin-blogs-link" href={`/resources/blog/${row.slug}`} target="_blank" rel="noreferrer">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {items.length === 0 && !loading && getBlogAdminToken() ? (
        <p className="admin-blogs-muted">No blogs yet. Create one with &quot;New blog&quot;.</p>
      ) : null}
      </div>
    </div>
  )
}

export default AdminBlogs
