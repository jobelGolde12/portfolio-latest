export interface TimelineEntry {
  date: string;
  title: string;
  organization: string;
  type: 'project' | 'education' | 'milestone';
  description: string;
  tags?: string[];
  featured?: boolean;
}

export const timelineEntries: TimelineEntry[] = [
  {
    date: '2024',
    title: 'Profanity Detection API',
    organization: 'Independent Project',
    type: 'milestone',
    description:
      'Built a custom REST API for Filipino profanity detection, specialized in Tagalog and regional terms. Deployed and integrated by external services.',
    tags: ['Laravel', 'REST API', 'React'],
    featured: true,
  },
  {
    date: '2024',
    title: 'Lost and Found System',
    organization: 'Capstone Project',
    type: 'project',
    description:
      'Community platform for reporting and recovering lost items with real-time status updates and searchable categories.',
    tags: ['Laravel', 'Vue.js', 'Inertia'],
  },
  {
    date: '2023',
    title: 'Protec Damayan',
    organization: 'Barangay Bonga',
    type: 'project',
    description:
      'Mutual-aid system for fund records and disbursements with automated SMS death announcements via Semaphore.',
    tags: ['Laravel', 'Vue.js', 'SMS Integration'],
  },
  {
    date: '2023',
    title: 'School Portal',
    organization: 'University Project',
    type: 'project',
    description:
      'Student information and access system with role-based authentication for students, teachers, and administrators.',
    tags: ['Laravel', 'Vue.js', 'Inertia.js'],
  },
  {
    date: '2022',
    title: 'BSIT Enrollment',
    organization: 'Sorsogon State University',
    type: 'education',
    description:
      'Began Bachelor of Science in Information Technology at Bulan Campus. Focused on software development and systems design.',
    tags: ['BSIT', 'Sorsogon State University'],
  },
];
