"use client";

import { useEffect, useRef } from "react";
import { layers } from "@/content/layers";
import { goToStep, useSceneStep } from "./layers-scene";

const planeSelectors = [".l-ui .plane", ".l-api .plane", ".l-infra .plane"];

/**
 * Etiquetas ligadas por linha a cada camada, em volta da pilha. Ficam em 2D por cima
 * da cena e seguem a posição projetada de cada placa, lida a cada quadro (a pilha
 * flutua, abre com a rolagem e inclina com o mouse). Clicar leva à camada.
 */
export function LayerLabels() {
  const step = useSceneStep();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = ref.current;
    const stage = box?.parentElement;
    if (!box || !stage) return;
    const planes = planeSelectors.map((s) => stage.querySelector<HTMLElement>(s));
    let frame = 0;

    const place = () => {
      const origin = stage.getBoundingClientRect();
      planes.forEach((plane, i) => {
        const label = box.children[i] as HTMLElement | undefined;
        if (!plane || !label) return;
        const r = plane.getBoundingClientRect();
        // a do meio aponta pela esquerda, as outras pela direita: o canto visível de cada placa
        const left = i === 1;
        const x = (left ? r.left : r.right) - origin.left;
        const y = r.top + r.height * (left ? 0.58 : 0.42) - origin.top;
        label.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      });
      box.dataset.placed = "";
      frame = requestAnimationFrame(place);
    };

    place();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={ref} className="layer-labels" inert={step === 4}>
      {layers.map((layer, i) => (
        <button
          key={layer.id}
          type="button"
          className="layer-label"
          data-side={i === 1 ? "left" : "right"}
          aria-current={step === i + 1 ? "step" : undefined}
          onClick={() => goToStep((i + 1) as 1 | 2 | 3)}
        >
          <span>{layer.label}</span>
        </button>
      ))}
    </div>
  );
}
