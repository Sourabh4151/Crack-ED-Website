import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { submitQuizLeadToCRMDirect } from '../../services/crmService';
import 'react-toastify/dist/ReactToastify.css';

// Program fees (₹) - used for tie-breaking when counts are equal
const PROGRAM_FEES = {
  'AURUM Bankers Program - Relationship Manager': 300000,
  'AURUM Bankers Program - Bank Officer': 200000,
  'AURUM Bankers Program - Customer Service Officer Valuation': 150000,
  'AURUM Bankers Program - Relationship Officer': 100000,
  'AURUM Bankers Program - Sales Officer': 100000,
  'AURUM Bankers Program - Money Officer': 100000,
  'AURUM Bankers Program - Transaction Officer': 100000,
  'AURUM Bankers Program - Customer Service Officer': 100000,
  'AURUM Bankers Program - Deputy Center Manager': 80000,
  'AURUM Bankers Program - Deputy Late Recovery Officer': 80000,
  'Udaan Program - Cashier / Teller': 100000,
  'Lenskart EyeTech Program - Clinical Technician': 100000,
  'Lenskart EyeTech Program - Retail Sales Associate': 100000,
  'Piramal ProEdge Program - Relationship Manager': 100000,
  'Paytm Disha Program - Field Sales Executive': 59000,
};

// Program details for display (title, details, duration, link)
const PROGRAM_DETAILS = {
  'AURUM Bankers Program - Relationship Manager': { details: 'CTC of Rs 5.5 LPA + PLP', duration: '6-month program', link: 'https://aurmroyale.crack-ed.com/' },
  'AURUM Bankers Program - Bank Officer': { details: 'CTC of Rs 3.5 LPA + PLP', duration: '4-month program', link: 'https://aubankbo.crack-ed.com/portal' },
  'AURUM Bankers Program - Relationship Officer': { details: 'CTC of Rs 2.7 LPA + PLP', duration: '2-month program', link: 'https://aubank.ro.crack-ed.com/portal' },
  'AURUM Bankers Program - Sales Officer': { details: 'CTC of Rs 2.7 LPA + PLP', duration: '2-month program', link: 'https://aubankso.crack-ed.com/portal' },
  'AURUM Bankers Program - Money Officer': { details: 'CTC of Rs 2.75 LPA + PLP', duration: '2-month program', link: 'https://aubankmo.crack-ed.com/portal' },
  'AURUM Bankers Program - Transaction Officer': { details: 'CTC of upto Rs 2.7 LPA + PLP', duration: '2-month program', link: 'https://aubankto.crack-ed.com/portal' },
  'AURUM Bankers Program - Customer Service Officer': { details: 'CTC of Rs 2.75 LPA + PLP', duration: '2-month program', link: 'https://aubankcso.crack-ed.com/portal' },
  'AURUM Bankers Program - Customer Service Officer Valuation': { details: 'CTC of Rs 2.7 LPA + PLP', duration: '2.5-month program', link: 'https://aubankbcso.crack-ed.com/portal' },
  'AURUM Bankers Program - Deputy Center Manager': { details: 'CTC of upto Rs 2.05 LPA + PLP', duration: '2-month program', link: 'https://aubankcm.crack-ed.com/portal' },
  'AURUM Bankers Program - Deputy Late Recovery Officer': { details: 'CTC of upto Rs 2.05 LPA + PLP', duration: '2-month program', link: 'https://aubanklro.crack-ed.com/portal' },
  'Udaan Program - Cashier / Teller': { details: 'CTC of upto Rs 3.5 LPA', duration: '2-month program', link: 'https://udaan.crack-ed.com/portal' },
  'Lenskart EyeTech Program - Clinical Technician': { details: 'CTC of Rs 2.64 LPA', duration: '6-month program', link: 'https://lenskart.crack-ed.com/portal' },
  'Lenskart EyeTech Program - Retail Sales Associate': { details: 'CTC of Rs 3 LPA', duration: '2-month program', link: 'https://lenskartrsa.crack-ed.com/portal' },
  'Piramal ProEdge Program - Relationship Manager': { details: 'CTC of Rs 2.74 LPA', duration: '13-week program', link: 'https://piramal.crack-ed.com/portal' },
  'Paytm Disha Program - Field Sales Executive': { details: 'CTC of Rs 2.5 LPA + incentives', duration: '2-week program (virtual)', link: 'https://paytm.crack-ed.com/portal' },
};

