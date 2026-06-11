import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

export function Contact() {
  return (
    <section id="contact" className="section-pad border-b border-border bg-white">
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-6">
        <Reveal variant="heading">
          <SectionHeading
            eyebrow="Contact"
            title="Ready to start?"
            subtitle="Share your project details and we'll reply with a clear next step."
          />
        </Reveal>
        <Reveal variant="paragraph" delay={0.08} className="mt-7 sm:mt-8">
          <Button href="/contact">Go to contact page</Button>
        </Reveal>
        <Reveal variant="paragraph" delay={0.12} className="mt-4">
          <Link href="/contact" className="link-underline text-sm font-semibold text-muted">
            Or view all contact options →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
