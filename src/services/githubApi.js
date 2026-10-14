const USER = 'piyushgujor666-glitch';
const PROFILE_URL = `https://api.github.com/users/${USER}`;
const REPOS_URL = `${PROFILE_URL}/repos?sort=updated&per_page=100&type=owner`;
const CACHE_KEY = 'pg-github-public-v2';
const CACHE_TTL = 30 * 60 * 1000;

function readCache() {
  try {
    const value = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    if (value && Date.now() - value.savedAt < CACHE_TTL) return value.data;
  } catch { /* localStorage can be disabled */ }
  return null;
}
function saveCache(data) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data })); } catch { /* ignore quota/private mode */ }
}
async function getJSON(url, signal) {
  const response = await fetch(url, {
    signal,
    headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' }
  });
  if (response.status === 403 || response.status === 429) {
    const error = new Error('GitHub has temporarily rate-limited public requests. Cached data is shown when available; try again later.');
    error.rateLimit = true;
    throw error;
  }
  if (!response.ok) throw new Error(`GitHub returned ${response.status}. Please retry in a moment.`);
  return response.json();
}
export async function fetchGitHub({ signal, force = false } = {}) {
  if (!force) {
    const cached = readCache();
    if (cached) return { ...cached, fromCache: true };
  }
  const [profile, repos] = await Promise.all([
    getJSON(PROFILE_URL, signal),
    getJSON(REPOS_URL, signal)
  ]);
  const data = {
    profile,
    repos: Array.isArray(repos) ? repos : [],
    retrievedAt: new Date().toISOString(),
    fromCache: false
  };
  saveCache(data);
  return data;
}
export const githubProfileUrl = `https://github.com/${USER}`;