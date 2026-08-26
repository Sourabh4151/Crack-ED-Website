import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
//import TagManager from 'react-gtm-module'

// Styling
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

// Components
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import PreserveUtmParams from './components/PreserveUtmParams/PreserveUtmParams'
import Home from './pages/Home'

// Pages

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

// 1. Initialize GTM with your Container ID
// Replace the old GTM-K4Z3BMQ with your new GT ID
//const tagManagerArgs = {
//  gtmId: 'GT-T9WGNWGH'
//}
//TagManager.initialize(tagManagerArgs)

// 2. Analytics Component to track Page Views
// This ensures GA4 sees the URL change even if the page doesn't hard-reload
//const AnalyticsTracker = () => {
//  const location = useLocation();
//
//  useEffect(() => {
//    window.dataLayer = window.dataLayer || [];
//    window.dataLayer.push({
//      event: 'pageview',
//      page_path: location.pathname + location.search,
//      page_title: document.title
//    });
//  }, [location]);
//
//  return null;
//};

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
      <ScrollToTop />
      <PreserveUtmParams />

      <div className="App">
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
        </Routes>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
