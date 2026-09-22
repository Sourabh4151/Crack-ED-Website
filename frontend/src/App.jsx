import React, { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from 'react-router-dom'

import './App.css'

import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import PreserveUtmParams from './components/PreserveUtmParams/PreserveUtmParams'
import ClarityTracker from './components/ClarityTracker/ClarityTracker'
import StickyPhoneIcon from './components/StickyPhoneIcon/StickyPhoneIcon'
import Home from './pages/Home'

const Programs = lazy(() => import('./pages/Programs'))
const Careers = lazy(() => import('./pages/Careers'))
const JobDetail = lazy(() => import('./pages/JobDetail'))
const About = lazy(() => import('./pages/About'))
const BID = lazy(() => import('./pages/BID'))
const Resources = lazy(() => import('./pages/Resources'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Influencer = lazy(() => import('./pages/Influencer'))
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsConditions = lazy(() => import('./pages/TermsConditions'))
const ContactUs = lazy(() => import('./pages/ContactUs'))
const AdminBlogs = lazy(() => import('./pages/AdminBlogs'))
const AdminBlogEdit = lazy(() => import('./pages/AdminBlogEdit'))
const AdminQuiz = lazy(() => import('./pages/AdminQuiz'))
const AdminQuizQuestionEdit = lazy(() => import('./pages/AdminQuizQuestionEdit'))
const AdminQuizProgramEdit = lazy(() => import('./pages/AdminQuizProgramEdit'))

const ToastContainer = lazy(() =>
  import('react-toastify').then(async (mod) => {
    await import('react-toastify/dist/ReactToastify.css')
    return { default: mod.ToastContainer }
  })
)

function DeferredToastContainer() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const enable = () => setReady(true)
    let idleId
    let timeoutId
    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(enable, { timeout: 2500 })
    } else {
      timeoutId = window.setTimeout(enable, 2500)
    }
    return () => {
      if (idleId != null && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId != null) window.clearTimeout(timeoutId)
    }
  }, [])

  if (!ready) return null

  return (
    <Suspense fallback={null}>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        draggable
        pauseOnHover
        theme="dark"
      />
    </Suspense>
  )
}

function BlogPostRoute () {
  const { id } = useParams()
  return <BlogPost key={id} />
}

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if gtag is defined (it's loaded from index.html)
    if (window.gtag) {
      window.gtag('config', 'G-F0FFFY7C90', {
        page_path: location.pathname + location.search,
        page_title: document.title
      });
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      {/* AnalyticsTracker must be inside Router to use useLocation() */}
      <AnalyticsTracker />
      <ClarityTracker />
      <ScrollToTop />
      <PreserveUtmParams />

      <div className="App">
        <DeferredToastContainer />
        <StickyPhoneIcon />

        <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/job/:id" element={<JobDetail />} />
          <Route path="/badhta-india-dekho" element={<BID />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/blog/:id" element={<BlogPostRoute />} />
          <Route path="/influencer" element={<Influencer />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/marketing/blogs" element={<AdminBlogs />} />
          <Route path="/marketing/blogs/new" element={<AdminBlogEdit />} />
          <Route path="/marketing/blogs/edit/:id" element={<AdminBlogEdit />} />
          <Route path="/marketing/quiz" element={<AdminQuiz />} />
          <Route path="/marketing/quiz/questions/new" element={<AdminQuizQuestionEdit />} />
          <Route path="/marketing/quiz/questions/edit/:id" element={<AdminQuizQuestionEdit />} />
          <Route path="/marketing/quiz/programs/new" element={<AdminQuizProgramEdit />} />
          <Route path="/marketing/quiz/programs/edit/:id" element={<AdminQuizProgramEdit />} />
        </Routes>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
