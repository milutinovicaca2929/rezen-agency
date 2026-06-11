'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { TestimonialCard } from '@/components/sections/TestimonialCard';
import { testimonials } from '@/lib/data';
import { cn } from '@/lib/utils';

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);

  const count = testimonials.length;

  const prev = useCallback(() => {
    setIndex((i) => (i <= 0 ? count - 1 : i - 1));
  }, [count]);

  const next = useCallback(() => {
    setIndex((i) => (i >= count - 1 ? 0 : i + 1));
  }, [count]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const timer = window.setInterval(next, 9000);
    return () => window.clearInterval(timer);
  }, [next]);

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    setDragOffset(0);
    setDragging(true);
    trackRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragOffset(e.clientX - startX.current);
  };

  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragOffset < -60) next();
    else if (dragOffset > 60) prev();
    setDragOffset(0);
  };

  return (
    <div className="relative mt-7 sm:mt-8">
      <div
        ref={trackRef}
        className="cursor-grab overflow-hidden active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: `translateX(calc(-${index * 100}% + ${dragging ? dragOffset : 0}px))`,
          }}
        >
          {testimonials.map((item, i) => (
            <div key={item.business} className="w-full shrink-0">
              <TestimonialCard item={item} active={i === index} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-1.5" role="tablist" aria-label="Testimonial slides">
        {testimonials.map((item, i) => (
          <button
            key={item.business}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Testimonial from ${item.business}`}
            onClick={() => setIndex(i)}
            className="flex h-11 w-11 items-center justify-center"
          >
            <span
              className={cn(
                'block h-1 rounded-full transition-all duration-500',
                i === index ? 'w-6 bg-foreground' : 'w-1.5 bg-border',
              )}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
