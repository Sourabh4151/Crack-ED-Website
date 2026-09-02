/**
 * Fallback career-quiz config when /api/quiz/config/ is empty or unreachable.
 * Live content is managed from /marketing/quiz and Django admin.
 */

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
  'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager': 200000,
  'Banking Sales Program - Sales Officer': 60000,
  'Mahindra Finance Prarambh Program - Business Executive': 70000,
  'Postgraduate Certification Banking Management - Business Development Executive': 50848,
  'Udaan Program - Business Loan Associate': 80000,
  'Elevate Banking Program - Virtual Relationship Manager': 40000,
  'Hero Housing Finance Pragati Program - Relationship Manager': 100000,
  'Hero Housing Finance Pragati Program - Collection Officer': 225000,
  'Hero Housing Finance Pragati Program - Credit and Operations Manager': 200000,
  'Rupyy AutoEdge Program - Business Manager': 100000,
}

const PROGRAM_DETAILS = {
  'Udaan Program - Cashier / Teller': { details: 'CTC of upto Rs 3.5 LPA', duration: '2-month program', link: 'https://udaan.crack-ed.com/' },
  'Udaan Program - Virtual Relationship Manager': { details: 'CTC of upto Rs 2.8 LPA', duration: '4-week program', link: 'https://udaanvrm.crack-ed.com' },
  'Udaan Program - Relationship Manager': { details: 'CTC of upto Rs 6.5 LPA', duration: '3-week program', link: 'https://udaanrm.crack-ed.com' },
  'Lenskart EyeTech Program - Clinical Technician': { details: 'CTC of Rs 2.64 LPA', duration: '6-month program', link: 'https://lenskart.crack-ed.com/' },
  'Lenskart EyeTech Program - Retail Sales Associate': { details: 'CTC of Rs 3 LPA + incentives', duration: '9-weeks program', link: 'https://lenskartrsa.crack-ed.com/' },
  'Piramal ProEdge Program - Relationship Manager': { details: 'CTC of Rs 2.74 LPA + Variable upto 3 LPA', duration: '3.5-month program', link: 'https://piramal.crack-ed.com/' },
  'Paytm Disha Program - Field Sales Executive': { details: 'CTC of Rs 2.5 LPA + incentives', duration: '2-week program (virtual)', link: 'https://paytm.crack-ed.com/' },
  'Aviva Nirmaan Program - Direct Sales Executive': { details: 'CTC of Rs 3.5 LPA + variable', duration: '3-month program', link: 'https://avivads.crack-ed.com' },
  'Aviva Nirmaan Program - Agency Sales Executive': { details: 'CTC of Rs 3.5 LPA + variable', duration: '3-month program', link: 'https://avivaas.crack-ed.com' },
  'Poonawalla FinPro Career Program - Sales Executive': { details: 'CTC of upto Rs 2.76 LPA + incentives', duration: '3-week program', link: 'http://poonawallase.crack-ed.com/' },
  'Poonawalla FinPro Career Program - Gold Assayer': { details: 'CTC of Rs 2.5 LPA + incentives', duration: '1.5-month program', link: 'http://poonawallaga.crack-ed.com/' },
  'Finova VyaparaMitra Program - Relationship Officer': { details: 'CTC of Rs 2.4 LPA + variable', duration: '1-month program', link: 'https://finovaro.crack-ed.com' },
  'Postgraduate Program Relationship Management - Relationship Manager': { details: 'CTC of Rs 5.5 LPA + incentives', duration: '6-month program', link: 'https://pgprm.crack-ed.com' },
  'Postgraduate Program Retail Banking - Relationship Officer': { details: 'CTC of upto Rs 3.1 LPA + incentives', duration: '3-week program', link: 'https://pgprb.crack-ed.com' },
  'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager': { details: 'CTC of 4 LPA*', duration: '6-month program', link: 'https://bandhanbankassistantmanager.crack-ed.com/' },
  'Banking Sales Program - Sales Officer': { details: 'CTC of Rs 2.75 LPA', duration: '3-week program', link: 'https://bspso.crack-ed.com' },
  'Mahindra Finance Prarambh Program - Business Executive': { details: 'CTC of Rs 3.5 LPA + incentives', duration: '1-month online program', link: 'https://mahindrafinancebe.crack-ed.com/' },
  'Postgraduate Certification Banking Management - Business Development Executive': { details: 'CTC of Rs 2.5 LPA + incentives', duration: '2-week program', link: 'https://pgcbm.crack-ed.com' },
  'Udaan Program - Business Loan Associate': { details: 'CTC of upto Rs 2.8 LPA', duration: '3-week program', link: 'https://udaanbusiness.crack-ed.com' },
  'Elevate Banking Program - Virtual Relationship Manager': { details: 'CTC of upto Rs 2.4 LPA', duration: '4-week program', link: 'https://elevatevrm.crack-ed.com/' },
  'Hero Housing Finance Pragati Program - Relationship Manager': { details: 'CTC of Rs 2.75 LPA + incentives', duration: '1-month program', link: 'https://herofinancerm.crack-ed.com/' },
  'Hero Housing Finance Pragati Program - Collection Officer': { details: 'CTC of Rs 5 LPA + incentives', duration: '1-month program', link: 'https://herofinanceco.crack-ed.com/' },
  'Hero Housing Finance Pragati Program - Credit and Operations Manager': { details: 'CTC of Rs 4 LPA + incentives', duration: '1-month program', link: 'https://herofinancecom.crack-ed.com/' },
  'Rupyy AutoEdge Program - Business Manager': { details: 'CTC of Rs 3 LPA + incentives', duration: '1-month program', link: 'https://rupyybm.crack-ed.com/' },
}

