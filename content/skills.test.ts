import { describe, expect, it } from "vitest";
import { skillCategories } from "./skills";

describe("skillCategories", () => {
  it("groups every skill from the original site into exactly 3 categories", () => {
    expect(skillCategories).toHaveLength(3);
    const total = skillCategories.reduce((sum, c) => sum + c.skills.length, 0);
    expect(total).toBe(14);
  });

  it("has a non-empty category label for every group", () => {
    for (const category of skillCategories) {
      expect(category.category.length).toBeGreaterThan(0);
      expect(category.skills.length).toBeGreaterThan(0);
    }
  });
});
