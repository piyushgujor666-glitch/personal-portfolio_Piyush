import { Check } from 'lucide-react'
import { aboutHighlights, profile } from '../data/resume'
import Reveal, { SectionHeader } from './Reveal'
import Tilt from './Tilt'

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader eyebrow="About" title="Student developer focused on the frontend" />
        <div className="about-grid">
          <Reveal className="about-text">
            <p>{profile.summary}</p>
            <ul className="check-list">
              {aboutHighlights.map((h) => (
                <li key={h}><Check size={18} aria-hidden="true" /> <span>{h}</span></li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <Tilt className="glass profile-panel">
              <div className="monogram" aria-hidden="true">PG</div>
              <div>
                <h3>{profile.name}</h3>
                <p className="muted">{profile.role}</p>
              </div>
              <div>
                <div className="info-row"><span>Location</span><span>{profile.location}</span></div>
                <div className="info-row"><span>University</span><span>SRMIST, Kattankulathur</span></div>
                <div className="info-row"><span>Program</span><span>B.Tech CSE · 2025–2029</span></div>
                <div className="info-row"><span>CGPA</span><span>8.40/10</span></div>
              </div>
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
