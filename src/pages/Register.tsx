import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

export default function Register() {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      localStorage.setItem('userName', name || email.split('@')[0])
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
      background: '#070707',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem'
    }}>
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
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(51, 188, 101, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(51, 188, 101, 0.03) 1px, transparent 1px)
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
      minHeight: '100vh',
      background: colors.bg,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: colors.text,
      transition: 'background 0.3s ease, color 0.3s ease'
    }}>
              ◈
            </div>
          </Link>
          <h1 style={{ 
            fontSize: '2.25rem', 
            fontWeight: 800, 
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #a3a3a3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px'
          }}>Create Account</h1>
          <p style={{ color: '#737373' }}>Start your inclusive interview journey</p>
        </div>
        
        <div style={{ 
          background: 'rgba(17, 17, 17, 0.8)',
          border: '1px solid rgba(51, 188, 101, 0.15)',
          borderRadius: '24px',
          padding: '2.25rem',
          backdropFilter: 'blur(20px)',
          animation: 'slideUp 0.5s ease 0.1s both'
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: '#e5e5e5', fontSize: '0.9rem' }}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="John Doe"
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '1px solid rgba(51, 188, 101, 0.2)',
                  borderRadius: '12px',
                  background: 'rgba(7, 7, 7, 0.6)',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#33BC65'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(51, 188, 101, 0.2)'}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: '#e5e5e5', fontSize: '0.9rem' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '1px solid rgba(51, 188, 101, 0.2)',
                  borderRadius: '12px',
                  background: 'rgba(7, 7, 7, 0.6)',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#33BC65'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(51, 188, 101, 0.2)'}
              />
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: '#e5e5e5', fontSize: '0.9rem' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={6}
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '1px solid rgba(51, 188, 101, 0.2)',
                  borderRadius: '12px',
                  background: 'rgba(7, 7, 7, 0.6)',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#33BC65'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(51, 188, 101, 0.2)'}
              />
            </div>

            <button 
              type="submit" 
              style={{ 
                width: '100%', 
                marginBottom: '1.5rem',
                padding: '1rem 2rem',
                background: loading ? 'rgba(51, 188, 101, 0.5)' : 'linear-gradient(135deg, #33BC65 0%, #28a653 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '1.05rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(51, 188, 101, 0.15)' }} />
            <span style={{ color: '#525252', fontSize: '0.85rem' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(51, 188, 101, 0.15)' }} />
          </div>

          <button 
            onClick={handleGuest}
            style={{ 
              width: '100%',
              padding: '1rem 2rem',
              background: 'transparent',
              border: '1px solid rgba(51, 188, 101, 0.3)',
              borderRadius: '12px',
              color: '#33BC65',
              fontSize: '1rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Continue as Guest →
          </button>

          <p style={{ textAlign: 'center', marginTop: '1.75rem', color: '#737373' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ fontWeight: 600, color: '#33BC65', textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
