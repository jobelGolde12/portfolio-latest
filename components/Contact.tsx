'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowUpRight } from 'lucide-react';
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
    icon: Phone,
    label: 'Phone',
    value: '+63 993 054 3293',
    href: 'tel:+639930543293',
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

/* ─── Floating label input ─────────────────────────── */

function Field({
  label,
  type = 'text',
  name,
  value,
  onChange,
  required = false,
  isInView,
  delay,
  isTextarea = false,
}: {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  isInView: boolean;
  delay: number;
  isTextarea?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  const showFloating = isFocused || hasValue;

  const sharedClasses =
    'w-full bg-transparent border-0 border-b-2 border-white/10 ' +
    'text-white ' +
    'focus:outline-none transition-colors duration-200 ' +
    'focus:border-white/40 ' +
    'placeholder-transparent ' +
    (isTextarea ? 'resize-none min-h-[100px] pt-6' : 'pt-6 pb-2');

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative"
    >
      <label
        htmlFor={`field-${name}`}
        className={`absolute left-0 origin-left cursor-text select-none transition-all duration-200 ease-out
          ${
            showFloating
              ? 'top-0 text-[11px] font-medium text-[#9C9C9C]'
              : 'top-[18px] text-[14px] text-[#6B6B6B]'
          }`}
      >
        {label}
        {required && (
          <span className="text-[#6B6B6B] ml-0.5" aria-hidden>
            *
          </span>
        )}
      </label>

      {isTextarea ? (
        <textarea
          id={`field-${name}`}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={4}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={sharedClasses}
        />
      ) : (
        <input
          id={`field-${name}`}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={sharedClasses}
        />
      )}

      <motion.span
        className="absolute bottom-0 left-0 h-[2px] rounded-full bg-white/40"
        initial={{ width: 0 }}
        animate={{ width: showFloating ? '100%' : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </motion.div>
  );
}

/* ─── Main section ─────────────────────────────────── */

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
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
        setFormState({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-4"
      ref={ref}
    >
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <span className="text-[#9C9C9C] font-medium tracking-wider uppercase text-[13px]">
            Get in Touch
          </span>
          <h2 className="text-[28px] md:text-[32px] font-bold mt-3 tracking-[-0.02em] text-white">
            Let&rsquo;s work{' '}
            <br className="hidden sm:block" />
            together
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="lg:col-span-5 space-y-10"
          >
            <p className="text-[14px] leading-[1.7] text-[#6B6B6B] max-w-sm">
              I&rsquo;m always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision. Drop a message and I&rsquo;ll
              get back to you as soon as I can.
            </p>

            <div className="space-y-5">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.label === 'Location' ? '_blank' : undefined}
                  rel={info.label === 'Location' ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <span
                    className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full
                      bg-white/5
                      text-[#9C9C9C]
                      group-hover:bg-white/10
                      transition-colors duration-200"
                  >
                    <info.icon className="w-4 h-4" />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[11px] text-[#6B6B6B] uppercase tracking-widest font-medium">
                      {info.label}
                    </p>
                    <p
                      className="text-[13px] font-medium text-white truncate
                        group-hover:text-[#9C9C9C]
                        transition-colors duration-200"
                    >
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <p className="text-[11px] text-[#6B6B6B] uppercase tracking-widest font-medium mb-3">
                Social
              </p>
              <div className="flex gap-2">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.55 + i * 0.06 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center w-9 h-9 rounded-full
                      bg-white/5
                      text-[#6B6B6B]
                      hover:bg-white/10 hover:text-white
                      transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.3,
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Field
                  label="Your name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  isInView={isInView}
                  delay={0.35}
                />
                <Field
                  label="Your email"
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  isInView={isInView}
                  delay={0.4}
                />
              </div>

              <Field
                label="Subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                required
                isInView={isInView}
                delay={0.45}
              />

              <Field
                label="Your message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                isInView={isInView}
                delay={0.5}
                isTextarea
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.55 }}
                className="pt-2"
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2.5 px-6 py-3
                    bg-white text-[#1F1F1F]
                    rounded-full text-[13px] font-medium
                    hover:shadow-[0_4px_16px_rgba(255,255,255,0.1)]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2
                    focus-visible:ring-offset-[#1E1B20]
                    transition-all duration-200
                    disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 rounded-full border-2 border-[#1F1F1F]/30 border-t-[#1F1F1F]"
                      />
                      <span>Sending...</span>
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Sent!</span>
                    </>
                  ) : (
                    <>
                      <span>Send message</span>
                      <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
