import { FeedClient } from '@/components/FeedClient';
import { listPublicTasks } from '@/lib/mockStore';

export default function FeedPage() {
  const tasks = listPublicTasks();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Общий поток</p>
        <h1 className="text-3xl font-semibold text-slate-50">Задачи комьюнити</h1>
        <p className="text-sm text-slate-400">Поддержи других, жми «❤ Респект» один раз и возвращайся к своему фокусу.</p>
      </header>
      <FeedClient tasks={tasks} />
    </div>
  );
}