// For each question: option (A/B/C/D) -> [program1, program2] - both get +1 count when selected
const OPTION_TO_PROGRAMS = [
  // Q1: Do you enjoy interacting with people in your daily life?
  {
    A: ['AURUM Bankers Program - Bank Officer', 'AURUM Bankers Program - Sales Officer'],
    B: ['AURUM Bankers Program - Relationship Officer', 'AURUM Bankers Program - Relationship Manager'],
    C: ['Lenskart EyeTech Program - Clinical Technician', 'AURUM Bankers Program - Customer Service Officer'],
    D: ['AURUM Bankers Program - Customer Service Officer Valuation', 'Lenskart EyeTech Program - Clinical Technician'],
  },
  // Q2: What kind of daily routine sounds best to you?
  {
    A: ['Paytm Disha Program - Field Sales Executive', 'AURUM Bankers Program - Sales Officer'],
    B: ['AURUM Bankers Program - Bank Officer', 'Piramal ProEdge Program - Relationship Manager'],
    C: ['AURUM Bankers Program - Customer Service Officer', 'Udaan Program - Cashier / Teller'],
    D: ['AURUM Bankers Program - Customer Service Officer Valuation', 'Lenskart EyeTech Program - Clinical Technician'],
  },
  // Q3: How do you feel about responsibility and pressure?
  {
    A: ['AURUM Bankers Program - Bank Officer', 'Paytm Disha Program - Field Sales Executive'],
    B: ['AURUM Bankers Program - Relationship Officer', 'AURUM Bankers Program - Relationship Manager'],
    C: ['Lenskart EyeTech Program - Retail Sales Associate', 'AURUM Bankers Program - Customer Service Officer'],
    D: ['AURUM Bankers Program - Customer Service Officer Valuation', 'AURUM Bankers Program - Transaction Officer'],
  },
  // Q4: Which of these best describes you?
  {
    A: ['AURUM Bankers Program - Sales Officer', 'Paytm Disha Program - Field Sales Executive'],
    B: ['AURUM Bankers Program - Relationship Manager', 'Piramal ProEdge Program - Relationship Manager'],
    C: ['AURUM Bankers Program - Customer Service Officer Valuation', 'AURUM Bankers Program - Transaction Officer'],
    D: ['Lenskart EyeTech Program - Retail Sales Associate', 'AURUM Bankers Program - Customer Service Officer'],
  },
  // Q5: What do you enjoy doing more?
  {
    A: ['AURUM Bankers Program - Bank Officer', 'AURUM Bankers Program - Sales Officer'],
    B: ['AURUM Bankers Program - Relationship Officer', 'AURUM Bankers Program - Relationship Manager'],
    C: ['AURUM Bankers Program - Customer Service Officer Valuation', 'Lenskart EyeTech Program - Clinical Technician'],
    D: ['Lenskart EyeTech Program - Retail Sales Associate', 'AURUM Bankers Program - Customer Service Officer'],
  },
  // Q6: How do you prefer to work most of the time?
  {
    A: ['Paytm Disha Program - Field Sales Executive', 'AURUM Bankers Program - Sales Officer'],
    B: ['AURUM Bankers Program - Bank Officer', 'AURUM Bankers Program - Relationship Officer'],
    C: ['AURUM Bankers Program - Transaction Officer', 'Udaan Program - Cashier / Teller'],
    D: ['AURUM Bankers Program - Customer Service Officer', 'Lenskart EyeTech Program - Retail Sales Associate'],
  },
  // Q7: How do you feel about handling important items, records, or details?
  {
    A: ['AURUM Bankers Program - Customer Service Officer', 'Udaan Program - Cashier / Teller'],
    B: ['AURUM Bankers Program - Transaction Officer', 'AURUM Bankers Program - Money Officer'],
    C: ['AURUM Bankers Program - Customer Service Officer', 'Lenskart EyeTech Program - Retail Sales Associate'],
    D: ['AURUM Bankers Program - Sales Officer', 'Paytm Disha Program - Field Sales Executive'],
  },
  // Q8: What type of work gives you satisfaction?
  {
    A: ['AURUM Bankers Program - Sales Officer', 'Paytm Disha Program - Field Sales Executive'],
    B: ['AURUM Bankers Program - Relationship Manager', 'Piramal ProEdge Program - Relationship Manager'],
    C: ['AURUM Bankers Program - Transaction Officer', 'Udaan Program - Cashier / Teller'],
    D: ['AURUM Bankers Program - Customer Service Officer Valuation', 'Lenskart EyeTech Program - Clinical Technician'],
  },
  // Q9: How comfortable are you with travelling or going out for work when needed?
  {
    A: ['AURUM Bankers Program - Deputy Center Manager', 'AURUM Bankers Program - Deputy Late Recovery Officer'],
    B: ['AURUM Bankers Program - Relationship Officer', 'Piramal ProEdge Program - Relationship Manager'],
    C: ['AURUM Bankers Program - Customer Service Officer', 'Lenskart EyeTech Program - Retail Sales Associate'],
    D: ['AURUM Bankers Program - Customer Service Officer Valuation', 'Lenskart EyeTech Program - Clinical Technician'],
  },
  // Q10: Which work style feels most natural to you?
  {
    A: ['AURUM Bankers Program - Bank Officer', 'Paytm Disha Program - Field Sales Executive'],
    B: ['AURUM Bankers Program - Relationship Manager', 'AURUM Bankers Program - Relationship Officer'],
    C: ['AURUM Bankers Program - Transaction Officer', 'Udaan Program - Cashier / Teller'],
    D: ['AURUM Bankers Program - Customer Service Officer Valuation', 'Lenskart EyeTech Program - Clinical Technician'],
  },
];

