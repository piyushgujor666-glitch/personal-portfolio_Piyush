import { learning, skillGroups } from '../data/resume'
import Reveal, { SectionHeader } from './Reveal'

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeader eyebrow="Skills" title="Tools and technologies" sub="Skills listed on my resume, grouped by area. Technologies I'm still learning are shown separately." />
        <div className="skills-grid">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.07} className="glass skill-card">
              <h3>{g.title}</h3>
              <ul className="chips">
                {g.items.map((s) => <li key={s} className="chip" tabIndex={0}>{s}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
        <Reveal className="glass learning">
          <h3>Currently learning</h3>
          <ul className="chips">
            {learning.map((s) => <li key={s} className="chip chip-learn">{s}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
