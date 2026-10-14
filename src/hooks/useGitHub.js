import { useCallback, useEffect, useState } from 'react'
import { fetchProfile, fetchRepos } from '../services/githubApi'

export function useGitHub(username) {
  const [state, setState] = useState({ status: 'loading', profile: null, repos: [], error: null })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setState((s) => ({ ...s, status: 'loading', error: null }))
    Promise.all([fetchProfile(username, controller.signal), fetchRepos(username, controller.signal)])
      .then(([profile, repos]) => setState({ status: 'success', profile, repos, error: null }))
      .catch((err) => {
        if (err.name === 'AbortError') return
        setState({ status: 'error', profile: null, repos: [], error: err.message || 'Something went wrong.' })
      })
    return () => controller.abort()
  }, [username, attempt])

  const retry = useCallback(() => setAttempt((n) => n + 1), [])
  return { ...state, retry }
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export function useWebGL() {
  const [ok] = useState(() => {
    try {
      const c = document.createElement('canvas')
      return Boolean(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
    } catch {
      return false
    }
  })
  return ok
}
