import type { ReactNode } from 'react';
import type { Task } from '@/lib/mockStore';
import { Card } from './ui/Card';

interface TaskCardProps {
  task: Task;
  footer?: ReactNode;
  children?: ReactNode;
}

export const TaskCard = ({ task, footer, children }: TaskCardProps) => (
  <Card className="space-y-4">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-400">{task.status === 'done' ? 'Завершено' : 'В процессе'}</p>
        <h3 className="mt-1 text-lg font-semibold text-slate-100">{task.title}</h3>
      </div>
      {task.respects > 0 ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-pink-500/20 px-2 py-1 text-xs font-medium text-pink-300">
          ❤ {task.respects}
        </span>
      ) : null}
    </div>
    {children}
    <p className="text-xs text-slate-400">Код комнаты: {task.code}</p>
    {footer ? <div className="pt-2">{footer}</div> : null}
  </Card>
);
