export type PortfolioProject = {

  slug: string;

  name: string;

  category: string;

  description: string;

  tags: string[];

  thumbnail: string;

  liveUrl?: string;

  caseStudySlug?: string;

};



export type HeroShowcaseMeta = {

  industry: string;

  tag: string;

};



export const heroShowcaseMeta: Record<string, HeroShowcaseMeta> = {

  'lumi-dental-studio': { industry: 'Healthcare', tag: 'Web Design' },

  'dr-matthias-fels': { industry: 'Dental Practice', tag: 'Appointment Website' },

  'altitude-aviation': { industry: 'Private Aviation', tag: 'Luxury Website' },

  'summit-roofing': { industry: 'Construction', tag: 'Lead Generation' },

};



export type CaseStudy = {

  slug: string;

  goal: string;

  solution: string;

  previewImages: string[];

};



export const caseStudies: CaseStudy[] = [

  {

    slug: 'dr-matthias-fels',

    goal:

      'Build trust for a premium dental practice and turn visitors into booked appointments.',

    solution:

      'A refined, bilingual website with strong visual hierarchy, service clarity and a frictionless appointment path — designed to feel calm, credible and high-end.',

    previewImages: ['/portfolio/dr-matthias-fels.jpg'],

  },

];



export const portfolioProjects: PortfolioProject[] = [

  {

    slug: 'dr-matthias-fels',

    name: 'Dr. Matthias Fels',

    category: 'Healthcare • Dental Practice',

    description:

      'Premium dental practice website focused on trust, aesthetics and appointment bookings.',

    tags: ['Web Design', 'UI/UX', 'Healthcare', 'Appointment System'],

    thumbnail: '/portfolio/dr-matthias-fels.jpg',

    liveUrl: 'https://dr-matthias-fels.vercel.app',

    caseStudySlug: 'dr-matthias-fels',

  },

  {

    slug: 'altitude-aviation',

    name: 'Altitude Aviation',

    category: 'Private Aviation',

    description:

      'Luxury private jet charter website designed to generate high-value enquiries and premium client bookings.',

    tags: ['Web Design', 'Luxury Branding', 'Lead Generation'],

    thumbnail: '/portfolio/altitude-aviation.jpg',

    liveUrl: 'https://altitude-private-aviation.vercel.app',

  },

  {

    slug: 'summit-roofing',

    name: 'Summit Roofing',

    category: 'Construction • Roofing',

    description:

      'Lead-focused roofing company website built to generate quote requests and local customer enquiries.',

    tags: ['Web Design', 'Local Business', 'Lead Generation'],

    thumbnail: '/portfolio/summit-roofing.jpg',

    liveUrl: 'https://summit-roofing-business.vercel.app',

  },

  {

    slug: 'lumi-dental-studio',

    name: 'LUMI Dental Studio',

    category: 'Healthcare • Cosmetic Dentistry',

    description:

      'Luxury dental studio website with editorial design, treatment storytelling and private consultation booking flow.',

    tags: ['Web Design', 'UI/UX', 'Healthcare', 'Luxury Branding'],

    thumbnail: '/portfolio/lumi-dental-studio.jpg',

    liveUrl: 'https://lumi-dental-studio.vercel.app',

  },

];



export const PORTFOLIO_TARGET_COUNT = 6;



export type ComingSoonProject = {

  slug: string;

  name: string;

  category: string;

  description: string;

};



export const comingSoonProjects: ComingSoonProject[] = [

  {

    slug: 'aurelia-estates',

    name: 'Aurelia Estates',

    category: 'Luxury Real Estate',

    description:

      'Premium property showcase with editorial listings, private viewings and enquiry flow for high-value real estate.',

  },

  {

    slug: 'maison-noir-skincare',

    name: 'Maison Noir Skincare',

    category: 'Luxury E-Commerce',

    description:

      'Luxury skincare e-commerce with refined product storytelling, ritual-led UX and conversion-focused checkout.',

  },

];



export const heroShowcaseSlugs = [

  'lumi-dental-studio',

  'altitude-aviation',

  'dr-matthias-fels',

  'summit-roofing',

] as const;



export function getHeroShowcaseProjects(): PortfolioProject[] {

  return heroShowcaseSlugs

    .map((slug) => portfolioProjects.find((p) => p.slug === slug))

    .filter((p): p is PortfolioProject => Boolean(p));

}


