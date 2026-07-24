import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Fraunces } from 'next/font/google';
import 'leaflet/dist/leaflet.css';
import './globals.css';
import Shell from '@/components/Shell';

const geistSans = GeistSans;
const geistMono = GeistMono;

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['400', '500', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Jobel V. Golde — Full Stack Developer',
  description:
    'Professional portfolio of Jobel V. Golde — full-stack developer building systems that stay boring under load. BSIT student at Sorsogon State University.',
  icons: {
    icon: [{ url: '/jobel_logo.png', type: 'image/png' }],
    apple: [{ url: '/jobel_logo.png', type: 'image/png' }],
    shortcut: '/jobel_logo.png',
  },
  openGraph: {
    title: 'Jobel V. Golde — Full Stack Developer',
    description:
      'Full-stack developer building systems that stay boring under load. BSIT student at Sorsogon State University.',
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} font-ui antialiased min-h-screen overflow-x-hidden`}
      >
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
