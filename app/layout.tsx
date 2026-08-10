import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Fraunces } from 'next/font/google';
import 'leaflet/dist/leaflet.css';
import './globals.css';
import Shell from '@/components/Shell';
import JsonLd from '@/components/JsonLd';
import { SITE_CONFIG } from '@/lib/seo';

const geistSans = GeistSans;
const geistMono = GeistMono;

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['400', '500', '700', '800', '900'],
});

const { baseUrl, siteName, tagline, description, locale, ogImage, ogImageDimensions } =
  SITE_CONFIG;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: `${siteName} — ${tagline}`,
    template: `%s | ${siteName}`,
  },

  description,

  icons: {
    icon: [{ url: '/jobel_logo.png', type: 'image/png' }],
    apple: [{ url: '/jobel_logo.png', type: 'image/png' }],
    shortcut: '/jobel_logo.png',
  },

  // Canonical URL — prevents duplicate content penalties
  alternates: {
    canonical: baseUrl,
  },

  openGraph: {
    title: `${siteName} — ${tagline}`,
    description,
    url: baseUrl,
    siteName,
    type: 'website',
    locale,
    images: [
      {
        url: ogImage,
        width: ogImageDimensions.width,
        height: ogImageDimensions.height,
        alt: siteName,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: `${siteName} — ${tagline}`,
    description,
    images: [ogImage],
    creator: SITE_CONFIG.twitterHandle,
  },

  // Additional metadata for crawlers
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} font-ui antialiased min-h-screen overflow-x-hidden`}
      >
        {/* Structured data for search engines (JSON-LD) */}
        <JsonLd />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
