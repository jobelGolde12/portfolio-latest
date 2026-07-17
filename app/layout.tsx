import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import AnimatedBackground from '@/components/AnimatedBackground';
import FloatingTriangles from '@/components/FloatingTriangles';
import CustomCursor from '@/components/CustomCursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Jobel V. Golde | BSIT Student & Full Stack Developer',
  description: 'Professional portfolio of Jobel V. Golde - BSIT Student and Full Stack Developer from Sorsogon State University',
  icons: {
    icon: [{ url: '/jobel_logo.png', type: 'image/png' }],
    apple: [{ url: '/jobel_logo.png', type: 'image/png' }],
    shortcut: '/jobel_logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50`}>
        <CustomCursor />
        <FloatingTriangles />
        <AnimatedBackground />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
