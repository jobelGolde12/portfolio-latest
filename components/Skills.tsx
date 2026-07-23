'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import {
  FileCode,
  Code2,
  Terminal,
  Coffee,
  Braces,
  Atom,
  Triangle,
  SquareTerminal,
  Layers,
  Wind,
  LayoutGrid,
  Globe,
  GitBranch,
  Send,
  PenTool,
  Monitor,
  Container,
  Cloud,
  Database,
  DatabaseBackup,
  Network,
  Router,
  BadgeCheck,
  Server,
  ServerCog,
  type LucideIcon,
} from 'lucide-react';

// ─── Icon Registry ──────────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  JavaScript: FileCode,
  PHP: Code2,
  Python: Terminal,
  Java: Coffee,
  'C++': Braces,
  React: Atom,
  'Vue.js': Triangle,
  'Next.js': SquareTerminal,
  Laravel: Layers,
  Tailwind: Wind,
  Bootstrap: LayoutGrid,
  'HTML/CSS': Globe,
  Git: GitBranch,
  Postman: Send,
  Figma: PenTool,
  'VS Code': Monitor,
  Docker: Container,
  'Cloud Platforms': Cloud,
  MySQL: Database,
  phpMyAdmin: DatabaseBackup,
  Wireshark: Network,
  'LAN/WAN': Network,
  'IP Addressing': Router,
  TypeScript: BadgeCheck,
  XAMPP: Server,
  Laragon: ServerCog,
  'Inertia.js': Layers,
};

const GROUP_ICONS: Record<string, LucideIcon> = {
  core: Code2,
  systems: Database,
  craft: Layers,
  exploring: Terminal,
};

// ─── Data ───────────────────────────────────────────────────────
const skillGroups = [
  {
    id: 'core',
    title: 'Core engineering',
    description: "Languages & paradigms I'm genuinely fluent in",
    skills: ['JavaScript', 'PHP', 'Java', 'C++', 'Python'],
  },
  {
    id: 'systems',
    title: 'Systems & infrastructure',
    description: 'Where I operate — databases, networking, data',
    skills: ['MySQL', 'phpMyAdmin', 'LAN/WAN', 'IP Addressing', 'Wireshark'],
  },
  {
    id: 'craft',
    title: 'Craft & tooling',
    description: 'The day-to-day tools that shape how I work',
    skills: [
      'Laravel',
      'React',
      'Vue.js',
      'Next.js',
      'Inertia.js',
      'HTML/CSS',
      'Tailwind',
      'Bootstrap',
      'Git',
      'Postman',
      'Figma',
      'VS Code',
      'XAMPP',
      'Laragon',
    ],
  },
  {
    id: 'exploring',
    title: 'Currently exploring',
    description: 'Actively learning right now',
    skills: ['TypeScript', 'Docker', 'Cloud Platforms'],
  },
];

// ─── Variants ───────────────────────────────────────────────────
const headerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const headerChild: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: (emphasized: boolean) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: emphasized ? 0 : 0.08,
    },
  }),
};

const badgeStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.15 },
  },
};

