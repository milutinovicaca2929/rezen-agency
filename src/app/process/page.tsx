import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { processPageSteps } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Process — Rezen Agency',
  description: 'Our process from discovery to optimization — clear, structured and built for results.',
};

export default function ProcessPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-border pt-24 pb-10 sm:pt-28 sm:pb-12">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal variant="heading">
            <SectionHeading
              eyebrow="Process"
              title="Our process"
              subtitle="A structured path from first conversation to launch and ongoing improvement — no guesswork, no agency layers."
            />
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <div className="relative">
            <div className="absolute bottom-0 left-[15px] top-0 w-px bg-border sm:left-[19px]" aria-hidden="true" />

            <div className="space-y-10 sm:space-y-14">
              {processPageSteps.map((step, i) => (
                <Reveal key={step.title} variant="card" delay={i * 0.05}>
                  <article className="relative grid grid-cols-[auto_1fr] gap-5 sm:gap-8">
                    <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white sm:h-10 sm:w-10">
                      <span className="text-[10px] font-bold tabular-nums sm:text-xs">{step.num}</span>
                    </div>
                    <div className="pb-2">
                      <h2 className="text-lg font-bold tracking-tight sm:text-xl">{step.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal variant="paragraph" className="mt-12 sm:mt-16">
            <Link href="/contact" className="link-underline text-sm font-semibold">
              Start a project →
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
