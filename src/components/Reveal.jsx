import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useGitHub'

export default function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const reduced = useReducedMotion()
  const Tag = motion[as] || motion.div
  if (reduced) return <Tag className={className}>{children}</Tag>
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}

export function SectionHeader({ eyebrow, title, sub }) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={`${eyebrow.toLowerCase()}-title`} className="section-title">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </Reveal>
  )
}
