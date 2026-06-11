import type { ComingSoonProject } from '@/lib/portfolio';

type Props = {
  project: ComingSoonProject;
  index: number;
};

function padIndex(n: number) {
  return String(n).padStart(2, '0');
}

export function ComingSoonCard({ project, index }: Props) {
  return (
    <article
      data-stagger-item
      className="portfolio-card group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-2xl border border-dashed border-border bg-surface/40 sm:min-h-[480px]"
    >
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
        <div>
          <span className="inline-flex rounded-full border border-border bg-white px-2.5 py-1 text-[10px] font-semibold tabular-nums tracking-wider">
            {padIndex(index)}
          </span>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-muted">Coming soon</p>
          <h3 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">{project.name}</h3>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-muted">
            {project.category}
          </p>
        </div>
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">{project.description}</p>
      </div>
    </article>
  );
}
