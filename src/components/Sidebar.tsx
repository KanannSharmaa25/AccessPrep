import { NavLink, useNavigate } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">◈</span>
        <span className="logo-text">AccessPrep</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <span className="nav-icon">⊞</span>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/interview" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <span className="nav-icon">◉</span>
          <span>Mock Interview</span>
        </NavLink>
        <NavLink to="/resume" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <span className="nav-icon">◰</span>
          <span>Resume Analyzer</span>
        </NavLink>
        <NavLink to="/mentor" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <span className="nav-icon">🤖</span>
          <span>AI Mentor</span>
        </NavLink>
        <NavLink to="/progress" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <span className="nav-icon">📊</span>
          <span>My Progress</span>
        </NavLink>
        <NavLink to="/strategy" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <span className="nav-icon">🎯</span>
          <span>Strategy Builder</span>
        </NavLink>
        <NavLink to="/sensitive-questions" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <span className="nav-icon">🛡️</span>
          <span>Sensitive Questions</span>
        </NavLink>
        <NavLink to="/deep-interview" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <span className="nav-icon">🧠</span>
          <span>Deep Interview</span>
        </NavLink>
        <NavLink to="/replay" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <span className="nav-icon">🎬</span>
          <span>Interview Replay</span>
        </NavLink>
        <NavLink to="/realworld" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <span className="nav-icon">🏢</span>
          <span>Real-World Mode</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <span className="nav-icon">⚙</span>
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <span className="nav-icon">⎋</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
