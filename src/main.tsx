import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const theme = localStorage.getItem('theme') || 'light'
const lowStimulation = localStorage.getItem('lowStimulation') === 'true'
const dyslexiaFriendly = localStorage.getItem('dyslexiaFriendly') === 'true'

const themeAttr = theme === 'high-contrast' ? 'high-contrast' : theme === 'blue' ? 'blue-light' : theme
document.documentElement.setAttribute('data-theme', themeAttr)
document.documentElement.setAttribute('data-low-stimulation', String(lowStimulation))

if (dyslexiaFriendly) {
  document.body.style.fontFamily = '"OpenDyslexic", "Comic Sans MS", sans-serif'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
