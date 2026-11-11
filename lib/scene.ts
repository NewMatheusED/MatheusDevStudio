/** 0 = abertura, 1..3 = camadas (interface, api, infra), 4 = fechamento */
export type SceneStep = 0 | 1 | 2 | 3 | 4;

export interface SceneState {
  /** 0..1: quanto as camadas estão afastadas */
  open: number;
  /** 0..1: quanto a pilha já virou uma tela de frente */
  flat: number;
  step: SceneStep;
}

/** progresso da rolagem para onde o seletor de camada leva (etapas 1, 2 e 3) */
export const STEP_ANCHORS = [0.27, 0.49, 0.71] as const;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (v: number) => 1 - Math.pow(1 - clamp(v), 3);
const round = (v: number) => Math.round(v * 1000) / 1000;

/** Traduz o progresso da rolagem na cena (0 no topo, 1 no fim) em estado visual. */
export function sceneState(progress: number): SceneState {
  const p = clamp(progress);
  const flat = ease((p - 0.82) / 0.14);
  const open = (0.16 + 0.84 * ease(p / 0.18)) * (1 - flat);
  const step: SceneStep = p < 0.16 ? 0 : p < 0.38 ? 1 : p < 0.6 ? 2 : p < 0.82 ? 3 : 4;
  return { open: round(open), flat: round(flat), step };
}

/**
 * Escala da pilha (base de 430px) para caber na coluna dela.
 * A pilha projetada ocupa cerca de 560px em escala 1; dividir por 760 deixa espaço
 * dos dois lados para as etiquetas das camadas.
 */
export function stackScale(stackWidth: number, viewportWidth: number): number {
  // abaixo de 1000px a pilha fica em cima do texto: segue a largura da tela, com teto
  if (viewportWidth < 1000) return Math.min(0.72, (viewportWidth * 0.6) / 430);
  return Math.min(1.7, stackWidth / 760);
}
