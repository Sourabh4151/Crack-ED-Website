import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getApiBase,
  getUtmParams,
  appendUtmToUrl,
  getCfProgramByProgram,
  CF_BATCH_NAME,
  isBackendUnreachable,
  BACKEND_DOWN_MESSAGE,
} from '../../services/crmService';
import { trackMicrositeClick, markQuizCompleted } from '../../utils/analytics';
import 'react-toastify/dist/ReactToastify.css';

// Program fees (₹) - used for tie-breaking when counts are equal
const PROGRAM_FEES = {
  'Udaan Program - Cashier / Teller': 100000,
  'Udaan Program - Virtual Relationship Manager': 80000,
  'Udaan Program - Relationship Manager': 100000,
  'Lenskart EyeTech Program - Clinical Technician': 100000,
  'Lenskart EyeTech Program - Retail Sales Associate': 100000,
  'Piramal ProEdge Program - Relationship Manager': 100000,
  'Paytm Disha Program - Field Sales Executive': 50000,
  'Aviva Nirmaan Program - Direct Sales Executive': 100000,
  'Aviva Nirmaan Program - Agency Sales Executive': 100000,
  'Poonawalla FinPro Career Program - Sales Executive': 50000,
  'Poonawalla FinPro Career Program - Gold Assayer': 134746,
  'Finova VyaparaMitra Program - Relationship Officer': 84746,
  'Postgraduate Program Relationship Management - Relationship Manager': 360000,
  'Postgraduate Program Retail Banking - Relationship Officer': 40000,
  'Postgraduate Program Banking Management - Assistant Manager': 200000,
  'Postgraduate Certification Banking Management - Business Development Executive': 50848,
  'Banking Sales Program - Sales Officer': 60000,
  'Mahindra Finance Prarambh Program - Business Executive': 70000,
  'Udaan Program - Business Loan Associate': 80000,
  'Elevate Banking Program - Virtual Relationship Manager': 40000,
  'Hero Housing Finance Pragati Program - Relationship Manager': 100000,
  'Hero Housing Finance Pragati Program - Collection Officer': 225000,
  'Hero Housing Finance Pragati Program - Credit and Operations Manager': 200000,
  'Rupyy AutoEdge Program - Business Manager': 100000,
};

