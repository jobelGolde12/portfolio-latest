'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail } from 'lucide-react';

import { GithubIcon } from '@/components/Icons';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* ── Scroll handler (throttled via rAF) ──────────────── */
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
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
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          }
        },
        { rootMargin: '-45% 0px -45% 0px' },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── Focus trap via Escape ───────────────────────────── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!mobileMenuOpen || e.key !== 'Escape') return;
      setMobileMenuOpen(false);
      toggleRef.current?.focus();
    },
    [mobileMenuOpen],
  );

  const handleMobileLinkClick = () => setMobileMenuOpen(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-4 px-4"
      role="navigation"
      aria-label="Main navigation"
      onKeyDown={handleKeyDown}
    >
      <div
        className={cn(
          'flex items-center justify-between w-full max-w-[1280px] transition-all duration-500 rounded-[28px] px-4 py-2',
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-[0_2px_24px_rgba(0,0,0,0.08)]'
            : 'bg-transparent',
        )}
      >
        <motion.a
          href="#"
          className="relative flex items-center shrink-0 pl-3"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Jobel — Home"
        >
          <Image
            src="/jobel_logo.png"
            alt="Jobel"
            width={140}
            height={48}
            className="h-8 md:h-9 w-auto object-contain"
            priority
          />
        </motion.a>

        {/* ── Desktop nav ──────────────────────────────── */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className={cn(
                'relative px-4 py-2 text-[13px] font-medium rounded-full transition-all duration-200',
                activeSection === link.href && scrolled
                  ? 'bg-gray-100 text-gray-900'
                  : activeSection === link.href && !scrolled
                    ? 'bg-white/10 text-white'
                    : scrolled
                      ? 'text-gray-900 hover:text-gray-900 hover:bg-gray-100'
                      : 'text-white hover:text-white hover:bg-white/10',
              )}
              aria-current={activeSection === link.href ? ('section' as any) : undefined}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* ── Desktop actions ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="hidden md:flex items-center gap-2"
        >
          <motion.a
            href="https://github.com/jobelGolde12/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-[13px] font-medium rounded-full transition-colors duration-200',
              scrolled
                ? 'text-gray-900 hover:bg-gray-100'
                : 'text-white hover:bg-white/10',
            )}
            aria-label="GitHub profile (opens in new tab)"
          >
            <GithubIcon className="w-4 h-4" />
            GitHub
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              'flex items-center gap-2 px-5 py-2 text-[13px] font-medium rounded-full transition-colors duration-200',
              scrolled
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-white/10 text-white hover:bg-white/20',
            )}
          >
            <Mail className="w-4 h-4" />
            Hire Me
          </motion.a>
        </motion.div>

        {/* ── Mobile toggle ────────────────────────────── */}
        <button
          ref={toggleRef}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className={cn(
            'md:hidden p-2 rounded-full transition-colors',
            scrolled
              ? 'text-gray-900 hover:bg-gray-100'
              : 'text-white hover:bg-white/10',
          )}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile dropdown ───────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              'absolute top-[72px] left-4 right-4 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden md:hidden',
              scrolled
                ? 'bg-white/95 backdrop-blur-xl'
                : 'bg-[#1E1B20]/95 backdrop-blur-xl',
            )}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleMobileLinkClick}
                  className={cn(
                    'block px-4 py-3 text-[14px] font-medium rounded-xl transition-colors',
                    activeSection === link.href && scrolled
                      ? 'bg-gray-100 text-gray-900'
                      : activeSection === link.href && !scrolled
                        ? 'bg-white/10 text-white'
                        : scrolled
                          ? 'text-gray-900 hover:text-gray-900 hover:bg-gray-100'
                          : 'text-white hover:text-white hover:bg-white/10',
                  )}
                  aria-current={activeSection === link.href ? ('section' as any) : undefined}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-3 px-1">
                <a
                  href="https://github.com/jobelGolde12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium transition-colors',
                    scrolled
                      ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      : 'bg-white/10 text-white hover:bg-white/20',
                  )}
                  aria-label="GitHub profile (opens in new tab)"
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href="#contact"
                  className={cn(
                    'flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium transition-colors',
                    scrolled
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-white/10 text-white hover:bg-white/20',
                  )}
                >
                  <Mail className="w-4 h-4" />
                  Hire Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
