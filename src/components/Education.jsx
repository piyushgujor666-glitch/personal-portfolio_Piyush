import { GraduationCap } from 'lucide-react'
import { education } from '../data/resume'
import Reveal, { SectionHeader } from './Reveal'

export default function Education() {
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container">
        <SectionHeader eyebrow="Education" title="Academic background" />
        <div className="card-grid">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.07} className="glass edu-card">
              <GraduationCap size={22} style={{ color: 'var(--cyan)' }} aria-hidden="true" />
              <h3>{e.school}</h3>
              <p className="muted">{e.detail}</p>
              <p className="muted">{e.period}</p>
              <p className="edu-score grad-text">{e.score}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
