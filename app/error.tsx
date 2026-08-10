'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log client-side errors for diagnostics.
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center text-white">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 40%, rgba(255,92,122,0.08), transparent 100%)',
        }}
      />

      <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-danger">
        Something went wrong
      </p>
      <h1
        className="mt-4 font-display leading-[1.1] tracking-[var(--tracking-tight)] text-text-primary"
        style={{ fontSize: 'var(--text-4xl)' }}
      >
        This page hit an error
      </h1>
      <p className="mt-6 max-w-md text-sm leading-[1.8] text-text-secondary">
        An unexpected error occurred while rendering this page. Try again — or
        head back to the homepage.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center rounded-full bg-accent-signal px-6 py-3 text-sm font-medium text-white transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-signal focus-visible:ring-offset-2"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-border-strong px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-signal focus-visible:ring-offset-2"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
