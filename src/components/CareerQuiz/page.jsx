import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { submitQuizLeadToCRMDirect } from '../../services/crmService';
import 'react-toastify/dist/ReactToastify.css';

const CareerQuiz = () => {
    const questions = [
        { id: 1, question: "How do you feel about talking to new people?", options: [{ text: "I enjoy it a lot and feel comfortable starting conversations", mapping: "A" }, { text: "I can talk to people, but it takes me a little time to open up", mapping: "B" }, { text: "I prefer talking to people only when needed", mapping: "C" }, { text: "I am more comfortable talking to fewer, familiar people", mapping: "D" }] },
        { id: 2, question: "What kind of daily routine do you prefer?", options: [{ text: "A day that is active and keeps me moving around", mapping: "A" }, { text: "A mix of movement and sitting work", mapping: "B" }, { text: "A stable day with predictable tasks", mapping: "C" }, { text: "A calm environment where I can focus on helping people one-on-one", mapping: "D" }] },
        { id: 3, question: "How do you feel about challenges or targets?", options: [{ text: "I like pushing myself and achieving goals", mapping: "A" }, { text: "I don't mind challenges if they are reasonable", mapping: "B" }, { text: "I prefer steady work without much pressure", mapping: "C" }, { text: "I enjoy tasks where I can help people calmly without targets", mapping: "D" }] },
        { id: 4, question: "What describes your style of working?", options: [{ text: "Fast, energetic, and action-oriented", mapping: "A" }, { text: "Patient and good at understanding people", mapping: "B" }, { text: "Focused, organised, and accurate", mapping: "C" }, { text: "Friendly and service-oriented", mapping: "D" }] },
        { id: 5, question: "What type of interaction do you enjoy most?", options: [{ text: "Meeting many different people throughout the day", mapping: "A" }, { text: "Talking deeply with a few people and understanding their needs", mapping: "B" }, { text: "Helping people who come to me with questions or issues", mapping: "C" }, { text: "Guiding someone step-by-step with product choices or care", mapping: "D" }] },
        { id: 6, question: "How do you handle rejection or difficult conversations?", options: [{ text: "I move on quickly and stay positive", mapping: "A" }, { text: "I understand the person’s concern and try again", mapping: "B" }, { text: "I prefer fewer tough conversations", mapping: "C" }, { text: "I avoid conflict and focus on service instead", mapping: "D" }] },
        { id: 7, question: "Which of these statements fits you best?", options: [{ text: "I enjoy staying outdoors or visiting different places", mapping: "A" }, { text: "I enjoy talking and understanding people’s problems", mapping: "B" }, { text: "I like helping people with daily tasks in a structured setting", mapping: "C" }, { text: "I like helping people choose the right product or solution", mapping: "D" }] },
        { id: 8, question: "What do you enjoy more in a job?", options: [{ text: "Being active, moving around, and meeting people", mapping: "A" }, { text: "Solving people’s problems and giving suggestions", mapping: "B" }, { text: "Doing accurate work with clear rules", mapping: "C" }, { text: "Making customers feel comfortable and confident", mapping: "D" }] },
        { id: 9, question: "What pace of work suits you?", options: [{ text: "Fast-paced and dynamic", mapping: "A" }, { text: "Balanced pace — not too fast, not too slow", mapping: "B" }, { text: "Steady and predictable", mapping: "C" }, { text: "Calm and service-based", mapping: "D" }] },
        { id: 10, question: "What kind of problems do you enjoy solving?", options: [{ text: "Convincing people and helping them make decisions", mapping: "A" }, { text: "Understanding someone's situation and giving thoughtful advice", mapping: "B" }, { text: "Solving practical or transactional problems", mapping: "C" }, { text: "Helping someone choose what suits them best", mapping: "D" }] }
    ];

    // const resultMapping = {
    //     A: { title: "AU Bank Officer (CASA Sales)", details: "CTC of Rs 3.5 LPA + PLP", duration: "4-month program", alternatives: [{ t: "Paytm Sales Executive", d: "Sales Officer" }, { t: "AU Sales Officer", d: "Business Loans" }] },
    //     B: { title: "Piramal Relationship Manager", details: "CTC of Rs 2.74 LPA", duration: "13-week program", alternatives: [{ t: "AU Relationship Officer", d: "Gold Loan" }, { t: "AURUM Banker's", d: "RM Program" }] },
    //     C: { title: "HDFC Bank Teller (Udaan)", details: "CTC of upto Rs 3.5 LPA", duration: "2-month program", alternatives: [{ t: "AURUM Transaction Officer", d: "Ops" }, { t: "AU Bank Officer", d: "Operations" }] },
    //     D: { title: "Lenskart Dispensing Optician", details: "CTC of Rs 2.7LPA + PLP", duration: "2-month program", alternatives: [{ t: "AURUM Banker's - RM", d: "Relationship Manager" }, { t: "AURUM Bankers - DLRO", d: "Recovery Officer" }] }
    // };
const resultMapping = {
    A: {
        title: "AURUM Bankers Program - Relationship Manager",
        details: "CTC of Rs 5.5 LPA + PLP",
        duration: "6-month program",link: "https://crack-ed.com/pgprm/",
        priority: 4, 
        alternatives: [
            { t: "AURUM Bankers Program - Bank Officer", d: "Rs. 3.5 LPA",link:"https://aubankbo.crack-ed.com/portal" },
            { t: "Paytm Disha Program - Field Sales Executive", d: "Rs. 2.5 LPA", link:"http://paytm.crack-ed.com/portal" }
        ]
    },
    B: {
        title: "AURUM Bankers Program - Relationship Officer",
        details: "CTC of Rs 2.7 LPA + PLP",
        duration: "2-month program",link: "https://aubank.ro.crack-ed.com/portal",
        priority: 3,
        alternatives: [
            { t: "Piramal ProEdge Program - Relationship Manager", d: "Rs. 2.74 LPA", link:"https://piramal.crack-ed.com/portal" },
            { t: "AURUM Bankers Program - Deputy Center Manager", d: "Rs. 2.05 LPA", link:"https://aubankcm.crack-ed.com/portal" }
        ]
    },
    C: {
        title: "Udaan Program - Cashier / Teller",
        details: "CTC of upto Rs 3.5 LPA",
        duration: "2-month program",link: "https://udaan.crack-ed.com/portal",
        priority: 2,
        alternatives: [
            { t: "AURUM Bankers Program - Transaction Officer", d: "Rs. 2.7 LPA", link:"https://aubankto.crack-ed.com/portal" },
            { t: "AURUM Bankers Program - CSOV", d: "Rs. 2.7 LPA", link:"https://aubankbcso.crack-ed.com/portal" }
        ]
    },
    D: {
        title: "Lenskart EyeTech Program - Clinical Technician",
        details: "CTC of Rs 2.64 LPA",
        duration: "6-month program",link: "https://lenskart.crack-ed.com/portal",
        priority: 1,
        alternatives: [
            { t: "Lenskart Eyetech Program - Retail Sales Associate", d: "Rs. 3 LPA", link:"https://lenskartrsa.crack-ed.com/portal" },
            { t: "AURUM Bankers Program - CSO", d: "Rs. 2.75 LPA", link:"https://aubankcso.crack-ed.com/portal" }
        ]
    }
    // A: { 
    //     title: "AURUM Bankers Program - Relationship Manager", 
    //     details: "CTC of Rs 5.5 LPA + PLP", 
    //     duration: "6-month program", 
    //     priority: 4, // Higher value
    //     alternatives: [
    //         { t: "AURUM Banker - Bank Officer", d: "3.5 LPA" }, 
    //         { t: "Paytm Sales Executive", d: "Sales Officer" }
    //     ] 
    // },
    // B: { 
    //     title: "AURUM Bankers Program - RM Royale / Gold Loan", 
    //     details: "CTC of Rs 2.7 LPA + PLP", 
    //     duration: "2-month program", 
    //     priority: 3, 
    //     alternatives: [
    //         { t: "Piramal Relationship Manager", d: "2.74 LPA" },
    //         { t: "AU Deputy Center Manager", d: "2.05 LPA" }
    //     ] 
    // },
    // C: { 
    //     title: "Udaan Program - Cashier / Teller", 
    //     details: "CTC of upto Rs 3.5 LPA", 
    //     duration: "2-month program", 
    //     priority: 2, 
    //     alternatives: [
    //         { t: "AURUM Transaction Officer", d: "2.7 LPA" }, 
    //         { t: "AU CSO Gold Valuation", d: "2.7 LPA" }
    //     ] 
    // },
    // D: { 
    //     title: "Lenskart EyeTech - Clinical Technician", 
    //     details: "CTC of Rs 2.64 LPA", 
    //     duration: "6-month program", 
    //     priority: 1, 
    //     alternatives: [
    //         { t: "Lenskart Retail Sales Associate", d: "3 LPA" }, 
    //         { t: "AU Customer Service Officer", d: "2.75 LPA" }
    //     ] 
    // }
};
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
const calculateWinner = () => {
    // 1. Count the occurrences of A, B, C, D
    const counts = selections.reduce((acc, char) => { 
        if (char) acc[char] = (acc[char] || 0) + 1; 
        return acc; 
    }, {});

    // 2. Determine the winner based on count, then priority
    return Object.keys(counts).reduce((a, b) => {
        // If one has a higher count, it wins
        if (counts[a] > counts[b]) return a;
        if (counts[b] > counts[a]) return b;

        // If counts are EQUAL (e.g. 5 A's and 5 D's), 
        // use the priority from resultMapping (A > B > C > D)
        return resultMapping[a].priority > resultMapping[b].priority ? a : b;
    }, 'A');
};
    // const calculateWinner = () => {
    //     const counts = selections.reduce((acc, char) => { acc[char] = (acc[char] || 0) + 1; return acc; }, {});
    //     return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b) || 'A';
    // };

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
        const winner = calculateWinner();
        const bestFit = resultMapping[winner].title;
        const payload = { ...formData, selections, bestFit };

        // Submit to CRM first (without center and state) - runs even if quiz backend fails
        try {
            await submitQuizLeadToCRMDirect({
                name: formData.name,
                email: formData.email,
                mobile: formData.mobile,
                program: bestFit,
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
        const result = resultMapping[calculateWinner()];
        return (
            <div className="quiz-container result-page">
           
                <div className="badge-outline">Your Perfect Fit</div>
                <div className="hero-card">
                    <div className="hero-content">
                         <h2>{result.title}</h2>
                        <ul className="hero-lists">
                            <li><span className="check">✔</span> {result.details}</li>
                            <li><span className="check">✔</span> {result.duration}</li>
                        </ul>
                              <div style={{display:"inline-block"}}>
                           <Link style={{textDecoration:"none"}} to={result.link} target="_blank"> <button className="hero-cta-button">Explore Program</button> </Link>  
                              </div>
                       
                    </div>
                </div>
                <p className="section-title">ALTERNATE PROGRAM SUGGESTIONS</p>
                <div className="alt-grid">
                    {result.alternatives.map((alt, i) => (
                        <div key={i} className="alt-card">
                            <h3>{alt.t} - {alt.d}</h3>
                            <div style={{display:"inline-block"}}>

                            <Link to={alt.link} target="_blank"><button className="secondary-btn-outline">Explore Program</button></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (view === 'form') {
        return (
            <div className="quiz-container">
              
                <div className="badge-outline">Your Results Are Ready</div>
                <h2 className="form-main-heading">You’re almost there! View your results now</h2>
                <div className="form-card-box">
                    <div className="form-field">
                        <label>Name</label>
                        <input type="text" placeholder="Enter name" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} />
                    </div>
                    <div className="form-field">
                        <label>Email</label>
                        <input type="email" placeholder="Enter email" value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})} />
                    </div>
                    <div className="form-field">
                        <label>Mobile</label>
                        <input type="text" maxLength="10" placeholder="Enter mobile" value={formData.mobile} onChange={(e)=>setFormData({...formData, mobile:e.target.value.replace(/\D/g, '')})} />
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
                {/* <span className="percent-text">{((step+1)*10)}%</span> */}
            </div>
            {/* <div className="bar-bg"><div className="bar-fill" style={{ width: `${(step+1)*10}%` }}></div></div> */}
            <h2 className="question-text">{questions[step].question}</h2>
            <div className="options-stack">
                {questions[step].options.map((opt, index) => (
                    <button key={index} className={`quiz-option-button ${selections[step] === opt.mapping ? 'selected' : ''}`} onClick={() => handleSelectOption(opt.mapping)}>
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