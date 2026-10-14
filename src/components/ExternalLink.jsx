export function isSafeUrl(url) {
  try {
    const u = new URL(url)
    return u.protocol === 'https:' || u.protocol === 'http:'
  } catch {
    return false
  }
}

export default function ExternalLink({ href, children, className = '', ...rest }) {
  if (!href || !isSafeUrl(href)) return null
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
    </a>
  )
}
