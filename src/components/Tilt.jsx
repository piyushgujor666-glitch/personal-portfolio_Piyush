import { useRef } from 'react'
import { useReducedMotion } from '../hooks/useGitHub'

// Pointer-driven 3D tilt. Disabled for touch pointers and reduced-motion users.
export default function Tilt({ children, className = '', max = 8, style }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const onMove = (e) => {
    if (reduced || e.pointerType === 'touch' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `perspective(900px) rotateY(${x * max * 2}deg) rotateX(${-y * max * 2}deg) translateY(-4px)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div ref={ref} className={`tilt ${className}`} style={style} onPointerMove={onMove} onPointerLeave={reset} onBlur={reset}>
      {children}
    </div>
  )
}
