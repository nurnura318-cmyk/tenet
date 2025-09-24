'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useTransition } from 'react';
import type { Task } from '@/lib/mockStore';
import { markTaskDoneAction } from '@/app/actions';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { StepList } from './StepList';

const FOCUS_DURATION = 25 * 60;

const formatTime = (value: number) => {
  const minutes = Math.floor(value / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
};

interface RoomClientProps {
  task: Task;
}

export const RoomClient = ({ task }: RoomClientProps) => {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(task.status === 'done');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const interval = setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          clearInterval(interval);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    setIsDone(task.status === 'done');
  }, [task.status]);

  const timerLabel = useMemo(() => formatTime(secondsLeft), [secondsLeft]);

  const handleStart = () => {
    if (secondsLeft === 0) {
      setSecondsLeft(FOCUS_DURATION);
    }
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleDone = () => {
    startTransition(() => {
      markTaskDoneAction(task.code).then((updated) => {
        if (updated) {
          setIsRunning(false);
          setIsDone(true);
          router.refresh();
        }
      });
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-10">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Комната {task.code}</p>
        <h1 className="text-3xl font-semibold text-slate-50">{task.title}</h1>
        <p className="text-sm text-slate-400">
          {task.isPublic
            ? 'Задача видна в общей ленте. Делись результатом!'
            : 'Эта задача только для тебя. Фокусируйся и завершай шаги.'}
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <Card className="space-y-6">
          <h2 className="text-lg font-semibold text-slate-100">Твои шаги</h2>
          <StepList steps={task.steps} />
        </Card>
        <Card className="flex flex-col items-center gap-6 text-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Фокус-сессия</p>
            <p className="mt-3 text-5xl font-bold text-slate-50">{timerLabel}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={handleStart} disabled={isRunning || isDone}>
              Старт
            </Button>
            <Button variant="secondary" onClick={handleStop} disabled={!isRunning}>
              Стоп
            </Button>
            <Button variant="ghost" onClick={handleDone} disabled={isDone || isPending}>
              {isPending ? 'Отмечаем…' : 'Готово'}
            </Button>
          </div>
          {isDone ? <p className="text-sm text-emerald-400">Задача отмечена выполненной.</p> : null}
        </Card>
      </div>
    </div>
  );
};
