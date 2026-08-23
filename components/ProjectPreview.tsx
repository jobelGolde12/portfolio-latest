'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, MonitorPlay, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Project } from '@/data/projects';

type LiveStatus = 'idle' | 'loading' | 'ready' | 'failed';

const LOAD_TIMEOUT_MS = 15000;

/**
 * Card media block.
 *
 * - Screenshot by default; zero external requests until asked for.
 * - Embeddable projects get an always-visible "Live preview" chip that mounts
 *   the deployed site in-place on first click (lazy — never on page load).
 *   Blocked sites are never attempted (probed via response headers).
 * - A load timeout reverts honestly to the screenshot with a note.
 */
export function ProjectPreview({
  project,
  priority,
}: {
  project: Project;
  priority?: boolean;
}) {
  const canEmbed = Boolean(project.links.demo && project.embeddable);
  const [live, setLive] = useState(false);
  const [liveStatus, setLiveStatus] = useState<LiveStatus>('idle');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fallback timer: if the iframe never fires onLoad within the timeout
  // (cold-start crash, network failure), revert honestly.
  useEffect(() => {
    if (!live) return;

    timeoutRef.current = setTimeout(() => {
      setLiveStatus((s) => (s === 'ready' ? s : 'failed'));
    }, LOAD_TIMEOUT_MS);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (timeoutRef.current) timeoutRef.current = null;
    };
  }, [live]);

  const handleLoad = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setLiveStatus('ready');
  };

  const toggle = () => {
    if (live) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setLive(false);
      setLiveStatus('idle');
      return;
    }
    setLive(true);
    setLiveStatus('loading');
  };

  const showFrame = canEmbed && live && liveStatus !== 'failed';

  return (
    <div>
      <div
        className={`
          group relative overflow-hidden rounded-sm border border-border-subtle
          bg-bg-surface focus-within:ring-2 focus-within:ring-ink focus-within:ring-offset-2
        `}
      >
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          {/* Screenshot layer (default + fallback) */}
          <Image
            src={project.image ?? ''}
            alt={`${project.title} — preview of the application`}
            fill
            sizes="(max-width: 1024px) 92vw, 720px"
            priority={priority}
            className={cn(
              'object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]',
              showFrame && 'opacity-0',
            )}
          />

          {/* Live layer */}
          {showFrame && (
            <>
              <iframe
                src={project.links.demo}
                title={`${project.title} — live site`}
                onLoad={handleLoad}
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                className="absolute inset-0 h-full w-full border-0 bg-white"
              />
              {liveStatus === 'loading' && (
                <p className="absolute left-3 top-3 inline-flex items-center gap-1.5 bg-bg-base px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-text-secondary shadow-md">
                  Loading live preview…
                </p>
              )}
            </>
          )}

          {/* View label while showing the real site */}
          {showFrame && liveStatus === 'ready' && (
            <p className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 bg-bg-base px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-text-primary shadow-md">
              Live preview
            </p>
          )}

          {/* Toggle chip — always visible (not hover-gated), touch-friendly */}
          {canEmbed && (
            <button
              type="button"
              onClick={toggle}
              aria-pressed={showFrame}
              className="
                absolute bottom-3 right-3 z-10 inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-sm
                border border-border-subtle bg-bg-base px-3 py-1.5 font-mono text-[11px]
                uppercase tracking-wider text-text-primary shadow-md transition-colors
                hover:bg-bg-surface focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ink focus-visible:ring-offset-2
              "
            >
              {showFrame ? (
                <>
                  <ImageIcon className="h-3.5 w-3.5" aria-hidden />
                  Screenshot
                </>
              ) : (
                <>
                  <MonitorPlay className="h-3.5 w-3.5" aria-hidden />
                  Live preview
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Honest failure note */}
      <p aria-live="polite" className="mt-2 min-h-5 empty:min-h-0">
        {canEmbed && live && liveStatus === 'failed' && (
          <span className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
            Live preview didn’t load here.
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
