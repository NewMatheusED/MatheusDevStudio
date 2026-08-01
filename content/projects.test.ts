import { describe, expect, it } from "vitest";
import { projects } from "./projects";

describe("projects", () => {
  it("has exactly 5 curated projects", () => {
    expect(projects).toHaveLength(5);
  });

  it("gives every project a unique slug, a live url, and at least one stack tag", () => {
    const slugs = new Set(projects.map((p) => p.slug));
    expect(slugs.size).toBe(projects.length);

    for (const project of projects) {
      expect(project.url.startsWith("https://")).toBe(true);
      expect(project.stack.length).toBeGreaterThan(0);
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.description.length).toBeGreaterThan(20);
    }
  });

  it("includes FonPack Embalagens with its own screenshot (not a reused image)", () => {
    const fonpack = projects.find((p) => p.slug === "fonpack-embalagens");
    const jnc = projects.find((p) => p.slug === "jnc-embalagens");
    expect(fonpack).toBeDefined();
    expect(fonpack?.image).not.toBe(jnc?.image);
  });
});
