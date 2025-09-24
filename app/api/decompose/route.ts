import { NextResponse } from 'next/server';

const createSteps = (input: string): string[] => {
  const base = input.trim() || 'задачу';
  return [
    `Подготовить всё необходимое, чтобы выполнить «${base}».`,
    `Выделить 25 минут и сфокусироваться на ключевом действии по теме «${base}».`,
    `Подвести итог и записать результат работы над «${base}».`
  ];
};

export async function POST(request: Request) {
  const { text = '' } = await request.json().catch(() => ({ text: '' }));
  const steps = createSteps(String(text ?? ''));
  return NextResponse.json({ steps });
}
