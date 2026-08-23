'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { NAV_LINKS } from '@/lib/seo';
import { cn } from '@/lib/utils';

const GITHUB_URL = 'https://github.com/jobelGolde12';

export default function Navbar({
  onCommandPaletteOpen,
}: {
  onCommandPaletteOpen?: () => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* ── Scroll state ───────────────────────────────────── */
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 8);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Active section observer ─────────────────────────── */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('/#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-45% 0px -45% 0px' },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── Keyboard shortcuts ─────────────────────────────── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onCommandPaletteOpen?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCommandPaletteOpen]);

  /* ── Escape closes the mobile menu ───────────────────── */
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-bg-base transition-colors duration-200',
        isScrolled || mobileMenuOpen ? 'border-b border-border-subtle' : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Wordmark */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Jobel Golde — Home"
        >
          <Image
            src="/jobel_logo.png"
            alt=""
            width={120}
            height={40}
            className="h-6 w-auto object-contain md:h-7"
            priority
          />
        </Link>

        {/* Desktop nav — small, quiet */}
        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace('/#', '');
            const isActive = activeSection === sectionId;
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'text-[13px] transition-colors duration-150',
                  'underline-offset-4 hover:underline hover:decoration-border-strong',
                  isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary',
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Utility icons + CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={onCommandPaletteOpen}
            className="flex items-center gap-1.5 rounded-sm border border-border-subtle px-2 py-1 font-mono text-[11px] text-text-tertiary transition-colors duration-150 hover:border-border-strong hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            aria-label="Open command palette"
          >
            <Search className="h-3 w-3" aria-hidden />
            <span>⌘K</span>
          </button>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in new tab)"
            className="text-text-secondary transition-colors duration-150 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm p-1"
          >
            <GithubIcon className="h-4 w-4" />
          </a>

          <Link
            href="/#contact"
            className="rounded-sm bg-ink px-3.5 py-2 text-[13px] font-medium text-white transition-colors duration-150 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
          >
            Contact
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            onClick={onCommandPaletteOpen}
            className="rounded-sm p-2.5 text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            aria-label="Open command palette"
          >
            <Search className="h-[18px] w-[18px]" aria-hidden />
          </button>
          <button
            ref={toggleRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-sm p-2.5 text-text-primary transition-colors hover:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="border-b border-border-subtle bg-bg-base shadow-md md:hidden"
          >
            <nav aria-label="Mobile navigation" className="space-y-1 px-5 py-4">
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace('/#', '');
                const isActive = activeSection === sectionId;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'flex min-h-11 items-center justify-between text-sm transition-colors',
                      isActive
                        ? 'font-medium text-text-primary'
                        : 'text-text-secondary hover:text-text-primary',
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <span className="h-1 w-1 rounded-full bg-accent-signal" aria-hidden />
                    )}
                  </Link>
                );
              })}
              <div className="flex items-center gap-3 pt-3">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-sm border border-border-subtle text-sm text-text-primary transition-colors hover:bg-bg-surface"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
                <Link
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-11 flex-1 items-center justify-center rounded-sm bg-ink text-sm font-medium text-white transition-colors hover:bg-black"
                >
                  Contact
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
