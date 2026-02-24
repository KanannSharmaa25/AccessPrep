import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTheme } from '../hooks/useTheme'

const features = [
  {
    icon: '♿',
    title: 'Disability-First Design',
    description: 'Platform adapts to your needs - hearing, visual, speech, motor, or cognitive disabilities',
    color: '#33BC65'
  },
  {
    icon: '🤟',
    title: 'Sign Language Support',
    description: 'AI-powered sign language avatar for hearing-impaired users',
    color: '#12DCEF'
  },
  {
    icon: '🎤',
    title: 'Multi-Modal Input',
    description: 'Type, speak, or sign your answers - choose what works for you',
    color: '#5DFFD9'
  },
  {
    icon: '👁️',
    title: 'Voice-First Experience',
    description: 'Full audio navigation for visually impaired users',
    color: '#a78bfa'
  },
  {
    icon: '📄',
    title: 'Smart Resume Analyzer',
    description: 'AI-powered resume analysis with ATS scoring and skill gaps',
    color: '#f472b6'
  },
  {
    icon: '🎯',
    title: 'Personalized Practice',
    description: 'Mock interviews tailored to your target job role',
    color: '#fbbf24'
  }
]

const stats = [
  { value: '50+', label: 'Job Roles', color: '#33BC65' },
  { value: '10K+', label: 'Practices Completed', color: '#12DCEF' },
  { value: '95%', label: 'User Satisfaction', color: '#5DFFD9' },
  { value: '100%', label: 'Accessible', color: '#a78bfa' }
]

const steps = [
  { step: '1', title: 'Create Profile', desc: 'Tell us about your needs', icon: '👤' },
  { step: '2', title: 'Choose Role', desc: 'Select target position', icon: '🎯' },
  { step: '3', title: 'Practice', desc: 'AI adapts to you', icon: '🎤' },
  { step: '4', title: 'Improve', desc: 'Get personalized feedback', icon: '📈' }
]

