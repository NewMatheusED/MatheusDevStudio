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
