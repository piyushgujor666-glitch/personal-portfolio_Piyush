import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'

export const sections = [
  ['home', 'Home'], ['skills', 'Skills'], ['experience', 'Experience'],
  ['projects', 'Projects'], ['contact', 'Contact'],
]

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach(([id]) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const links = sections.map(([id, label]) => (
    <a key={id} href={`#${id}`} aria-current={active === id} onClick={() => setOpen(false)}>{label}</a>
  ))

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#home" className="logo" aria-label="Piyush Gujor, back to top"><span>PG</span></a>
        <nav className="nav-links" aria-label="Primary">{links}</nav>
        <div className="nav-actions">
          <a href="/Piyush_Gujor_Resume.pdf" download="Piyush_Gujor_Resume.pdf" className="btn btn-sm nav-resume">Resume</a>
          <button className="icon-btn" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="icon-btn menu-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile">{links}</nav>}
    </header>
  )
}
