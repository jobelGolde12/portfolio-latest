import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="editorial-label">404 — page not found</p>
      <h1
        className="mt-5 font-display font-light leading-[1.02] tracking-[-0.04em] text-text-primary"
        style={{ fontSize: 'clamp(3.5rem, 12vw, 7rem)' }}
      >
        Nothing here<span aria-hidden>.</span>
      </h1>
      <p className="mt-6 max-w-md text-sm leading-[1.8] text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist — but the portfolio is
        one click away.
      </p>

      <Link
        href="/"
        className="mt-10 inline-flex min-h-11 items-center gap-2 rounded-sm bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back home
      </Link>
    </div>
  );
}
