'use client';

import type { ForwardedRef, TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextAreaBase = (
  { className, ...props }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) => (
  <textarea
    ref={ref}
    className={cn(
      'w-full rounded-md border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/60',
      className
    )}
    {...props}
  />
);

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(TextAreaBase);
TextArea.displayName = 'TextArea';
