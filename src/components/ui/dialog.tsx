'use client';

import * as React from 'react';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Accessible modal dialog using the native dialog element.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  className,
}: DialogProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose();
        }
      }}
      className={cn(
        'fixed inset-0 z-50 m-auto w-[min(100%-2rem,32rem)] max-h-[min(90vh,calc(100svh-2rem))] overflow-y-auto rounded-[24px] border border-white/10 bg-[#0b1220] p-0 text-slate-50 shadow-[0_24px_80px_rgba(2,6,23,0.65)] backdrop:bg-black/70 open:animate-in',
        className
      )}
    >
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/8 bg-[#0b1220]/95 px-6 py-5 backdrop-blur-md">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {description ? (
            <p className="text-sm text-slate-400">{description}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="px-6 py-5">{children}</div>
    </dialog>
  );
}
