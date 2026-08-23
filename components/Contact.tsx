'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, CheckCircle, ArrowUpRight, Copy, Check, FileDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SOCIAL_ICONS } from './Icons';
import { SOCIAL_LINKS } from '@/lib/seo';

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

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [copied, setCopied] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/xkodwqyj', {
        method: 'POST',
        body: new FormData(e.target as HTMLFormElement),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText('jobelgolde45@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="editorial-label">Get in touch</p>
          </div>
          <div className="lg:col-span-8">
            <h2
              id="contact-heading"
              className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-light leading-[1.08] tracking-[-0.03em] text-text-primary"
            >
              Start a conversation<span aria-hidden>.</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-[1.7] text-text-secondary">
              Open to new roles, freelance projects, or a conversation about code
              and community. I usually reply within a day.
            </p>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ── Left column: info ── */}
          <div className="space-y-8 lg:col-span-5">
            <Badge status="success" label="Available for new roles" />

            {/* Contact methods */}
            <ul className="space-y-4 border-t border-border-subtle pt-6">
              {contactInfo.map((info) => (
                <li key={info.label}>
                  <a
                    href={info.href}
                    target={info.label === 'Location' ? '_blank' : undefined}
                    rel={info.label === 'Location' ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-4 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border-subtle bg-bg-surface text-text-secondary transition-colors duration-200 group-hover:border-border-strong group-hover:text-text-primary">
                      <info.icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="editorial-label block">{info.label}</span>
                      <span className="mt-0.5 block truncate text-sm font-medium text-text-primary transition-colors duration-200 group-hover:text-text-secondary">
                        {info.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Copy email + resume */}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-border-subtle px-4 py-2.5 text-sm text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-success" aria-hidden />
                ) : (
                  <Copy className="h-3.5 w-3.5" aria-hidden />
                )}
                {copied ? 'Copied!' : 'Copy email'}
              </button>
              <a
                href="/jobel-golde-resume.pdf"
                download
                className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-border-subtle px-4 py-2.5 text-sm text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
              >
                <FileDown className="h-3.5 w-3.5" aria-hidden />
                Download résumé
              </a>
            </div>

            {/* Social */}
            <div>
              <p className="editorial-label mb-3">Social</p>
              <div className="flex gap-2">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = SOCIAL_ICONS[social.icon];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-sm border border-border-subtle bg-bg-surface text-text-secondary transition-colors duration-200 hover:border-border-strong hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                      aria-label={`${social.label} (opens in new tab)`}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right column: form ── */}
          <div className="lg:col-span-7">
            {/* Inline status region — announces to assistive tech without alert() */}
            <div aria-live="polite">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-start rounded-sm border border-success/25 bg-success/[0.04] p-6 sm:p-8"
                  role="status"
                >
                  <CheckCircle className="mb-3 h-6 w-6 text-success" aria-hidden />
                  <h3 className="text-base font-medium text-text-primary">Message sent</h3>
                  <p className="mt-1.5 text-sm leading-[1.7] text-text-secondary">
                    Talk soon — I&apos;ll get back to you within a day.
                  </p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="Your name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      placeholder="Jane Doe"
                      autoComplete="name"
                    />
                    <Input
                      label="Your email"
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@example.com"
                      autoComplete="email"
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

                  {status === 'error' && (
                    <p role="alert" className="text-sm text-danger">
                      Something went wrong sending your message. Please try again —
                      or email me directly at{' '}
                      <a
                        href="mailto:jobelgolde45@gmail.com"
                        className="underline underline-offset-2"
                      >
                        jobelgolde45@gmail.com
                      </a>
                      .
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto"
                  >
                    {status === 'submitting' ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                          aria-hidden
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
