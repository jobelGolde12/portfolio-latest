import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, required, ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-text-secondary"
        >
          {label}
          {required && <span className="text-accent-warm ml-0.5" aria-hidden>*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          required={required}
          className={cn(
            'w-full rounded-md border border-border-subtle bg-dark-light px-4 py-3 text-sm text-text-primary',
            'placeholder:text-text-tertiary',
            'transition-colors duration-[var(--duration-fast)]',
            'focus:outline-none focus:border-accent-signal focus:ring-1 focus:ring-accent-signal',
            error && 'border-danger focus:border-danger focus:ring-danger',
            className,
          )}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-danger" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input, type InputProps };