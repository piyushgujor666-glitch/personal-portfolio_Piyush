import { Clock, ExternalLink as ExtIcon, Github, Hammer } from 'lucide-react'
import ExternalLink from './ExternalLink'
import Tilt from './Tilt'

function host(url) {
  try { return new URL(url).host } catch { return 'coming-soon' }
}

export default function ProjectCard({ project }) {
  const { title, description, features, tech, liveUrl, sourceUrl, accent, glyph, status } = project
  const inProgress = status === 'in-progress'

  const mock = (
    <div className="thumb" style={{ '--a': accent[0], '--b': accent[1] }} aria-hidden="true">
      <div className="browser">
        <div className="browser-bar">
          <i /><i /><i />
          <span>{liveUrl ? host(liveUrl) : 'coming-soon'}</span>
        </div>
        <div className="browser-body">
          <span className="thumb-glyph">{glyph}</span>
          <div className="mock-lines"><b /><b /><b /></div>
        </div>
      </div>
    </div>
  )

  return (
    <Tilt className="glass project-card">
      {liveUrl ? <ExternalLink href={liveUrl} aria-label={`${title}: open live demo in a new tab`} tabIndex={-1}>{mock}</ExternalLink> : mock}
      <div className="project-body">
        <div className="status-row">
          {inProgress ? (
            <span className="status progress"><Hammer size={13} /> Currently in progress</span>
          ) : (
            <span className="status live"><i className="pulse" /> Live</span>
          )}
        </div>
        <h3>{liveUrl ? <ExternalLink href={liveUrl}>{title}</ExternalLink> : title}</h3>
        <p className="project-desc">{description}</p>
        <ul className="feature-list">{features.map((f) => <li key={f}>{f}</li>)}</ul>
        <ul className="chips">{tech.map((t) => <li key={t} className="badge badge-accent">{t}</li>)}</ul>
        <div className="project-actions">
          {liveUrl ? (
            <ExternalLink href={liveUrl} className="btn btn-primary btn-sm"><ExtIcon size={16} /> Live Demo</ExternalLink>
          ) : (
            <span className="soon"><Clock size={14} /> Live Demo: Coming Soon</span>
          )}
          {sourceUrl ? (
            <ExternalLink href={sourceUrl} className="btn btn-sm"><Github size={16} /> GitHub</ExternalLink>
          ) : (
            <span className="soon"><Clock size={14} /> Source: Coming Soon</span>
          )}
        </div>
      </div>
    </Tilt>
  )
}
