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

function AppContent() {
  const location = useLocation()
  
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light'
    const lowStimulation = localStorage.getItem('lowStimulation') === 'true'
    const dyslexiaFriendly = localStorage.getItem('dyslexiaFriendly') === 'true'
    
    const themeAttr = theme === 'high-contrast' ? 'high-contrast' : theme === 'blue' ? 'blue-light' : theme
    document.documentElement.setAttribute('data-theme', themeAttr)
    document.documentElement.setAttribute('data-low-stimulation', String(lowStimulation))
    document.body.style.background = ''
    document.body.style.color = ''
    
    if (dyslexiaFriendly) {
      document.body.style.fontFamily = '"OpenDyslexic", "Comic Sans MS", sans-serif'
    } else {
      document.body.style.fontFamily = ''
    }
  }, [location])
  
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light'
    const lowStimulation = localStorage.getItem('lowStimulation') === 'true'
    const dyslexiaFriendly = localStorage.getItem('dyslexiaFriendly') === 'true'
    
    const themeAttr = theme === 'high-contrast' ? 'high-contrast' : theme === 'blue' ? 'blue-light' : theme
    document.documentElement.setAttribute('data-theme', themeAttr)
    document.documentElement.setAttribute('data-low-stimulation', String(lowStimulation))
    document.body.style.background = ''
    document.body.style.color = ''
    
    if (dyslexiaFriendly) {
      document.body.style.fontFamily = '"OpenDyslexic", "Comic Sans MS", sans-serif'
    } else {
      document.body.style.fontFamily = ''
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