// Program details for display (title, details, duration, link)
const PROGRAM_DETAILS = {
  'Udaan Program - Cashier / Teller': { details: 'CTC of upto Rs 3.5 LPA', duration: '2-month program', link: 'https://udaan.crack-ed.com/portal' },
  'Udaan Program - Virtual Relationship Manager': { details: 'CTC of upto Rs 2.8 LPA', duration: '4-week program', link: 'https://udaanvrm.crack-ed.com' },
  'Udaan Program - Relationship Manager': { details: 'CTC of upto Rs 6.5 LPA', duration: '3-week program', link: 'https://udaanrm.crack-ed.com' },
  'Lenskart EyeTech Program - Clinical Technician': { details: 'CTC of Rs 2.64 LPA', duration: '6-month program', link: 'https://lenskart.crack-ed.com/portal' },
  'Lenskart EyeTech Program - Retail Sales Associate': { details: 'CTC of Rs 3 LPA + incentives', duration: '9-weeks program', link: 'https://lenskartrsa.crack-ed.com/portal' },
  'Piramal ProEdge Program - Relationship Manager': { details: 'CTC of Rs 2.74 LPA + variable', duration: '13-weeks program', link: 'https://piramal.crack-ed.com/portal' },
  'Paytm Disha Program - Field Sales Executive': { details: 'CTC of Rs 2.5 LPA + incentives', duration: '2-week program (virtual)', link: 'https://paytm.crack-ed.com/portal' },
  'Aviva Nirmaan Program - Direct Sales Executive': { details: 'CTC of Rs 3.5 LPA + variable', duration: '3-month program', link: 'https://avivads.crack-ed.com' },
  'Aviva Nirmaan Program - Agency Sales Executive': { details: 'CTC of Rs 3.5 LPA + variable', duration: '3-month program', link: 'https://avivaas.crack-ed.com' },
  'Poonawalla FinPro Career Program - Sales Executive': { details: 'CTC of upto Rs 2.76 LPA + incentives', duration: '3-week program', link: 'http://poonawallase.crack-ed.com/' },
  'Poonawalla FinPro Career Program - Gold Assayer': { details: 'CTC of Rs 2.5 LPA + incentives', duration: '1.5-month program', link: 'http://poonawallaga.crack-ed.com/' },
  'Finova VyaparaMitra Program - Relationship Officer': { details: 'CTC of Rs 2.4 LPA + variable', duration: '1-month program', link: 'https://finovaro.crack-ed.com' },
  'Postgraduate Program Relationship Management - Relationship Manager': { details: 'CTC of Rs 5.5 LPA + incentives', duration: '6-month program', link: 'https://pgprm.crack-ed.com' },
  'Postgraduate Program Retail Banking - Relationship Officer': { details: 'CTC of upto Rs 3.1 LPA + incentives', duration: '3-week program', link: 'https://pgprb.crack-ed.com' },
  'Postgraduate Program Banking Management - Assistant Manager': { details: 'CTC of Rs 4 LPA + incentives', duration: '6-month program', link: 'https://pgpam.crack-ed.com' },
  'Banking Sales Program - Sales Officer': { details: 'CTC of Rs 2.5 LPA + incentives', duration: '3-month program', link: 'https://bspso.crack-ed.com' },
  'Mahindra Finance Prarambh Program - Business Executive': { details: 'CTC of Rs 3.5 LPA + incentives', duration: '1-month online program', link: 'https://mahindrafinancebe.crack-ed.com/' },
  'Postgraduate Certification Banking Management - Business Development Executive': { details: 'CTC of Rs 2.5 LPA + incentives', duration: '2-week program', link: 'https://pgcbm.crack-ed.com' },
  'Udaan Program - Business Loan Associate': { details: 'CTC of upto Rs 2.8 LPA', duration: '3-week program', link: 'https://udaanbusiness.crack-ed.com' },
  'Elevate Banking Program - Virtual Relationship Manager': { details: 'CTC of upto Rs 2.4 LPA', duration: '4-week program', link: 'https://elevatevrm.crack-ed.com/' },
  'Hero Housing Finance Pragati Program - Relationship Manager': { details: 'CTC of Rs 2.75 LPA + incentives', duration: '1-month program', link: 'https://herofinancerm.crack-ed.com/' },
  'Hero Housing Finance Pragati Program - Collection Officer': { details: 'CTC of Rs 5 LPA + incentives', duration: '1-month program', link: 'https://herofinanceco.crack-ed.com/' },
  'Hero Housing Finance Pragati Program - Credit and Operations Manager': { details: 'CTC of Rs 4 LPA + incentives', duration: '1-month program', link: 'https://herofinancecom.crack-ed.com/' },
  'Rupyy AutoEdge Program - Business Manager': { details: 'CTC of Rs 3 LPA + incentives', duration: '1-month program', link: 'https://rupyybm.crack-ed.com/' },
};

