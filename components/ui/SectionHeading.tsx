import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  label: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Standardized "label + heading + optional description" header used by every
 * section — replaces the previously hand-rolled variations in Services,
 * Timeline, and Contact.
 */
export function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center',
        className,
      )}
    >
      <span className="text-accent-signal font-mono text-xs tracking-wider uppercase">
        {label}
      </span>
      <h2
        className="mt-2 font-display tracking-[var(--tracking-tight)] text-text-primary"
        style={{ fontSize: 'var(--text-3xl)' }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-sm leading-[1.7] text-text-secondary',
            align === 'center' && 'mx-auto max-w-md',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
