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
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-white font-medium tracking-wider uppercase text-[13px]">Get to know me</span>
          <h2 className="text-[28px] md:text-[32px] font-bold mt-2 text-white tracking-[-0.02em]">
            About Me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto aspect-square">
              <div className="relative w-full h-full rounded-[28px] overflow-hidden">
                <Image
                  src="/profile.jpg"
                  alt="Jobel V. Golde"
                  fill
                  sizes="(max-width: 768px) 100vw, 448px"
                  className="object-cover"
                />
              </div>

              <motion.div
                className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-white rounded-2xl p-3 sm:p-4 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.8, type: 'spring' }}
              >
                <p className="text-2xl sm:text-3xl font-bold text-[#1F1F1F]">4+</p>
                <p className="text-[13px] text-[#1F1F1F]">Years Learning</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <motion.p variants={itemVariants} className="text-[16px] text-white leading-[1.7]">
              {aboutContent.summary}
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-dark rounded-[16px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <p className="text-[13px] text-white mb-1">Education</p>
                <p className="font-semibold text-white text-[14px]">{aboutContent.education.degree}</p>
              </div>
              <div className="bg-dark rounded-[16px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <p className="text-[13px] text-white mb-1">University</p>
                <p className="font-semibold text-white text-[14px]">Sorsogon State University</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-[13px] text-white mb-3">Languages</p>
              <div className="flex flex-wrap gap-2">
                {aboutContent.languages.map((lang, i) => (
                  <motion.span
                    key={lang}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="px-4 py-2 bg-white/10 border border-white/10 rounded-full text-[13px] font-medium text-white"
                  >
                    {lang}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-[13px] text-white mb-3">Interests</p>
              <div className="flex flex-wrap gap-2">
                {aboutContent.interests.map((interest, i) => (
                  <motion.span
                    key={interest}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 bg-white/5 rounded-full text-[13px] font-medium text-white cursor-default"
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
