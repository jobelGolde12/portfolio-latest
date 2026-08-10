import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { services } from '@/data/services';

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 px-4 text-white">
      <div className="max-w-[1120px] mx-auto">
        {/* Header */}
        <Reveal>
          <SectionHeading
            label="What I do"
            title="Services"
            description="From planning to deployment — services I offer to help bring your ideas to life and keep them running."
          />
        </Reveal>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.05}>
              <div className="group rounded-xl p-6 transition-all duration-300 ease-[var(--ease-out)] hover:-translate-y-1">
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-bg-surface-2 text-accent-signal mb-4 ring-1 ring-border-subtle group-hover:ring-accent-signal/30 group-hover:bg-accent-signal-dim transition-all duration-300">
                  <service.icon className="w-4 h-4" aria-hidden />
                </div>

                {/* Content */}
                <h3 className="font-medium text-sm mb-2">{service.title}</h3>
                <p className="text-text-secondary text-sm leading-[1.7]">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Closing note */}
        <Reveal delay={0.35}>
          <div className="mt-14 text-center">
            <p className="text-text-secondary text-sm">
              Not sure what you need?{' '}
              <a
                href="#contact"
                className="text-accent-signal hover:text-accent-signal-text underline underline-offset-4 decoration-accent-signal/30 hover:decoration-accent-signal/60 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-signal"
              >
                Let&apos;s talk about it
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
