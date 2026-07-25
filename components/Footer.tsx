'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, FacebookIcon } from './Icons';
import { Badge } from '@/components/ui/badge';

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/jobelGolde12', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/jobel-golde-6a8822411/', label: 'LinkedIn' },
  { icon: FacebookIcon, href: 'https://www.facebook.com/jobelGolde', label: 'Facebook' },
];

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Contact', href: '/#contact' },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={ref} className="border-t border-border-subtle text-white">
      {/* Main footer content */}
      <div className="py-12 px-4">
        <div className="max-w-[1120px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center md:items-start"
            >
              <Image
                src="/jobel_logo.png"
                alt="Jobel"
                width={120}
                height={40}
                className="h-8 w-auto object-contain mb-3"
              />
              <p className="text-sm text-white/50 text-center md:text-left">
                Full Stack Developer — Building systems that stay boring under load.
              </p>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex flex-col items-center md:items-start"
            >
              <p className="text-[11px] text-white/50 uppercase tracking-widest font-mono mb-3">
                Navigation
              </p>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm text-white/60 hover:text-accent-signal transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Social + status */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-center md:items-start"
            >
              <p className="text-[11px] text-white/50 uppercase tracking-widest font-mono mb-3">
                Connect
              </p>
              <div className="flex gap-2 mb-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-dark border border-border-subtle text-white/60 hover:border-accent-signal hover:text-accent-signal transition-all duration-200"
                    aria-label={`${label} (opens in new tab)`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
              <Badge status="success" label="Systems operational" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-subtle py-4 px-4">
        <div className="max-w-[1120px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} Jobel V. Golde. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="text-white/50 hover:text-accent-signal transition-colors p-1"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
