'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, FacebookIcon } from './Icons';

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/jobelGolde12', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/jobel-golde-6a8822411/', label: 'LinkedIn' },
  { icon: FacebookIcon, href: 'https://www.facebook.com/jobelGolde', label: 'Facebook' },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={ref} className="py-12 px-4 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left flex flex-col items-center md:items-start"
          >
            <Image
              src="/jobel_logo.png"
              alt="Jobel"
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
            />
            <p className="text-[13px] text-white/60 mt-2">
              Full Stack Developer &mdash; Building digital experiences with purpose.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-5"
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors duration-200"
                aria-label={`${label} (opens in new tab)`}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-6"
          >
            <p className="text-[13px] text-white/40">
              &copy; {new Date().getFullYear()} Jobel V. Golde. All rights reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="text-white/40 hover:text-white transition-colors duration-200 p-1"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
