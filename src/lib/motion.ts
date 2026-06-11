import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 767px)').matches;
}

type FadeUpOptions = {
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  ease?: string;
};

export function fadeUp(
  targets: gsap.TweenTarget,
  { delay = 0, duration = 0.85, y = 24, stagger = 0, ease = 'power3.out' }: FadeUpOptions = {},
) {
  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return null;
  }

  gsap.set(targets, { opacity: 0, y });
  return gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration,
    delay,
    stagger,
    ease,
  });
}

type FadeUpScrollOptions = FadeUpOptions & {
  trigger?: gsap.DOMTarget;
  start?: string;
  once?: boolean;
};

export function fadeUpOnScroll(
  targets: gsap.TweenTarget,
  {
    trigger,
    start = 'top 88%',
    once = true,
    y = 22,
    duration = 0.8,
    stagger = 0,
    delay = 0,
    ease = 'power3.out',
  }: FadeUpScrollOptions = {},
) {
  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return null;
  }

  const mobileY = isMobileViewport() ? Math.round(y * 0.65) : y;

  gsap.set(targets, { opacity: 0, y: mobileY });

  return gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration: isMobileViewport() ? duration * 0.9 : duration,
    delay,
    stagger,
    ease,
    scrollTrigger: {
      trigger: (trigger ?? targets) as gsap.DOMTarget,
      start,
      once,
    },
  });
}

export function staggerFadeUp(
  container: HTMLElement,
  selector = '[data-stagger-item]',
  options: { y?: number; stagger?: number; start?: string } = {},
) {
  const items = container.querySelectorAll(selector);
  if (!items.length) return () => {};

  if (prefersReducedMotion()) {
    gsap.set(items, { opacity: 1, y: 0 });
    return () => {};
  }

  const ctx = gsap.context(() => {
    fadeUpOnScroll(items, {
      trigger: container,
      start: options.start ?? 'top 85%',
      y: options.y ?? (isMobileViewport() ? 16 : 24),
      stagger: options.stagger ?? 0.08,
      duration: 0.75,
    });
  }, container);

  return () => ctx.revert();
}

export function splitWords(container: HTMLElement): HTMLElement[] {
  const text = container.textContent ?? '';
  container.textContent = '';
  container.setAttribute('aria-label', text);

  const words = text.split(/\s+/).filter(Boolean);
  const spans: HTMLElement[] = [];

  words.forEach((word, i) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.style.display = 'inline-block';
    span.setAttribute('aria-hidden', 'true');
    container.appendChild(span);
    if (i < words.length - 1) {
      container.appendChild(document.createTextNode(' '));
    }
    spans.push(span);
  });

  return spans;
}

export function splitTextReveal(
  container: HTMLElement,
  { delay = 0, stagger = 0.04, y = 28 }: { delay?: number; stagger?: number; y?: number } = {},
) {
  const words = splitWords(container);

  if (prefersReducedMotion()) {
    gsap.set(words, { opacity: 1, y: 0 });
    return null;
  }

  gsap.set(words, { opacity: 0, y });
  return gsap.to(words, {
    opacity: 1,
    y: 0,
    duration: 0.75,
    stagger,
    delay,
    ease: 'power3.out',
  });
}

export function revealCards(
  cards: gsap.TweenTarget,
  { delay = 0, stagger = 0.1 }: { delay?: number; stagger?: number } = {},
) {
  if (prefersReducedMotion()) {
    gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
    return null;
  }

  gsap.set(cards, { opacity: 0, y: 32, scale: 0.97 });
  return gsap.to(cards, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.9,
    delay,
    stagger,
    ease: 'power3.out',
  });
}

export function staggerChildren(
  parent: HTMLElement,
  selector = '[data-stagger-item]',
  { y = 20, stagger = 0.08 }: { y?: number; stagger?: number } = {},
) {
  return staggerFadeUp(parent, selector, { y, stagger });
}

type TimelineStep = {
  id: string;
  stepEl: HTMLElement;
};

type ScrollProgressTimelineOptions = {
  section: HTMLElement;
  lineBg: HTMLElement;
  lineFill: HTMLElement;
  steps: TimelineStep[];
  onActiveChange?: (index: number) => void;
};

export function timelineProgress({
  section,
  lineBg,
  lineFill,
  steps,
  onActiveChange,
}: ScrollProgressTimelineOptions) {
  return scrollProgressTimeline({ section, lineBg, lineFill, steps, onActiveChange });
}

export function scrollProgressTimeline({
  section,
  lineBg,
  lineFill,
  steps,
  onActiveChange,
}: ScrollProgressTimelineOptions) {
  if (prefersReducedMotion()) {
    gsap.set(lineFill, { scaleY: 1 });
    steps.forEach((s) => s.stepEl.classList.add('is-active'));
    return () => {};
  }

  gsap.set(lineFill, { scaleY: 0, transformOrigin: 'top center' });

  const ctx = gsap.context(() => {
    gsap.to(lineFill, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 0.35,
      },
    });

    steps.forEach((step, index) => {
      ScrollTrigger.create({
        trigger: step.stepEl,
        start: 'top 65%',
        end: 'bottom 35%',
        onEnter: () => onActiveChange?.(index),
        onEnterBack: () => onActiveChange?.(index),
      });

      gsap.set(step.stepEl, { opacity: 0.4, y: 18 });
      gsap.to(step.stepEl, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: step.stepEl,
          start: 'top 85%',
          once: true,
        },
      });
    });
  }, section);

  return () => ctx.revert();
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}
