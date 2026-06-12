import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * Textarea used for richer contact and inquiry forms.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'min-h-[140px] w-full rounded-[16px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-50 placeholder:text-slate-400/80 shadow-sm transition-colors',
          'focus-visible:border-[#22d3ee]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]/40',
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
