import { Component, Suspense, lazy } from 'react'
import { ArrowRight, Download, Github, Mail } from 'lucide-react'
import { profile } from '../data/resume'
import { useReducedMotion, useWebGL } from '../hooks/useGitHub'
import ExternalLink from './ExternalLink'

const Scene3D = lazy(() => import('./Scene3D'))

function Fallback() {
  return (
    <div className="scene-fallback" role="img" aria-label="Decorative gradient sphere">
      <div className="orb-fallback" />
    </div>
  )
}

class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() {}
  render() { return this.state.failed ? <Fallback /> : this.props.children }
}

export default function Hero() {
  const reduced = useReducedMotion()
  const webgl = useWebGL()
  const lite = typeof window !== 'undefined' && window.innerWidth < 700

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="glass hero-status badge" style={{ padding: '6px 14px' }}>
            <span className="pulse" aria-hidden="true" /> Interning at Infotact Solutions · CSE @ SRMIST
          </p>
          <h1 id="hero-title">
            Hi, I'm <span className="grad-text">Piyush Gujor</span>
          </h1>
          <p className="hero-sub">Building modern web experiences with React, JavaScript, and creative frontend engineering.</p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">View My Projects <ArrowRight size={18} /></a>
            <ExternalLink href={profile.github} className="btn"><Github size={18} /> Explore My GitHub</ExternalLink>
            <a href={profile.resumeFile} download="Piyush_Gujor_Resume.pdf" className="btn"><Download size={18} /> Download Resume</a>
            <a href="#contact" className="btn"><Mail size={18} /> Contact Me</a>
          </div>
          <dl className="hero-meta">
            <div><dt className="sr-only">Internships</dt><dd style={{ margin: 0 }}><b className="grad-text">3</b><span>Internships</span></dd></div>
            <div><dt className="sr-only">CGPA</dt><dd style={{ margin: 0 }}><b className="grad-text">8.40</b><span>CGPA / 10</span></dd></div>
            <div><dt className="sr-only">Projects</dt><dd style={{ margin: 0 }}><b className="grad-text">3</b><span>Live projects</span></dd></div>
          </dl>
        </div>
        <div className="hero-scene">
          {webgl ? (
            <SceneBoundary>
              <Suspense fallback={<Fallback />}>
                <Scene3D reduced={reduced} lite={lite} />
              </Suspense>
            </SceneBoundary>
          ) : (
            <Fallback />
          )}
        </div>
      </div>
      <a href="#about" className="scroll-indicator" aria-label="Scroll to About section">
        <i aria-hidden="true" /> Scroll
      </a>
    </section>
  )
}
