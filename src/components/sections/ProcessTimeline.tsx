'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { scrollProgressTimeline } from '@/lib/motion';
import { processSteps } from '@/lib/data';
import { cn } from '@/lib/utils';

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineBgRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const lineBg = lineBgRef.current;
    const lineFill = lineFillRef.current;
    if (!section || !lineBg || !lineFill) return;

    const stepEls = section.querySelectorAll<HTMLElement>('[data-process-step]');
    const steps = Array.from(stepEls).map((stepEl, i) => ({
      id: `step-${i}`,
      stepEl,
    }));

    return scrollProgressTimeline({
      section,
      lineBg,
      lineFill,
      steps,
      onActiveChange: setActiveIndex,
    });
  }, []);

  return (
    <section ref={sectionRef} id="process" className="section-pad border-b border-border bg-surface/50">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14 xl:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">04 — Process</p>
            <SectionHeading
              className="mt-3 max-w-sm"
              title="A clear path from discovery to launch."
              subtitle="Structured, direct and built around conversion — not agency layers."
            />
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div
              ref={lineBgRef}
              className="absolute bottom-2 left-[17px] top-2 w-px bg-neutral-300 sm:left-[21px]"
              aria-hidden="true"
            />
            <div
              ref={lineFillRef}
              className="absolute left-[17px] top-2 w-px bg-foreground sm:left-[21px]"
              style={{ height: 'calc(100% - 1rem)' }}
              aria-hidden="true"
            />

            <ol className="space-y-10 sm:space-y-12">
              {processSteps.map((step, index) => (
                <li
                  key={step.title}
                  data-process-step
                  className={cn(
                    'relative grid grid-cols-[auto_1fr] gap-4 transition-opacity duration-500 sm:gap-6',
                    activeIndex === index ? 'opacity-100' : 'opacity-45',
                  )}
                >
                  <div
                    className={cn(
                      'relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 bg-white transition-all duration-500 sm:h-11 sm:w-11',
                      activeIndex === index ? 'border-foreground' : 'border-neutral-300',
                    )}
                  >
                    <span
                      className={cn(
                        'text-[10px] font-bold tabular-nums sm:text-xs',
                        activeIndex === index ? 'text-foreground' : 'text-muted',
                      )}
                    >
                      {step.num}
                    </span>
                  </div>
                  <div className="pt-0.5 pb-1 sm:pt-1">
                    <h3
                      className={cn(
                        'text-base font-bold tracking-tight sm:text-lg',
                        activeIndex === index && 'text-foreground',
                      )}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted sm:text-[15px] sm:leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 lg:pl-[calc(42%+3.5rem)]">
          <Link href="/process" className="link-underline text-sm font-semibold">
            View full process →
          </Link>
        </div>
      </div>
    </section>
  );
}
