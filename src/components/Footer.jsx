import { useEffect, useState } from 'react'
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/resume'
import { sections } from './Navbar'
import ExternalLink from './ExternalLink'

export default function Footer() {
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <strong>{profile.name}</strong>
            <p className="muted" style={{ marginTop: 6 }}>CSE student and frontend developer.</p>
          </div>
          <nav className="footer-links" aria-label="Footer">
            {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
          <div className="footer-social">
            <ExternalLink href={profile.github} className="icon-btn" aria-label="GitHub"><Github size={18} /></ExternalLink>
            <ExternalLink href={profile.linkedin} className="icon-btn" aria-label="LinkedIn"><Linkedin size={18} /></ExternalLink>
            <a href={`mailto:${profile.email}`} className="icon-btn" aria-label="Email"><Mail size={18} /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </div>
      {showTop && (
        <button className="to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <ArrowUp size={20} />
        </button>
      )}
    </footer>
  )
}
