'use client';

import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="inline-flex min-h-11 items-center gap-1.5 rounded-sm px-1 text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
      aria-label="Back to top"
    >
      <ArrowUp className="w-3.5 h-3.5" aria-hidden />
      <span className="text-xs">Top</span>
    </button>
  );
}
