import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { services } from '@/data/services';

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <SectionHeading
            label="What I do"
            title={
              <>
                Services<span aria-hidden>.</span>
              </>
            }
            description="From planning to deployment — how I can help bring your ideas to life and keep them running."
          />
        </Reveal>

        {/* Numbered editorial rows */}
        <ol className="border-t border-border-subtle">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={Math.min(i * 0.05, 0.2)}>
              <li className="group grid gap-x-10 gap-y-2 border-b border-border-subtle py-7 md:grid-cols-[3rem_16rem_1fr] md:py-8">
                <span
                  className="font-mono text-xs text-text-faint"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-base font-medium text-text-primary transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="max-w-xl text-sm leading-[1.7] text-text-secondary">
                  {service.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

        {/* Closing note */}
        <Reveal delay={0.25}>
          <p className="mt-12 text-sm text-text-secondary">
            Not sure what you need?{' '}
            <a
              href="#contact"
              className="editorial-link group inline items-baseline underline decoration-border-strong underline-offset-4 hover:decoration-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            >
              Let&apos;s talk about it
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
