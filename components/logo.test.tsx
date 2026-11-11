import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo } from "./logo";

describe("Logo", () => {
  it("shows the symbol next to the name by default", () => {
    const { container } = render(<Logo />);
    expect(container.querySelector("svg")).not.toBeNull();
    expect(screen.getByText("MatheusDevStudio")).toBeInTheDocument();
  });

  it("keeps an accessible name when only the symbol is shown", () => {
    render(<Logo showWordmark={false} />);
    expect(screen.queryByText("MatheusDevStudio")).toBeNull();
    expect(screen.getByRole("img", { name: "MatheusDevStudio" })).toBeInTheDocument();
  });
});
