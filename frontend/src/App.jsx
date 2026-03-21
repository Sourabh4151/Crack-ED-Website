import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import TagManager from 'react-gtm-module'

// Styling
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

// Components
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import PreserveUtmParams from './components/PreserveUtmParams/PreserveUtmParams'

// Pages
import Home from './pages/Home'
import Programs from './pages/Programs'
import Careers from './pages/Careers'
import JobDetail from './pages/JobDetail'
import About from './pages/About'
import BID from './pages/BID'
import Resources from './pages/Resources'
import BlogPost from './pages/BlogPost'
import Influencer from './pages/Influencer'
import RefundPolicy from './pages/RefundPolicy'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import AdminBlogs from './pages/AdminBlogs'
import AdminBlogEdit from './pages/AdminBlogEdit'

// 1. Initialize GTM with your Container ID
// Replace the old GTM-K4Z3BMQ with your new GT ID
const tagManagerArgs = {
  gtmId: 'GT-T9WGNWGH'
}
TagManager.initialize(tagManagerArgs)

// 2. Analytics Component to track Page Views
// This ensures GA4 sees the URL change even if the page doesn't hard-reload
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'pageview',
      page_path: location.pathname + location.search,
      page_title: document.title
    });
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

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/job/:id" element={<JobDetail />} />
          <Route path="/badhta-india-dekho" element={<BID />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/blog/:id" element={<BlogPost />} />
          <Route path="/influencer" element={<Influencer />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/admin/blogs" element={<AdminBlogs />} />
          <Route path="/admin/blogs/new" element={<AdminBlogEdit />} />
          <Route path="/admin/blogs/edit/:id" element={<AdminBlogEdit />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
