import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const themes = [
  { id: 'light', label: 'Light', bg: '#f5f5f5', text: '#1a1a1a', accent: '#0d9488' },
  { id: 'dark', label: 'Dark', bg: '#070707', text: '#ffffff', accent: '#33BC65' },
  { id: 'high-contrast', label: 'High Contrast', bg: '#000000', text: '#ffffff', accent: '#ffff00' },
  { id: 'protanopia', label: 'Protanopia (Red-Blind)', bg: '#1a1a2e', text: '#f0e6d3', accent: '#7eb8da' },
  { id: 'deuteranopia', label: 'Deuteranopia (Green-Blind)', bg: '#1a1a2e', text: '#f5f0e6', accent: '#b8a8d9' },
  { id: 'tritanopia', label: 'Tritanopia (Blue-Blind)', bg: '#1a1a1a', text: '#f0f0f0', accent: '#f0a07a' }
]

const fontSizes = [
  { id: 'small', label: 'Small', size: '14px' },
  { id: 'medium', label: 'Medium', size: '16px' },
  { id: 'large', label: 'Large', size: '18px' },
  { id: 'extra-large', label: 'Extra Large', size: '20px' }
]

const getThemeColors = (themeId: string) => {
  const found = themes.find(t => t.id === themeId)
  return found || { bg: '#070707', text: '#ffffff', accent: '#33BC65' }
}

