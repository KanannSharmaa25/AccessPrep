import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const features = [
  {
    icon: '🎤',
    title: 'Practice Interview',
    description: 'AI-powered mock interviews tailored to your needs',
    to: '/interview',
    color: '#33BC65',
    gradient: 'linear-gradient(135deg, rgba(51, 188, 101, 0.15) 0%, rgba(51, 188, 101, 0.02) 100%)'
  },
  {
    icon: '📄',
    title: 'Resume Analyzer',
    description: 'Upload & analyze your resume with AI',
    to: '/resume',
    color: '#12DCEF',
    gradient: 'linear-gradient(135deg, rgba(18, 220, 239, 0.15) 0%, rgba(18, 220, 239, 0.02) 100%)'
  },
  {
    icon: '🎯',
    title: 'Strategy Builder',
    description: 'Personalized interview strategies for your needs',
    to: '/strategy',
    color: '#5DFFD9',
    gradient: 'linear-gradient(135deg, rgba(95, 255, 217, 0.15) 0%, rgba(95, 255, 217, 0.02) 100%)'
  },
  {
    icon: '📊',
    title: 'Progress',
    description: 'Track your improvement over time',
    to: '/progress',
    color: '#a78bfa',
    gradient: 'linear-gradient(135deg, rgba(167, 139, 250, 0.15) 0%, rgba(167, 139, 250, 0.02) 100%)'
  },
  {
    icon: '💬',
    title: 'AI Mentor',
    description: 'Get personalized guidance anytime',
    to: '/mentor',
    color: '#f472b6',
    gradient: 'linear-gradient(135deg, rgba(244, 114, 182, 0.15) 0%, rgba(244, 114, 182, 0.02) 100%)'
  },
  {
    icon: '🛡️',
    title: 'Sensitive Questions',
    description: 'Handle difficult questions with confidence',
    to: '/sensitive',
    color: '#fbbf24',
    gradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.02) 100%)'
  },
  {
    icon: '🎬',
    title: 'Interview Replay',
    description: 'Review and learn from past sessions',
    to: '/replay',
    color: '#34d399',
    gradient: 'linear-gradient(135deg, rgba(52, 211, 153, 0.15) 0%, rgba(52, 211, 153, 0.02) 100%)'
  },
  {
    icon: '🏢',
    title: 'Real-World Practice',
    description: 'Industry-specific interview preparation',
    to: '/realworld',
    color: '#818cf8',
    gradient: 'linear-gradient(135deg, rgba(129, 140, 248, 0.15) 0%, rgba(129, 140, 248, 0.02) 100%)'
  }
]

const quickLinks = [
  { icon: '⚙️', title: 'Settings', to: '/settings', color: '#6b7280' },
  { icon: '👤', title: 'Profile', to: '/profile', color: '#9ca3af' },
]

