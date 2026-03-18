import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AIFATE - 运势测算',
  description: '基于八字、星座、塔罗的运势测算娱乐应用',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} bg-[#0f0f1a] min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
