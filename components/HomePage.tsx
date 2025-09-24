'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { createTaskAction } from '@/app/actions';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { TextArea } from './ui/TextArea';
import { StepList } from './StepList';

interface DecomposeResponse {
  steps: string[];
}

export const HomePage = () => {
  const router = useRouter();
  const [idea, setIdea] = useState('');
  const [steps, setSteps] = useState<string[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleGenerate = async () => {
    if (!idea.trim()) {
      setError('Опиши задачу, чтобы получить шаги.');
      return;
    }
    setIsGenerating(true);
    setError(null);
    try {
      const response = await fetch('/api/decompose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: idea })
      });
      if (!response.ok) {
        throw new Error('Ошибка генерации шагов');
      }
      const data = (await response.json()) as DecomposeResponse;
      setSteps(data.steps);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось получить шаги');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateTask = (isPublic: boolean) => {
    if (!steps || steps.length === 0) {
      return;
    }
    startTransition(() => {
      createTaskAction({
        title: idea.trim() || 'Новая задача',
        steps,
        isPublic
      })
        .then((task) => {
          router.push(`/room/${task.code}`);
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : 'Не удалось создать задачу');
        });
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-12">
      <header className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">tenet</p>
        <h1 className="text-3xl font-bold text-slate-50 sm:text-4xl">Распакуй задачу и сделай её за фокус-сессию</h1>
        <p className="text-sm text-slate-400">
          Введи, что хочешь сделать, мы предложим три шага. Потом выбери: сделать тихо или вынести в общий поток.
        </p>
      </header>
      <Card className="space-y-6">
        <div className="space-y-3">
          <label htmlFor="idea" className="block text-sm font-medium text-slate-200">
            Что собираешься сделать?
          </label>
          <TextArea
            id="idea"
            placeholder="Например: подготовить презентацию по проекту"
            minLength={3}
            rows={4}
            value={idea}
            onChange={(event) => setIdea(event.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? 'Генерируем…' : 'Сгенерировать 3 шага'}
          </Button>
          {steps ? (
            <Button
              variant="secondary"
              onClick={() => {
                setSteps(null);
                setError(null);
              }}
            >
              Очистить
            </Button>
          ) : null}
        </div>
        {error ? <p className="text-sm text-pink-400">{error}</p> : null}
        {steps ? (
          <div className="space-y-6">
            <StepList steps={steps} title="Твой план" />
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => handleCreateTask(false)} disabled={isPending}>
                {isPending ? 'Создаём…' : 'Сделать сейчас'}
              </Button>
              <Button variant="secondary" onClick={() => handleCreateTask(true)} disabled={isPending}>
                {isPending ? 'Создаём…' : 'Сделать публичным и начать'}
              </Button>
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  );
};
