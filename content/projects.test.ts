import { describe, expect, it } from "vitest";
import { byKind, projects } from "./projects";

describe("projects", () => {
  it("features Beergam then FonPack", () => {
    expect(byKind("featured").map((p) => p.slug)).toEqual(["beergam", "fonpack"]);
  });

  it("lists three client works and two own projects", () => {
    expect(byKind("client").map((p) => p.slug)).toEqual(["rs-advogados", "jnc-embalagens", "curse-of-ioher"]);
    expect(byKind("own").map((p) => p.slug)).toEqual(["senate-tracker", "compilador-minic"]);
  });

  it("uses the law firm's new domain and drops the offline gym site", () => {
    expect(projects.find((p) => p.slug === "rs-advogados")?.url).toBe("https://sergioedugomes.com.br/");
    expect(projects.some((p) => p.url.includes("academiazerograu"))).toBe(false);
  });

  it("gives every project an https link, a link label and a stack", () => {
    for (const p of projects) {
      expect(p.url.startsWith("https://")).toBe(true);
      expect(p.linkLabel.length).toBeGreaterThan(0);
      expect(p.stack.length).toBeGreaterThan(0);
    }
  });

  it("keeps the Beergam case sober", () => {
    const b = projects.find((p) => p.slug === "beergam")!;
    expect(b.result).toBe("Hoje mais de 300 sellers usam o sistema.");
    expect(b.description + b.role).not.toMatch(/melhor|líder|revolucion|incrível/i);
  });
});
