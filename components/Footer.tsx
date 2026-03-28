'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GithubIcon } from './Icons';

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer ref={ref} className="py-12 px-4 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              JOBEL
            </span>
            <p className="text-sm text-zinc-500 mt-1">
              BSIT Student & Full Stack Developer
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-6"
          >
            <a
              href="https://github.com/jobelGolde12"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm text-zinc-500"
          >
            © {new Date().getFullYear()} Jobel V. Golde. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
