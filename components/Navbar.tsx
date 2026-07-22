'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-4 px-4"
    >
      <div
        className={`flex items-center justify-between w-full max-w-[1280px] transition-all duration-500 rounded-[28px] px-3 py-2 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-[0_2px_24px_rgba(0,0,0,0.08)]'
            : 'bg-transparent'
        }`}
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

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className={`relative px-4 py-2 text-[13px] font-medium rounded-full transition-all duration-200 ${
                scrolled
                  ? 'text-gray-900 hover:text-gray-900 hover:bg-gray-100'
                  : 'text-white hover:text-white hover:bg-white/10'
              }`}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

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
            className={`flex items-center gap-2 px-4 py-2 text-[13px] font-medium rounded-full transition-colors duration-200 ${
              scrolled
                ? 'text-gray-900 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <GithubIcon className="w-4 h-4" />
            GitHub
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-2 px-5 py-2 text-[13px] font-medium rounded-full transition-colors duration-200 ${
              scrolled
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Mail className="w-4 h-4" />
            Hire Me
          </motion.a>
        </motion.div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-full transition-colors ${
            scrolled
              ? 'text-gray-900 hover:bg-gray-100'
              : 'text-white hover:bg-white/10'
          }`}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`absolute top-[72px] left-4 right-4 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden md:hidden transition-colors duration-500 ${
              scrolled
                ? 'bg-white/95 backdrop-blur-xl'
                : 'bg-[#1E1B20]/95 backdrop-blur-xl'
            }`}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-[14px] font-medium rounded-xl transition-colors ${
                    scrolled
                      ? 'text-gray-900 hover:text-gray-900 hover:bg-gray-100'
                      : 'text-white hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-3 px-1">
                <a
                  href="https://github.com/jobelGolde12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium transition-colors ${
                    scrolled
                      ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href="#contact"
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium transition-colors ${
                    scrolled
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
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