export default function Landing() {
  const { colors } = useTheme()
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setAnimated(true)
  }, [])

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
          radial-gradient(ellipse at 20% 20%, rgba(51, 188, 101, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(18, 220, 239, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(95, 255, 217, 0.08) 0%, transparent 70%),
          radial-gradient(ellipse at 90% 10%, rgba(167, 139, 250, 0.08) 0%, transparent 40%)
        `,
        pointerEvents: 'none'
      }} />
      
      {/* Grid pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(51, 188, 101, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(51, 188, 101, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none'
      }} />

      {/* Floating orbs */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(51, 188, 101, 0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        animation: 'float 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '5%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(18, 220, 239, 0.12) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        animation: 'float 10s ease-in-out infinite reverse',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '30%',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(95, 255, 217, 0.1) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
        animation: 'float 6s ease-in-out infinite',
      }} />

      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(7, 7, 7, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(51, 188, 101, 0.15)',
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: 'linear-gradient(135deg, #33BC65 0%, #28a653 100%)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              boxShadow: '0 4px 20px rgba(51, 188, 101, 0.4)',
              animation: 'pulse-glow 2s ease-in-out infinite'
            }}>
              ♿
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
              AccessPrep
            </span>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link 
              to="/login" 
              style={{ 
                fontWeight: 500, 
                color: '#737373', 
                textDecoration: 'none', 
                transition: 'color 0.2s',
                padding: '0.5rem 1rem'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
              onMouseOut={(e) => e.currentTarget.style.color = '#737373'}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #33BC65 0%, #28a653 100%)',
                borderRadius: '12px',
                fontWeight: 600,
                color: '#fff',
                textDecoration: 'none',
                fontSize: '0.95rem',
                boxShadow: '0 4px 15px rgba(51, 188, 101, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(51, 188, 101, 0.5)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(51, 188, 101, 0.3)'
              }}
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section style={{
        padding: '10rem 2rem 6rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.25rem',
            background: 'rgba(51, 188, 101, 0.1)',
            borderRadius: '30px',
            fontSize: '0.9rem',
            fontWeight: '500',
            color: '#33BC65',
            marginBottom: '1.5rem',
            border: '1px solid rgba(51, 188, 101, 0.3)',
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease'
          }}>
            <span>♿</span> Built for Every Ability
          </div>
          
          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            marginBottom: '1.5rem',
            color: '#ffffff',
            lineHeight: 1.1,
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.1s'
          }}>
            Interview Ready.<br />
            <span style={{
              background: 'linear-gradient(135deg, #33BC65 0%, #12DCEF 50%, #5DFFD9 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradient-shift 4s ease infinite'
            }}>
              Your Way.
            </span>
          </h1>
          
          {/* Subtitle */}
          <p style={{
            fontSize: '1.25rem',
            color: '#737373',
            maxWidth: '560px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.2s'
          }}>
            Practice, learn, and ace your interviews with confidence. 
            The platform that adapts to your unique needs.
          </p>
          
          {/* CTA Button */}
          <Link 
            to="/login" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1.1rem 2.5rem',
              background: 'linear-gradient(135deg, #33BC65 0%, #28a653 100%)',
              borderRadius: '16px',
              fontWeight: 700,
              color: '#fff',
              textDecoration: 'none',
              fontSize: '1.1rem',
              boxShadow: '0 4px 25px rgba(51, 188, 101, 0.4)',
              opacity: animated ? 1 : 0,
              transform: animated ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.4s ease 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(51, 188, 101, 0.5)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 25px rgba(51, 188, 101, 0.4)'
            }}
          >
            Start My Journey <span style={{ fontSize: '1.3rem' }}>🚀</span>
          </Link>
          
          {/* Trust badges */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2.5rem',
            marginTop: '3.5rem',
            flexWrap: 'wrap',
            opacity: animated ? 1 : 0,
            transition: 'opacity 0.6s ease 0.5s'
          }}>
            {[
              { icon: '🎯', text: 'WCAG 2.1 AA', color: '#33BC65' },
              { icon: '🔒', text: 'Privacy First', color: '#12DCEF' },
              { icon: '⚡', text: 'AI-Powered', color: '#5DFFD9' }
            ].map((item, i) => (
              <div 
                key={i}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  color: '#525252', 
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = item.color}
                onMouseOut={(e) => e.currentTarget.style.color = '#525252'}
              >
                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span> {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        padding: '4rem 2rem',
        position: 'relative',
        zIndex: 1,
        background: 'rgba(17, 17, 17, 0.5)',
        borderTop: '1px solid rgba(51, 188, 101, 0.1)',
        borderBottom: '1px solid rgba(51, 188, 101, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem'
          }}>
            {stats.map((stat, i) => (
              <div 
                key={i} 
                style={{ 
                  textAlign: 'center',
                  opacity: animated ? 1 : 0,
                  transform: animated ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease ${0.3 + i * 0.1}s`
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 800,
                  color: stat.color,
                  textShadow: `0 0 30px ${stat.color}40`
                }}>
                  {stat.value}
                </div>
                <div style={{ color: '#525252', fontSize: '0.95rem', fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ 
        padding: '6rem 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '4rem',
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.5s'
          }}>
            <h2 style={{
              fontSize: '2.75rem',
              fontWeight: 800,
              marginBottom: '1rem',
              color: '#ffffff'
            }}>
              Built for Every Ability
            </h2>
            <p style={{ color: '#737373', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto' }}>
              Our platform adapts to your unique needs. Every feature is designed with accessibility at its core.
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}>
            {features.map((feature, i) => (
              <div 
                key={i}
                style={{
                  background: 'rgba(17, 17, 17, 0.8)',
                  border: '1px solid rgba(51, 188, 101, 0.15)',
                  borderRadius: '20px',
                  padding: '2rem',
                  opacity: animated ? 1 : 0,
                  transform: animated ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.5s ease ${0.6 + i * 0.1}s`,
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = `${feature.color}40`
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3), 0 0 40px ${feature.color}15`
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(51, 188, 101, 0.15)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: `${feature.color}15`,
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  marginBottom: '1.25rem',
                  border: `1px solid ${feature.color}30`
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 700, 
                  marginBottom: '0.5rem', 
                  color: '#ffffff' 
                }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#737373', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section style={{ 
        padding: '6rem 2rem',
        position: 'relative',
        zIndex: 1,
        background: 'rgba(17, 17, 17, 0.5)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '4rem',
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.8s'
          }}>
            <h2 style={{ 
              fontSize: '2.75rem', 
              fontWeight: 800, 
              marginBottom: '1rem',
              color: '#ffffff'
            }}>
              How It Works
            </h2>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem'
          }}>
            {steps.map((item, i) => (
              <div 
                key={i}
                style={{ 
                  textAlign: 'center',
                  opacity: animated ? 1 : 0,
                  transform: animated ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.5s ease ${0.9 + i * 0.1}s`
                }}
              >
                <div style={{
                  width: '72px',
                  height: '72px',
                  background: 'linear-gradient(135deg, #33BC65 0%, #12DCEF 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: '#fff',
                  margin: '0 auto 1.25rem',
                  boxShadow: '0 8px 30px rgba(51, 188, 101, 0.3)',
                  animation: 'pulse-glow 3s ease-in-out infinite',
                  animationDelay: `${i * 0.5}s`
                }}>
                  {item.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 700, 
                  marginBottom: '0.5rem',
                  color: '#ffffff'
                }}>
                  {item.title}
                </h3>
                <p style={{ color: '#737373', fontSize: '0.95rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '6rem 2rem',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center'
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(51, 188, 101, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }} />
        
        <div style={{ 
          position: 'relative', 
          zIndex: 1,
          opacity: animated ? 1 : 0,
          transform: animated ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.6s ease 1.1s'
        }}>
          <h2 style={{ 
            fontSize: '2.75rem', 
            fontWeight: 800, 
            marginBottom: '1rem',
            color: '#ffffff'
          }}>
            Ready to Ace Your Interview?
          </h2>
          <p style={{ 
            fontSize: '1.15rem', 
            color: '#737373', 
            marginBottom: '2rem', 
            maxWidth: '500px', 
            margin: '0 auto 2rem' 
          }}>
            Join thousands of job seekers who have boosted their confidence with AccessPrep
          </p>
          <Link 
            to="/login" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1.1rem 2.5rem',
              background: 'linear-gradient(135deg, #33BC65 0%, #28a653 100%)',
              borderRadius: '16px',
              fontWeight: 700,
              color: '#fff',
              textDecoration: 'none',
              fontSize: '1.1rem',
              boxShadow: '0 4px 25px rgba(51, 188, 101, 0.4)',
              transition: 'all 0.3s ease',
              animation: 'pulse-glow 2s ease-in-out infinite'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(51, 188, 101, 0.5)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 25px rgba(51, 188, 101, 0.4)'
            }}
          >
            Get Started Free 🚀
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '2rem',
        background: 'rgba(5, 5, 5, 0.9)',
        color: 'white',
        textAlign: 'center',
        borderTop: '1px solid rgba(51, 188, 101, 0.15)',
        position: 'relative',
        zIndex: 1
      }}>
        <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>
          © 2024 AccessPrep. Made with <span style={{ color: '#33BC65' }}>♿</span> for everyone.
        </p>
      </footer>
    </div>
  )
}
