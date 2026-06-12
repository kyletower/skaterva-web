import * as React from 'react';

import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Surface container for premium content blocks.
 */
export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.76))] shadow-[0_20px_60px_rgba(2,6,23,0.45)]',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Card body grouping with room for the main content.
 */
export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn('p-5 md:p-6', className)} {...props} />;
}

/**
 * Top area for cards with title and supporting text.
 */
export function CardHeader({ className, ...props }: CardProps) {
  return <div className={cn('p-5 md:p-6 pb-0', className)} {...props} />;
}

/**
 * Footer area for secondary actions or metadata.
 */
export function CardFooter({ className, ...props }: CardProps) {
  return <div className={cn('p-5 md:p-6 pt-0', className)} {...props} />;
}
