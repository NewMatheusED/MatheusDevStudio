# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the static jQuery/AOS portfolio at the repo root as a single-page Next.js 15 + Tailwind v4 + shadcn/ui + Motion site with a dark amber-on-navy identity, dev+design mixed typography, and full SEO plumbing, replacing all legacy HTML/CSS/JS.

**Architecture:** Next.js App Router single route (`/`) composing section components (Hero, About, Projects, Skills, Contact) inside a shared layout with a nav that morphs from a top bar into a fixed sidebar once the hero scrolls out of view. Content (projects, skills) lives in typed data modules under `content/`. Contact form posts to the existing Formspree endpoint via a TanStack Query mutation. A one-off Node script recolors the existing raster logo to the new accent color; the output is committed as a static asset, not generated at runtime.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, shadcn/ui (Radix primitives), @tanstack/react-query, motion (motion.dev), react-hook-form + zod, lucide-react, Vitest + Testing Library, sharp (dev-only, for the logo script).

## Global Constraints

- Palette (defined once as CSS variables, no light/dark toggle — this is a single fixed dark theme): `background #010314`, `card/surface #0D0B1A`, `border #221D33`, `accent/primary #E8A650`, `foreground #F5EFE6`, `muted-foreground #9B96A8`.
- Fonts: `Fraunces` (display/headings, `font-display` utility), `Fira Code` (technical labels/tags/nav, overrides Tailwind's `font-mono`), `Inter` (body copy, overrides Tailwind's `font-sans`). Loaded via `next/font/google`, never a runtime `<link>` tag.
- The site owner is a **fullstack** developer — never frame copy as frontend-only.
- Brand is **MatheusDevStudio** with a real logomark (recolored `public/img/logo-gold.png`), not just the first name as text.
- Motion must stay subtle: fade+slide reveals (~12-16px, ~0.4s), no parallax, no animated gradients, no 3D tilts.
- Contact form keeps the existing Formspree endpoint (`https://formspree.io/f/mpzvkdqa`) — no new backend/email service.
- All copy is in Portuguese (pt-BR), rewritten for concision (not a verbatim copy of the old site's paragraphs).
- Config/scaffolding tasks (no pure logic to unit-test) are verified by `npm run build` succeeding, not by contrived unit tests. Tasks with real logic (data modules, schema, hooks, the logo script) get real Vitest tests written before the implementation, per TDD. Purely presentational/motion components are verified manually in the final task via the browser, not unit-tested — say so rather than faking coverage.
- Spec: `docs/superpowers/specs/2026-08-01-portfolio-redesign-design.md`.

---

### Task 1: Project scaffold (Next.js + TypeScript + Tailwind v4 + Vitest)

**Files:**
- Delete: `package-lock.json` (old jQuery/AOS/particles.js lockfile)
- Modify: `package.json` (replace entirely)
- Create: `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `next-env.d.ts` (auto-generated on first build, do not hand-write)
- Create: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Modify: `.gitignore` (add Next.js/node entries)

**Interfaces:**
- Produces: a working `npm run dev` / `npm run build` / `npm run test` toolchain that every later task builds on.

- [ ] **Step 1: Remove the legacy lockfile and rewrite package.json**

```bash
rm -f package-lock.json
```

Replace `package.json` with:

```json
{
  "name": "matheusdevstudio",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 2: Install runtime and dev dependencies**

```bash
npm install next@latest react@latest react-dom@latest
npm install -D typescript@latest @types/node@latest @types/react@latest @types/react-dom@latest tailwindcss@latest @tailwindcss/postcss@latest eslint@latest eslint-config-next@latest
npm install -D vitest@latest @vitejs/plugin-react@latest jsdom@latest @testing-library/react@latest @testing-library/jest-dom@latest
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

- [ ] **Step 5: Create `postcss.config.mjs`**

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

- [ ] **Step 6: Create a minimal `app/globals.css`**

```css
@import "tailwindcss";

body {
  background: #010314;
  color: #f5efe6;
}
```

- [ ] **Step 7: Create a minimal `app/layout.tsx`**

```tsx
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: Create a minimal `app/page.tsx`**

```tsx
export default function Home() {
  return <main>MatheusDevStudio</main>;
}
```

- [ ] **Step 9: Create `vitest.config.ts`**

```ts
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": dirname,
    },
  },
});
```

- [ ] **Step 10: Create `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 11: Update `.gitignore`**

Add these lines to the existing `.gitignore` (which already has `.superpowers/`):

```
node_modules/
.next/
next-env.d.ts
```

- [ ] **Step 12: Verify the toolchain**

Run: `npm run build`
Expected: build completes successfully (Next.js generates `.next/` with the placeholder page, no type errors).

- [ ] **Step 13: Commit**

```bash
git add package.json .gitignore tsconfig.json next.config.ts postcss.config.mjs app/globals.css app/layout.tsx app/page.tsx vitest.config.ts vitest.setup.ts
git rm --cached package-lock.json 2>/dev/null
git add package-lock.json
git commit -m "chore: scaffold Next.js 15 + Tailwind v4 + Vitest toolchain"
```

---

### Task 2: shadcn/ui setup

**Files:**
- Create: `components.json`
- Create: `lib/utils.ts` (generated by shadcn CLI)
- Create: `components/ui/button.tsx`, `components/ui/badge.tsx`, `components/ui/card.tsx`, `components/ui/sheet.tsx`, `components/ui/form.tsx`, `components/ui/input.tsx`, `components/ui/textarea.tsx`, `components/ui/separator.tsx` (all generated by shadcn CLI)
- Modify: `app/globals.css` (shadcn init appends its default token block — left as-is here, replaced fully in Task 3)
- Modify: `package.json` (new deps added by the CLI: radix primitives, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `react-hook-form`, `@hookform/resolvers`, `zod`)

**Interfaces:**
- Produces: `cn()` helper from `@/lib/utils`, and every shadcn component under `@/components/ui/*` used by later section/layout tasks.

- [ ] **Step 1: Run shadcn init non-interactively**

```bash
npx shadcn@latest init -y -b neutral
```

This creates `components.json`, `lib/utils.ts`, and appends shadcn's default theme block to `app/globals.css`.

- [ ] **Step 2: Add the components this site needs**

```bash
npx shadcn@latest add button badge card sheet form input textarea separator -y
```

- [ ] **Step 3: Add the remaining form/data dependencies shadcn's `form` component needs**

```bash
npm install zod@latest react-hook-form@latest @hookform/resolvers@latest
```

(shadcn's `add form` step above may already add these — confirm with `npm ls zod react-hook-form @hookform/resolvers` and only install what's missing.)

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: build succeeds; no missing-module errors for any `components/ui/*` file.

- [ ] **Step 5: Commit**

```bash
git add components.json lib/utils.ts components/ui package.json package-lock.json app/globals.css
git commit -m "chore: add shadcn/ui components"
```

---

### Task 3: Design tokens and fonts

**Files:**
- Modify: `app/globals.css` (replace the `:root` token block generated by shadcn with the site's palette; drop the `.dark` block and `@custom-variant dark` line — this site has one fixed dark theme)
- Create: `lib/fonts.ts`
- Modify: `app/layout.tsx` (apply font CSS variables to `<html>`)

**Interfaces:**
- Produces: `fontVariables` (string) from `@/lib/fonts`, plus Tailwind utilities `bg-background`, `text-foreground`, `bg-card`, `border-border`, `bg-primary`/`text-primary-foreground`, `text-muted-foreground`, `font-display` (Fraunces), `font-mono` (Fira Code), `font-sans` (Inter) available to every component from here on.

- [ ] **Step 1: Replace the token block in `app/globals.css`**

Open `app/globals.css`. Replace the entire `:root { ... }` block (and delete any `.dark { ... }` block and `@custom-variant dark ...` line that shadcn generated) with:

```css
:root {
  --radius: 0.5rem;
  --background: #010314;
  --foreground: #f5efe6;
  --card: #0d0b1a;
  --card-foreground: #f5efe6;
  --popover: #0d0b1a;
  --popover-foreground: #f5efe6;
  --primary: #e8a650;
  --primary-foreground: #010314;
  --secondary: #0d0b1a;
  --secondary-foreground: #f5efe6;
  --muted: #0d0b1a;
  --muted-foreground: #9b96a8;
  --accent: #e8a650;
  --accent-foreground: #010314;
  --destructive: #e5484d;
  --border: #221d33;
  --input: #221d33;
  --ring: #e8a650;
}
```

Keep the `@theme inline { ... }` block shadcn generated (it maps `--color-background: var(--background)` etc. onto Tailwind utilities), but add these lines inside it, right after the existing `--color-*` lines:

```css
  --font-sans: var(--font-inter);
  --font-mono: var(--font-fira-code);
  --font-display: var(--font-fraunces);
```

Below the `@theme inline` block, keep (or add) this base rule:

```css
body {
  background: var(--background);
  color: var(--foreground);
}
```

- [ ] **Step 2: Create `lib/fonts.ts`**

```ts
import { Fira_Code, Fraunces, Inter } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  weight: ["400", "500"],
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
  display: "swap",
});

export const fontVariables = `${fraunces.variable} ${firaCode.variable} ${inter.variable}`;
```

- [ ] **Step 3: Apply the font variables in `app/layout.tsx`**

```tsx
import "./globals.css";
import { fontVariables } from "@/lib/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: build succeeds. Run `npm run dev`, open `http://localhost:3000`, confirm the page background is dark navy and text is off-white (font swap to Inter is visible even on the placeholder page).

- [ ] **Step 5: Commit**

```bash
git add app/globals.css lib/fonts.ts app/layout.tsx
git commit -m "feat: apply dark palette and Fraunces/Fira Code/Inter fonts"
```

---

### Task 4: Recolor the logo asset

**Files:**
- Create: `scripts/recolor-logo.mjs`
- Create: `scripts/recolor-logo.test.ts`
- Create (generated by script, then committed): `public/img/logo-gold.png`
- Modify: `package.json` (add `sharp` as a dev dependency)

**Interfaces:**
- Produces: `public/img/logo-gold.png`, a copy of the existing `public/img/Logo.png` monogram recolored so its opaque strokes are `#E8A650`. Consumed by the `Logo` component in Task 9.

- [ ] **Step 1: Install sharp**

```bash
npm install -D sharp@latest
```

- [ ] **Step 2: Write the recolor script**

Create `scripts/recolor-logo.mjs`:

```js
import path from "node:path";
import sharp from "sharp";

const inputPath = path.resolve("public/img/Logo.png");
const outputPath = path.resolve("public/img/logo-gold.png");

await sharp(inputPath).tint("#E8A650").toFile(outputPath);

console.log(`Wrote recolored logo to ${outputPath}`);
```

- [ ] **Step 3: Write the failing test**

Create `scripts/recolor-logo.test.ts`:

```ts
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
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `npx vitest run scripts/recolor-logo.test.ts`
Expected: FAIL with an `ENOENT` error, because `public/img/logo-gold.png` does not exist yet.

- [ ] **Step 5: Run the script to generate the asset**

```bash
node scripts/recolor-logo.mjs
```

Expected output: `Wrote recolored logo to .../public/img/logo-gold.png`

- [ ] **Step 6: Run the test to verify it passes**

Run: `npx vitest run scripts/recolor-logo.test.ts`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add scripts/recolor-logo.mjs scripts/recolor-logo.test.ts public/img/logo-gold.png package.json package-lock.json
git commit -m "feat: recolor brand logo to the new accent gold"
```

---

### Task 5: Content data (projects and skills)

**Files:**
- Create: `content/projects.ts`
- Create: `content/projects.test.ts`
- Create: `content/skills.ts`
- Create: `content/skills.test.ts`
- Note: `public/img/fonpack.jpg` (a real screenshot of https://fonpackembalagens.com.br/, already captured and saved to this path) is consumed here.

**Interfaces:**
- Produces: `Project` type and `projects: Project[]` from `@/content/projects`; `SkillCategory` type and `skillCategories: SkillCategory[]` from `@/content/skills`. Consumed by `ProjectsSection`/`ProjectCard` (Task 14) and `SkillsSection` (Task 15).

- [ ] **Step 1: Write the failing tests**

Create `content/projects.test.ts`:

```ts
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
```

Create `content/skills.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run content/`
Expected: FAIL with "Cannot find module './projects'" / "./skills"

- [ ] **Step 3: Create `content/projects.ts`**

```ts
export interface Project {
  slug: string;
  title: string;
  description: string;
  url: string;
  image: string;
  stack: string[];
}

export const projects: Project[] = [
  {
    slug: "academia-zero-grau",
    title: "Academia Zero Grau",
    description:
      "Site institucional completo para uma academia, pensado para transmitir a energia da marca com responsividade total em qualquer dispositivo.",
    url: "https://academiazerograu.com.br/",
    image: "/img/acad.PNG",
    stack: ["HTML5", "CSS3", "JavaScript"],
  },
  {
    slug: "curse-of-ioher",
    title: "Curse Of Ioher",
    description:
      "Projeto com foco em acessibilidade web: modo de alto contraste, ajuste de tamanho de fonte e suporte a Libras para a comunidade surda.",
    url: "https://curse-of-ioher.vercel.app/",
    image: "/img/ioher.png",
    stack: ["HTML5", "CSS3", "JavaScript", "Acessibilidade"],
  },
  {
    slug: "jnc-embalagens",
    title: "JNC Embalagens",
    description:
      "Site institucional para fabricante de embalagens, com galeria de produtos interativa e identidade visual desenvolvida sob medida.",
    url: "https://jncembalagens.com.br/",
    image: "/img/jnc.png",
    stack: ["HTML5", "CSS3", "JavaScript"],
  },
  {
    slug: "fonpack-embalagens",
    title: "FonPack Embalagens",
    description:
      "Presença digital para empresa de embalagens sob medida, com apresentação clara dos serviços de personalização para clientes B2B.",
    url: "https://fonpackembalagens.com.br/",
    image: "/img/fonpack.jpg",
    stack: ["HTML5", "CSS3", "JavaScript"],
  },
  {
    slug: "rs-advogados",
    title: "RS Advogados Associados",
    description:
      "Aplicação full-stack em PHP e MySQL com painel administrativo, gerenciador de comentários e proteção contra SQL Injection.",
    url: "https://sergioedugomes.adv.br/",
    image: "/img/RS.png",
    stack: ["PHP", "MySQL"],
  },
];
```

- [ ] **Step 4: Create `content/skills.ts`**

```ts
export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Vue.js", "Sass", "Bootstrap", "jQuery"],
  },
  {
    category: "Backend",
    skills: ["PHP", "MySQL", "Python"],
  },
  {
    category: "Ferramentas",
    skills: ["Git", "GitHub", "NPM"],
  },
];
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npx vitest run content/`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add content/projects.ts content/projects.test.ts content/skills.ts content/skills.test.ts public/img/fonpack.jpg
git commit -m "feat: add curated projects and categorized skills content"
```

---

### Task 6: Contact form schema and submission

**Files:**
- Create: `lib/contact-schema.ts`
- Create: `lib/contact-schema.test.ts`
- Create: `lib/submit-contact.ts`
- Create: `lib/submit-contact.test.ts`

**Interfaces:**
- Produces: `contactSchema` (zod object) and `ContactFormValues` type from `@/lib/contact-schema`; `submitContactForm(values: ContactFormValues): Promise<void>` from `@/lib/submit-contact` (throws `Error` on a non-ok response). Consumed by `ContactSection` in Task 16.

- [ ] **Step 1: Write the failing schema test**

Create `lib/contact-schema.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact-schema";

describe("contactSchema", () => {
  it("accepts a valid submission", () => {
    const result = contactSchema.safeParse({
      name: "Ana Souza",
      email: "ana@example.com",
      message: "Gostaria de orçar um site institucional.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a short name, an invalid email, and a short message", () => {
    const result = contactSchema.safeParse({
      name: "A",
      email: "not-an-email",
      message: "oi",
    });
    expect(result.success).toBe(false);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run lib/contact-schema.test.ts`
Expected: FAIL with "Cannot find module './contact-schema'"

- [ ] **Step 3: Implement `lib/contact-schema.ts`**

```ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Digite seu nome completo."),
  email: z.string().email("Digite um e-mail válido."),
  message: z.string().min(10, "Escreva uma mensagem com pelo menos 10 caracteres."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run lib/contact-schema.test.ts`
Expected: PASS

- [ ] **Step 5: Write the failing submission test**

Create `lib/submit-contact.test.ts`:

```ts
import { afterEach, describe, expect, it, vi } from "vitest";
import { submitContactForm } from "./submit-contact";

describe("submitContactForm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts JSON to the Formspree endpoint with the expected headers", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await submitContactForm({
      name: "Ana Souza",
      email: "ana@example.com",
      message: "Gostaria de orçar um site institucional.",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://formspree.io/f/mpzvkdqa",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: "Ana Souza",
          email: "ana@example.com",
          message: "Gostaria de orçar um site institucional.",
        }),
      }),
    );
  });

  it("throws when Formspree responds with a non-ok status", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    await expect(
      submitContactForm({ name: "Ana", email: "ana@example.com", message: "mensagem de teste aqui" }),
    ).rejects.toThrow();
  });
});
```

- [ ] **Step 6: Run it to verify it fails**

Run: `npx vitest run lib/submit-contact.test.ts`
Expected: FAIL with "Cannot find module './submit-contact'"

- [ ] **Step 7: Implement `lib/submit-contact.ts`**

```ts
import type { ContactFormValues } from "./contact-schema";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mpzvkdqa";

export async function submitContactForm(values: ContactFormValues): Promise<void> {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Não foi possível enviar sua mensagem. Tente novamente.");
  }
}
```

- [ ] **Step 8: Run it to verify it passes**

Run: `npx vitest run lib/submit-contact.test.ts`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add lib/contact-schema.ts lib/contact-schema.test.ts lib/submit-contact.ts lib/submit-contact.test.ts
git commit -m "feat: add contact form schema and Formspree submission"
```

---

### Task 7: Scroll-tracking hooks

**Files:**
- Create: `components/layout/use-active-section.ts`
- Create: `components/layout/use-active-section.test.ts`
- Create: `components/layout/use-is-past-hero.ts`
- Create: `components/layout/use-is-past-hero.test.ts`

**Interfaces:**
- Produces: `useActiveSection(sectionIds: string[]): string` and `useIsPastHero(heroId: string): boolean`, both from `@/components/layout/*`. Consumed by `SiteNav` in Task 11.

- [ ] **Step 1: Write the failing test for `useActiveSection`**

Create `components/layout/use-active-section.test.ts`:

```ts
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run components/layout/use-active-section.test.ts`
Expected: FAIL with "Cannot find module './use-active-section'"

- [ ] **Step 3: Implement `components/layout/use-active-section.ts`**

```ts
"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId((visible[0].target as HTMLElement).id);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run components/layout/use-active-section.test.ts`
Expected: PASS

- [ ] **Step 5: Write the failing test for `useIsPastHero`**

Create `components/layout/use-is-past-hero.test.ts`:

```ts
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
```

- [ ] **Step 6: Run it to verify it fails**

Run: `npx vitest run components/layout/use-is-past-hero.test.ts`
Expected: FAIL with "Cannot find module './use-is-past-hero'"

- [ ] **Step 7: Implement `components/layout/use-is-past-hero.ts`**

```ts
"use client";

import { useEffect, useState } from "react";

export function useIsPastHero(heroId: string): boolean {
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const el = document.getElementById(heroId);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsPastHero(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [heroId]);

  return isPastHero;
}
```

- [ ] **Step 8: Run it to verify it passes**

Run: `npx vitest run components/layout/use-is-past-hero.test.ts`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add components/layout/use-active-section.ts components/layout/use-active-section.test.ts components/layout/use-is-past-hero.ts components/layout/use-is-past-hero.test.ts
git commit -m "feat: add scroll-spy hooks for nav highlighting and hero tracking"
```

---

### Task 8: Scroll-reveal motion component

**Files:**
- Create: `components/motion/reveal.tsx`
- Modify: `package.json` (add `motion`)

**Interfaces:**
- Produces: `<Reveal delay?={number} className?={string}>{children}</Reveal>` from `@/components/motion/reveal`. Consumed by every section component from Task 12 onward.
- Note: this is a thin wrapper around a third-party animation library with no branching logic of its own — verified visually in Task 20, not unit-tested (a unit test here would just assert JSX structure, which doesn't catch real regressions).

- [ ] **Step 1: Install motion**

```bash
npm install motion@latest
```

- [ ] **Step 2: Implement `components/motion/reveal.tsx`**

```tsx
"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: build succeeds with no type errors.

- [ ] **Step 4: Commit**

```bash
git add components/motion/reveal.tsx package.json package-lock.json
git commit -m "feat: add Reveal scroll-in-view motion wrapper"
```

---

### Task 9: Logo component and site footer

**Files:**
- Create: `components/logo.tsx`
- Create: `components/layout/site-footer.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/utils` (Task 2); `public/img/logo-gold.png` (Task 4).
- Produces: `<Logo className?={string} showWordmark?={boolean} />` from `@/components/logo`; `<SiteFooter />` from `@/components/layout/site-footer`. Consumed by `SiteNav` (Task 11) and `app/page.tsx` (Task 17).

- [ ] **Step 1: Implement `components/logo.tsx`**

```tsx
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image src="/img/logo-gold.png" alt="MatheusDevStudio" width={28} height={28} />
      {showWordmark && (
        <span className="font-display text-base font-semibold text-foreground">
          MatheusDevStudio
        </span>
      )}
    </span>
  );
}
```

- [ ] **Step 2: Implement `components/layout/site-footer.tsx`**

```tsx
import { Github, Linkedin } from "lucide-react";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <Logo />
        <Separator className="bg-border" />
        <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
            <span>matheus081105@gmail.com</span>
            <span>(11) 98564-8888</span>
            <a href="/politica-de-privacidade" className="hover:text-accent">
              Política de privacidade
            </a>
          </div>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/matheus-eduardo-mendonça-gomes-4aaa57270"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-accent"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/NewMatheusED"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-accent"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add components/logo.tsx components/layout/site-footer.tsx
git commit -m "feat: add Logo and SiteFooter components"
```

---

### Task 10: Nav links data and mobile menu

**Files:**
- Create: `components/layout/nav-links.ts`
- Create: `components/layout/mobile-menu.tsx`

**Interfaces:**
- Produces: `navLinks: { id: string; label: string; href: string }[]` from `@/components/layout/nav-links`; `<MobileMenu activeId={string} />` from `@/components/layout/mobile-menu`. Consumed by `SiteNav` in Task 11.

- [ ] **Step 1: Implement `components/layout/nav-links.ts`**

```ts
export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { id: "sobre", label: "Sobre", href: "#sobre" },
  { id: "projetos", label: "Projetos", href: "#projetos" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "contato", label: "Contato", href: "#contato" },
];
```

- [ ] **Step 2: Implement `components/layout/mobile-menu.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navLinks } from "./nav-links";

interface MobileMenuProps {
  activeId: string;
}

export function MobileMenu({ activeId }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Abrir menu" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-background border-border">
        <nav className="mt-10 flex flex-col gap-6 font-mono text-sm">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-muted-foreground transition-colors hover:text-accent",
                activeId === link.id && "text-accent",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add components/layout/nav-links.ts components/layout/mobile-menu.tsx
git commit -m "feat: add nav links data and mobile Sheet menu"
```

---

### Task 11: Site navigation (top bar ⇄ fixed sidebar)

**Files:**
- Create: `components/layout/site-nav.tsx`

**Interfaces:**
- Consumes: `useActiveSection`, `useIsPastHero` (Task 7); `navLinks` (Task 10); `Logo` (Task 9); `MobileMenu` (Task 10).
- Produces: `<SiteNav />` from `@/components/layout/site-nav`, no props. Consumed by `app/page.tsx` in Task 17.

- [ ] **Step 1: Implement `components/layout/site-nav.tsx`**

```tsx
"use client";

import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { navLinks } from "./nav-links";
import { MobileMenu } from "./mobile-menu";
import { useActiveSection } from "./use-active-section";
import { useIsPastHero } from "./use-is-past-hero";

const sectionIds = navLinks.map((link) => link.id);

export function SiteNav() {
  const activeId = useActiveSection(sectionIds);
  const isPastHero = useIsPastHero("hero");

  return (
    <>
      {/* Mobile: always a horizontal bar with a Sheet menu, regardless of scroll */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-border bg-background/90 px-6 py-4 backdrop-blur md:hidden">
        <Logo />
        <MobileMenu activeId={activeId} />
      </header>

      {/* Desktop: top bar before the hero, fixed sidebar after */}
      <div className="hidden md:block">
        <AnimatePresence mode="wait">
          {!isPastHero ? (
            <motion.header
              key="top-bar"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-border bg-background/90 px-10 py-5 backdrop-blur"
            >
              <Logo />
              <nav className="flex gap-8 font-mono text-xs text-muted-foreground">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className={cn("transition-colors hover:text-accent", activeId === link.id && "text-accent")}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.header>
          ) : (
            <motion.aside
              key="sidebar"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col justify-between border-r border-border bg-background px-6 py-10"
            >
              <Logo showWordmark={false} />
              <nav className="flex flex-col gap-4 font-mono text-xs text-muted-foreground">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className={cn("flex items-center gap-2 transition-colors hover:text-accent", activeId === link.id && "text-accent")}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full bg-current")} />
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/layout/site-nav.tsx
git commit -m "feat: add SiteNav that morphs from top bar to fixed sidebar past the hero"
```

---

### Task 12: Hero section

**Files:**
- Create: `components/sections/hero-section.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 8), `Button` (Task 2).
- Produces: `<HeroSection />` from `@/components/sections/hero-section`, `id="hero"` root element (required by `useIsPastHero("hero")` in Task 11).
- Note: unlike the sections in Tasks 13-16, the hero does **not** get `md:pl-64` — while the hero is in view, `SiteNav` (Task 11) shows the full-width top bar, not the sidebar, so no left gutter is needed yet.

- [ ] **Step 1: Implement `components/sections/hero-section.tsx`**

```tsx
import Image from "next/image";
import { Download, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function HeroSection() {
  return (
    <section id="hero" className="flex min-h-screen items-center px-6 pt-24 md:pt-0">
      <div className="mx-auto grid w-full max-w-5xl gap-10 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] text-accent">&lt;DEV FULLSTACK /&gt;</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            Interfaces que <em className="text-accent not-italic font-normal italic">encantam</em>. Sistemas que
            funcionam.
          </h1>
          <p className="mt-4 max-w-md text-sm text-muted-foreground md:text-base">
            Transformo ideias em produtos digitais completos — do design de interface à API que sustenta tudo por
            trás.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <a href="#projetos">Ver projetos</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:matheus081105@gmail.com">
                <Mail className="mr-2" size={16} /> E-mail
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://www.linkedin.com/in/matheus-eduardo-mendonça-gomes-4aaa57270"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="mr-2" size={16} /> LinkedIn
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/img/CV.pdf" download>
                <Download className="mr-2" size={16} /> Baixar CV
              </a>
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-lg border border-accent/40">
            <Image src="/img/perfil3.jpg" alt="Matheus Eduardo" fill className="object-cover" priority />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/sections/hero-section.tsx
git commit -m "feat: add asymmetric hero section with portrait"
```

---

### Task 13: About section

**Files:**
- Create: `components/sections/about-section.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 8).
- Produces: `<AboutSection />` from `@/components/sections/about-section`, `id="sobre"`.

- [ ] **Step 1: Implement `components/sections/about-section.tsx`**

```tsx
import { Reveal } from "@/components/motion/reveal";

export function AboutSection() {
  return (
    <section id="sobre" className="px-6 py-24 md:pl-64">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-foreground">Sobre</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            <p>
              Sou desenvolvedor fullstack com mais de 3 anos de experiência, apaixonado por tecnologia desde os 14
              anos. Minha formação técnica em multimídia e a graduação em andamento em Ciências da Computação me
              deram uma base flexível para transitar entre design de interface e arquitetura de sistemas.
            </p>
            <p>
              Atuo com desenvolvimento ABAP e Fiori — relatórios, módulos de função e aplicativos SAPUI5
              responsivos — além de integração de sistemas via REST, OData e SAP Gateway. Do front-end à API, gosto
              de entender o problema por inteiro antes de escrever a primeira linha de código.
            </p>
            <p>
              <a
                href="https://youtu.be/oW6opek-WDE?si=alNGk8WV1mEqMDgM"
                target="_blank"
                rel="noreferrer"
                className="text-accent underline underline-offset-4 hover:text-foreground"
              >
                Prefere ver e ouvir? Assista ao meu vídeo de apresentação.
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/sections/about-section.tsx
git commit -m "feat: add About section with rewritten copy"
```

---

### Task 14: Project card and projects section

**Files:**
- Create: `components/sections/project-card.tsx`
- Create: `components/sections/projects-section.tsx`

**Interfaces:**
- Consumes: `Project` type + `projects` (Task 5); `Reveal` (Task 8); `Card`, `Badge` (Task 2).
- Produces: `<ProjectCard project={Project} delay?={number} />` and `<ProjectsSection />`, both from `@/components/sections/*`. `id="projetos"` on the section.

- [ ] **Step 1: Implement `components/sections/project-card.tsx`**

```tsx
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import type { Project } from "@/content/projects";

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

export function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  return (
    <Reveal delay={delay}>
      <Card className="group overflow-hidden border-border bg-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-12px_rgba(232,166,80,0.35)]">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image src={project.image} alt={project.title} fill className="object-cover" />
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-foreground">{project.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="outline" className="border-border font-mono text-[11px] text-accent">
                {tech.toLowerCase()}
              </Badge>
            ))}
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm text-accent hover:text-foreground"
          >
            Ver projeto <ArrowUpRight size={14} />
          </a>
        </div>
      </Card>
    </Reveal>
  );
}
```

- [ ] **Step 2: Implement `components/sections/projects-section.tsx`**

```tsx
import { Reveal } from "@/components/motion/reveal";
import { projects } from "@/content/projects";
import { ProjectCard } from "./project-card";

export function ProjectsSection() {
  return (
    <section id="projetos" className="px-6 py-24 md:pl-64">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-foreground">Projetos</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} delay={index * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add components/sections/project-card.tsx components/sections/projects-section.tsx
git commit -m "feat: add Projects section with curated project cards"
```

---

### Task 15: Skills section

**Files:**
- Create: `components/sections/skills-section.tsx`

**Interfaces:**
- Consumes: `SkillCategory` type + `skillCategories` (Task 5); `Reveal` (Task 8); `Badge` (Task 2).
- Produces: `<SkillsSection />` from `@/components/sections/skills-section`, `id="skills"`.

- [ ] **Step 1: Implement `components/sections/skills-section.tsx`**

```tsx
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { skillCategories } from "@/content/skills";

export function SkillsSection() {
  return (
    <section id="skills" className="px-6 py-24 md:pl-64">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-foreground">Skills</h2>
        </Reveal>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {skillCategories.map((category, index) => (
            <Reveal key={category.category} delay={index * 0.08}>
              <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-accent">{category.category}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="border-border text-foreground">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/sections/skills-section.tsx
git commit -m "feat: add Skills section grouped by category"
```

---

### Task 16: Contact section

**Files:**
- Create: `components/sections/contact-section.tsx`

**Interfaces:**
- Consumes: `contactSchema`, `ContactFormValues` (Task 6); `submitContactForm` (Task 6); `Reveal` (Task 8); `Form`/`FormField`/`FormItem`/`FormLabel`/`FormControl`/`FormMessage`, `Input`, `Textarea`, `Button` (Task 2). Requires `QueryClientProvider` to be mounted above it in the tree (Task 17).
- Produces: `<ContactSection />` from `@/components/sections/contact-section`, `id="contato"`.

- [ ] **Step 1: Implement `components/sections/contact-section.tsx`**

```tsx
"use client";

import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/motion/reveal";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { submitContactForm } from "@/lib/submit-contact";

export function ContactSection() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => form.reset(),
  });

  return (
    <section id="contato" className="px-6 py-24 md:pl-64">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-foreground">Contato</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tem um projeto em mente ou só quer bater um papo? Me manda uma mensagem.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
              className="mt-8 space-y-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensagem</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Conte um pouco sobre o projeto" rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Enviando..." : "Enviar mensagem"}
              </Button>

              {mutation.isSuccess && (
                <p className="text-sm text-accent">Mensagem enviada! Retorno em breve.</p>
              )}
              {mutation.isError && (
                <p className="text-sm text-destructive">{(mutation.error as Error).message}</p>
              )}
            </form>
          </Form>

          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <a
              href="https://api.whatsapp.com/send?phone=5511985648888&text=Ol%C3%A1,%20boa%20tarde!%20Quero%20criar%20um%20site%20profissional!"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:text-foreground"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a
              href="mailto:matheus081105@gmail.com"
              className="inline-flex items-center gap-2 text-accent hover:text-foreground"
            >
              E-mail
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds (this task depends on `QueryClientProvider` from Task 17 to run correctly in the browser, but the build/typecheck itself does not require the provider to be mounted yet).

- [ ] **Step 3: Commit**

```bash
git add components/sections/contact-section.tsx
git commit -m "feat: add Contact section with validated Formspree submission"
```

---

### Task 17: Providers, root layout, and page composition

**Files:**
- Create: `app/providers.tsx`
- Modify: `app/layout.tsx` (add metadata, JSON-LD, wrap children in `Providers`)
- Modify: `app/page.tsx` (compose `SiteNav` + all sections + `SiteFooter`)
- Modify: `package.json` (add `@tanstack/react-query`, `@vercel/analytics`, `@vercel/speed-insights`)

**Interfaces:**
- Consumes: every component from Tasks 9–16.
- Produces: the fully composed home page.

- [ ] **Step 1: Install TanStack Query and Vercel's analytics packages**

```bash
npm install @tanstack/react-query@latest @vercel/analytics@latest @vercel/speed-insights@latest
```

The site currently loads Vercel Web Analytics via a hand-written `<script>` snippet (`public/index.html`'s `window.va` shim + `/_vercel/insights/script.js`). The modern equivalent is these two packages' React components, mounted once in the root layout — this replaces that snippet (the legacy file it lived in is deleted in Task 20).

- [ ] **Step 2: Implement `app/providers.tsx`**

```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
```

- [ ] **Step 3: Update `app/layout.tsx` with full metadata and JSON-LD**

```tsx
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { Providers } from "./providers";

const siteUrl = "https://matheusdevstudio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MatheusDevStudio — Matheus Gomes, Desenvolvedor Fullstack",
  description:
    "Desenvolvedor fullstack especializado em criar interfaces elegantes e sistemas robustos. Do design à API, transformo ideias em produtos digitais completos.",
  authors: [{ name: "Matheus Eduardo Mendonça Gomes" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "MatheusDevStudio",
    description:
      "Desenvolvedor fullstack especializado em criar interfaces elegantes e sistemas robustos. Do design à API, transformo ideias em produtos digitais completos.",
    images: ["/img/Logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MatheusDevStudio",
    description:
      "Desenvolvedor fullstack especializado em criar interfaces elegantes e sistemas robustos. Do design à API, transformo ideias em produtos digitais completos.",
    images: ["/img/Logo.jpg"],
  },
  icons: { icon: "/img/Logo.ico" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Matheus Eduardo Mendonça Gomes",
  jobTitle: "Desenvolvedor Fullstack",
  url: siteUrl,
  sameAs: [
    "https://www.linkedin.com/in/matheus-eduardo-mendonça-gomes-4aaa57270",
    "https://github.com/NewMatheusED",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Update `app/page.tsx` to compose the full page**

```tsx
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 5: Verify**

Run: `npm run build`
Expected: build succeeds. Run `npm run dev`, open `http://localhost:3000`, confirm all 5 sections render in order with the dark palette applied.

- [ ] **Step 6: Commit**

```bash
git add app/providers.tsx app/layout.tsx app/page.tsx package.json package-lock.json
git commit -m "feat: compose home page with providers, metadata, and JSON-LD"
```

---

### Task 18: Privacy policy page

**Files:**
- Create: `app/politica-de-privacidade/page.tsx`

**Interfaces:**
- Consumes: `SiteNav`, `SiteFooter` (Tasks 9–11).
- Produces: `/politica-de-privacidade` route, linked from `SiteFooter` (Task 9).

- [ ] **Step 1: Implement `app/politica-de-privacidade/page.tsx`**

Port the content from the existing `public/politicas.html` (last updated 19/04/2024):

```tsx
import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Política de Privacidade — MatheusDevStudio",
  description: "Política de privacidade do site MatheusDevStudio.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="font-display text-3xl font-semibold text-foreground">Política de Privacidade</h1>
        <p className="mt-2 text-xs text-muted-foreground">Última atualização: 19/04/2024</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            Bem-vindo ao meu site. Esta página informa sobre minha política em relação à coleta, uso e divulgação
            de informações pessoais quando você usa meu site.
          </p>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">Coleta e Uso de Informações</h2>
            <p className="mt-2">
              Ao usar meu site, posso solicitar que você me forneça algumas informações pessoais identificáveis
              que podem ser usadas para contatá-lo ou identificá-lo. As informações pessoais podem incluir, mas
              não estão limitadas a, seu nome e endereço de e-mail.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">Uso Futuro de Cookies</h2>
            <p className="mt-2">
              Atualmente, meu site não usa &quot;cookies&quot;. No entanto, reservo o direito de implementar o uso
              de &quot;cookies&quot; no futuro para melhorar a experiência do usuário em meu site. Se decidir
              implementar o uso de &quot;cookies&quot;, atualizarei minha Política de Privacidade para refletir
              essa mudança e fornecerei informações claras sobre quais &quot;cookies&quot; estou usando e para
              que finalidade.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">Segurança</h2>
            <p className="mt-2">
              A segurança de suas informações pessoais é importante para mim, mas lembre-se de que nenhum método
              de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro. Embora eu me
              esforce para usar meios comercialmente aceitáveis para proteger suas informações pessoais, não
              posso garantir sua segurança absoluta.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Alterações nesta Política de Privacidade
            </h2>
            <p className="mt-2">
              Posso atualizar minha Política de Privacidade de tempos em tempos. Recomendo que você revise esta
              Política de Privacidade periodicamente para quaisquer alterações.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">Contate-Me</h2>
            <p className="mt-2">
              Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato comigo.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds; `/politica-de-privacidade` appears in the route list Next.js prints.

- [ ] **Step 3: Commit**

```bash
git add app/politica-de-privacidade/page.tsx
git commit -m "feat: add privacy policy page"
```

---

### Task 19: Sitemap and robots.txt

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

**Interfaces:**
- Produces: `/sitemap.xml` and `/robots.txt` routes, generated natively by the App Router.

- [ ] **Step 1: Implement `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";

const baseUrl = "https://matheusdevstudio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    {
      url: `${baseUrl}/politica-de-privacidade`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
```

- [ ] **Step 2: Implement `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://matheusdevstudio.vercel.app/sitemap.xml",
  };
}
```

- [ ] **Step 3: Verify**

Run: `npm run build`, then `npm run start` in one terminal and in another:

```bash
curl -s http://localhost:3000/sitemap.xml | head -20
curl -s http://localhost:3000/robots.txt
```

Expected: `sitemap.xml` returns valid XML with both URLs; `robots.txt` returns the allow rule and sitemap reference. Stop the `start` server afterward.

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts app/robots.ts
git commit -m "feat: add sitemap.xml and robots.txt"
```

---

### Task 20: Remove legacy static site and final verification

**Files:**
- Delete: `public/index.html`, `public/portifolio.html`, `public/contato.html`, `public/politicas.html`, `public/app.js`, `public/style.css`, `public/particles.json`, `public/public/aos.css`, `public/public/aos.js`, `public/public/jquery.js`, `public/public/particles.js`
- Delete (now-empty directory): `public/public/`

**Interfaces:**
- None — this is cleanup plus manual verification, no new code interfaces.

- [ ] **Step 1: Remove the legacy static files**

```bash
git rm public/index.html public/portifolio.html public/contato.html public/politicas.html public/app.js public/style.css public/particles.json
git rm -r public/public
```

- [ ] **Step 2: Verify the build is unaffected**

Run: `npm run build`
Expected: build succeeds — nothing in `app/` or `components/` referenced the deleted files.

- [ ] **Step 3: Run the full test suite**

Run: `npm run test`
Expected: all Vitest suites pass (projects/skills content, contact schema/submission, both scroll hooks, logo recolor).

- [ ] **Step 4: Manual browser verification**

Start the dev server (`npm run dev`) and use the browser to check, at both desktop (≥1280px) and mobile (~390px) widths:
- Hero renders with portrait, headline, and all 3 contact shortcuts working (mailto, LinkedIn, CV download).
- Scrolling past the hero swaps the top nav for the fixed left sidebar on desktop; on mobile the hamburger `Sheet` menu opens and each link scrolls to and highlights the right section.
- All 5 project cards show distinct images (confirm FonPack shows the captured screenshot, not JNC's image) and their "Ver projeto" links open the correct external site.
- Skills render in 3 labeled groups.
- Submitting the contact form with valid data shows the success message (a real submission will hit the live Formspree endpoint — use a throwaway message for this check).
- `/politica-de-privacidade` and the footer link to it both work.
- No console errors in the browser devtools during the walkthrough.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove legacy static site now that the Next.js rebuild is complete"
```
