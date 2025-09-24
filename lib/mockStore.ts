export type TaskStatus = 'pending' | 'done';

export interface Task {
  code: string;
  title: string;
  steps: string[];
  isPublic: boolean;
  status: TaskStatus;
  createdAt: number;
  respects: number;
}

interface CreateTaskInput {
  title: string;
  steps: string[];
  isPublic: boolean;
}

const tasks: Task[] = [];

const generateCode = () => {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  if (tasks.some((task) => task.code === code)) {
    return generateCode();
  }
  return code;
};

const clone = (task: Task) => ({ ...task, steps: [...task.steps] });

export const createTask = ({ title, steps, isPublic }: CreateTaskInput): Task => {
  const task: Task = {
    code: generateCode(),
    title,
    steps: [...steps],
    isPublic,
    status: 'pending',
    createdAt: Date.now(),
    respects: 0
  };
  tasks.push(task);
  return clone(task);
};

export const getTask = (code: string): Task | undefined => {
  const task = tasks.find((item) => item.code === code);
  return task ? clone(task) : undefined;
};

export const markTaskDone = (code: string): Task | undefined => {
  const task = tasks.find((item) => item.code === code);
  if (!task) {
    return undefined;
  }
  task.status = 'done';
  return clone(task);
};

export const listDoneTasks = (): Task[] => tasks.filter((task) => task.status === 'done').map(clone);

export const listPublicTasks = (): Task[] =>
  tasks.filter((task) => task.isPublic).map(clone);

export const respectTask = (code: string): Task | undefined => {
  const task = tasks.find((item) => item.code === code);
  if (!task) {
    return undefined;
  }
  task.respects += 1;
  return clone(task);
};

export const upsertTaskSteps = (code: string, steps: string[]): Task | undefined => {
  const task = tasks.find((item) => item.code === code);
  if (!task) {
    return undefined;
  }
  task.steps = [...steps];
  return clone(task);
};
