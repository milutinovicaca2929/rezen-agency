'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { EMAIL, WHATSAPP, contactProjectFit } from '@/lib/data';
import { fadeUpOnScroll, prefersReducedMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [fit, setFit] = useState<string[]>([]);

  useEffect(() => {
    const form = formRef.current;
    if (!form || submitted) return;

    const fields = form.querySelectorAll('[data-form-field]');
    if (!fields.length) return;

    if (prefersReducedMotion()) {
      gsap.set(fields, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      fadeUpOnScroll(fields, {
        trigger: form,
        start: 'top 85%',
        y: 16,
        stagger: 0.06,
        duration: 0.7,
      });
    }, form);

    return () => ctx.revert();
  }, [submitted]);

  const toggleFit = (item: string) => {
    setFit((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const business = String(data.get('business') ?? '');
    const message = String(data.get('message') ?? '');
    const fitLine = fit.length ? `\nProject fit: ${fit.join(', ')}` : '';

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nBusiness: ${business}${fitLine}\n\n${message}`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('New project enquiry')}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 text-center sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Message sent</p>
        <h2 className="mt-3 text-xl font-bold sm:text-2xl">Thanks — we&apos;ll be in touch.</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Your email client should have opened with your message. We usually respond within one business day.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="link-underline mt-6 text-sm font-semibold"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className="rounded-xl border border-border bg-white p-5 sm:p-7"
      onSubmit={onSubmit}
    >
      <p data-form-field className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        Project enquiry
      </p>
      <div className="mt-5 space-y-4">
        <div data-form-field>
          <label htmlFor="contact-name" className="sr-only">
            Your name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="Your name"
            className="contact-input w-full rounded-lg border border-border bg-surface/30 px-4 py-3.5 text-sm outline-none transition-colors focus:border-foreground focus:bg-white"
          />
        </div>
        <div data-form-field>
          <label htmlFor="contact-email" className="sr-only">
            Email address
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="Email address"
            required
            className="contact-input w-full rounded-lg border border-border bg-surface/30 px-4 py-3.5 text-sm outline-none transition-colors focus:border-foreground focus:bg-white"
          />
        </div>
        <div data-form-field>
          <label htmlFor="contact-business" className="sr-only">
            Business type
          </label>
          <input
            id="contact-business"
            type="text"
            name="business"
            placeholder="Business type"
            className="contact-input w-full rounded-lg border border-border bg-surface/30 px-4 py-3.5 text-sm outline-none transition-colors focus:border-foreground focus:bg-white"
          />
        </div>

        <fieldset data-form-field>
          <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Project fit</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {contactProjectFit.map((item) => {
              const selected = fit.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleFit(item)}
                  className={cn(
                    'min-h-11 rounded-full border px-3.5 py-2.5 text-xs font-medium transition-colors',
                    selected
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border bg-white text-muted hover:border-foreground/40',
                  )}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div data-form-field>
          <label htmlFor="contact-message" className="sr-only">
            Tell us about your project
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            placeholder="Tell us about your project"
            className="contact-input w-full resize-y rounded-lg border border-border bg-surface/30 px-4 py-3.5 text-sm outline-none transition-colors focus:border-foreground focus:bg-white"
          />
        </div>

        <p data-form-field className="text-xs text-muted">
          We usually respond within one business day.
        </p>

        <div data-form-field className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
          <button
            type="submit"
            className="btn-interact rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-neutral-800"
          >
            Send message
          </button>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-interact inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-foreground"
          >
            WhatsApp
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </form>
  );
}
