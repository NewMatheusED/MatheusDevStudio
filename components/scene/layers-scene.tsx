"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { STEP_ANCHORS, sceneState, stackScale, type SceneStep } from "@/lib/scene";

const SCENE_ID = "cena";
const StepContext = createContext<SceneStep>(0);

/** Etapa atual da cena: 0 abertura, 1..3 camadas, 4 fechamento. */
export const useSceneStep = () => useContext(StepContext);

/** Só para testes e para quem precisa fixar uma etapa fora da cena. */
export const SceneStepProvider = StepContext.Provider;

/** Rola a página até a camada pedida (1 interface, 2 api, 3 infra). */
export function goToStep(step: 1 | 2 | 3) {
  const scene = document.getElementById(SCENE_ID);
  if (!scene) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top: scene.offsetTop + (scene.offsetHeight - window.innerHeight) * STEP_ANCHORS[step - 1],
    behavior: reduce ? "auto" : "smooth",
  });
}

/**
 * Área alta com conteúdo fixo na tela. A rolagem vira estado (lib/scene) e o estado
 * é publicado como variáveis CSS e data-step; toda a aparência fica em app/scene.css.
 */
export function LayersScene({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<SceneStep>(0);

  useEffect(() => {
    const scene = ref.current;
    if (!scene) return;
    const stack = scene.querySelector<HTMLElement>(".stack");

    const update = () => {
      const rect = scene.getBoundingClientRect();
      const state = sceneState(-rect.top / (rect.height - window.innerHeight));
      // variáveis vão direto no elemento: nada de render do React a cada quadro
      scene.style.setProperty("--open", String(state.open));
      scene.style.setProperty("--flat", String(state.flat));
      scene.style.setProperty("--s", stackScale(stack?.clientWidth ?? 0, window.innerWidth).toFixed(3));
      setStep(state.step);
    };

    const onPointer = (e: PointerEvent) => {
      scene.style.setProperty("--tx", `${((e.clientX / window.innerWidth - 0.5) * 10).toFixed(2)}deg`);
      scene.style.setProperty("--ty", `${((0.5 - e.clientY / window.innerHeight) * 8).toFixed(2)}deg`);
      scene.style.setProperty("--mx", `${e.clientX}px`);
      scene.style.setProperty("--my", `${e.clientY}px`);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine) window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (fine) window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <StepContext.Provider value={step}>
      <div id={SCENE_ID} ref={ref} className="scene" data-step={step}>
        <div className="scene-sticky">
          <div className="scene-stage">{children}</div>
        </div>
      </div>
    </StepContext.Provider>
  );
}
