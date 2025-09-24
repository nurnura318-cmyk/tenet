'use client';

import type { ButtonHTMLAttributes, ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-sky-500 text-slate-50 hover:bg-sky-400 focus-visible:outline-sky-300 disabled:bg-slate-500 disabled:text-slate-200',
  secondary:
    'bg-slate-800 text-slate-100 hover:bg-slate-700 focus-visible:outline-sky-300 disabled:bg-slate-800/70',
  ghost: 'bg-transparent text-slate-200 hover:bg-slate-800/70 focus-visible:outline-sky-300'
};

const ButtonBase = (
  { className, variant = 'primary', type = 'button', ...props }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => (
  <button
    ref={ref}
    type={type}
    className={cn(
      'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
      variantStyles[variant],
      className
    )}
    {...props}
  />
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(ButtonBase);
Button.displayName = 'Button';
