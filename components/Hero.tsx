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

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [8, -8]),
    springConfig,
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    springConfig,
  );

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
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-12">
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        <motion.div
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            className="relative w-52 h-52 md:w-64 md:h-64 rounded-[28px] overflow-hidden"
          >
            <Image
              src="/profile.jpg"
              alt="Jobel V. Golde"
              fill
              priority
              sizes="(max-width: 768px) 208px, 256px"
              className="object-cover"
              loading="eager"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAAACoB//Z"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="text-center mt-12">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-[48px] md:text-[56px] lg:text-[64px] font-bold tracking-[-0.02em] leading-[1.1] text-white"
        >
          Building digital{' '}
          <span className="font-display italic">experiences</span>
          <br />
          with purpose.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 text-[18px] md:text-[20px] text-white/70"
        >
          <span className="font-medium text-white">Jobel V. Golde</span>
          {' '}&mdash; Full Stack Developer
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[13px] text-white/60"
        >
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-white/60" />
            Bonga, Bulan, Sorsogon
          </span>

          <span className="w-1 h-1 rounded-full bg-white/20" />

          <span className="flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-white/60" />
            jobelgolde45@gmail.com
          </span>

          <span className="w-1 h-1 rounded-full bg-white/20" />

          <span className="flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-white/60" />
            +63 993 054 3293
          </span>
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
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <span className="text-[13px] font-medium">Scroll to explore</span>
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
