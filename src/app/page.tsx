import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Hero } from '@/components/sections/Hero';
import { Positioning } from '@/components/sections/Positioning';
import { PricingPreview } from '@/components/sections/PricingPreview';
import { Process } from '@/components/sections/Process';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { Services } from '@/components/sections/Services';
import { Testimonials } from '@/components/sections/Testimonials';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Positioning />
      <Services />
      <Process />
      <PricingPreview />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
