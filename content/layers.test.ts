import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { layers } from "./layers";

describe("layers", () => {
  it("has the three layers in order", () => {
    expect(layers.map((l) => l.id)).toEqual(["interface", "api", "infra"]);
    expect(layers.map((l) => l.label)).toEqual(["Interface", "API", "Infraestrutura"]);
  });

  it("lists 12, 12 and 11 technologies", () => {
    expect(layers.map((l) => l.techs.length)).toEqual([12, 12, 11]);
  });

  it("explains every technology in plain language and has its icon on disk", () => {
    for (const tech of layers.flatMap((l) => l.techs)) {
      expect(tech.why.length).toBeGreaterThan(15);
      expect(existsSync(`public/icons/tech/${tech.slug}.svg`), tech.slug).toBe(true);
    }
  });

  it("never names a technology in a layer's main sentence", () => {
    for (const layer of layers) for (const tech of layer.techs) expect(layer.body).not.toContain(tech.name);
  });
});