export default function Settings() {
  const navigate = useNavigate()
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('fontSize') || 'medium')
  const [dyslexiaFriendly, setDyslexiaFriendly] = useState(() => localStorage.getItem('dyslexiaFriendly') === 'true')
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('highContrast') === 'true')
  const [lowStimulation, setLowStimulation] = useState(() => localStorage.getItem('lowStimulation') === 'true')
  const [speechRecognition, setSpeechRecognition] = useState(() => localStorage.getItem('speechRecognition') !== 'false')
  const [speechPatience, setSpeechPatience] = useState(() => localStorage.getItem('speechPatience') !== 'false')
  const [speechPace, setSpeechPace] = useState(() => localStorage.getItem('speechPace') || 'normal')
  const [autoPunctuation, setAutoPunctuation] = useState(() => localStorage.getItem('autoPunctuation') !== 'false')
  const [extendedTime, setExtendedTime] = useState(() => localStorage.getItem('extendedTime') === 'true')
  
  const [showResetModal, setShowResetModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [resetConfirm, setResetConfirm] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState('')

  const themeColors = getThemeColors(theme)

  useEffect(() => {
    localStorage.setItem('theme', theme)
    localStorage.setItem('fontSize', fontSize)
    localStorage.setItem('dyslexiaFriendly', String(dyslexiaFriendly))
    localStorage.setItem('highContrast', String(highContrast))
    localStorage.setItem('lowStimulation', String(lowStimulation))
    localStorage.setItem('speechRecognition', String(speechRecognition))
    localStorage.setItem('speechPatience', String(speechPatience))
    localStorage.setItem('speechPace', speechPace)
    localStorage.setItem('autoPunctuation', String(autoPunctuation))
    localStorage.setItem('extendedTime', String(extendedTime))
    
    document.documentElement.setAttribute('data-theme', theme === 'high-contrast' ? 'high-contrast' : theme)
    document.documentElement.setAttribute('data-low-stimulation', String(lowStimulation))
    document.documentElement.style.setProperty('--bg-primary', themeColors.bg)
    document.documentElement.style.setProperty('--text-primary', themeColors.text)
    document.documentElement.style.setProperty('--accent-color', themeColors.accent)
    
    window.dispatchEvent(new Event('theme-changed'))
  }, [theme, fontSize, dyslexiaFriendly, highContrast, lowStimulation, speechRecognition, speechPatience, speechPace, autoPunctuation, extendedTime, themeColors])

  const handleResetProgress = () => {
    if (resetConfirm === 'RESET') {
      localStorage.removeItem('interviewHistory')
      localStorage.removeItem('permanentProgress')
      setShowResetModal(false)
      setResetConfirm('')
      window.dispatchEvent(new Event('theme-changed'))
    }
  }

  const handleDeleteAccount = () => {
    if (deleteConfirm === 'DELETE') {
      localStorage.clear()
      setShowDeleteModal(false)
      setDeleteConfirm('')
      navigate('/')
    }
  }

  const saveProgressPermanently = () => {
    const currentHistory = localStorage.getItem('interviewHistory')
    if (currentHistory) {
      localStorage.setItem('permanentProgress', currentHistory)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: themeColors.bg,
      position: 'relative',
      overflow: 'hidden',
      fontSize: fontSize === 'small' ? '14px' : fontSize === 'medium' ? '16px' : fontSize === 'large' ? '18px' : '20px',
      color: themeColors.text,
      transition: 'background 0.3s ease, color 0.3s ease'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse at 20% 20%, ${themeColors.accent}15 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, ${themeColors.accent}10 0%, transparent 50%)
        `,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(${themeColors.accent}08 1px, transparent 1px),
          linear-gradient(90deg, ${themeColors.accent}08 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none'
      }} />

      <header style={{
        background: theme === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(11, 11, 11, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${themeColors.accent}20`,
        padding: '1.25rem 2.5rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: `linear-gradient(135deg, ${themeColors.accent} 0%, ${themeColors.accent}dd 100%)`,
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.35rem',
              boxShadow: `0 4px 20px ${themeColors.accent}50`
            }}>
              ◈
            </div>
            <span style={{ fontSize: '1.35rem', fontWeight: 700, color: themeColors.text, letterSpacing: '-0.5px' }}>AccessPrep</span>
          </Link>
          <Link to="/dashboard" style={{ fontWeight: 500, color: themeColors.text, opacity: 0.5, textDecoration: 'none' }}>← Back</Link>
        </div>
      </header>

      <main style={{ padding: '2.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', marginLeft: 0 }}>
          <div style={{ marginBottom: '0.5rem', animation: 'fadeIn 0.5s ease' }}>
            <h1 style={{ 
              fontSize: '2rem', 
              fontWeight: 800, 
              marginBottom: '0.5rem',
              background: `linear-gradient(135deg, ${themeColors.text} 0%, ${themeColors.text}80 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Settings
            </h1>
            <p style={{ color: themeColors.text, opacity: 0.6, marginBottom: '2rem' }}>
              Customize your experience to best suit your needs
            </p>
          </div>

          <section style={{ marginBottom: '2rem', animation: 'slideUp 0.5s ease 0.1s both' }}>
            <h2 style={{ fontWeight: 600, marginBottom: '1rem', color: themeColors.text, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.8rem' }}>
              Theme & Display
            </h2>
            <div style={{ 
              background: theme === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(17, 17, 17, 0.8)',
              border: `1px solid ${themeColors.accent}30`,
              borderRadius: '20px', 
              padding: '1.75rem'
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.75rem', color: themeColors.text, fontSize: '0.95rem' }}>Color Theme</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  {themes.map(t => (
                    <button
                      key={t.id}
                      onClick={() => { setTheme(t.id); setHighContrast(t.id === 'high-contrast'); }}
                      style={{
                        padding: '0.75rem 1rem',
                        background: theme === t.id ? `${t.accent}20` : theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
                        color: theme === t.id ? t.accent : themeColors.text,
                        border: `2px solid ${theme === t.id ? t.accent : themeColors.accent}30`,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: theme === t.id ? 600 : 500,
                        fontSize: '0.85rem',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.75rem', color: themeColors.text, fontSize: '0.95rem' }}>Font Size</label>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {fontSizes.map(f => (
                    <button
                      key={f.id}
                      onClick={() => setFontSize(f.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: fontSize === f.id ? `${themeColors.accent}20` : theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
                        color: fontSize === f.id ? themeColors.accent : themeColors.text,
                        border: `2px solid ${fontSize === f.id ? themeColors.accent : themeColors.accent}30`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 500,
                        fontSize: '0.85rem'
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1rem',
                background: dyslexiaFriendly ? `${themeColors.accent}15` : 'transparent',
                borderRadius: '10px',
                cursor: 'pointer',
                marginBottom: '0.75rem',
                border: dyslexiaFriendly ? `1px solid ${themeColors.accent}50` : '1px solid transparent',
                transition: 'all 0.3s ease'
              }}>
                <input
                  type="checkbox"
                  checked={dyslexiaFriendly}
                  onChange={e => setDyslexiaFriendly(e.target.checked)}
                  style={{ accentColor: themeColors.accent, width: '20px', height: '20px' }}
                />
                <div>
                  <div style={{ fontWeight: 600, color: themeColors.text }}>Dyslexia-Friendly Font</div>
                  <div style={{ fontSize: '0.85rem', color: themeColors.text, opacity: 0.6 }}>Use OpenDyslexic font for better readability</div>
                </div>
              </label>

              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1rem',
                background: lowStimulation ? `${themeColors.accent}15` : 'transparent',
                borderRadius: '10px',
                cursor: 'pointer',
                border: lowStimulation ? `1px solid ${themeColors.accent}50` : '1px solid transparent',
                transition: 'all 0.3s ease'
              }}>
                <input
                  type="checkbox"
                  checked={lowStimulation}
                  onChange={e => setLowStimulation(e.target.checked)}
                  style={{ accentColor: themeColors.accent, width: '20px', height: '20px' }}
                />
                <div>
                  <div style={{ fontWeight: 600, color: themeColors.text }}>Low Stimulation Mode</div>
                  <div style={{ fontSize: '0.85rem', color: themeColors.text, opacity: 0.6 }}>Reduce animations, use soft colors</div>
                </div>
              </label>
            </div>
          </section>

          <section style={{ marginBottom: '2rem', animation: 'slideUp 0.5s ease 0.2s both' }}>
            <h2 style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem', color: themeColors.text, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Speech Recognition
            </h2>
            <div style={{ 
              background: theme === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(17, 17, 17, 0.8)',
              border: `1px solid ${themeColors.accent}30`,
              borderRadius: '20px', 
              padding: '1.75rem'
            }}>
              <p style={{ marginBottom: '1.5rem', color: themeColors.text, opacity: 0.6, fontSize: '0.95rem', lineHeight: 1.6 }}>
                Our AI speech recognition is designed to understand speech patterns with pauses, stuttering, or unclear pronunciation.
              </p>

              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1rem',
                background: speechRecognition ? `${themeColors.accent}15` : 'transparent',
                borderRadius: '10px',
                cursor: 'pointer',
                marginBottom: '0.75rem',
                border: speechRecognition ? `1px solid ${themeColors.accent}50` : '1px solid transparent',
                transition: 'all 0.3s ease'
              }}>
                <input
                  type="checkbox"
                  checked={speechRecognition}
                  onChange={e => setSpeechRecognition(e.target.checked)}
                  style={{ accentColor: themeColors.accent, width: '20px', height: '20px' }}
                />
                <div>
                  <div style={{ fontWeight: 600, color: themeColors.text }}>Enable Speech Recognition</div>
                  <div style={{ fontSize: '0.85rem', color: themeColors.text, opacity: 0.6 }}>Use voice input to answer questions</div>
                </div>
              </label>

              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1rem',
                background: speechPatience ? `${themeColors.accent}15` : 'transparent',
                borderRadius: '10px',
                cursor: 'pointer',
                marginBottom: '0.75rem',
                border: speechPatience ? `1px solid ${themeColors.accent}50` : '1px solid transparent',
                transition: 'all 0.3s ease'
              }}>
                <input
                  type="checkbox"
                  checked={speechPatience}
                  onChange={e => setSpeechPatience(e.target.checked)}
                  style={{ accentColor: themeColors.accent, width: '20px', height: '20px' }}
                />
                <div>
                  <div style={{ fontWeight: 600, color: themeColors.text }}>Patience Mode</div>
                  <div style={{ fontSize: '0.85rem', color: themeColors.text, opacity: 0.6 }}>Wait longer, handle pauses & stuttering</div>
                </div>
              </label>

              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1rem',
                background: autoPunctuation ? `${themeColors.accent}15` : 'transparent',
                borderRadius: '10px',
                cursor: 'pointer',
                marginBottom: '1rem',
                border: autoPunctuation ? `1px solid ${themeColors.accent}50` : '1px solid transparent',
                transition: 'all 0.3s ease'
              }}>
                <input
                  type="checkbox"
                  checked={autoPunctuation}
                  onChange={e => setAutoPunctuation(e.target.checked)}
                  style={{ accentColor: themeColors.accent, width: '20px', height: '20px' }}
                />
                <div>
                  <div style={{ fontWeight: 600, color: themeColors.text }}>Auto-Punctuation</div>
                  <div style={{ fontSize: '0.85rem', color: themeColors.text, opacity: 0.6 }}>Automatically add punctuation</div>
                </div>
              </label>

              <div style={{ marginTop: '1rem' }}>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.75rem', color: themeColors.text, fontSize: '0.95rem' }}>Recognition Sensitivity</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['relaxed', 'normal', 'strict'].map(s => (
                    <button
                      key={s}
                      onClick={() => setSpeechPace(s)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: speechPace === s ? `${themeColors.accent}20` : theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
                        color: speechPace === s ? themeColors.accent : themeColors.text,
                        border: `2px solid ${speechPace === s ? themeColors.accent : themeColors.accent}30`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                        fontSize: '0.85rem'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: '2rem', animation: 'slideUp 0.5s ease 0.3s both' }}>
            <h2 style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem', color: themeColors.text, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Time & Input
            </h2>
            <div style={{ 
              background: theme === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(17, 17, 17, 0.8)',
              border: `1px solid ${themeColors.accent}30`,
              borderRadius: '20px', 
              padding: '1.75rem'
            }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1rem',
                background: extendedTime ? `${themeColors.accent}15` : 'transparent',
                borderRadius: '10px',
                cursor: 'pointer',
                border: extendedTime ? `1px solid ${themeColors.accent}50` : '1px solid transparent',
                transition: 'all 0.3s ease'
              }}>
                <input
                  type="checkbox"
                  checked={extendedTime}
                  onChange={e => setExtendedTime(e.target.checked)}
                  style={{ accentColor: themeColors.accent, width: '20px', height: '20px' }}
                />
                <div>
                  <div style={{ fontWeight: 600, color: themeColors.text }}>Extended Thinking Time</div>
                  <div style={{ fontSize: '0.85rem', color: themeColors.text, opacity: 0.6 }}>No time pressure on answers</div>
                </div>
              </label>
            </div>
          </section>

          <section style={{ marginBottom: '2rem', animation: 'slideUp 0.5s ease 0.35s both' }}>
            <h2 style={{ fontWeight: 600, marginBottom: '1rem', color: themeColors.text, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.8rem' }}>
              Data Management
            </h2>
            <div style={{ 
              background: theme === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(17, 17, 17, 0.8)',
              border: `1px solid ${themeColors.accent}30`,
              borderRadius: '20px', 
              padding: '1.75rem'
            }}>
              <p style={{ marginBottom: '1.5rem', color: themeColors.text, opacity: 0.6, fontSize: '0.95rem', lineHeight: 1.6 }}>
                Manage your progress data. You can save your progress permanently or reset it.
              </p>

              <button
                onClick={saveProgressPermanently}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: `${themeColors.accent}20`,
                  border: `1px solid ${themeColors.accent}40`,
                  borderRadius: '12px',
                  color: themeColors.accent,
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginBottom: '1rem',
                  fontSize: '1rem'
                }}
              >
                💾 Save Progress Permanently
              </button>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => setShowResetModal(true)}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    background: 'transparent',
                    border: '1px solid #f59e0b',
                    borderRadius: '12px',
                    color: '#f59e0b',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontSize: '0.95rem'
                  }}
                >
                  🔄 Reset Progress
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    background: 'transparent',
                    border: '1px solid #ef4444',
                    borderRadius: '12px',
                    color: '#ef4444',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontSize: '0.95rem'
                  }}
                >
                  🗑️ Delete Account
                </button>
              </div>
            </div>
          </section>

          {/* Reset Modal */}
          {showResetModal && (
            <div style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100,
              padding: '1rem'
            }}>
              <div style={{
                background: theme === 'light' ? '#fff' : '#1a1a1a',
                borderRadius: '20px',
                padding: '2rem',
                maxWidth: '400px',
                width: '100%',
                border: '1px solid #f59e0b'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#f59e0b' }}>
                  ⚠️ Reset Progress
                </h3>
                <p style={{ color: themeColors.text, opacity: 0.8, marginBottom: '1rem' }}>
                  This will delete all your interview progress data. This action cannot be undone.
                </p>
                <p style={{ color: themeColors.text, opacity: 0.6, marginBottom: '1rem', fontSize: '0.9rem' }}>
                  Type <strong>RESET</strong> to confirm:
                </p>
                <input
                  type="text"
                  value={resetConfirm}
                  onChange={e => setResetConfirm(e.target.value)}
                  placeholder="RESET"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #f59e0b',
                    borderRadius: '8px',
                    background: theme === 'light' ? '#f5f5f5' : '#0a0a0a',
                    color: themeColors.text,
                    fontSize: '1rem',
                    marginBottom: '1rem',
                    outline: 'none'
                  }}
                />
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => { setShowResetModal(false); setResetConfirm(''); }}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: 'transparent',
                      border: '1px solid themeColors.border',
                      borderRadius: '8px',
                      color: themeColors.text,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleResetProgress}
                    disabled={resetConfirm !== 'RESET'}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: resetConfirm === 'RESET' ? '#f59e0b' : 'rgba(245, 158, 11, 0.3)',
                      border: 'none',
                      borderRadius: '8px',
                      color: resetConfirm === 'RESET' ? '#fff' : 'rgba(255,255,255,0.5)',
                      cursor: resetConfirm === 'RESET' ? 'pointer' : 'not-allowed',
                      fontWeight: 600
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Account Modal */}
          {showDeleteModal && (
            <div style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100,
              padding: '1rem'
            }}>
              <div style={{
                background: theme === 'light' ? '#fff' : '#1a1a1a',
                borderRadius: '20px',
                padding: '2rem',
                maxWidth: '400px',
                width: '100%',
                border: '1px solid #ef4444'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#ef4444' }}>
                  🗑️ Delete Account
                </h3>
                <p style={{ color: themeColors.text, opacity: 0.8, marginBottom: '1rem' }}>
                  This will permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <p style={{ color: themeColors.text, opacity: 0.6, marginBottom: '1rem', fontSize: '0.9rem' }}>
                  Type <strong>DELETE</strong> to confirm:
                </p>
                <input
                  type="text"
                  value={deleteConfirm}
                  onChange={e => setDeleteConfirm(e.target.value)}
                  placeholder="DELETE"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ef4444',
                    borderRadius: '8px',
                    background: theme === 'light' ? '#f5f5f5' : '#0a0a0a',
                    color: themeColors.text,
                    fontSize: '1rem',
                    marginBottom: '1rem',
                    outline: 'none'
                  }}
                />
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => { setShowDeleteModal(false); setDeleteConfirm(''); }}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: 'transparent',
                      border: '1px solid themeColors.border',
                      borderRadius: '8px',
                      color: themeColors.text,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirm !== 'DELETE'}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: deleteConfirm === 'DELETE' ? '#ef4444' : 'rgba(239, 68, 68, 0.3)',
                      border: 'none',
                      borderRadius: '8px',
                      color: deleteConfirm === 'DELETE' ? '#fff' : 'rgba(255,255,255,0.5)',
                      cursor: deleteConfirm === 'DELETE' ? 'pointer' : 'not-allowed',
                      fontWeight: 600
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          <div style={{ 
            background: theme === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(17, 17, 17, 0.8)',
            border: `1px solid ${themeColors.accent}30`,
            borderRadius: '20px', 
            padding: '1.75rem',
            animation: 'slideUp 0.5s ease 0.4s both'
          }}>
            <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: themeColors.text }}>Preview</h3>
            <p style={{ lineHeight: 1.8, color: themeColors.text, opacity: 0.8, fontSize: '0.95rem' }}>
              This is how your interview text will appear. The settings you choose will automatically adjust the entire platform to your needs.
              {dyslexiaFriendly && ' Using dyslexia-friendly font for better readability.'}
              {extendedTime && ' You will have extended time to answer each question.'}
              {speechPatience && ' Our AI will be patient with your speech patterns.'}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
