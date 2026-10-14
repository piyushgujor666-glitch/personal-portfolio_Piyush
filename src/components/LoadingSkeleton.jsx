export function ProfileSkeleton() {
  return (
    <div className="glass gh-profile" aria-busy="true" aria-label="Loading GitHub profile">
      <div className="skeleton" style={{ width: 96, height: 96, borderRadius: '50%' }} />
      <div className="skeleton" style={{ height: 24, width: '60%' }} />
      <div className="skeleton" style={{ height: 14, width: '90%' }} />
      <div className="skeleton" style={{ height: 60 }} />
      <div className="skeleton" style={{ height: 44 }} />
    </div>
  )
}

export function RepoSkeleton({ count = 6 }) {
  return (
    <div className="repo-grid" aria-busy="true" aria-label="Loading repositories">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="glass repo-card">
          <div className="skeleton" style={{ height: 20, width: '70%' }} />
          <div className="skeleton" style={{ height: 40 }} />
          <div className="skeleton" style={{ height: 14, width: '50%' }} />
        </div>
      ))}
    </div>
  )
}
