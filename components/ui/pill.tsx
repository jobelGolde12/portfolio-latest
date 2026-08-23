import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
}

/**
 * Static label chip. Rendered as a <span> — these are non-interactive labels
 * (e.g. languages, interests), so they must not be focusable buttons.
 */
const Pill = forwardRef<HTMLSpanElement, PillProps>(
  ({ className, active = false, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-sm px-2.5 py-1 text-[13px] transition-colors duration-[var(--duration-fast)]',
          active
            ? 'bg-accent-signal text-white'
            : 'border border-border-subtle bg-bg-base text-text-secondary',
          className,
        )}
        {...props}
      />
    );
  },
);

Pill.displayName = 'Pill';

export { Pill, type PillProps };