// For each question: option (A/B/C/D) -> [program1, program2, program3] — each gets +1 count when selected
const OPTION_TO_PROGRAMS = [
  // Q1: How do you usually feel about meeting new people?
  {
    A: [
      'Banking Sales Program - Sales Officer',
      'Aviva Nirmaan Program - Direct Sales Executive',
      'Mahindra Finance Prarambh Program - Business Executive',
    ],
    B: [
      'Postgraduate Program Relationship Management - Relationship Manager',
      'Piramal ProEdge Program - Relationship Manager',
      'Elevate Banking Program - Virtual Relationship Manager',
    ],
    C: [
      'Hero Housing Finance Pragati Program - Credit and Operations Manager',
      'Postgraduate Program Banking Management - Assistant Manager',
      'Hero Housing Finance Pragati Program - Collection Officer',
    ],
    D: [
      'Hero Housing Finance Pragati Program - Relationship Manager',
      'Rupyy AutoEdge Program - Business Manager',
      'Postgraduate Program Retail Banking - Relationship Officer',
    ],
  },
  // Q2: What kind of work environment appeals to you most?
  {
    A: [
      'Banking Sales Program - Sales Officer',
      'Mahindra Finance Prarambh Program - Business Executive',
      'Hero Housing Finance Pragati Program - Relationship Manager',
    ],
    B: [
      'Rupyy AutoEdge Program - Business Manager',
      'Postgraduate Program Retail Banking - Relationship Officer',
      'Piramal ProEdge Program - Relationship Manager',
    ],
    C: [
      'Hero Housing Finance Pragati Program - Credit and Operations Manager',
      'Postgraduate Program Banking Management - Assistant Manager',
      'Hero Housing Finance Pragati Program - Collection Officer',
    ],
    D: [
      'Elevate Banking Program - Virtual Relationship Manager',
      'Postgraduate Program Relationship Management - Relationship Manager',
      'Aviva Nirmaan Program - Agency Sales Executive',
    ],
  },
  // Q3: Which statement describes you best?
  {
    A: [
      'Aviva Nirmaan Program - Direct Sales Executive',
      'Banking Sales Program - Sales Officer',
      'Aviva Nirmaan Program - Agency Sales Executive',
    ],
    B: [
      'Piramal ProEdge Program - Relationship Manager',
      'Postgraduate Program Relationship Management - Relationship Manager',
      'Hero Housing Finance Pragati Program - Relationship Manager',
    ],
    C: [
      'Hero Housing Finance Pragati Program - Credit and Operations Manager',
      'Postgraduate Program Banking Management - Assistant Manager',
      'Postgraduate Program Retail Banking - Relationship Officer',
    ],
    D: [
      'Hero Housing Finance Pragati Program - Collection Officer',
      'Elevate Banking Program - Virtual Relationship Manager',
      'Rupyy AutoEdge Program - Business Manager',
    ],
  },
  // Q4: How do you react when faced with challenging targets?
  {
    A: [
      'Aviva Nirmaan Program - Direct Sales Executive',
      'Banking Sales Program - Sales Officer',
      'Mahindra Finance Prarambh Program - Business Executive',
    ],
    B: [
      'Hero Housing Finance Pragati Program - Relationship Manager',
      'Piramal ProEdge Program - Relationship Manager',
      'Postgraduate Program Relationship Management - Relationship Manager',
    ],
    C: [
      'Postgraduate Program Banking Management - Assistant Manager',
      'Hero Housing Finance Pragati Program - Credit and Operations Manager',
      'Postgraduate Program Retail Banking - Relationship Officer',
    ],
    D: [
      'Hero Housing Finance Pragati Program - Collection Officer',
      'Rupyy AutoEdge Program - Business Manager',
      'Elevate Banking Program - Virtual Relationship Manager',
    ],
  },
  // Q5: What gives you the greatest satisfaction?
  {
    A: [
      'Banking Sales Program - Sales Officer',
      'Aviva Nirmaan Program - Direct Sales Executive',
      'Mahindra Finance Prarambh Program - Business Executive',
    ],
    B: [
      'Piramal ProEdge Program - Relationship Manager',
      'Postgraduate Program Relationship Management - Relationship Manager',
      'Hero Housing Finance Pragati Program - Relationship Manager',
    ],
    C: [
      'Hero Housing Finance Pragati Program - Credit and Operations Manager',
      'Postgraduate Program Banking Management - Assistant Manager',
      'Elevate Banking Program - Virtual Relationship Manager',
    ],
    D: [
      'Hero Housing Finance Pragati Program - Collection Officer',
      'Rupyy AutoEdge Program - Business Manager',
      'Postgraduate Program Retail Banking - Relationship Officer',
    ],
  },
  // Q6: Which work style suits you best?
  {
    A: [
      'Aviva Nirmaan Program - Agency Sales Executive',
      'Banking Sales Program - Sales Officer',
      'Mahindra Finance Prarambh Program - Business Executive',
    ],
    B: [
      'Postgraduate Program Relationship Management - Relationship Manager',
      'Piramal ProEdge Program - Relationship Manager',
      'Hero Housing Finance Pragati Program - Relationship Manager',
    ],
    C: [
      'Postgraduate Program Banking Management - Assistant Manager',
      'Postgraduate Program Retail Banking - Relationship Officer',
      'Elevate Banking Program - Virtual Relationship Manager',
    ],
    D: [
      'Hero Housing Finance Pragati Program - Credit and Operations Manager',
      'Hero Housing Finance Pragati Program - Collection Officer',
      'Rupyy AutoEdge Program - Business Manager',
    ],
  },
  // Q7: How comfortable are you with travelling regularly for work?
  {
    A: [
      'Banking Sales Program - Sales Officer',
      'Mahindra Finance Prarambh Program - Business Executive',
      'Hero Housing Finance Pragati Program - Relationship Manager',
    ],
    B: [
      'Rupyy AutoEdge Program - Business Manager',
      'Postgraduate Program Retail Banking - Relationship Officer',
      'Aviva Nirmaan Program - Direct Sales Executive',
    ],
    C: [
      'Hero Housing Finance Pragati Program - Collection Officer',
      'Piramal ProEdge Program - Relationship Manager',
      'Postgraduate Program Banking Management - Assistant Manager',
    ],
    D: [
      'Elevate Banking Program - Virtual Relationship Manager',
      'Hero Housing Finance Pragati Program - Credit and Operations Manager',
      'Postgraduate Program Relationship Management - Relationship Manager',
    ],
  },
  // Q8: What type of success motivates you most?
  {
    A: [
      'Aviva Nirmaan Program - Direct Sales Executive',
      'Banking Sales Program - Sales Officer',
      'Mahindra Finance Prarambh Program - Business Executive',
    ],
    B: [
      'Piramal ProEdge Program - Relationship Manager',
      'Hero Housing Finance Pragati Program - Relationship Manager',
      'Postgraduate Program Relationship Management - Relationship Manager',
    ],
    C: [
      'Hero Housing Finance Pragati Program - Credit and Operations Manager',
      'Postgraduate Program Banking Management - Assistant Manager',
      'Elevate Banking Program - Virtual Relationship Manager',
    ],
    D: [
      'Hero Housing Finance Pragati Program - Collection Officer',
      'Rupyy AutoEdge Program - Business Manager',
      'Postgraduate Program Retail Banking - Relationship Officer',
    ],
  },
  // Q9: Which activity sounds most interesting?
  {
    A: [
      'Banking Sales Program - Sales Officer',
      'Aviva Nirmaan Program - Agency Sales Executive',
      'Mahindra Finance Prarambh Program - Business Executive',
    ],
    B: [
      'Hero Housing Finance Pragati Program - Relationship Manager',
      'Piramal ProEdge Program - Relationship Manager',
      'Postgraduate Program Relationship Management - Relationship Manager',
    ],
    C: [
      'Hero Housing Finance Pragati Program - Credit and Operations Manager',
      'Postgraduate Program Banking Management - Assistant Manager',
      'Elevate Banking Program - Virtual Relationship Manager',
    ],
    D: [
      'Hero Housing Finance Pragati Program - Collection Officer',
      'Rupyy AutoEdge Program - Business Manager',
      'Postgraduate Program Retail Banking - Relationship Officer',
    ],
  },
  // Q10: Which statement best reflects your career preference?
  {
    A: [
      'Aviva Nirmaan Program - Direct Sales Executive',
      'Banking Sales Program - Sales Officer',
      'Mahindra Finance Prarambh Program - Business Executive',
    ],
    B: [
      'Hero Housing Finance Pragati Program - Relationship Manager',
      'Piramal ProEdge Program - Relationship Manager',
      'Postgraduate Program Relationship Management - Relationship Manager',
    ],
    C: [
      'Postgraduate Program Banking Management - Assistant Manager',
      'Hero Housing Finance Pragati Program - Credit and Operations Manager',
      'Elevate Banking Program - Virtual Relationship Manager',
    ],
    D: [
      'Hero Housing Finance Pragati Program - Collection Officer',
      'Rupyy AutoEdge Program - Business Manager',
      'Postgraduate Program Retail Banking - Relationship Officer',
    ],
  },
];

