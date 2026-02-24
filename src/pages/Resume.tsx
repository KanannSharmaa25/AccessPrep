import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

const jobRoles = [
  'Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer', 'DevOps Engineer',
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Machine Learning Engineer',
  'Cloud Engineer', 'Cybersecurity Analyst', 'QA Engineer', 'Mobile Developer', 'AI Engineer',
  'Data Analyst', 'Business Analyst', 'Project Manager', 'Marketing Manager', 'Sales Representative',
  'HR Manager', 'Financial Analyst', 'Graphic Designer', 'Content Writer', 'Teacher', 'Nurse', 'Lawyer'
]

const strengthPhrases = [
  { original: 'I was responsible for', better: 'I led' },
  { original: 'I helped with', better: 'I contributed to' },
  { original: 'I tried to', better: 'I successfully' },
  { original: 'I worked on', better: 'I delivered' },
  { original: 'I did', better: 'I achieved' },
  { original: 'I was part of', better: 'I drove' },
  { original: 'I learned', better: 'I mastered' },
  { original: 'I managed', better: 'I streamlined' },
]

const inclusivePhrases = [
  { avoid: 'Despite my disability', use: 'With my unique perspective' },
  { avoid: 'Even though I have', use: 'My experience includes' },
  { avoid: 'Disabled person', use: 'Person with a disability' },
  { avoid: ' Suffers from', use: 'Living with' },
  { avoid: 'Wheelchair bound', use: 'Wheelchair user' },
  { avoid: 'Mentally disabled', use: 'Person with a cognitive disability' },
]

const disclosureGuidance = [
  { title: 'You Don\'t Have to Disclose', content: 'It is completely voluntary. Employers cannot ask about disabilities before making a job offer.' },
  { title: 'If You Choose to Disclose', content: 'Focus on your abilities and how you\'ve succeeded. Emphasize adaptations that help you excel.' },
  { title: 'Timing is Your Choice', content: 'You can disclose in your resume, cover letter, or wait until after a job offer.' },
  { title: 'Legal Protections', content: 'Under ADA, employers must provide reasonable accommodations unless it causes undue hardship.' },
]

