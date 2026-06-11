'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/ui/Button';
import { HeroFilmstrip } from '@/components/sections/HeroFilmstrip';
import { fadeUp, prefersReducedMotion, splitTextReveal } from '@/lib/motion';
import { getHeroShowcaseProjects } from '@/lib/portfolio';

const TRUST_ITEMS = ['Custom Design', 'Conversion Focused', 'Fast Delivery', 'Worldwide'] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const projects = getHeroShowcaseProjects();

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    if (!section || !headline) return;

    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const logo = document.querySelector('[data-header-logo]');
      const nav = document.querySelector('[data-header-nav]');

      if (reduce) {
        gsap.set(
          [logo, nav, '[data-hero-eyebrow]', '[data-hero-sub]', '[data-hero-cta] > *', '[data-hero-trust] > *'],
          { opacity: 1, y: 0 },
        );
        return;
      }

      gsap.set([logo, nav], { opacity: 0, y: -12 });
      gsap.to(logo, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.05 });
      gsap.to(nav, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.12 });

      const eyebrow = section.querySelector('[data-hero-eyebrow]');
      const sub = section.querySelector('[data-hero-sub]');
      const ctaItems = section.querySelectorAll('[data-hero-cta] > *');
      const trustItems = section.querySelectorAll('[data-hero-trust] > *');

      fadeUp(eyebrow, { delay: 0.2, y: 14, duration: 0.7 });
      splitTextReveal(headline, { delay: 0.32, stagger: 0.035, y: 22 });
      fadeUp(sub, { delay: 0.55, y: 18, duration: 0.8 });
      fadeUp(ctaItems, { delay: 0.72, y: 16, duration: 0.75, stagger: 0.08 });
      fadeUp(trustItems, { delay: 0.9, y: 10, duration: 0.65, stagger: 0.05 });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-x-hidden border-b border-border bg-white pt-[4.5rem] sm:pt-24 md:pt-28"
    >
      <div className="mx-auto max-w-4xl px-5 pb-4 text-center sm:px-6 sm:pb-6 md:max-w-5xl">
        <p
          data-hero-eyebrow
          className="text-xs font-semibold uppercase tracking-[0.2em] text-muted"
        >
          Web Design · Landing Pages · Meta Ads · Google Ads
        </p>

        <h1
          ref={headlineRef}
          className="mx-auto mt-5 max-w-3xl break-words text-[1.65rem] font-bold leading-[1.08] tracking-tight sm:mt-6 sm:text-4xl md:text-[2.75rem] lg:text-[3rem]"
        >
          Digital marketing built to make your business impossible to ignore.
        </h1>

        <p
          data-hero-sub
          className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted sm:mt-6 sm:text-base md:text-lg"
        >
          We help clinics, service businesses and ambitious brands grow through conversion-focused
          websites, landing pages and paid advertising.
        </p>

        <div
          data-hero-cta
          className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row"
        >
          <Button href="/work">View Work</Button>
          <Button href="/contact" variant="secondary">
            Start a Project
          </Button>
        </div>

        <ul
          data-hero-trust
          className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted sm:mt-7 sm:gap-x-5 sm:text-[13px]"
        >
          {TRUST_ITEMS.map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <span className="text-foreground" aria-hidden="true">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <HeroFilmstrip projects={projects} />
    </section>
  );
}
