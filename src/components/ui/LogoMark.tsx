import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

/** Transparent vector R mark — no background box */
export function LogoMark({ className }: Props) {
  return (
    <svg
      className={cn('block shrink-0 text-foreground', className)}
      viewBox="0 0 56 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M4 2h22.5c11.8 0 19.5 6.8 19.5 17.4S38.3 36.8 26.5 36.8H16.8V62H4V2zm12.2 10.4v14.4h10.3c5.2 0 8.5-2.8 8.5-7.2s-3.3-7.2-8.5-7.2H16.2z"
      />
      <path fill="currentColor" d="M27.2 37.2 4 62h11.4L38.6 37.2H27.2z" />
    </svg>
  );
}
