import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { layers } from "@/content/layers";
import type { SceneStep } from "@/lib/scene";
import { SceneStepProvider } from "./layers-scene";
import { SceneCopy } from "./scene-copy";

const renderWithStep = (step: SceneStep) =>
  render(
    <SceneStepProvider value={step}>
      <SceneCopy />
    </SceneStepProvider>,
  );

describe("SceneCopy", () => {
  it("renders the opening and all three layers in the markup", () => {
    renderWithStep(0);
    expect(screen.getByRole("heading", { level: 1, hidden: true })).toHaveTextContent(
      "Construo o produto inteiro. Da infraestrutura à tela.",
    );
    for (const layer of layers) expect(screen.getByText(layer.title)).toBeInTheDocument();
  });

  it("never mentions Beergam in the opening block", () => {
    renderWithStep(0);
    expect(screen.getByTestId("copy-0")).not.toHaveTextContent(/beergam/i);
  });

  it("makes inactive blocks inert", () => {
    renderWithStep(2);
    expect(screen.getByTestId("copy-2")).not.toHaveAttribute("inert");
    for (const id of ["copy-0", "copy-1", "copy-3", "copy-4"]) expect(screen.getByTestId(id)).toHaveAttribute("inert");
  });
});
