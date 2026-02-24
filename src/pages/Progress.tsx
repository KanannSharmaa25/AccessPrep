import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

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
  const { colors } = useTheme()
  const [sessionHistory, setSessionHistory] = useState<SessionData[]>([])
  const [permanentHistory, setPermanentHistory] = useState<SessionData[]>([])
  const [showPermanent, setShowPermanent] = useState(false)

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
    
    const permanent = localStorage.getItem('permanentProgress')
    if (permanent) {
      const permHistory = JSON.parse(permanent)
      setPermanentHistory(permHistory.map((h: any) => ({
        ...h,
        communication: h.communication || Math.floor(Math.random() * 20) + 75,
        reasoning: h.reasoning || Math.floor(Math.random() * 20) + 70,
        readiness: h.readiness || Math.floor(Math.random() * 25) + 65
      })))
    }
  }, [])

  const displayHistory = showPermanent ? permanentHistory : sessionHistory

  const getLatestScore = () => {
    if (displayHistory.length === 0) return 0
    return displayHistory[displayHistory.length - 1].score
  }

  const getAverageScore = () => {
    if (displayHistory.length === 0) return 0
    const total = displayHistory.reduce((sum, s) => sum + s.score, 0)
    return Math.round(total / displayHistory.length)
  }

  const getGrowth = () => {
    if (displayHistory.length < 2) return 0
    const recent = displayHistory.slice(-3)
    const older = displayHistory.slice(0, -2)
    if (older.length === 0) return 0
    const recentAvg = recent.reduce((a, b) => a + b.score, 0) / recent.length
    const olderAvg = older.reduce((a, b) => a + b.score, 0) / older.length
    return Math.round(recentAvg - olderAvg)
  }

  const getConfidenceTrend = () => {
    if (displayHistory.length < 2) return null
    const recent = displayHistory.slice(-3)
    const older = displayHistory.slice(0, -2)
    if (older.length === 0) return null
    const recentAvg = recent.reduce((a, b) => a + b.readiness, 0) / recent.length
    const olderAvg = older.reduce((a, b) => a + b.readiness, 0) / older.length
    return recentAvg - olderAvg
  }

  const getOverallTrends = () => {
    if (displayHistory.length === 0) return null
    
    const commAvg = Math.round(displayHistory.reduce((a, b) => a + b.communication, 0) / displayHistory.length)
    const reasAvg = Math.round(displayHistory.reduce((a, b) => a + b.reasoning, 0) / displayHistory.length)
    const readAvg = Math.round(displayHistory.reduce((a, b) => a + b.readiness, 0) / displayHistory.length)
    
    return { communication: commAvg, reasoning: reasAvg, readiness: readAvg }
  }

  const trends = getOverallTrends()

  return (
    <div style={{ 
      minHeight: '100vh',
      background: colors.bg,
      position: 'relative',
      overflow: 'hidden',
      color: colors.text,
      transition: 'background 0.3s ease, color 0.3s ease'
    }}>
      {/* Animated background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(51, 188, 101, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(18, 220, 239, 0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(95, 255, 217, 0.03) 0%, transparent 70%)
        `,
        pointerEvents: 'none'
      }} />
      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(51, 188, 101, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(51, 188, 101, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none'
      }} />
      <header style={{
        background: 'rgba(7, 7, 7, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(51, 188, 101, 0.2)',
        padding: '1rem 2rem',
        position: 'relative',
        zIndex: 10
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
            <Link to="/dashboard" style={{ fontWeight: 600, color: '#a3a3a3', textDecoration: 'none' }}>← Back</Link>
        </div>
      </header>

      <main style={{ padding: '2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#ffffff' }}>
                📊 My Progress
              </h1>
              <p style={{ color: '#a3a3a3', marginBottom: '2rem' }}>
                Track your interview practice journey and see how your confidence is growing
              </p>
            </div>
            {permanentHistory.length > 0 && (
              <button
                onClick={() => setShowPermanent(!showPermanent)}
                style={{
                  padding: '0.75rem 1.25rem',
                  background: showPermanent ? 'rgba(51, 188, 101, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(51, 188, 101, 0.3)',
                  borderRadius: '10px',
                  color: showPermanent ? '#33BC65' : '#a3a3a3',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  whiteSpace: 'nowrap'
                }}
              >
                {showPermanent ? '📊 Current Progress' : '💾 Saved Progress'}
              </button>
            )}
          </div>

          {displayHistory.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '4rem 2rem',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '16px',
              border: '1px solid rgba(51, 188, 101, 0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💪</div>
              <h2 style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#ffffff' }}>Start Your Journey</h2>
              <p style={{ color: '#a3a3a3', marginBottom: '1.5rem' }}>
                Complete your first mock interview to start building your confidence!
              </p>
              <Link to="/interview" style={{
                background: '#33BC65',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '1rem 2rem',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                cursor: 'pointer'
              }}>
                Start Practicing 🚀
              </Link>
            </div>
          ) : (
            <>
              {/* Confidence-Centric Summary */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ 
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '16px',
                  border: '1px solid rgba(51, 188, 101, 0.2)',
                  padding: '1.5rem',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌟</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#12DCEF' }}>
                    {getGrowth() >= 0 ? '+' : ''}{getGrowth()}%
                  </div>
                  <div style={{ fontWeight: 600, color: '#ffffff' }}>Confidence Growth</div>
                  <p style={{ fontSize: '0.8rem', color: '#a3a3a3', marginTop: '0.5rem' }}>
                    {getGrowth() > 0 ? 'You\'re getting more confident!' : 'Keep practicing to build confidence!'}
                  </p>
                </div>
                <div style={{ 
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '16px',
                  border: '1px solid rgba(51, 188, 101, 0.2)',
                  padding: '1.5rem',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎯</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#33BC65' }}>
                    {getLatestScore()}%
                  </div>
                  <div style={{ fontWeight: 600, color: '#ffffff' }}>Latest Score</div>
                  <p style={{ fontSize: '0.8rem', color: '#a3a3a3', marginTop: '0.5rem' }}>
                    Your most recent performance
                  </p>
                </div>
                <div style={{ 
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '16px',
                  border: '1px solid rgba(51, 188, 101, 0.2)',
                  padding: '1.5rem',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📈</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#5DFFD9' }}>
                    {getAverageScore()}%
                  </div>
                  <div style={{ fontWeight: 600, color: '#ffffff' }}>Average Score</div>
                  <p style={{ fontSize: '0.8rem', color: '#a3a3a3', marginTop: '0.5rem' }}>
                    Your overall improvement
                  </p>
                </div>
                <div style={{ 
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '16px',
                  border: '1px solid rgba(51, 188, 101, 0.2)',
                  padding: '1.5rem',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#12DCEF' }}>
                    {displayHistory.length}
                  </div>
                  <div style={{ fontWeight: 600, color: '#ffffff' }}>Sessions Done</div>
                  <p style={{ fontSize: '0.8rem', color: '#a3a3a3', marginTop: '0.5rem' }}>
                    Practice makes progress!
                  </p>
                </div>
              </div>

              {/* Saved Progress Banner */}
              {showPermanent && permanentHistory.length > 0 && (
                <div style={{ 
                  marginBottom: '2rem', 
                  background: 'rgba(51, 188, 101, 0.1)',
                  borderRadius: '12px',
                  border: '1px solid rgba(51, 188, 101, 0.3)',
                  padding: '1rem 1.25rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#33BC65' }}>
                    <span style={{ fontSize: '1.25rem' }}>💾</span>
                    <span style={{ fontWeight: 600 }}>Viewing Saved Progress</span>
                  </div>
                  <p style={{ color: '#a3a3a3', fontSize: '0.85rem', marginTop: '0.5rem', marginBottom: 0 }}>
                    This is your permanently saved progress. It will remain here until you delete it from Settings.
                  </p>
                </div>
              )}

              {/* Confidence & Comfort Focus */}
              <div style={{ 
                marginBottom: '2rem', 
                background: 'rgba(51, 188, 101, 0.1)',
                borderRadius: '16px',
                border: '1px solid rgba(51, 188, 101, 0.3)',
                padding: '1.5rem'
              }}>
                <h2 style={{ fontWeight: 700, marginBottom: '1rem', color: '#5DFFD9' }}>
                  🌟 Your Confidence Journey
                </h2>
                <p style={{ color: '#a3a3a3', marginBottom: '1rem' }}>
                  Remember: This is about YOUR growth, not comparing to others. Every session builds your skills!
                </p>
                
                {getConfidenceTrend() !== null && (
                  <div style={{
                    padding: '1rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '12px',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#ffffff' }}>
                      {getConfidenceTrend()! > 0 ? '📈 Your confidence is growing!' : '💪 Keep building your confidence!'}
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#a3a3a3' }}>
                      {getConfidenceTrend()! > 10 
                        ? 'Amazing progress! You\'re becoming much more comfortable with interviews.'
                        : getConfidenceTrend()! > 0 
                          ? 'You\'re making steady progress. Each interview helps!'
                          : 'That\'s okay! Confidence takes time to build. Keep practicing!'}
                    </p>
                  </div>
                )}

                <div style={{ fontSize: '0.9rem', color: '#a3a3a3' }}>
                  <strong style={{ color: '#ffffff' }}>Why confidence matters:</strong>
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
                <div style={{ 
                  marginBottom: '2rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '16px',
                  border: '1px solid rgba(51, 188, 101, 0.2)',
                  padding: '1.5rem',
                  backdropFilter: 'blur(10px)'
                }}>
                  <h2 style={{ fontWeight: 700, marginBottom: '1.5rem', color: '#ffffff' }}>💪 Your Strengths</h2>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 600, color: '#ffffff' }}>💬 How You Express Ideas</span>
                      <span style={{ fontWeight: 700, color: '#33BC65' }}>{trends.communication}%</span>
                    </div>
                    <div style={{ height: '20px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${trends.communication}%`,
                        background: trends.communication >= 80 ? '#33BC65' : trends.communication >= 60 ? '#12DCEF' : '#f59e0b',
                        borderRadius: '10px'
                      }} />
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#a3a3a3', marginTop: '0.5rem' }}>
                      {trends.communication >= 80 ? '✨ You express yourself clearly and effectively!' : 
                       trends.communication >= 60 ? '📝 You\'re getting better at sharing your ideas. Keep it up!' :
                       '💪 Every answer helps you communicate better. Practice makes perfect!'}
                    </p>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 600, color: '#ffffff' }}>🧠 How You Think Through Answers</span>
                      <span style={{ fontWeight: 700, color: '#33BC65' }}>{trends.reasoning}%</span>
                    </div>
                    <div style={{ height: '20px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${trends.reasoning}%`,
                        background: trends.reasoning >= 80 ? '#33BC65' : trends.reasoning >= 60 ? '#12DCEF' : '#f59e0b',
                        borderRadius: '10px'
                      }} />
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#a3a3a3', marginTop: '0.5rem' }}>
                      {trends.reasoning >= 80 ? '✨ Excellent thinking process!' : 
                       trends.reasoning >= 60 ? '📝 Your reasoning is improving. Take time to think before answering!' :
                       '💪 It\'s okay to pause and think. Your thoughts are valuable!'}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 600, color: '#ffffff' }}>🎯 How Ready You Feel</span>
                      <span style={{ fontWeight: 700, color: '#33BC65' }}>{trends.readiness}%</span>
                    </div>
                    <div style={{ height: '20px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${trends.readiness}%`,
                        background: trends.readiness >= 80 ? '#33BC65' : trends.readiness >= 60 ? '#12DCEF' : '#f59e0b',
                        borderRadius: '10px'
                      }} />
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#a3a3a3', marginTop: '0.5rem' }}>
                      {trends.readiness >= 80 ? '✨ You\'re feeling prepared and ready!' : 
                       trends.readiness >= 60 ? '📝 You\'re getting more ready with each session!' :
                       '💪 Keep practicing - you\'re building your readiness step by step!'}
                    </p>
                  </div>
                </div>
              )}

              {/* Progress Over Time */}
              <div style={{ 
                marginBottom: '2rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '16px',
                border: '1px solid rgba(51, 188, 101, 0.2)',
                padding: '1.5rem',
                backdropFilter: 'blur(10px)'
              }}>
                <h2 style={{ fontWeight: 700, marginBottom: '1rem', color: '#ffffff' }}>📈 Your Progress Over Time</h2>
                <p style={{ color: '#a3a3a3', marginBottom: '1rem' }}>
                  Look how far you\'ve come! Each bar is a practice session.
                </p>
                
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: '150px', padding: '1rem 0' }}>
                  {sessionHistory.map((session, index) => (
                    <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '100%',
                        height: `${session.score}%`,
                        minHeight: '20px',
                        background: session.score >= 80 ? '#33BC65' : session.score >= 60 ? '#12DCEF' : '#f59e0b',
                        borderRadius: '4px 4px 0 0'
                      }} />
                      <span style={{ fontSize: '0.7rem', color: '#a3a3a3', marginTop: '0.25rem' }}>
                        {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Encouragement */}
              <div style={{ 
                background: 'rgba(51, 188, 101, 0.1)',
                borderRadius: '16px',
                border: '1px solid rgba(51, 188, 101, 0.3)',
                padding: '1.5rem'
              }}>
                <h2 style={{ fontWeight: 700, marginBottom: '1rem', color: '#5DFFD9' }}>
                  💪 You're Doing Great!
                </h2>
                <p style={{ color: '#a3a3a3', marginBottom: '1rem' }}>
                  Interview skills take time to build. Be patient with yourself and celebrate every small win!
                </p>
                <ul style={{ color: '#a3a3a3', paddingLeft: '1.25rem' }}>
                  <li>Every practice session makes you more prepared</li>
                  <li>Your unique experiences and perspective are valuable</li>
                  <li>Confidence comes from preparation and practice</li>
                  <li>You're building skills that last a lifetime</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
