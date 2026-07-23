'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Globe,
  Palette,
  LineChart,
  Server,
  Workflow,
  Wrench,
} from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description:
      'Full-stack web applications built with Laravel, React, Vue.js, and Next.js — from concept to deployment, with clean code and solid architecture.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Thoughtful interfaces designed for clarity and ease of use. Wireframes, prototypes, and polished visuals tailored to your audience and goals.',
  },
  {
    icon: LineChart,
    title: 'SEO Optimization',
    description:
      'Improve search visibility with semantic markup, performance tuning, structured data, and content strategy that works with search algorithms.',
  },
  {
    icon: Server,
    title: 'REST API Development',
    description:
      'Custom APIs with Laravel — secure, well-documented endpoints designed for speed, scalability, and easy integration by frontend teams.',
  },
  {
    icon: Workflow,
    title: 'System Architecture',
    description:
      'Database design, infrastructure planning, and system architecture that keeps your project maintainable as it grows.',
  },
  {
    icon: Wrench,
    title: 'Maintenance & Support',
    description:
      'Ongoing improvements, bug fixes, performance audits, and technical guidance to keep your systems running smoothly.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="py-24 md:py-32 px-4 text-white" ref={ref}>
      <div className="max-w-[1120px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="text-accent-signal font-mono text-xs tracking-wider uppercase">
                What I do
              </span>
              <h2
                className="mt-2 font-display tracking-[var(--tracking-tight)]"
                style={{ fontSize: 'var(--text-3xl)' }}
              >
                Services
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-[1.7] sm:text-right">
              From planning to deployment — services I offer to help bring your
              ideas to life and keep them running.
            </p>
          </div>
        </motion.div>

        {/* Service cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group rounded-xl p-6 transition-all duration-300 ease-[var(--ease-out)] hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-bg-surface-2 text-accent-signal mb-4 ring-1 ring-border-subtle group-hover:ring-accent-signal/30 group-hover:bg-accent-signal-dim transition-all duration-300">
                <service.icon className="w-4 h-4" />
              </div>

              {/* Content */}
              <h3 className="font-medium text-sm mb-2">{service.title}</h3>
              <p className="text-white/50 text-sm leading-[1.7]">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-14 text-center"
        >
          <p className="text-white/40 text-sm">
            Not sure what you need?{' '}
            <a
              href="#contact"
              className="text-accent-signal hover:text-accent-signal-text underline underline-offset-4 decoration-accent-signal/30 hover:decoration-accent-signal/60 transition-colors"
            >
              Let&apos;s talk about it
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
