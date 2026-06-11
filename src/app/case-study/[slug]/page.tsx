import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { caseStudies, portfolioProjects } from '@/lib/portfolio';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.caseStudySlug === slug);
  if (!project) return { title: 'Case Study — Rezen Agency' };
  return {
    title: `${project.name} — Rezen Agency`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.caseStudySlug === slug);
  const study = caseStudies.find((s) => s.slug === slug);
  if (!project || !study) notFound();

  return (
    <div className="bg-white">
      <section className="border-b border-border pt-28 pb-12 sm:pt-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Link href="/work" className="text-sm text-muted hover:text-foreground">
            ← Back to work
          </Link>

          <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-border">
            <Image
              src={project.thumbnail}
              alt={`${project.name} website preview`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1152px"
            />
          </div>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {project.category}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{project.name}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{project.description}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 md:grid-cols-2">
          <div>
            <SectionHeading title="Goal" />
            <p className="mt-4 text-base leading-relaxed text-muted">{study.goal}</p>
          </div>
          <div>
            <SectionHeading title="Solution" />
            <p className="mt-4 text-base leading-relaxed text-muted">{study.solution}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <SectionHeading title="Project preview" subtitle="Key screens from the live website." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {study.previewImages.map((src) => (
              <div key={src} className="relative aspect-video overflow-hidden rounded-2xl border border-border">
                <Image src={src} alt={`${project.name} preview`} fill className="object-cover" sizes="50vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">Want a similar result for your business?</h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" className="bg-white text-foreground hover:bg-neutral-200">
              Start a Project
            </Button>
            {project.liveUrl && (
              <Button href={project.liveUrl} variant="outline-light" external>
                Live Preview ↗
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
