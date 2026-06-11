import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline-light';
  className?: string;
  external?: boolean;
};

export function Button({ href, children, variant = 'primary', className, external }: Props) {
  const styles = cn(
    'btn-interact inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold sm:px-6',
    variant === 'primary' && 'bg-foreground text-background hover:bg-neutral-800',
    variant === 'secondary' && 'border border-border bg-white text-foreground hover:border-foreground',
    variant === 'ghost' && 'text-foreground hover:bg-surface',
    variant === 'outline-light' &&
      'border border-white/35 bg-transparent text-white hover:border-white hover:bg-white/10',
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={styles}>
      {children}
    </Link>
  );
}
