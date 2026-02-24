import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import Interview from './pages/Interview'
import Resume from './pages/Resume'
import Settings from './pages/Settings'
import Progress from './pages/Progress'
import Mentor from './pages/Mentor'
import Strategy from './pages/Strategy'
import SensitiveQuestions from './pages/SensitiveQuestions'
import DeepInterview from './pages/DeepInterview'
import InterviewReplay from './pages/InterviewReplay'
import RealWorldInterview from './pages/RealWorldInterview'

const themeConfigs: Record<string, { bg: string; text: string; accent: string; cardBg: string; border: string }> = {
  light: { bg: '#f5f5f5', text: '#1a1a1a', accent: '#0d9488', cardBg: '#ffffff', border: '#e5e7eb' },
  dark: { bg: '#070707', text: '#ffffff', accent: '#33BC65', cardBg: 'rgba(17, 17, 17, 0.8)', border: 'rgba(51, 188, 101, 0.15)' },
  'high-contrast': { bg: '#000000', text: '#ffffff', accent: '#ffff00', cardBg: '#111111', border: '#ffffff' },
  protanopia: { bg: '#1a1a2e', text: '#f0e6d3', accent: '#7eb8da', cardBg: 'rgba(30, 30, 60, 0.8)', border: 'rgba(126, 184, 218, 0.3)' },
  deuteranopia: { bg: '#1a1a2e', text: '#f5f0e6', accent: '#b8a8d9', cardBg: 'rgba(30, 30, 50, 0.8)', border: 'rgba(184, 168, 217, 0.3)' },
  tritanopia: { bg: '#1a1a1a', text: '#f0f0f0', accent: '#f0a07a', cardBg: 'rgba(40, 30, 30, 0.8)', border: 'rgba(240, 160, 122, 0.3)' }
}

function applyTheme(theme: string) {
  const config = themeConfigs[theme] || themeConfigs.dark
  
  document.documentElement.setAttribute('data-theme', theme === 'high-contrast' ? 'high-contrast' : theme)
  document.documentElement.style.setProperty('--app-bg', config.bg)
  document.documentElement.style.setProperty('--app-text', config.text)
  document.documentElement.style.setProperty('--app-accent', config.accent)
  document.documentElement.style.setProperty('--app-card-bg', config.cardBg)
  document.documentElement.style.setProperty('--app-border', config.border)
  
  document.body.style.background = config.bg
  document.body.style.color = config.text
}

function AppContent() {
  const location = useLocation()
  
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'dark'
    const lowStimulation = localStorage.getItem('lowStimulation') === 'true'
    const dyslexiaFriendly = localStorage.getItem('dyslexiaFriendly') === 'true'
    
    applyTheme(theme)
    document.documentElement.setAttribute('data-low-stimulation', String(lowStimulation))
    
    if (dyslexiaFriendly) {
      document.body.style.fontFamily = '"OpenDyslexic", "Comic Sans MS", sans-serif'
    } else {
      document.body.style.fontFamily = ''
    }
  }, [location])

  useEffect(() => {
    const handleStorageChange = () => {
      const theme = localStorage.getItem('theme') || 'dark'
      const lowStimulation = localStorage.getItem('lowStimulation') === 'true'
      const dyslexiaFriendly = localStorage.getItem('dyslexiaFriendly') === 'true'
      
      applyTheme(theme)
      document.documentElement.setAttribute('data-low-stimulation', String(lowStimulation))
      
      if (dyslexiaFriendly) {
        document.body.style.fontFamily = '"OpenDyslexic", "Comic Sans MS", sans-serif'
      } else {
        document.body.style.fontFamily = ''
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('theme-changed', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('theme-changed', handleStorageChange)
    }
  }, [])
  
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/strategy" element={<Strategy />} />
        <Route path="/sensitive-questions" element={<SensitiveQuestions />} />
        <Route path="/deep-interview" element={<DeepInterview />} />
        <Route path="/replay" element={<InterviewReplay />} />
        <Route path="/realworld" element={<RealWorldInterview />} />
      </Route>
    </Routes>
  )
}

function Layout() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '260px', flex: 1, minHeight: '100vh' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
