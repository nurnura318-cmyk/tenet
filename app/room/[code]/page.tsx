import { notFound } from 'next/navigation';
import { RoomClient } from '@/components/RoomClient';
import { getTask } from '@/lib/mockStore';

interface RoomPageProps {
  params: {
    code: string;
  };
}

export default function RoomPage({ params }: RoomPageProps) {
  const code = params.code.toUpperCase();
  const task = getTask(code);

  if (!task) {
    notFound();
  }

  return <RoomClient task={task} />;
}
