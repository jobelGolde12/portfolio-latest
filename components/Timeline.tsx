'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';
import { Tag } from '@/components/ui/tag';
import { cn } from '@/lib/utils';

interface TimelineEntry {
  date: string;
  title: string;
  organization: string;
  type: 'project' | 'education' | 'milestone';
  description: string;
  tags?: string[];
  featured?: boolean;
}

const entries: TimelineEntry[] = [
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

// Reusable Timeline Progress Line
function TimelineLine({ 
  progress, 
  prefersReducedMotion 
}: { 
  progress: MotionValue<number>; 
  prefersReducedMotion: boolean | null;
}) {
  return (
    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/10">
      <motion.div
        className="absolute top-0 left-0 right-0 bottom-0 w-px bg-white origin-top"
        style={{ scaleY: prefersReducedMotion ? 1 : progress }}
      />
    </div>
  );
}

// Reusable Timeline Node
function TimelineNode({ 
  entry, 
  isLinePassed 
}: { 
  entry: TimelineEntry; 
  isLinePassed: boolean;
}) {
  return (
    <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 z-10">
      <motion.div
        className={cn(
          'w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-500',
          // When the line hits the node, make it solid white
          isLinePassed 
            ? 'bg-white ring-2 ring-white/40' 
            : entry.featured
              ? 'bg-accent-warm/20 ring-2 ring-accent-warm'
              : entry.type === 'education'
                ? 'bg-accent-signal-dim ring-2 ring-accent-signal'
                : 'bg-bg-surface-2 ring-2 ring-border-subtle',
        )}
        // Animate scale and glow when hit
        animate={isLinePassed ? { 
          scale: 1.5, 
          boxShadow: '0px 0px 16px rgba(255,255,255,0.6)' 
        } : { 
          scale: 1, 
          boxShadow: '0px 0px 0px rgba(255,255,255,0)' 
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <div
          className={cn(
            'w-1.5 h-1.5 rounded-full transition-colors duration-500',
            // Inner dot becomes dark so it's visible against the new white background
            isLinePassed 
              ? 'bg-black/60' 
              : entry.featured
                ? 'bg-accent-warm'
                : entry.type === 'education'
                  ? 'bg-accent-signal'
                  : 'bg-text-tertiary',
          )}
        />
      </motion.div>
    </div>
  );
}

// Reusable Timeline Card
function TimelineCard({ 
  entry, 
  isLeft, 
  isCardInView, 
  prefersReducedMotion 
}: { 
  entry: TimelineEntry; 
  isLeft: boolean; 
  isCardInView: boolean;
  prefersReducedMotion: boolean | null;
}) {
  // Best transition for showing/hiding: "Focus Pull" (Opacity + Y + Blur + Scale)
  const cardAnimate = prefersReducedMotion
    ? { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }
    : isCardInView
      ? { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }
      : { opacity: 0, y: 24, filter: 'blur(8px)', scale: 0.98 };

  return (
    <div
      className={cn(
        'w-full pl-12 md:w-1/2 md:pl-0',
        isLeft ? 'md:pr-12 md:ml-0' : 'md:pl-12 md:ml-auto'
      )}
    >
      {/* Outer motion.div handles the scroll show/hide animation */}
      <motion.div
        animate={cardAnimate}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className="relative"
      >
        {/* Inner div handles the hover interaction & dynamic border */}
        <div
          className={cn(
            'max-w-[500px] p-6 rounded-xl bg-white/[0.02] transition-all duration-300',
            'hover:-translate-y-1 hover:bg-white/[0.04]',
            isCardInView 
              ? 'border border-white/70 shadow-[0_8px_30px_rgb(255,255,255,0.04)]' 
              : 'border border-transparent'
          )}
        >
          <div className="flex items-center gap-3 mb-2">
            <time className="text-lg font-mono text-white/60 tabular-nums">
              {entry.date}
            </time>
            <span className="text-white/30">·</span>
            <span className="text-lg text-white/60">
              {entry.organization}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-3">
            {entry.title}
          </h3>

          <p className="text-base md:text-lg text-white/70 leading-relaxed mb-4">
            {entry.description}
          </p>

          {entry.tags && (
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Wrapper to manage the scroll tracking for both Node and Card
function TimelineItem({ 
  entry, 
  index, 
  prefersReducedMotion 
}: { 
  entry: TimelineEntry; 
  index: number;
  prefersReducedMotion: boolean | null;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  
  // State for the node: Has the progress line passed this point?
  const [isLinePassed, setIsLinePassed] = useState(false);
  
  // State for the card: Is the card actively in the viewport?
  const isCardInView = useInView(itemRef, { amount: 0.2 });

  // Track the exact scroll progress of this specific item
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 0.8", "start 0.2"], // Matches the container's scroll offset
  });

  // Update node state when the line visually hits it
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsLinePassed(latest > 0.001);
  });

  const isLeft = index % 2 === 0;

  return (
    <div ref={itemRef} className="relative mb-32 md:mb-40 last:mb-0">
      <TimelineNode entry={entry} isLinePassed={isLinePassed} />
      <TimelineCard 
        entry={entry} 
        isLeft={isLeft} 
        isCardInView={isCardInView} 
        prefersReducedMotion={prefersReducedMotion} 
      />
    </div>
  );
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll progress for the timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 px-4 text-white overflow-hidden"
    >
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03),_transparent_60%)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-16 md:mb-24 text-center"
        >
          <span className="text-accent-signal font-mono text-xs tracking-wider uppercase">
            Journey
          </span>
          <h2
            className="mt-2 font-display tracking-[var(--tracking-tight)]"
            style={{ fontSize: 'var(--text-3xl)' }}
          >
            Experience
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          <TimelineLine progress={scaleY} prefersReducedMotion={prefersReducedMotion} />

          <div className="space-y-0">
            {entries.map((entry, index) => (
              <TimelineItem 
                key={`${entry.date}-${entry.title}`}
                entry={entry} 
                index={index} 
                prefersReducedMotion={prefersReducedMotion} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}