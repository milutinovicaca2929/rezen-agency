'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import type { PortfolioProject } from '@/lib/portfolio';
import { cn } from '@/lib/utils';

type Props = {
  project: PortfolioProject;
  index: number;
};

function padIndex(n: number) {
  return String(n).padStart(2, '0');
}

export function ProjectCard({ project, index }: Props) {
  const cardRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glow.style.setProperty('--mouse-x', `${x}px`);
    glow.style.setProperty('--mouse-y', `${y}px`);
    glow.style.opacity = '1';
  };

  const onLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  };

  return (
    <article
      ref={cardRef}
      data-stagger-item
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="portfolio-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(280px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.04), transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="relative aspect-video overflow-hidden bg-surface">
        <span className="absolute left-4 top-4 z-10 rounded-full border border-border/80 bg-white/90 px-2.5 py-1 text-[10px] font-semibold tabular-nums tracking-wider backdrop-blur-sm">
          {padIndex(index)}
        </span>
        <Image
          src={project.thumbnail}
          alt={`${project.name} website preview`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-bold tracking-tight sm:text-xl">{project.name}</h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-muted">
          {project.category}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live preview of ${project.name}`}
                className="btn-interact inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2.5 text-xs font-semibold text-background hover:bg-neutral-800 sm:text-sm"
              >
                Live Preview
                <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.caseStudySlug && (
              <Link
                href={`/case-study/${project.caseStudySlug}`}
                className="btn-interact inline-flex items-center rounded-full border border-border px-4 py-2.5 text-xs font-semibold text-foreground hover:border-foreground sm:text-sm"
              >
                Case Study
              </Link>
            )}
          </div>

          {(project.caseStudySlug || project.liveUrl) && (
            <span
              className={cn(
                'inline-flex items-center gap-1 text-xs font-semibold text-muted transition-all duration-300',
                'translate-x-0 group-hover:translate-x-0.5 group-hover:text-foreground',
              )}
            >
              View case
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
