import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function Testimonials() {
  return (
    <section className="section-pad border-b border-border bg-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal variant="heading">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">06 — Testimonials</p>
          <SectionHeading className="mt-3" title="What clients say." />
        </Reveal>
        <TestimonialsCarousel />
      </div>
    </section>
  );
}
