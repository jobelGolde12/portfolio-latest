import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/seo';

/**
 * JSON-LD Structured Data Component
 *
 * Injects Schema.org markup for rich search results.
 * Renders a <script> tag with application/ld+json type.
 *
 * Schemas included:
 *   - Person (primary — the portfolio owner)
 *   - WebSite (search action for site search)
 *   - Organization (professional context)
 */
export default function JsonLd() {
  const { baseUrl, siteName, tagline, description } = SITE_CONFIG;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteName,
    alternateName: 'Jobel Golde',
    givenName: 'Jobel',
    familyName: 'Golde',
    jobTitle: tagline,
    description,
    url: baseUrl,
    sameAs: SOCIAL_LINKS.map((l) => l.href),
    knowsAbout: [
      'Web Development',
      'Laravel',
      'React',
      'Vue.js',
      'Next.js',
      'REST API Development',
      'System Architecture',
      'UI/UX Design',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Sorsogon State University - Bulan Campus',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bulan',
      addressRegion: 'Sorsogon',
      addressCountry: 'PH',
    },
    email: 'jobelgolde45@gmail.com',
    image: `${baseUrl}/profile.webp`,
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${siteName} — ${tagline}`,
    url: baseUrl,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: baseUrl,
    logo: `${baseUrl}/jobel_logo.png`,
    description,
    sameAs: SOCIAL_LINKS.map((l) => l.href),
    founder: {
      '@type': 'Person',
      name: siteName,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
        id="jsonld-person"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
        id="jsonld-website"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
        id="jsonld-organization"
      />
    </>
  );
}

