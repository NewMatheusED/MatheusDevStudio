import Image from "next/image";
import { Download, Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/brand-icons";
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
            <Button nativeButton={false} render={<a href="#projetos">Ver projetos</a>} />
            <Button
              variant="outline"
              nativeButton={false}
              render={
                <a href="mailto:matheus081105@gmail.com">
                  <Mail className="mr-2" size={16} /> E-mail
                </a>
              }
            />
            <Button
              variant="outline"
              nativeButton={false}
              render={
                <a
                  href="https://www.linkedin.com/in/matheus-eduardo-mendonça-gomes-4aaa57270"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedinIcon className="mr-2" size={16} /> LinkedIn
                </a>
              }
            />
            <Button
              variant="outline"
              nativeButton={false}
              render={
                <a href="/img/CV.pdf" download>
                  <Download className="mr-2" size={16} /> Baixar CV
                </a>
              }
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-lg border border-accent/40">
            <Image
              src="/img/perfil3.jpg"
              alt="Matheus Eduardo"
              fill
              sizes="(min-width: 768px) 20rem, 80vw"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
