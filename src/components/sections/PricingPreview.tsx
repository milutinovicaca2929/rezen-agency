'use client';

import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { StaggerReveal } from '@/components/ui/StaggerReveal';
import { pricingPreviewRows } from '@/lib/data';
import { cn } from '@/lib/utils';

export function PricingPreview() {
  return (
    <section className="section-pad border-b border-border bg-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal variant="heading">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">05 — Pricing</p>
          <SectionHeading
            className="mt-3 max-w-2xl"
            title="Simple starting points. Custom execution."
            subtitle="Every project is scoped around your goals, timeline and growth stage. These are starting points — not fixed templates."
          />
        </Reveal>

        <StaggerReveal className="mt-7 grid gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
          {pricingPreviewRows.map((row, i) => (
            <article
              key={row.name}
              data-stagger-item
              className={cn(
                'pricing-card group flex flex-col rounded-xl border bg-white p-5 transition-all duration-300 hover:-translate-y-1 sm:p-6',
                i === 1
                  ? 'border-foreground/25 shadow-[0_16px_48px_rgba(0,0,0,0.06)] sm:-mt-1 sm:pb-7'
                  : 'border-border hover:border-foreground/15 hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)]',
              )}
            >
              {i === 1 && (
                <span className="mb-3 inline-flex w-fit rounded-full bg-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-background">
                  Most Popular
                </span>
              )}
              <h3 className="text-base font-bold sm:text-lg">{row.name}</h3>
              <p className="mt-2 text-2xl font-bold tracking-tight sm:text-[1.65rem]">{row.price}</p>
              <p className="mt-3 text-xs text-muted sm:text-sm">Starting point — scoped to your project.</p>
            </article>
          ))}
        </StaggerReveal>

        <Reveal variant="paragraph" delay={0.1}>
          <p className="mt-6 text-sm text-muted sm:mt-7">
            Ads management and full growth systems are quoted based on campaign scope.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/pricing" variant="secondary">
              View Pricing
            </Button>
            <Button href="/contact">Start a Project</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
