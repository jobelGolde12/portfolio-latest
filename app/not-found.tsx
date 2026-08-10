import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center text-white">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 40%, rgba(124,92,255,0.08), transparent 100%)',
        }}
      />

      <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-signal">
        404 — page not found
      </p>
      <h1
        className="mt-4 font-display leading-[1.1] tracking-[var(--tracking-tight)]"
        style={{ fontSize: 'clamp(4rem, 14vw, 9rem)' }}
      >
        Lost in the dark
      </h1>
      <p className="mt-6 max-w-md text-sm leading-[1.8] text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist — but the portfolio
        is one click away.
      </p>

      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent-signal px-6 py-3 text-sm font-medium text-white transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-signal focus-visible:ring-offset-2"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden />
        Back home
      </Link>
    </div>
  );
}
