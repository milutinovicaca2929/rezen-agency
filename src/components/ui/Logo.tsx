import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  href?: string;
};

/**
 * Black R mark only — brightness-0 forces silhouette to #000
 * even if cached/wrong PNG variant slips through.
 */
export function Logo({ className, href = '/' }: Props) {
  return (
    <Link
      href={href}
      className={cn('inline-flex items-center', className)}
      aria-label="Rezen Agency — Home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png?v=5"
        alt="Rezen"
        width={28}
        height={22}
        className="h-7 w-auto object-contain [filter:brightness(0)]"
        decoding="async"
      />
    </Link>
  );
}
