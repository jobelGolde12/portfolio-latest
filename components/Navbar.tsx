'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { GithubIcon } from '@/components/Icons';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({
  onCommandPaletteOpen,
}: {
  onCommandPaletteOpen?: () => void;
}) {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lastScrollY = useRef(0);
  const { theme, toggleTheme } = useTheme();

  /* ── Scroll handler: direction + progress ───────────── */
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const direction = currentY > lastScrollY.current + 5 ? 'down' : currentY < lastScrollY.current - 5 ? 'up' : scrollDirection;

          setScrollDirection(direction);
          setIsAtTop(currentY < 20);

          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          setScrollProgress(docHeight > 0 ? (currentY / docHeight) * 100 : 0);

          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDirection]);

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

  /* ── Focus trap for mobile menu ──────────────────────── */
  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!mobileMenuOpen || e.key !== 'Escape') return;
      setMobileMenuOpen(false);
      toggleRef.current?.focus();
    },
    [mobileMenuOpen],
  );

  const navHidden = scrollDirection === 'down' && !isAtTop && !mobileMenuOpen;

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5">
        <div
          className="h-full bg-accent-signal transition-[width] duration-100 ease-linear"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: navHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0.5 left-0 right-0 z-50 flex items-center justify-center px-4 pt-3"
        role="navigation"
        aria-label="Main navigation"
        onKeyDown={handleMenuKeyDown}
      >
        <div
          className={cn(
            'flex items-center justify-between w-full max-w-[1280px] rounded-full px-4 py-2 transition-all duration-300',
            'bg-bg-overlay/80 backdrop-blur-md border border-border-subtle',
            !isAtTop && 'shadow-md',
          )}
        >
          {/* Logo */}
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

          {/* Desktop nav links - Made darker for visibility */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200',
                  activeSection === link.href
                    ? 'text-accent-signal'
                    : 'text-text-primary hover:text-text-primary hover:bg-bg-surface-2',
                )}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Desktop actions - Made icons and text darker */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden md:flex items-center gap-2"
          >
            {/* Command palette hint */}
            <button
              onClick={onCommandPaletteOpen}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-text-primary rounded-full border border-border-subtle hover:border-border-strong hover:text-text-primary transition-colors"
              aria-label="Open command palette"
            >
              <Search className="w-3 h-3" />
              <span>⌘K</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-full text-text-primary hover:text-text-primary hover:bg-bg-surface-2 transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="https://github.com/jobelGolde12/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-primary rounded-full hover:text-text-primary hover:bg-bg-surface-2 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub
            </a>

            <a
              href="#contact"
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full bg-accent-signal text-white hover:brightness-110 transition-all"
            >
              Get in touch
            </a>
          </motion.div>

          {/* Mobile: search + theme + menu - Made icons darker */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={onCommandPaletteOpen}
              className="p-2 rounded-full text-text-primary hover:text-text-primary hover:bg-bg-surface-2 transition-colors"
              aria-label="Open command palette"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-text-primary hover:text-text-primary hover:bg-bg-surface-2 transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              ref={toggleRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-text-primary hover:text-text-primary hover:bg-bg-surface-2 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
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
              className="absolute top-[72px] left-4 right-4 rounded-2xl bg-bg-overlay/95 backdrop-blur-xl border border-border-subtle shadow-lg overflow-hidden md:hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'block px-4 py-3 text-sm font-medium rounded-xl transition-colors',
                      activeSection === link.href
                        ? 'text-accent-signal bg-accent-signal-dim'
                        : 'text-text-primary hover:text-text-primary hover:bg-bg-surface-2',
                    )}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="flex flex-col gap-2 pt-3 px-1">
                  <a
                    href="https://github.com/jobelGolde12"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-bg-surface-2 text-text-primary hover:text-text-primary transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-accent-signal text-white hover:brightness-110 transition-all"
                  >
                    Get in touch
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}