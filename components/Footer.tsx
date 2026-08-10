import Image from 'next/image';
import Link from 'next/link';
import { SOCIAL_ICONS } from './Icons';
import { Badge } from '@/components/ui/badge';
import { BackToTop } from '@/components/ui/BackToTop';
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/seo';

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle text-white">
      {/* Main footer content */}
      <div className="py-12 px-4">
        <div className="max-w-[1120px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start">
              <Image
                src="/jobel_logo.png"
                alt="Jobel"
                width={120}
                height={40}
                className="h-8 w-auto object-contain mb-3"
              />
              <p className="text-sm text-text-secondary text-center md:text-left">
                Full Stack Developer — Building systems that stay boring under load.
              </p>
            </div>

            {/* Quick links */}
            <div className="flex flex-col items-center md:items-start">
              <p className="text-[11px] text-text-secondary uppercase tracking-widest font-mono mb-3">
                Navigation
              </p>
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent-signal transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-signal"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social + status */}
            <div className="flex flex-col items-center md:items-start">
              <p className="text-[11px] text-text-secondary uppercase tracking-widest font-mono mb-3">
                Connect
              </p>
              <div className="flex gap-2 mb-4">
                {SOCIAL_LINKS.map((link) => {
                  const Icon = SOCIAL_ICONS[link.icon];
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-9 h-9 rounded-full bg-dark border border-border-subtle text-text-secondary hover:border-accent-signal hover:text-accent-signal transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-signal"
                      aria-label={`${link.label} (opens in new tab)`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
              <Badge status="success" label="Systems operational" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-subtle py-4 px-4">
        <div className="max-w-[1120px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} Jobel V. Golde. All rights reserved.
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
