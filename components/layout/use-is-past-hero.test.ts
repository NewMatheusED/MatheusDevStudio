import { renderHook, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useIsPastHero } from "./use-is-past-hero";

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
  document.body.innerHTML = `<div id="hero"></div>`;
});

afterEach(() => {
  vi.unstubAllGlobals();
  observedCallback = null;
});

describe("useIsPastHero", () => {
  it("is false while the hero is intersecting", () => {
    const { result } = renderHook(() => useIsPastHero("hero"));
    expect(result.current).toBe(false);
  });

  it("becomes true once the hero stops intersecting", () => {
    const { result } = renderHook(() => useIsPastHero("hero"));

    act(() => {
      observedCallback?.([{ isIntersecting: false }]);
    });

    expect(result.current).toBe(true);
  });
});
