import * as React from 'react';

import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

/**
 * Styled action button used throughout the marketing pages.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      asChild,
      children,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default:
        'bg-[linear-gradient(135deg,var(--neon-primary),var(--accent-cyan))] text-slate-950 shadow-[0_16px_40px_rgba(217,70,239,0.28)] hover:shadow-[0_18px_44px_rgba(34,211,238,0.26)]',
      secondary:
        'border border-white/10 bg-white/8 text-slate-50 hover:bg-white/12',
      outline:
        'border border-white/12 bg-transparent text-slate-50 hover:bg-white/6',
      ghost: 'bg-transparent text-slate-200 hover:bg-white/6 hover:text-white',
    } as const;

    const sizeClasses = {
      sm: 'h-10 rounded-xl px-4 text-sm',
      md: 'h-12 rounded-[16px] px-5 text-sm md:text-base',
      lg: 'h-14 rounded-[18px] px-6 text-base md:text-lg',
    } as const;

    const classes = cn(
      'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 ease-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:pointer-events-none disabled:opacity-50',
      'hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.99]',
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;

      return React.cloneElement(child, {
        className: cn(classes, child.props.className),
      });
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
