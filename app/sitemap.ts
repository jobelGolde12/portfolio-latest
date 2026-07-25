import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

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
    // --- Example: Blog posts (uncomment when blog section exists) ---
    // ...(await getBlogPosts()).map((post) => ({
    //   url: `${baseUrl}/blog/${post.slug}`,
    //   lastModified: new Date(post.updatedAt ?? post.createdAt),
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.7,
    // })),
    //
    // --- Example: Individual projects (uncomment when /projects/[slug] exists) ---
    // ...(await getProjects()).map((project) => ({
    //   url: `${baseUrl}/projects/${project.slug}`,
    //   lastModified: new Date(project.updatedAt),
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.8,
    // })),
  ];
}
