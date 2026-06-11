import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { WHATSAPP } from '@/lib/data';

export function FinalCTA() {
  return (
    <section className="section-pad bg-dark text-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-6">
        <Reveal variant="heading" className="w-full">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Ready to build a digital presence that brings trust and enquiries?
          </h2>
        </Reveal>
        <Reveal variant="paragraph" delay={0.06} className="w-full">
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-400 sm:mt-5 sm:text-base md:text-lg">
            Tell us about your business and we&apos;ll suggest the best next step.
          </p>
        </Reveal>
        <Reveal variant="paragraph" delay={0.1} className="mt-7 w-full sm:mt-8">
          <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="btn-interact inline-flex min-w-[180px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground hover:bg-neutral-100"
            >
              Start a Project
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-interact inline-flex min-w-[180px] items-center justify-center rounded-full border border-white/40 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:border-white hover:bg-white/10"
            >
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
