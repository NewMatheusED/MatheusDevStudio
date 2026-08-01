import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Digite seu nome completo."),
  email: z.string().email("Digite um e-mail válido."),
  message: z.string().min(10, "Escreva uma mensagem com pelo menos 10 caracteres."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
