import { Award } from 'lucide-react'
import { certifications } from '../data/resume'
import ExternalLink from './ExternalLink'
import Reveal, { SectionHeader } from './Reveal'

export default function Certifications() {
  return (
    <section id="certifications" className="section" aria-labelledby="certifications-title">
      <div className="container">
        <SectionHeader eyebrow="Certifications" title="Certifications and achievements" />
        <div className="card-grid">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.07} className="glass cert-card">
              <Award size={22} style={{ color: 'var(--violet)' }} aria-hidden="true" />
              <h3>{c.title}</h3>
              <p className="muted">{c.issuer}{c.date ? ` · ${c.date}` : ''}</p>
              <div>
                <span className={`badge ${c.status === 'In Progress' ? '' : 'badge-accent'}`}>{c.status}</span>
              </div>
              {c.url && <ExternalLink href={c.url} className="btn btn-sm">View credential</ExternalLink>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
