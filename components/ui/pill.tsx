import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface PillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const Pill = forwardRef<HTMLButtonElement, PillProps>(
  ({ className, active = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-[var(--duration-fast)]',
          active
            ? 'bg-accent-signal text-white'
            : 'bg-bg-surface-2 text-text-secondary hover:text-text-primary hover:bg-bg-surface',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-signal focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
          className,
        )}
        {...props}
      />
    );
  },
);

Pill.displayName = 'Pill';

export { Pill, type PillProps };
