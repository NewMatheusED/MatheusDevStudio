"use client";

import { useEffect, useState } from "react";

/** Id da seção no centro da tela, ou "" quando nenhuma está (abertura, outras páginas). */
export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActiveId((current) => {
          if (visible[0]) return (visible[0].target as HTMLElement).id;
          // a seção ativa saiu da tela e nenhuma outra entrou
          return entries.some((entry) => (entry.target as HTMLElement).id === current) ? "" : current;
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
