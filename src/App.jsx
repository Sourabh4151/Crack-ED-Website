import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Programs from './pages/Programs'
import Careers from './pages/Careers'
import JobDetail from './pages/JobDetail'
import About from './pages/About'
import BID from './pages/BID'
import Resources from './pages/Resources'
import BlogPost from './pages/BlogPost'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import './App.css'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/job/:id" element={<JobDetail />} />
          <Route path="/badhta-india-dekho" element={<BID />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/blog/:id" element={<BlogPost />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App