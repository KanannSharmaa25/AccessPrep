import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

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

export default function Resume() {
  const { colors } = useTheme()
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
    
    setTimeout(() => {
      const mockResults = {
        atsScore: Math.floor(Math.random() * 30) + 70,
        approvalChance: Math.floor(Math.random() * 40) + 60,
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git'],
        missingSkills: ['AWS', 'Docker', 'Kubernetes', 'REST APIs'],
        strengths: ['Strong technical background', 'Clear communication of achievements', 'Good use of action verbs'],
        improvements: ['Add more quantifiable achievements', 'Include relevant keywords', 'Optimize for ATS systems']
      }
      setResults(mockResults)
      setAnalyzing(false)
    }, 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: colors.bg, position: 'relative', overflow: 'hidden', color: colors.text, transition: 'background 0.3s ease, color 0.3s ease' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 20%, rgba(51, 188, 101, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(18, 220, 239, 0.06) 0%, transparent 50%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(51, 188, 101, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(51, 188, 101, 0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      <header style={{ background: 'rgba(11, 11, 11, 0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(51, 188, 101, 0.1)', padding: '1.25rem 2.5rem', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #33BC65 0%, #28a653 100%)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.35rem', boxShadow: '0 4px 20px rgba(51, 188, 101, 0.3)' }}>
              ◈
            </div>
            <span style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.5px' }}>AccessPrep</span>
          </Link>
          <Link to="/dashboard" style={{ fontWeight: 500, color: '#737373', textDecoration: 'none' }}>← Back</Link>
        </div>
      </header>

      <main style={{ padding: '2.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', background: 'linear-gradient(135deg, #ffffff 0%, #a3a3a3 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Resume Analyzer
          </h1>
          <p style={{ color: '#737373', marginBottom: '2rem' }}>Upload your resume and get AI-powered analysis</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <div style={{ background: 'rgba(17, 17, 17, 0.8)', border: '1px solid rgba(51, 188, 101, 0.15)', borderRadius: '20px', padding: '1.75rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>Upload Resume</h3>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf,.doc,.docx,.txt" style={{ display: 'none' }} />
                <button onClick={() => fileInputRef.current?.click()} style={{ width: '100%', marginBottom: '1rem', padding: '1rem', background: 'transparent', border: '1px solid rgba(51, 188, 101, 0.3)', borderRadius: '12px', color: '#33BC65', fontWeight: 500, cursor: 'pointer', transition: 'all 0.3s ease' }}>
                  📁 Upload File
                </button>
                {fileName && <div style={{ padding: '0.75rem', background: 'rgba(51, 188, 101, 0.1)', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem', color: '#33BC65' }}>📄 {fileName}</div>}
                <div style={{ textAlign: 'center', color: '#525252', fontSize: '0.875rem', marginBottom: '1rem' }}>— OR —</div>
                <div>
                  <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: '#e5e5e5', fontSize: '0.9rem' }}>Paste Resume</label>
                  <textarea value={resumeText} onChange={e => setResumeText(e.target.value)} placeholder="Paste your resume content here..." rows={10} style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid rgba(51, 188, 101, 0.2)', borderRadius: '12px', background: 'rgba(7, 7, 7, 0.6)', color: '#fff', fontSize: '1rem', outline: 'none', resize: 'vertical' }} />
                </div>
              </div>

              <div style={{ background: 'rgba(17, 17, 17, 0.8)', border: '1px solid rgba(51, 188, 101, 0.15)', borderRadius: '20px', padding: '1.75rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>🎯 Target Job</h3>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: '#e5e5e5', fontSize: '0.9rem' }}>Select Job Role</label>
                  <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)} style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid rgba(51, 188, 101, 0.2)', borderRadius: '12px', background: 'rgba(7, 7, 7, 0.6)', color: '#fff', fontSize: '1rem', outline: 'none' }}>
                    <option value="">Choose a role...</option>
                    {jobRoles.map(role => <option key={role} value={role}>{role}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: '#e5e5e5', fontSize: '0.9rem' }}>Or Paste Job Description</label>
                  <textarea value={jobDescription} onChange={e => setJobDescription(e.target.value)} placeholder="Paste the job description here..." rows={6} style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid rgba(51, 188, 101, 0.2)', borderRadius: '12px', background: 'rgba(7, 7, 7, 0.6)', color: '#fff', fontSize: '1rem', outline: 'none', resize: 'vertical' }} />
                </div>
              </div>

              <button onClick={analyzeResume} disabled={!resumeText || (!jobDescription && !selectedRole) || analyzing} style={{ width: '100%', padding: '1rem 2rem', background: (!resumeText || (!jobDescription && !selectedRole) || analyzing) ? 'rgba(51, 188, 101, 0.3)' : 'linear-gradient(135deg, #33BC65 0%, #28a653 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '1.05rem', fontWeight: 600, cursor: (!resumeText || (!jobDescription && !selectedRole) || analyzing) ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease' }}>
                {analyzing ? 'Analyzing... 🔄' : 'Analyze Resume 🤖'}
              </button>
            </div>

            <div>
              {results ? (
                <div style={{ background: 'rgba(17, 17, 17, 0.8)', border: '1px solid rgba(51, 188, 101, 0.15)', borderRadius: '20px', padding: '1.75rem', animation: 'slideUp 0.5s ease' }}>
                  <h3 style={{ fontWeight: 700, marginBottom: '1.5rem', color: '#fff' }}>📊 Analysis Results</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ padding: '1.25rem', background: 'rgba(51, 188, 101, 0.15)', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(51, 188, 101, 0.3)' }}>
                      <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#33BC65' }}>{results.atsScore}%</div>
                      <div style={{ fontWeight: 600, color: '#33BC65' }}>ATS Score</div>
                    </div>
                    <div style={{ padding: '1.25rem', background: 'rgba(18, 220, 239, 0.15)', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(18, 220, 239, 0.3)' }}>
                      <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#12DCEF' }}>{results.approvalChance}%</div>
                      <div style={{ fontWeight: 600, color: '#12DCEF' }}>Approval Chance</div>
                    </div>
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#fff' }}>✅ Your Skills</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {results.skills.map((skill: string, i: number) => <span key={i} style={{ padding: '0.375rem 0.75rem', background: 'rgba(51, 188, 101, 0.2)', color: '#33BC65', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 500 }}>{skill}</span>)}
                    </div>
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#fff' }}>🔍 Skills to Add</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {results.missingSkills.map((skill: string, i: number) => <span key={i} style={{ padding: '0.375rem 0.75rem', background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 500 }}>{skill}</span>)}
                    </div>
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>💪 Strengths</h4>
                    <ul style={{ paddingLeft: '1.25rem', color: '#a3a3a3' }}>{results.strengths.map((s: string, i: number) => <li key={i} style={{ marginBottom: '0.25rem' }}>{s}</li>)}</ul>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>📝 Improvements</h4>
                    <ul style={{ paddingLeft: '1.25rem', color: '#a3a3a3' }}>{results.improvements.map((i: string, idx: number) => <li key={idx} style={{ marginBottom: '0.25rem' }}>{i}</li>)}</ul>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'rgba(17, 17, 17, 0.8)', border: '1px solid rgba(51, 188, 101, 0.15)', borderRadius: '20px', padding: '4rem 2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📄</div>
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#fff' }}>No Analysis Yet</div>
                  <p style={{ color: '#737373' }}>Upload your resume and target job to get AI-powered analysis</p>
                </div>
              )}

              <div style={{ background: 'rgba(17, 17, 17, 0.8)', border: '1px solid rgba(51, 188, 101, 0.15)', borderRadius: '20px', padding: '1.75rem', marginTop: '1.5rem' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>✨ Inclusive Language</h3>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.75rem', color: '#33BC65' }}>💪 Strength-Focused Wording</h4>
                  {strengthPhrases.map((phrase, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', background: 'rgba(7, 7, 7, 0.6)', borderRadius: '8px', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      <span style={{ color: '#ef4444', textDecoration: 'line-through' }}>{phrase.original}</span>
                      <span style={{ color: '#33BC65' }}>→</span>
                      <span style={{ color: '#33BC65', fontWeight: 600 }}>{phrase.better}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.75rem', color: '#33BC65' }}>🗣️ Inclusive Language</h4>
                  {inclusivePhrases.map((phrase, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', background: 'rgba(7, 7, 7, 0.6)', borderRadius: '8px', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      <span style={{ color: '#ef4444' }}>✕ {phrase.avoid}</span>
                      <span style={{ color: '#33BC65' }}>✓</span>
                      <span style={{ color: '#33BC65', fontWeight: 600 }}>{phrase.use}</span>
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
