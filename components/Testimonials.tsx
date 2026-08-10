import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { testimonials } from '@/data/testimonials';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 px-4 text-white">
      <div className="max-w-[1120px] mx-auto">
        <Reveal>
          <SectionHeading
            label="Kind words"
            title="Testimonials"
            description="What professors, clients, and peers have said about working with me."
            align="center"
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06} className="h-full">
              <figure className="relative flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-signal/30 hover:bg-white/[0.04]">
                {/* Decorative quote mark */}
                <span
                  className="pointer-events-none absolute -top-1 right-4 font-display text-6xl leading-none text-accent-signal/15 select-none"
                  aria-hidden
                >
                  &rdquo;
                </span>

                <blockquote className="flex-1">
                  <p className="text-sm leading-[1.8] text-text-secondary">
                    {t.quote}
                  </p>
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-signal-dim font-mono text-xs font-medium text-accent-signal-text"
                    aria-hidden
                  >
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-text-primary">
                      {t.name}
                    </span>
                    <span className="block text-xs text-text-tertiary">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
