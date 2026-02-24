import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface StrategySection {
  title: string
  icon: string
  tips: string[]
}

const disabilityStrategies: Record<string, {
  pacing: StrategySection
  accommodations: StrategySection
  communication: StrategySection
  redirection: StrategySection
}> = {
  hearing: {
    pacing: {
      title: 'Answer Pacing',
      icon: '⏱️',
      tips: [
        'Take your time - there\'s no rush to respond immediately',
        'Use the pause button if you need extra time to formulate your answer',
        'Request written questions in advance when possible',
        'It\'s okay to ask for questions to be repeated or shown on screen',
        'Practice with the sign language avatar to see questions in ASL'
      ]
    },
    accommodations: {
      title: 'Requesting Accommodations',
      icon: '🙋',
      tips: [
        'Request real-time captions or CART services in advance',
        'Ask for written copies of questions when possible',
        'Request a sign language interpreter for the interview',
        'Inquire about video conferencing with captioning enabled',
        'Don\'t hesitate to ask clarifying questions about what was said'
      ]
    },
    communication: {
      title: 'Handling Communication Gaps',
      icon: '💬',
      tips: [
        'Use the chat feature in video interviews to confirm understanding',
        'Practice key phrases like "Could you please repeat that?"',
        'Consider using a speech-to-text app as backup',
        'Maintain eye contact with the camera, not the interpreter',
        'Nod and use visual cues to show you\'re following along'
      ]
    },
    redirection: {
      title: 'Redirecting Questions',
      icon: '🔀',
      tips: [
        'It\'s acceptable to say "Let me address that differently"',
        'If you miss part of a question, ask for clarification immediately',
        'You can say "I\'d like to add more context to my answer"',
        'Practice saying "Let me rephrase that for clarity"',
        'Use written notes to help you stay on track with your points'
      ]
    }
  },
  visual: {
    pacing: {
      title: 'Answer Pacing',
      icon: '⏱️',
      tips: [
        'Take your time - the audio mode gives you space to think',
        'Use voice commands to pause and resume as needed',
        'Request questions to be read aloud at a comfortable pace',
        'Practice with the audio-only mode to build confidence',
        'It\'s okay to say "Let me think about that for a moment"'
      ]
    },
    accommodations: {
      title: 'Requesting Accommodations',
      icon: '🙋',
      tips: [
        'Request all materials in accessible formats (Word, PDF with tags)',
        'Ask for questions to be read aloud before answering',
        'Request a phone interview instead of video if preferred',
        'Inquire about screen reader compatibility for any online assessments',
        'Ask about extended time for any written components'
      ]
    },
    communication: {
      title: 'Handling Communication Gaps',
      icon: '💬',
      tips: [
        'Don\'t assume - ask for clarification when needed',
        'Use verbal confirmations like "Got it" or "I understand"',
        'If something isn\'t clear, say "Could you explain that differently?"',
        'Take notes mentally to help you remember key points',
        'Use the repeat voice command if you missed anything'
      ]
    },
    redirection: {
      title: 'Redirecting Questions',
      icon: '🔀',
      tips: [
        'It\'s perfectly fine to say "I\'d like to address a different aspect"',
        'If you didn\'t hear clearly, ask "Could you please repeat the question?"',
        'Practice phrases like "What I really want to emphasize is..."',
        'You can say "Let me take this in a direction that showcases..."',
        'Use transitions like "Building on that idea..."'
      ]
    }
  },
  speech: {
    pacing: {
      title: 'Answer Pacing',
      icon: '⏱️',
      tips: [
        'Take breaks between sentences - quality over speed',
        'Use the retry button to refine your answers',
        'Practice the "pause and breathe" technique',
        'The text-based option gives you time to type thoughtful responses',
        'It\'s okay to say "Let me start again" if needed'
      ]
    },
    accommodations: {
      title: 'Requesting Accommodations',
      icon: '🙋',
      tips: [
        'Request written questions or a written interview option',
        'Ask about using assistive technology during the interview',
        'Inquire about extra time to account for typing responses',
        'Consider requesting a phone or video interview with chat',
        'Don\'t hesitate to explain your communication needs upfront'
      ]
    },
    communication: {
      title: 'Handling Communication Gaps',
      icon: '💬',
      tips: [
        'Use the text input option to communicate clearly',
        'If speaking, focus on content rather than delivery',
        'It\'s okay to pause and gather your thoughts',
        'Practice key phrases ahead of time',
        'Use written responses for complex answers'
      ]
    },
    redirection: {
      title: 'Redirecting Questions',
      icon: '🔀',
      tips: [
        'In text mode, you can easily edit and reframe your answer',
        'Use the rephrase feature to improve clarity',
        'It\'s acceptable to say "I\'d like to approach this differently"',
        'Take time to think before responding - it\'s a strategy, not a weakness',
        'Practice saying "Let me clarify my main point..."'
      ]
    }
  },
  verbal: {
    pacing: {
      title: 'Answer Pacing',
      icon: '⏱️',
      tips: [
        'Use the dual video mode to incorporate sign language',
        'Take your time to form your signs clearly',
        'The sign language detection helps bridge communication',
        'Practice with the avatar to see how your signs translate',
        'Don\'t rush - clear signing is more effective than fast signing'
      ]
    },
    accommodations: {
      title: 'Requesting Accommodations',
      icon: '🙋',
      tips: [
        'Request a sign language interpreter if the interviewer doesn\'t sign',
        'Ask about using video with sign language as your primary mode',
        'Inquire about extended time for responses',
        'Request written questions as backup',
        'Consider requesting a deaf interviewer or one familiar with ASL'
      ]
    },
    communication: {
      title: 'Handling Communication Gaps',
      icon: '💬',
      tips: [
        'Use the video chat with sign language feature',
        'Keep your face visible in the frame for facial expressions',
        'Use gestures and body language to enhance communication',
        'Have a backup method ready (writing, typing)',
        'The AI can help translate your signs to text if needed'
      ]
    },
    redirection: {
      title: 'Redirecting Questions',
      icon: '🔀',
      tips: [
        'Use sign to say "I want to address something different"',
        'Practice signs for "Let me explain differently"',
        'Use the text chat to redirect the conversation',
        'It\'s okay to use a combination of signing and writing',
        'Don\'t hesitate to ask for the question to be repeated in writing'
      ]
    }
  },
  motor: {
    pacing: {
      title: 'Answer Pacing',
      icon: '⏱️',
      tips: [
        'Take your time with typing - the system adapts to your pace',
        'Use voice input if typing is difficult',
        'Request extra time for any timed sections',
        'Practice with the interface before the interview',
        'It\'s okay to pause and gather your thoughts'
      ]
    },
    accommodations: {
      title: 'Requesting Accommodations',
      icon: '🙋',
      tips: [
        'Request extended time for any timed components',
        'Ask about voice-to-text options for written responses',
        'Inquire about alternative input methods',
        'Request breaks if needed for physical comfort',
        'Don\'t hesitate to explain your physical needs'
      ]
    },
    communication: {
      title: 'Handling Communication Gaps',
      icon: '💬',
      tips: [
        'Use voice input to reduce typing strain',
        'The system is designed to work with various input methods',
        'Take breaks when needed - interviewers understand',
        'Practice using the interface with your specific equipment',
        'Have alternative methods ready as backup'
      ]
    },
    redirection: {
      title: 'Redirecting Questions',
      icon: '🔀',
      tips: [
        'Use the text-based response to carefully craft your answer',
        'Take time to organize your thoughts before responding',
        'It\'s okay to say "I\'d like to approach this differently"',
        'Use the retry feature to refine your answers',
        'Practice key phrases to redirect smoothly'
      ]
    }
  },
  cognitive: {
    pacing: {
      title: 'Answer Pacing',
      icon: '⏱️',
      tips: [
        'Use the extended thinking time option',
        'Take breaks between questions to process information',
        'The system adapts to your processing speed',
        'Practice with the low stimulation mode if helpful',
        'It\'s okay to ask for time to gather your thoughts'
      ]
    },
    accommodations: {
      title: 'Requesting Accommodations',
      icon: '🙋',
      tips: [
        'Request extended time for any assessments',
        'Ask about taking breaks between questions',
        'Inquire about simplified question formats',
        'Request written copies of questions to review',
        'Don\'t hesitate to ask for questions to be repeated'
      ]
    },
    communication: {
      title: 'Handling Communication Gaps',
      icon: '💬',
      tips: [
        'Use the note-taking feature to organize thoughts',
        'Ask for clarification when needed - it shows engagement',
        'Practice the STAR method to structure your answers',
        'Use the retry feature to improve your responses',
        'Take deep breaths if you feel overwhelmed'
      ]
    },
    redirection: {
      title: 'Redirecting Questions',
      icon: '🔀',
      tips: [
        'Use the rephrase feature to improve clarity',
        'It\'s okay to say "Let me try that again"',
        'Practice staying on topic with short, focused answers',
        'Use notes to help you return to the main point',
        'Say "What I really want to say is..."'
      ]
    }
  },
  anxiety: {
    pacing: {
      title: 'Answer Pacing',
      icon: '⏱️',
      tips: [
        'Use the supportive interviewer mode for a gentler experience',
        'Take deep breaths before responding - the pause is okay',
        'The practice mode is low-stakes - treat it as a safe space',
        'Start with easier questions to build confidence',
        'Remember: this is practice, and mistakes are learning opportunities'
      ]
    },
    accommodations: {
      title: 'Requesting Accommodations',
      icon: '🙋',
      tips: [
        'You can request a more supportive interviewer approach',
        'Ask for advance notice of question topics if possible',
        'Inquire about taking short breaks during the interview',
        'Request a familiar environment for the interview',
        'It\'s okay to disclose anxiety - many employers are understanding'
      ]
    },
    communication: {
      title: 'Handling Communication Gaps',
      icon: '💬',
      tips: [
        'Pause is okay - use the time to collect your thoughts',
        'It\'s fine to say "I\'m a bit nervous" - interviewers understand',
        'Practice the 4-7-8 breathing technique between questions',
        'Focus on one question at a time - don\'t worry about the next',
        'The AI feedback is designed to be encouraging, not critical'
      ]
    },
    redirection: {
      title: 'Redirecting Questions',
      icon: '🔀',
      tips: [
        'It\'s completely acceptable to say "Can I start over?"',
        'Use the retry feature without judgment',
        'Say "Let me approach this differently" if you lose track',
        'The system supports multiple attempts - use them freely',
        'Remember: you control the pace of the interview'
      ]
    }
  }
}

