'use server';

import { revalidatePath } from 'next/cache';
import { createTask, markTaskDone, respectTask } from '@/lib/mockStore';

export async function createTaskAction({
  title,
  steps,
  isPublic
}: {
  title: string;
  steps: string[];
  isPublic: boolean;
}) {
  const task = createTask({ title, steps, isPublic });
  revalidatePath('/feed');
  revalidatePath('/me');
  return task;
}

export async function markTaskDoneAction(code: string) {
  const task = markTaskDone(code);
  revalidatePath('/feed');
  revalidatePath('/me');
  if (task) {
    revalidatePath(`/room/${code}`);
  }
  return task;
}

export async function respectTaskAction(code: string) {
  const task = respectTask(code);
  revalidatePath('/feed');
  return task;
}
