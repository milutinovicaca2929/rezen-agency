'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { faqHome } from '@/lib/data';
import { prefersReducedMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const answerEl = answerRef.current;
    const inner = innerRef.current;
    if (!answerEl || !inner) return;

    if (prefersReducedMotion()) {
      answerEl.style.height = isOpen ? 'auto' : '0px';
      gsap.set(inner, { opacity: isOpen ? 1 : 0 });
      return;
    }

    if (isOpen) {
      gsap.set(answerEl, { height: 'auto' });
      const height = answerEl.offsetHeight;
      gsap.fromTo(answerEl, { height: 0 }, { height, duration: 0.5, ease: 'power3.out' });
      gsap.fromTo(
        inner,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.06, ease: 'power3.out' },
      );
    } else {
      gsap.to(answerEl, { height: 0, duration: 0.4, ease: 'power3.inOut' });
      gsap.to(inner, { opacity: 0, y: -6, duration: 0.25, ease: 'power2.in' });
    }
  }, [isOpen]);

  return (
    <div className={cn('transition-colors duration-300', isOpen && 'bg-surface/60')}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7 sm:py-6"
      >
        <span className="pr-2 text-[15px] font-semibold leading-snug sm:text-base">{question}</span>
        <span
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-base text-muted transition-all duration-300',
            isOpen && 'rotate-45 border-foreground/30 bg-white',
          )}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div ref={answerRef} className="overflow-hidden" style={{ height: 0 }}>
        <p
          ref={innerRef}
          className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-7 sm:pb-6 sm:text-[15px] sm:leading-relaxed"
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-pad border-b border-border bg-surface/50">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal variant="heading">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">07 — FAQ</p>
          <SectionHeading className="mt-3" title="Questions & answers." />
        </Reveal>

        <Reveal variant="card" delay={0.06}>
          <div className="mt-7 divide-y divide-border overflow-hidden rounded-xl border border-border bg-white sm:mt-8">
            {faqHome.map((item, i) => (
              <FaqItem
                key={item.q}
                question={item.q}
                answer={item.a}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
