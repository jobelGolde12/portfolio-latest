import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import AnimatedBackground from '@/components/AnimatedBackground';
import FloatingTriangles from '@/components/FloatingTriangles';
import CustomCursor from '@/components/CustomCursor';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700'],
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
      <body className={`${manrope.variable} font-sans antialiased min-h-screen overflow-x-hidden`}>
        <CustomCursor />
        <FloatingTriangles />
        <AnimatedBackground />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
