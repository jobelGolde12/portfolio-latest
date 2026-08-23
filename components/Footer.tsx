import Image from 'next/image';
import Link from 'next/link';
import { SOCIAL_ICONS } from './Icons';
import { BackToTop } from '@/components/ui/BackToTop';
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/seo';

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle">
      {/* Main footer content */}
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/jobel_logo.png"
              alt="Jobel"
              width={120}
              height={40}
              className="mb-4 h-7 w-auto object-contain"
            />
            <p className="max-w-xs text-center text-sm leading-[1.7] text-text-secondary md:text-left">
              Full-stack developer — building systems that stay boring under load.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-center md:items-start">
            <p className="editorial-label mb-4">Navigation</p>
            <nav aria-label="Footer navigation" className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm min-h-6 py-0.5"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start">
            <p className="editorial-label mb-4">Connect</p>
            <div className="flex gap-2">
              {SOCIAL_LINKS.map((link) => {
                const Icon = SOCIAL_ICONS[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-sm border border-border-subtle bg-bg-surface text-text-secondary transition-colors duration-200 hover:border-border-strong hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                    aria-label={`${link.label} (opens in new tab)`}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-subtle">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-2 px-5 py-5 sm:flex-row sm:px-8 lg:px-12">
          <p className="text-xs text-text-faint">
            &copy; {new Date().getFullYear()} Jobel V. Golde. All rights reserved.
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
