'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { GithubIcon } from './Icons';

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer ref={ref} className="py-12 px-4 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
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
            <p className="text-[13px] text-white mt-2">
              Full Stack Developer
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
              className="text-white hover:text-white transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[13px] text-white"
          >
            &copy; {new Date().getFullYear()} Jobel V. Golde. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
