import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const disabilityTypes = [
  { id: 'hearing', label: 'Hearing Impairment', icon: '👂', description: 'Deaf or hard of hearing' },
  { id: 'visual', label: 'Visual Impairment', icon: '👁️', description: 'Blind or low vision' },
  { id: 'speech', label: 'Speech Impairment', icon: '🗣️', description: 'Difficulty speaking clearly' },
  { id: 'verbal', label: 'Verbal Impairment', icon: '👄', description: 'Use sign language to communicate' },
  { id: 'motor', label: 'Motor Impairment', icon: '✋', description: 'Limited motor control' },
  { id: 'cognitive', label: 'Cognitive/Learning', icon: '🧠', description: 'Learning or processing differences' },
  { id: 'anxiety', label: 'Anxiety-Related', icon: '💚', description: 'Interview anxiety or PTSD' }
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
    // Save to localStorage for now
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
      background: 'linear-gradient(135deg, #f8fafc 0%, #ede9fe 100%)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Progress */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--dark)' }}>Step {step} of 3</span>
            <span style={{ color: 'var(--gray)' }}>{Math.round((step / 3) * 100)}% complete</span>
          </div>
          <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${(step / 3) * 100}%`,
              background: 'linear-gradient(90deg, var(--primary), var(--primary-light))',
              borderRadius: '4px',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Step 1: Disability Types */}
        {step === 1 && (
          <div className="card animate-slide-up">
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              What type of disability do you have?
            </h2>
            <p style={{ color: 'var(--gray)', marginBottom: '1.5rem' }}>
              Select all that apply. This helps us customize your experience.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {disabilityTypes.map(item => (
                <div
                  key={item.id}
                  onClick={() => toggleDisability(item.id)}
                  style={{
                    padding: '1.25rem',
                    background: selectedDisabilities.includes(item.id) ? 'linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%)' : 'var(--light)',
                    border: `2px solid ${selectedDisabilities.includes(item.id) ? 'var(--primary)' : 'var(--border)'}`,
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: selectedDisabilities.includes(item.id) ? 'var(--primary)' : 'white',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--dark)' }}>{item.label}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>{item.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setStep(2)}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '1.5rem' }}
              disabled={selectedDisabilities.length === 0}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Interaction Method */}
        {step === 2 && (
          <div className="card animate-slide-up">
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              How would you prefer to answer?
            </h2>
            <p style={{ color: 'var(--gray)', marginBottom: '1.5rem' }}>
              Choose your preferred way to respond during interviews
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {interactionMethods.map(item => (
                <div
                  key={item.id}
                  onClick={() => setSelectedMethod(item.id)}
                  style={{
                    padding: '1.25rem',
                    background: selectedMethod === item.id ? 'linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%)' : 'var(--light)',
                    border: `2px solid ${selectedMethod === item.id ? 'var(--primary)' : 'var(--border)'}`,
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: selectedMethod === item.id ? 'var(--primary)' : 'white',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--dark)' }}>{item.label}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>{item.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button onClick={() => setStep(1)} className="btn btn-secondary" style={{ flex: 1 }}>
                Back
              </button>
              <button 
                onClick={() => setStep(3)}
                className="btn btn-primary"
                style={{ flex: 1 }}
                disabled={!selectedMethod}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Target Job Role */}
        {step === 3 && (
          <div className="card animate-slide-up">
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              What role are you preparing for?
            </h2>
            <p style={{ color: 'var(--gray)', marginBottom: '1.5rem' }}>
              Select your target job to get personalized practice questions
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <label className="label">Search or select a role</label>
              <select
                className="input"
                value={selectedRole}
                onChange={e => setSelectedRole(e.target.value)}
                style={{ cursor: 'pointer' }}
              >
                <option value="">Choose a role...</option>
                {jobRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setStep(2)} className="btn btn-secondary" style={{ flex: 1 }}>
                Back
              </button>
              <button 
                onClick={handleSubmit}
                className="btn btn-primary"
                style={{ flex: 1 }}
                disabled={!selectedRole}
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
