import React, { useEffect, useState } from 'react';
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
import { fetchQuizConfig } from '../../services/quizApi';
import { FALLBACK_QUIZ_CONFIG, isUsableQuizConfig } from '../../data/quizFallback';
import { trackMicrositeClick, markQuizCompleted } from '../../utils/analytics';
import 'react-toastify/dist/ReactToastify.css';

function programFee (programs, name) {
  return programs?.[name]?.fee ?? 0;
}

function programDetails (programs, name) {
  return programs?.[name] || { details: '', duration: '', link: '#' };
}

function calculateResults (selections, config) {
  const counts = {};
  const questions = config.questions || [];

  selections.forEach((option, qIndex) => {
    if (!option || !questions[qIndex]) return;
    const match = (questions[qIndex].options || []).find((opt) => opt.mapping === option);
    const programs = match?.programs;
    if (programs) {
      programs.forEach((prog) => {
        counts[prog] = (counts[prog] || 0) + 1;
      });
    }
  });

  const sorted = Object.entries(counts).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return programFee(config.programs, b[0]) - programFee(config.programs, a[0]);
  });

  const programNames = sorted.map(([name]) => name);
  const perfectFit = programNames[0] || config.fallbackProgram || '';
  const alternatives = programNames.slice(1, 3);

  return { perfectFit, alternatives };
}

const CareerQuiz = ({ showOnlyTopProgram = false }) => {
  const [config, setConfig] = useState(null);
  const [view, setView] = useState('quiz');
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const remote = await fetchQuizConfig();
      const next = isUsableQuizConfig(remote) ? remote : FALLBACK_QUIZ_CONFIG;
      if (cancelled) return;
      setConfig(next);
      setSelections(Array(next.questions.length).fill(null));
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const questions = config?.questions || [];
  const total = questions.length;
  const current = questions[step];

  const handleSelectOption = (mapping) => {
    const newSelections = [...selections];
    newSelections[step] = mapping;
    setSelections(newSelections);
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
    if (!validateForm() || !config) return;

    setLoading(true);
    const { perfectFit } = calculateResults(selections, config);
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

  if (!config || !total) {
    return (
      <div className="quiz-container">
        <p className="question-text">Loading quiz…</p>
      </div>
    );
  }

  if (view === 'result') {
    markQuizCompleted();
    const { perfectFit, alternatives } = calculateResults(selections, config);
    const perfectFitDetails = programDetails(config.programs, perfectFit);

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
                const details = programDetails(config.programs, progName);
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

  const isLast = step === total - 1;

  return (
    <div className="quiz-container">
      <div className="progress-section">
        <span className="step-count">QUESTION {step + 1} OF {total}</span>
      </div>
      <h2 className="question-text">{current.question}</h2>
      <div className="options-stack">
        {(current.options || []).map((opt, index) => (
          <button
            key={index}
            className={`quiz-option-button ${selections[step] === opt.mapping ? 'selected' : ''}`}
            onClick={() => handleSelectOption(opt.mapping)}
          >
            <span className="quiz-option-label">{opt.text}</span>
          </button>
        ))}
      </div>
      <div className="navigation-footer">
        {step > 0 && (
          <button type="button" className="back-link" onClick={() => setStep(step - 1)}>
            Back
          </button>
        )}
        <button type="button" className="view-results-btn" onClick={() => isLast ? setView('form') : setStep(step + 1)} disabled={!selections[step]}>
          {isLast ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default CareerQuiz;
