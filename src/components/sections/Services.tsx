'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { staggerChildren } from '@/lib/motion';
import { homeServiceGrid, secondaryServices } from '@/lib/data';

function ServiceIcon({ type }: { type: string }) {
  const cls = 'h-5 w-5 text-foreground';

  if (type === 'web') {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 8h18M8 4v4" />
      </svg>
    );
  }
  if (type === 'landing') {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 6h16M4 12h10M4 18h14" />
      </svg>
    );
  }
  if (type === 'meta') {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M8 12h8" />
      </svg>
    );
  }
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function Services() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    return staggerChildren(grid, '[data-stagger-item]');
  }, []);

  return (
    <section id="services" className="section-pad border-b border-border bg-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal variant="heading">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">03 — Services</p>
          <SectionHeading
            className="mt-3 max-w-xl"
            title="Everything needed to generate enquiries."
            subtitle="Websites, landing pages and paid campaigns — structured as one clear offer."
          />
        </Reveal>

        <div
          ref={gridRef}
          className="mt-7 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
        >
          {homeServiceGrid.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              data-stagger-item
              className="service-grid-card group flex h-full min-h-[200px] flex-col rounded-xl border border-border bg-surface/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:bg-white sm:min-h-[220px] sm:p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white transition-colors group-hover:border-foreground/25">
                <ServiceIcon type={service.icon} />
              </span>
              <h3 className="mt-4 text-base font-bold tracking-tight sm:text-lg">{service.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.description}</p>
            </Link>
          ))}
        </div>

        <Reveal variant="paragraph" className="mt-7 sm:mt-8">
          <p className="text-sm text-muted">
            <span className="font-semibold text-foreground">Included when needed:</span>{' '}
            {secondaryServices.join(' · ')}
          </p>
          <Link href="/services" className="link-underline mt-3 inline-block text-sm font-semibold">
            Explore all services →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
