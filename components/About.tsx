'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const aboutContent = {
  summary: `A passionate programmer with strong experience in developing multiple systems. I enjoy solving problems through code, continuously improving my skills, and exploring different areas of the IT industry. Motivated, adaptable, and eager to learn, I aim to contribute to meaningful projects while expanding my knowledge in software development and emerging technologies.`,
  education: {
    school: 'Sorsogon State University - Bulan Campus',
    degree: 'Bachelor of Science in Information Technology (BSIT)',
    year: '2022 - Present',
  },
  location: 'Bonga, Bulan, Sorsogon, Philippines',
  languages: ['English', 'Filipino'],
  interests: ['Web Development', 'Problem Solving', 'System Design', 'UI/UX Design'],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, type: 'tween' as const },
  },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 md:py-32 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-emerald-500 font-medium tracking-wider uppercase text-sm">Get to know me</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-400 bg-clip-text">
            About Me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto aspect-square">
              <div className="relative w-full h-full bg-zinc-100 dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/profile.jpg"
                  alt="Jobel V. Golde"
                  fill
                  sizes="(max-width: 768px) 100vw, 448px"
                  className="object-cover"
                />
              </div>
              
              <motion.div
                className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-white dark:bg-zinc-800 rounded-2xl p-3 sm:p-4 shadow-xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.8, type: 'spring' }}
              >
                <p className="text-2xl sm:text-3xl font-bold text-emerald-500">4+</p>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">Years Learning</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <motion.p variants={itemVariants} className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {aboutContent.summary}
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-4">
                <p className="text-sm text-zinc-500 mb-1">Education</p>
                <p className="font-semibold text-zinc-900 dark:text-white">{aboutContent.education.degree}</p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-4">
                <p className="text-sm text-zinc-500 mb-1">University</p>
                <p className="font-semibold text-zinc-900 dark:text-white">Sorsogon State University</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-sm text-zinc-500 mb-3">Languages</p>
              <div className="flex flex-wrap gap-2">
                {aboutContent.languages.map((lang, i) => (
                  <motion.span
                    key={lang}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-full text-sm font-medium text-emerald-700 dark:text-emerald-400"
                  >
                    {lang}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-sm text-zinc-500 mb-3">Interests</p>
              <div className="flex flex-wrap gap-2">
                {aboutContent.interests.map((interest, i) => (
                  <motion.span
                    key={interest}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-default"
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
