import Link from 'next/link';
import { TaskCard } from '@/components/TaskCard';
import { StepList } from '@/components/StepList';
import { listDoneTasks } from '@/lib/mockStore';

export default function MePage() {
  const tasks = listDoneTasks();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Мой прогресс</p>
        <h1 className="text-3xl font-semibold text-slate-50">Завершённые задачи</h1>
        <p className="text-sm text-slate-400">
          После отметки «Готово» задачи попадут сюда. Хочешь начать новую? <Link href="/" className="underline">Вернуться на главную</Link>.
        </p>
      </header>
      {tasks.length === 0 ? (
        <p className="text-sm text-slate-400">Пока нет завершённых задач. Загляни в комнату и жми «Готово».</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard key={task.code} task={task}>
              <StepList steps={task.steps} />
            </TaskCard>
          ))}
        </div>
      )}
    </div>
  );
}
