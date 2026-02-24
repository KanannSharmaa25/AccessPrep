import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

const disabilityTypes = [
  { id: 'hearing', label: 'Hearing Impairment', icon: '👂', description: 'Deaf or hard of hearing' },
  { id: 'visual', label: 'Visual Impairment', icon: '👁️', description: 'Blind or low vision' },
  { id: 'speech', label: 'Speech Impairment', icon: '🗣️', description: 'Difficulty speaking clearly' },
  { id: 'verbal', label: 'Verbal Impairment', icon: '🤟', description: 'Use sign language to communicate' },
  { id: 'motor', label: 'Motor Impairment', icon: '✋', description: 'Limited motor control' },
  { id: 'adhd', label: 'ADHD', icon: '⚡', description: 'Attention deficit hyperactivity disorder' },
  { id: 'autism', label: 'Autism Spectrum', icon: '🔷', description: 'Autism spectrum condition' },
  { id: 'dyslexia', label: 'Dyslexia', icon: '📖', description: 'Reading and processing differences' },
  { id: 'anxiety', label: 'Interview Anxiety', icon: '💚', description: 'Interview anxiety or PTSD' },
  { id: 'cognitive', label: 'Cognitive/Learning', icon: '📚', description: 'Learning or processing differences' }
]

const interactionMethods = [
  { id: 'text', label: 'Text-Based', icon: '⌨️', description: 'Type your answers' },
  { id: 'voice', label: 'Voice-Based', icon: '🎤', description: 'Speak your answers' },
  { id: 'video', label: 'Video with Captions', icon: '📹', description: 'Video + captions' },
  { id: 'hybrid', label: 'Hybrid', icon: '🔄', description: 'Mix of methods' }
]

const jobRoles = [
  'Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer', 'DevOps Engineer',
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Machine Learning Engineer',
  'Cloud Engineer', 'Cybersecurity Analyst', 'QA Engineer', 'Mobile Developer', 'AI Engineer',
  'Data Analyst', 'Business Analyst', 'Project Manager', 'Scrum Master', 'Technical Writer',
  'IT Support', 'Network Administrator', 'Database Administrator', 'Solutions Architect',
  'Marketing Manager', 'Sales Representative', 'HR Manager', 'Financial Analyst', 'Accountant',
  'Graphic Designer', 'Content Writer', 'Video Editor', 'Social Media Manager', 'SEO Specialist',
  'Customer Success Manager', 'Operations Manager', 'Supply Chain Manager', 'Healthcare Administrator',
  'Teacher', 'Professor', 'Research Scientist', 'Lab Technician', 'Civil Engineer', 'Mechanical Engineer',
  'Electrical Engineer', 'Chemical Engineer', 'Biomedical Engineer', 'Pharmacist', 'Nurse', 'Physician',
  'Physical Therapist', 'Occupational Therapist', 'Speech Therapist', 'Psychologist', 'Counselor',
  'Lawyer', 'Paralegal', 'Consultant', 'Entrepreneur', 'Startup Founder'
]

