'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fadeUpOnScroll, prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

export type RevealVariant = 'heading' | 'paragraph' | 'card' | 'default';

const VARIANTS: Record<RevealVariant, { y: number; duration: number }> = {
  heading: { y: 22, duration: 0.85 },
  paragraph: { y: 16, duration: 0.75 },
  card: { y: 24, duration: 0.8 },
  default: { y: 20, duration: 0.8 },
};

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  as?: 'div' | 'span';
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = 'default',
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const { y, duration } = VARIANTS[variant];

    const ctx = gsap.context(() => {
      fadeUpOnScroll(el, {
        trigger: el,
        start: 'top 90%',
        y,
        duration,
        delay,
      });
    }, el);

    return () => ctx.revert();
  }, [delay, variant]);

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </Tag>
  );
}
