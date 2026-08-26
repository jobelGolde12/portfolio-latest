'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import type { Project } from '@/data/projects';

type Status = 'idle' | 'loading' | 'ready' | 'slow' | 'failed';

const SLOW_TIMEOUT_MS = 15000;

/**
 * Card media block — live-first.
 *
 * - Embeddable projects render their deployed site directly in an iframe.
 *   No screenshot layer, no toggle.
 * - The iframe mounts only once the card scrolls near the viewport
 *   (IntersectionObserver) so page load stays clean.
 * - A slow-load note appears if the frame hasn't reported back in 15s;
 *   the frame stays mounted so late loads still land.
 * - Projects whose deployments forbid framing (probed headers) or that have
 *   no deployment fall back to plain card imagery.
 */
export function ProjectPreview({ project }: { project: Project }) {
  const canEmbed = Boolean(project.links.demo && project.embeddable);
  const holderRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    if (!canEmbed || inView) return;
    const el = holderRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          setStatus('loading');
          io.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [canEmbed, inView]);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(
      () => setStatus((s) => (s === 'ready' ? s : 'slow')),
      SLOW_TIMEOUT_MS,
    );
    return () => clearTimeout(t);
  }, [inView]);

  /* Static media — projects that cannot be framed / have no deployment */
  if (!canEmbed) {
    return (
      <div
        className="
          relative overflow-hidden rounded-sm border border-border-subtle bg-bg-surface
        "
      >
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} — preview of the application`}
              fill
              sizes="(max-width: 1024px) 92vw, 720px"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-bg-surface to-bg-base p-6 text-center">
              <span className="font-display text-xl font-light tracking-tight text-text-primary">
                {project.title}
              </span>
              <span className="text-xs text-text-tertiary">No preview available</span>
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 rounded-sm bg-ink px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-black"
                >
                  Open live site
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  /* If iframe failed (e.g. site blocks framing), show image fallback */
  if (status === 'failed') {
    return (
      <div
        className="
          relative overflow-hidden rounded-sm border border-border-subtle bg-bg-surface
        "
      >
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} — preview of the application`}
              fill
              sizes="(max-width: 1024px) 92vw, 720px"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-bg-surface to-bg-base p-6 text-center">
              <span className="font-display text-xl font-light tracking-tight text-text-primary">
                {project.title}
              </span>
              <span className="text-xs text-text-tertiary">Live preview unavailable</span>
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 rounded-sm bg-ink px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-black"
                >
                  Open live site
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  /* Live media */
  return (
    <div>
      <div
        ref={holderRef}
        className="
          relative overflow-hidden rounded-sm border border-border-subtle
          bg-bg-surface focus-within:ring-2 focus-within:ring-ink focus-within:ring-offset-2
        "
      >
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          {inView && (
            <iframe
              src={project.links.demo}
              title={`${project.title} — live site`}
              onLoad={() => setStatus('ready')}
              onError={() => setStatus('failed')}
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              className="absolute inset-0 h-full w-full border-0 bg-white"
            />
          )}

          {/* Skeleton while the real site streams in */}
          {status === 'loading' && (
            <>
              <div className="absolute inset-0 animate-pulse bg-bg-surface" aria-hidden />
              <p className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-sm bg-bg-base px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-text-secondary shadow-md">
                Loading live preview…
              </p>
            </>
          )}

          {/* View label once live */}
          {status === 'ready' && (
            <p className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-sm bg-bg-base px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-text-primary shadow-md">
              Live preview
            </p>
          )}
        </div>
      </div>

      {/* Honest slow-load note */}
      <p aria-live="polite" className="mt-2 min-h-5 empty:min-h-0">
        {status === 'slow' && (
          <span className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
            Live preview is slow to respond — it may still be waking up.
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline decoration-border-strong underline-offset-4 hover:text-text-primary"
              >
                Open it directly
                <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            )}
          </span>
        )}
      </p>
    </div>
  );
}
