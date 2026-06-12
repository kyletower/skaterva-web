import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Dark input field styled for the site contact experience.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-12 w-full rounded-[16px] border border-white/10 bg-white/5 px-4 text-sm text-slate-50 placeholder:text-slate-400/80 shadow-sm transition-colors',
          'focus-visible:border-[#22d3ee]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]/40',
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
