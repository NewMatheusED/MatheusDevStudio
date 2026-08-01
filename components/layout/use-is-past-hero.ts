"use client";

import { useEffect, useState } from "react";

export function useIsPastHero(heroId: string): boolean {
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const el = document.getElementById(heroId);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsPastHero(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [heroId]);

  return isPastHero;
}