export default function Strategy() {
  const profile = JSON.parse(localStorage.getItem('userProfile') || '{}')
  const disabilities = profile.disabilities || []
  const method = profile.method || 'text'
  
  const [activeDisability, setActiveDisability] = useState<string>(disabilities[0] || '')

  useEffect(() => {
    if (disabilities.length > 0 && !activeDisability) {
      setActiveDisability(disabilities[0])
    }
  }, [disabilities])

  const disabilityLabels: Record<string, string> = {
    hearing: 'Hearing Impairment',
    visual: 'Visual Impairment',
    speech: 'Speech Impairment',
    verbal: 'Verbal/ Sign Language',
    motor: 'Motor Impairment',
    cognitive: 'Cognitive/Learning',
    anxiety: 'Anxiety-Related'
  }

  const allDisabilities = Object.keys(disabilityLabels)

  const currentStrategies = activeDisability ? disabilityStrategies[activeDisability] : null

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <header style={{
        background: 'white',
        borderBottom: '1px solid var(--border)',
        padding: '1rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
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
          <Link to="/dashboard" style={{ fontWeight: 600, color: 'var(--dark)', textDecoration: 'none' }}>← Back</Link>
        </div>
      </header>

      <main style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="animate-slide-up">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Interview Strategy Builder
              </h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--gray)', maxWidth: '600px', margin: '0 auto' }}>
                Personalized strategies to help you navigate interviews with confidence based on your unique needs.
              </p>
            </div>

            {disabilities.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
                <h3 style={{ marginBottom: '1rem' }}>Complete Your Profile First</h3>
                <p style={{ color: 'var(--gray)', marginBottom: '1.5rem' }}>
                  Set up your disability profile to receive personalized interview strategies.
                </p>
                <Link to="/profile" className="btn btn-primary">
                  Set Up Profile
                </Link>
              </div>
            ) : (
              <>
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1rem' }}>🎯 Your Disability Profile</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                    {disabilities.map((d: string) => (
                      <button
                        key={d}
                        onClick={() => setActiveDisability(d)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: activeDisability === d ? 'var(--primary)' : 'var(--bg-primary)',
                          color: activeDisability === d ? 'white' : 'var(--text-primary)',
                          border: `2px solid ${activeDisability === d ? 'var(--primary)' : 'var(--border)'}`,
                          borderRadius: '20px',
                          cursor: 'pointer',
                          fontWeight: activeDisability === d ? 600 : 400,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        {disabilityLabels[d] || d}
                      </button>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>
                    Your preferred interaction method: <strong>{method}</strong>
                  </p>
                </div>

                {currentStrategies && (
                  <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {Object.entries(currentStrategies).map(([key, section]) => (
                      <div key={key} className="card" style={{
                        borderLeft: `4px solid var(--primary)`
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                          <span style={{ fontSize: '1.5rem' }}>{section.icon}</span>
                          <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{section.title}</h3>
                        </div>
                        <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                          {section.tips.map((tip, idx) => (
                            <li key={idx} style={{ marginBottom: '0.5rem', lineHeight: 1.6 }}>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                <div className="card" style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>💡</span>
                    <h3 style={{ margin: 0 }}>Pro Tips</h3>
                  </div>
                  <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                    <li style={{ marginBottom: '0.5rem' }}>Practice these strategies in mock interviews to build muscle memory</li>
                    <li style={{ marginBottom: '0.5rem' }}>Request accommodations early - employers are required to provide reasonable accommodations</li>
                    <li style={{ marginBottom: '0.5rem' }}>Use the AI Mentor to practice specific scenarios</li>
                    <li style={{ marginBottom: '0.5rem' }}>Review your Progress page to track your growth over time</li>
                    <li>Remember: Your disability is part of your story - own it with confidence</li>
                  </ul>
                </div>
              </>
            )}

            {disabilities.length > 0 && (
              <div className="card" style={{ marginTop: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>📖 Strategies for Other Disability Types</h3>
                <p style={{ marginBottom: '1rem', color: 'var(--gray)' }}>
                  Explore strategies designed for different disability types to broaden your approach.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {allDisabilities
                    .filter((d: string) => !disabilities.includes(d))
                    .map(d => (
                      <button
                        key={d}
                        onClick={() => setActiveDisability(d)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          border: '2px solid var(--border)',
                          borderRadius: '20px',
                          cursor: 'pointer',
                          fontWeight: 400,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        {disabilityLabels[d]}
                      </button>
                    ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/interview" className="btn btn-primary">
                🎤 Start Practice Interview
              </Link>
              <Link to="/mentor" className="btn btn-secondary">
                🤖 AI Mentor
              </Link>
              <Link to="/progress" className="btn btn-secondary">
                📊 View Progress
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
