import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

interface ResponseStrategy {
  id: string
  title: string
  description: string
  level: 'minimal' | 'balanced' | 'full'
  templates: string[]
}

const sensitiveQuestionStrategies: Record<string, {
  question: string
  description: string
  strategies: ResponseStrategy[]
}> = {
  careerGap: {
    question: "I notice there's a gap in your employment. Can you explain that?",
    description: "This is one of the most common difficult questions. You have options for how to address it.",
    strategies: [
      {
        id: 'growth',
        title: 'Growth & Learning Approach',
        description: 'Frame the gap as a period of personal and professional development.',
        level: 'balanced',
        templates: [
          "After my previous role, I took time to [specific learning - e.g., complete certifications, learn new technologies, take specialized courses]. This helped me [specific skill or insight gained] which I'm excited to apply here.",
          "I used that time to focus on my professional growth. I completed [specific training/certification] and also [personal development activity that shows maturity]. I feel I'm now more focused and prepared than ever.",
          "The gap allowed me to [specific valuable activity - e.g., freelance work, consulting, caregiving]. During that time, I developed [relevant skill] that directly applies to this role."
        ]
      },
      {
        id: 'brief',
        title: 'Brief & Confident',
        description: 'Keep it short and redirect to your qualifications.',
        level: 'minimal',
        templates: [
          "I took some time for personal reasons, but I'm fully focused on this opportunity now and excited about what I can bring to the role.",
          "There was a period of transition, and I used it productively. I'd rather talk about how my experience aligns with what you're looking for.",
          "I addressed some personal matters during that time. Now I'm ready to fully commit to this role and contribute to your team."
        ]
      },
      {
        id: 'positive',
        title: 'Positive Spin',
        description: 'Frame the gap as a positive choice or circumstance.',
        level: 'balanced',
        templates: [
          "I made a deliberate choice to step back and reassess my career direction. That reflection helped me identify this opportunity as the perfect fit for my skills and goals.",
          "The break actually helped me gain clarity on what I'm looking for in my next role - and this position matches exactly what I want to do.",
          "I view that time as an investment in myself. I came out of it with renewed energy and focus, plus new skills that make me even more effective."
        ]
      },
      {
        id: 'honest',
        title: 'Honest but Protected',
        description: 'Be truthful without oversharing private details.',
        level: 'full',
        templates: [
          "I took time away to [general reason - e.g., care for family, handle personal health, etc.]. It was the right decision at the time, and I'm grateful for the experience. Now I'm eager to return to work and contribute meaningfully.",
          "There were some personal circumstances that required my attention. I'm happy to say those are resolved, and I'm fully available and excited to bring my experience to this role.",
          "I was [general framing - e.g., between opportunities, transitioning industries]. I used the time productively to [positive action], and now I'm ready for my next chapter."
        ]
      }
    ]
  },
  healthBreak: {
    question: "I see you have a gap - was that due to health reasons?",
    description: "You are not obligated to disclose specific health information. Here are professional ways to handle this.",
    strategies: [
      {
        id: 'privacy',
        title: 'Protect Your Privacy',
        description: 'You don\'t need to disclose specifics about health conditions.',
        level: 'minimal',
        templates: [
          "I'd prefer to keep that private, if that's okay. What I can tell you is I'm fully recovered and ready to work.",
          "It was a personal matter that's been resolved. I'm in excellent health now and ready to fully commit to this role.",
          "I've addressed that period and I'm completely focused on this opportunity now."
        ]
      },
      {
        id: 'vague',
        title: 'Vague but Honest',
        description: 'Acknowledge without specifics.',
        level: 'balanced',
        templates: [
          "I had a period where I needed to focus on personal health. I'm pleased to say that's behind me now and I'm at 100%.",
          "There was a health-related matter that required my attention. It's fully resolved, and I'm excited to get back to doing what I love.",
          "I took some time to address a health matter. It's been taken care of, and I'm ready to contribute fully to your team."
        ]
      },
      {
        id: 'strength',
        title: 'Turn into Strength',
        description: 'Show how you\'ve grown stronger from the experience.',
        level: 'full',
        templates: [
          "I did take time to address a health issue. What I learned was the importance of work-life balance, and I'm actually more resilient and focused as a result. I'm bringing that new perspective to my work.",
          "The experience taught me a lot about perseverance and what truly matters. It gave me time to develop skills like [relevant skill] while I was recovering. I believe it made me a better professional.",
          "While I'd rather not go into details, I will say it was a formative experience. It gave me time to reflect on my career goals and come back stronger and more determined to succeed."
        ]
      }
    ]
  },
  limitedExperience: {
    question: "I notice you have limited experience in this field. Why should we hire you?",
    description: "Turn this into an opportunity to highlight your unique value and transferrable skills.",
    strategies: [
      {
        id: 'transfer',
        title: 'Transferable Skills',
        description: 'Show how your existing skills apply to this role.',
        level: 'balanced',
        templates: [
          "While my direct experience is limited, I bring [number] years of [related field/experience] where I developed skills like [specific relevant skills]. These are directly applicable to [specific job requirement].",
          "I'm a quick learner who's passionate about this field. My background in [existing skill] gives me a unique perspective that can bring fresh ideas to your team.",
          "I may be newer to this specific field, but my experience in [related area] has prepared me well. I've already started learning [specific relevant skill] and am excited to develop more."
        ]
      },
      {
        id: 'enthusiasm',
        title: 'Passion & Potential',
        description: 'Show your enthusiasm and willingness to learn.',
        level: 'minimal',
        templates: [
          "I'm very motivated to learn and grow in this field. I've already taken steps to prepare, including [specific action like courses, projects, etc.]. I'm eager to bring my [existing strength] to a team that can help me develop further.",
          "What I lack in direct experience, I make up for with enthusiasm and a strong foundation. I'm committed to being a quick learner who adds value from day one.",
          "I may not have years of experience, but I bring fresh perspectives, up-to-date training, and genuine passion for this work."
        ]
      },
      {
        id: 'unique',
        title: 'Unique Value Proposition',
        description: 'Highlight what makes you different.',
        level: 'full',
        templates: [
          "My background in [different field] actually gives me a unique advantage - I bring diverse perspectives and [specific cross-functional skill] that someone with only traditional experience might not have.",
          "I've spent time preparing for this transition. I've completed [specific training] and have been doing [relevant side project/volunteer work]. I believe my fresh perspective can add value while I continue to grow.",
          "I'm looking for an opportunity where I can grow, and I'm drawn to your company because [specific company knowledge]. I may be early in my career, but I'm committed to being a high-performer."
        ]
      }
    ]
  },
  jobHopping: {
    question: "I see you've changed jobs frequently. Can you explain that?",
    description: "Address job changes professionally without badmouthing past employers.",
    strategies: [
      {
        id: 'growth',
        title: 'Career Growth Focus',
        description: 'Frame each move as a step forward.',
        level: 'balanced',
        templates: [
          "Each role was a step up in responsibility. I was fortunate to receive promotions and opportunities for advancement that wouldn't have been available at my previous companies.",
          "I was seeking roles with increasing scope, and sometimes that means moving to a new company. Each move was about growth, and I'm looking for my next growth opportunity here.",
          "I've been lucky to work at companies that provided great learning experiences. This role represents the next level I'm seeking, and I'm excited about the specific challenges here."
        ]
      },
      {
        id: 'circumstances',
        title: 'Circumstances Beyond Control',
        description: 'Acknowledge external factors professionally.',
        level: 'minimal',
        templates: [
          "A few of those moves were due to company circumstances - restructuring or closures. When that happened, I made sure to leave professionally and continue my career momentum.",
          "Some of those transitions were out of my control - company changes, relocations, etc. But I'm glad for the experience, and now I'm looking for a place to build long-term.",
          "There were some organizational changes at previous companies. I'm now seeking a stable environment where I can contribute to long-term success."
        ]
      },
      {
        id: 'selective',
        title: 'Selective & Intentional',
        description: 'Show you\'re now looking for the right fit.',
        level: 'full',
        templates: [
          "I've learned a lot from each experience, and now I know exactly what I'm looking for: [specific company qualities]. That's why this role interests me so much.",
          "Looking back, I was seeking rapid growth. I've matured in my approach and now I'm looking for the right fit where I can build something meaningful. This role checks all my boxes.",
          "I'm at a point in my career where I'm looking for stability and the ability to make a real impact. I'm willing to invest long-term here because [specific reason you want this company]."
        ]
      }
    ]
  },
  fired: {
    question: "I see you were let go from your previous position. Can you tell me about that?",
    description: "Handle this sensitively while being honest but not self-destructive.",
    strategies: [
      {
        id: 'learn',
        title: 'Lesson Learned',
        description: 'Show growth and what you learned.',
        level: 'balanced',
        templates: [
          "It wasn't the right fit. I learned a lot about [specific skill or area], and I also learned what kind of environment I thrive in. I'm a better professional for that experience.",
          "There was a mismatch in expectations. I take responsibility for [specific aspect], and I've worked hard to address that. I feel I'm a stronger candidate because of what I learned.",
          "Looking back, it wasn't the right role for me at that time. I've since developed [improved skill] and have a clearer picture of what I bring to a team."
        ]
      },
      {
        id: 'brief',
        title: 'Brief & Move On',
        description: 'Acknowledge briefly and pivot to the future.',
        level: 'minimal',
        templates: [
          "It wasn't the right fit, but I've moved on and learned from it. I'm focused on this opportunity and what I can bring to your team.",
          "It didn't work out, but I'm grateful for the experience. I'm excited about this role and how I can contribute here.",
          "That chapter closed, and I'm looking forward. I'm here because I'm genuinely excited about what this role offers."
        ]
      },
      {
        id: 'reframe',
        title: 'Reframe the Narrative',
        description: 'Put a positive spin while being honest.',
        level: 'full',
        templates: [
          "I was let go after a restructure. While it was initially difficult, it pushed me to evaluate what I really wanted in my career. I discovered I'm most passionate about [area], which is exactly what this role involves.",
          "It wasn't my finest moment, but I've grown from it. I now have a better understanding of my strengths and the type of environment I succeed in. This role seems like a great match.",
          "I was part of a challenging situation at my previous company. Rather than dwell on it, I focused on developing new skills. I believe I'm stronger and more self-aware because of it."
        ]
      }
    ]
  },
  age: {
    question: "How do you feel about working with younger/older colleagues?",
    description: "Address age-related questions professionally without bias.",
    strategies: [
      {
        id: 'diverse',
        title: 'Embrace Diversity',
        description: 'Show you value different generations.',
        level: 'balanced',
        templates: [
          "I believe diverse teams are stronger teams. I've worked with colleagues of all ages and find that different perspectives make us better. I'm always learning from others regardless of their age.",
          "Age brings experience, and energy comes in many forms. I try to learn from everyone and contribute my strengths while appreciating what others bring.",
          "I value the unique perspective each generation brings. I've found that the best teams have a mix of experience and fresh ideas."
        ]
      },
      {
        id: 'skill',
        title: 'Focus on Skills',
        description: 'Redirect to your abilities.',
        level: 'minimal',
        templates: [
          "I'm focused on working with people who are talented and collaborative. Age is less relevant to me than skill and attitude.",
          "I work well with anyone who's committed to doing great work. I'm always open to learning from others and sharing what I know.",
          "My approach is to contribute my experience while remaining open to new ideas. I think that's what makes teams successful."
        ]
      },
      {
        id: 'value',
        title: 'Value Proposition',
        description: 'Show your unique value regardless of age.',
        level: 'full',
        templates: [
          "I bring a track record of results and stability, combined with a willingness to adapt. I've successfully mentored younger team members and learned from older ones. I'm about capability, not age.",
          "What I offer is [specific value]. I've found that my experience helps me mentor junior staff while my adaptability keeps me current. I think I add value across age groups.",
          "I'm confident in my abilities and background. I measure success by results and collaboration, not age. I hope to be judged by what I deliver."
        ]
      }
    ]
  }
}

