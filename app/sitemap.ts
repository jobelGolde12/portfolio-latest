import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';
import { posts } from '@/data/posts';

const { baseUrl } = SITE_CONFIG;

/**
 * Dynamic sitemap generator.
 *
 * Includes the homepage and any static routes.
 * For a portfolio with blog posts or projects fetched from a CMS/database,
 * map over them and add their entries here with dynamic lastModified dates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    // Blog posts — dates are pinned to the post date so the sitemap stays stable.
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
