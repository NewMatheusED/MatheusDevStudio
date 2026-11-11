import { describe, expect, it } from "vitest";
import { STEP_ANCHORS, sceneState, stackScale } from "./scene";

describe("sceneState", () => {
  it("starts slightly open at the top", () => {
    expect(sceneState(0)).toEqual({ open: 0.16, flat: 0, step: 0 });
  });

  it("clamps out-of-range progress", () => {
    expect(sceneState(-1)).toEqual(sceneState(0));
    expect(sceneState(2)).toEqual(sceneState(1));
  });

  it("walks through the layers in order", () => {
    expect([0.1, 0.27, 0.49, 0.71, 0.95].map((p) => sceneState(p).step)).toEqual([0, 1, 2, 3, 4]);
  });

  it("is fully open while a layer is in focus", () => {
    for (const p of STEP_ANCHORS) expect(sceneState(p)).toMatchObject({ open: 1, flat: 0 });
  });

  it("closes and flattens at the end", () => {
    expect(sceneState(1)).toMatchObject({ open: 0, flat: 1, step: 4 });
  });

  it("selector anchors land on steps 1, 2 and 3", () => {
    expect(STEP_ANCHORS.map((p) => sceneState(p).step)).toEqual([1, 2, 3]);
  });
});

describe("stackScale", () => {
  it("keeps the stack inside its column", () => {
    // a pilha projetada ocupa cerca de 560 px de largura em escala 1
    for (const w of [300, 420, 520, 780, 1100]) expect(stackScale(w, 1440) * 560).toBeLessThanOrEqual(w);
  });

  it("caps the scale on huge screens and uses viewport width on phones", () => {
    expect(stackScale(2000, 2560)).toBe(1.7);
    expect(stackScale(390, 390)).toBeCloseTo((390 * 0.5) / 430, 3);
  });

  it("stays small on tablets, where the stack sits above the text", () => {
    expect(stackScale(768, 768)).toBe(0.72);
    expect(stackScale(900, 900)).toBe(0.72);
  });
});
