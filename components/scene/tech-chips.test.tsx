import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { layers } from "@/content/layers";
import { TechChips } from "./tech-chips";

const techs = layers[0].techs;

describe("TechChips", () => {
  it("shows the first technology's explanation by default", () => {
    render(<TechChips techs={techs} />);
    expect(screen.getByRole("button", { name: "React" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(techs[0].why)).toBeInTheDocument();
  });

  it("switches the explanation on click", () => {
    render(<TechChips techs={techs} />);
    fireEvent.click(screen.getByRole("button", { name: "TypeScript" }));
    expect(screen.getByRole("button", { name: "TypeScript" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "React" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText(techs[1].why)).toBeInTheDocument();
  });

  it("stays readable when an icon fails: the name is text and the image is decorative", () => {
    render(<TechChips techs={techs} />);
    const button = screen.getByRole("button", { name: "React" });
    expect(button).toHaveTextContent("React");
    expect(button.querySelector("img")).toHaveAttribute("alt", "");
  });
});
