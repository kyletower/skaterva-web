import * as React from 'react';

import { cn } from '@/lib/utils';

export type BadgeProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Small label used to emphasize metadata and status.
 */
export function Badge({ className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-100/90',
        'bg-white/6 backdrop-blur-sm',
        className
      )}
      {...props}
    />
  );
}
