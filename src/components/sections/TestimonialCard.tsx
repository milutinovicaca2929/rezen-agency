import { testimonials } from '@/lib/data';
import { cn } from '@/lib/utils';

type Testimonial = (typeof testimonials)[number];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 text-foreground"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialCard({ item, active }: { item: Testimonial; active?: boolean }) {
  return (
    <blockquote
      className={cn(
        'flex h-full min-h-[300px] flex-col rounded-xl border bg-white px-6 py-7 transition-all duration-500 sm:min-h-[320px] sm:px-8 sm:py-9',
        active ? 'border-foreground/15' : 'border-border',
      )}
    >
      {item.rating && (
        <div className="mb-5 sm:mb-6">
          <Stars count={item.rating} />
        </div>
      )}
      <p className="flex-1 text-[1.05rem] leading-[1.55] text-foreground sm:text-xl sm:leading-[1.5]">
        &ldquo;{item.quote}&rdquo;
      </p>
      <footer className="mt-8 border-t border-border pt-5 sm:mt-10">
        <p className="text-sm font-semibold text-foreground">{item.name}</p>
        <p className="mt-1 text-sm text-muted">{item.business}</p>
        <p className="mt-2 text-xs tracking-wide text-muted/80">
          {item.businessType} · {item.location}
        </p>
      </footer>
    </blockquote>
  );
}