const CareerQuiz = ({ showOnlyTopProgram = false }) => {
  const questions = [
    { id: 1, question: "How do you usually feel about meeting new people?", options: [
      { text: "I enjoy meeting new people and starting conversations", mapping: "A" },
      { text: "I like building meaningful relationships over time", mapping: "B" },
      { text: "I interact when necessary and prefer structure", mapping: "C" },
      { text: "I prefer focused conversations with a specific purpose", mapping: "D" },
    ]},
    { id: 2, question: "What kind of work environment appeals to you most?", options: [
      { text: "Being out in the market and meeting customers", mapping: "A" },
      { text: "A mix of customer interaction and planning", mapping: "B" },
      { text: "A structured office environment", mapping: "C" },
      { text: "A desk-based role involving communication", mapping: "D" },
    ]},
    { id: 3, question: "Which statement describes you best?", options: [
      { text: "I enjoy persuading people and influencing decisions", mapping: "A" },
      { text: "I enjoy understanding people's needs", mapping: "B" },
      { text: "I enjoy organizing and managing tasks", mapping: "C" },
      { text: "I enjoy solving problems patiently", mapping: "D" },
    ]},
    { id: 4, question: "How do you react when faced with challenging targets?", options: [
      { text: "I feel motivated and competitive", mapping: "A" },
      { text: "I enjoy balancing targets with customer relationships", mapping: "B" },
      { text: "I focus on planning and execution", mapping: "C" },
      { text: "I stay persistent until the issue is resolved", mapping: "D" },
    ]},
    { id: 5, question: "What gives you the greatest satisfaction?", options: [
      { text: "Winning new opportunities", mapping: "A" },
      { text: "Building long-term trust", mapping: "B" },
      { text: "Completing work accurately", mapping: "C" },
      { text: "Resolving difficult situations", mapping: "D" },
    ]},
    { id: 6, question: "Which work style suits you best?", options: [
      { text: "Fast-paced and energetic", mapping: "A" },
      { text: "Relationship-focused", mapping: "B" },
      { text: "Process-focused", mapping: "C" },
      { text: "Analytical and detail-oriented", mapping: "D" },
    ]},
    { id: 7, question: "How comfortable are you with travelling regularly for work?", options: [
      { text: "Very comfortable", mapping: "A" },
      { text: "Comfortable occasionally", mapping: "B" },
      { text: "Only if required", mapping: "C" },
      { text: "Prefer minimal travel", mapping: "D" },
    ]},
    { id: 8, question: "What type of success motivates you most?", options: [
      { text: "Incentives and performance rewards", mapping: "A" },
      { text: "Customer appreciation and trust", mapping: "B" },
      { text: "Operational excellence", mapping: "C" },
      { text: "Solving challenging situations", mapping: "D" },
    ]},
    { id: 9, question: "Which activity sounds most interesting?", options: [
      { text: "Acquiring new customers", mapping: "A" },
      { text: "Managing customer portfolios", mapping: "B" },
      { text: "Reviewing documents and processes", mapping: "C" },
      { text: "Negotiating solutions to problems", mapping: "D" },
    ]},
    { id: 10, question: "Which statement best reflects your career preference?", options: [
      { text: "I want a career with high earning potential through performance", mapping: "A" },
      { text: "I want a career built around customer relationships", mapping: "B" },
      { text: "I want a stable career with responsibility and structure", mapping: "C" },
      { text: "I want a role where I solve challenges and create impact", mapping: "D" },
    ]},
  ];

  const [view, setView] = useState('quiz');
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState(Array(10).fill(null));
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });
  const [loading, setLoading] = useState(false);

  const handleSelectOption = (mapping) => {
    const newSelections = [...selections];
    newSelections[step] = mapping;
    setSelections(newSelections);
  };

  /**
   * Each option maps to 3 programs. Add +1 to each for that selection.
   * Rank by count (highest first). Tie-break by fee (highest fee = first priority).
   * Returns: { perfectFit, alternatives } — perfectFit is 1st, alternatives are 2nd & 3rd.
   */
  const calculateResults = () => {
    const counts = {};

    selections.forEach((option, qIndex) => {
      if (!option || !OPTION_TO_PROGRAMS[qIndex]) return;
      const programs = OPTION_TO_PROGRAMS[qIndex][option];
      if (programs) {
        programs.forEach((prog) => {
          counts[prog] = (counts[prog] || 0) + 1;
        });
      }
    });

    // Sort programs: 1) by count (desc), 2) by fee (desc) for ties
    const sorted = Object.entries(counts).sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1]; // higher count first
      const feeA = PROGRAM_FEES[a[0]] ?? 0;
      const feeB = PROGRAM_FEES[b[0]] ?? 0;
      return feeB - feeA; // higher fee first
    });

    const programNames = sorted.map(([name]) => name);
    const perfectFit = programNames[0] || 'Lenskart EyeTech Program - Clinical Technician';
    const alternatives = programNames.slice(1, 3);

    return { perfectFit, alternatives };
  };

  const validateForm = () => {
    const { name, email, mobile } = formData;

    if (name.trim().length < 4) {
      toast.error("Name must be at least 4 characters long");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return false;
    }

    return true;
  };

  const handleFinalSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const { perfectFit } = calculateResults();
    const cfProgram = getCfProgramByProgram(perfectFit);
    const sourcePage =
      typeof window !== 'undefined'
        ? (window.location.pathname || window.location.href || '')
        : '';
    const utmParams = getUtmParams();
    const payload = {
      ...formData,
      selections,
      bestFit: perfectFit,
      ...(cfProgram ? { cfProgram } : {}),
      cfBatchName: CF_BATCH_NAME,
      sourcePage,
      ...(Object.keys(utmParams).length > 0 ? { utmParams } : {}),
    };

    try {
      const apiBase = getApiBase();
      const res = await fetch(`${apiBase}/api/quiz/submit/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        toast.success("Profile saved successfully!");
      } else {
        const errData = await res.json().catch(() => ({}));
        console.error('Quiz submit failed:', res.status, errData);
        throw new Error(errData?.error || "Submit failed");
      }
    } catch (err) {
      console.error('Quiz submit error:', err);
      if (isBackendUnreachable(err)) {
        toast.error(BACKEND_DOWN_MESSAGE);
      } else {
        toast.info("Showing results...");
      }
    } finally {
      setView('result');
      setLoading(false);
    }
  };

  if (view === 'result') {
    markQuizCompleted();
    const { perfectFit, alternatives } = calculateResults();
    const perfectFitDetails = PROGRAM_DETAILS[perfectFit] || { details: '', duration: '', link: '#' };

    return (
      <div className="quiz-container result-page">
        <div className="badge-outline">Your Perfect Fit</div>
        <div className="hero-card">
          <div className="hero-content">
            <h2>{perfectFit}</h2>
            <ul className="hero-lists">
              <li><span className="check">✔</span> {perfectFitDetails.details}</li>
              <li><span className="check">✔</span> {perfectFitDetails.duration}</li>
            </ul>
            <div style={{ display: "inline-block" }}>
              <a style={{ textDecoration: "none" }} href={appendUtmToUrl(perfectFitDetails.link)} target="_blank" rel="noopener noreferrer" onClick={() => trackMicrositeClick(perfectFit)}>
                <button className="hero-cta-button">Explore Program</button>
              </a>
            </div>
          </div>
        </div>
        {!showOnlyTopProgram && (
          <>
            <p className="section-title">ALTERNATE PROGRAM SUGGESTIONS</p>
            <div className="alt-grid">
              {alternatives.map((progName, i) => {
                const details = PROGRAM_DETAILS[progName];
                const d = details?.details || '';
                const link = details?.link || '#';
                return (
                  <div key={i} className="alt-card">
                    <h3>{progName} - {d}</h3>
                    <div style={{ display: "inline-block" }}>
                      <a href={appendUtmToUrl(link)} target="_blank" rel="noopener noreferrer" onClick={() => trackMicrositeClick(progName)}>
                        <button className="secondary-btn-outline">Explore Program</button>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {showOnlyTopProgram && (
          <div className="inf-cf-explore-card">
            <p className="inf-cf-explore-text">
              Want to explore more options? Browse all programs and compare roles.
            </p>
            <Link to="/programs" className="inf-cf-explore-btn">
              Explore All Programs
            </Link>
          </div>
        )}
      </div>
    );
  }

  if (view === 'form') {
    return (
      <div className="quiz-container">
        <div className="badge-outline">Your Results Are Ready</div>
        <h2 className="form-main-heading">You're almost there! View your results now</h2>
        <div className="form-card-box">
          <div className="form-field">
            <label>Name</label>
            <input type="text" placeholder="Enter name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div className="form-field">
            <label>Email</label>
            <input type="email" placeholder="Enter email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div className="form-field">
            <label>Mobile</label>
            <input type="text" maxLength="10" placeholder="Enter mobile" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })} />
          </div>
        </div>
        <div className="navigation-footer">
          <button className="view-results-btn" onClick={handleFinalSubmit} disabled={loading}>
            {loading ? "Saving..." : "View Results"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="progress-section">
        <span className="step-count">QUESTION {step + 1} OF 10</span>
      </div>
      <h2 className="question-text">{questions[step].question}</h2>
      <div className="options-stack">
        {questions[step].options.map((opt, index) => (
          <button
            key={index}
            className={`quiz-option-button ${selections[step] === opt.mapping ? 'selected' : ''}`}
            onClick={() => handleSelectOption(opt.mapping)}
          >
            {opt.text}
          </button>
        ))}
      </div>
      <div className="navigation-footer">
        {step > 0 && (
          <button type="button" className="back-link" onClick={() => setStep(step - 1)}>
            Back
          </button>
        )}
        <button type="button" className="view-results-btn" onClick={() => step === 9 ? setView('form') : setStep(step + 1)} disabled={!selections[step]}>
          {step === 9 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default CareerQuiz;
