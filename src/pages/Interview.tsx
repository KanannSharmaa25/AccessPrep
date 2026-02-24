import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const industries = [
  { id: 'it', label: 'IT & Software', roles: ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer', 'Cloud Engineer', 'Cybersecurity Analyst'] },
  { id: 'data', label: 'Data Science & AI', roles: ['Data Scientist', 'Data Analyst', 'Machine Learning Engineer', 'AI Engineer', 'Data Engineer'] },
  { id: 'product', label: 'Product & Design', roles: ['Product Manager', 'UX Designer', 'Project Manager', 'Scrum Master'] },
  { id: 'business', label: 'Business & Finance', roles: ['Business Analyst', 'Financial Analyst', 'Accountant', 'Marketing Manager', 'Sales Representative'] },
  { id: 'healthcare', label: 'Healthcare', roles: ['Nurse', 'Physical Therapist', 'Pharmacist', 'Healthcare Administrator'] },
  { id: 'government', label: 'Government & Public', roles: ['Public Administrator', 'Policy Analyst', 'Government Relations', 'Civil Servant'] },
  { id: 'education', label: 'Education', roles: ['Teacher', 'Professor', 'Instructional Designer', 'Education Administrator'] },
  { id: 'creative', label: 'Creative & Media', roles: ['Graphic Designer', 'Content Writer', 'Video Editor', 'Social Media Manager', 'SEO Specialist'] },
]

const interviewModes = [
  { id: 'supportive', label: 'Supportive', description: 'Gentle, encouraging questions for building confidence', difficulty: 1 },
  { id: 'behavioral', label: 'Behavioral', description: 'STAR method questions, past experiences', difficulty: 2 },
  { id: 'situational', label: 'Situational', description: 'Hypothetical scenarios, decision-making', difficulty: 3 },
  { id: 'challenging', label: 'Challenging', description: 'Complex questions that test depth', difficulty: 4 },
]

const questionBank: Record<string, Record<string, string[]>> = {
  supportive: {
    default: [
      'Tell me about a project you enjoyed working on.',
      'What are you most proud of in your career?',
      'Describe a time you helped someone at work.',
      'What do you enjoy most about your field?',
      'Tell me about a skill you recently learned.',
    ],
    it: [
      'What programming language do you enjoy most and why?',
      'Describe a project that taught you something new.',
      'What part of your job do you find most satisfying?',
      'Tell me about a tool you recommend to others.',
      'Describe how you collaborate with your team.',
    ],
  },
  technical: {
    default: [
      'Tell me about a technical project you worked on.',
      'Describe a complex problem you solved.',
      'How do you stay updated with new technologies?',
      'Walk me through your approach to debugging.',
      'Explain a system you designed.',
    ],
    it: [
      'Write a function to reverse a linked list.',
      'Explain the difference between REST and GraphQL.',
      'How would you design a scalable system?',
      'Describe your experience with Agile methodologies.',
      'What are the key principles of clean code?',
    ],
    data: [
      'Explain the difference between supervised and unsupervised learning.',
      'How would you handle missing data in a dataset?',
      'Describe your experience with machine learning pipelines.',
      'What metrics would you use to evaluate a classification model?',
      'Explain overfitting and how to prevent it.',
    ],
  },
  behavioral: {
    default: [
      'Tell me about yourself and your experience.',
      'What are your greatest strengths?',
      'Describe a challenging situation you overcame.',
      'Tell me about a time you failed and what you learned.',
      'Describe a time you worked effectively in a team.',
    ],
    it: [
      'Describe a time you had to learn a new technology quickly.',
      'Tell me about a time you debugged a difficult issue.',
      'Describe your experience working on a team project.',
      'Tell me about a time you had conflicting priorities.',
      'Describe a situation where you had to communicate technical info to non-technical people.',
    ],
    data: [
      'Tell me about a data analysis project you are proud of.',
      'Describe a time you found insights that changed a decision.',
      'How do you ensure data quality and accuracy?',
      'Tell me about a time you presented findings to stakeholders.',
      'Describe your experience collaborating with engineers.',
    ],
  },
  situational: {
    default: [
      'How would you handle a difficult coworker?',
      'What would you do if you missed a deadline?',
      'How would you prioritize multiple urgent tasks?',
      'What would you do if you disagreed with your manager?',
      'How would you handle a project with unclear requirements?',
    ],
    it: [
      'How would you handle a production outage?',
      'What would you do if you discovered a security vulnerability?',
      'How would you approach a project with tight deadlines?',
      'What would you do if asked to implement something you believe is wrong?',
      'How would you handle conflicting requirements from stakeholders?',
    ],
    business: [
      'How would you handle an unhappy customer?',
      'What would you do if sales targets were unrealistic?',
      'How would you approach a new market entry?',
      'What would you do if you discovered financial irregularities?',
      'How would you handle a team conflict?',
    ],
  },
  hr: {
    default: [
      'Why do you want to work here?',
      'Where do you see yourself in 5 years?',
      'What are your greatest strengths and weaknesses?',
      'How do you handle stress and pressure?',
      'Describe your ideal work environment.',
    ],
    it: [
      'What type of work culture do you thrive in?',
      'How do you balance technical excellence with deadlines?',
      'Describe your ideal team dynamic.',
      'What excites you most about our company?',
      'How do you continue learning in your field?',
    ],
  },
  challenging: {
    default: [
      'Tell me about the most difficult decision you had to make at work.',
      'Describe a time when you had to defend your position against opposition.',
      'What would you do if you realized your team was going in the wrong direction?',
      'Tell me about a time you failed spectacularly and how you recovered.',
      'How would you handle a situation where you disagreed with company policy?',
    ],
    it: [
      'Describe a system you had to design with extreme constraints.',
      'Tell me about a time you had to make a critical decision under pressure.',
      'How would you handle discovering a major security flaw in production?',
      'Describe a situation where you had to choose between quality and speed.',
      'What would you do if asked to compromise your ethical standards?',
    ],
  },
}

const generateFeedback = (answer: string, options: { hasSpeechImpairment: boolean; hasAnxiety: boolean; hasCognitiveDisability: boolean }) => {
  const length = answer.length
  const hasSTAR = /when|i had|i was|i worked|i led|i managed/i.test(answer)
  const hasQuantification = /\d+%|increased|reduced|improved|saved|managed|drove/i.test(answer)
  const hasSpecificExample = /\b(project|team|customers|clients|stakeholders|users|product|system)\b/i.test(answer)
  const hasEmotion = /\b(feel|felt|happy|sad|excited|frustrated|proud|passionate|grateful)\b/i.test(answer)
  
  let score = 50
  const strengths: string[] = []
  const improvements: string[] = []
  
  if (hasSTAR) {
    score += 15
    strengths.push('Great use of the STAR method to structure your answer')
  }
  if (hasQuantification) {
    score += 15
    strengths.push('You provided measurable results that demonstrate your impact')
  }
  if (hasSpecificExample) {
    score += 10
    strengths.push('Your specific examples make your experience tangible')
  }
  if (length > 50 && length < 200) {
    score += 10
    strengths.push('You kept your answer focused and concise')
  }
  if (length >= 200) {
    score += 5
    strengths.push('You provided comprehensive detail')
  }
  if (hasEmotion && !options.hasSpeechImpairment) {
    score += 5
    strengths.push('Sharing your feelings makes you relatable')
  }
  
  if (!hasSTAR && !options.hasCognitiveDisability) {
    improvements.push('Try the STAR method: Situation, Task, Action, Result')
  }
  if (!hasQuantification) {
    improvements.push('Adding numbers like "increased by 30%" strengthens your answer')
  }
  if (!hasSpecificExample) {
    improvements.push('Specific examples from your work make answers memorable')
  }
  if (length < 30 && !options.hasSpeechImpairment) {
    improvements.push('A bit more detail would help - share what comes to mind')
  }
  
  let feedback = ''
  if (options.hasAnxiety || options.hasSpeechImpairment) {
    feedback = strengths.length > 0 
      ? strengths[0] + '. ' + (improvements.length > 0 ? improvements[0] : "You're doing great!")
      : "Take your time - you're doing well!"
  } else {
    feedback = strengths.length > 0 
      ? strengths[0] + (improvements.length > 0 ? '. ' + improvements[0] : '.')
      : improvements.length > 0 ? improvements[0] : 'Keep practicing!'
  }
  
  return { feedback, score: Math.min(score, 100), strengths, improvements }
}

const simplifyQuestion = (question: string): string => {
  const simplifications: Record<string, string> = {
    'Tell me about yourself and your experience.': 'Tell me about yourself.',
    'Describe a challenging situation you overcame.': 'Tell me about a hard time at work.',
    'What are your greatest strengths and weaknesses?': 'What are you good at? What do you work on?',
    'Where do you see yourself in 5 years?': 'What do you want to do later?',
    'How do you handle stress and pressure?': 'How do you deal with hard days?',
    'Describe a time you failed and what you learned.': 'Tell me about something that didn\'t go well.',
    'Tell me about a time you worked effectively in a team.': 'Tell me about working with others.',
  }
  return simplifications[question] || question
}

export default function Interview() {
  const profile = JSON.parse(localStorage.getItem('userProfile') || '{}')
  const disabilities = profile.disabilities || []
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  
  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem('theme') || 'dark')
    }
    window.addEventListener('theme-changed', handleThemeChange)
    window.addEventListener('storage', handleThemeChange)
    return () => {
      window.removeEventListener('theme-changed', handleThemeChange)
      window.removeEventListener('storage', handleThemeChange)
    }
  }, [])
  
  const themeColors: Record<string, { bg: string; text: string; accent: string; cardBg: string; border: string }> = {
    light: { bg: '#f5f5f5', text: '#1a1a1a', accent: '#0d9488', cardBg: '#ffffff', border: '#e5e7eb' },
    dark: { bg: '#070707', text: '#ffffff', accent: '#33BC65', cardBg: 'rgba(17, 17, 17, 0.8)', border: 'rgba(51, 188, 101, 0.15)' },
    'high-contrast': { bg: '#000000', text: '#ffffff', accent: '#ffff00', cardBg: '#111111', border: '#ffffff' },
    protanopia: { bg: '#1a1a2e', text: '#f0e6d3', accent: '#7eb8da', cardBg: 'rgba(30, 30, 60, 0.8)', border: 'rgba(126, 184, 218, 0.3)' },
    deuteranopia: { bg: '#1a1a2e', text: '#f5f0e6', accent: '#b8a8d9', cardBg: 'rgba(30, 30, 50, 0.8)', border: 'rgba(184, 168, 217, 0.3)' },
    tritanopia: { bg: '#1a1a1a', text: '#f0f0f0', accent: '#f0a07a', cardBg: 'rgba(40, 30, 30, 0.8)', border: 'rgba(240, 160, 122, 0.3)' }
  }
  const colors = themeColors[theme] || themeColors.dark
  
  const hasHearingImpairment = disabilities.includes('hearing')
  const hasVisualImpairment = disabilities.includes('visual')
  const hasSpeechImpairment = disabilities.includes('speech')
  const hasVerbalImpairment = disabilities.includes('verbal')
  const hasMotorDisability = disabilities.includes('motor')
  const hasNeurodivergent = disabilities.includes('neurodivergent') || disabilities.includes('adhd') || disabilities.includes('autism')
  const hasAnxiety = disabilities.includes('anxiety')
  const hasCognitiveDisability = disabilities.includes('cognitive') || disabilities.includes('dyslexia')
  
  const [selectedRole, setSelectedRole] = useState(profile.role || '')
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [selectedMode, setSelectedMode] = useState('supportive')
  const [session, setSession] = useState<{
    questions: string[];
    currentIndex: number;
    paused: boolean;
    answers: string[];
    startTime: number;
    retryCount: number;
    pausedAt: number | null;
  } | null>(null)
  const [answer, setAnswer] = useState('')
  const [, setOriginalAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState<{ feedback: string; score: number; strengths: string[]; improvements: string[] } | null>(null)
  const [simplifiedMode, setSimplifiedMode] = useState(hasCognitiveDisability || hasNeurodivergent)
  const [showTimer, setShowTimer] = useState(!hasAnxiety && !hasNeurodivergent)
  const [timeLeft, setTimeLeft] = useState(hasAnxiety ? 300 : 120)
  const [isPaused, setIsPaused] = useState(false)
  const [, setQuestionStartTime] = useState(0)
  const [anxietyLevel] = useState<'low' | 'medium' | 'high'>(hasAnxiety ? 'high' : 'low')
  const [reassuranceShown, setReassuranceShown] = useState(false)
  const [keyboardNav, setKeyboardNav] = useState(hasMotorDisability || hasVisualImpairment)
  
  const [audioOn, setAudioOn] = useState(!hasHearingImpairment || hasVisualImpairment)
  const [videoOn, setVideoOn] = useState(hasVerbalImpairment || hasMotorDisability || hasSpeechImpairment)
  const [videoError, setVideoError] = useState<string | null>(null)
  const [videoSupported] = useState(() => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia))
  const [signLanguage, setSignLanguage] = useState(hasHearingImpairment)
  const [largeText, setLargeText] = useState(hasVisualImpairment || hasCognitiveDisability)
  const [signAvatarActive, setSignAvatarActive] = useState(false)
  const [currentSign, setCurrentSign] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [voiceInputSupported, setVoiceInputSupported] = useState(false)
  const [voiceInputOn, setVoiceInputOn] = useState(hasMotorDisability || hasSpeechImpairment)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoStreamRef = useRef<MediaStream | null>(null)
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      setVoiceInputSupported(true)
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'
      
      recognition.onresult = (event) => {
        let transcript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript
        }
        setAnswer(prev => prev + ' ' + transcript)
      }
      
      recognition.onerror = () => {
        setIsRecording(false)
      }
      
      recognition.onend = () => {
        setIsRecording(false)
      }
      
      recognitionRef.current = recognition
    }
  }, [])

  useEffect(() => {
    if (videoOn) {
      setVideoError(null)
      if (videoStreamRef.current) {
        videoStreamRef.current.getTracks().forEach(track => track.stop())
      }
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream => {
          videoStreamRef.current = stream
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch(() => {
          setVideoError('Camera access denied. Please allow camera access in your browser settings.')
        })
    } else {
      if (videoStreamRef.current) {
        videoStreamRef.current.getTracks().forEach(track => track.stop())
        videoStreamRef.current = null
      }
    }
    
    return () => {
      if (videoStreamRef.current) {
        videoStreamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [videoOn])

  useEffect(() => {
    if (signLanguage && session) {
      setSignAvatarActive(true)
      const interval = setInterval(() => {
        setCurrentSign(prev => (prev + 1) % 6)
      }, 1500)
      return () => {
        clearInterval(interval)
        setSignAvatarActive(false)
      }
    }
  }, [signLanguage, session?.currentIndex])

  useEffect(() => {
    if (signLanguage && session) {
      setSignAvatarActive(true)
    }
  }, [session?.currentIndex])

  useEffect(() => {
    if (session && showTimer && !isPaused && !showFeedback) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            return hasAnxiety ? 300 : 120
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [session, showTimer, isPaused, showFeedback, hasAnxiety])

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window && audioOn) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = hasNeurodivergent ? 0.8 : 0.9
      utterance.pitch = 1
      speechRef.current = utterance
      window.speechSynthesis.speak(utterance)
    }
  }, [audioOn, hasNeurodivergent])

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }

  const toggleVoiceInput = () => {
    if (!recognitionRef.current || !voiceInputOn) return
    
    if (isRecording) {
      recognitionRef.current.stop()
      setIsRecording(false)
    } else {
      setAnswer('')
      recognitionRef.current.start()
      setIsRecording(true)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!session || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return
      
      if (e.key === ' ' && !isPaused) {
        e.preventDefault()
        if (!showFeedback) {
          submitAnswer()
        } else {
          nextQuestion()
        }
      }
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault()
        repeatQuestion()
      }
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault()
        togglePause()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [session, showFeedback, isPaused, answer])

  const repeatQuestion = () => {
    if (session) {
      stopSpeaking()
      setTimeout(() => speak(session.questions[session.currentIndex]), 300)
    }
  }

  const togglePause = () => {
    if (!session) return
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }
    setIsPaused(!isPaused)
    if (!isPaused) {
      setSession({ ...session, pausedAt: Date.now() })
    }
  }

  const startInterview = () => {
    const mode = hasAnxiety || hasNeurodivergent ? 'supportive' : selectedMode
    const industryQuestions = questionBank[mode]?.[selectedIndustry] || questionBank[mode]?.['default'] || questionBank['supportive']['default']
    const shuffled = [...industryQuestions].sort(() => Math.random() - 0.5).slice(0, 5)
    
    const newSession = {
      questions: shuffled,
      currentIndex: 0,
      paused: false,
      answers: [],
      startTime: Date.now(),
      retryCount: 0,
      pausedAt: null
    }
    
    setSession(newSession)
    setAnswer('')
    setOriginalAnswer('')
    setShowFeedback(false)
    setFeedback(null)
    setTimeLeft(hasAnxiety ? 300 : 120)
    setIsPaused(false)
    setQuestionStartTime(Date.now())
    setReassuranceShown(false)
    
    if (audioOn || hasVisualImpairment || hasAnxiety) {
      setTimeout(() => {
        const intro = hasAnxiety 
          ? "Take a breath. There's no rush. "
          : ""
        speak(intro + shuffled[0])
      }, 500)
    }
    
    if (voiceInputOn && voiceInputSupported && recognitionRef.current) {
      setTimeout(() => {
        try {
          recognitionRef.current?.start()
          setIsRecording(true)
        } catch {}
      }, 1000)
    }
    
    if (videoOn && videoSupported) {
      setTimeout(() => {
        setVideoError(null)
        if (videoStreamRef.current) {
          videoStreamRef.current.getTracks().forEach(track => track.stop())
        }
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
          .then(stream => {
            videoStreamRef.current = stream
            if (videoRef.current) {
              videoRef.current.srcObject = stream
            }
          })
          .catch(() => {
            setVideoError('Camera access denied. Please allow camera access in your browser settings.')
          })
      }, 500)
    }
  }

  const submitAnswer = () => {
    if (!answer.trim() || !session) return

    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }

    const newAnswers = [...session.answers, answer]
    const newSession = { ...session, answers: newAnswers }
    setSession(newSession)

    const newFeedback = generateFeedback(answer, {
      hasSpeechImpairment,
      hasAnxiety,
      hasCognitiveDisability
    })
    setFeedback(newFeedback)
    setShowFeedback(true)
    setOriginalAnswer(answer)

    saveToHistory(newAnswers, newFeedback.score)
    stopSpeaking()
  }

  const retryAnswer = () => {
    if (!session) return
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }
    setAnswer('')
    setOriginalAnswer('')
    setShowFeedback(false)
    setFeedback(null)
    setSession({ ...session, retryCount: session.retryCount + 1 })
    setTimeLeft(hasAnxiety ? 300 : 120)
  }

  const nextQuestion = () => {
    if (!session) return
    
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }
    
    if (session.currentIndex < session.questions.length - 1) {
      const nextIndex = session.currentIndex + 1
      const nextMode = anxietyLevel === 'high' ? 'supportive' : 
                       anxietyLevel === 'medium' && nextIndex > 2 ? 'behavioral' : selectedMode
      
      const nextQuestions = questionBank[nextMode]?.[selectedIndustry] || questionBank[nextMode]?.['default'] || questionBank['supportive']['default']
      const nextQuestion = nextQuestions[nextIndex % nextQuestions.length]
      
      setSession({ ...session, currentIndex: nextIndex })
      setAnswer('')
      setOriginalAnswer('')
      setShowFeedback(false)
      setFeedback(null)
      setTimeLeft(hasAnxiety ? 300 : 120)
      setIsPaused(false)
      setQuestionStartTime(Date.now())
      setReassuranceShown(false)
      
      if (audioOn || hasVisualImpairment || hasAnxiety) {
        const intro = hasAnxiety ? "Good. Take your time with this one. " : ""
        setTimeout(() => speak(intro + nextQuestion), 500)
      }
      
      if (voiceInputOn && voiceInputSupported && recognitionRef.current) {
        setTimeout(() => {
          try {
            recognitionRef.current?.start()
            setIsRecording(true)
          } catch {}
        }, 1000)
      }
    } else {
      setSession(null)
    }
  }

  const saveToHistory = (_answers: string[], score: number) => {
    const history = JSON.parse(localStorage.getItem('interviewHistory') || '[]')
    history.push({
      date: new Date().toISOString(),
      role: selectedRole || selectedIndustry,
      mode: selectedMode,
      score,
      communication: Math.round(score * 0.9),
      reasoning: Math.round(score * 0.85),
      readiness: Math.round(score * 0.9),
      anxietyDetected: anxietyLevel !== 'low'
    })
    localStorage.setItem('interviewHistory', JSON.stringify(history.slice(-20)))
  }

  const currentQuestion = session?.questions[session.currentIndex] || ''
  const displayQuestion = simplifiedMode ? simplifyQuestion(currentQuestion) : currentQuestion

  const timerProgress = hasAnxiety 
    ? ((300 - timeLeft) / 300) * 100 
    : ((120 - timeLeft) / 120) * 100

  if (!session) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: colors.bg,
        position: 'relative',
        overflow: 'hidden'
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

        <header style={{
          background: 'rgba(11, 11, 11, 0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(51, 188, 101, 0.1)',
          padding: '1.25rem 2.5rem'
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <div style={{
                width: '44px',
                height: '44px',
                background: 'linear-gradient(135deg, #33BC65 0%, #28a653 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.35rem',
                boxShadow: '0 4px 20px rgba(51, 188, 101, 0.3)'
              }}>
                ◈
              </div>
              <span style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.5px' }}>AccessPrep</span>
            </Link>
            <Link to="/dashboard" style={{ fontWeight: 500, color: '#737373', textDecoration: 'none' }}>← Back</Link>
          </div>
        </header>

        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem', position: 'relative', zIndex: 1 }}>
          <h1 style={{ 
            fontSize: '2.25rem', 
            fontWeight: 800, 
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #a3a3a3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-1px'
          }}>
            Mock Interview
          </h1>
          <p style={{ color: '#525252', marginBottom: '2rem', fontSize: '1.05rem' }}>
            {hasAnxiety ? "Take it easy - this is a safe space to practice." : 
             hasNeurodivergent ? "We'll go at your pace, with no pressure." :
             "Practice with AI-powered feedback tailored to your needs"}
          </p>

          <div style={{
            background: 'rgba(17, 17, 17, 0.8)',
            border: '1px solid rgba(51, 188, 101, 0.15)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '1.5rem'
          }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', color: '#e5e5e5', fontSize: '0.95rem' }}>Select Industry</label>
            <select 
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                border: '1px solid rgba(51, 188, 101, 0.2)',
                borderRadius: '12px',
                background: 'rgba(17, 17, 17, 0.8)',
                color: '#fff',
                fontSize: '1rem',
                marginBottom: '1.5rem',
                outline: 'none'
              }}
            >
              <option value="" style={{ color: '#737373' }}>Choose an industry...</option>
              {industries.map(ind => (
                <option key={ind.id} value={ind.id} style={{ background: '#111' }}>{ind.label}</option>
              ))}
            </select>

            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', color: '#e5e5e5', fontSize: '0.95rem' }}>Target Role</label>
            <select 
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                border: '1px solid rgba(51, 188, 101, 0.2)',
                borderRadius: '12px',
                background: 'rgba(17, 17, 17, 0.8)',
                color: '#fff',
                fontSize: '1rem',
                marginBottom: '1.5rem',
                outline: 'none'
              }}
            >
              <option value="" style={{ color: '#737373' }}>Choose a role...</option>
              {selectedIndustry && industries.find(i => i.id === selectedIndustry)?.roles.map(role => (
                <option key={role} value={role} style={{ background: '#111' }}>{role}</option>
              ))}
            </select>

            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', color: '#e5e5e5', fontSize: '0.95rem' }}>Interview Mode</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              {interviewModes.map(mode => (
                <div
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  style={{
                    padding: '1.25rem',
                    border: `2px solid ${selectedMode === mode.id ? '#33BC65' : 'rgba(51, 188, 101, 0.2)'}`,
                    borderRadius: '14px',
                    cursor: 'pointer',
                    background: selectedMode === mode.id ? 'rgba(51, 188, 101, 0.1)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: '0.35rem', color: '#fff', fontSize: '1rem' }}>{mode.label}</div>
                  <div style={{ fontSize: '0.85rem', color: '#737373' }}>{mode.description}</div>
                </div>
              ))}
            </div>

            <button 
              onClick={startInterview}
              disabled={!selectedIndustry}
              style={{
                width: '100%',
                padding: '1rem 2rem',
                background: selectedIndustry ? 'linear-gradient(135deg, #33BC65 0%, #28a653 100%)' : 'rgba(51, 188, 101, 0.3)',
                border: 'none',
                borderRadius: '12px',
                color: selectedIndustry ? '#fff' : 'rgba(255,255,255,0.5)',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: selectedIndustry ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease'
              }}
            >
              {hasAnxiety ? "Start (take your time)" : hasNeurodivergent ? "Start when ready" : "Start Interview"}
            </button>
          </div>

          <div style={{
            background: 'rgba(17, 17, 17, 0.8)',
            border: '1px solid rgba(51, 188, 101, 0.15)',
            borderRadius: '20px',
            padding: '1.5rem'
          }}>
            <h3 style={{ fontWeight: 600, marginBottom: '1.25rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#33BC65' }}>◈</span> Accessibility Options
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', color: '#a3a3a3' }}>
                <input 
                  type="checkbox" 
                  checked={audioOn} 
                  onChange={(e) => setAudioOn(e.target.checked)}
                  style={{ accentColor: '#33BC65' }}
                />
                <span>Audio Feedback</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', color: '#a3a3a3' }}>
                <input 
                  type="checkbox" 
                  checked={signLanguage} 
                  onChange={(e) => setSignLanguage(e.target.checked)}
                  style={{ accentColor: '#33BC65' }}
                />
                <span>Sign Language</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', color: '#a3a3a3' }}>
                <input 
                  type="checkbox" 
                  checked={largeText} 
                  onChange={(e) => setLargeText(e.target.checked)}
                  style={{ accentColor: '#33BC65' }}
                />
                <span>Large Text</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', color: '#a3a3a3' }}>
                <input 
                  type="checkbox" 
                  checked={showTimer} 
                  onChange={(e) => setShowTimer(e.target.checked)}
                  style={{ accentColor: '#33BC65' }}
                />
                <span>Show Timer</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', color: '#a3a3a3' }}>
                <input 
                  type="checkbox" 
                  checked={simplifiedMode} 
                  onChange={(e) => setSimplifiedMode(e.target.checked)}
                  style={{ accentColor: '#33BC65' }}
                />
                <span>Simple Questions</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', color: '#a3a3a3' }}>
                <input 
                  type="checkbox" 
                  checked={keyboardNav} 
                  onChange={(e) => setKeyboardNav(e.target.checked)}
                  style={{ accentColor: '#33BC65' }}
                />
                <span>Keyboard Nav</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', color: '#a3a3a3' }}>
                <input 
                  type="checkbox" 
                  checked={videoOn} 
                  onChange={(e) => setVideoOn(e.target.checked)}
                  disabled={!videoSupported}
                  style={{ accentColor: '#33BC65' }}
                />
                <span>📹 Video Input {!videoSupported && '(Not supported)'}</span>
              </label>
              {voiceInputSupported && (
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', color: '#a3a3a3' }}>
                  <input 
                    type="checkbox" 
                    checked={voiceInputOn} 
                    onChange={(e) => setVoiceInputOn(e.target.checked)}
                    style={{ accentColor: '#33BC65' }}
                  />
                  <span>🎤 Voice Input</span>
                </label>
              )}
            </div>
            
            {disabilities.length > 0 && (
              <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(51, 188, 101, 0.1)' }}>
                <div style={{ fontSize: '0.8rem', color: '#525252', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Your Profile
                </div>
                <div style={{ color: '#33BC65', fontSize: '0.95rem' }}>
                  {disabilities.join(', ')}
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#525252', textAlign: 'center' }}>
            Keyboard: Space = Submit/Next | R = Repeat | P = Pause
          </div>
        </main>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#070707',
      position: 'relative'
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

      <header style={{
        background: 'rgba(11, 11, 11, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(51, 188, 101, 0.1)',
        padding: '1rem 2rem'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #33BC65 0%, #28a653 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem'
            }}>
              ◈
            </div>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>AccessPrep</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {videoSupported && (
              <button
                onClick={() => {
                  if (videoOn) {
                    if (videoStreamRef.current) {
                      videoStreamRef.current.getTracks().forEach(track => track.stop())
                      videoStreamRef.current = null
                    }
                    setVideoOn(false)
                  } else {
                    setVideoError(null)
                    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                      .then(stream => {
                        videoStreamRef.current = stream
                        if (videoRef.current) {
                          videoRef.current.srcObject = stream
                        }
                        setVideoOn(true)
                      })
                      .catch(() => {
                        setVideoError('Camera access denied.')
                      })
                  }
                }}
                style={{
                  background: videoOn ? 'rgba(51, 188, 101, 0.2)' : 'transparent',
                  border: '1px solid rgba(51, 188, 101, 0.3)',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  color: videoOn ? '#33BC65' : '#a3a3a3',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                {videoOn ? '📹 On' : '📷 Off'}
              </button>
            )}
            <button
              onClick={togglePause}
              style={{
                background: isPaused ? 'rgba(51, 188, 101, 0.2)' : 'transparent',
                border: '1px solid rgba(51, 188, 101, 0.3)',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                color: isPaused ? '#33BC65' : '#a3a3a3',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              {isPaused ? '▶ Resume' : '⏸ Pause'}
            </button>
            <span style={{ color: '#525252', fontSize: '0.9rem' }}>
              {hasAnxiety ? "Take your time" : `Question ${session.currentIndex + 1} of ${session.questions.length}`}
            </span>
            <Link to="/dashboard" style={{ fontWeight: 500, color: '#737373', textDecoration: 'none' }}>Exit</Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', position: 'relative', zIndex: 1 }}>
        {isPaused && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7, 7, 7, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            flexDirection: 'column',
            gap: '2rem'
          }}>
            <div style={{ fontSize: '4rem' }}>⏸</div>
            <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 600 }}>Interview Paused</div>
            <div style={{ color: '#737373', fontSize: '1rem', marginBottom: '1rem' }}>
              Take a breath. You're in control.
            </div>
            <button
              onClick={togglePause}
              style={{
                padding: '1rem 3rem',
                background: 'linear-gradient(135deg, #33BC65 0%, #28a653 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Resume When Ready
            </button>
          </div>
        )}

        {videoOn && (
          <div style={{ marginBottom: '1.5rem', borderRadius: '16px', overflow: 'hidden', background: '#111', border: `2px solid ${colors.accent}40` }}>
            {videoError ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📷</div>
                <div style={{ fontSize: '0.9rem' }}>{videoError}</div>
                <button 
                  onClick={() => setVideoOn(false)}
                  style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid #ef4444',
                    borderRadius: '8px',
                    color: '#ef4444',
                    cursor: 'pointer'
                  }}
                >
                  Disable Video
                </button>
              </div>
            ) : (
              <div style={{ position: 'relative' }}>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', backgroundColor: '#000' }}
                />
                <div style={{ 
                  position: 'absolute', 
                  top: '8px', 
                  right: '8px',
                  display: 'flex',
                  gap: '8px'
                }}>
                  <button 
                    onClick={() => setVideoOn(false)}
                    style={{
                      padding: '6px 12px',
                      background: 'rgba(239, 68, 68, 0.9)',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    ✕ Off
                  </button>
                </div>
                <div style={{ 
                  position: 'absolute', 
                  bottom: '8px', 
                  left: '8px', 
                  background: 'rgba(0,0,0,0.7)', 
                  color: '#fff', 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span style={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    background: '#22c55e',
                    animation: 'pulse 1s infinite'
                  }} />
                  📹 Live
                </div>
              </div>
            )}
          </div>
        )}

        {signLanguage && (
          <div style={{
            marginBottom: '1.5rem',
            padding: '1.5rem',
            background: 'rgba(17, 17, 17, 0.9)',
            border: '1px solid rgba(51, 188, 101, 0.3)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, rgba(51, 188, 101, 0.3) 0%, rgba(18, 220, 239, 0.2) 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              flexShrink: 0,
              animation: signAvatarActive ? 'sign-pulse 1.5s ease-in-out infinite' : 'none',
              boxShadow: signAvatarActive ? '0 0 30px rgba(51, 188, 101, 0.5)' : 'none'
            }}>
              {['🤟', '👋', '✋', '🤲', '👐', '👌'][currentSign]}
            </div>
            <div>
              <div style={{ fontWeight: 600, color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem' }}>🤟</span>
                Sign Language Avatar
                <span style={{ 
                  fontSize: '0.7rem', 
                  padding: '0.2rem 0.5rem', 
                  background: signAvatarActive ? 'rgba(51, 188, 101, 0.3)' : 'rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  color: signAvatarActive ? '#5DFFD9' : '#737373'
                }}>
                  {signAvatarActive ? '● Active' : '○ Ready'}
                </span>
              </div>
              <div style={{ color: '#737373', fontSize: '0.9rem' }}>
                {signAvatarActive 
                  ? 'Translating question to ASL signs...' 
                  : 'Sign language avatar will appear when question is asked'}
              </div>
            </div>
          </div>
        )}

        <div style={{
          background: 'rgba(17, 17, 17, 0.8)',
          border: '1px solid rgba(51, 188, 101, 0.15)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ 
            padding: '1.5rem', 
            background: anxietyLevel === 'high' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(51, 188, 101, 0.1)', 
            borderRadius: '14px',
            marginBottom: '1.5rem',
            border: anxietyLevel === 'high' ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(51, 188, 101, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <h2 style={{ 
                fontSize: largeText ? '1.5rem' : '1.25rem', 
                fontWeight: 700, 
                color: '#fff',
                lineHeight: 1.4
              }}>
                {displayQuestion}
              </h2>
              <button
                onClick={repeatQuestion}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#33BC65',
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                  padding: '0.5rem'
                }}
                title="Repeat question (R)"
              >
                🔊
              </button>
            </div>
            
            {showTimer && !hasAnxiety && (
              <div style={{ marginTop: '1rem' }}>
                <div style={{ 
                  height: '4px', 
                  background: 'rgba(51, 188, 101, 0.2)', 
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    height: '100%', 
                    width: `${100 - timerProgress}%`,
                    background: timerProgress > 80 ? '#ef4444' : timerProgress > 50 ? '#f59e0b' : '#33BC65',
                    transition: 'width 1s linear'
                  }} />
                </div>
                <div style={{ fontSize: '0.8rem', color: '#525252', marginTop: '0.5rem', textAlign: 'right' }}>
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
              </div>
            )}

            {hasAnxiety && !reassuranceShown && (
              <div style={{ 
                marginTop: '1rem', 
                padding: '0.75rem 1rem',
                background: 'rgba(51, 188, 101, 0.1)',
                borderRadius: '8px',
                color: '#33BC65',
                fontSize: '0.9rem'
              }}>
                💚 Take your time. There's no rush. You can pause anytime.
              </div>
            )}
          </div>

          <div style={{ position: 'relative' }}>
            {voiceInputSupported && (
              <button
                onClick={toggleVoiceInput}
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  background: isRecording ? 'rgba(239, 68, 68, 0.2)' : 'rgba(51, 188, 101, 0.2)',
                  border: `1px solid ${isRecording ? '#ef4444' : 'rgba(51, 188, 101, 0.3)'}`,
                  borderRadius: '8px',
                  padding: '0.5rem 0.75rem',
                  color: isRecording ? '#ef4444' : '#33BC65',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  zIndex: 10,
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ 
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: isRecording ? '#ef4444' : '#33BC65',
                  animation: isRecording ? 'pulse 1s infinite' : 'none'
                }} />
                {isRecording ? 'Stop' : '🎤 Voice'}
              </button>
            )}
            <textarea
              ref={inputRef}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={
                hasSpeechImpairment 
                  ? "Type your answer here... (No need to worry about fluency - we focus on content)"
                  : hasCognitiveDisability
                  ? "Take your time. Write what comes to mind."
                  : "Speak or type your answer..."
              }
              disabled={showFeedback}
              style={{
                width: '100%',
                padding: '1rem',
                paddingRight: voiceInputSupported ? '6rem' : '1rem',
                border: '1px solid rgba(51, 188, 101, 0.2)',
                borderRadius: '12px',
                background: 'rgba(17, 17, 17, 0.8)',
                color: '#fff',
                fontSize: largeText ? '1.2rem' : '1rem',
                minHeight: '160px',
                resize: 'vertical',
                outline: 'none',
                fontFamily: 'inherit',
                lineHeight: 1.6
              }}
            />
          </div>

          {!showFeedback ? (
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
              <button 
                onClick={submitAnswer}
                disabled={!answer.trim()}
                style={{
                  flex: 1,
                  padding: '1rem 2rem',
                  background: answer.trim() ? 'linear-gradient(135deg, #33BC65 0%, #28a653 100%)' : 'rgba(51, 188, 101, 0.3)',
                  border: 'none',
                  borderRadius: '12px',
                  color: answer.trim() ? '#fff' : 'rgba(255,255,255,0.5)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: answer.trim() ? 'pointer' : 'not-allowed',
                  minWidth: '200px'
                }}
              >
                Submit Answer (Space)
              </button>
              {session.retryCount < 2 && (
                <button 
                  onClick={retryAnswer}
                  style={{
                    padding: '1rem 1.5rem',
                    background: 'transparent',
                    border: '1px solid rgba(51, 188, 101, 0.3)',
                    borderRadius: '12px',
                    color: '#a3a3a3',
                    fontSize: '0.95rem',
                    cursor: 'pointer'
                  }}
                >
                  Retry
                </button>
              )}
            </div>
          ) : (
            <div style={{ marginTop: '1.5rem' }}>
              {feedback && (
                <div style={{ 
                  padding: '1.5rem', 
                  background: feedback.score >= 70 ? 'rgba(51, 188, 101, 0.1)' : feedback.score >= 50 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                  borderRadius: '14px',
                  marginBottom: '1.5rem',
                  border: `1px solid ${feedback.score >= 70 ? 'rgba(51, 188, 101, 0.3)' : feedback.score >= 50 ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <span style={{ 
                      fontSize: '2.5rem', 
                      fontWeight: 800,
                      color: feedback.score >= 70 ? '#33BC65' : feedback.score >= 50 ? '#f59e0b' : '#ef4444'
                    }}>
                      {feedback.score}%
                    </span>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 600 }}>Score</div>
                      <div style={{ color: '#737373', fontSize: '0.85rem' }}>
                        {feedback.score >= 70 ? "Great job!" : feedback.score >= 50 ? "Good effort!" : "Keep practicing!"}
                      </div>
                    </div>
                  </div>
                  
                  <p style={{ marginBottom: '1rem', lineHeight: 1.7, color: '#e5e5e5', fontSize: largeText ? '1.1rem' : '0.95rem' }}>
                    {feedback.feedback}
                  </p>
                  
                  {feedback.strengths.length > 0 && (
                    <div style={{ marginBottom: '0.75rem' }}>
                      <strong style={{ color: '#33BC65', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        ✓ {feedback.strengths[0]}
                      </strong>
                    </div>
                  )}
                  {feedback.improvements.length > 0 && (
                    <div style={{ color: '#a3a3a3', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      💡 {feedback.improvements[0]}
                    </div>
                  )}

                  {hasSpeechImpairment && (
                    <div style={{ 
                      marginTop: '1rem', 
                      padding: '0.75rem',
                      background: 'rgba(51, 188, 101, 0.1)',
                      borderRadius: '8px',
                      color: '#33BC65',
                      fontSize: '0.85rem'
                    }}>
                      Note: We evaluate content quality only - never fluency or speed.
                    </div>
                  )}
                </div>
              )}
              
              <button 
                onClick={nextQuestion}
                style={{
                  width: '100%',
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #33BC65 0%, #28a653 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {session.currentIndex < session.questions.length - 1 
                  ? (hasAnxiety ? "Next (when ready)" : "Next Question →")
                  : "Finish Interview"}
              </button>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          {session.questions.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: idx === session.currentIndex ? '24px' : '10px',
                height: '10px',
                borderRadius: '5px',
                background: idx === session.currentIndex 
                  ? '#33BC65' 
                  : idx < session.currentIndex 
                    ? '#28a653' 
                    : 'rgba(51, 188, 101, 0.2)',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#525252', textAlign: 'center' }}>
          Space: Submit/Next | R: Repeat | P: Pause
        </div>
      </main>
    </div>
  )
}
