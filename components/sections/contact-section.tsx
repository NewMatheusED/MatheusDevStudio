"use client";

import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { submitContactForm } from "@/lib/submit-contact";

const WHATSAPP_URL = "https://wa.me/5511985648888";

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
    <section id="contato" className="border-t border-border">
      <div className="wrap grid gap-12 py-[clamp(72px,8vw,120px)] md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="display text-[clamp(28px,3vw,52px)]">Tem um projeto em mente?</h2>
          <p className="mt-5 max-w-[44ch] text-[clamp(17px,1.15vw,21px)] leading-relaxed text-muted-foreground">
            Me conta o que você precisa. O jeito mais rápido é pelo WhatsApp; se preferir, use o formulário.
          </p>
          <a className="btn mt-8" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Chamar no WhatsApp
          </a>
          <ul className="mt-8 space-y-2 text-muted-foreground">
            <li>
              <a className="hover:text-foreground" href="mailto:matheus081105@gmail.com">
                matheus081105@gmail.com
              </a>
            </li>
            <li>
              <a
                className="hover:text-foreground"
                href="https://www.linkedin.com/in/matheus-eduardo-mendonça-gomes-4aaa57270"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input className="h-12 px-4 text-base md:text-base" placeholder="Seu nome" {...field} />
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
                    <Input className="h-12 px-4 text-base md:text-base" type="email" placeholder="seu@email.com" {...field} />
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
                    <Textarea className="px-4 py-3 text-base md:text-base" placeholder="Conte um pouco sobre o projeto" rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button type="submit" className="btn btn-ghost cursor-pointer disabled:opacity-60" disabled={mutation.isPending}>
              {mutation.isPending ? "Enviando..." : "Enviar mensagem"}
            </button>

            <div aria-live="polite">
              {mutation.isSuccess && <p className="text-accent">Mensagem enviada. Respondo em até um dia útil.</p>}
              {mutation.isError && <p className="text-destructive">{(mutation.error as Error).message}</p>}
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
