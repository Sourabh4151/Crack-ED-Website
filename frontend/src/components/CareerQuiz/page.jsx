import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getApiBase, getUtmParams, isBackendUnreachable, BACKEND_DOWN_MESSAGE } from '../../services/crmService';
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
  'Postgraduate Program Relationship Management - Relationship Manager': 254238,
  'Postgraduate Program Banking Management - Assistant Manager': 169492,
  'Postgraduate Certification Banking Management - Business Development Executive': 50848,
  'Udaan Program - Business Loan Associate': 80000,
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
  'Finova VyaparaMitra Program - Relationship Officer': { details: 'CTC of Rs 2.4 LPA + variable', duration: '3-month program', link: 'https://finovaro.crack-ed.com' },
  'Postgraduate Program Relationship Management - Relationship Manager': { details: 'CTC of Rs 5.5 LPA + incentives', duration: '6-month program', link: 'https://pgprm.crack-ed.com' },
  'Postgraduate Program Banking Management - Assistant Manager': { details: 'CTC of Rs 4 LPA + incentives', duration: '6-month program', link: 'https://pgpam.crack-ed.com' },
  'Postgraduate Certification Banking Management - Business Development Executive': { details: 'CTC of Rs 2.5 LPA + incentives', duration: '2-week program', link: 'https://pgcbm.crack-ed.com' },
  'Udaan Program - Business Loan Associate': { details: 'CTC of upto Rs 2.8 LPA', duration: '3-week program', link: 'https://udaanbusiness.crack-ed.com' },
};

