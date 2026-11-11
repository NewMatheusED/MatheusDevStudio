"use client";

import { useState } from "react";
import type { Tech } from "@/content/layers";

/** Botões de tecnologia: ícone e nome; clicar mostra, em uma linha, para que aquilo serve. */
export function TechChips({ techs }: { techs: Tech[] }) {
  const [selected, setSelected] = useState(0);

  return (
    <>
      <div className="chips">
        {techs.map((tech, i) => (
          <button
            key={tech.name}
            type="button"
            className="chip"
            aria-pressed={i === selected}
            onClick={() => setSelected(i)}
          >
            {/* decorativo: se o ícone falhar, o nome continua ali */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/icons/tech/${tech.slug}.svg`} alt="" width={18} height={18} />
            {tech.name}
          </button>
        ))}
      </div>
      <p className="why" aria-live="polite">
        {techs[selected].why}
      </p>
    </>
  );
}
