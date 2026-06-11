import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function Positioning() {
  return (
    <section className="section-pad border-b border-border bg-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal variant="heading">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">02 — Positioning</p>
          <SectionHeading
            className="mt-3"
            title="Your online presence should work as a system."
          />
        </Reveal>
        <Reveal variant="paragraph" delay={0.08}>
          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-muted sm:text-base md:text-lg">
            A premium website builds trust. Paid campaigns bring attention. A clear offer connects
            both. Rezen helps businesses launch with tracking, communicate clearly and turn visitors
            into better enquiries.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