// For each question: option (A/B/C/D) -> [program1, program2, program3] — each gets +1 count when selected
const OPTION_TO_PROGRAMS = [
  // Q1: How do you generally feel about interacting with people?
  {
    A: [
      'Aviva Nirmaan Program - Direct Sales Executive',
      'Poonawalla FinPro Career Program - Sales Executive',
      'Postgraduate Certification Banking Management - Business Development Executive',
    ],
    B: [
      'Postgraduate Program Relationship Management - Relationship Manager',
      'Piramal ProEdge Program - Relationship Manager',
      'Finova VyaparaMitra Program - Relationship Officer',
    ],
    C: [
      'Lenskart EyeTech Program - Retail Sales Associate',
      'Udaan Program - Virtual Relationship Manager',
      'Udaan Program - Relationship Manager',
    ],
    D: [
      'Lenskart EyeTech Program - Clinical Technician',
      'Poonawalla FinPro Career Program - Gold Assayer',
      'Udaan Program - Cashier / Teller',
    ],
  },
  // Q2: Which type of daily routine appeals to you the most?
  {
    A: [
      'Aviva Nirmaan Program - Direct Sales Executive',
      'Poonawalla FinPro Career Program - Sales Executive',
      'Postgraduate Certification Banking Management - Business Development Executive',
    ],
    B: [
      'Postgraduate Program Banking Management - Assistant Manager',
      'Piramal ProEdge Program - Relationship Manager',
      'Finova VyaparaMitra Program - Relationship Officer',
    ],
    C: [
      'Udaan Program - Cashier / Teller',
      'Udaan Program - Business Loan Associate',
      'Udaan Program - Relationship Manager',
    ],
    D: [
      'Lenskart EyeTech Program - Clinical Technician',
      'Poonawalla FinPro Career Program - Gold Assayer',
      'Udaan Program - Virtual Relationship Manager',
    ],
  },
  // Q3: How do you usually respond to responsibility and pressure?
  {
    A: [
      'Aviva Nirmaan Program - Agency Sales Executive',
      'Aviva Nirmaan Program - Direct Sales Executive',
      'Poonawalla FinPro Career Program - Sales Executive',
    ],
    B: [
      'Postgraduate Program Banking Management - Assistant Manager',
      'Udaan Program - Relationship Manager',
      'Finova VyaparaMitra Program - Relationship Officer',
    ],
    C: [
      'Lenskart EyeTech Program - Retail Sales Associate',
      'Udaan Program - Virtual Relationship Manager',
      'Piramal ProEdge Program - Relationship Manager',
    ],
    D: [
      'Poonawalla FinPro Career Program - Gold Assayer',
      'Udaan Program - Cashier / Teller',
      'Lenskart EyeTech Program - Clinical Technician',
    ],
  },
  // Q4: Which description fits you best?
  {
    A: [
      'Aviva Nirmaan Program - Agency Sales Executive',
      'Poonawalla FinPro Career Program - Sales Executive',
      'Postgraduate Certification Banking Management - Business Development Executive',
    ],
    B: [
      'Postgraduate Program Relationship Management - Relationship Manager',
      'Piramal ProEdge Program - Relationship Manager',
      'Finova VyaparaMitra Program - Relationship Officer',
    ],
    C: [
      'Udaan Program - Cashier / Teller',
      'Poonawalla FinPro Career Program - Gold Assayer',
      'Udaan Program - Business Loan Associate',
    ],
    D: [
      'Lenskart EyeTech Program - Retail Sales Associate',
      'Udaan Program - Virtual Relationship Manager',
      'Postgraduate Program Banking Management - Assistant Manager',
    ],
  },
  // Q5: What do you enjoy doing more?
  {
    A: [
      'Aviva Nirmaan Program - Direct Sales Executive',
      'Poonawalla FinPro Career Program - Sales Executive',
      'Postgraduate Certification Banking Management - Business Development Executive',
    ],
    B: [
      'Postgraduate Program Relationship Management - Relationship Manager',
      'Udaan Program - Business Loan Associate',
      'Finova VyaparaMitra Program - Relationship Officer',
    ],
    C: [
      'Poonawalla FinPro Career Program - Gold Assayer',
      'Lenskart EyeTech Program - Clinical Technician',
      'Udaan Program - Cashier / Teller',
    ],
    D: [
      'Lenskart EyeTech Program - Retail Sales Associate',
      'Udaan Program - Virtual Relationship Manager',
      'Piramal ProEdge Program - Relationship Manager',
    ],
  },
  // Q6: How do you prefer to work most of the time?
  {
    A: [
      'Aviva Nirmaan Program - Agency Sales Executive',
      'Aviva Nirmaan Program - Direct Sales Executive',
      'Poonawalla FinPro Career Program - Sales Executive',
    ],
    B: [
      'Postgraduate Program Banking Management - Assistant Manager',
      'Postgraduate Program Relationship Management - Relationship Manager',
      'Finova VyaparaMitra Program - Relationship Officer',
    ],
    C: [
      'Udaan Program - Cashier / Teller',
      'Udaan Program - Business Loan Associate',
      'Udaan Program - Relationship Manager',
    ],
    D: [
      'Udaan Program - Virtual Relationship Manager',
      'Lenskart EyeTech Program - Retail Sales Associate',
      'Piramal ProEdge Program - Relationship Manager',
    ],
  },
  // Q7: How do you feel about handling important records or sensitive details?
  {
    A: [
      'Poonawalla FinPro Career Program - Gold Assayer',
      'Udaan Program - Cashier / Teller',
      'Udaan Program - Business Loan Associate',
    ],
    B: [
      'Postgraduate Program Banking Management - Assistant Manager',
      'Udaan Program - Relationship Manager',
      'Piramal ProEdge Program - Relationship Manager',
    ],
    C: [
      'Udaan Program - Virtual Relationship Manager',
      'Lenskart EyeTech Program - Retail Sales Associate',
      'Finova VyaparaMitra Program - Relationship Officer',
    ],
    D: [
      'Aviva Nirmaan Program - Direct Sales Executive',
      'Aviva Nirmaan Program - Agency Sales Executive',
      'Poonawalla FinPro Career Program - Sales Executive',
    ],
  },
  // Q8: What type of work gives you the most satisfaction?
  {
    A: [
      'Aviva Nirmaan Program - Direct Sales Executive',
      'Poonawalla FinPro Career Program - Sales Executive',
      'Postgraduate Certification Banking Management - Business Development Executive',
    ],
    B: [
      'Postgraduate Program Relationship Management - Relationship Manager',
      'Piramal ProEdge Program - Relationship Manager',
      'Finova VyaparaMitra Program - Relationship Officer',
    ],
    C: [
      'Udaan Program - Business Loan Associate',
      'Udaan Program - Cashier / Teller',
      'Udaan Program - Relationship Manager',
    ],
    D: [
      'Lenskart EyeTech Program - Clinical Technician',
      'Poonawalla FinPro Career Program - Gold Assayer',
      'Udaan Program - Virtual Relationship Manager',
    ],
  },
  // Q9: How comfortable are you with travelling or going out when required?
  {
    A: [
      'Aviva Nirmaan Program - Direct Sales Executive',
      'Finova VyaparaMitra Program - Relationship Officer',
      'Poonawalla FinPro Career Program - Sales Executive',
    ],
    B: [
      'Piramal ProEdge Program - Relationship Manager',
      'Udaan Program - Relationship Manager',
      'Postgraduate Program Banking Management - Assistant Manager',
    ],
    C: [
      'Lenskart EyeTech Program - Retail Sales Associate',
      'Udaan Program - Cashier / Teller',
      'Udaan Program - Business Loan Associate',
    ],
    D: [
      'Udaan Program - Virtual Relationship Manager',
      'Lenskart EyeTech Program - Clinical Technician',
      'Poonawalla FinPro Career Program - Gold Assayer',
    ],
  },
  // Q10: WWhich work style feels most natural to you?
  {
    A: [
      'Aviva Nirmaan Program - Agency Sales Executive',
      'Poonawalla FinPro Career Program - Sales Executive',
      'Postgraduate Certification Banking Management - Business Development Executive',
    ],
    B: [
      'Postgraduate Program Relationship Management - Relationship Manager',
      'Udaan Program - Relationship Manager',
      'Postgraduate Program Banking Management - Assistant Manager',
    ],
    C: [
      'Udaan Program - Cashier / Teller',
      'Udaan Program - Business Loan Associate',
      'Piramal ProEdge Program - Relationship Manager',
    ],
    D: [
      'Lenskart EyeTech Program - Clinical Technician',
      'Poonawalla FinPro Career Program - Gold Assayer',
      'Udaan Program - Virtual Relationship Manager',
    ],
  },
];