const CareerQuiz = () => {
  const questions = [
    { id: 1, question: "Do you enjoy interacting with people in your daily life?", options: [
      { text: "Yes, I enjoy talking to many people", mapping: "A" },
      { text: "I like talking when there is a clear reason", mapping: "B" },
      { text: "I am comfortable but prefer limited interaction", mapping: "C" },
      { text: "I prefer calm, one-to-one interaction", mapping: "D" },
    ]},
    { id: 2, question: "What kind of daily routine sounds best to you?", options: [
      { text: "Being active and moving around most of the day", mapping: "A" },
      { text: "A mix of movement and structured work", mapping: "B" },
      { text: "Mostly indoor, organised work", mapping: "C" },
      { text: "Fixed location with steady tasks", mapping: "D" },
    ]},
    { id: 3, question: "How do you feel about responsibility and pressure?", options: [
      { text: "I like challenges and pushing myself", mapping: "A" },
      { text: "I can handle responsibility with guidance", mapping: "B" },
      { text: "I prefer moderate responsibility", mapping: "C" },
      { text: "I prefer accuracy over pressure", mapping: "D" },
    ]},
    { id: 4, question: "Which of these best describes you?", options: [
      { text: "Energetic and confident", mapping: "A" },
      { text: "Patient and understanding", mapping: "B" },
      { text: "Detail-oriented and organised", mapping: "C" },
      { text: "Friendly and service-focused", mapping: "D" },
    ]},
    { id: 5, question: "What do you enjoy doing more?", options: [
      { text: "Explaining things and convincing people", mapping: "A" },
      { text: "Helping people with important decisions", mapping: "B" },
      { text: "Handling work that needs accuracy", mapping: "C" },
      { text: "Helping people feel comfortable and supported", mapping: "D" },
    ]},
    { id: 6, question: "How do you prefer to work most of the time?", options: [
      { text: "Independently and actively", mapping: "A" },
      { text: "With people and shared responsibility", mapping: "B" },
      { text: "With systems, rules, and processes", mapping: "C" },
      { text: "In a calm, customer-focused environment", mapping: "D" },
    ]},
    { id: 7, question: "How do you feel about handling important items, records, or details?", options: [
      { text: "I am very careful and alert", mapping: "A" },
      { text: "I am comfortable with proper checks", mapping: "B" },
      { text: "I prefer light responsibility", mapping: "C" },
      { text: "I prefer not to handle such things", mapping: "D" },
    ]},
    { id: 8, question: "What type of work gives you satisfaction?", options: [
      { text: "Achieving visible results through effort", mapping: "A" },
      { text: "Building trust over time", mapping: "B" },
      { text: "Completing tasks correctly and on time", mapping: "C" },
      { text: "Using specialised skills and knowledge", mapping: "D" },
    ]},
    { id: 9, question: "How comfortable are you with travelling or going out for work when needed?", options: [
      { text: "Very comfortable, I enjoy it", mapping: "A" },
      { text: "Comfortable if there is a purpose", mapping: "B" },
      { text: "Prefer staying in one place", mapping: "C" },
      { text: "Prefer indoor, focused work", mapping: "D" },
    ]},
    { id: 10, question: "Which work style feels most natural to you?", options: [
      { text: "Fast-paced and energetic", mapping: "A" },
      { text: "Relationship-driven and people-oriented", mapping: "B" },
      { text: "Structured and process-driven", mapping: "C" },
      { text: "Calm, precise, and skill-focused", mapping: "D" },
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
   * New logic: Each option maps to 2 programs. Add +1 to both for each selection.
   * Rank by count (highest first). Tie-break by fee (highest fee = first priority).
   * Returns: { perfectFit, alternatives } - perfectFit is 1st, alternatives are 2nd & 3rd
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
    const perfectFit = programNames[0] || 'AURUM Bankers Program - Relationship Manager';
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
    const payload = { ...formData, selections, bestFit: perfectFit };

    try {
      await submitQuizLeadToCRMDirect({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        program: perfectFit,
      });
    } catch (crmErr) {
      console.warn('CRM submission failed (results still shown):', crmErr);
    }

    try {
      const res = await fetch('http://localhost:5000/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        toast.success("Profile saved successfully!");
      } else {
        throw new Error("Submit failed");
      }
    } catch (err) {
      toast.info("Showing results...");
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
