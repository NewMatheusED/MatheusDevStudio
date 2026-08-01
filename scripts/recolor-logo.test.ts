import path from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";

describe("recolored logo asset", () => {
  it("has a dominant opaque color matching the accent gold (#E8A650)", async () => {
    const filePath = path.resolve("public/img/logo-gold.png");
    const { data, info } = await sharp(filePath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const counts = new Map<string, number>();
    for (let i = 0; i < data.length; i += info.channels) {
      const alpha = data[i + 3];
      if (alpha < 200) continue;
      const key = `${data[i]},${data[i + 1]},${data[i + 2]}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    let dominant = "";
    let max = 0;
    for (const [key, count] of counts) {
      if (count > max) {
        max = count;
        dominant = key;
      }
    }

    const [r, g, b] = dominant.split(",").map(Number);
    expect(r).toBeGreaterThanOrEqual(224);
    expect(r).toBeLessThanOrEqual(240);
    expect(g).toBeGreaterThanOrEqual(158);
    expect(g).toBeLessThanOrEqual(174);
    expect(b).toBeGreaterThanOrEqual(72);
    expect(b).toBeLessThanOrEqual(88);
  });
});
