import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { posts } from '@/data/posts';
import { formatDate } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Notes on building things — Laravel, Vue.js, React, and the lessons in between.',
};

export default function BlogPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 px-4 text-white">
      <div className="max-w-[1120px] mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span className="text-accent-signal font-mono text-xs tracking-wider uppercase">
            Writing
          </span>
          <h1
            className="mt-2 font-display tracking-[var(--tracking-tight)] text-text-primary"
            style={{ fontSize: 'var(--text-4xl)' }}
          >
            Blog
          </h1>
          <p className="mt-4 max-w-md text-sm leading-[1.7] text-text-secondary">
            Notes on building things — the decisions, trade-offs, and lessons
            that don&apos;t fit in a project card.
          </p>
        </div>

        {/* Posts */}
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-signal/30 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-signal"
            >
              <div>
                <div className="flex items-center gap-3 font-mono text-xs text-text-tertiary">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden>·</span>
                  <span>{post.readMinutes} min read</span>
                </div>
                <h2 className="mt-4 font-display text-xl tracking-[var(--tracking-tight)] text-text-primary leading-snug group-hover:text-accent-signal-text transition-colors">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-[1.75] text-text-secondary">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowUpRight
                  className="w-4 h-4 text-text-tertiary transition-all duration-300 group-hover:text-accent-signal group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
