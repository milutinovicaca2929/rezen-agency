import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { StaggerReveal } from '@/components/ui/StaggerReveal';
import { pricingAddons, pricingNote, pricingPackages } from '@/lib/data';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Pricing — Rezen Agency',
  description: 'Clear starting points for websites, e-commerce and ads management.',
};

export default function PricingPage() {
  const websites = pricingPackages.slice(0, 3);
  const ads = pricingPackages.slice(3, 6);
  const growth = pricingPackages[6];

  return (
    <div className="bg-white">
      <section className="border-b border-border pt-24 pb-8 sm:pt-28 sm:pb-10">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal variant="heading">
            <SectionHeading
              eyebrow="Pricing"
              title="Clear starting points. Custom execution."
              subtitle="Premium websites and campaigns — scoped to your business, not one-size-fits-all."
            />
          </Reveal>
          <Reveal variant="paragraph" delay={0.06}>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{pricingNote}</p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-b border-border pt-0">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal variant="heading">
            <h2 className="text-lg font-bold sm:text-xl">Websites</h2>
            <p className="mt-2 max-w-xl text-sm text-muted">Built to convert — custom design, fast delivery, tracking-ready.</p>
          </Reveal>
          <StaggerReveal className="mt-6 grid gap-4 sm:mt-8 lg:grid-cols-3 lg:gap-5">
            {websites.map((plan, i) => (
              <article
                key={plan.name}
                data-stagger-item
                className={cn(
                  'card-lift flex h-full flex-col rounded-2xl border bg-white p-5 sm:p-6',
                  i === 1 ? 'border-foreground/25 shadow-[0_20px_60px_rgba(0,0,0,0.05)] lg:-mt-2 lg:pb-8' : 'border-border',
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{plan.note}</p>
                  {i === 1 && (
                    <span className="rounded-full bg-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-background">
                      Popular
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-xl font-bold sm:text-2xl">{plan.name}</h3>
                <p className="mt-2 text-2xl font-bold sm:text-[1.75rem]">{plan.price}</p>
                <ul className="mt-5 flex-1 space-y-2.5 border-t border-border pt-5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-sm text-muted">
                      <span className="text-foreground/40" aria-hidden="true">
                        —
                      </span>{' '}
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={cn(
                    'btn-interact mt-6 inline-flex rounded-full px-5 py-3 text-center text-sm font-semibold',
                    i === 1 ? 'bg-foreground text-background' : 'border border-border hover:border-foreground',
                  )}
                >
                  Get started
                </Link>
              </article>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-surface pt-0">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal variant="heading">
            <h2 className="text-lg font-bold sm:text-xl">Ads management</h2>
            <p className="mt-2 max-w-xl text-sm text-muted">Campaigns built for enquiries — with tracking and ongoing optimization.</p>
          </Reveal>
          <StaggerReveal className="mt-6 grid gap-4 sm:mt-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {ads.map((plan, i) => (
              <article
                key={plan.name}
                data-stagger-item
                className={cn(
                  'card-lift rounded-2xl border border-border bg-white p-5 sm:p-6',
                  i === 2 && 'md:col-span-2 lg:col-span-1 lg:border-foreground/20',
                )}
              >
                {i === 2 && (
                  <span className="mb-3 inline-flex rounded-full border border-border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
                    Bundle
                  </span>
                )}
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{plan.note}</p>
                <h3 className="mt-2 text-lg font-bold sm:text-xl">{plan.name}</h3>
                <p className="mt-2 text-xl font-bold">{plan.price}</p>
                <ul className="mt-5 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-sm text-muted">
                      — {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </StaggerReveal>
          <p className="mt-6 text-sm text-muted">Ad budget not included. Recommended from €200–500/month depending on market.</p>
        </div>
      </section>

      <section className="section-pad border-b border-border pt-0">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal variant="card">
            <article className="rounded-2xl border border-foreground/15 bg-[#fafafa] p-6 sm:p-8 md:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{growth.note}</p>
              <h3 className="mt-2 text-2xl font-bold sm:text-3xl">{growth.name}</h3>
              <p className="mt-2 text-2xl font-bold sm:text-3xl">{growth.price}</p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                Website or landing page, paid campaigns, tracking and ongoing optimization — scoped as one growth system.
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {growth.features.map((feature) => (
                  <li key={feature} className="text-sm text-muted">
                    — {feature}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="link-underline mt-8 inline-block text-sm font-semibold">
                Request a quote →
              </Link>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal variant="heading">
            <h2 className="text-lg font-bold sm:text-xl">Add-ons</h2>
          </Reveal>
          <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-4">
            {pricingAddons.map((addon, i) => (
              <div
                key={addon.name}
                className={cn(
                  'rounded-2xl border border-border px-4 py-5 sm:px-5',
                  i === 0 && 'bg-surface',
                )}
              >
                <p className="text-sm font-semibold">{addon.name}</p>
                <p className="mt-2 text-sm font-medium text-foreground">{addon.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
