'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { GithubIcon } from './Icons';

const projects = [
  {
    title: 'Lost and Found System',
    description: 'A community-based platform to report and track lost items. Features real-time item status updates and searchable categorized listings to improve user experience and item recovery efficiency.',
    tech: ['Laravel', 'Vue.js', 'Bootstrap', 'Inertia'],
    github: 'https://github.com/jobelGolde12/bulan_lost_and_found3.git',
    category: 'Capstone Project',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Profanity Detection API',
    description: 'A custom profanity detection API specialized in Tagalog and regional Filipino profanity terms. Designed to integrate with posts, comments, and messaging systems.',
    tech: ['PHP/Laravel', 'REST API', 'React.js'],
    github: 'https://github.com/jobelGolde12/profanity_api.git',
    category: 'API Development',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    title: 'Protec Damayan',
    description: 'A community web application for Barangay Bonga that manages mutual aid (damayan) funds, records, and disbursements. Features automated death announcements via SMS through the Semaphore API for timely community notifications.',
    tech: ['Laravel', 'Bootstrap', 'Vue.js'],
    github: 'https://github.com/jobelGolde12/damayan.git',
    category: 'Barangay System',
    gradient: 'from-rose-500 to-red-600',
  },
];

function ProjectCard({ project, index, isInView }: { project: typeof projects[0]; index: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg shadow-zinc-200/50 dark:shadow-zinc-950/50 border border-zinc-100 dark:border-zinc-800"
    >
      <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${project.gradient} text-white`}>
            {project.category}
          </span>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <GithubIcon className="w-5 h-5" />
          </motion.a>
        </div>

        <motion.h3
          className="text-xl font-bold text-zinc-900 dark:text-white mb-3"
          animate={isHovered ? { x: 5 } : { x: 0 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          {project.title}
        </motion.h3>

        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <motion.a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
          whileHover={{ x: 5 }}
        >
          View Project
          <motion.div animate={isHovered ? { x: 5 } : { x: 0 }}>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </motion.a>
      </div>

      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0`}
        animate={{ opacity: isHovered ? 0.05 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', ...new Set(projects.map(p => p.category))];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 md:py-32 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-emerald-500 font-medium tracking-wider uppercase text-sm">My Work</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-400 bg-clip-text">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="https://github.com/jobelGolde12"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium"
          >
            View All Projects
            <GithubIcon className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
