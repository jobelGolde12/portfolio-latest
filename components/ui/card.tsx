import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg bg-dark p-6',
          hoverable &&
            'transition-all duration-200 ease-[var(--ease-out)] hover:border-border-strong hover:-translate-y-0.5 hover:shadow-md',
          className,
        )}
        {...props}
      />
    );
  },
);

Card.displayName = 'Card';

export { Card, type CardProps };
