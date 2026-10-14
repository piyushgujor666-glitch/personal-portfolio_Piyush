// src/data/projects.js

export const projects = [
  {
    name: 'FixMate — Home Services',
    eyebrow: 'SERVICE PLATFORM',
    description:
      'An ongoing home-service platform project. The responsive React frontend includes service browsing, authentication interfaces, booking workflows, and user, worker, and admin dashboards. I am now expanding it into a full-stack website with backend APIs, database integration, and connected workflows.',
    stack: [
      'React',
      'JavaScript',
      'CSS',
      'HTML',
      'Node.js (in progress)',
      'Database (planned)',
    ],
    status: 'Ongoing · Full-stack development',
    ongoing: true,
    live: "https://home-serves-zk57.vercel.app",
    repo: null,
    accent: 'violet',
    mark: 'FM',
  },
  {
    name: 'Amazon Clone',
    eyebrow: 'E-COMMERCE',
    description:
      'A responsive e-commerce frontend inspired by Amazon, featuring product browsing and a familiar shopping interface.',
    stack: ['React', 'JavaScript', 'CSS', 'HTML'],
    status: 'Live',
    ongoing: false,
    live: 'https://effortless-melba-bfe4d9.netlify.app/',
    repo: null,
    accent: 'orange',
    mark: 'AZ',
  },
  {
    name: 'Tic-Tac-Toe',
    eyebrow: 'INTERACTIVE GAME',
    description:
      'A browser-based Tic-Tac-Toe game with interactive gameplay and a responsive interface.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    status: 'Live',
    ongoing: false,
    live: 'https://tic-tac349demo.vercel.app/',
    repo: null,
    accent: 'cyan',
    mark: 'XO',
  },
];