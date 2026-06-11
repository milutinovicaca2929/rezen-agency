'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import type { PortfolioProject } from '@/lib/portfolio';
import { heroShowcaseMeta } from '@/lib/portfolio';
import { prefersReducedMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';

type Props = {
  projects: PortfolioProject[];
};

const CARD_WIDTH =
  'w-[min(82vw,300px)] sm:w-[340px] md:w-[400px] lg:w-[440px]';

/** Symmetric arch — taller in the middle */
function archScale(index: number, total: number) {
  if (total <= 1) return 1;
  const center = (total - 1) / 2;
  const distance = Math.abs(index - center) / center;
  return 1 - distance * 0.1;
}

function FilmstripCard({
  project,
  index,
  total,
  priority,
}: {
  project: PortfolioProject;
  index: number;
  total: number;
  priority?: boolean;
}) {
  const meta = heroShowcaseMeta[project.slug];
  const scale = archScale(index, total);

  return (
    <Link
      href="/work"
      data-filmstrip-card
      className={cn(
        'hero-filmstrip-card group shrink-0',
        CARD_WIDTH,
      )}
      style={{ transformOrigin: 'bottom center' }}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-transform duration-500 ease-out"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'bottom center',
        }}
      >
        <Image
          src={project.thumbnail}
          alt={`${project.name} website hero`}
          fill
          className="object-contain object-center p-1 transition-transform duration-500 ease-out group-hover:scale-[1.02] sm:p-1.5"
          sizes="(max-width: 640px) 82vw, 440px"
          priority={priority}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-[10px] font-medium uppercase tracking-wide text-white/85 sm:text-[11px]">
            {meta?.industry}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-white">{project.name}</p>
        </div>
      </div>
    </Link>
  );
}

export function HeroFilmstrip({ projects }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const loops = useMemo(() => {
    const minSets = projects.length <= 4 ? 3 : 2;
    return Array.from({ length: minSets }, () => projects);
  }, [projects]);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    const set = setRef.current;
    if (!wrap || !track || !set) return;

    const reduce = prefersReducedMotion();
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const isNarrow = window.matchMedia('(max-width: 767px)').matches;
    const pauseAutoScroll = reduce || isCoarsePointer || isNarrow;

    const run = () => {
      tweenRef.current?.kill();
      gsap.set(track, { x: 0 });

      const setWidth = set.offsetWidth;
      if (setWidth <= 0) return;

      if (pauseAutoScroll) return;

      const speed = 42;
      tweenRef.current = gsap.to(track, {
        x: -setWidth,
        duration: setWidth / speed,
        ease: 'none',
        repeat: -1,
      });
    };

    const onEnter = () => tweenRef.current?.pause();
    const onLeave = () => {
      if (pauseAutoScroll) return;
      tweenRef.current?.play();
    };

    const ctx = gsap.context(() => {
      run();

      gsap.fromTo(
        '[data-filmstrip-card]',
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.15,
        },
      );
    }, wrap);

    wrap.addEventListener('mouseenter', onEnter);
    wrap.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', run);

    return () => {
      wrap.removeEventListener('mouseenter', onEnter);
      wrap.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', run);
      ctx.revert();
    };
  }, [projects, loops]);

  return (
    <div ref={wrapRef} className="hero-filmstrip relative mt-10 w-full sm:mt-12 md:mt-14">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-24 md:w-32"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white via-white/80 to-transparent sm:w-24 md:w-32"
        aria-hidden="true"
      />

      <div className="overflow-x-auto overflow-y-hidden px-1 pb-8 pt-3 [-ms-overflow-style:none] [scrollbar-width:none] sm:overflow-hidden sm:pb-10 sm:pt-4 [&::-webkit-scrollbar]:hidden">
        <div ref={trackRef} className="flex w-max items-end will-change-transform">
          {loops.map((set, setIndex) => (
            <div
              key={`set-${setIndex}`}
              ref={setIndex === 0 ? setRef : undefined}
              className="flex shrink-0 items-end gap-4 pr-4 sm:gap-5 sm:pr-5 md:gap-6 md:pr-6"
              aria-hidden={setIndex > 0 ? true : undefined}
            >
              {set.map((project, i) => (
                <FilmstripCard
                  key={`${setIndex}-${project.slug}`}
                  project={project}
                  index={i}
                  total={projects.length}
                  priority={setIndex === 0 && i < 2}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
