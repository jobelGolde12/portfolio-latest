import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Instrument_Serif } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import AnimatedBackground from '@/components/AnimatedBackground';
import FloatingTriangles from '@/components/FloatingTriangles';
import CustomCursor from '@/components/CustomCursor';

const geistSans = GeistSans;

const geistMono = GeistMono;

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jobel V. Golde | BSIT Student & Full Stack Developer',
  description:
    'Professional portfolio of Jobel V. Golde — BSIT student and full-stack developer from Sorsogon State University, building modern web experiences.',
  icons: {
    icon: [{ url: '/jobel_logo.png', type: 'image/png' }],
    apple: [{ url: '/jobel_logo.png', type: 'image/png' }],
    shortcut: '/jobel_logo.png',
  },
  openGraph: {
    title: 'Jobel V. Golde | Full Stack Developer',
    description:
      'Full-stack developer crafting modern digital experiences. BSIT student at Sorsogon State University.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} font-sans antialiased min-h-screen overflow-x-hidden`}
      >
        {/* Skip link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-[#1F1F1F] focus:rounded-lg focus:outline-none focus:shadow-lg"
        >
          Skip to main content
        </a>

        <CustomCursor />
        <FloatingTriangles />
        <AnimatedBackground />
        <Navbar />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
