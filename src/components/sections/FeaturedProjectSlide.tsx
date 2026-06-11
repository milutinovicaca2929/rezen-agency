import Image from 'next/image';
import Link from 'next/link';
import type { PortfolioProject } from '@/lib/portfolio';

type Props = {
  project: PortfolioProject;
  index: number;
  className?: string;
};

function padIndex(n: number) {
  return String(n).padStart(2, '0');
}

export function FeaturedProjectSlide({ project, index, className }: Props) {
  return (
    <article
      className={`featured-work-card group grid h-full grid-cols-[1.15fr_1fr] items-center gap-10 overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] xl:gap-12 xl:p-8 ${className ?? ''}`}
    >
      <div className="featured-work-thumb relative aspect-[16/10] overflow-hidden rounded-xl bg-surface">
        <span className="absolute left-4 top-4 z-10 rounded-full border border-border/80 bg-white/90 px-2.5 py-1 text-[10px] font-semibold tabular-nums tracking-wider backdrop-blur-sm">
          {padIndex(index)}
        </span>
        <Image
          src={project.thumbnail}
          alt={`${project.name} website preview`}
          fill
          data-featured-thumb
          className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04]"
          sizes="(max-width: 1280px) 55vw, 640px"
          priority={index === 1}
        />
      </div>

      <div data-featured-content className="flex min-h-0 flex-col justify-center py-2">
        <h3 className="text-2xl font-bold tracking-tight xl:text-[1.75rem]">{project.name}</h3>
        <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-muted">
          {project.category}
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-muted xl:text-base">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-2.5">
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
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-foreground">
            View case
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}
