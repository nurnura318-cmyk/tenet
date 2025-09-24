import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => (
  <div className={cn('rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30', className)}>
    {children}
  </div>
);
