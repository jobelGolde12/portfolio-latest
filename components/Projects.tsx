import { ArrowUpRight } from 'lucide-react';
import { ProjectPreview } from '@/components/ProjectPreview';
import { projects, type Project } from '@/data/projects';

/* ─── Project row — editorial alternating layout ───────── */

function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const mediaFirst = index % 2 === 0;
  const primary = project.links.demo
    ? { href: project.links.demo, label: 'Live demo' }
    : { href: project.links.repo!, label: 'View source' };
  const secondary = project.links.demo
    ? project.links.repo && { href: project.links.repo, label: 'Source' }
    : undefined;

  return (
    <article
      className="
        grid gap-x-12 gap-y-6 border-b border-border-subtle py-10 md:py-14
        lg:grid-cols-12 lg:items-center
      "
    >
      {/* Media well */}
      <div className={`lg:col-span-7 ${mediaFirst ? '' : 'lg:order-2'}`}>
        <ProjectPreview project={project} />
      </div>

      {/* Text */}
      <div className="lg:col-span-5">
        <p className="editorial-label mb-3">
          {String(index + 1).padStart(2, '0')} · {project.tagline}
        </p>
        <h3 className="font-display text-2xl font-light tracking-[-0.02em] text-text-primary md:text-3xl">
          {project.title}
        </h3>

        <p className="mt-4 max-w-md text-sm leading-[1.75] text-text-secondary">
          {project.description}
        </p>

        {/* Primary action + optional secondary link */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={primary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 rounded-sm bg-ink px-5 py-2.5 text-sm
              font-medium text-white transition-colors hover:bg-black
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink
              focus-visible:ring-offset-2
            "
          >
            {primary.label}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          {secondary && (
            <a
              href={secondary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                editorial-link text-sm text-text-secondary underline
                decoration-border-strong underline-offset-4 hover:text-text-primary
                hover:decoration-text-secondary focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2
              "
            >
              {secondary.label} ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* ─── Section ──────────────────────────────────────────── */

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="editorial-label">Selected work</p>
          </div>
          <div className="lg:col-span-8">
            <h2
              id="projects-heading"
              className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-light leading-[1.08] tracking-[-0.03em] text-text-primary"
            >
              Projects<span aria-hidden>.</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-[1.7] text-text-secondary">
              Five real products I have shipped — what each one does and who it
              is for.
            </p>
          </div>
        </div>

        {/* Index rows */}
        <div className="border-t border-border-subtle">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
