import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

const { baseUrl } = SITE_CONFIG;

/**
 * Dynamic robots.txt generator.
 *
 * Uses the metadataBase URL from layout to generate the sitemap URL
 * dynamically, so it stays correct across environments.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/static/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
