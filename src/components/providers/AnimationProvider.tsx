'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { refreshScrollTriggers } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const onLoad = () => refreshScrollTriggers();
    window.addEventListener('load', onLoad);

    const t = window.setTimeout(refreshScrollTriggers, 100);

    return () => {
      window.removeEventListener('load', onLoad);
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const t = window.setTimeout(refreshScrollTriggers, 50);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return children;
}
