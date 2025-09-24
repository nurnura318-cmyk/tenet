import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StepListProps {
  steps: string[];
  title?: ReactNode;
  className?: string;
}

export const StepList = ({ steps, title, className }: StepListProps) => (
  <div className={cn('space-y-4', className)}>
    {title ? <h2 className="text-lg font-semibold text-slate-100">{title}</h2> : null}
    <ol className="space-y-3 text-sm text-slate-200">
      {steps.map((step, index) => (
        <li key={index} className="flex gap-3 rounded-lg bg-slate-800/60 p-3">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-sky-300">
            {index + 1}
          </span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  </div>
);
