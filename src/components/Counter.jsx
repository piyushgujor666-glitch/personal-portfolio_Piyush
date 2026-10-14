import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useGitHub'

export default function Counter({ value }) {
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(reduced ? value : 0)
  const frame = useRef(0)

  useEffect(() => {
    if (reduced || value === 0) {
      setShown(value)
      return undefined
    }
    const start = performance.now()
    const dur = 900
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      setShown(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [value, reduced])

  return <>{shown}</>
}