const OPTION_TO_PROGRAMS = [
  {
    A: ['Banking Sales Program - Sales Officer', 'Aviva Nirmaan Program - Direct Sales Executive', 'Mahindra Finance Prarambh Program - Business Executive'],
    B: ['Postgraduate Program Relationship Management - Relationship Manager', 'Piramal ProEdge Program - Relationship Manager', 'Elevate Banking Program - Virtual Relationship Manager'],
    C: ['Hero Housing Finance Pragati Program - Credit and Operations Manager', 'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager', 'Hero Housing Finance Pragati Program - Collection Officer'],
    D: ['Hero Housing Finance Pragati Program - Relationship Manager', 'Rupyy AutoEdge Program - Business Manager', 'Postgraduate Program Retail Banking - Relationship Officer'],
  },
  {
    A: ['Banking Sales Program - Sales Officer', 'Mahindra Finance Prarambh Program - Business Executive', 'Hero Housing Finance Pragati Program - Relationship Manager'],
    B: ['Rupyy AutoEdge Program - Business Manager', 'Postgraduate Program Retail Banking - Relationship Officer', 'Piramal ProEdge Program - Relationship Manager'],
    C: ['Hero Housing Finance Pragati Program - Credit and Operations Manager', 'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager', 'Hero Housing Finance Pragati Program - Collection Officer'],
    D: ['Elevate Banking Program - Virtual Relationship Manager', 'Postgraduate Program Relationship Management - Relationship Manager', 'Aviva Nirmaan Program - Agency Sales Executive'],
  },
  {
    A: ['Aviva Nirmaan Program - Direct Sales Executive', 'Banking Sales Program - Sales Officer', 'Aviva Nirmaan Program - Agency Sales Executive'],
    B: ['Piramal ProEdge Program - Relationship Manager', 'Postgraduate Program Relationship Management - Relationship Manager', 'Hero Housing Finance Pragati Program - Relationship Manager'],
    C: ['Hero Housing Finance Pragati Program - Credit and Operations Manager', 'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager', 'Postgraduate Program Retail Banking - Relationship Officer'],
    D: ['Hero Housing Finance Pragati Program - Collection Officer', 'Elevate Banking Program - Virtual Relationship Manager', 'Rupyy AutoEdge Program - Business Manager'],
  },
  {
    A: ['Aviva Nirmaan Program - Direct Sales Executive', 'Banking Sales Program - Sales Officer', 'Mahindra Finance Prarambh Program - Business Executive'],
    B: ['Hero Housing Finance Pragati Program - Relationship Manager', 'Piramal ProEdge Program - Relationship Manager', 'Postgraduate Program Relationship Management - Relationship Manager'],
    C: ['Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager', 'Hero Housing Finance Pragati Program - Credit and Operations Manager', 'Postgraduate Program Retail Banking - Relationship Officer'],
    D: ['Hero Housing Finance Pragati Program - Collection Officer', 'Rupyy AutoEdge Program - Business Manager', 'Elevate Banking Program - Virtual Relationship Manager'],
  },
  {
    A: ['Banking Sales Program - Sales Officer', 'Aviva Nirmaan Program - Direct Sales Executive', 'Mahindra Finance Prarambh Program - Business Executive'],
    B: ['Piramal ProEdge Program - Relationship Manager', 'Postgraduate Program Relationship Management - Relationship Manager', 'Hero Housing Finance Pragati Program - Relationship Manager'],
    C: ['Hero Housing Finance Pragati Program - Credit and Operations Manager', 'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager', 'Elevate Banking Program - Virtual Relationship Manager'],
    D: ['Hero Housing Finance Pragati Program - Collection Officer', 'Rupyy AutoEdge Program - Business Manager', 'Postgraduate Program Retail Banking - Relationship Officer'],
  },
  {
    A: ['Aviva Nirmaan Program - Agency Sales Executive', 'Banking Sales Program - Sales Officer', 'Mahindra Finance Prarambh Program - Business Executive'],
    B: ['Postgraduate Program Relationship Management - Relationship Manager', 'Piramal ProEdge Program - Relationship Manager', 'Hero Housing Finance Pragati Program - Relationship Manager'],
    C: ['Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager', 'Postgraduate Program Retail Banking - Relationship Officer', 'Elevate Banking Program - Virtual Relationship Manager'],
    D: ['Hero Housing Finance Pragati Program - Credit and Operations Manager', 'Hero Housing Finance Pragati Program - Collection Officer', 'Rupyy AutoEdge Program - Business Manager'],
  },
  {
    A: ['Banking Sales Program - Sales Officer', 'Mahindra Finance Prarambh Program - Business Executive', 'Hero Housing Finance Pragati Program - Relationship Manager'],
    B: ['Rupyy AutoEdge Program - Business Manager', 'Postgraduate Program Retail Banking - Relationship Officer', 'Aviva Nirmaan Program - Direct Sales Executive'],
    C: ['Hero Housing Finance Pragati Program - Collection Officer', 'Piramal ProEdge Program - Relationship Manager', 'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager'],
    D: ['Elevate Banking Program - Virtual Relationship Manager', 'Hero Housing Finance Pragati Program - Credit and Operations Manager', 'Postgraduate Program Relationship Management - Relationship Manager'],
  },
  {
    A: ['Aviva Nirmaan Program - Direct Sales Executive', 'Banking Sales Program - Sales Officer', 'Mahindra Finance Prarambh Program - Business Executive'],
    B: ['Piramal ProEdge Program - Relationship Manager', 'Hero Housing Finance Pragati Program - Relationship Manager', 'Postgraduate Program Relationship Management - Relationship Manager'],
    C: ['Hero Housing Finance Pragati Program - Credit and Operations Manager', 'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager', 'Elevate Banking Program - Virtual Relationship Manager'],
    D: ['Hero Housing Finance Pragati Program - Collection Officer', 'Rupyy AutoEdge Program - Business Manager', 'Postgraduate Program Retail Banking - Relationship Officer'],
  },
  {
    A: ['Banking Sales Program - Sales Officer', 'Aviva Nirmaan Program - Agency Sales Executive', 'Mahindra Finance Prarambh Program - Business Executive'],
    B: ['Hero Housing Finance Pragati Program - Relationship Manager', 'Piramal ProEdge Program - Relationship Manager', 'Postgraduate Program Relationship Management - Relationship Manager'],
    C: ['Hero Housing Finance Pragati Program - Credit and Operations Manager', 'Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager', 'Elevate Banking Program - Virtual Relationship Manager'],
    D: ['Hero Housing Finance Pragati Program - Collection Officer', 'Rupyy AutoEdge Program - Business Manager', 'Postgraduate Program Retail Banking - Relationship Officer'],
  },
  {
    A: ['Aviva Nirmaan Program - Direct Sales Executive', 'Banking Sales Program - Sales Officer', 'Mahindra Finance Prarambh Program - Business Executive'],
    B: ['Hero Housing Finance Pragati Program - Relationship Manager', 'Piramal ProEdge Program - Relationship Manager', 'Postgraduate Program Relationship Management - Relationship Manager'],
    C: ['Bandhan Bank Aspiring Bank Champions Programme - Assistant Manager', 'Hero Housing Finance Pragati Program - Credit and Operations Manager', 'Elevate Banking Program - Virtual Relationship Manager'],
    D: ['Hero Housing Finance Pragati Program - Collection Officer', 'Rupyy AutoEdge Program - Business Manager', 'Postgraduate Program Retail Banking - Relationship Officer'],
  },
]

