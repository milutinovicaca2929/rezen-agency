import Link from 'next/link';
import { FeaturedWorkStack } from '@/components/sections/FeaturedWorkStack';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { comingSoonProjects, portfolioProjects } from '@/lib/portfolio';
import { ComingSoonCard } from '@/components/sections/ComingSoonCard';

export function SelectedWork() {
  return (
    <>
      {/* Desktop: pinned scroll-stacked showcase */}
      <FeaturedWorkStack />

      {/* Tablet & mobile: standard vertical cards */}
      <section className="section-pad border-b border-border bg-white lg:hidden">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal variant="heading">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">01 — Selected Work</p>
            <SectionHeading
              className="mt-3"
              title="Websites built to generate trust and enquiries."
              subtitle="A selection of websites designed and developed for businesses that care about quality, credibility and growth."
            />
          </Reveal>

          <div className="mt-8 flex flex-col gap-5 sm:mt-10 sm:gap-6">
            {portfolioProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i + 1} />
            ))}
            {comingSoonProjects.map((project, i) => (
              <ComingSoonCard
                key={project.slug}
                project={project}
                index={portfolioProjects.length + i + 1}
              />
            ))}
          </div>

          <Reveal variant="paragraph" className="mt-8 sm:mt-10">
            <Link href="/work" className="link-underline text-sm font-semibold">
              View all work →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Desktop: view all link below pinned section */}
      <div className="hidden border-b border-border bg-white px-6 pb-14 lg:block">
        <div className="mx-auto max-w-6xl">
          <Link href="/work" className="link-underline text-sm font-semibold">
            View all work →
          </Link>
        </div>
      </div>
    </>
  );
}
