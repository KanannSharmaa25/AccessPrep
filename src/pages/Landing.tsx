import { Link } from 'react-router-dom'

const features = [
  {
    icon: '♿',
    title: 'Disability-First Design',
    description: 'Platform adapts to your needs - hearing, visual, speech, motor, or cognitive disabilities'
  },
  {
    icon: '🤟',
    title: 'Sign Language Support',
    description: 'AI-powered sign language avatar for hearing-impaired users'
  },
  {
    icon: '🎤',
    title: 'Multi-Modal Input',
    description: 'Type, speak, or sign your answers - choose what works for you'
  },
  {
    icon: '👁️',
    title: 'Voice-First Experience',
    description: 'Full audio navigation for visually impaired users'
  },
  {
    icon: '📄',
    title: 'Smart Resume Analyzer',
    description: 'AI-powered resume analysis with ATS scoring and skill gaps'
  },
  {
    icon: '🎯',
    title: 'Personalized Practice',
    description: 'Mock interviews tailored to your target job role'
  }
]

const stats = [
  { value: '50+', label: 'Job Roles' },
  { value: '10K+', label: 'Practices Completed' },
  { value: '95%', label: 'User Satisfaction' },
  { value: '100%', label: 'Accessible' }
]

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
        zIndex: 100
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              ♿
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
              AccessPrep
            </span>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link to="/login" style={{ fontWeight: 600, color: 'var(--dark)' }}>Login</Link>
            <Link to="/register" className="btn btn-primary">Get Started</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section style={{
        padding: '8rem 2rem 6rem',
        background: 'linear-gradient(135deg, #f8fafc 0%, #ede9fe 50%, #f8fafc 100%)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'white',
            borderRadius: '30px',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: 'var(--primary)',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 14px rgba(0,0,0,0.05)'
          }}>
            <span>✨</span> AI-Powered Interview Coaching for Everyone
          </div>
          
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, var(--dark) 0%, var(--primary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2
          }}>
            Interview Ready.<br />Your Way.
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--gray)',
            maxWidth: '600px',
            margin: '0 auto 2.5rem'
          }}>
            The first AI-powered interview platform designed specifically for people with disabilities. Practice, learn, and ace your interviews with confidence.
          </p>
          
          <Link to="/login" className="btn btn-primary btn-lg">
            Start My Journey <span>🚀</span>
          </Link>
          
          {/* Trust */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            marginTop: '3rem',
            flexWrap: 'wrap',
            opacity: 0.8
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray)', fontSize: '0.875rem' }}>
              <span>🎯</span> WCAG 2.1 AA Compliant
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray)', fontSize: '0.875rem' }}>
              <span>🔒</span> Privacy First
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray)', fontSize: '0.875rem' }}>
              <span>⚡</span> AI-Powered
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, var(--dark) 0%, #2d2d4a 100%)',
        color: 'white'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem'
          }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #a78bfa 0%, #c4b5fd 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {stat.value}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '6rem 2rem', background: 'var(--light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              marginBottom: '1rem'
            }}>
              Built for Every Ability
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Our platform adapts to your unique needs. Every feature is designed with accessibility at its core.
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}>
            {features.map((feature, i) => (
              <div key={i} className="card animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%)',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  marginBottom: '1rem'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--gray)', fontSize: '0.95rem' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section style={{ padding: '6rem 2rem', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
              How It Works
            </h2>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem'
          }}>
            {[
              { step: '1', title: 'Create Profile', desc: 'Tell us about your needs and preferences' },
              { step: '2', title: 'Choose Role', desc: 'Select your target job position' },
              { step: '3', title: 'Practice', desc: 'AI adapts to your accessibility needs' },
              { step: '4', title: 'Improve', desc: 'Get personalized feedback and tips' }
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'white',
                  margin: '0 auto 1rem'
                }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--gray)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
            Ready to Ace Your Interview?
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            Join thousands of job seekers who have boosted their confidence with AccessPrep
          </p>
          <Link to="/login" className="btn" style={{
            background: 'white',
            color: 'var(--primary)',
            padding: '1rem 2.5rem',
            fontSize: '1.125rem'
          }}>
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '2rem',
        background: 'var(--dark)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <p style={{ opacity: 0.7 }}>© 2024 AccessPrep. Made with ♿ for everyone.</p>
        </div>
      </footer>
    </div>
  )
}
