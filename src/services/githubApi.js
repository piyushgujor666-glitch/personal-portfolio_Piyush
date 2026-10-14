const BASE = 'https://api.github.com'
const TTL = 5 * 60 * 1000
const cache = new Map()

export class GitHubError extends Error {
  constructor(message, kind) {
    super(message)
    this.kind = kind // 'rate-limit' | 'not-found' | 'network' | 'http' | 'invalid'
  }
}

async function request(path, signal) {
  const hit = cache.get(path)
  if (hit && Date.now() - hit.time < TTL) return hit.data

  let res
  try {
    res = await fetch(`${BASE}${path}`, { signal, headers: { Accept: 'application/vnd.github+json' } })
  } catch (err) {
    if (err.name === 'AbortError') throw err
    throw new GitHubError('Could not reach GitHub. Check your connection and try again.', 'network')
  }

  if (res.status === 403 || res.status === 429) {
    throw new GitHubError('GitHub API rate limit reached. Please try again in a few minutes.', 'rate-limit')
  }
  if (res.status === 404) throw new GitHubError('GitHub profile not found.', 'not-found')
  if (!res.ok) throw new GitHubError(`GitHub returned an error (HTTP ${res.status}).`, 'http')

  let data
  try {
    data = await res.json()
  } catch {
    throw new GitHubError('GitHub returned an unreadable response.', 'invalid')
  }
  cache.set(path, { data, time: Date.now() })
  return data
}

export function safeGitHubUrl(url) {
  try {
    const u = new URL(url)
    return u.protocol === 'https:' && (u.hostname === 'github.com' || u.hostname.endsWith('.github.com')) ? u.href : null
  } catch {
    return null
  }
}

export async function fetchProfile(username, signal) {
  const d = await request(`/users/${encodeURIComponent(username)}`, signal)
  if (!d || typeof d.login !== 'string') throw new GitHubError('Unexpected profile data.', 'invalid')
  return {
    login: d.login,
    name: d.name || null,
    bio: d.bio || null,
    avatarUrl: d.avatar_url || null,
    publicRepos: Number(d.public_repos) || 0,
    followers: Number(d.followers) || 0,
    following: Number(d.following) || 0,
    htmlUrl: safeGitHubUrl(d.html_url),
  }
}

export async function fetchRepos(username, signal) {
  const d = await request(`/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`, signal)
  if (!Array.isArray(d)) throw new GitHubError('Unexpected repository data.', 'invalid')
  return d.map((r) => ({
    id: r.id,
    name: String(r.name),
    description: r.description || null,
    language: r.language || null,
    stars: Number(r.stargazers_count) || 0,
    forks: Number(r.forks_count) || 0,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
    htmlUrl: safeGitHubUrl(r.html_url),
    fork: Boolean(r.fork),
  }))
}
