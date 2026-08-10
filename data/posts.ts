/**
 * Blog posts as structured content blocks — no markdown dependency needed.
 * Add posts here and they automatically appear in /blog and /sitemap.xml.
 */

export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'code'; language: string; code: string };

export interface BlogPost {
  slug: string;
  title: string;
  date: string; // ISO
  excerpt: string;
  tags: string[];
  readMinutes: number;
  blocks: PostBlock[];
}

export const posts: BlogPost[] = [
  {
    slug: 'filipino-profanity-detection-api',
    title: 'Building a Filipino Profanity Detection API with Laravel',
    date: '2026-06-15',
    excerpt:
      'Generic profanity filters are useless for Tagalog and regional Filipino slang. Here is how I built — and shipped — a dedicated detection API.',
    tags: ['Laravel', 'REST API', 'PHP'],
    readMinutes: 5,
    blocks: [
      {
        type: 'p',
        text: 'Most content moderation libraries are built for English. That is a real problem in the Philippines, where online communities mix Tagalog, regional dialects, and code-switched English — and where a filter that blocks harmless words is worse than no filter at all.',
      },
      {
        type: 'p',
        text: 'I set out to build a REST API that detects Filipino profanity reliably, integrates easily into any frontend, and stays cheap to run. This post walks through the design decisions and what I would do differently next time.',
      },
      { type: 'h2', text: 'Why not just use a generic profanity list?' },
      {
        type: 'ul',
        items: [
          'Generic lists miss Filipino terms entirely, including regional variations.',
          'English lists over-block: words that are innocuous in Filipino can match an English curse word, or vice versa.',
          'Slang evolves fast, so the dictionary needs to be curatable without redeploys.',
        ],
      },
      { type: 'h2', text: 'How the API works' },
      {
        type: 'p',
        text: 'Requests are tokenized, normalized (lowercase, trimmed spacing, common leetspeak substitutions), then matched against a curated Filipino dictionary. The Laravel backend exposes simple JSON endpoints so moderation can be wired into posts, comments, or messaging with a few lines of code:',
      },
      {
        type: 'code',
        language: 'json',
        code: 'POST /api/detect\n{\n  "text": "sana all mabait ka naman"\n}\n\n{\n  "profane": false,\n  "matches": [],\n  "normalized": "sana all mabait ka naman"\n}',
      },
      { type: 'h2', text: 'Trade-offs I accepted' },
      {
        type: 'ul',
        items: [
          'Dictionary matching over ML: transparent, fast, and cheap, but needs continuous curation as slang changes.',
          'Server-side detection keeps the dictionary private but costs one HTTP round-trip per request.',
          'Normalization improves recall but risks false positives — I tuned thresholds conservatively.',
        ],
      },
      { type: 'h2', text: 'What I learned' },
      {
        type: 'ul',
        items: [
          'Ship the simplest correct version first — a word list beats a half-trained model.',
          'Language-specific tooling is an underserved niche; domain knowledge is a real advantage.',
          'Making the dictionary data-driven (rather than hardcoded) pays off the first time a new slang term appears.',
        ],
      },
      {
        type: 'p',
        text: 'The API is live and has been integrated by external services. If you build Filipino products, giving content moderation a proper language-aware layer is one of those small investments with outsized product impact.',
      },
    ],
  },
  {
    slug: 'lost-and-found-capstone-lessons',
    title: '5 Lessons From Building a Lost & Found System as My Capstone',
    date: '2026-07-02',
    excerpt:
      'Real-time status updates, role-based auth, searchable listings — and the five lessons from my capstone that changed how I build full-stack apps.',
    tags: ['Laravel', 'Vue.js', 'Inertia'],
    readMinutes: 4,
    blocks: [
      {
        type: 'p',
        text: 'My capstone project was a community platform for reporting and recovering lost items — built with Laravel, Vue.js, and Inertia.js. It sounds simple, but it taught me more about real-world development than any tutorial.',
      },
      { type: 'h2', text: '1. Model the flow before you build the screens' },
      {
        type: 'p',
        text: 'The first version I sketched had two screens: report an item and browse items. The moment I mapped the actual user journey — report, verify, claim, close, feedback — the "simple" system became five states with different permissions per state. Drawing the state machine first saved me from rebuilding the schema halfway through.',
      },
      { type: 'h2', text: '2. Real-time updates are a UX feature, not a tech checkbox' },
      {
        type: 'p',
        text: 'Item statuses needed to update without a page refresh. The instinct is to reach for WebSockets immediately, but polling the Laravel API on a sensible interval was dramatically simpler and completely adequate at this scale. Use the simplest tool that meets the requirement.',
      },
      { type: 'h2', text: '3. Role-based access control shapes everything' },
      {
        type: 'ul',
        items: [
          'Separate flows for students, teachers, and administrators meant the auth layer influenced every controller, not just one "login" page.',
          'Laravel\'s middleware made policy rules declarative — a good model for reasoning about permissions.',
          'Testing each role\'s access path early (who can edit a claim? who can close a report?) prevented authorization bugs.',
        ],
      },
      { type: 'h2', text: '4. Searchable categories beat a free-text dump' },
      {
        type: 'p',
        text: 'The early UI had one big list. Users needed to filter by category, location, and status. Adding a structured category system with search made the tool actually usable for recovery — a reminder that data modeling is product design.',
      },
      { type: 'h2', text: '5. Document the handoff' },
      {
        type: 'p',
        text: 'Capstones get evaluated by people who did not build them. A short README with the architecture, setup steps, and demo account details made the difference between "works on my machine" and a project people can actually run and judge.',
      },
      {
        type: 'p',
        text: 'Building systems that real users interact with — even at university scale — is where the lessons stick. The state machines, the role matrices, and the polling-versus-WebSocket decision all show up in my paid work now.',
      },
    ],
  },
  {
    slug: 'why-laravel-vuejs',
    title: 'Why I Keep Reaching for Laravel + Vue.js',
    date: '2026-07-20',
    excerpt:
      'Inertia.js made the Laravel + Vue.js combo my default for full-stack apps. Here is why — and where I still reach for React and Next.js.',
    tags: ['Laravel', 'Vue.js', 'Inertia'],
    readMinutes: 4,
    blocks: [
      {
        type: 'p',
        text: 'Ask five developers what stack to start a full-stack web app with and you\'ll get five answers. For most of my projects, mine is Laravel on the backend and Vue.js on the frontend — glued together with Inertia.js.',
      },
      { type: 'h2', text: 'The Inertia sweet spot' },
      {
        type: 'p',
        text: 'Inertia lets me write a server-driven app with client-side rendering: controllers return JSON props alongside rendered pages, and Vue components consume them without a separate API layer or client-side router to maintain. For CRUD-heavy systems like my Lost & Found capstone, that removes an entire class of boilerplate:',
      },
      {
        type: 'code',
        language: 'php',
        code: '// A controller "page" — props flow straight into the Vue component\nreturn Inertia::render(\'Items/Index\', [\n    \'items\' => Item::query()->filter(request(\'q\'))->paginate(15),\n    \'filters\' => request()->only(\'q\', \'category\', \'status\'),\n]);',
      },
      { type: 'h2', text: 'What Laravel gives me' },
      {
        type: 'ul',
        items: [
          'Eloquent and migrations make data modeling fast and explicit — crucial when the schema is the product (like item states and roles).',
          'First-party auth, validation, and middleware keep security concerns declarative and boring.',
          'The ecosystem (Queues, Notifications, Mail) covers the "adult" features without stitching libraries together.',
        ],
      },
      { type: 'h2', text: 'Where I still reach for React + Next.js' },
      {
        type: 'ul',
        items: [
          'SEO-critical marketing sites: server-rendered React with the Next.js metadata API beats a client-rendered SPA.',
          'Interactive dashboards and tools where a rich client state model matters more than server round-trips.',
          'This portfolio, for example — Next.js is the right tool for a content-forward, performance-sensitive site.',
        ],
      },
      {
        type: 'p',
        text: 'The lesson is not "Laravel is better" — it is that a pragmatic default lets you start fast, and knowing when to break the default is what separates a framework fan from an engineer. Both stacks live in my day-to-day work.',
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
