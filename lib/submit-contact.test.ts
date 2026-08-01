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
