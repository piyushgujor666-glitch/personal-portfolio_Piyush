import { useMemo, useState } from 'react'
import { ExternalLink as ExtIcon, GitFork, RefreshCw, Search, Star } from 'lucide-react'
import ExternalLink from './ExternalLink'
import { RepoSkeleton } from './LoadingSkeleton'
import { profile } from '../data/resume'

const fmt = (iso) => {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? 'Unknown' : d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function RepositoryList({ status, repos, totalCount, error, retry }) {
  const [query, setQuery] = useState('')
  const [language, setLanguage] = useState('all')
  const [sort, setSort] = useState('updated')

  const languages = useMemo(() => [...new Set(repos.map((r) => r.language).filter(Boolean))].sort(), [repos])

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return repos
      .filter((r) => (!q || r.name.toLowerCase().includes(q)) && (language === 'all' || r.language === language))
      .sort((a, b) =>
        sort === 'stars'
          ? b.stars - a.stars || new Date(b.updatedAt) - new Date(a.updatedAt)
          : new Date(b.updatedAt) - new Date(a.updatedAt),
      )
  }, [repos, query, language, sort])

  if (status === 'loading') return <RepoSkeleton />

  if (status === 'error') {
    return (
      <div className="glass notice error" role="alert">
        <h3>Couldn't load repositories</h3>
        <p className="muted">{error}</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn btn-sm" onClick={retry}><RefreshCw size={16} /> Retry</button>
          <ExternalLink href={`${profile.github}?tab=repositories`} className="btn btn-primary btn-sm">Browse repositories on GitHub</ExternalLink>
        </div>
      </div>
    )
  }

  if (repos.length === 0) {
    return (
      <div className="glass notice">
        <h3>No public repositories yet</h3>
        <p className="muted">Nothing public to show right now. Check back soon, or visit the profile directly.</p>
        <ExternalLink href={profile.github} className="btn btn-primary btn-sm">Open GitHub profile</ExternalLink>
      </div>
    )
  }

  return (
    <div>
      <div className="repo-tools">
        <label className="sr-only" htmlFor="repo-search">Search repositories by name</label>
        <div style={{ position: 'relative' }}>
          <Search size={16} aria-hidden="true" style={{ position: 'absolute', left: 14, top: 14, color: 'var(--muted)' }} />
          <input id="repo-search" className="field" style={{ paddingLeft: 40 }} type="search" placeholder="Search repositories" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <label className="sr-only" htmlFor="repo-lang">Filter by language</label>
        <select id="repo-lang" className="select" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="all">All languages</option>
          {languages.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        <label className="sr-only" htmlFor="repo-sort">Sort repositories</label>
        <select id="repo-sort" className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="updated">Recently updated</option>
          <option value="stars">Most starred</option>
        </select>
      </div>

      {list.length === 0 ? (
        <div className="glass notice"><p className="muted">No repositories match your search or filter.</p></div>
      ) : (
        <ul className="repo-grid" aria-live="polite">
          {list.map((r) => (
            <li key={r.id} className="glass repo-card">
              <h4>{r.name}</h4>
              <p className="repo-desc">{r.description || 'No description provided.'}</p>
              <div className="repo-meta">
                {r.language ? <span><i className="lang-dot" aria-hidden="true" />{r.language}</span> : <span>Language not detected</span>}
                <span><Star size={13} aria-hidden="true" />{r.stars}<span className="sr-only"> stars</span></span>
                <span><GitFork size={13} aria-hidden="true" />{r.forks}<span className="sr-only"> forks</span></span>
              </div>
              <p className="muted" style={{ fontSize: '.78rem' }}>Updated {fmt(r.updatedAt)}</p>
              <ExternalLink href={r.htmlUrl} className="btn btn-sm" aria-label={`View repository ${r.name} on GitHub`}><ExtIcon size={14} /> View Repository</ExternalLink>
            </li>
          ))}
        </ul>
      )}

      <div className="repo-footer">
        <span>
          Showing {list.length} of {repos.length} retrieved
          {totalCount > repos.length ? ` (profile reports ${totalCount} public repositories; only the first ${repos.length} are loaded)` : ''}
        </span>
        <ExternalLink href={`${profile.github}?tab=repositories`} className="btn btn-sm">View All on GitHub</ExternalLink>
      </div>
    </div>
  )
}
