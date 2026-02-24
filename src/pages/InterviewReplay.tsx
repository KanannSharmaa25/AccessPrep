import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface InterviewSession {
  id: string
  date: string
  role: string
  industry: string
  mode: string
  questions: string[]
  answers: string[]
  followUpQuestions: string[]
  followUpAnswers: string[]
  feedback: string[]
  scores: {
    communication: number
    reasoning: number
    readiness: number
  }
  analysis: {
    strongMoments: string[]
    hesitationPoints: string[]
    missedOpportunities: string[]
  }
}

export default function InterviewReplay() {
  const [sessions, setSessions] = useState<InterviewSession[]>([])
  const [selectedSession, setSelectedSession] = useState<InterviewSession | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [activeTab, setActiveTab] = useState<'transcript' | 'analysis' | 'feedback'>('transcript')

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    const history = localStorage.getItem('interviewHistory')
    const fullSessions = localStorage.getItem('interviewFullSessions')
    
    if (fullSessions) {
      const parsed = JSON.parse(fullSessions)
      setSessions(parsed)
    } else if (history) {
      const parsed = JSON.parse(history)
      const sessionsWithAnalysis = parsed.map((item: any, idx: number) => ({
        id: `session-${idx}`,
        date: new Date(item.date).toLocaleDateString(),
        role: item.mode || 'Behavioral',
        industry: 'General',
        mode: item.mode || 'behavioral',
        questions: [],
        answers: [],
        followUpQuestions: [],
        followUpAnswers: [],
        feedback: [],
        scores: {
          communication: item.communication || 70,
          reasoning: item.reasoning || 65,
          readiness: item.readiness || 70
        },
        analysis: {
          strongMoments: [
            'Used the STAR method effectively to structure your answer',
            'Provided specific quantifiable achievements',
            'Demonstrated clear alignment between skills and role requirements'
          ],
          hesitationPoints: [
            'Took pauses before answering complex questions',
            'Used filler words when discussing challenges'
          ],
          missedOpportunities: [
            'Could have elaborated more on leadership experience',
            'Missed chance to ask clarifying questions'
          ]
        }
      }))
      setSessions(sessionsWithAnalysis)
    }
  }, [])

  // Enhanced AI analysis with emotional intelligence
  const analyzeAnswer = (answer: string) => {
    const strong: string[] = []
    const hesitation: string[] = []
    const missed: string[] = []
    const emotionalNotes: string[] = []

    // Strengths with empathetic framing
    if (/when|i had|i worked|i led|i managed|i achieved|i created|i built/i.test(answer)) {
      strong.push('You shared specific experiences - this makes your answer memorable and real')
    }
    if (/\d+%|increased|reduced|saved|managed|drove|grew|decreased/i.test(answer)) {
      strong.push('Including numbers shows the concrete impact you made - great evidence')
    }
    if (/because|therefore|however|additionally|furthermore|moreover/i.test(answer)) {
      strong.push('Your flow and transitions helped your story connect naturally')
    }
    if (answer.length > 150) {
      strong.push('You gave a thorough, detailed answer - interviewers appreciate depth')
    }
    if (answer.length > 50 && answer.length < 100) {
      strong.push('You struck a good balance - thorough but not overwhelming')
    }
    if (answer.length > 30 && answer.length < 50) {
      strong.push('You gave a concise answer - sometimes less is more')
    }
    
    // Emotional intelligence strengths
    if (/proud|excited|passionate|grateful|thrilled/i.test(answer)) {
      strong.push('Sharing your enthusiasm makes you relatable and memorable')
      emotionalNotes.push('Your passion clearly came through')
    }
    if (/learned|discovered|realized|understood|grew/i.test(answer)) {
      strong.push('Your reflection on learning shows growth mindset - interviewers love this')
      emotionalNotes.push('Your self-awareness shines through')
    }
    if (/helped|supported|collaborated|team|work with/i.test(answer)) {
      strong.push('Emphasizing teamwork shows you\'ll be a good cultural fit')
    }
    if (/challenging|difficult|hard|struggle|obstacle/i.test(answer) && /overcame|resolved|fixed|solved/i.test(answer)) {
      strong.push('Describing how you overcame obstacles shows resilience')
      emotionalNotes.push('Your determination is evident')
    }

    // Constructive feedback with empathy (never criticizing speech patterns)
    if (answer.length < 50) {
      hesitation.push('A bit more detail would help - interviewers want to understand your full experience')
      emotionalNotes.push('It\'s okay to take your time - share what feels natural')
    }
    if (!/example|specific|when|i was|i had|i led/i.test(answer) && answer.length < 100) {
      missed.push('Adding specific examples would make your answer more impactful')
    }
    if (!/\d+%|increased|reduced|saved|managed|drove/i.test(answer)) {
      missed.push('Including metrics (like "increased by 30%") strengthens your claims')
    }
    
    // Positive reframing of missed opportunities
    if (missed.length === 0 && strong.length > 0) {
      emotionalNotes.push('This was a strong answer - well done!')
    } else if (strong.length >= 2) {
      emotionalNotes.push('You\'re building strong interview skills - keep it up!')
    } else if (strong.length === 0) {
      emotionalNotes.push('Every practice session helps - you\'re learning and growing')
    }

    return { strong, hesitation, missed, emotionalNotes }
  }

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = playbackSpeed
      utterance.pitch = 1
      
      utterance.onend = () => setIsPlaying(false)
      speechRef.current = utterance
      window.speechSynthesis.speak(utterance)
      setIsPlaying(true)
    }
  }

  const playQuestionAndAnswer = (index: number) => {
    const session = selectedSession
    if (!session) return

    const question = session.questions[index] || `Question ${index + 1}`
    const answer = session.answers[index] || 'No answer recorded'
    
    setCurrentQuestionIndex(index)
    playAudio(`Question ${index + 1}. ${question}. Your answer: ${answer}`)
  }

  const playFullSession = () => {
    const session = selectedSession
    if (!session) return

    let fullText = `Interview replay. Date: ${session.date}. Role: ${session.role}. `
    
    session.questions.forEach((q, idx) => {
      const a = session.answers[idx] || 'No answer'
      fullText += `Question ${idx + 1}: ${q}. Your answer: ${a}. `
    })

    playAudio(fullText)
  }

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    }
  }

  const deleteSession = (id: string) => {
    const updated = sessions.filter(s => s.id !== id)
    setSessions(updated)
    localStorage.setItem('interviewFullSessions', JSON.stringify(updated))
    if (selectedSession?.id === id) {
      setSelectedSession(null)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'
    if (score >= 60) return '#f59e0b'
    return '#ef4444'
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
              A
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>AccessPrep</span>
          </Link>
          <Link to="/dashboard" style={{ fontWeight: 600, color: 'var(--dark)', textDecoration: 'none' }}>Back</Link>
        </div>
      </header>

      <main style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>Interview Replay</div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Review past interviews, identify patterns, and track your improvement.
            </h1>
          </div>

          {sessions.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>No Interviews Yet</h3>
              <p style={{ color: 'var(--gray)', marginBottom: '1.5rem' }}>
                Complete a mock interview to start building your reflection history.
              </p>
              <Link to="/interview" className="btn btn-primary">
                Start Mock Interview
              </Link>
            </div>
          ) : !selectedSession ? (
            <div className="card">
              <h3 style={{ marginBottom: '1rem' }}>Your Interview Sessions</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    style={{
                      padding: '1.5rem',
                      background: 'var(--bg-secondary)',
                      borderRadius: '12px',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div>
                        <h4 style={{ margin: '0 0 0.5rem 0' }}>{session.role} Interview</h4>
                        <p style={{ margin: 0, color: 'var(--gray)', fontSize: '0.9rem' }}>
                          {session.date}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => { setSelectedSession(session); setCurrentQuestionIndex(0); }}
                          className="btn btn-primary"
                        >
                          View Replay
                        </button>
                        <button
                          onClick={() => deleteSession(session.id)}
                          style={{
                            padding: '0.5rem 1rem',
                            background: '#fee2e2',
                            color: '#991b1b',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ 
                        padding: '0.5rem 1rem', 
                        background: getScoreColor(session.scores.communication),
                        borderRadius: '8px',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.85rem'
                      }}>
                        Communication: {session.scores.communication}%
                      </div>
                      <div style={{ 
                        padding: '0.5rem 1rem', 
                        background: getScoreColor(session.scores.reasoning),
                        borderRadius: '8px',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.85rem'
                      }}>
                        Reasoning: {session.scores.reasoning}%
                      </div>
                      <div style={{ 
                        padding: '0.5rem 1rem', 
                        background: getScoreColor(session.scores.readiness),
                        borderRadius: '8px',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.85rem'
                      }}>
                        Readiness: {session.scores.readiness}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={() => { setSelectedSession(null); stopAudio(); }}
                className="btn btn-secondary"
                style={{ marginBottom: '1rem' }}
              >
                Back to Sessions
              </button>

              <div className="card" style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ margin: 0 }}>{selectedSession.role} Interview</h3>
                    <p style={{ margin: '0.25rem 0 0 0', color: 'var(--gray)', fontSize: '0.9rem' }}>
                      {selectedSession.date}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <select
                      value={playbackSpeed}
                      onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                      style={{
                        padding: '0.5rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border)'
                      }}
                    >
                      <option value={0.5}>0.5x</option>
                      <option value={0.75}>0.75x</option>
                      <option value={1}>1x</option>
                      <option value={1.25}>1.25x</option>
                      <option value={1.5}>1.5x</option>
                    </select>
                    {isPlaying ? (
                      <button onClick={stopAudio} className="btn" style={{ background: '#fee2e2' }}>
                        Stop
                      </button>
                    ) : (
                      <button onClick={playFullSession} className="btn btn-primary">
                        Play All
                      </button>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ 
                    padding: '0.75rem 1.5rem', 
                    background: getScoreColor(selectedSession.scores.communication),
                    borderRadius: '8px',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontWeight: 600, fontSize: '1.25rem' }}>{selectedSession.scores.communication}%</div>
                    <div style={{ fontSize: '0.75rem' }}>Communication</div>
                  </div>
                  <div style={{ 
                    padding: '0.75rem 1.5rem', 
                    background: getScoreColor(selectedSession.scores.reasoning),
                    borderRadius: '8px',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontWeight: 600, fontSize: '1.25rem' }}>{selectedSession.scores.reasoning}%</div>
                    <div style={{ fontSize: '0.75rem' }}>Reasoning</div>
                  </div>
                  <div style={{ 
                    padding: '0.75rem 1.5rem', 
                    background: getScoreColor(selectedSession.scores.readiness),
                    borderRadius: '8px',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontWeight: 600, fontSize: '1.25rem' }}>{selectedSession.scores.readiness}%</div>
                    <div style={{ fontSize: '0.75rem' }}>Readiness</div>
                  </div>
                </div>
              </div>

              <div className="card" style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <button
                    onClick={() => setActiveTab('transcript')}
                    className="btn"
                    style={{
                      background: activeTab === 'transcript' ? 'var(--primary)' : 'var(--bg-primary)',
                      color: activeTab === 'transcript' ? 'white' : 'var(--text-primary)'
                    }}
                  >
                    Transcript
                  </button>
                  <button
                    onClick={() => setActiveTab('analysis')}
                    className="btn"
                    style={{
                      background: activeTab === 'analysis' ? 'var(--primary)' : 'var(--bg-primary)',
                      color: activeTab === 'analysis' ? 'white' : 'var(--text-primary)'
                    }}
                  >
                    AI Analysis
                  </button>
                </div>

                {activeTab === 'transcript' && (
                  <div>
                    {selectedSession.questions.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--gray)' }}>
                        <p>Full transcript not available for this session.</p>
                        <p>Complete more interviews to enable detailed replay.</p>
                      </div>
                    ) : (
                      selectedSession.questions.map((question, idx) => {
                        const analysis = analyzeAnswer(selectedSession.answers[idx] || '')
                        return (
                          <div
                            key={idx}
                            style={{
                              padding: '1rem',
                              background: currentQuestionIndex === idx ? '#e0e7ff' : 'var(--bg-secondary)',
                              borderRadius: '8px',
                              marginBottom: '0.75rem',
                              cursor: 'pointer',
                              borderLeft: currentQuestionIndex === idx ? '3px solid var(--primary)' : '3px solid transparent'
                            }}
                            onClick={() => {
                              setCurrentQuestionIndex(idx)
                              playQuestionAndAnswer(idx)
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <span style={{ fontWeight: 600, color: 'var(--primary)' }}>
                                Q{idx + 1}
                              </span>
                              <button
                                onClick={(e) => { e.stopPropagation(); playQuestionAndAnswer(idx); }}
                                style={{
                                  padding: '0.25rem 0.5rem',
                                  background: 'var(--primary)',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontSize: '0.75rem'
                                }}
                              >
                                Play
                              </button>
                            </div>
                            <p style={{ margin: '0 0 0.5rem 0', fontWeight: 500 }}>{question}</p>
                            <p style={{ margin: 0, color: 'var(--gray)', fontSize: '0.9rem' }}>
                              {selectedSession.answers[idx] || 'No answer recorded'}
                            </p>
                            {analysis.emotionalNotes && analysis.emotionalNotes.length > 0 && (
                              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#0891b2', fontStyle: 'italic' }}>
                                {analysis.emotionalNotes[0]}
                              </div>
                            )}
                            {analysis.strong.length > 0 && (
                              <div style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#059669' }}>
                                ✓ {analysis.strong[0]}
                              </div>
                            )}
                          </div>
                        )
                      })
                    )}
                  </div>
                )}

                {activeTab === 'analysis' && (
                  <div>
                    {/* AI-Powered Insights Section */}
                    <div style={{ 
                      marginBottom: '1.5rem', 
                      padding: '1rem', 
                      background: 'linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)', 
                      borderRadius: '12px',
                      borderLeft: '4px solid #0891b2'
                    }}>
                      <h4 style={{ marginBottom: '0.75rem', color: '#134e4a' }}>💡 AI Insights</h4>
                      <p style={{ fontSize: '0.9rem', color: '#134e4a', margin: 0 }}>
                        {selectedSession.scores.communication >= 80 
                          ? "You're doing great! Your communication skills are strong. Keep building on this foundation."
                          : selectedSession.scores.communication >= 60
                          ? "You're making real progress. Keep practicing and you'll see continued improvement."
                          : "Every interview builds skills. Focus on one area at a time and celebrate small wins."}
                      </p>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ marginBottom: '0.75rem' }}>✨ Your Strengths</h4>
                      <div style={{ display: 'grid', gap: '0.5rem' }}>
                        {selectedSession.analysis.strongMoments.map((item, idx) => (
                          <div
                            key={idx}
                            style={{
                              padding: '0.75rem 1rem',
                              background: '#d1fae5',
                              borderRadius: '8px',
                              borderLeft: '3px solid #059669'
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ marginBottom: '0.75rem' }}>🎯 Areas to Develop</h4>
                      <div style={{ display: 'grid', gap: '0.5rem' }}>
                        {selectedSession.analysis.hesitationPoints.map((item, idx) => (
                          <div
                            key={idx}
                            style={{
                              padding: '0.75rem 1rem',
                              background: '#fef3c7',
                              borderRadius: '8px',
                              borderLeft: '3px solid #d97706'
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 style={{ marginBottom: '0.75rem' }}>🚀 Growth Opportunities</h4>
                      <div style={{ display: 'grid', gap: '0.5rem' }}>
                        {selectedSession.analysis.missedOpportunities.map((item, idx) => (
                          <div
                            key={idx}
                            style={{
                              padding: '0.75rem 1rem',
                              background: '#fee2e2',
                              borderRadius: '8px',
                              borderLeft: '3px solid #dc2626'
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="card" style={{ 
                background: 'linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)',
                marginTop: '1.5rem',
                borderLeft: '4px solid #0891b2'
              }}>
                <h4 style={{ marginBottom: '1rem', color: '#134e4a' }}>💙 Your Reflection Journey</h4>
                <ul style={{ paddingLeft: '1.5rem', margin: 0, color: '#134e4a' }}>
                  <li style={{ marginBottom: '0.5rem' }}>🎉 Celebrate what you did well - you earned it!</li>
                  <li style={{ marginBottom: '0.5rem' }}>🎯 Pick ONE thing to work on next time - progress over perfection</li>
                  <li style={{ marginBottom: '0.5rem' }}>🎧 Listen to your answers to notice your natural communication style</li>
                  <li style={{ marginBottom: '0.5rem' }}>📈 Track your growth over time - you\'ll be amazed at progress</li>
                  <li>💪 Be kind to yourself - you\'re doing something hard and brave</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
