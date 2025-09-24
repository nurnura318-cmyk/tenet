'use client';

import { useEffect, useState } from 'react';
import type { Task } from '@/lib/mockStore';
import { respectTaskAction } from '@/app/actions';
import { TaskCard } from './TaskCard';
import { StepList } from './StepList';
import { Button } from './ui/Button';

interface FeedClientProps {
  tasks: Task[];
}

export const FeedClient = ({ tasks }: FeedClientProps) => {
  const [items, setItems] = useState(tasks);
  const [respectedCodes, setRespectedCodes] = useState<string[]>([]);
  const [pendingCode, setPendingCode] = useState<string | null>(null);

  useEffect(() => {
    setItems(tasks);
  }, [tasks]);

  const handleRespect = async (code: string) => {
    if (respectedCodes.includes(code)) {
      return;
    }
    setPendingCode(code);
    try {
      const updated = await respectTaskAction(code);
      if (updated) {
        setItems((prev) => prev.map((task) => (task.code === code ? updated : task)));
        setRespectedCodes((prev) => [...prev, code]);
      }
    } finally {
      setPendingCode((current) => (current === code ? null : current));
    }
  };

  if (items.length === 0) {
    return <p className="text-sm text-slate-400">Пока нет публичных задач. Поделись своей с главной страницы!</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((task) => (
        <TaskCard
          key={task.code}
          task={task}
          footer={
            <Button
              variant="secondary"
              onClick={() => handleRespect(task.code)}
              disabled={respectedCodes.includes(task.code) || pendingCode === task.code}
            >
              {respectedCodes.includes(task.code) ? 'Респект засчитан!' : pendingCode === task.code ? 'Отправляем…' : '❤ Респект'}
            </Button>
          }
        >
          <StepList steps={task.steps} />
        </TaskCard>
      ))}
    </div>
  );
};
