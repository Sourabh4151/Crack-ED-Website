import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  initBlogAdminCsrf,
  loginBlogAdmin,
  logoutBlogAdmin,
  fetchBlogAdminSession,
  fetchAdminQuizQuestions,
  fetchAdminQuizPrograms,
} from '../services/quizApi'
import { getApiBase } from '../services/crmService'
import './AdminBlogs.css'
import SEO from '../components/SEO/SEO'
import { PAGE_SEO } from '../seo/site'

const AdminQuiz = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [sessionUser, setSessionUser] = useState(null)
  const [tab, setTab] = useState('questions')
  const [questions, setQuestions] = useState([])
  const [programs, setPrograms] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const base = getApiBase()

  const load = async () => {
    setError('')
    setLoading(true)
    try {
      const [q, p] = await Promise.all([
        fetchAdminQuizQuestions(),
        fetchAdminQuizPrograms(),
      ])
      setQuestions(Array.isArray(q) ? q : [])
      setPrograms(Array.isArray(p) ? p : [])
    } catch (e) {
      setError(String(e.message || e))
      setQuestions([])
      setPrograms([])
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
          setQuestions([])
          setPrograms([])
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
      setQuestions([])
      setPrograms([])
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
      setQuestions([])
      setPrograms([])
      setPassword('')
    } catch (e) {
      setError(String(e.message || e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-blog-viewport">
      <SEO
        title={PAGE_SEO.adminQuiz.title}
        description={PAGE_SEO.adminQuiz.description}
        path={PAGE_SEO.adminQuiz.path}
        robots={PAGE_SEO.adminQuiz.robots}
        includeOrganization={false}
      />
      <div className="admin-blogs-page">
      <header className="admin-blogs-header">
        <h1>Marketing — Career Quiz</h1>
        <p className="admin-blogs-sub">
          Update questions, answer mappings, and result programs without a code deploy.
          Same login as <Link className="admin-blogs-link" to="/marketing/blogs">blogs</Link>.
        </p>
      </header>

      {!base && (
        <div className="admin-blogs-banner admin-blogs-banner--warn">
          <strong>VITE_API_URL</strong> is not set. Add it to <code>frontend/.env</code> and restart Vite.
        </div>
      )}

      {!sessionUser ? (
        <section className="admin-blogs-token">
          <label htmlFor="admin-quiz-username">Marketing login</label>
          <div className="admin-blogs-token-row">
            <input
              id="admin-quiz-username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <input
              id="admin-quiz-password"
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

      <div className="admin-quiz-tabs">
        <button
          type="button"
          className={`admin-blogs-btn${tab === 'questions' ? ' admin-blogs-btn--primary' : ''}`}
          onClick={() => setTab('questions')}
        >
          Questions
        </button>
        <button
          type="button"
          className={`admin-blogs-btn${tab === 'programs' ? ' admin-blogs-btn--primary' : ''}`}
          onClick={() => setTab('programs')}
        >
          Programs
        </button>
      </div>

      <div className="admin-blogs-actions">
        {tab === 'questions' ? (
          <button type="button" className="admin-blogs-btn admin-blogs-btn--primary" onClick={() => navigate('/marketing/quiz/questions/new')} disabled={!sessionUser}>
            New question
          </button>
        ) : (
          <button type="button" className="admin-blogs-btn admin-blogs-btn--primary" onClick={() => navigate('/marketing/quiz/programs/new')} disabled={!sessionUser}>
            New program
          </button>
        )}
        <button type="button" className="admin-blogs-btn" onClick={load} disabled={loading || !sessionUser}>
          Refresh
        </button>
      </div>

      {loading ? <p className="admin-blogs-muted">Loading…</p> : null}

      {tab === 'questions' ? (
        <>
          <table className="admin-blogs-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Question</th>
                <th>Published</th>
                <th>Options</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {questions.map((row) => (
                <tr key={row.id}>
                  <td>{row.order}</td>
                  <td>{row.question}</td>
                  <td>{row.is_published ? 'Yes' : 'No'}</td>
                  <td>{Array.isArray(row.options) ? row.options.length : 0}</td>
                  <td>
                    <Link className="admin-blogs-link" to={`/marketing/quiz/questions/edit/${row.id}`}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {questions.length === 0 && !loading && sessionUser ? (
            <p className="admin-blogs-muted">No questions yet. Create one with &quot;New question&quot;.</p>
          ) : null}
        </>
      ) : (
        <>
          <table className="admin-blogs-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Fee</th>
                <th>Active</th>
                <th>Fallback</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {programs.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.fee}</td>
                  <td>{row.is_active ? 'Yes' : 'No'}</td>
                  <td>{row.is_fallback ? 'Yes' : 'No'}</td>
                  <td>
                    <Link className="admin-blogs-link" to={`/marketing/quiz/programs/edit/${row.id}`}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {programs.length === 0 && !loading && sessionUser ? (
            <p className="admin-blogs-muted">No programs yet. Create one with &quot;New program&quot;.</p>
          ) : null}
        </>
      )}
      </div>
    </div>
  )
}

export default AdminQuiz
