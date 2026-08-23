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
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="editorial-label text-danger">Something went wrong</p>
      <h1
        className="mt-5 font-display font-light leading-[1.05] tracking-[-0.03em] text-text-primary"
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
          className="inline-flex min-h-11 items-center rounded-sm bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-sm border border-border-strong px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
