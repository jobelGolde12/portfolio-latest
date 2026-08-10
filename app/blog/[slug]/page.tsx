import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getPost, posts, type PostBlock } from '@/data/posts';
import { formatDate } from '@/lib/format';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
    },
  };
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2
          className="mt-12 mb-4 font-display text-2xl tracking-[var(--tracking-tight)] text-text-primary"
          style={{ fontSize: 'var(--text-2xl)' }}
        >
          {block.text}
        </h2>
      );
    case 'ul':
      return (
        <ul className="my-6 space-y-3">
          {block.items?.map((item) => (
            <li key={item} className="flex gap-3 text-base leading-[1.85] text-text-secondary">
              <span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-accent-signal" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'code':
      return (
        <pre className="my-6 overflow-x-auto rounded-xl border border-code-border bg-code-bg p-5 font-mono text-sm leading-relaxed text-text-secondary">
          <code>{block.code}</code>
        </pre>
      );
    default:
      return <p className="my-5 text-base leading-[1.85] text-text-secondary">{block.text}</p>;
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="pt-28 sm:pt-32 pb-24 px-4 text-white">
      <div className="max-w-[720px] mx-auto">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-text-tertiary transition-colors hover:text-accent-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-signal rounded-md"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden />
          All posts
        </Link>

        {/* Header */}
        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-text-tertiary">
            <time dateTime={post.date}>{formatDate(post.date, { month: 'long' })}</time>
            <span aria-hidden>·</span>
            <span>{post.readMinutes} min read</span>
          </div>
          <h1
            className="mt-4 font-display leading-[1.15] tracking-[var(--tracking-tight)] text-text-primary"
            style={{ fontSize: 'var(--text-4xl)' }}
          >
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-bg-surface-2 px-2 py-0.5 font-mono text-xs text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Body */}
        <div className="mt-10 border-t border-border-subtle pt-4">
          {post.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </div>
    </article>
  );
}
