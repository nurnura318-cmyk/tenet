import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Tenet Tasks',
  description: 'Фокусируйся на шагах и делись прогрессом.'
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-slate-950 text-slate-100`}>
        <div className="flex min-h-screen flex-col">
          <nav className="border-b border-slate-800 bg-slate-950/80">
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
              <Link href="/" className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
                tenet
              </Link>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <Link href="/feed" className="hover:text-slate-200">
                  Лента
                </Link>
                <Link href="/me" className="hover:text-slate-200">
                  Мои задачи
                </Link>
              </div>
            </div>
          </nav>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
            Сделано для фокусной работы. Делись уважением и закрывай задачи.
          </footer>
        </div>
      </body>
    </html>
  );
}
