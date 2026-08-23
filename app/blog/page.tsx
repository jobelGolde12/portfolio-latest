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
    <div className="mx-auto max-w-[1280px] px-5 pb-24 pt-28 sm:px-8 sm:pt-32 lg:px-12">
      {/* Header */}
      <div className="mb-12 md:mb-16">
        <p className="editorial-label">Writing</p>
        <h1
          className="mt-4 font-display font-light leading-[1.05] tracking-[-0.03em] text-text-primary"
          style={{ fontSize: 'var(--text-display)' }}
        >
          Blog
        </h1>
        <p className="mt-6 max-w-md text-sm leading-[1.7] text-text-secondary">
          Notes on building things — the decisions, trade-offs, and lessons that
          don&apos;t fit in a project card.
        </p>
      </div>

      {/* Posts — index rows */}
      <ul className="border-t border-border-subtle">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-border-subtle">
            <Link
              href={`/blog/${post.slug}`}
              className="group grid gap-x-10 gap-y-2 py-8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink md:grid-cols-[9rem_1fr_auto] md:py-10"
            >
              <time
                dateTime={post.date}
                className="pt-1 font-mono text-xs text-text-faint tabular-nums"
              >
                {formatDate(post.date)}
              </time>
              <div>
                <h2 className="font-display text-xl font-normal tracking-[-0.02em] text-text-primary transition-colors group-hover:text-text-secondary md:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-[1.75] text-text-secondary">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm border border-border-subtle bg-bg-surface px-2 py-0.5 font-mono text-[11px] text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="px-1 py-0.5 font-mono text-[11px] text-text-faint">
                    {post.readMinutes} min read
                  </span>
                </div>
              </div>
              <span className="hidden items-start pt-1 md:flex" aria-hidden>
                <ArrowUpRight className="h-4 w-4 text-text-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text-primary" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
