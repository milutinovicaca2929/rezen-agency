'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

const links = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/process', label: 'Process' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled ? 'border-b border-border bg-white/95 backdrop-blur-md' : 'bg-white',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-6">
        <div data-header-logo>
          <Logo />
        </div>

        <nav data-header-nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="link-underline text-sm text-muted">
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-interact rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:bg-neutral-800"
          >
            Start a Project
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border md:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className={cn('block h-0.5 w-5 bg-foreground transition-transform', open && 'translate-y-2 rotate-45')} />
            <span className={cn('block h-0.5 w-5 bg-foreground transition-opacity', open && 'opacity-0')} />
            <span className={cn('block h-0.5 w-5 bg-foreground transition-transform', open && '-translate-y-2 -rotate-45')} />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-white px-5 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="min-h-11 py-2 text-base font-medium leading-none"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-interact mt-2 inline-flex rounded-full bg-foreground px-5 py-3 text-center text-sm font-semibold text-background"
            >
              Start a Project
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
