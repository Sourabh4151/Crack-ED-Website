import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import PreserveUtmParams from './components/PreserveUtmParams/PreserveUtmParams'
import './App.css'

function App() {
  return (
    <Router>
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
        </Routes>
      </div>
    </Router>
  )
}

export default App