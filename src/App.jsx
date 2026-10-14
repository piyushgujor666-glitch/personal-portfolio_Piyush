import { useCallback, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import GitHubSection from './components/GitHubSection'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useReducedMotion } from './hooks/useGitHub'

export default function App() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')
  const reduced = useReducedMotion()

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark'
      document.documentElement.dataset.theme = next
      try { localStorage.setItem('theme', next) } catch { /* storage unavailable */ }
      return next
    })
  }, [])

  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return undefined
    const el = document.getElementById('cursor-light')
    let raf = 0
    const move = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el?.style.setProperty('--mx', `${e.clientX}px`)
        el?.style.setProperty('--my', `${e.clientY}px`)
      })
    }
    window.addEventListener('pointermove', move)
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf) }
  }, [reduced])

  return (
    <>
      <a href="#about" className="skip-link">Skip to content</a>
      <div id="cursor-light" className="cursor-light" aria-hidden="true" />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GitHubSection />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
