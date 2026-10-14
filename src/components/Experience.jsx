import { experience } from '../data/resume'
import Reveal, { SectionHeader } from './Reveal'

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeader eyebrow="Experience" title="Internships" />
        <ol className="timeline" style={{ listStyle: 'none', margin: 0 }}>
          {experience.map((e, i) => (
            <Reveal as="li" key={e.company} delay={i * 0.08} className={`glass t-item ${e.period.includes('Present') ? 'current' : ''}`}>
              <div className="t-top">
                <div>
                  <h3>{e.company}</h3>
                  <p className="t-role">{e.role}</p>
                </div>
                <p className="t-meta">{e.period}<br />{e.place}</p>
              </div>
              <ul className="t-points">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
