"use client";

import { layers } from "@/content/layers";
import { goToStep, useSceneStep } from "./layers-scene";

/** Seletor Interface / API / Infraestrutura: mostra onde a pessoa está e leva direto à camada. */
export function LayerPager() {
  const step = useSceneStep();
  const visible = step >= 1 && step <= 3;

  return (
    <div className="pager" role="group" aria-label="Camadas" inert={!visible}>
      {layers.map((layer, i) => (
        <button
          key={layer.id}
          type="button"
          aria-current={step === i + 1 ? "step" : undefined}
          onClick={() => goToStep((i + 1) as 1 | 2 | 3)}
        >
          {layer.label}
        </button>
      ))}
    </div>
  );
}
