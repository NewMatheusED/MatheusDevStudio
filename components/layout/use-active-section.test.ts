import { renderHook, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useActiveSection } from "./use-active-section";

type ObserverCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;

let observedCallback: ObserverCallback | null = null;

class MockIntersectionObserver {
  constructor(callback: ObserverCallback) {
    observedCallback = callback;
  }
  observe() {}
  disconnect() {}
}

beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  document.body.innerHTML = `<div id="sobre"></div><div id="projetos"></div>`;
});

afterEach(() => {
  vi.unstubAllGlobals();
  observedCallback = null;
});

describe("useActiveSection", () => {
  it("starts with the first section id", () => {
    const { result } = renderHook(() => useActiveSection(["sobre", "projetos"]));
    expect(result.current).toBe("sobre");
  });

  it("updates to the most-visible intersecting section", () => {
    const { result } = renderHook(() => useActiveSection(["sobre", "projetos"]));

    act(() => {
      observedCallback?.([
        { isIntersecting: true, intersectionRatio: 0.9, target: document.getElementById("projetos")! },
      ]);
    });

    expect(result.current).toBe("projetos");
  });
});