export default function Resume() {
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (event) => {
        setResumeText(event.target?.result as string || '')
      }
      reader.readAsText(file)
    }
  }

  const analyzeResume = () => {
    if (!resumeText || (!jobDescription && !selectedRole)) return
    
    setAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = {
        atsScore: Math.floor(Math.random() * 30) + 70,
        approvalChance: Math.floor(Math.random() * 40) + 60,
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git'],
        missingSkills: ['AWS', 'Docker', 'Kubernetes', 'REST APIs'],
        strengths: [
          'Strong technical background',
          'Clear communication of achievements',
          'Good use of action verbs'
        ],
        improvements: [
          'Add more quantifiable achievements',
          'Include relevant keywords',
          'Optimize for ATS systems'
        ]
      }
      setResults(mockResults)
      setAnalyzing(false)
    }, 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid var(--border)',
        padding: '1rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
          <Link to="/dashboard" style={{ fontWeight: 600, color: 'var(--dark)' }}>← Back to Dashboard</Link>
        </div>
      </header>

      <main style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            📄 Resume Analyzer
          </h1>
          <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>
            Upload your resume and get AI-powered analysis
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {/* Left Column - Input */}
            <div>
              {/* File Upload */}
              <div className="card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Upload Resume</h3>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt"
                  style={{ display: 'none' }}
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-secondary"
                  style={{ width: '100%', marginBottom: '1rem' }}
                >
                  📁 Upload File
                </button>
                
                {fileName && (
                  <div style={{ 
                    padding: '0.75rem', 
                    background: 'var(--light)', 
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    fontSize: '0.9rem'
                  }}>
                    📄 {fileName}
                  </div>
                )}

                <div style={{ textAlign: 'center', color: 'var(--gray)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  — OR —
                </div>

                <div>
                  <label className="label">Paste Resume</label>
                  <textarea
                    className="input"
                    value={resumeText}
                    onChange={e => setResumeText(e.target.value)}
                    placeholder="Paste your resume content here..."
                    rows={10}
                  />
                </div>
              </div>

              {/* Job Target */}
              <div className="card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>🎯 Target Job</h3>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label className="label">Select Job Role</label>
                  <select
                    className="input"
                    value={selectedRole}
                    onChange={e => setSelectedRole(e.target.value)}
                  >
                    <option value="">Choose a role...</option>
                    {jobRoles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Or Paste Job Description</label>
                  <textarea
                    className="input"
                    value={jobDescription}
                    onChange={e => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here..."
                    rows={6}
                  />
                </div>
              </div>

              <button
                onClick={analyzeResume}
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
                disabled={!resumeText || (!jobDescription && !selectedRole) || analyzing}
              >
                {analyzing ? 'Analyzing... 🔄' : 'Analyze Resume 🤖'}
              </button>
            </div>

            {/* Right Column - Results */}
            <div>
              {results ? (
                <div className="card animate-slide-up">
                  <h3 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>📊 Analysis Results</h3>
                  
                  {/* Score Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{
                      padding: '1.25rem',
                      background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                      borderRadius: '12px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#065f46' }}>{results.atsScore}%</div>
                      <div style={{ fontWeight: 600, color: '#065f46' }}>ATS Score</div>
                    </div>
                    <div style={{
                      padding: '1.25rem',
                      background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                      borderRadius: '12px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1e40af' }}>{results.approvalChance}%</div>
                      <div style={{ fontWeight: 600, color: '#1e40af' }}>Approval Chance</div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>✅ Your Skills</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {results.skills.map((skill: string, i: number) => (
                        <span key={i} style={{
                          padding: '0.375rem 0.75rem',
                          background: '#d1fae5',
                          color: '#065f46',
                          borderRadius: '20px',
                          fontSize: '0.875rem',
                          fontWeight: 500
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>🔍 Skills to Add</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {results.missingSkills.map((skill: string, i: number) => (
                        <span key={i} style={{
                          padding: '0.375rem 0.75rem',
                          background: '#fef3c7',
                          color: '#92400e',
                          borderRadius: '20px',
                          fontSize: '0.875rem',
                          fontWeight: 500
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Strengths */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>💪 Strengths</h4>
                    <ul style={{ paddingLeft: '1.25rem', color: 'var(--gray)' }}>
                      {results.strengths.map((s: string, i: number) => (
                        <li key={i} style={{ marginBottom: '0.25rem' }}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div>
                    <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>📝 Improvements</h4>
                    <ul style={{ paddingLeft: '1.25rem', color: 'var(--gray)' }}>
                      {results.improvements.map((i: string, idx: number) => (
                        <li key={idx} style={{ marginBottom: '0.25rem' }}>{i}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--gray)' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📄</div>
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--dark)' }}>No Analysis Yet</div>
                  <p>Upload your resume and target job to get AI-powered analysis</p>
                </div>
              )}

              {/* Disability-Inclusive Resume Suggestions */}
              <div className="card" style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>✨ Inclusive Language Suggestions</h3>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.75rem', color: 'var(--primary)' }}>💪 Strength-Focused Wording</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray)', marginBottom: '0.75rem' }}>
                    Use action-oriented language that highlights your achievements:
                  </p>
                  {strengthPhrases.map((phrase, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.5rem',
                      background: 'var(--light)',
                      borderRadius: '8px',
                      marginBottom: '0.5rem',
                      fontSize: '0.875rem'
                    }}>
                      <span style={{ color: '#ef4444', textDecoration: 'line-through' }}>{phrase.original}</span>
                      <span style={{ color: '#10b981' }}>→</span>
                      <span style={{ color: '#10b981', fontWeight: 600 }}>{phrase.better}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.75rem', color: 'var(--primary)' }}>🗣️ Inclusive Language</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray)', marginBottom: '0.75rem' }}>
                    Use respectful, person-first language:
                  </p>
                  {inclusivePhrases.map((phrase, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.5rem',
                      background: 'var(--light)',
                      borderRadius: '8px',
                      marginBottom: '0.5rem',
                      fontSize: '0.875rem'
                    }}>
                      <span style={{ color: '#ef4444' }}>✕ {phrase.avoid}</span>
                      <span style={{ color: '#10b981' }}>✓</span>
                      <span style={{ color: '#10b981', fontWeight: 600 }}>{phrase.use}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.75rem', color: 'var(--primary)' }}>🔐 Disability Disclosure Guidance</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray)', marginBottom: '0.75rem' }}>
                    You have full control over what to share. Here are your options:
                  </p>
                  {disclosureGuidance.map((item, i) => (
                    <div key={i} style={{
                      padding: '0.75rem',
                      background: 'var(--light)',
                      borderRadius: '8px',
                      marginBottom: '0.5rem',
                      borderLeft: '3px solid var(--primary)'
                    }}>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>{item.title}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>{item.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
