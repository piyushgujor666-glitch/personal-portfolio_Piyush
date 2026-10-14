import { Github, RefreshCw } from 'lucide-react'
import Counter from './Counter'
import ExternalLink from './ExternalLink'
import { ProfileSkeleton } from './LoadingSkeleton'
import { profile as fallbackProfile } from '../data/resume'

export default function GitHubProfile({ status, profile, error, retry }) {
  if (status === 'loading') return <ProfileSkeleton />

  if (status === 'error') {
    return (
      <div className="glass gh-profile notice error" role="alert">
        <h3>Couldn't load GitHub profile</h3>
        <p className="muted">{error}</p>
        <button className="btn btn-sm" onClick={retry}><RefreshCw size={16} /> Retry</button>
        <ExternalLink href={fallbackProfile.github} className="btn btn-primary btn-sm"><Github size={16} /> Open profile on GitHub</ExternalLink>
      </div>
    )
  }

  const profileUrl = profile.htmlUrl || fallbackProfile.github
  return (
    <div className="glass gh-profile">
      {profile.avatarUrl ? (
        <img className="gh-avatar" src={profile.avatarUrl} alt={`${profile.login} GitHub avatar`} width="96" height="96" loading="lazy" referrerPolicy="no-referrer" />
      ) : (
        <div className="gh-avatar" aria-hidden="true">{profile.login.slice(0, 2).toUpperCase()}</div>
      )}
      <div>
        <h3 className="gh-name">{profile.name || profile.login}</h3>
        <p className="gh-login">@{profile.login}</p>
      </div>
      {profile.bio && <p className="gh-bio">{profile.bio}</p>}
      <div className="gh-stats">
        <div className="stat"><b><Counter value={profile.publicRepos} /></b><span>Repositories</span></div>
        <div className="stat"><b><Counter value={profile.followers} /></b><span>Followers</span></div>
        <div className="stat"><b><Counter value={profile.following} /></b><span>Following</span></div>
      </div>
      <ExternalLink href={profileUrl} className="btn btn-primary"><Github size={18} /> View GitHub Profile</ExternalLink>
    </div>
  )
}
