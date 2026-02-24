import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

export default function Login() {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      const userName = email.split('@')[0]
      localStorage.setItem('userName', userName)
      localStorage.setItem('isGuest', 'false')
      setLoading(false)
      navigate('/profile')
    }, 1000)
  }

  const handleGuest = () => {
    localStorage.setItem('userName', 'Guest')
    localStorage.setItem('isGuest', 'true')
    navigate('/profile')
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: colors.bg,
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem',
      color: colors.text,
      transition: 'background 0.3s ease, color 0.3s ease'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse at 20% 20%, ${colors.accent}15 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, ${colors.accent}10 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, ${colors.accent}08 0%, transparent 70%)
        `,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(${colors.accent}08 1px, transparent 1px),
          linear-gradient(90deg, ${colors.accent}08 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none'
      }} />

      <div style={{
        width: '100%',
        maxWidth: '440px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem', animation: 'fadeIn 0.6s ease' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', textDecoration: 'none' }}>
            <div style={{ 
              width: '56px',
              height: '56px',
              background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accent}dd 100%)`,
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              boxShadow: `0 8px 32px ${colors.accent}40`
            }}>
              ◈
            </div>
          </Link>
          <h1 style={{ 
            fontSize: '2.25rem', 
            fontWeight: 800, 
            marginBottom: '0.5rem',
            background: `linear-gradient(135deg, ${colors.text} 0%, ${colors.text}80 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px'
          }}>Welcome Back</h1>
          <p style={{ color: colors.text, opacity: 0.6 }}>Sign in to continue your interview prep</p>
        </div>
        
        <div style={{ 
          background: colors.cardBg,
          border: `1px solid ${colors.border}`,
          borderRadius: '24px',
          padding: '2.25rem',
          backdropFilter: 'blur(20px)',
          animation: 'slideUp 0.5s ease 0.1s both'
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: colors.text, fontSize: '0.9rem' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: `1px solid ${colors.accent}30`,
                  borderRadius: '12px',
                  background: colors.bg,
                  color: colors.text,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = colors.accent}
                onBlur={(e) => e.target.style.borderColor = `${colors.accent}30`}
              />
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: colors.text, fontSize: '0.9rem' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: `1px solid ${colors.accent}30`,
                  borderRadius: '12px',
                  background: colors.bg,
                  color: colors.text,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = colors.accent}
                onBlur={(e) => e.target.style.borderColor = `${colors.accent}30`}
              />
            </div>

            <button 
              type="submit" 
              style={{ 
                width: '100%', 
                marginBottom: '1.5rem',
                padding: '1rem 2rem',
                background: loading ? `${colors.accent}50` : `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accent}dd 100%)`,
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '1.05rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                transform: loading ? 'none' : 'translateY(0)'
              }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
            <div style={{ flex: 1, height: '1px', background: colors.border }} />
            <span style={{ color: colors.text, opacity: 0.4, fontSize: '0.85rem' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: colors.border }} />
          </div>

          <button 
            onClick={handleGuest}
            style={{ 
              width: '100%',
              padding: '1rem 2rem',
              background: 'transparent',
              border: `1px solid ${colors.accent}40`,
              borderRadius: '12px',
              color: colors.accent,
              fontSize: '1rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Continue as Guest →
          </button>

          <p style={{ textAlign: 'center', marginTop: '1.75rem', color: colors.text, opacity: 0.6 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ fontWeight: 600, color: colors.accent, textDecoration: 'none' }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