const badgeChild: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── SkillBadge ─────────────────────────────────────────────────
function SkillBadge({ skill }: { skill: string }) {
  const Icon = ICON_MAP[skill] ?? FileCode;
  return (
    <motion.span
      variants={badgeChild}
      whileHover={{
        y: -2,
        scale: 1.04,
        transition: { type: 'spring', stiffness: 420, damping: 24 },
      }}
      whileTap={{ scale: 0.97 }}
      className="
        group/badge
        relative inline-flex items-center
        gap-1.5 sm:gap-[7px]
        px-2.5 py-1.5
        sm:px-3.5 sm:py-[7px]
        rounded-full
        border border-white/[0.07]
        bg-white/[0.03]
        text-[12px] sm:text-[13px] text-white/75 font-normal
        cursor-default select-none
        transition-colors duration-300
        hover:border-[var(--color-accent,#a78bfa)]/50
        hover:bg-white/[0.06]
        hover:text-white
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--color-accent,#a78bfa)]/60
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#09090b]
      "
      role="listitem"
      tabIndex={0}
      aria-label={skill}
    >
      <Icon
        className="
          w-3 h-3
          sm:w-3.5 sm:h-3.5
          text-white/35
          transition-colors duration-300
          group-hover/badge:text-[var(--color-accent,#a78bfa)]
        "
        strokeWidth={1.8}
        aria-hidden="true"
      />
      <span className="leading-none">{skill}</span>
    </motion.span>
  );
}

// ─── SkillCard ──────────────────────────────────────────────────
function SkillCard({
  group,
  emphasized,
}: {
  group: (typeof skillGroups)[number];
  emphasized: boolean;
}) {
  const GroupIcon = GROUP_ICONS[group.id] ?? Layers;
  const count = group.skills.length;

  return (
    <motion.article
      variants={cardVariants}
      custom={emphasized}
      whileHover={{
        y: -4,
        transition: { type: 'spring', stiffness: 300, damping: 22 },
      }}
      className="
        relative
        rounded-2xl
        sm:rounded-[22px]
        border border-white/[0.06]
        bg-white/[0.025]
        backdrop-blur-sm
        p-5
        sm:p-6
        md:p-7
        lg:p-8
        transition-all duration-300
        hover:border-[var(--color-accent,#a78bfa)]/30
        hover:bg-white/[0.045]
        hover:shadow-[0_8px_40px_-12px_rgba(167,139,250,0.08),0_1px_3px_rgba(0,0,0,0.3)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--color-accent,#a78bfa)]/50
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#09090b]
      "
      tabIndex={-1}
      aria-label={`${group.title} — ${count} skills`}
      style={{
        boxShadow: emphasized
          ? 'inset 0 1px 0 0 rgba(255,255,255,0.04), inset 0 0 40px -20px rgba(167,139,250,0.04), 0 1px 3px rgba(0,0,0,0.2)'
          : 'inset 0 1px 0 0 rgba(255,255,255,0.03), 0 1px 2px rgba(0,0,0,0.15)',
      }}
    >
      {/* ── Header row ── */}
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div
            className="
              flex items-center justify-center
              w-8 h-8
              sm:w-9 sm:h-9
              rounded-lg
              sm:rounded-xl
              bg-white/[0.05]
              border border-white/[0.06]
              text-white/50
              transition-colors duration-300
              group-hover/card:text-[var(--color-accent,#a78bfa)]
            "
          >
            <GroupIcon
              className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </div>
          <h3
            className="
              font-medium
              text-[14px] sm:text-[15px]
              text-white tracking-[-0.01em]
            "
          >
            {group.title}
          </h3>
        </div>
        <span
          className="
            font-mono text-[11px] tracking-wider
            text-white/25
            mt-1 sm:mt-1.5
            tabular-nums
          "
          aria-label={`${count} skills`}
        >
          {String(count).padStart(2, '0')}
        </span>
      </div>

      {/* ── Description ── */}
      <p
        className="
          text-[12.5px] sm:text-[13px]
          leading-[1.65] text-white/40
          mb-4 sm:mb-5
        "
      >
        {group.description}
      </p>

      {/* ── Divider ── */}
      <div
        className="
          h-px mb-4 sm:mb-5
          bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-transparent
        "
        aria-hidden="true"
      />

      {/* ── Badges ── */}
      <motion.div
        variants={badgeStagger}
        className="flex flex-wrap gap-1.5 sm:gap-2"
        role="list"
        aria-label={`${group.title} skills`}
      >
        {group.skills.map((skill) => (
          <SkillBadge key={skill} skill={skill} />
        ))}
      </motion.div>
    </motion.article>
  );
}

// ─── Section Header ─────────────────────────────────────────────
function SectionHeader() {
  return (
    <motion.div
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="mb-10 sm:mb-14 md:mb-16 lg:mb-20"
    >
      {/* Label */}
      <motion.span
        variants={headerChild}
        className="
          inline-block
          font-mono text-[11px] tracking-[0.14em] uppercase
          text-[var(--color-accent,#a78bfa)]
          mb-3 sm:mb-4
        "
      >
        Capabilities
      </motion.span>

      {/* Heading */}
      <motion.h2
        variants={headerChild}
        className="
          font-display tracking-[var(--tracking-tight)]
          text-white
          leading-[1.1]
          mb-4 sm:mb-5
        "
        style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
      >
        Skills
      </motion.h2>

      {/* Decorative line */}
      <motion.div
        variants={headerChild}
        className="w-10 sm:w-12 h-px bg-white/10 mb-4 sm:mb-5"
        aria-hidden="true"
      />

      {/* Supporting text */}
      <motion.p
        variants={headerChild}
        className="max-w-sm sm:max-w-md text-[13px] sm:text-[14px] leading-[1.75] text-white/45"
      >
        Stack I use day to day — focused on full-stack web, with a foundation
        in systems and networking.
      </motion.p>
    </motion.div>
  );
}

// ─── Skills Section ─────────────────────────────────────────────
export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="skills"
      ref={ref}
      className="
        relative
        py-20 sm:py-24 md:py-32 lg:py-36
        px-4 sm:px-6 lg:px-8
        overflow-hidden text-white
      "
    >
      {/* ── Background decorations ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Accent glow — top-right */}
        <div
          className="
            absolute
            -top-20 sm:-top-32
            right-0
            w-[300px] h-[300px]
            sm:w-[500px] sm:h-[500px]
            rounded-full opacity-[0.035]
          "
          style={{
            background:
              'radial-gradient(circle, var(--color-accent, #a78bfa) 0%, transparent 70%)',
            filter: 'blur(60px) sm:blur(80px)',
          }}
        />
        {/* Accent glow — bottom-left */}
        <div
          className="
            absolute
            -bottom-24 sm:-bottom-40
            -left-10 sm:-left-20
            w-[250px] h-[250px]
            sm:w-[400px] sm:h-[400px]
            rounded-full opacity-[0.025]
          "
          style={{
            background:
              'radial-gradient(circle, var(--color-accent, #a78bfa) 0%, transparent 70%)',
            filter: 'blur(80px) sm:blur(100px)',
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage:
              'radial-gradient(ellipse 60% 50% at 50% 40%, black 30%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 60% 50% at 50% 40%, black 30%, transparent 100%)',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative max-w-5xl lg:max-w-[1120px] mx-auto">
        <SectionHeader />

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4 sm:gap-5 md:gap-6
          "
        >
          {/* Core Engineering — spans full width on md+ */}
          <div className="md:col-span-2">
            <SkillCard group={skillGroups[0]} emphasized />
          </div>

          {/* Systems & Infrastructure */}
          <SkillCard group={skillGroups[1]} emphasized={false} />

          {/* Craft & Tooling */}
          <SkillCard group={skillGroups[2]} emphasized={false} />

          {/* Currently Exploring — spans full width on md+ */}
          <div className="md:col-span-2">
            <SkillCard group={skillGroups[3]} emphasized={false} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}