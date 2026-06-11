import type { Metadata } from 'next';
import { PortfolioGrid } from '@/components/sections/PortfolioGrid';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Work — Rezen Agency',
  description:
    'Selected websites built to generate trust and enquiries for healthcare, aviation and local businesses.',
};

export default function WorkPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-border pt-24 pb-8 sm:pt-28 sm:pb-10">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal variant="heading">
            <SectionHeading
              eyebrow="Work"
              title="Websites built to generate trust and enquiries."
              subtitle="A selection of websites designed and developed for businesses that care about quality, credibility and growth."
            />
          </Reveal>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <PortfolioGrid />
        </div>
      </section>
    </div>
  );
}
