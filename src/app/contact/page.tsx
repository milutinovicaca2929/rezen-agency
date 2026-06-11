import type { Metadata } from 'next';
import { ContactForm } from '@/components/sections/ContactForm';
import { ContactInfo } from '@/components/sections/ContactInfo';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Contact — Rezen Agency',
  description: 'Tell us about your business. We suggest the best next step — website, landing page, ads or a full system.',
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-border pt-24 pb-8 sm:pt-28 sm:pb-10">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal variant="heading">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Contact</p>
            <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
              Tell us about your business.
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
              Share a few details and we&apos;ll suggest the best next step — premium website, landing page,
              ads system or full growth setup.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-28 pt-0 md:pb-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:gap-12 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <Reveal variant="card">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Start here</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-[1.65rem]">A direct line to the studio.</h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
                We work with clinics, service businesses and ambitious brands that need a premium
                presence, clear offer and better enquiries — not another generic template.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-muted">
                <li>— Scoped around your goals and timeline</li>
                <li>— Launch with tracking from day one</li>
                <li>— Improve with data after go-live</li>
              </ul>
              <ContactInfo />
            </div>
          </Reveal>
          <Reveal variant="card" delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
