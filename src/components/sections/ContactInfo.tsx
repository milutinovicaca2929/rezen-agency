'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  EMAIL,
  INSTAGRAM,
  LOCATION,
  TIKTOK,
  WHATSAPP,
} from '@/lib/data';
import { fadeUpOnScroll, prefersReducedMotion } from '@/lib/motion';

const channels = [
  {
    label: 'WhatsApp',
    href: WHATSAPP,
    external: true,
    icon: WhatsAppIcon,
  },
  {
    label: 'Email',
    href: `mailto:${EMAIL}`,
    external: false,
    icon: EmailIcon,
  },
  {
    label: 'Instagram',
    href: INSTAGRAM,
    external: true,
    icon: InstagramIcon,
  },
  {
    label: 'TikTok',
    href: TIKTOK,
    external: true,
    icon: TikTokIcon,
  },
] as const;

export function ContactInfo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll('[data-contact-item]');
    if (!items.length) return;

    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      fadeUpOnScroll(items, {
        trigger: el,
        start: 'top 88%',
        y: 18,
        stagger: 0.07,
        duration: 0.75,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="mt-8 rounded-xl border border-border bg-surface p-5 sm:mt-10 sm:p-6">
      <p data-contact-item className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        Direct contact
      </p>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {channels.map(({ label, href, external, icon: Icon }) => (
          <li key={label} data-contact-item>
            <a
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="contact-icon-link flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3.5 transition-colors hover:border-foreground"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface">
                <Icon className="h-4 w-4 text-foreground" />
              </span>
              <span className="text-sm font-semibold">{label}</span>
            </a>
          </li>
        ))}
      </ul>

      <div data-contact-item className="mt-6 border-t border-border pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Location</p>
        <p className="mt-2 text-sm font-medium">{LOCATION}</p>
        <p className="mt-1 text-sm text-muted">Working worldwide</p>
      </div>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.3 2.4 1.8 4.2 4 4.5v3.4c-1.5 0-2.9-.5-4-1.4v6.8c0 3.8-3.1 6.9-6.9 6.9S2.7 19.1 2.7 15.3s3.1-6.9 6.9-6.9c.4 0 .7 0 1.1.1v3.7c-.3-.1-.7-.2-1-.2-1.7 0-3.1 1.4-3.1 3.1s1.4 3.1 3.1 3.1 3.1-1.4 3.1-3.1V3h3.6z" />
    </svg>
  );
}
