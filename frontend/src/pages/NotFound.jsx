import { Link, useLocation } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import SEO from '../components/SEO/SEO'
import { PAGE_SEO } from '../seo/site'
import './NotFound.css'

const NotFound = () => {
  const { pathname } = useLocation()

  return (
    <div className="not-found-page">
      <SEO
        title={PAGE_SEO.notFound.title}
        description={PAGE_SEO.notFound.description}
        path={pathname}
        robots={PAGE_SEO.notFound.robots}
        includeOrganization={false}
      />
      <Header />
      <main className="not-found-main">
        <p className="not-found-code">404</p>
        <h1 className="not-found-title">Page not found</h1>
        <p className="not-found-text">
          This address is not a Crack-ED page. Head back to the homepage to browse programs, blogs, and careers.
        </p>
        <Link to="/" className="not-found-link">
          Back to homepage
        </Link>
      </main>
      <Footer />
    </div>
  )
}

export default NotFound
