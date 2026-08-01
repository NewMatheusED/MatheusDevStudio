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
