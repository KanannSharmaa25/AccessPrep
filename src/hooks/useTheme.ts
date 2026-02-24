import { useState, useEffect } from 'react'

export const themeColors: Record<string, { bg: string; text: string; accent: string; cardBg: string; border: string }> = {
  light: { bg: '#f5f5f5', text: '#1a1a1a', accent: '#0d9488', cardBg: '#ffffff', border: '#e5e7eb' },
  dark: { bg: '#070707', text: '#ffffff', accent: '#33BC65', cardBg: 'rgba(17, 17, 17, 0.8)', border: 'rgba(51, 188, 101, 0.15)' },
  'high-contrast': { bg: '#000000', text: '#ffffff', accent: '#ffff00', cardBg: '#111111', border: '#ffffff' },
  protanopia: { bg: '#1a1a2e', text: '#f0e6d3', accent: '#7eb8da', cardBg: 'rgba(30, 30, 60, 0.8)', border: 'rgba(126, 184, 218, 0.3)' },
  deuteranopia: { bg: '#1a1a2e', text: '#f5f0e6', accent: '#b8a8d9', cardBg: 'rgba(30, 30, 50, 0.8)', border: 'rgba(184, 168, 217, 0.3)' },
  tritanopia: { bg: '#1a1a1a', text: '#f0f0f0', accent: '#f0a07a', cardBg: 'rgba(40, 30, 30, 0.8)', border: 'rgba(240, 160, 122, 0.3)' }
}

export function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const colors = themeColors[theme] || themeColors.dark

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

  return { theme, colors }
}
