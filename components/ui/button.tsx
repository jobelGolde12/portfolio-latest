import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-signal text-white hover:brightness-110 active:scale-[0.98] shadow-sm hover:shadow-md',
  secondary:
    'border border-border-strong bg-transparent text-text-primary hover:bg-bg-surface-2 active:scale-[0.98]',
  ghost:
    'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-surface-2 active:scale-[0.98]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-medium',
          'transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-signal focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
          'disabled:opacity-[var(--opacity-disabled)] disabled:cursor-not-allowed disabled:hover:shadow-none',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
