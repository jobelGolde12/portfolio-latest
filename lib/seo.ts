/**
 * SEO Constants & Configuration
 *
 * Central place for all SEO-related configuration used across the site.
 * Import from here instead of hardcoding URLs or strings.
 */

export const SITE_CONFIG = {
  /** Production base URL — used for canonical links, sitemaps, OG images */
  baseUrl: 'https://jobelgolde.dev' as const,

  /** Site name used in Open Graph, JSON-LD, and title templates */
  siteName: 'Jobel V. Golde' as const,

  /** Short tagline */
  tagline: 'Full Stack Developer' as const,

  /** Default description for fallback metadata */
  description:
    'Professional portfolio of Jobel V. Golde — full-stack developer building systems that stay boring under load. BSIT student at Sorsogon State University.' as const,

  /** Primary language */
  locale: 'en_US' as const,

  /** Alternate language(s) if any */
  localeAlternate: ['en_PH'] as const,

  /** Twitter handle (without @) */
  twitterHandle: '@jobelgolde' as const,

  /** Default OG image path (relative to baseUrl) */
  ogImage: '/og-default.png' as const,

  /** Default OG image dimensions */
  ogImageDimensions: { width: 1200, height: 630 } as const,
} as const;

/**
 * Navigation links used by Navbar and Footer.
 * Centralized here to avoid duplication.
 */
export const NAV_LINKS = [
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Contact', href: '/#contact' },
] as const;

/**
 * Social profiles used across components (Footer, Contact, JSON-LD).
 */
export const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/jobelGolde12',
    icon: 'github' as const,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jobel-golde-6a8822411/',
    icon: 'linkedin' as const,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/jobelGolde',
    icon: 'facebook' as const,
  },
] as const;

