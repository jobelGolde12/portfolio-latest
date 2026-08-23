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
      <span className="editorial-label">{label}</span>
      <h2
        className="mt-3 font-display font-light leading-[1.08] tracking-[-0.03em] text-text-primary"
        style={{ fontSize: 'var(--text-4xl)' }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 max-w-md text-sm leading-[1.7] text-text-secondary',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