export default function SensitiveQuestions() {
  const { colors } = useTheme()
  const [selectedTopic, setSelectedTopic] = useState<string>('careerGap')
  const [customSituation, setCustomSituation] = useState('')
  const [showCustom, setShowCustom] = useState(false)
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null)
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null)

  const currentQuestion = sensitiveQuestionStrategies[selectedTopic]

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedTemplate(`${selectedTopic}-${index}`)
    setTimeout(() => setCopiedTemplate(null), 2000)
  }

  const topicLabels: Record<string, string> = {
    careerGap: 'Career Gap',
    healthBreak: 'Health Break',
    limitedExperience: 'Limited Experience',
    jobHopping: 'Job Hopping',
    fired: 'Let Go / Fired',
    age: 'Age-Related Questions'
  }

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
          radial-gradient(ellipse at 20% 20%, rgba(51, 188, 101, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(18, 220, 239, 0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(95, 255, 217, 0.03) 0%, transparent 70%)
        `,
        pointerEvents: 'none'
      }} />
      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(51, 188, 101, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(51, 188, 101, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none'
      }} />
      <header style={{
        background: 'rgba(7, 7, 7, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(51, 188, 101, 0.2)',
        padding: '1rem 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #33BC65 0%, #28a653 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem'
            }}>
              ♿
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#33BC65' }}>AccessPrep</span>
          </Link>
          <Link to="/dashboard" style={{ fontWeight: 600, color: '#a3a3a3', textDecoration: 'none' }}>← Back</Link>
        </div>
      </header>

      <main style={{ padding: '2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="animate-slide-up">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛡️</div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#ffffff' }}>
                Sensitive Question Handler
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#a3a3a3', maxWidth: '600px', margin: '0 auto' }}>
                Prepare confident, professional responses to difficult interview questions. 
                You control how much you disclose.
              </p>
            </div>

            <div style={{ 
              marginBottom: '1.5rem',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '16px',
              border: '1px solid rgba(51, 188, 101, 0.2)',
              padding: '1.5rem',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: '#ffffff' }}>What would you like help with?</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                {Object.entries(topicLabels).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => { setSelectedTopic(key); setSelectedStrategy(null); setShowCustom(false); }}
                    style={{
                      padding: '1rem',
                      background: selectedTopic === key && !showCustom ? '#33BC65' : 'rgba(255, 255, 255, 0.05)',
                      color: selectedTopic === key && !showCustom ? 'white' : '#a3a3a3',
                      border: `2px solid ${selectedTopic === key && !showCustom ? '#33BC65' : 'rgba(51, 188, 101, 0.3)'}`,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontWeight: selectedTopic === key && !showCustom ? 600 : 400,
                      textAlign: 'left'
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {!showCustom && currentQuestion && (
              <div style={{ 
                marginBottom: '1.5rem', 
                background: 'rgba(51, 188, 101, 0.1)',
                borderRadius: '16px',
                border: '1px solid rgba(51, 188, 101, 0.3)',
                borderLeft: '4px solid #33BC65',
                padding: '1.5rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: '#ffffff' }}>{currentQuestion.question}</h3>
                <p style={{ color: '#a3a3a3', fontSize: '0.9rem' }}>{currentQuestion.description}</p>
              </div>
            )}

            {!showCustom && currentQuestion && (
              <div style={{ 
                marginBottom: '1.5rem', 
                background: 'rgba(51, 188, 101, 0.1)',
                borderRadius: '16px',
                border: '1px solid rgba(51, 188, 101, 0.3)',
                borderLeft: '4px solid #33BC65',
                padding: '1.5rem'
              }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#ffffff' }}>📝 The Question</h4>
                <p style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.5rem', color: '#ffffff' }}>
                  "{currentQuestion.question}"
                </p>
                <p style={{ fontSize: '0.9rem', color: '#a3a3a3' }}>
                  {currentQuestion.description}
                </p>
              </div>
            )}

            {!showCustom && currentQuestion && currentQuestion.strategies && (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {currentQuestion.strategies.map((strategy) => (
                  <div 
                    key={strategy.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(51, 188, 101, 0.2)',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      borderLeft: selectedStrategy === strategy.id ? '4px solid #33BC65' : '4px solid transparent'
                    }}
                    onClick={() => setSelectedStrategy(strategy.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          background: strategy.level === 'minimal' ? 'rgba(51, 188, 101, 0.2)' : strategy.level === 'balanced' ? 'rgba(18, 220, 239, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                          color: strategy.level === 'minimal' ? '#5DFFD9' : strategy.level === 'balanced' ? '#12DCEF' : '#f59e0b'
                        }}>
                          {strategy.level === 'minimal' ? 'Minimal Disclosure' : strategy.level === 'balanced' ? 'Balanced' : 'Full Explanation'}
                        </span>
                        <h4 style={{ margin: 0, color: '#ffffff' }}>{strategy.title}</h4>
                        </div>
                        <span style={{ fontSize: '1.25rem' }}>{selectedStrategy === strategy.id ? '👇' : '👉'}</span>
                      </div>
                      <p style={{ margin: 0, color: '#a3a3a3', fontSize: '0.9rem' }}>{strategy.description}</p>

                      {selectedStrategy === strategy.id && (
                        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(51, 188, 101, 0.2)' }}>
                          <p style={{ fontWeight: 600, marginBottom: '0.75rem', color: '#ffffff' }}>Choose a response template:</p>
                          <div style={{ display: 'grid', gap: '0.75rem' }}>
                            {strategy.templates.map((template, idx) => (
                              <div 
                                key={idx}
                                style={{
                                  padding: '1rem',
                                  background: 'rgba(0, 0, 0, 0.3)',
                                  borderRadius: '8px',
                                  border: '1px solid rgba(51, 188, 101, 0.3)'
                                }}
                              >
                                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', lineHeight: 1.6, color: '#e5e5e5' }}>
                                  "{template}"
                                </p>
                                <button
                                  onClick={(e) => { e.stopPropagation(); copyToClipboard(template, idx); }}
                                  style={{
                                    padding: '0.5rem 1rem',
                                    background: copiedTemplate === `${selectedTopic}-${idx}` ? '#33BC65' : '#12DCEF',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    fontWeight: 500
                                  }}
                                >
                                  {copiedTemplate === `${selectedTopic}-${idx}` ? '✓ Copied!' : 'Copy Template'}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

            {showCustom && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '16px',
                border: '1px solid rgba(51, 188, 101, 0.2)',
                padding: '1.5rem',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{ marginBottom: '1rem', color: '#ffffff' }}>💬 Custom Situation</h3>
                <p style={{ marginBottom: '1rem', color: '#a3a3a3' }}>
                  Describe your situation and I'll help you craft a professional response:
                </p>
                <textarea
                  value={customSituation}
                  onChange={(e) => setCustomSituation(e.target.value)}
                  placeholder="e.g., I took time off to care for my elderly parent, I was laid off due to company restructuring, I changed careers entirely..."
                  rows={4}
                  style={{ 
                    marginBottom: '1rem',
                    width: '100%',
                    padding: '1rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(51, 188, 101, 0.3)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    outline: 'none'
                  }}
                />
                {customSituation && (
                  <div style={{ 
                    padding: '1.5rem', 
                    background: 'rgba(51, 188, 101, 0.1)', 
                    borderRadius: '12px',
                    border: '1px solid rgba(51, 188, 101, 0.3)'
                  }}>
                    <h4 style={{ marginBottom: '1rem' }}>💡 Suggested Approach</h4>
                    <p style={{ marginBottom: '1rem' }}>
                      For your situation: <strong>"{customSituation}"</strong>
                    </p>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      <div style={{ padding: '1rem', background: 'white', borderRadius: '8px' }}>
                        <p style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem' }}>Brief & Confident:</p>
                        <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                          "I took time to handle [general reason - e.g., personal matters, family responsibilities]. That period is behind me now, and I'm fully focused on this opportunity and what I can contribute to your team."
                        </p>
                      </div>
                      <div style={{ padding: '1rem', background: 'white', borderRadius: '8px' }}>
                        <p style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem' }}>Growth-Focused:</p>
                        <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                          "That experience taught me a lot about [relevant skill or quality]. I'm actually a stronger professional because of it. I'm excited to bring that perspective to this role."
                        </p>
                      </div>
                      <div style={{ padding: '1rem', background: 'white', borderRadius: '8px' }}>
                        <p style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem' }}>Forward-Looking:</p>
                        <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                          "I've addressed that chapter and I'm completely ready for this next step. What excites me about this role is [specific aspect]. I'd love to discuss how my experience can add value to your team."
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={() => { setShowCustom(!showCustom); setSelectedStrategy(null); }}
                className="btn btn-secondary"
              >
                {showCustom ? '← Back to Common Questions' : '💬 I Have a Different Situation'}
              </button>
            </div>

            <div className="card" style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)' }}>
              <h3 style={{ marginBottom: '1rem' }}>⚖️ Your Privacy Matters</h3>
              <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>You don't have to disclose specifics</strong> - You can say "personal reasons" and leave it at that
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Focus on the future</strong> - Interviewers care more about what you can do now than what happened then
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Keep it brief</strong> - The less you say, the less they can probe
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>It's okay to redirect</strong> - "I'd rather focus on how my skills match this role"
                </li>
                <li>
                  <strong>Practice makes perfect</strong> - Use the mock interview to practice these responses
                </li>
              </ul>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/interview" style={{
                background: '#33BC65',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '1rem 2rem',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                cursor: 'pointer'
              }}>
                🎤 Practice in Mock Interview
              </Link>
              <Link to="/strategy" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#a3a3a3',
                border: '1px solid rgba(51, 188, 101, 0.3)',
                borderRadius: '12px',
                padding: '1rem 2rem',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                cursor: 'pointer'
              }}>
                🎯 Strategy Builder
              </Link>
              <Link to="/mentor" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#a3a3a3',
                border: '1px solid rgba(51, 188, 101, 0.3)',
                borderRadius: '12px',
                padding: '1rem 2rem',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                cursor: 'pointer'
              }}>
                🤖 AI Mentor
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
