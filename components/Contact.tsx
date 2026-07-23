'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, ArrowUpRight, Copy, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { GithubIcon, LinkedinIcon, FacebookIcon } from './Icons';

/* ─── Data ─────────────────────────────────────────── */

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'jobelgolde45@gmail.com',
    href: 'mailto:jobelgolde45@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Bonga, Bulan, Sorsogon',
    href: 'https://maps.google.com/?q=Bonga+Bulan+Sorsogon',
  },
];

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/jobelGolde12', label: 'GitHub' },
  {
    icon: LinkedinIcon,
    href: 'https://www.linkedin.com/in/jobel-golde-6a8822411/',
    label: 'LinkedIn',
  },
  { icon: FacebookIcon, href: 'https://www.facebook.com/jobelGolde', label: 'Facebook' },
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

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [copied, setCopied] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xkodwqyj', {
        method: 'POST',
        body: new FormData(e.target as HTMLFormElement),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 4000);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText('jobelgolde45@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-4"
      ref={ref}
    >
      <div className="max-w-[1120px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <span className="text-accent-signal font-mono text-xs tracking-wider uppercase">
            Get in touch
          </span>
          <h2 className="text-text-primary mt-2 font-display tracking-[var(--tracking-tight)]" style={{ fontSize: 'var(--text-3xl)' }}>
            Let&apos;s start a{' '}
            <br className="hidden sm:block" />
            conversation
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-12 gap-12 lg:gap-20"
        >
          {/* Left column: info */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-8">
            {/* Status reprise */}
            <Badge status="success" label="Available for new roles" />

            {/* Response time */}
            <p className="text-text-secondary text-sm leading-[1.7]">
              I&apos;m always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>

            <div className="flex items-center gap-2 text-sm text-text-tertiary">
              <span className="animate-signal-pulse inline-block w-1.5 h-1.5 rounded-full bg-success" />
              Usually replies within a day
            </div>

            {/* Contact methods */}
            <div className="space-y-4">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.label === 'Location' ? '_blank' : undefined}
                  rel={info.label === 'Location' ? 'noopener noreferrer' : undefined}
                  variants={itemVariants}
                  className="flex items-center gap-4 group"
                >
                  <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-bg-surface border border-border-subtle text-text-secondary group-hover:border-accent-signal group-hover:text-accent-signal transition-colors duration-200">
                    <info.icon className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] text-text-tertiary uppercase tracking-widest font-mono">
                      {info.label}
                    </p>
                    <p className="text-sm font-medium text-text-primary truncate group-hover:text-accent-signal transition-colors duration-200">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Copy email */}
            <motion.div variants={itemVariants}>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle text-sm text-text-secondary hover:border-accent-signal hover:text-accent-signal transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy email'}
              </button>
            </motion.div>

            {/* Social */}
            <motion.div variants={itemVariants}>
              <p className="text-[11px] text-text-tertiary uppercase tracking-widest font-mono mb-3">
                Social
              </p>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-bg-surface border border-border-subtle text-text-secondary hover:border-accent-signal hover:text-accent-signal transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right column: form */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-16 rounded-xl border border-success/20 bg-success/5"
              >
                <CheckCircle className="w-10 h-10 text-success mb-4" />
                <h3 className="text-text-primary font-medium text-lg mb-2">Message sent</h3>
                <p className="text-text-secondary text-sm">Talk soon — I&apos;ll get back to you within a day.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label="Your name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="Jane Doe"
                  />
                  <Input
                    label="Your email"
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="jane@example.com"
                  />
                </div>

                <Textarea
                  label="Your message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project or idea..."
                  rows={5}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Start a conversation
                      <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </motion.div>

        {/* Warm closing line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-text-tertiary text-sm italic">
            Always happy to talk about code, community, or collaboration.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
