import React from 'react';
import { Github, ExternalLink, GitFork, Star, Search, RefreshCw, Users, BookOpen, Clock3 } from 'lucide-react';
import { fetchGitHub, githubProfileUrl } from '../services/githubApi';
const dateLabel = value => value ? new Date(value).toLocaleDateString(undefined,{month:'short',year:'numeric'}) : '—';
export default function GitHubSection() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [language, setLanguage] = React.useState('All');
  const [sort, setSort] = React.useState('updated');
  const load = React.useCallback(async (force = false) => {
    setLoading(true); setError('');
    const controller = new AbortController();
    try { const result = await fetchGitHub({ signal: controller.signal, force }); setData(result); }
    catch (e) { if (e.name !== 'AbortError') setError(e.message || 'Could not load GitHub data.'); }
    finally { setLoading(false); }
    return () => controller.abort();
  }, []);
  React.useEffect(() => { let cleanup; load().then(fn => { cleanup = fn; }); return () => cleanup?.(); }, [load]);
  const repos = data?.repos || [];
  const languages = ['All', ...new Set(repos.map(r => r.language).filter(Boolean).sort())];
  const visible = repos.filter(r => (language === 'All' || r.language === language) && `${r.name} ${r.description || ''}`.toLowerCase().includes(search.toLowerCase())).sort((a,b) => sort === 'stars' ? b.stargazers_count-a.stargazers_count : new Date(b.updated_at)-new Date(a.updated_at));
  const p = data?.profile;
  return <section className="section github-section" id="github"><div className="container">
    <div className="section-head"><div><span className="eyebrow">OPEN SOURCE / LIVE DATA</span><h2>My GitHub, <em>in real time.</em></h2></div><p>Public profile and repository data fetched directly from GitHub's REST API.</p></div>
    <div className="github-profile glass-panel">
      <div className="github-user">{p?.avatar_url ? <img className="github-avatar" src={p.avatar_url} alt={`${p.login} GitHub avatar`} loading="lazy"/> : <div className="avatar-placeholder"><Github/></div>}
        <div className="github-user-info"><span className="eyebrow">GITHUB PROFILE</span><h3>{p?.name || p?.login || 'piyushgujor666-glitch'}</h3><a href={githubProfileUrl} target="_blank" rel="noreferrer">@piyushgujor666-glitch <ExternalLink size={13}/></a><p>{p?.bio || 'Frontend development, learning in public, and building projects.'}</p></div>
      </div>
      <div className="github-stats"><div><BookOpen/><strong>{p ? p.public_repos : '—'}</strong><span>Public repos</span></div><div><Users/><strong>{p ? p.followers : '—'}</strong><span>Followers</span></div><div><Users/><strong>{p ? p.following : '—'}</strong><span>Following</span></div></div>
      <div className="github-profile-footer"><span className="api-status"><i className={error ? 'status-dot warn' : 'status-dot'} />{loading ? 'Connecting to GitHub…' : error ? 'API temporarily unavailable' : data?.fromCache ? 'Showing cached live data' : 'Live API connected'}</span><div className="inline-actions"><button className="btn btn-quiet btn-small" onClick={() => load(true)} disabled={loading}><RefreshCw size={14}/> Retry / refresh</button><a className="btn btn-outline btn-small" href={githubProfileUrl} target="_blank" rel="noreferrer">View profile <ExternalLink size={14}/></a></div></div>
    </div>
    {error && <div className="api-alert"><div><strong>Could not refresh GitHub data</strong><p>{error} The rest of the portfolio is still available.</p></div><a href={githubProfileUrl} target="_blank" rel="noreferrer">Open GitHub directly <ExternalLink size={14}/></a></div>}
    <div className="repo-heading"><div><span className="eyebrow">REPOSITORIES</span><h3>Built in public <span className="repo-count">{loading && !data ? '…' : visible.length}</span></h3></div><div className="repo-controls"><label className="searchbox"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search repositories" aria-label="Search repositories"/></label><select value={language} onChange={e=>setLanguage(e.target.value)} aria-label="Filter by language">{languages.map(l=><option key={l}>{l}</option>)}</select><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort repositories"><option value="updated">Recently updated</option><option value="stars">Most starred</option></select></div></div>
    {loading && !data ? <div className="repo-grid">{[1,2,3].map(n=><div className="repo-skeleton" key={n}><div/><div/><div/></div>)}</div> : visible.length ? <div className="repo-grid">{visible.slice(0,12).map(repo=><article className="repo-card" key={repo.id}><div className="repo-card-top"><span className="repo-icon"><Github size={18}/></span><span className="repo-public">Public</span></div><a className="repo-name" href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}<ExternalLink size={13}/></a><p>{repo.description || 'No description provided yet.'}</p><div className="repo-meta"><span>{repo.language && <><i className="language-dot"/> {repo.language}</>}</span><span><Star size={13}/>{repo.stargazers_count}</span><span><GitFork size={13}/>{repo.forks_count}</span></div><div className="repo-updated"><Clock3 size={12}/> Updated {dateLabel(repo.updated_at)}</div></article>)}</div> : <div className="empty-state"><Github size={24}/><strong>{error ? 'Repository list unavailable' : 'No repositories match'}</strong><p>{error ? 'Open your GitHub profile to browse repositories directly.' : 'Try another search or language filter.'}</p><a href={githubProfileUrl} target="_blank" rel="noreferrer">View all on GitHub <ExternalLink size={14}/></a></div>}
    <div className="center-action"><a className="btn btn-outline" href={githubProfileUrl} target="_blank" rel="noreferrer"><Github size={17}/> View all on GitHub <ExternalLink size={14}/></a></div>
    <p className="api-note">Public API requests are rate-limited by GitHub. This portfolio caches successful results for 30 minutes and never uses fake repository data.</p>
  </div></section>;
}