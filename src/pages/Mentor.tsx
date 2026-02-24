import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

interface Message {
  id: string
  role: 'user' | 'mentor'
  content: string
  timestamp: Date
}

interface SessionData {
  date: string
  mode: string
  score: number
  communication: number
  reasoning: number
  readiness: number
}

const reflectionExercises = [
  { title: 'What went well?', prompt: 'Think about one thing you did really well in this session. What made it strong?' },
  { title: 'Learning moment', prompt: 'What is one thing you learned from this interview practice?' },
  { title: 'Growth mindset', prompt: 'How has your confidence grown since your first practice session?' },
  { title: 'Strengths recognition', prompt: 'List three strengths you bring to any interview. How can you communicate these?' },
]

const mentalPreparationTips = [
  { title: 'Deep Breathing', description: 'Take 3 deep breaths before each question. Inhale for 4 counts, hold for 4, exhale for 4.' },
  { title: 'Positive Visualization', description: 'Imagine yourself succeeding. Picture yourself answering questions confidently.' },
  { title: 'Power Poses', description: 'Before the interview, stand tall with hands on hips for 2 minutes to boost confidence.' },
  { title: 'Affirmations', description: 'Tell yourself: "I am prepared", "I have valuable experience", "I deserve this opportunity".' },
]

const followUpChallenges = [
  { question: 'Can you tell me more about that?', tips: 'Provide a specific example. Use STAR method. Keep it under 2 minutes.' },
  { question: 'What was your biggest challenge?', tips: 'Focus on how you overcame it. Show resilience. End with a positive outcome.' },
  { question: 'Why should we hire you?', tips: 'Connect your skills to the job requirements. Highlight unique qualities. Be confident!' },
  { question: 'Tell me about a failure', tips: 'Choose a real failure. Focus on what you learned. Show growth and improvement.' },
]

