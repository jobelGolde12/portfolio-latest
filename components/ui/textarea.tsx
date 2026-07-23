import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, required, ...props }, ref) => {
    const textareaId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-text-secondary"
        >
          {label}
          {required && <span className="text-accent-warm ml-0.5" aria-hidden>*</span>}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          required={required}
          className={cn(
            'w-full rounded-md border border-border-subtle bg-dark-light px-4 py-3 text-sm text-text-primary',
            'placeholder:text-text-tertiary resize-none min-h-[120px]',
            'transition-colors duration-[var(--duration-fast)]',
            'focus:outline-none focus:border-accent-signal focus:ring-1 focus:ring-accent-signal',
            error && 'border-danger focus:border-danger focus:ring-danger',
            className,
          )}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-xs text-danger" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

export { Textarea, type TextareaProps };