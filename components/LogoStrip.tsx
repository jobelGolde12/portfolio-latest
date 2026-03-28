'use client';

import { motion } from 'framer-motion';

const logos = [
  { name: 'Laravel', icon: '🔧' },
  { name: 'React', icon: '⚛️' },
  { name: 'Vue.js', icon: '💚' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Figma', icon: '🎨' },
];

export default function LogoStrip() {
  return (
    <section className="py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-4"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-sm text-zinc-500 dark:text-zinc-600 mb-8 font-medium uppercase tracking-wider"
        >
          Technologies I Work With
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
              whileHover={{ 
                scale: 1.15, 
                y: -5,
                transition: { type: 'spring', stiffness: 400, damping: 10 }
              }}
              className="flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-600 cursor-pointer group"
            >
              <span className="text-3xl md:text-4xl grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:rotate-6">
                {logo.icon}
              </span>
              <span className="text-xs md:text-sm font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {logo.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
