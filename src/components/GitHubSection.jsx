import { profile } from '../data/resume'
import { useGitHub } from '../hooks/useGitHub'
import GitHubProfile from './GitHubProfile'
import RepositoryList from './RepositoryList'
import { SectionHeader } from './Reveal'

export default function GitHubSection() {
  const { status, profile: gh, repos, error, retry } = useGitHub(profile.githubUser)
  return (
    <section id="github" className="section" aria-labelledby="github-title">
      <div className="container">
        <SectionHeader eyebrow="GitHub" title="Live from GitHub" sub="Profile and repositories are fetched from the public GitHub API when this section loads." />
        <div className="gh-layout">
          <GitHubProfile status={status} profile={gh} error={error} retry={retry} />
          <RepositoryList status={status} repos={repos} totalCount={gh?.publicRepos ?? 0} error={error} retry={retry} />
        </div>
      </div>
    </section>
  )
}
