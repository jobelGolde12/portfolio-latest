import { cn } from '@/lib/utils';

type BadgeStatus = 'success' | 'warning' | 'warm' | 'muted';

interface BadgeProps {
  status: BadgeStatus;
  label: string;
  className?: string;
}

const statusConfig: Record<BadgeStatus, { dot: string; text: string }> = {
  success: { dot: 'bg-success', text: 'text-success' },
  warning: { dot: 'bg-warning', text: 'text-warning' },
  warm: { dot: 'bg-accent-warm', text: 'text-accent-warm' },
  muted: { dot: 'bg-text-tertiary', text: 'text-text-tertiary' },
};

export function Badge({ status, label, className }: BadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-medium',
        config.text,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full animate-signal-pulse', config.dot)} aria-hidden />
      {label}
    </span>
  );
}