const QUESTIONS = [
  {
    question: 'How do you usually feel about meeting new people?',
    options: [
      { text: 'I enjoy meeting new people and starting conversations', mapping: 'A' },
      { text: 'I like building meaningful relationships over time', mapping: 'B' },
      { text: 'I interact when necessary and prefer structure', mapping: 'C' },
      { text: 'I prefer focused conversations with a specific purpose', mapping: 'D' },
    ],
  },
  {
    question: 'What kind of work environment appeals to you most?',
    options: [
      { text: 'Being out in the market and meeting customers', mapping: 'A' },
      { text: 'A mix of customer interaction and planning', mapping: 'B' },
      { text: 'A structured office environment', mapping: 'C' },
      { text: 'A desk-based role involving communication', mapping: 'D' },
    ],
  },
  {
    question: 'Which statement describes you best?',
    options: [
      { text: 'I enjoy persuading people and influencing decisions', mapping: 'A' },
      { text: "I enjoy understanding people's needs", mapping: 'B' },
      { text: 'I enjoy organizing and managing tasks', mapping: 'C' },
      { text: 'I enjoy solving problems patiently', mapping: 'D' },
    ],
  },
  {
    question: 'How do you react when faced with challenging targets?',
    options: [
      { text: 'I feel motivated and competitive', mapping: 'A' },
      { text: 'I enjoy balancing targets with customer relationships', mapping: 'B' },
      { text: 'I focus on planning and execution', mapping: 'C' },
      { text: 'I stay persistent until the issue is resolved', mapping: 'D' },
    ],
  },
  {
    question: 'What gives you the greatest satisfaction?',
    options: [
      { text: 'Winning new opportunities', mapping: 'A' },
      { text: 'Building long-term trust', mapping: 'B' },
      { text: 'Completing work accurately', mapping: 'C' },
      { text: 'Resolving difficult situations', mapping: 'D' },
    ],
  },
  {
    question: 'Which work style suits you best?',
    options: [
      { text: 'Fast-paced and energetic', mapping: 'A' },
      { text: 'Relationship-focused', mapping: 'B' },
      { text: 'Process-focused', mapping: 'C' },
      { text: 'Analytical and detail-oriented', mapping: 'D' },
    ],
  },
  {
    question: 'How comfortable are you with travelling regularly for work?',
    options: [
      { text: 'Very comfortable', mapping: 'A' },
      { text: 'Comfortable occasionally', mapping: 'B' },
      { text: 'Only if required', mapping: 'C' },
      { text: 'Prefer minimal travel', mapping: 'D' },
    ],
  },
  {
    question: 'What type of success motivates you most?',
    options: [
      { text: 'Incentives and performance rewards', mapping: 'A' },
      { text: 'Customer appreciation and trust', mapping: 'B' },
      { text: 'Operational excellence', mapping: 'C' },
      { text: 'Solving challenging situations', mapping: 'D' },
    ],
  },
  {
    question: 'Which activity sounds most interesting?',
    options: [
      { text: 'Acquiring new customers', mapping: 'A' },
      { text: 'Managing customer portfolios', mapping: 'B' },
      { text: 'Reviewing documents and processes', mapping: 'C' },
      { text: 'Negotiating solutions to problems', mapping: 'D' },
    ],
  },
  {
    question: 'Which statement best reflects your career preference?',
    options: [
      { text: 'I want a career with high earning potential through performance', mapping: 'A' },
      { text: 'I want a career built around customer relationships', mapping: 'B' },
      { text: 'I want a stable career with responsibility and structure', mapping: 'C' },
      { text: 'I want a role where I solve challenges and create impact', mapping: 'D' },
    ],
  },
]

const programs = {}
for (const [name, details] of Object.entries(PROGRAM_DETAILS)) {
  programs[name] = {
    ...details,
    fee: PROGRAM_FEES[name] ?? 0,
  }
}

export const FALLBACK_QUIZ_CONFIG = {
  questions: QUESTIONS.map((q, i) => ({
    id: i + 1,
    order: i + 1,
    question: q.question,
    options: q.options.map((opt) => ({
      mapping: opt.mapping,
      text: opt.text,
      programs: OPTION_TO_PROGRAMS[i]?.[opt.mapping] || [],
    })),
  })),
  programs,
  fallbackProgram: 'Lenskart EyeTech Program - Clinical Technician',
}

export function isUsableQuizConfig (cfg) {
  return Boolean(cfg && Array.isArray(cfg.questions) && cfg.questions.length > 0)
}
