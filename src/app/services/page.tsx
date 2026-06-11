import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { mainServices, secondaryServices, servicePages } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Services — Rezen Agency',
  description: 'Web design, landing pages, Meta Ads, Google Ads and tracking for growth-focused businesses.',
};

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-border pt-28 pb-12 sm:pt-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title="Digital marketing, structured clearly."
              subtitle="Websites and ads as one system — not scattered offers."
            />
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2">
            {mainServices.map((service, i) => (
              <Reveal key={service.title} delay={0.05 * i}>
                <article className="rounded-2xl border border-border p-6 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{service.num}</p>
                  <h2 className="mt-4 text-xl font-bold">{service.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{service.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight">Service areas</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {servicePages.map((area, i) => (
              <Reveal key={area.slug} delay={0.05 * i}>
                <article className="rounded-2xl border border-border bg-white p-6">
                  <h3 className="text-lg font-bold">{area.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{area.description}</p>
                  <ul className="mt-4 space-y-2">
                    {area.points.map((point) => (
                      <li key={point} className="text-sm text-muted">— {point}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal>
            <p className="text-sm text-muted">
              <span className="font-semibold text-foreground">Also included when needed:</span>{' '}
              {secondaryServices.join(' · ')}
            </p>
            <Link href="/contact" className="link-underline mt-6 inline-block text-sm font-semibold">
              Start a project →
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