export default function Profile() {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const [selectedDisabilities, setSelectedDisabilities] = useState<string[]>([])
  const [selectedMethod, setSelectedMethod] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [step, setStep] = useState(1)

  const toggleDisability = (id: string) => {
    setSelectedDisabilities(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    )
  }

  const handleSubmit = () => {
    localStorage.setItem('userProfile', JSON.stringify({
      disabilities: selectedDisabilities,
      method: selectedMethod,
      role: selectedRole
    }))
    navigate('/dashboard')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.bg,
      position: 'relative',
      overflow: 'hidden',
      padding: '3rem 2rem',
      color: colors.text,
      transition: 'background 0.3s ease, color 0.3s ease'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(51, 188, 101, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(18, 220, 239, 0.06) 0%, transparent 50%)
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

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem', animation: 'fadeIn 0.5s ease' }}>
          <div style={{
            width: '72px',
            height: '72px',
            background: 'linear-gradient(135deg, #33BC65 0%, #28a653 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            margin: '0 auto 1.5rem',
            boxShadow: '0 8px 32px rgba(51, 188, 101, 0.3)'
          }}>
            ◈
          </div>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 800, 
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #a3a3a3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Set Up Your Profile</h1>
          <p style={{ color: '#737373' }}>Help us customize your interview experience</p>
        </div>

        <div style={{ marginBottom: '2rem', animation: 'fadeIn 0.5s ease 0.2s both' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 600, color: '#e5e5e5' }}>Step {step} of 3</span>
            <span style={{ color: '#525252' }}>{Math.round((step / 3) * 100)}% complete</span>
          </div>
          <div style={{ height: '6px', background: 'rgba(51, 188, 101, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${(step / 3) * 100}%`,
              background: 'linear-gradient(90deg, #33BC65, #12DCEF)',
              borderRadius: '3px',
              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }} />
          </div>
        </div>

        {step === 1 && (
          <div style={{ 
            background: 'rgba(17, 17, 17, 0.8)',
            border: '1px solid rgba(51, 188, 101, 0.15)',
            borderRadius: '24px',
            padding: '2rem',
            animation: 'slideUp 0.5s ease 0.3s both'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>
              What type of disability do you have?
            </h2>
            <p style={{ color: '#737373', marginBottom: '1.75rem' }}>
              Select all that apply. This helps us customize your experience.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {disabilityTypes.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleDisability(item.id)}
                  style={{
                    padding: '1.25rem',
                    background: selectedDisabilities.includes(item.id) ? 'rgba(51, 188, 101, 0.15)' : 'rgba(7, 7, 7, 0.6)',
                    border: `2px solid ${selectedDisabilities.includes(item.id) ? '#33BC65' : 'rgba(51, 188, 101, 0.15)'}`,
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: selectedDisabilities.includes(item.id) ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: selectedDisabilities.includes(item.id) ? 'rgba(51, 188, 101, 0.3)' : 'rgba(51, 188, 101, 0.1)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#fff' }}>{item.label}</div>
                      <div style={{ fontSize: '0.8rem', color: '#737373' }}>{item.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setStep(2)}
              style={{ 
                width: '100%', 
                marginTop: '1.75rem',
                padding: '1rem 2rem',
                background: selectedDisabilities.length > 0 ? 'linear-gradient(135deg, #33BC65 0%, #28a653 100%)' : 'rgba(51, 188, 101, 0.3)',
                border: 'none',
                borderRadius: '12px',
                color: selectedDisabilities.length > 0 ? '#fff' : 'rgba(255,255,255,0.5)',
                fontSize: '1.05rem',
                fontWeight: 600,
                cursor: selectedDisabilities.length > 0 ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease'
              }}
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{ 
            background: 'rgba(17, 17, 17, 0.8)',
            border: '1px solid rgba(51, 188, 101, 0.15)',
            borderRadius: '24px',
            padding: '2rem',
            animation: 'slideUp 0.5s ease 0.3s both'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>
              How would you prefer to answer?
            </h2>
            <p style={{ color: '#737373', marginBottom: '1.75rem' }}>
              Choose your preferred way to respond during interviews
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {interactionMethods.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedMethod(item.id)}
                  style={{
                    padding: '1.25rem',
                    background: selectedMethod === item.id ? 'rgba(51, 188, 101, 0.15)' : 'rgba(7, 7, 7, 0.6)',
                    border: `2px solid ${selectedMethod === item.id ? '#33BC65' : 'rgba(51, 188, 101, 0.15)'}`,
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: selectedMethod === item.id ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: selectedMethod === item.id ? 'rgba(51, 188, 101, 0.3)' : 'rgba(51, 188, 101, 0.1)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#fff' }}>{item.label}</div>
                      <div style={{ fontSize: '0.8rem', color: '#737373' }}>{item.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.75rem' }}>
              <button 
                onClick={() => setStep(1)} 
                style={{ 
                  flex: 1,
                  padding: '1rem',
                  background: 'transparent',
                  border: '1px solid rgba(51, 188, 101, 0.3)',
                  borderRadius: '12px',
                  color: '#a3a3a3',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Back
              </button>
              <button 
                onClick={() => setStep(3)}
                style={{ 
                  flex: 1,
                  padding: '1rem',
                  background: selectedMethod ? 'linear-gradient(135deg, #33BC65 0%, #28a653 100%)' : 'rgba(51, 188, 101, 0.3)',
                  border: 'none',
                  borderRadius: '12px',
                  color: selectedMethod ? '#fff' : 'rgba(255,255,255,0.5)',
                  fontWeight: 600,
                  cursor: selectedMethod ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease'
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ 
            background: 'rgba(17, 17, 17, 0.8)',
            border: '1px solid rgba(51, 188, 101, 0.15)',
            borderRadius: '24px',
            padding: '2rem',
            animation: 'slideUp 0.5s ease 0.3s both'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>
              What role are you preparing for?
            </h2>
            <p style={{ color: '#737373', marginBottom: '1.75rem' }}>
              Select your target job to get personalized practice questions
            </p>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: '#e5e5e5', fontSize: '0.9rem' }}>Search or select a role</label>
              <select
                value={selectedRole}
                onChange={e => setSelectedRole(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '1px solid rgba(51, 188, 101, 0.2)',
                  borderRadius: '12px',
                  background: 'rgba(7, 7, 7, 0.6)',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="" style={{ color: '#737373' }}>Choose a role...</option>
                {jobRoles.map(role => (
                  <option key={role} value={role} style={{ background: '#111' }}>{role}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => setStep(2)} 
                style={{ 
                  flex: 1,
                  padding: '1rem',
                  background: 'transparent',
                  border: '1px solid rgba(51, 188, 101, 0.3)',
                  borderRadius: '12px',
                  color: '#a3a3a3',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Back
              </button>
              <button 
                onClick={handleSubmit}
                style={{ 
                  flex: 1,
                  padding: '1rem',
                  background: selectedRole ? 'linear-gradient(135deg, #33BC65 0%, #28a653 100%)' : 'rgba(51, 188, 101, 0.3)',
                  border: 'none',
                  borderRadius: '12px',
                  color: selectedRole ? '#fff' : 'rgba(255,255,255,0.5)',
                  fontWeight: 600,
                  cursor: selectedRole ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease'
                }}
              >
                Complete Setup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
