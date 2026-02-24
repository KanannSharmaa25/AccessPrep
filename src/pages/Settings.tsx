import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const themes = [
  { id: 'light', label: '☀️ Light', bg: '#ffffff', text: '#1e293b' },
  { id: 'dark', label: '🌙 Dark', bg: '#1e293b', text: '#f8fafc' },
  { id: 'high-contrast', label: '⚡ High Contrast', bg: '#000000', text: '#ffffff' },
  { id: 'blue', label: '🔵 Blue Light', bg: '#ebf5ff', text: '#1e3a5f' }
]

const fontSizes = [
  { id: 'small', label: 'Small', size: '14px' },
  { id: 'medium', label: 'Medium', size: '16px' },
  { id: 'large', label: 'Large', size: '18px' },
  { id: 'extra-large', label: 'Extra Large', size: '20px' }
]

export default function Settings() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('fontSize') || 'medium')
  const [dyslexiaFriendly, setDyslexiaFriendly] = useState(() => localStorage.getItem('dyslexiaFriendly') === 'true')
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('highContrast') === 'true')
  const [lowStimulation, setLowStimulation] = useState(() => localStorage.getItem('lowStimulation') === 'true')
  const [speechRecognition, setSpeechRecognition] = useState(() => localStorage.getItem('speechRecognition') !== 'false')
  const [speechPatience, setSpeechPatience] = useState(() => localStorage.getItem('speechPatience') !== 'false')
  const [speechPace, setSpeechPace] = useState(() => localStorage.getItem('speechPace') || 'normal')
  const [autoPunctuation, setAutoPunctuation] = useState(() => localStorage.getItem('autoPunctuation') !== 'false')
  const [extendedTime, setExtendedTime] = useState(() => localStorage.getItem('extendedTime') === 'true')

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
    
    document.documentElement.setAttribute('data-theme', theme === 'high-contrast' ? 'high-contrast' : theme === 'blue' ? 'blue-light' : theme)
    document.documentElement.setAttribute('data-low-stimulation', String(lowStimulation))
  }, [theme, fontSize, dyslexiaFriendly, highContrast, lowStimulation, speechRecognition, speechPatience, speechPace, autoPunctuation, extendedTime])

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontSize: fontSize === 'small' ? '14px' : fontSize === 'medium' ? '16px' : fontSize === 'large' ? '18px' : '20px'
    }}>
      {/* Header */}
      <header style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '1rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
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
          <Link to="/dashboard" style={{ fontWeight: 600, color: 'inherit', textDecoration: 'none' }}>← Back</Link>
        </div>
      </header>

      <main style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            ⚙️ Accessibility Settings
          </h1>
          <p style={{ opacity: 0.7, marginBottom: '2rem' }}>
            Customize your experience to best suit your needs
          </p>

          {/* Theme Selection */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
              🎨 Theme & Display
            </h2>
            <div style={{ 
              background: highContrast ? '#111111' : theme === 'dark' ? '#334155' : 'white',
              borderRadius: '16px', 
              padding: '1.5rem',
              border: `2px solid ${highContrast ? '#ffffff' : '#e2e8f0'}`
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>Color Theme</label>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {themes.map(t => (
                    <button
                      key={t.id}
                      onClick={() => { setTheme(t.id); setHighContrast(t.id === 'high-contrast'); }}
                      style={{
                        padding: '0.75rem 1rem',
                        background: t.bg,
                        color: t.text,
                        border: `2px solid ${theme === t.id ? '#7c3aed' : '#e2e8f0'}`,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: theme === t.id ? 700 : 500,
                        fontSize: '0.9rem'
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>Font Size</label>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {fontSizes.map(f => (
                    <button
                      key={f.id}
                      onClick={() => setFontSize(f.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: fontSize === f.id ? '#7c3aed' : 'transparent',
                        color: fontSize === f.id ? 'white' : 'inherit',
                        border: `2px solid ${fontSize === f.id ? '#7c3aed' : '#e2e8f0'}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 500
                      }}
                    >
                      {f.label} ({f.size})
                    </button>
                  ))}
                </div>
              </div>

              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1rem',
                background: dyslexiaFriendly ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                borderRadius: '10px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={dyslexiaFriendly}
                  onChange={e => setDyslexiaFriendly(e.target.checked)}
                  style={{ width: '20px', height: '20px' }}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>🔤 Dyslexia-Friendly Font</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Use OpenDyslexic font for better readability</div>
                </div>
              </label>

              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1rem',
                background: lowStimulation ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                borderRadius: '10px',
                cursor: 'pointer',
                marginTop: '0.75rem'
              }}>
                <input
                  type="checkbox"
                  checked={lowStimulation}
                  onChange={e => setLowStimulation(e.target.checked)}
                  style={{ width: '20px', height: '20px' }}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>🌿 Low Stimulation Mode</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Reduce animations, use soft colors, minimize sensory input</div>
                </div>
              </label>
            </div>
          </section>

          {/* Speech Recognition Settings */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
              🎤 Speech Recognition
            </h2>
            <div style={{ 
              background: highContrast ? '#111111' : theme === 'dark' ? '#334155' : 'white',
              borderRadius: '16px', 
              padding: '1.5rem',
              border: `2px solid ${highContrast ? '#ffffff' : '#e2e8f0'}`
            }}>
              <p style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
                Our AI speech recognition is specially designed to understand speech patterns that include pauses, stuttering, repetition, or unclear pronunciation. We focus on extracting meaning rather than penalizing fluency.
              </p>

              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1rem',
                background: speechRecognition ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                borderRadius: '10px',
                cursor: 'pointer',
                marginBottom: '1rem'
              }}>
                <input
                  type="checkbox"
                  checked={speechRecognition}
                  onChange={e => setSpeechRecognition(e.target.checked)}
                  style={{ width: '20px', height: '20px' }}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>Enable Speech Recognition</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Use voice input to answer questions</div>
                </div>
              </label>

              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1rem',
                background: speechPatience ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                borderRadius: '10px',
                cursor: 'pointer',
                marginBottom: '1rem'
              }}>
                <input
                  type="checkbox"
                  checked={speechPatience}
                  onChange={e => setSpeechPatience(e.target.checked)}
                  style={{ width: '20px', height: '20px' }}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>⏱️ Patience Mode</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Wait longer for you to finish speaking, handle pauses & stuttering</div>
                </div>
              </label>

              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1rem',
                background: autoPunctuation ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                borderRadius: '10px',
                cursor: 'pointer',
                marginBottom: '1rem'
              }}>
                <input
                  type="checkbox"
                  checked={autoPunctuation}
                  onChange={e => setAutoPunctuation(e.target.checked)}
                  style={{ width: '20px', height: '20px' }}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>✨ Auto-Punctuation</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Automatically add punctuation even if you forget</div>
                </div>
              </label>

              <div style={{ marginTop: '1rem' }}>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>Recognition Sensitivity</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['relaxed', 'normal', 'strict'].map(s => (
                    <button
                      key={s}
                      onClick={() => setSpeechPace(s)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: speechPace === s ? '#7c3aed' : 'transparent',
                        color: speechPace === s ? 'white' : 'inherit',
                        border: `2px solid ${speechPace === s ? '#7c3aed' : '#e2e8f0'}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textTransform: 'capitalize'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.5rem' }}>
                  Relaxed: Best for stuttering • Normal: Standard • Strict: Precise
                </p>
              </div>
            </div>
          </section>

          {/* Time & Input Settings */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
              ⏰ Time & Input
            </h2>
            <div style={{ 
              background: highContrast ? '#111111' : theme === 'dark' ? '#334155' : 'white',
              borderRadius: '16px', 
              padding: '1.5rem',
              border: `2px solid ${highContrast ? '#ffffff' : '#e2e8f0'}`
            }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1rem',
                background: extendedTime ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                borderRadius: '10px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={extendedTime}
                  onChange={e => setExtendedTime(e.target.checked)}
                  style={{ width: '20px', height: '20px' }}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>🧘 Extended Thinking Time</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>No time pressure on answers - take your time to think</div>
                </div>
              </label>
            </div>
          </section>

          {/* Preview */}
          <div style={{ 
            background: highContrast ? '#111111' : theme === 'dark' ? '#334155' : 'white',
            borderRadius: '16px', 
            padding: '1.5rem',
            border: `2px solid ${highContrast ? '#ffffff' : '#e2e8f0'}`
          }}>
            <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>👁️ Preview</h3>
            <p style={{ lineHeight: 1.8 }}>
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
