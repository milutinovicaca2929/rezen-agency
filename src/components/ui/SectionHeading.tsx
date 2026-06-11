import { cn } from '@/lib/utils';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  className?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, dark, className }: Props) {
  return (
    <div className={cn('max-w-2xl', className)}>
      {eyebrow && (
        <p className={cn('mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] sm:mb-3 sm:text-xs', dark ? 'text-neutral-400' : 'text-muted')}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn('text-2xl font-bold tracking-tight sm:text-3xl md:text-[2.35rem] md:leading-[1.12]', dark && 'text-white')}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-3 text-[15px] leading-relaxed sm:mt-4 sm:text-base md:text-lg', dark ? 'text-neutral-400' : 'text-muted')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
