// Only verified URLs belong here. `null` renders a non-clickable "Coming Soon" label.
// sourceUrl points to the GitHub repositories page; replace with an exact repo URL when you want a direct link.
const GITHUB_REPOS = 'https://github.com/piyushgujor666-glitch?tab=repositories'

export const projects = [
  {
    id: 'fixmate',
    title: 'FixMate — Home Service Booking Platform',
    status: 'in-progress',
    description:
      'A responsive React-based home-service platform for discovering services such as plumbing, electrical work, cleaning, and repairs.',
    features: [
      'Service browsing',
      'Authentication interfaces',
      'Booking workflows',
      'User, worker, and admin dashboard interfaces',
      'Reusable components and responsive layouts',
      'Planned backend, database, and REST API integration',
    ],
    tech: ['React.js', 'JavaScript', 'CSS', 'HTML'],
    categories: ['React', 'JavaScript', 'Frontend'],
    liveUrl: 'https://home-serves-zk57.vercel.app/',
    sourceUrl: GITHUB_REPOS,
    accent: ['#3b82f6', '#8b5cf6'],
    glyph: 'FM',
  },
  {
    id: 'amazon-clone',
    title: 'Amazon Clone',
    status: 'live',
    description:
      'A frontend e-commerce clone inspired by Amazon, showcasing responsive UI implementation and product-shopping interface design. Built as a learning project, not affiliated with Amazon.',
    features: ['Responsive layout', 'Product-shopping interface', 'E-commerce UI patterns'],
    tech: ['Frontend', 'Responsive UI'],
    categories: ['Frontend'],
    liveUrl: 'https://effortless-melba-bfe4d9.netlify.app/',
    sourceUrl: GITHUB_REPOS,
    accent: ['#06b6d4', '#3b82f6'],
    glyph: 'AC',
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic-Tac-Toe Web Game',
    status: 'live',
    description: 'An interactive two-player game built using HTML, CSS, and JavaScript.',
    features: ['Two-player gameplay', 'Automatic win detection', 'Reset and new-game functionality'],
    tech: ['HTML', 'CSS', 'JavaScript'],
    categories: ['JavaScript', 'Frontend'],
    liveUrl: 'https://tic-tac349demo.vercel.app/',
    sourceUrl: GITHUB_REPOS,
    accent: ['#8b5cf6', '#06b6d4'],
    glyph: 'XO',
  },
]
