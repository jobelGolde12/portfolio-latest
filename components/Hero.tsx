'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, MapPin, Mail, Phone } from 'lucide-react';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12">
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        <motion.div
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          className="relative"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, ease: 'easeOut', type: 'spring' }}
            className="relative w-52 h-52 md:w-72 md:h-72 mx-auto"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-full blur-xl opacity-40"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-full blur-lg opacity-60"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              className="relative w-full h-full rounded-full overflow-hidden shadow-2xl shadow-emerald-500/30 border-4 border-white dark:border-zinc-800"
            >
              <Image
                src="/profile.jpg"
                alt="Jobel V. Golde"
                fill
                sizes="(max-width: 768px) 208px, 288px"
                className="object-cover"
                priority
                loading="eager"
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: 'spring' }}
            >
              Available for hire
            </motion.div>
          </motion.div>
        </motion.div>

        <svg
          className="hidden md:block absolute -top-16 -right-16 w-40 h-40 text-emerald-400/40"
          viewBox="0 0 100 100"
        >
          <motion.path
            d="M10 50 Q 30 10, 50 50 T 90 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, delay: 0.5 }}
          />
        </svg>
      </div>

      <div className="text-center mt-10">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
        >
          <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-200 dark:to-white bg-clip-text">
            JOBEL V. GOLDE
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-4 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-medium"
        >
           Full Stack Developer
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500"
        >
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-emerald-500" />
            Bonga, Bulan, Sorsogon
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="flex items-center gap-1">
            <Mail className="w-4 h-4 text-emerald-500" />
            jobelgolde45@gmail.com
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="flex items-center gap-1">
            <Phone className="w-4 h-4 text-emerald-500" />
            +63 993 054 3293
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
            </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-16"
      >
        <motion.a
          href="#about"
          whileHover={{ y: 5 }}
          className="flex flex-col items-center gap-2 text-emerald-600 dark:text-emerald-400 cursor-pointer"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
}
