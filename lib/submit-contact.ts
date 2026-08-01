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
