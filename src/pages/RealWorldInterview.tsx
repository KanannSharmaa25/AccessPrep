import { useState } from 'react'
import { Link } from 'react-router-dom'

interface InterviewStyle {
  id: string
  name: string
  description: string
  characteristics: string[]
  questionTone: string
  expectedDepth: string
  commonQuestions: string[]
}

const interviewStyles: InterviewStyle[] = [
  {
    id: 'startup',
    name: 'Startup',
    description: 'Fast-paced, flexible, focus on adaptability and hands-on skills',
    characteristics: [
      'Casual dress, relaxed atmosphere',
      'Multiple short interviews (loop)',
      'Focus on cultural fit',
      'Practical skills over credentials',
      'Questions about "why this company?"'
    ],
    questionTone: 'Conversational and friendly',
    expectedDepth: 'Practical demonstrations over theoretical',
    commonQuestions: [
      'Tell me about yourself',
      'Why do you want to work at a startup?',
      'What would you do in the first 30 days?',
      'How do you handle ambiguity?',
      'Describe a time you had to learn something quickly'
    ]
  },
  {
    id: 'corporate',
    name: 'Corporate Enterprise',
    description: 'Structured, formal, focus on process and compliance',
    characteristics: [
      'Formal dress code',
      'Panel interviews common',
      'STAR method expected',
      'Focus on process and methodology',
      'Behavioral questions prevalent'
    ],
    questionTone: 'Formal and professional',
    expectedDepth: 'Structured responses with clear examples',
    commonQuestions: [
      'Tell me about yourself',
      'Describe a challenging situation at work',
      'How do you handle conflict with a coworker?',
      'What are your greatest strengths and weaknesses?',
      'Where do you see yourself in 5 years?'
    ]
  },
  {
    id: 'tech-giant',
    name: 'Tech Giant (FAANG)',
    description: 'Highly technical, data-driven, competitive',
    characteristics: [
      'Technical assessments common',
      'Multiple rounds (5-8)',
      'Coding/technical problems',
      'Leadership principles focus',
      'High rejection rate expected'
    ],
    questionTone: 'Direct and technical',
    expectedDepth: 'Deep technical knowledge + problem solving',
    commonQuestions: [
      'Tell me about a technical project',
      'Design a system for...',
      'Solve this coding problem',
      'Tell me about a time you failed',
      'How do you prioritize when everything is urgent?'
    ]
  },
  {
    id: 'government',
    name: 'Government/Public Sector',
    description: 'Compliance-focused, security-conscious, formal',
    characteristics: [
      'Strict background checks',
      'Formal interview process',
      'Compliance and security focus',
      'Structured questions',
      'Patience required'
    ],
    questionTone: 'Formal and cautious',
    expectedDepth: 'Process-oriented with compliance awareness',
    commonQuestions: [
      'Tell me about yourself',
      'How do you handle confidential information?',
      'Describe your experience with compliance',
      'What would you do if you witnessed misconduct?',
      'How do you stay current with regulations?'
    ]
  },
  {
    id: 'consulting',
    name: 'Consulting (MBB)',
    description: 'Case-driven, rapid problem-solving, client-focused',
    characteristics: [
      'Case interviews common',
      'Fit questions important',
      'Fast-paced thinking expected',
      'Client-facing scenarios',
      'Travel expectations discussion'
    ],
    questionTone: 'Professional and analytical',
    expectedDepth: 'Structured problem-solving approach',
    commonQuestions: [
      'Walk me through a case study',
      'How would you advise a client to...',
      'Tell me about a time you led a team',
      'Why consulting?',
      'How do you handle a difficult client?'
    ]
  },
  {
    id: 'fintech',
    name: 'FinTech/Finance',
    description: 'Numbers-driven, risk-aware, compliance-focused',
    characteristics: [
      'Technical and behavioral mix',
      'Quantitative skills emphasized',
      'Risk management questions',
      'Market awareness expected',
      'High compensation discussions'
    ],
    questionTone: 'Professional and analytical',
    expectedDepth: 'Financial acumen + technical skills',
    commonQuestions: [
      'Walk me through a financial model',
      'How would you assess risk in...',
      'Tell me about a time you made a data-driven decision',
      'What financial metrics are most important to you?',
      'How do you stay updated on market trends?'
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Patient-centered, compliance-heavy, empathetic',
    characteristics: [
      'HIPAA considerations',
      'Patient safety focus',
      'Team-based care emphasis',
      'Licensing and credentials',
      'Ethical scenarios common'
    ],
    questionTone: 'Professional and empathetic',
    expectedDepth: 'Clinical knowledge + soft skills',
    commonQuestions: [
      'How do you handle a difficult patient?',
      'Describe a time you made a clinical error',
      'How do you ensure patient safety?',
      'Tell me about working in a team',
      'How do you handle stress in high-stakes situations?'
    ]
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Student-focused, patient, mentorship-oriented',
    characteristics: [
      'Teaching demonstrations common',
      'Classroom management focus',
      'Patience and empathy valued',
      'Curriculum development questions',
      'Continuing education emphasis'
    ],
    questionTone: 'Warm and professional',
    expectedDepth: 'Teaching philosophy + practical skills',
    commonQuestions: [
      'Describe your teaching philosophy',
      'How do you handle a disruptive student?',
      'Tell me about a lesson that did not go well',
      'How do you differentiate instruction?',
      'How do you assess student learning?'
    ]
  },
  {
    id: 'nonprofit',
    name: 'Nonprofit',
    description: 'Mission-driven, values-focused, collaborative',
    characteristics: [
      'Mission alignment important',
      'Board interview common',
      'Fundraising experience valued',
      'Community engagement focus',
      'Lower pay often discussed'
    ],
    questionTone: 'Passionate and values-driven',
    expectedDepth: 'Mission alignment + practical experience',
    commonQuestions: [
      'Why are you passionate about our mission?',
      'Tell me about your fundraising experience',
      'How do you handle limited resources?',
      'Describe your experience with community outreach',
      'What motivates you in nonprofit work?'
    ]
  },
  {
    id: 'contract',
    name: 'Contract/Gig',
    description: 'Project-focused, flexible, independent',
    characteristics: [
      'Short-term assignments',
      'Quick onboarding expected',
      'Independent work emphasis',
      'Specific skill matching',
      'Rate negotiation common'
    ],
    questionTone: 'Direct and business-like',
    expectedDepth: 'Demonstrated track record',
    commonQuestions: [
      'Tell me about your relevant experience',
      'How do you handle multiple projects?',
      'What tools do you use for...',
      'Describe your availability',
      'What is your rate expectation?'
    ]
  }
]

const companyPresets = [
  { name: 'Google', style: 'tech-giant', role: 'Software Engineer' },
  { name: 'Meta', style: 'tech-giant', role: 'Product Manager' },
  { name: 'Amazon', style: 'tech-giant', role: 'Software Engineer' },
  { name: 'Microsoft', style: 'tech-giant', role: 'Software Engineer' },
  { name: 'Apple', style: 'tech-giant', role: 'Design Engineer' },
  { name: 'Netflix', style: 'tech-giant', role: 'Frontend Developer' },
  { name: 'Stripe', style: 'fintech', role: 'Backend Engineer' },
  { name: 'Goldman Sachs', style: 'fintech', role: 'Software Engineer' },
  { name: 'McKinsey', style: 'consulting', role: 'Consultant' },
  { name: 'Deloitte', style: 'consulting', role: 'Business Analyst' },
  { name: 'Salesforce', style: 'startup', role: 'Account Executive' },
  { name: 'Airbnb', style: 'startup', role: 'Product Manager' },
  { name: 'Dropbox', style: 'startup', role: 'Software Engineer' },
  { name: 'Federal Government', style: 'government', role: 'IT Specialist' },
  { name: 'State Agency', style: 'government', role: 'Program Manager' },
  { name: 'Mayo Clinic', style: 'healthcare', role: 'Data Analyst' },
  { name: 'Local School District', style: 'education', role: 'Teacher' },
  { name: 'Red Cross', style: 'nonprofit', role: 'Program Coordinator' },
  { name: 'Upwork Freelance', style: 'contract', role: 'Developer' }
]

export default function RealWorldInterview() {
  const [selectedStyle, setSelectedStyle] = useState('')
  const [selectedCompany, setSelectedCompany] = useState('')
  const [customJobDesc, setCustomJobDesc] = useState('')
  const [customRole, setCustomRole] = useState('')
  const [interviewStarted, setInterviewStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const currentStyle = interviewStyles.find(s => s.id === selectedStyle)
  const selectedPreset = companyPresets.find(c => c.name === selectedCompany)

  const startInterview = () => {
    setInterviewStarted(true)
    setCurrentQuestion(0)
    setAnswer('')
    setSubmitted(false)
    setShowFeedback(false)
  }

  const submitAnswer = () => {
    if (!answer.trim()) return
    setSubmitted(true)
    setShowFeedback(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < (currentStyle?.commonQuestions.length || 5) - 1) {
      setCurrentQuestion(prev => prev + 1)
      setAnswer('')
      setSubmitted(false)
      setShowFeedback(false)
    }
  }

  const getToneColor = (styleId: string) => {
    const colors: Record<string, string> = {
      'startup': '#8b5cf6',
      'corporate': '#3b82f6',
      'tech-giant': '#ef4444',
      'government': '#64748b',
      'consulting': '#0ea5e9',
      'fintech': '#10b981',
      'healthcare': '#ec4899',
      'education': '#f59e0b',
      'nonprofit': '#14b8a6',
      'contract': '#6366f1'
    }
    return colors[styleId] || '#6b7280'
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <header style={{
        background: 'white',
        borderBottom: '1px solid var(--border)',
        padding: '1rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem'
            }}>
              ♿
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>AccessPrep</span>
          </Link>
          <Link to="/dashboard" style={{ fontWeight: 600, color: 'var(--dark)', textDecoration: 'none' }}>← Back</Link>
        </div>
      </header>

      <main style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="animate-slide-up">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏢</div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Real-World Interview Adaptation
              </h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--gray)', maxWidth: '600px', margin: '0 auto' }}>
                Practice interviews tailored to specific company cultures, industries, and interview styles. 
                Get realistic preparation for your target role.
              </p>
            </div>

            {!interviewStarted ? (
              <>
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1rem' }}>Quick Start: Popular Companies</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.75rem' }}>
                    {companyPresets.map((company) => (
                      <button
                        key={company.name}
                        onClick={() => {
                          setSelectedCompany(company.name)
                          setSelectedStyle(company.style)
                          setCustomRole(company.role)
                        }}
                        style={{
                          padding: '1rem',
                          background: selectedCompany === company.name ? getToneColor(company.style) : 'var(--bg-primary)',
                          color: selectedCompany === company.name ? 'white' : 'var(--text-primary)',
                          border: `2px solid ${selectedCompany === company.name ? getToneColor(company.style) : 'var(--border)'}`,
                          borderRadius: '12px',
                          cursor: 'pointer',
                          fontWeight: selectedCompany === company.name ? 600 : 400,
                          fontSize: '0.9rem'
                        }}
                      >
                        {company.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="card" style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1rem' }}>Or Select Interview Style</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    {interviewStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => {
                          setSelectedStyle(style.id)
                          setSelectedCompany('')
                        }}
                        style={{
                          padding: '1.25rem',
                          background: selectedStyle === style.id ? getToneColor(style.id) : 'var(--bg-primary)',
                          color: selectedStyle === style.id ? 'white' : 'var(--text-primary)',
                          border: `2px solid ${selectedStyle === style.id ? getToneColor(style.id) : 'var(--border)'}`,
                          borderRadius: '12px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{style.name}</div>
                        <div style={{ fontSize: '0.8rem', opacity: selectedStyle === style.id ? 0.9 : 0.7 }}>
                          {style.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="card" style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1rem' }}>Customize Your Interview</h3>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                      <label className="label">Job Title / Role</label>
                      <input
                        className="input"
                        value={customRole}
                        onChange={(e) => setCustomRole(e.target.value)}
                        placeholder="e.g., Senior Software Engineer"
                      />
                    </div>
                    <div>
                      <label className="label">Job Description (Optional)</label>
                      <textarea
                        className="input"
                        value={customJobDesc}
                        onChange={(e) => setCustomJobDesc(e.target.value)}
                        placeholder="Paste key requirements or responsibilities..."
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                {currentStyle && (
                  <div className="card" style={{ 
                    marginBottom: '1.5rem',
                    borderLeft: `4px solid ${getToneColor(selectedStyle)}`
                  }}>
                    <h4 style={{ marginBottom: '0.75rem' }}>Selected: {currentStyle.name} Interview Style</h4>
                    <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.9rem' }}>
                      <div>
                        <strong>Tone:</strong> {currentStyle.questionTone}
                      </div>
                      <div>
                        <strong>Expected Depth:</strong> {currentStyle.expectedDepth}
                      </div>
                      <div>
                        <strong>Characteristics:</strong>
                        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem' }}>
                          {currentStyle.characteristics.map((char, idx) => (
                            <li key={idx}>{char}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={startInterview}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%' }}
                  disabled={!selectedStyle && !selectedCompany}
                >
                  Start {currentStyle?.name || selectedPreset?.name || 'Custom'} Interview 🚀
                </button>
              </>
            ) : (
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div>
                    <span style={{
                      padding: '0.5rem 1rem',
                      background: getToneColor(selectedStyle),
                      color: 'white',
                      borderRadius: '20px',
                      fontWeight: 600,
                      fontSize: '0.85rem'
                    }}>
                      {currentStyle?.name} Style
                    </span>
                  </div>
                  <div style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>
                    Question {currentQuestion + 1} of {currentStyle?.commonQuestions.length || 5}
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px' }}>
                    <div style={{
                      height: '100%',
                      width: `${((currentQuestion + 1) / (currentStyle?.commonQuestions.length || 5)) * 100}%`,
                      background: getToneColor(selectedStyle),
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>

                <div style={{ 
                  padding: '1.5rem', 
                  background: 'var(--bg-secondary)', 
                  borderRadius: '12px',
                  marginBottom: '1.5rem' 
                }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>{currentStyle?.commonQuestions[currentQuestion]}</h3>
                  <p style={{ color: 'var(--gray)', fontSize: '0.85rem', margin: 0 }}>
                    Remember: {currentStyle?.questionTone}. Be ready for {currentStyle?.expectedDepth.toLowerCase()} answers.
                  </p>
                </div>

                {!submitted ? (
                  <>
                    <textarea
                      className="input"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Type your answer here..."
                      rows={8}
                      style={{ marginBottom: '1rem' }}
                    />
                    <button
                      onClick={submitAnswer}
                      className="btn btn-primary"
                      disabled={!answer.trim()}
                      style={{ width: '100%' }}
                    >
                      Submit Answer
                    </button>
                  </>
                ) : (
                  <div>
                    <div style={{ 
                      padding: '1.5rem', 
                      background: 'var(--bg-secondary)', 
                      borderRadius: '12px',
                      marginBottom: '1rem',
                      borderLeft: `4px solid ${getToneColor(selectedStyle)}`
                    }}>
                      <h4 style={{ marginBottom: '0.75rem' }}>Your Answer:</h4>
                      <p style={{ lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{answer}</p>
                    </div>

                    {showFeedback && (
                      <div style={{ 
                        padding: '1.5rem', 
                        background: '#d1fae5', 
                        borderRadius: '12px',
                        marginBottom: '1rem'
                      }}>
                        <h4 style={{ marginBottom: '0.75rem', color: '#065f46' }}>Tips for {currentStyle?.name} Interviews:</h4>
                        <ul style={{ paddingLeft: '1.25rem', color: '#065f46', margin: 0 }}>
                          {selectedStyle === 'startup' && (
                            <>
                              <li>Show enthusiasm and adaptability</li>
                              <li>Emphasize hands-on experience</li>
                              <li>Be ready to discuss why this startup specifically</li>
                              <li>Dress casually but professionally</li>
                            </>
                          )}
                          {selectedStyle === 'corporate' && (
                            <>
                              <li>Use the STAR method for all behavioral questions</li>
                              <li>Show respect for process and hierarchy</li>
                              <li>Dress formally (business attire)</li>
                              <li>Emphasize compliance and documentation</li>
                            </>
                          )}
                          {selectedStyle === 'tech-giant' && (
                            <>
                              <li>Prepare for multiple technical rounds</li>
                              <li>Practice coding problems (LeetCode style)</li>
                              <li>Know the company's leadership principles</li>
                              <li>Be ready for rapid problem-solving</li>
                            </>
                          )}
                          {selectedStyle === 'government' && (
                            <>
                              <li>Emphasize reliability and security awareness</li>
                              <li>Be patient - process takes time</li>
                              <li>Show awareness of compliance requirements</li>
                              <li>Dress conservatively</li>
                            </>
                          )}
                          {selectedStyle === 'consulting' && (
                            <>
                              <li>Practice case interviews</li>
                              <li>Structure your thinking out loud</li>
                              <li>Ask clarifying questions</li>
                              <li>Show client-first mentality</li>
                            </>
                          )}
                          {selectedStyle === 'fintech' && (
                            <>
                              <li>Demonstrate financial acumen</li>
                              <li>Show awareness of risk management</li>
                              <li>Be prepared for technical questions</li>
                              <li>Know current market trends</li>
                            </>
                          )}
                          {selectedStyle === 'healthcare' && (
                            <>
                              <li>Emphasize patient safety and empathy</li>
                              <li>Show knowledge of HIPAA compliance</li>
                              <li>Demonstrate teamwork skills</li>
                              <li>Be ready for ethical scenarios</li>
                            </>
                          )}
                          {selectedStyle === 'education' && (
                            <>
                              <li>Prepare a teaching demo if asked</li>
                              <li>Show passion for student success</li>
                              <li>Demonstrate classroom management ideas</li>
                              <li>Be ready to discuss educational philosophy</li>
                            </>
                          )}
                          {selectedStyle === 'nonprofit' && (
                            <>
                              <li>Show genuine passion for the mission</li>
                              <li>Demonstrate resourcefulness</li>
                              <li>Be ready to discuss lower compensation</li>
                              <li>Emphasize impact over profit</li>
                            </>
                          )}
                          {selectedStyle === 'contract' && (
                            <>
                              <li>Have a strong portfolio ready</li>
                              <li>Be clear about availability</li>
                              <li>Discuss rates confidently</li>
                              <li>Show independence and self-motivation</li>
                            </>
                          )}
                        </ul>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '1rem' }}>
                      {currentQuestion < (currentStyle?.commonQuestions.length || 5) - 1 ? (
                        <button onClick={nextQuestion} className="btn btn-primary" style={{ flex: 1 }}>
                          Next Question →
                        </button>
                      ) : (
                        <button 
                          onClick={() => setInterviewStarted(false)} 
                          className="btn btn-primary" 
                          style={{ flex: 1 }}
                        >
                          Finish Interview 🎉
                        </button>
                      )}
                      <button 
                        onClick={() => {
                          setAnswer('')
                          setSubmitted(false)
                          setShowFeedback(false)
                        }} 
                        className="btn btn-secondary"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setInterviewStarted(false)}
                  className="btn"
                  style={{ marginTop: '1rem', width: '100%' }}
                >
                  ← Change Interview Style
                </button>
              </div>
            )}

            <div className="card" style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)' }}>
              <h3 style={{ marginBottom: '1rem' }}>Why Real-World Adaptation Matters</h3>
              <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>Different styles require different preparation</strong> - A startup interview is very different from a government role</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Companies filter for cultural fit</strong> - Understanding the expected tone helps you match</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Question patterns vary</strong> - Consulting uses cases, tech giants use coding, corporate uses STAR</li>
                <li><strong>Realistic practice builds confidence</strong> - Knowing what to expect reduces anxiety</li>
              </ul>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/interview" className="btn btn-secondary">
                ← Standard Mock Interview
              </Link>
              <Link to="/deep-interview" className="btn btn-secondary">
                Domain-Specific Deep Interview
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
