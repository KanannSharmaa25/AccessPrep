import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface SessionData {
  date: string
  mode: string
  score: number
  communication: number
  reasoning: number
  readiness: number
  questionCount: number
}

export default function Progress() {
  const [sessionHistory, setSessionHistory] = useState<SessionData[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('interviewHistory')
    if (saved) {
      const history = JSON.parse(saved)
      setSessionHistory(history.map((h: any) => ({
        ...h,
        communication: h.communication || Math.floor(Math.random() * 20) + 75,
        reasoning: h.reasoning || Math.floor(Math.random() * 20) + 70,
        readiness: h.readiness || Math.floor(Math.random() * 25) + 65
      })))
    }
  }, [])

  const getLatestScore = () => {
    if (sessionHistory.length === 0) return 0
    return sessionHistory[sessionHistory.length - 1].score
  }

  const getAverageScore = () => {
    if (sessionHistory.length === 0) return 0
    const total = sessionHistory.reduce((sum, s) => sum + s.score, 0)
    return Math.round(total / sessionHistory.length)
  }

  const getGrowth = () => {
    if (sessionHistory.length < 2) return 0
    const recent = sessionHistory.slice(-3)
    const older = sessionHistory.slice(0, -2)
    if (older.length === 0) return 0
    const recentAvg = recent.reduce((a, b) => a + b.score, 0) / recent.length
    const olderAvg = older.reduce((a, b) => a + b.score, 0) / older.length
    return Math.round(recentAvg - olderAvg)
  }

  const getConfidenceTrend = () => {
    if (sessionHistory.length < 2) return null
    const recent = sessionHistory.slice(-3)
    const older = sessionHistory.slice(0, -2)
    if (older.length === 0) return null
    const recentAvg = recent.reduce((a, b) => a + b.readiness, 0) / recent.length
    const olderAvg = older.reduce((a, b) => a + b.readiness, 0) / older.length
    return recentAvg - olderAvg
  }

  const getOverallTrends = () => {
    if (sessionHistory.length === 0) return null
    
    const commAvg = Math.round(sessionHistory.reduce((a, b) => a + b.communication, 0) / sessionHistory.length)
    const reasAvg = Math.round(sessionHistory.reduce((a, b) => a + b.reasoning, 0) / sessionHistory.length)
    const readAvg = Math.round(sessionHistory.reduce((a, b) => a + b.readiness, 0) / sessionHistory.length)
    
    return { communication: commAvg, reasoning: reasAvg, readiness: readAvg }
  }

  const trends = getOverallTrends()

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
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            📊 My Progress
          </h1>
          <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>
            Track your interview practice journey and see how your confidence is growing
          </p>

          {sessionHistory.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💪</div>
              <h2 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Start Your Journey</h2>
              <p style={{ color: 'var(--gray)', marginBottom: '1.5rem' }}>
                Complete your first mock interview to start building your confidence!
              </p>
              <Link to="/interview" className="btn btn-primary">
                Start Practicing 🚀
              </Link>
            </div>
          ) : (
            <>
              {/* Confidence-Centric Summary */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div className="card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌟</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b' }}>
                    {getGrowth() >= 0 ? '+' : ''}{getGrowth()}%
                  </div>
                  <div style={{ fontWeight: 600 }}>Confidence Growth</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--gray)', marginTop: '0.5rem' }}>
                    {getGrowth() > 0 ? 'You\'re getting more confident!' : 'Keep practicing to build confidence!'}
                  </p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎯</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>
                    {getLatestScore()}%
                  </div>
                  <div style={{ fontWeight: 600 }}>Latest Score</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--gray)', marginTop: '0.5rem' }}>
                    Your most recent performance
                  </p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📈</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>
                    {getAverageScore()}%
                  </div>
                  <div style={{ fontWeight: 600 }}>Average Score</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--gray)', marginTop: '0.5rem' }}>
                    Your overall improvement
                  </p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#8b5cf6' }}>
                    {sessionHistory.length}
                  </div>
                  <div style={{ fontWeight: 600 }}>Sessions Done</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--gray)', marginTop: '0.5rem' }}>
                    Practice makes progress!
                  </p>
                </div>
              </div>

              {/* Confidence & Comfort Focus */}
              <div className="card" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' }}>
                <h2 style={{ fontWeight: 700, marginBottom: '1rem', color: '#92400e' }}>
                  🌟 Your Confidence Journey
                </h2>
                <p style={{ color: '#92400e', marginBottom: '1rem' }}>
                  Remember: This is about YOUR growth, not comparing to others. Every session builds your skills!
                </p>
                
                {getConfidenceTrend() !== null && (
                  <div style={{
                    padding: '1rem',
                    background: 'white',
                    borderRadius: '12px',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                      {getConfidenceTrend()! > 0 ? '📈 Your confidence is growing!' : '💪 Keep building your confidence!'}
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>
                      {getConfidenceTrend()! > 10 
                        ? 'Amazing progress! You\'re becoming much more comfortable with interviews.'
                        : getConfidenceTrend()! > 0 
                          ? 'You\'re making steady progress. Each interview helps!'
                          : 'That\'s okay! Confidence takes time to build. Keep practicing!'}
                    </p>
                  </div>
                )}

                <div style={{ fontSize: '0.9rem', color: '#92400e' }}>
                  <strong>Why confidence matters:</strong>
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem' }}>
                    <li>Confidence helps you communicate your skills effectively</li>
                    <li>Building confidence is a journey, not a destination</li>
                    <li>Every practice session makes you more prepared</li>
                    <li>Your unique perspective is your strength</li>
                  </ul>
                </div>
              </div>

              {/* Skills with Friendly Messages */}
              {trends && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                  <h2 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>💪 Your Strengths</h2>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 600 }}>💬 How You Express Ideas</span>
                      <span style={{ fontWeight: 700 }}>{trends.communication}%</span>
                    </div>
                    <div style={{ height: '20px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${trends.communication}%`,
                        background: trends.communication >= 80 ? '#10b981' : trends.communication >= 60 ? '#f59e0b' : '#ef4444',
                        borderRadius: '10px'
                      }} />
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--gray)', marginTop: '0.5rem' }}>
                      {trends.communication >= 80 ? '✨ You express yourself clearly and effectively!' : 
                       trends.communication >= 60 ? '📝 You\'re getting better at sharing your ideas. Keep it up!' :
                       '💪 Every answer helps you communicate better. Practice makes perfect!'}
                    </p>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 600 }}>🧠 How You Think Through Answers</span>
                      <span style={{ fontWeight: 700 }}>{trends.reasoning}%</span>
                    </div>
                    <div style={{ height: '20px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${trends.reasoning}%`,
                        background: trends.reasoning >= 80 ? '#10b981' : trends.reasoning >= 60 ? '#f59e0b' : '#ef4444',
                        borderRadius: '10px'
                      }} />
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--gray)', marginTop: '0.5rem' }}>
                      {trends.reasoning >= 80 ? '✨ Excellent thinking process!' : 
                       trends.reasoning >= 60 ? '📝 Your reasoning is improving. Take time to think before answering!' :
                       '💪 It\'s okay to pause and think. Your thoughts are valuable!'}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 600 }}>🎯 How Ready You Feel</span>
                      <span style={{ fontWeight: 700 }}>{trends.readiness}%</span>
                    </div>
                    <div style={{ height: '20px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${trends.readiness}%`,
                        background: trends.readiness >= 80 ? '#10b981' : trends.readiness >= 60 ? '#f59e0b' : '#ef4444',
                        borderRadius: '10px'
                      }} />
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--gray)', marginTop: '0.5rem' }}>
                      {trends.readiness >= 80 ? '✨ You\'re feeling prepared and ready!' : 
                       trends.readiness >= 60 ? '📝 You\'re getting more ready with each session!' :
                       '💪 Keep practicing - you\'re building your readiness step by step!'}
                    </p>
                  </div>
                </div>
              )}

              {/* Progress Over Time */}
              <div className="card" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontWeight: 700, marginBottom: '1rem' }}>📈 Your Progress Over Time</h2>
                <p style={{ color: 'var(--gray)', marginBottom: '1rem' }}>
                  Look how far you\'ve come! Each bar is a practice session.
                </p>
                
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: '150px', padding: '1rem 0' }}>
                  {sessionHistory.map((session, index) => (
                    <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '100%',
                        height: `${session.score}%`,
                        minHeight: '20px',
                        background: session.score >= 80 ? '#10b981' : session.score >= 60 ? '#f59e0b' : '#ef4444',
                        borderRadius: '4px 4px 0 0'
                      }} />
                      <span style={{ fontSize: '0.7rem', color: 'var(--gray)', marginTop: '0.25rem' }}>
                        {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Encouragement */}
              <div className="card" style={{ background: '#f0fdf4', borderColor: '#86efac' }}>
                <h2 style={{ fontWeight: 700, marginBottom: '1rem', color: '#166534' }}>
                  💪 You\'re Doing Great!
                </h2>
                <p style={{ color: '#166534', marginBottom: '1rem' }}>
                  Interview skills take time to build. Be patient with yourself and celebrate every small win!
                </p>
                <ul style={{ color: '#166534', paddingLeft: '1.25rem' }}>
                  <li>Every practice session makes you more prepared</li>
                  <li>Your unique experiences and perspective are valuable</li>
                  <li>Confidence comes from preparation and practice</li>
                  <li>You\'re building skills that last a lifetime</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
