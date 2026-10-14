import { useMemo, useState } from 'react'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import Reveal, { SectionHeader } from './Reveal'

export default function Projects() {
  const categories = useMemo(() => ['All', ...new Set(projects.flatMap((p) => p.categories))], [])
  const [filter, setFilter] = useState('All')
  const visible = projects.filter((p) => filter === 'All' || p.categories.includes(filter))

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader eyebrow="Projects" title="Things I've built" sub="Live demos open in a new tab. Source buttons go to my GitHub repositories." />
        <Reveal>
          <div className="filters" role="group" aria-label="Filter projects by category">
            {categories.map((c) => (
              <button key={c} className="filter" aria-pressed={filter === c} onClick={() => setFilter(c)}>{c}</button>
            ))}
          </div>
        </Reveal>
        <div className="project-grid">
          {visible.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  )
}