const CareerQuiz = ({ showOnlyTopProgram = false }) => {
  const questions = [
    { id: 1, question: "How do you generally feel about interacting with people?", options: [
      { text: "I enjoy meeting and talking to many people", mapping: "A" },
      { text: "I like interaction when there is a clear purpose", mapping: "B" },
      { text: "I am comfortable but prefer limited interaction", mapping: "C" },
      { text: "I prefer calm, one-to-one interaction", mapping: "D" },
    ]},
    { id: 2, question: "Which type of daily routine appeals to you the most?", options: [
      { text: "Being active and moving around most of the day", mapping: "A" },
      { text: "A balance of movement and structured work", mapping: "B" },
      { text: "Mostly indoor work with organised tasks", mapping: "C" },
      { text: "Fixed location with steady, predictable tasks", mapping: "D" },
    ]},
    { id: 3, question: "How do you usually respond to responsibility and pressure?", options: [
      { text: "I enjoy challenges and pushing my limits", mapping: "A" },
      { text: "I can manage responsibility with some guidance", mapping: "B" },
      { text: "I prefer moderate and manageable responsibility", mapping: "C" },
      { text: "I focus more on accuracy than pressure", mapping: "D" },
    ]},
    { id: 4, question: "Which description fits you best?", options: [
      { text: "Energetic and confident", mapping: "A" },
      { text: "Patient and understanding", mapping: "B" },
      { text: "Detail-oriented and organised", mapping: "C" },
      { text: "Friendly and service-focused", mapping: "D" },
    ]},
    { id: 5, question: "What do you enjoy doing more?", options: [
      { text: "Explaining things and influencing decisions", mapping: "A" },
      { text: "Helping people make important choices", mapping: "B" },
      { text: "Handling work that requires accuracy", mapping: "C" },
      { text: "Supporting people and making them feel comfortable", mapping: "D" },
    ]},
    { id: 6, question: "How do you prefer to work most of the time?", options: [
      { text: "Independently and actively", mapping: "A" },
      { text: "With people and shared responsibility", mapping: "B" },
      { text: "With systems, rules, and processes", mapping: "C" },
      { text: "In a calm, customer-focused environment", mapping: "D" },
    ]},
    { id: 7, question: "How do you feel about handling important records or sensitive details?", options: [
      { text: "I am very careful and attentive", mapping: "A" },
      { text: "I am comfortable with proper checks and rules", mapping: "B" },
      { text: "I prefer light responsibility", mapping: "C" },
      { text: "I prefer not to handle such tasks", mapping: "D" },
    ]},
    { id: 8, question: "What type of work gives you the most satisfaction?", options: [
      { text: "Seeing results from effort and action", mapping: "A" },
      { text: "Building trust and long-term connections", mapping: "B" },
      { text: "Completing tasks correctly and on time", mapping: "C" },
      { text: "Using specialised skills with precision", mapping: "D" },
    ]},
    { id: 9, question: "How comfortable are you with travelling or going out for work when needed?", options: [
      { text: "Very comfortable, I enjoy it", mapping: "A" },
      { text: "Comfortable if there is a clear reason", mapping: "B" },
      { text: "I prefer staying in one place", mapping: "C" },
      { text: "I prefer indoor, focused work", mapping: "D" },
    ]},
    { id: 10, question: "Which work style feels most natural to you?", options: [
      { text: "Fast-paced and energetic", mapping: "A" },
      { text: "Relationship-driven and people-oriented", mapping: "B" },
      { text: "Structured and process-driven", mapping: "C" },
      { text: "Calm, focused, and detail-oriented", mapping: "D" },
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
    const sourcePage =
      typeof window !== 'undefined'
        ? (window.location.pathname || window.location.href || '')
        : '';
    const utmParams = getUtmParams();
    const payload = {
      ...formData,
      selections,
      bestFit: perfectFit,
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
              <a style={{ textDecoration: "none" }} href={perfectFitDetails.link} target="_blank" rel="noopener noreferrer">
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
                      <a href={link} target="_blank" rel="noopener noreferrer">
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
        <button className="back-link" onClick={() => setStep(step - 1)} disabled={step === 0}>Back</button>
        <button className="view-results-btn" onClick={() => step === 9 ? setView('form') : setStep(step + 1)} disabled={!selections[step]}>
          {step === 9 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default CareerQuiz;
