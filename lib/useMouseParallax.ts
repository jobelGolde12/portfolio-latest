'use client';

import { useEffect, useState } from 'react';

export interface MouseParallaxOffset {
  x: number;
  y: number;
}

/**
 * Tracks the normalized pointer position within the viewport (-1..1 on each
 * axis) and throttles updates with requestAnimationFrame. Returns zeros when
 * `prefers-reduced-motion` is set. Multiply the result by the pixel distance
 * each parallax layer should travel.
 *
 * Replaces the duplicated mousemove logic that previously lived in Hero and
 * DarkBackground.
 */
export function useMouseParallax(): MouseParallaxOffset {
  const [offset, setOffset] = useState<MouseParallaxOffset>({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setOffset({
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        });
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return offset;
}
