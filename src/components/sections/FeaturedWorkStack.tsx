'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FeaturedProjectSlide } from '@/components/sections/FeaturedProjectSlide';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { portfolioProjects } from '@/lib/portfolio';

gsap.registerPlugin(ScrollTrigger);

const FEATURED = portfolioProjects;
const TOTAL = FEATURED.length;

function padStep(n: number) {
  return String(n).padStart(2, '0');
}

export function FeaturedWorkStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const progressWrapRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const stack = stackRef.current;
    if (!section || !pin || !stack) return;

    const cards = gsap.utils.toArray<HTMLElement>('[data-featured-card]', stack);
    const thumbs = gsap.utils.toArray<HTMLElement>('[data-featured-thumb]', stack);
    const contents = gsap.utils.toArray<HTMLElement>('[data-featured-content]', stack);

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduceMotion) {
        cards.forEach((card, i) => {
          gsap.set(card, { opacity: i === 0 ? 1 : 0, y: 0, pointerEvents: i === 0 ? 'auto' : 'none' });
        });
        thumbs.forEach((thumb) => gsap.set(thumb, { scale: 1 }));
        return;
      }

      cards.forEach((card, i) => {
        gsap.set(card, {
          zIndex: TOTAL - i,
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 28,
          pointerEvents: i === 0 ? 'auto' : 'none',
        });
      });

      thumbs.forEach((thumb, i) => {
        gsap.set(thumb, { scale: i === 0 ? 1.05 : 1.05, transformOrigin: 'center center' });
      });

      contents.forEach((content, i) => {
        gsap.set(content, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 12 });
      });

      const scrollDistance = () => window.innerHeight * (TOTAL - 0.35);

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollDistance()}`,
          pin: pin,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const step = Math.min(TOTAL, Math.max(1, Math.floor(self.progress * TOTAL) + 1));
            if (progressRef.current) {
              progressRef.current.textContent = padStep(step);
            }
            if (progressWrapRef.current) {
              progressWrapRef.current.setAttribute('aria-label', `Project ${step} of ${TOTAL}`);
            }
          },
        },
      });

      tl.fromTo(
        thumbs[0],
        { scale: 1.05 },
        { scale: 1, duration: 0.85, ease: 'power2.out' },
        0,
      );

      for (let i = 1; i < TOTAL; i++) {
        const prev = cards[i - 1];
        const curr = cards[i];
        const thumbCurr = thumbs[i];
        const contentPrev = contents[i - 1];
        const contentCurr = contents[i];
        const at = i - 1;

        tl.to(
          prev,
          { y: -32, opacity: 0, duration: 1, pointerEvents: 'none' },
          at,
        )
          .to(contentPrev, { y: -10, opacity: 0, duration: 0.7 }, at)
          .fromTo(
            curr,
            { y: 28, opacity: 0, pointerEvents: 'none' },
            { y: 0, opacity: 1, duration: 1, pointerEvents: 'auto' },
            at + 0.08,
          )
          .fromTo(
            thumbCurr,
            { scale: 1.05 },
            { scale: 1, duration: 1, ease: 'power2.out' },
            at + 0.08,
          )
          .fromTo(
            contentCurr,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out' },
            at + 0.15,
          );
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="featured-work-section hidden bg-white lg:block" aria-label="Featured work">
      <div ref={pinRef} className="featured-work-pin">
        <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-6">
          <div className="flex items-end justify-between gap-8">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">01 — Selected Work</p>
            <SectionHeading
              title="Websites built to generate trust and enquiries."
              subtitle="A selection of websites designed and developed for businesses that care about quality, credibility and growth."
            />
            <p
              ref={progressWrapRef}
              className="shrink-0 text-sm font-medium tabular-nums tracking-wide text-muted"
              aria-live="polite"
              aria-label={`Project 1 of ${TOTAL}`}
            >
              <span ref={progressRef} className="text-foreground">
                01
              </span>
              <span className="mx-1.5 text-border">/</span>
              <span>{padStep(TOTAL)}</span>
            </p>
          </div>

          <div ref={stackRef} className="featured-work-stack relative mt-10 xl:mt-12">
            {FEATURED.map((project, i) => (
              <div
                key={project.slug}
                data-featured-card
                className="featured-work-card-layer absolute inset-0"
              >
                <FeaturedProjectSlide project={project} index={i + 1} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