export default function Mentor() {
  const { colors } = useTheme()
  const [sessionHistory, setSessionHistory] = useState<SessionData[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeTab, setActiveTab] = useState<'chat' | 'reflection' | 'practice' | 'tips'>('chat')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('interviewHistory')
    if (saved) {
      setSessionHistory(JSON.parse(saved))
    }
    
    setMessages([{
      id: '1',
      role: 'mentor',
      content: getWelcomeMessage(),
      timestamp: new Date()
    }])
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getWelcomeMessage = () => {
    if (sessionHistory.length === 0) {
      return `Hello! I'm your AI Interview Mentor. 👋

I'm here to help you prepare for interviews in a supportive, confidence-building way.

We haven't practiced together yet. Would you like to:
• Start a mock interview
• Talk about any interview concerns you have
• Learn some confidence-building techniques

What would you like to work on today?`
    }
    
    const avgScore = sessionHistory.reduce((a, b) => a + b.score, 0) / sessionHistory.length
    const recentTrend = sessionHistory.slice(-3)
    const isImproving = recentTrend.length > 1 && recentTrend[recentTrend.length - 1].score > recentTrend[0].score
    
    return `Welcome back! 🌟

I've been tracking your progress - you've completed ${sessionHistory.length} practice sessions with an average score of ${Math.round(avgScore)}%.

${isImproving ? "I can see you're improving! Your recent scores show growth. That's great progress!" : "Remember, every practice session makes you stronger, regardless of the score. Let's keep building your confidence!"}

How would you like to work together today?`
  }

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    // Nervousness and anxiety
    if (input.includes('nervous') || input.includes('anxious') || input.includes('scared') || input.includes('worried') || input.includes('fear') || input.includes('panic')) {
      const sessions = sessionHistory.length
      return `I hear you, and I want you to know: **what you're feeling is completely valid** and so normal! 😌

Here's something important: Interview nerves actually show you care about doing well - that passion is a strength, not a weakness.

${sessions > 0 ? `Look how far you've already come - ${sessions} practice sessions! That's real experience you're building.` : 'Starting this journey takes real courage.'}

**Let's work on managing that anxiety together:**

1. **Reframe it**: Nerves = excitement = you care about this opportunity
2. **Breathe**: 4 counts in, hold 4, out 4 - it genuinely calms your nervous system
3. **Remember**: The interviewer is on your side - they want to find someone great, and that could be you!
4. **Prepare**: Practice with me = confidence = less anxiety

Would you like to try a quick calming exercise or practice a question together? I'm here for you. 💙`
    }
    
    // Questions about weaknesses/bad answers
    if (input.includes('why') && (input.includes('weak') || input.includes('bad') || input.includes('poor') || input.includes('fail'))) {
      return `First: Thank you for being so honest about this. Self-awareness is actually a *strength* in interviews! 🔍

Everyone has areas they working on. Here's how to handle it:

**Turn weaknesses into growth:**
• Pick something real but not critical to the job
• Show what you're actively doing about it
• End on a positive note

**Example:**
"I used to struggle with public speaking, but I've taken a presentation course and volunteer to present at team meetings. I'm much more comfortable now."

**Avoid:**
• "I'm a perfectionist" (everyone says this)
• Lying about real weaknesses

Want me to help you practice your response to this question?`
    }
    
    // Disability disclosure
    if (input.includes('disclosure') || input.includes('disability') || input.includes('tell them') || input.includes('should i tell') || input.includes('accommodation')) {
      return `This is such an important and personal question. 💙

**You have complete control** - this is *your* decision and yours alone:

**Option 1: Don't disclose**
• Legally, you don't have to
• Your skills and experience speak for themselves
• You can request accommodations later if needed

**Option 2: Disclose confidently**
• Focus on *accommodations that help you excel*, not limitations
• Share how you've succeeded with the right support
• Highlight your unique perspective and strengths

**Helpful phrasing:**
• ✓ "With the right accommodations, I thrive in..."
• ✗ "Despite my disability, I can..."

**Timing is up to you:**
• During interview (if it affects how you communicate)
• After receiving an offer
• Never - also completely valid

Would you like help preparing what to say if you do decide to disclose?`
    }
    
    // Confidence building
    if (input.includes('confidence') || input.includes('confident') || input.includes('self-esteem') || input.includes('believe in')) {
      const avgScore = sessionHistory.length > 0 ? Math.round(sessionHistory.reduce((a, b) => a + b.score, 0) / sessionHistory.length) : 0
      
      let progressSection = ''
      if (sessionHistory.length > 0) {
        progressSection = `**Your progress:**
• ${sessionHistory.length} practice sessions completed
• Average score: ${avgScore}% - that's growth!
• Each session makes you stronger`
      } else {
        progressSection = '**Everyone starts somewhere** - the fact that you are here shows courage.'
      }
      
      return `Building real confidence is a journey - and you are already on it! 🌟

${progressSection}

**Daily confidence boosters:**
1. List 3 wins from your career before any practice
2. Say: "I have valuable experience to contribute"
3. Power poses for 2 minutes actually work
4. Remember: You are interviewing *them* too - you have choices!

**Confidence truth:**
Interviewers hire people they connect with, not just resumes. Your lived experience and perspective are *valuable* - do not forget that.

Would you like a reflection exercise to celebrate how far you have come? 🎯`
    }
    
    // How to answer questions
    if (input.includes('how') && (input.includes('answer') || input.includes('explain') || input.includes('structure'))) {
      return `Great question! Let me give you some frameworks that work: 🎯

**"Tell me about yourself" (1-2 min)**
• Past: Brief relevant background
• Present: Current role + biggest win
• Future: Why this role excites you

**"What's your greatest weakness?"**
• Real but not critical
• Show what you're doing to improve
• End positive

**"Why should we hire you?"**
• Match their needs to YOUR skills
• 2-3 specific strengths with examples
• Show you understand the role

**"Tell me about a challenge" (STAR Method)**
• **S**ituation: Set the scene
• **T**ask: Your responsibility
• **A**ction: What YOU did specifically
• **R**esult: Measurable outcome

Want me to practice any of these with you?`
    }
    
    // Follow-up questions
    if (input.includes('follow-up') || input.includes('challenge') || input.includes('dig deeper')) {
      return `Follow-up questions are where interviewers really get to know you - and where you can shine! 🎯

**How to handle them:**
• Pause and think - that's okay!
• "That's a great question, let me think..." is perfectly fine
• Ask for clarification if needed
• Don't repeat yourself - build on your answer

**Common follow-ups and how to handle:**

**"Can you tell me more?"**
→ Give a specific example with details

**"What was your biggest challenge?"**
→ Focus on how you overcame it, show resilience

**"Why should we hire you?"**
→ Connect your skills to what they need, be confident!

**"Tell me about a failure"**
→ Choose real failure, focus on learning, show growth

Would you like me to practice some follow-up questions with you?`
    }
    
    // Technical questions
    if (input.includes('technical') || input.includes('coding') || input.includes('code') || input.includes('programming')) {
      return `Technical interviews can feel intimidating, but here's the truth: they're also just conversations! 💻

**Preparation strategies:**
1. **Know the fundamentals** - data structures, algorithms, system design basics
2. **Practice out loud** - verbalize your thinking process
3. **Start simple** - get something working, then optimize
4. **Ask clarifying questions** - shows you think carefully
5. **Think out loud** - interviewers want to see your problem-solving, not just the answer

**If you get stuck:**
• "That's a good point, let me think about that..."
• "What if I approached it this way..."
• It's okay to say "I'm not sure, but here's how I'd figure it out"

Want me to walk through a sample technical question with you?`
    }
    
    // Behavioral questions
    if (input.includes('behavioral') || input.includes('star method') || input.includes('situation') || input.includes('past experience')) {
      return `Behavioral questions reveal who you are through your experiences. The STAR method is your friend! 📖

**STAR Method:**
• **Situation**: Set the scene (briefly)
• **Task**: Your responsibility in it
• **Action**: What YOU specifically did
• **Result**: What happened - quantify if possible!

**Pro tips:**
• Have 5-7 stories ready that show different strengths
• Pick stories where YOU were the key player
• Results with numbers are powerful: "increased by 30%"

**Common behavioral themes:**
• Leadership
• Conflict resolution
• Failure and learning
• Working with difficult people
• Meeting tight deadlines

Want to practice one together?`
    }
    
    // Rejection or failure
    if (input.includes('rejected') || input.includes('didn\'t get') || input.includes('did not get') || input.includes('denied') || input.includes('failed')) {
      return `I want to acknowledge something: **rejection hurts**. That's real, and it's okay to feel disappointed. 💙

But here's what I want you to know:

**Rejection isn't a measure of your worth.**
• Sometimes it's fit, sometimes it's timing
• Many successful people were rejected repeatedly
• Each interview gets you closer to the right fit

**After rejection:**
1. Allow yourself to feel the disappointment
2. Reflect: What went well? What could you improve?
3. Ask for feedback if possible
4. Keep practicing - you're building skills

**Remember:**
Every "no" is one step closer to a "yes" that's right for you. You've got this!

Would you like to do a practice session to rebuild your confidence?`
    }
    
    // Feeling overwhelmed
    if (input.includes('overwhelm') || input.includes('too much') || input.includes('don\'t know where to start') || input.includes('everything')) {
      return `Take a breath. I'm here to help you break this down. 🌿

**Let's simplify:**

Pick ONE thing to focus on first. Maybe:
• Just answer 3 questions today
• Or just review feedback from your last session
• Or just browse some tips

**Small steps = big progress.**

You don't have to be perfect - you just have to keep showing up. That's exactly what you're doing right now.

What feels most manageable to you right now? Let's start there.`
    }
    
    // Gratitude
    if (input.includes('thank') || input.includes('thanks') || input.includes('appreciate')) {
      const responses = [
        `You're so welcome! 💙

Remember, I'm always here to support you:
• Explaining feedback in simple terms
• Building confidence before interviews
• Practicing specific question types
• Mental preparation techniques
• Disability disclosure guidance

You've got this! Keep going! 🌟`,
        
        `It's truly my pleasure! 😊

Every time you practice, you're investing in yourself. That matters enormously.

I'm here whenever you need:
• To talk through interview anxiety
• To practice answering questions
• To celebrate your wins
• To work through challenges

Keep being brave - you're doing something wonderful for yourself! ✨`,
        
        `Always here for you! 💪

Your willingness to practice and grow is genuinely inspiring. That's how success happens - one step at a time.

Don't forget to acknowledge yourself for doing this work. Not everyone does. You're doing something great.

Come back anytime! 🌟`
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
    
    // Greetings
    if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input.includes('good morning') || input.includes('good afternoon')) {
      return `Hello! 💙

I'm so glad you're here. This is a safe space to practice, make mistakes, and grow.

What would you like to work on today?
• Practice answering questions
• Talk through interview anxiety
• Get tips on specific question types
• Work on disability disclosure
• Just chat about how you're feeling

Take your time - I'm here for you! 🌟`
    }
    
    // Progress check
    if (input.includes('progress') || input.includes('how am i') || input.includes('my score') || input.includes('stats')) {
      if (sessionHistory.length === 0) {
        return `You haven't completed any practice sessions yet, so I don't have specific data on your progress yet! 📊

But what I can say is: **you're here, and that matters.**

Each practice session will help me understand your strengths and areas to work on. Want to start a session now?

Or if you'd prefer, we can just chat about how you're feeling about interviews. Either way, I'm here! 🌟`
      }
      
      const avgScore = Math.round(sessionHistory.reduce((a, b) => a + b.score, 0) / sessionHistory.length)
      const recentScores = sessionHistory.slice(-3)
      const recentAvg = Math.round(recentScores.reduce((a, b) => a + b.score, 0) / recentScores.length)
      const improving = recentAvg > avgScore
      
      return `Great question! Here's your progress snapshot: 📊

**Overall (${sessionHistory.length} sessions):**
• Average Score: ${avgScore}%
• Communication: ${Math.round(sessionHistory.reduce((a, b) => a + b.communication, 0) / sessionHistory.length)}%
• Reasoning: ${Math.round(sessionHistory.reduce((a, b) => a + b.reasoning, 0) / sessionHistory.length)}%

**Recent trend:** ${improving ? '📈 Improving! Your last few sessions are stronger.' : '📊 Steady progress - keep going!'}

**What this means:**
${improving ? 'You\'re getting better at articulating your experience!' : 'Every session builds skills, even if scores vary.'}

Want to focus on improving a specific area?`
    }
    
    // Default response with more empathy
    return `I'm here to help you succeed! 💙

Based on what you've shared, I can help you with:

🎯 **Answering Questions**
• How to structure strong answers
• STAR method practice
• Follow-up question strategies
• Technical interview prep

💪 **Building Confidence**
• Managing interview anxiety
• Positive self-talk techniques
• Mental preparation
• Handling rejection

📝 **Resume & Disclosure**
• Talking about your experience
• Disability disclosure options
• Inclusive language tips

🔧 **Specific Help**
• Practice with mock questions
• Review your past answers
• Work on specific weaknesses

What feels most important to you right now?`
  }

  const handleSend = () => {
    if (!input.trim()) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)
    
    setTimeout(() => {
      const mentorResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'mentor',
        content: generateResponse(input),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, mentorResponse])
      setIsTyping(false)
    }, 1000)
  }

  const getAnalysis = () => {
    if (sessionHistory.length === 0) return null
    
    const avg = {
      communication: Math.round(sessionHistory.reduce((a, b) => a + b.communication, 0) / sessionHistory.length),
      reasoning: Math.round(sessionHistory.reduce((a, b) => a + b.reasoning, 0) / sessionHistory.length),
      readiness: Math.round(sessionHistory.reduce((a, b) => a + b.readiness, 0) / sessionHistory.length),
    }
    
    return avg
  }

  const analysis = getAnalysis()

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
            <Link to="/dashboard" style={{ fontWeight: 600, color: '#a3a3a3', textDecoration: 'none' }}>← Back</Link>
        </div>
      </header>

      <main style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#ffffff' }}>
            🤖 AI Interview Mentor
          </h1>
          <p style={{ color: '#a3a3a3', marginBottom: '2rem' }}>
            Your personal coaching partner - always here to help you succeed
          </p>

          {/* Tab Navigation */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { id: 'chat', label: '💬 Chat', icon: '💬' },
              { id: 'reflection', label: '📝 Reflection', icon: '📝' },
              { id: 'practice', label: '🎯 Practice', icon: '🎯' },
              { id: 'tips', label: '💡 Tips', icon: '💡' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '0.75rem 1.25rem',
                  background: activeTab === tab.id ? '#33BC65' : 'rgba(255, 255, 255, 0.05)',
                  color: activeTab === tab.id ? '#ffffff' : '#a3a3a3',
                  border: `2px solid ${activeTab === tab.id ? '#33BC65' : 'rgba(51, 188, 101, 0.3)'}`,
                  borderRadius: '25px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backdropFilter: 'blur(10px)'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'chat' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem' }}>
              {/* Chat Area */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '600px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '16px',
                border: '1px solid rgba(51, 188, 101, 0.2)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {messages.map(msg => (
                    <div key={msg.id} style={{
                      display: 'flex',
                      justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                    }}>
                      <div style={{
                        maxWidth: '85%',
                        padding: '1.25rem 1.5rem',
                        background: msg.role === 'user' ? '#33BC65' : 'rgba(255, 255, 255, 0.08)',
                        color: msg.role === 'user' ? '#ffffff' : '#e5e5e5',
                        borderRadius: msg.role === 'user' ? '22px 22px 6px 22px' : '22px 22px 22px 6px',
                        whiteSpace: 'pre-wrap',
                        fontSize: '1.1rem',
                        lineHeight: 1.7,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        border: msg.role === 'mentor' ? '1px solid rgba(51, 188, 101, 0.2)' : 'none'
                      }}>
                        {msg.role === 'mentor' && <span style={{ fontWeight: 700, display: 'block', marginBottom: '0.75rem', fontSize: '1rem' }}>🤖 Mentor</span>}
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#a3a3a3', fontSize: '1.1rem' }}>
                      <span>🤖</span>
                      <span>Mentor is typing...</span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                <div style={{ padding: '1.25rem', borderTop: '1px solid rgba(51, 188, 101, 0.2)', display: 'flex', gap: '0.75rem' }}>
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSend()}
                    placeholder="Ask me anything..."
                    style={{ 
                      flex: 1, 
                      fontSize: '1.1rem', 
                      padding: '1rem 1.25rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(51, 188, 101, 0.3)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      outline: 'none'
                    }}
                  />
                  <button onClick={handleSend} style={{ 
                    fontSize: '1.1rem', 
                    padding: '1rem 1.5rem',
                    background: '#33BC65',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}>
                    Send
                  </button>
                </div>
              </div>

              {/* Side Panel */}
              <div>
                {analysis && (
                  <div style={{ 
                    marginBottom: '1rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '16px',
                    border: '1px solid rgba(51, 188, 101, 0.2)',
                    padding: '1.5rem',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '1rem', color: '#ffffff' }}>📊 Your Progress</h3>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                      {Object.entries(analysis).map(([key, value]) => (
                        <div key={key}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                            <span style={{ fontSize: '0.85rem', textTransform: 'capitalize', color: '#a3a3a3' }}>{key}</span>
                            <span style={{ fontWeight: 700, color: '#ffffff' }}>{value}%</span>
                          </div>
                          <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}>
                            <div style={{
                              height: '100%',
                              width: `${value}%`,
                              background: value >= 80 ? '#33BC65' : value >= 60 ? '#12DCEF' : '#f59e0b',
                              borderRadius: '4px'
                            }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#a3a3a3', marginTop: '1rem' }}>
                      {sessionHistory.length} sessions completed
                    </p>
                  </div>
                )}

                <div style={{ 
                  background: 'rgba(51, 188, 101, 0.1)',
                  borderRadius: '16px',
                  border: '1px solid rgba(51, 188, 101, 0.3)',
                  padding: '1.5rem'
                }}>
                  <h3 style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#5DFFD9' }}>💙 Quick Tip</h3>
                  <p style={{ fontSize: '0.9rem', color: '#a3a3a3' }}>
                    Remember: Interviewers are on your side. They want to find the right person - and that could be you!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reflection' && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '16px',
              border: '1px solid rgba(51, 188, 101, 0.2)',
              padding: '2rem',
              backdropFilter: 'blur(10px)'
            }}>
              <h2 style={{ fontWeight: 700, marginBottom: '1rem', color: '#ffffff' }}>📝 Reflection Exercises</h2>
              <p style={{ color: '#a3a3a3', marginBottom: '1.5rem' }}>
                Take a moment to reflect on your progress. This builds self-awareness and confidence.
              </p>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                {reflectionExercises.map((exercise, i) => (
                  <div key={i} style={{
                    padding: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    borderLeft: '4px solid #33BC65'
                  }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#ffffff' }}>{exercise.title}</h3>
                    <p style={{ color: '#a3a3a3' }}>{exercise.prompt}</p>
                    <textarea
                      placeholder="Write your thoughts here..."
                      rows={3}
                      style={{ 
                        marginTop: '1rem',
                        width: '100%',
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(51, 188, 101, 0.3)',
                        borderRadius: '8px',
                        padding: '1rem',
                        color: '#ffffff',
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                ))}
              </div>

              <button style={{ 
                marginTop: '1.5rem',
                background: '#33BC65',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '1rem 2rem',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer'
              }}>
                Save Reflections
              </button>
            </div>
          )}

          {activeTab === 'practice' && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '16px',
              border: '1px solid rgba(51, 188, 101, 0.2)',
              padding: '2rem',
              backdropFilter: 'blur(10px)'
            }}>
              <h2 style={{ fontWeight: 700, marginBottom: '1rem', color: '#ffffff' }}>🎯 Follow-Up Challenge Practice</h2>
              <p style={{ color: '#a3a3a3', marginBottom: '1.5rem' }}>
                Interviewers often ask follow-up questions. Let's practice handling them!
              </p>
              
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {followUpChallenges.map((challenge, i) => (
                  <div key={i} style={{
                    padding: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px'
                  }}>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#33BC65' }}>
                      "{challenge.question}"
                    </div>
                    <div style={{ color: '#a3a3a3', marginBottom: '1rem' }}>
                      💡 {challenge.tips}
                    </div>
                    <textarea
                      placeholder="Practice your answer here..."
                      rows={3}
                      style={{ 
                        width: '100%',
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(51, 188, 101, 0.3)',
                        borderRadius: '8px',
                        padding: '1rem',
                        color: '#ffffff',
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
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
                  Start Mock Interview
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'tips' && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '16px',
              border: '1px solid rgba(51, 188, 101, 0.2)',
              padding: '2rem',
              backdropFilter: 'blur(10px)'
            }}>
              <h2 style={{ fontWeight: 700, marginBottom: '1rem', color: '#ffffff' }}>💡 Mental Preparation Tips</h2>
              <p style={{ color: '#a3a3a3', marginBottom: '1.5rem' }}>
                Before your interview, try these confidence-building techniques:
              </p>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                {mentalPreparationTips.map((tip, i) => (
                  <div key={i} style={{
                    padding: '1.25rem',
                    background: i % 2 === 0 ? 'rgba(51, 188, 101, 0.1)' : 'rgba(18, 220, 239, 0.1)',
                    borderRadius: '12px',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{ fontSize: '2rem' }}>
                      {i === 0 ? '🌬️' : i === 1 ? '🧠' : i === 2 ? '💪' : '✨'}
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 700, marginBottom: '0.25rem', color: '#ffffff' }}>{tip.title}</h3>
                      <p style={{ color: '#a3a3a3' }}>{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '2rem',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(51, 188, 101, 0.2) 0%, rgba(18, 220, 239, 0.1) 100%)',
                borderRadius: '12px',
                border: '1px solid rgba(51, 188, 101, 0.3)'
              }}>
                <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#5DFFD9' }}>🌟 Daily Affirmation</h3>
                <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#e5e5e5' }}>
                  "I am prepared. I am capable. I have valuable experience to share. I deserve this opportunity."
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
