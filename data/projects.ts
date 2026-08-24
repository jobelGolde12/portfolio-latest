/**
 * Portfolio projects — single source of truth for the Projects section.
 *
 * Cards are intentionally minimal: name, one-line positioning, a short
 * description of what it does and who it's for, media, and actions.
 * `embeddable` is true only when the deployed site's response headers allow
 * iframe embedding (probed: X-Frame-Options / CSP frame-ancestors) — blocked
 * sites are never iframed.
 */

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string | null;
  links: { demo?: string; repo?: string };
  embeddable?: boolean;
}

export const projects: Project[] = [
  {
    slug: 'profanity-detection-api',
    title: 'Profanity Detection API',
    tagline: 'Filipino-language moderation as a REST API',
    description:
      'Content moderation built for Filipino speech — catches Tagalog and regional profanity that generic filters miss, served over clean JSON endpoints. Deployed publicly and in use by external services.',
    image: '/images/project_profanity_api.webp',
    links: {
      demo: 'https://filipino-profanity-api-latest.vercel.app/',
      repo: 'https://github.com/jobelGolde12/profanity_api.git',
    },
    embeddable: true,
  },
  // Suitora — temporarily removed from Projects section; uncomment to restore.
  // {
  //   slug: 'suitora',
  //   title: 'Suitora',
  //   tagline: 'Know if it suits you before you buy.',
  //   description:
  //     'An AI-powered fashion assistant that helps you make smarter purchasing decisions — virtual try-on, compatibility scoring, and personalized style recommendations before you commit to the checkout.',
  //   image: '/images/project_suitora.webp',
  //   links: { demo: 'https://suitora-kappa.vercel.app/' },
  // },
  {
    slug: 'trailmates',
    title: 'TrailMates',
    tagline: 'Find hiking companions for safer trails',
    description:
      'Hiking alone is riskier and less fun. TrailMates matches hikers headed the same way — post an upcoming trail, see who else is going, and join forces instead of juggling scattered group chats.',
    image: '/images/project_trailmates.webp',
    links: { demo: 'https://companion-hike.onrender.com/' },
    embeddable: true,
  },
  {
    slug: 'taskmind',
    title: 'TaskMind',
    tagline: 'Decision & action clarity from messy input',
    description:
      'A decision & action clarity tool that turns confusing messages, emails, announcements, and instructions into structured action items — clear deadlines, urgency levels, and required decisions.',
    image: '/images/project_taskmind.webp',
    links: { demo: 'https://whatshouldido-five.vercel.app/' },
  },
  {
    slug: 'dugtong',
    title: 'Dugtong',
    tagline: 'Community connection, open-sourced',
    description:
      "Filipino for “connection” — an open-source community platform that gives local groups a simple digital space around shared interests and needs. Full-stack architecture practiced in public.",
    image: '/images/project_dugtong.webp',
    links: { repo: 'https://github.com/jobelGolde12/DUGTONG' },
  },
];
