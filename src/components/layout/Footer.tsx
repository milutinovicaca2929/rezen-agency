import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { EMAIL, INSTAGRAM, LOCATION, TIKTOK, WHATSAPP } from '@/lib/data';

const nav = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/process', label: 'Process' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white pb-24 md:pb-10">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo href="/" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Premium websites and growth systems for ambitious service businesses.
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Navigation</p>
            <nav className="mt-3 flex flex-col gap-2.5">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="link-underline w-fit text-sm text-muted">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Contact</p>
            <div className="mt-3 flex flex-col gap-2.5 text-sm text-muted">
              <a href={`mailto:${EMAIL}`} className="link-underline w-fit">
                {EMAIL}
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="link-underline w-fit">
                WhatsApp
              </a>
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted">Social</p>
            <div className="mt-2.5 flex flex-col gap-2.5 text-sm text-muted">
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="link-underline w-fit">
                Instagram
              </a>
              <a href={TIKTOK} target="_blank" rel="noopener noreferrer" className="link-underline w-fit">
                TikTok
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Location</p>
            <p className="mt-3 text-sm text-muted">{LOCATION}</p>
            <p className="mt-1 text-sm text-muted">Working worldwide</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-5 py-4 text-center text-xs text-muted sm:px-6 sm:py-5">
        © {new Date().getFullYear()} Rezen Agency
      </div>
    </footer>
  );
}
