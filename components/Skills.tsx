'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: '💻',
    skills: [
      { name: 'JavaScript', level: 85 },
      { name: 'PHP', level: 80 },
      { name: 'Java', level: 75 },
      { name: 'C++', level: 70 },
      { name: 'Python', level: 65 },
    ],
  },
  {
    title: 'Web Development',
    icon: '🌐',
    skills: [
      { name: 'Laravel', level: 85 },
      { name: 'React.js', level: 80 },
      { name: 'Vue.js', level: 75 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'Next.js', level: 78 },
      { name: 'Inertia.js', level: 78 },
    ],
  },
  {
    title: 'Databases & Tools',
    icon: '🛠️',
    skills: [
      { name: 'MySQL', level: 82 },
      { name: 'Git/GitHub', level: 85 },
      { name: 'Figma', level: 75 },
      { name: 'XAMPP', level: 80 },
      { name: 'Postman', level: 78 },
      { name: 'Laragon', level: 80 },
      { name: 'VS Code', level: 88 },
    ],
  },
  {
    title: 'Networking',
    icon: '🌍',
    skills: [
      { name: 'LAN/WAN', level: 65 },
      { name: 'IP Addressing', level: 60 },
      { name: 'Wireshark', level: 55 },
    ],
  },
];

function SkillBar({ name, level, isInView, index }: { name: string; level: number; isInView: boolean; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const progress = useMotionValue(0);
  const scale = useSpring(progress, { damping: 20, stiffness: 50 });

  const width = useTransform(scale, [0, 1], ['0%', `${level}%`]);

  useEffect(() => {
    if (isInView) {
      progress.set(1);
    }
  }, [isInView, progress]);

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <motion.span
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          animate={isHovered ? { x: 5 } : { x: 0 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          {name}
        </motion.span>
        <motion.span
          className="text-sm font-bold text-emerald-500"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          {level}%
        </motion.span>
      </div>
      <div
        className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full relative"
          style={{ width }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: index * 0.1 + 0.2, duration: 1, ease: 'easeOut' }}
        >
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-zinc-100 rounded-full shadow-lg"
            animate={{ scale: isHovered ? 1.5 : 1 }}
            transition={{ type: 'spring', stiffness: 500 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function SkillCard({ category, index, isInView }: { category: typeof skillCategories[0]; index: number; isInView: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      whileHover={{ y: -5 }}
      onClick={() => setIsExpanded(!isExpanded)}
      className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg shadow-zinc-200/50 dark:shadow-zinc-950/50 border border-zinc-100 dark:border-zinc-800 cursor-pointer transition-colors hover:border-emerald-500/30"
    >
      <div className="flex items-center gap-4 mb-5">
        <span className="text-3xl">{category.icon}</span>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{category.title}</h3>
      </div>
      <motion.div
        className="space-y-4"
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 200, opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        {category.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            isInView={isInView}
            index={i}
          />
        ))}
      </motion.div>
      <motion.button
        className="w-full mt-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isExpanded ? 'Show Less' : 'Show More'}
      </motion.button>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-24 md:py-32 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-emerald-500 font-medium tracking-wider uppercase text-sm">What I Know</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-400 bg-clip-text">
            My Skills
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.title}
              category={category}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-zinc-500 dark:text-zinc-400">
            Always learning and exploring new technologies to expand my skill set.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
