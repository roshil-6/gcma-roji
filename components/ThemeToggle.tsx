'use client'

import { useEffect, useState } from 'react'

const LIGHT = 'theme-light'
const DARK = 'theme-dark'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>(LIGHT)

  useEffect(() => {
    const stored = localStorage.getItem('gcma-theme')
    const initial = stored === DARK ? DARK : LIGHT
    setTheme(initial)
    applyTheme(initial)
  }, [])

  const applyTheme = (nextTheme: string) => {
    document.body.classList.remove(LIGHT, DARK)
    document.body.classList.add(nextTheme)
    localStorage.setItem('gcma-theme', nextTheme)
  }

  const toggleTheme = () => {
    const next = theme === LIGHT ? DARK : LIGHT
    setTheme(next)
    applyTheme(next)
  }

  return (
    <div className="fixed top-4 right-4 z-40 text-xs md:text-sm">
      <button
        onClick={toggleTheme}
        className="text-gray-600 hover:text-gold-metallic transition-colors underline-offset-4 hover:underline"
        aria-label="Toggle theme"
      >
        {theme === LIGHT ? 'Dark theme' : 'Light theme'}
      </button>
    </div>
  )
}
