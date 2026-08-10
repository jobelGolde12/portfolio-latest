'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog } from '@/components/ui/dialog';
import { Tag } from '@/components/ui/tag';
import { projects, type ProjectCaseStudy } from '@/data/projects';

/* ─── Helpers ──────────────────────────────────────────── */

const CARD_WIDTH_VW = 70;
const GAP_VW = 2.5;
const FIRST_CARD_OFFSET_VW = 5; // left padding so first card isn't flush

const totalContentWidthVW =
  projects.length * CARD_WIDTH_VW +
  (projects.length - 1) * GAP_VW +
  FIRST_CARD_OFFSET_VW;

const xTravelVW = -(totalContentWidthVW - 100); // negative = scroll left

const labelClass =
  'font-mono text-[11px] tracking-[0.2em] uppercase text-text-secondary mb-3';

/* ─── Card ─────────────────────────────────────────────── */

/**
 * Project media card. A button that opens the case-study dialog — keyboard
 * accessible, with the external links living inside the dialog.
 */
function ProjectCard({
  project,
  priority,
  onOpen,
}: {
  project: ProjectCaseStudy;
  priority?: boolean;
  onOpen: () => void;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(project.image) && !imageFailed;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative w-[70vw] flex-none rounded-2xl overflow-hidden shadow-2xl shadow-black/30 block text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-signal focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b]"
      aria-label={`Open case study: ${project.title}`}
    >
      {/* 16:9 aspect box — height comes from width, independent of children */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        {/* Always-on gradient base (visible by default / on image failure) */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-[1.03]',
            project.gradient,
          )}
          aria-hidden
        />

        {showImage && project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="70vw"
            priority={priority}
            className="object-cover brightness-[1.15] contrast-[1.1] transition-transform duration-500 group-hover:scale-[1.03]"
            onError={() => setImageFailed(true)}
          />
        )}

        {/* Soft edge ring */}
        <div
          className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06] pointer-events-none"
          aria-hidden
        />

        {/* Title + hint */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
          <span className="block text-sm sm:text-base md:text-lg font-medium text-white tracking-tight">
            {project.title}
          </span>
          <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase text-white/60 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            View case study
            <ArrowUpRight className="w-3 h-3" />
          </p>
        </div>
      </div>
    </button>
  );
}

/* ─── Case-study dialog ────────────────────────────────── */

function CaseStudySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7">
      <p className={labelClass}>{title}</p>
      {children}
    </section>
  );
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <Dialog open onClose={onClose} ariaLabel={`${project.title} case study`}>
      <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8">
        {/* Header */}
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-signal-text">
          {project.tagline}
        </p>
        <h3 className="mt-2 font-display text-2xl sm:text-3xl tracking-[var(--tracking-tight)] text-text-primary">
          {project.title}
        </h3>

        {/* Media */}
        {project.image && (
          <div className="mt-5 relative w-full rounded-xl overflow-hidden ring-1 ring-inset ring-white/[0.06]">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-br',
                  project.gradient,
                )}
                aria-hidden
              />
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 90vw, 512px"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Case study */}
        <CaseStudySection title="The problem">
          <p className="text-sm leading-[1.75] text-text-secondary">
            {project.problem}
          </p>
        </CaseStudySection>

        <CaseStudySection title="Approach">
          <p className="text-sm leading-[1.75] text-text-secondary">
            {project.approach}
          </p>
        </CaseStudySection>

        <CaseStudySection title="Trade-offs">
          <ul className="space-y-2">
            {project.tradeoffs.map((t) => (
              <li key={t} className="flex gap-2.5 text-sm leading-[1.7] text-text-secondary">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-signal" aria-hidden />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection title="Outcomes">
          <ul className="space-y-2">
            {project.outcomes.map((o) => (
              <li key={o} className="flex gap-2.5 text-sm leading-[1.7] text-text-primary">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-success" aria-hidden />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </CaseStudySection>

        {/* Stack */}
        {project.stack.length > 0 && (
          <CaseStudySection title="Stack">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </CaseStudySection>
        )}

        {/* Links */}
        <div className="mt-8 flex flex-wrap gap-3 pt-6 border-t border-border-subtle">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent-signal px-5 py-2.5 text-sm font-medium text-white transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-signal focus-visible:ring-offset-2"
            >
              Visit live site
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-signal focus-visible:ring-offset-2"
            >
              View source
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </Dialog>
  );
}

/* ─── Component ────────────────────────────────────────── */

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<ProjectCaseStudy | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `${xTravelVW}vw`]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100vh + ${totalContentWidthVW}vw)` }}
      aria-label="Projects"
    >
      <h2 className="sr-only">Projects</h2>

      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* ── Horizontal track ── */}
        <motion.div
          className="flex items-center gap-[2.5vw] pl-[5vw] will-change-transform"
          style={{ x }}
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={i < 2}
              onOpen={() => setSelected(project)}
            />
          ))}
        </motion.div>
      </div>

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
