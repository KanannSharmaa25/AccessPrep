import { Link } from 'react-router-dom'

const features = [
  {
    icon: '🎯',
    title: 'Practice Interview',
    description: 'AI-powered mock interviews tailored to your needs',
    to: '/interview',
    color: '#7c3aed',
    bg: '#f3e8ff'
  },
  {
    icon: '📄',
    title: 'Resume Analyzer',
    description: 'Upload & analyze your resume with AI',
    to: '/resume',
    color: '#f59e0b',
    bg: '#fef3c7'
  },
  {
    icon: '⚙️',
    title: 'Settings',
    description: 'Customize accessibility preferences',
    to: '/settings',
    color: '#3b82f6',
    bg: '#dbeafe'
  },
  {
    icon: '📊',
    title: 'Progress',
    description: 'Track your improvement over time',
    to: '/dashboard',
    color: '#10b981',
    bg: '#d1fae5'
  }
]

export default function Dashboard() {
  const profile = JSON.parse(localStorage.getItem('userProfile') || '{}')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid var(--border)',
        padding: '1rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
          <Link to="/" style={{ fontWeight: 600, color: 'var(--dark)' }}>Sign Out</Link>
        </div>
      </header>

      <main style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Welcome */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Welcome back! 👋
            </h1>
            <p style={{ color: 'var(--gray)' }}>
              Your profile: {profile.disabilities?.join(', ') || 'No disabilities selected'} • {profile.role || 'No role selected'}
            </p>
          </div>

          {/* Quick Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {[
              { label: 'Interviews', value: '0', icon: '🎯' },
              { label: 'Avg Score', value: '--', icon: '📊' },
              { label: 'Practice Time', value: '0h', icon: '⏱️' },
              { label: 'Streak', value: '0', icon: '🔥' }
            ].map((stat, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>{stat.value}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {features.map((feature, i) => (
              <Link
                key={i}
                to={feature.to}
                className="card animate-slide-up"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  textDecoration: 'none',
                  animationDelay: `${i * 0.1}s`
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: feature.bg,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem'
                }}>
                  {feature.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--dark)', marginBottom: '0.25rem' }}>
                    {feature.title}
                  </div>
                  <div style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>{feature.description}</div>
                </div>
                <div style={{ marginLeft: 'auto', color: feature.color, fontSize: '1.5rem' }}>→</div>
              </Link>
            ))}
          </div>

          {/* Accessibility Status */}
          <div className="card" style={{ marginTop: '2rem', background: 'linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%)' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>♿ Your Accessibility Setup</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>Disabilities</div>
                <div style={{ fontWeight: 600 }}>{profile.disabilities?.join(', ') || 'Not set'}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>Preferred Method</div>
                <div style={{ fontWeight: 600 }}>{profile.method || 'Not set'}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>Target Role</div>
                <div style={{ fontWeight: 600 }}>{profile.role || 'Not set'}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
