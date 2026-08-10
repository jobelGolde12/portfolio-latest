/**
 * Portfolio project case studies.
 *
 * Each entry powers the horizontal Projects gallery and the case-study dialog.
 * NOTE: the `problem`/`approach`/`tradeoffs`/`outcomes` fields are a starting
 * point written from the project links and site copy — edit them with the real
 * numbers and decisions for each project (hiring managers notice specifics).
 */

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  tagline: string;
  image: string | null;
  gradient: string;
  stack: string[];
  links: { demo?: string; repo?: string };
  problem: string;
  approach: string;
  tradeoffs: string[];
  outcomes: string[];
}

export const projects: ProjectCaseStudy[] = [
  {
    slug: 'profanity-detection-api',
    title: 'Profanity Detection API',
    tagline: 'Filipino-language moderation as a REST API',
    image: '/images/project_profanity_api.webp',
    gradient: 'from-violet-500/80 to-indigo-900/80',
    stack: ['Laravel', 'PHP', 'REST API', 'MySQL', 'React (demo)'],
    links: {
      demo: 'https://filipino-profanity-api-latest.vercel.app/',
      repo: 'https://github.com/jobelGolde12/profanity_api.git',
    },
    problem:
      'Online communities in the Philippines rely on content moderation, but generic profanity filters miss Filipino — Tagalog and regional terms either slip through or, worse, over-block normal speech.',
    approach:
      'Built a Laravel REST API that tokenizes incoming text, normalizes common variations (case, spacing, leetspeak), and matches against a curated dictionary of Filipino profanity. Clean JSON endpoints let any frontend — posts, comments, or messaging — plug in filtering without reimplementing it.',
    tradeoffs: [
      'Dictionary matching over ML: transparent, fast, and cheap to run — at the cost of continuous curation as slang evolves.',
      'Server-side filtering keeps the dictionary private but adds an HTTP round-trip per request.',
      'Aggressive normalization improves recall but risks false positives, so thresholds are tuned conservatively.',
    ],
    outcomes: [
      'Deployed publicly and integrated by external services for real message flows.',
      'Covers Tagalog and regional Filipino terms that generic filters miss.',
    ],
  },
  {
    slug: 'trailmates',
    title: 'TrailMates',
    tagline: 'Find hiking companions for safer trails',
    image: '/images/project_trailmates.webp',
    gradient: 'from-violet-500/80 to-indigo-900/80',
    stack: ['Laravel', 'Vue.js', 'MySQL'],
    links: { demo: 'https://companion-hike.onrender.com/' },
    problem:
      'Hiking alone is riskier and less fun, and organizing a group usually means scattered group chats and manual coordination.',
    approach:
      'Built a companion-finding web app for hikers: create a profile, share an upcoming trail, and match with other hikers heading the same way. Deployed on Render for quick public access.',
    tradeoffs: [
      'Matching focuses on trip + location proximity rather than a full social graph — simpler and more focused for a first version.',
      'Core match/join flows shipped first; live chat was deliberately scoped out to keep the MVP shippable.',
    ],
    outcomes: ['Live demo deployed on Render and open for real use.'],
  },
  {
    slug: 'taskmind',
    title: 'TaskMind',
    tagline: '"What should I do?" — a task prioritization app',
    image: '/images/project_taskmind.webp',
    gradient: 'from-emerald-500/80 to-teal-900/80',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    links: { demo: 'https://whatshouldido-five.vercel.app/' },
    problem:
      'Staring at a long to-do list and not knowing where to start is a real productivity blocker — most task apps store tasks but never help you choose.',
    approach:
      'Built a task app that focuses on the decision moment: instead of just capturing tasks, it helps you pick what to work on next. Live demo on Vercel.',
    tradeoffs: [
      'Narrowed to a single decision flow instead of full project management, keeping the scope tight.',
      'Lightweight client-first architecture so it could ship fast and be iterated on.',
    ],
    outcomes: ['Live demo deployed on Vercel.'],
  },
  {
    slug: 'suitora',
    title: 'Suitora',
    tagline: 'A modern take on the Filipino courtship experience',
    image: '/images/project_suitora.webp',
    gradient: 'from-amber-500 via-orange-500 to-rose-700',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    links: { demo: 'https://suitora-kappa.vercel.app/' },
    problem:
      'Filipino courtship ("ligaw") has moved into generic chat apps that weren\'t built for it — there\'s no dedicated space to do it well.',
    approach:
      'Built a web platform that gives the courtship experience its own space, with a warm, playful visual identity and structured interaction flows. Live demo on Vercel.',
    tradeoffs: [
      'Prioritized a distinctive visual identity and flow over feature breadth for the first release.',
    ],
    outcomes: ['Live demo deployed on Vercel.'],
  },
  {
    slug: 'dugtong',
    title: 'Dugtong',
    tagline: '"Dugtong" — Filipino for connection — a community platform',
    image: '/images/project_dugtong.webp',
    gradient: 'from-sky-500 via-blue-600 to-indigo-800',
    stack: ['Laravel', 'Vue.js', 'MySQL'],
    links: { repo: 'https://github.com/jobelGolde12/DUGTONG' },
    problem:
      'Local communities lack simple digital spaces to connect people around shared interests and needs.',
    approach:
      'Open-source web project exploring community connection features — built to practice full-stack architecture, collaboration workflows, and clean public code. Source available on GitHub.',
    tradeoffs: [
      'Open-source by design: favors transparency and community contribution over a polished single-owner product.',
    ],
    outcomes: ['Public source available on GitHub for review.'],
  },
];
