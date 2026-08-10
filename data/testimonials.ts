/**
 * Testimonials / recommendations.
 *
 * ⚠️ These are SAMPLE quotes provided as placeholder content — replace them
 * with real recommendations (from LinkedIn, professors, or clients) before
 * going live. Fabricated endorsements damage credibility; real ones build it.
 */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Jobel took real ownership of the Lost & Found system — from the database design to the role-based flows. He explains his decisions clearly and adapts fast when requirements change.',
    name: 'Capstone Adviser',
    role: 'Sorsogon State University',
    initials: 'CA',
  },
  {
    quote:
      'The fund tracking system he built for our mutual-aid organization removed a huge reporting headache. Communication was clear at every step, and the training for our team was patient and thorough.',
    name: 'Barangay Official',
    role: 'Protec Damayan Client',
    initials: 'BO',
  },
  {
    quote:
      'Reliable and curious — Jobel consistently ships working features and comes back with suggestions that make the whole system better. A developer I would happily collaborate with again.',
    name: 'Peer Developer',
    role: 'University Project Team',
    initials: 'PD',
  },
  {
    quote:
      'What stands out is how he thinks about the full picture: performance, accessibility, and maintainability, not just whether it renders. His documentation made handoff effortless.',
    name: 'Professor',
    role: 'Sorsogon State University',
    initials: 'PR',
  },
];