export default function Dashboard() {
  const profile = JSON.parse(localStorage.getItem('userProfile') || '{}')
  const [sessionHistory, setSessionHistory] = useState([])
  const [animated, setAnimated] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    const saved = localStorage.getItem('interviewHistory')
    if (saved) {
      setSessionHistory(JSON.parse(saved))
    }
    setAnimated(true)
  }, [])

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem('theme') || 'dark')
    }
    window.addEventListener('theme-changed', handleThemeChange)
    window.addEventListener('storage', handleThemeChange)
    return () => {
      window.removeEventListener('theme-changed', handleThemeChange)
      window.removeEventListener('storage', handleThemeChange)
    }
  }, [])

  const themeColors: Record<string, { bg: string; text: string; accent: string; cardBg: string; border: string }> = {
    light: { bg: '#f5f5f5', text: '#1a1a1a', accent: '#0d9488', cardBg: '#ffffff', border: '#e5e7eb' },
    dark: { bg: '#070707', text: '#ffffff', accent: '#33BC65', cardBg: 'rgba(17, 17, 17, 0.8)', border: 'rgba(51, 188, 101, 0.15)' },
    'high-contrast': { bg: '#000000', text: '#ffffff', accent: '#ffff00', cardBg: '#111111', border: '#ffffff' },
    protanopia: { bg: '#1a1a2e', text: '#f0e6d3', accent: '#7eb8da', cardBg: 'rgba(30, 30, 60, 0.8)', border: 'rgba(126, 184, 218, 0.3)' },
    deuteranopia: { bg: '#1a1a2e', text: '#f5f0e6', accent: '#b8a8d9', cardBg: 'rgba(30, 30, 50, 0.8)', border: 'rgba(184, 168, 217, 0.3)' },
    tritanopia: { bg: '#1a1a1a', text: '#f0f0f0', accent: '#f0a07a', cardBg: 'rgba(40, 30, 30, 0.8)', border: 'rgba(240, 160, 122, 0.3)' }
  }
  const colors = themeColors[theme] || themeColors.dark

  const userName = localStorage.getItem('userName') || ''
  const greeting = userName ? `Hello, ${userName}` : 'Hello!'

  const getAverageScore = () => {
    if (sessionHistory.length === 0) return 0
    const total = sessionHistory.reduce((sum: number, s: any) => sum + s.score, 0)
    return Math.round(total / sessionHistory.length)
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: colors.bg,
      position: 'relative',
      overflow: 'hidden',
      transition: 'background 0.3s ease'
    }}>
      {/* Animated background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse at 20% 20%, ${colors.accent}20 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, ${colors.accent}15 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, ${colors.accent}08 0%, transparent 70%),
          radial-gradient(ellipse at 90% 10%, ${colors.accent}08 0%, transparent 40%)
        `,
        pointerEvents: 'none'
      }} />
      
      {/* Grid pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(${colors.accent}08 1px, transparent 1px),
          linear-gradient(90deg, ${colors.accent}08 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none'
      }} />

      {/* Floating orbs */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(51, 188, 101, 0.1) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
        animation: 'float 6s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '10%',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(18, 220, 239, 0.08) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        animation: 'float 8s ease-in-out infinite reverse',
      }} />

      {/* Header */}
      <header style={{
        background: 'rgba(7, 7, 7, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(51, 188, 101, 0.15)',
        padding: '1rem 2.5rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: 'linear-gradient(135deg, #33BC65 0%, #28a653 100%)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.35rem',
              boxShadow: '0 4px 20px rgba(51, 188, 101, 0.4)',
              animation: 'pulse-glow 2s ease-in-out infinite'
            }}>
              ♿
            </div>
            <span style={{ fontSize: '1.35rem', fontWeight: 700, color: colors.text, letterSpacing: '-0.5px' }}>AccessPrep</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {quickLinks.map((link, i) => (
              <Link 
                key={i}
                to={link.to}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#a3a3a3',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(51, 188, 101, 0.15)'
                  e.currentTarget.style.borderColor = 'rgba(51, 188, 101, 0.3)'
                  e.currentTarget.style.color = '#ffffff'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.color = '#a3a3a3'
                }}
              >
                <span>{link.icon}</span>
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main style={{ padding: '2rem 2.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          {/* Welcome Section */}
          <div style={{ 
            marginBottom: '2.5rem',
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease'
          }}>
            <h1 style={{ 
              fontSize: '3rem', 
              fontWeight: 800, 
              marginBottom: '0.75rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #a3a3a3 50%, #5DFFD9 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-1px',
              animation: animated ? 'gradient-shift 4s ease infinite' : 'none'
            }}>
              {greeting}
            </h1>
            <p style={{ color: '#737373', fontSize: '1.15rem' }}>
              {profile.disabilities?.length > 0 
                ? profile.disabilities.map((d: string) => d.charAt(0).toUpperCase() + d.slice(1)).join(', ')
                : 'Your journey starts here'
              }
              <span style={{ color: '#404040', margin: '0 0.75rem' }}>•</span> 
              {profile.role || 'Personalized for you'}
            </p>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.25rem',
            marginBottom: '2.5rem'
          }}>
            {[
              { label: 'Interviews', value: sessionHistory.length, icon: '🎤', color: '#33BC65', suffix: '' },
              { label: 'Avg Score', value: getAverageScore() || '--', icon: '📈', color: '#12DCEF', suffix: '%' },
              { label: 'Best Score', value: Math.max(...sessionHistory.map((s: any) => s.score), 0) || '--', icon: '⭐', color: '#5DFFD9', suffix: '%' },
              { label: 'Streak', value: sessionHistory.length > 0 ? '🔥' : '💪', icon: sessionHistory.length > 0 ? '🔥' : '💪', color: '#f59e0b', suffix: '' }
            ].map((stat, i) => (
              <div 
                key={i}
                style={{
                  background: 'rgba(17, 17, 17, 0.8)',
                  border: '1px solid rgba(51, 188, 101, 0.15)',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: animated ? 1 : 0,
                  transform: animated ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.4s ease ${i * 0.1}s`,
                  animation: 'border-glow 3s ease-in-out infinite',
                  animationDelay: `${i * 0.5}s`
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = `${stat.color}40`
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = `0 10px 40px rgba(0, 0, 0, 0.3), 0 0 30px ${stat.color}20`
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(51, 188, 101, 0.15)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: `linear-gradient(90deg, ${stat.color}00, ${stat.color}, ${stat.color}00)`,
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s linear infinite'
                }} />
                <div style={{ 
                  fontSize: '2rem', 
                  marginBottom: '0.75rem',
                  filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.2))'
                }}>
                  {stat.icon}
                </div>
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 800, 
                  color: '#ffffff', 
                  marginBottom: '0.25rem',
                  textShadow: `0 0 20px ${stat.color}40`
                }}>
                  {stat.value}{stat.suffix}
                </div>
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: '#525252', 
                  letterSpacing: '0.5px', 
                  textTransform: 'uppercase',
                  fontWeight: 600
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Main Features Grid */}
          <h2 style={{ 
            fontSize: '0.85rem', 
            fontWeight: 600, 
            marginBottom: '1.25rem',
            color: '#525252',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            opacity: animated ? 1 : 0,
            transition: 'opacity 0.4s ease 0.4s'
          }}>
            Features
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '1.25rem', 
            marginBottom: '2.5rem'
          }}>
            {features.map((feature, i) => (
              <Link
                key={i}
                to={feature.to}
                style={{
                  background: feature.gradient,
                  border: '1px solid rgba(51, 188, 101, 0.1)',
                  borderRadius: '20px',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '1rem',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: animated ? 1 : 0,
                  transform: animated ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.08}s`
                }}
                onMouseOver={(e) => {
                  const card = e.currentTarget
                  card.style.borderColor = `${feature.color}40`
                  card.style.transform = 'translateY(-6px) scale(1.02)'
                  card.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 40px ${feature.color}15`
                  
                  const iconDiv = card.querySelector('.feature-icon') as HTMLElement
                  if (iconDiv) {
                    iconDiv.style.transform = 'scale(1.1) rotate(5deg)'
                    iconDiv.style.boxShadow = `0 0 25px ${feature.color}50`
                  }
                }}
                onMouseOut={(e) => {
                  const card = e.currentTarget
                  card.style.borderColor = 'rgba(51, 188, 101, 0.1)'
                  card.style.transform = 'translateY(0) scale(1)'
                  card.style.boxShadow = 'none'
                  
                  const iconDiv = card.querySelector('.feature-icon') as HTMLElement
                  if (iconDiv) {
                    iconDiv.style.transform = 'scale(1) rotate(0deg)'
                    iconDiv.style.boxShadow = 'none'
                  }
                }}
              >
                {/* Hover glow effect */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `radial-gradient(circle at 50% 0%, ${feature.color}15 0%, transparent 60%)`,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none'
                }} 
                className="feature-glow"
                />
                <div 
                  className="feature-icon"
                  style={{
                    width: '64px',
                    height: '64px',
                    background: 'rgba(7, 7, 7, 0.9)',
                    borderRadius: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.75rem',
                    color: feature.color,
                    border: `1px solid ${feature.color}30`,
                    flexShrink: 0,
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {feature.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#ffffff', marginBottom: '0.4rem' }}>
                    {feature.title}
                  </div>
                  <div style={{ color: '#525252', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    {feature.description}
                  </div>
                </div>
                <div style={{ 
                  color: feature.color, 
                  fontSize: '1.25rem',
                  opacity: 0.7,
                  transition: 'all 0.3s ease'
                }}>
                  →
                </div>
              </Link>
            ))}
          </div>

          {/* Accessibility Status Card */}
          <div style={{
            background: 'rgba(17, 17, 17, 0.8)',
            border: '1px solid rgba(51, 188, 101, 0.15)',
            borderRadius: '24px',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease 0.6s'
          }}>
            {/* Decorative elements */}
            <div style={{
              position: 'absolute',
              top: '-30%',
              right: '-5%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(51, 188, 101, 0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
              animation: 'float 8s ease-in-out infinite'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-20%',
              left: '10%',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(18, 220, 239, 0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
              animation: 'float 6s ease-in-out infinite reverse'
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ 
                fontWeight: 700, 
                marginBottom: '1.5rem',
                color: '#ffffff',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ 
                  color: '#33BC65',
                  animation: 'pulse 2s ease-in-out infinite'
                }}>◈</span>
                Your Accessibility Profile
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
                {[
                  { label: 'Disabilities', value: profile.disabilities?.length > 0 ? profile.disabilities.map((d: string) => d.charAt(0).toUpperCase() + d.slice(1)).join(', ') : 'Not set', icon: '♿' },
                  { label: 'Preferred Method', value: profile.method ? profile.method.charAt(0).toUpperCase() + profile.method.slice(1) : 'Not set', icon: '💬' },
                  { label: 'Target Role', value: profile.role || 'Not set', icon: '🎯' },
                  { label: 'Experience Level', value: profile.experience || 'Not set', icon: '📊' }
                ].map((item, i) => (
                  <div 
                    key={i}
                    style={{
                      padding: '1.25rem',
                      background: 'rgba(7, 7, 7, 0.6)',
                      borderRadius: '16px',
                      border: '1px solid rgba(51, 188, 101, 0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(51, 188, 101, 0.3)'
                      e.currentTarget.style.background = 'rgba(51, 188, 101, 0.05)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(51, 188, 101, 0.1)'
                      e.currentTarget.style.background = 'rgba(7, 7, 7, 0.6)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                      <div style={{ fontSize: '0.7rem', color: '#525252', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                        {item.label}
                      </div>
                    </div>
                    <div style={{ fontWeight: 600, color: '#e5e5e5', fontSize: '0.95rem' }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ 
                marginTop: '1.5rem', 
                display: 'flex', 
                gap: '1rem',
                justifyContent: 'flex-end'
              }}>
                <Link 
                  to="/profile"
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '12px',
                    background: 'rgba(51, 188, 101, 0.15)',
                    border: '1px solid rgba(51, 188, 101, 0.3)',
                    color: '#33BC65',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(51, 188, 101, 0.25)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(51, 188, 101, 0.15)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  Edit Profile →
                </Link>
              </div>
            </div>
          </div>

          {/* Motivational Section */}
          {sessionHistory.length === 0 && (
            <div style={{
              marginTop: '2rem',
              padding: '2rem',
              background: 'linear-gradient(135deg, rgba(51, 188, 101, 0.1) 0%, rgba(18, 220, 239, 0.05) 100%)',
              borderRadius: '24px',
              border: '1px solid rgba(51, 188, 101, 0.2)',
              textAlign: 'center',
              opacity: animated ? 1 : 0,
              transform: animated ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s ease 0.8s'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'float 3s ease-in-out infinite' }}>🚀</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
                Ready to start your journey?
              </h3>
              <p style={{ color: '#737373', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
                Practice with AI-powered mock interviews designed specifically for your needs and accessibility requirements.
              </p>
              <Link 
                to="/interview"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2.5rem',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #33BC65 0%, #28a653 100%)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 20px rgba(51, 188, 101, 0.4)',
                  transition: 'all 0.3s ease',
                  animation: 'pulse-glow 2s ease-in-out infinite'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(51, 188, 101, 0.5)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(51, 188, 101, 0.4)'
                }}
              >
                Start Your First Interview
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
