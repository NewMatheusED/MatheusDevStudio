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
  it("starts with no active section: the page opens on the hero, which is none of them", () => {
    const { result } = renderHook(() => useActiveSection(["sobre", "projetos"]));
    expect(result.current).toBe("");
  });

  it("clears when the active section leaves the screen and no other took over", () => {
    const { result } = renderHook(() => useActiveSection(["sobre", "projetos"]));
    const target = document.getElementById("sobre")!;
    act(() => observedCallback?.([{ isIntersecting: true, intersectionRatio: 1, target }]));
    expect(result.current).toBe("sobre");
    act(() => observedCallback?.([{ isIntersecting: false, intersectionRatio: 0, target }]));
    expect(result.current).toBe("");
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
