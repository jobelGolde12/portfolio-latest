import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Timeline from '@/components/Timeline';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { SITE_CONFIG } from '@/lib/seo';

const { siteName, tagline, baseUrl } = SITE_CONFIG;

/**
 * Unique metadata for the homepage.
 * Title is kept short (< 60 chars) and description concise (< 160 chars).
 * The title template from layout appends "| Jobel V. Golde" automatically.
 */
export const metadata: Metadata = {
  title: siteName,
  description:
    'Full-stack developer building systems that stay boring under load. Explore projects, skills, and experience in Laravel, Vue.js, React, and Next.js.',
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: `${siteName} — ${tagline}`,
    description:
      'Full-stack developer building systems that stay boring under load. BSIT student at Sorsogon State University.',
    url: baseUrl,
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Timeline />
      <Contact />
      <Footer />
    </>
  );
}
