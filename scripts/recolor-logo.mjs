import path from "node:path";
import sharp from "sharp";

const inputPath = path.resolve("public/img/Logo.png");
const outputPath = path.resolve("public/img/logo-gold.png");
const TARGET = [0xe8, 0xa6, 0x50]; // #E8A650

const { data, info } = await sharp(inputPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += info.channels) {
  data[i] = TARGET[0];
  data[i + 1] = TARGET[1];
  data[i + 2] = TARGET[2];
}

await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
  .png()
  .toFile(outputPath);

console.log(`Wrote recolored logo to ${outputPath}`);
