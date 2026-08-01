import { Reveal } from "@/components/motion/reveal";

export function AboutSection() {
  return (
    <section id="sobre" className="px-6 py-24 md:pl-64">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-foreground">Sobre</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            <p>
              Sou desenvolvedor fullstack com mais de 3 anos de experiência, apaixonado por tecnologia desde os 14
              anos. Minha formação técnica em multimídia e a graduação em andamento em Ciências da Computação me
              deram uma base flexível para transitar entre design de interface e arquitetura de sistemas.
            </p>
            <p>
              Atuo com desenvolvimento ABAP e Fiori — relatórios, módulos de função e aplicativos SAPUI5
              responsivos — além de integração de sistemas via REST, OData e SAP Gateway. Do front-end à API, gosto
              de entender o problema por inteiro antes de escrever a primeira linha de código.
            </p>
            <p>
              <a
                href="https://youtu.be/oW6opek-WDE?si=alNGk8WV1mEqMDgM"
                target="_blank"
                rel="noreferrer"
                className="text-accent underline underline-offset-4 hover:text-foreground"
              >
                Prefere ver e ouvir? Assista ao meu vídeo de apresentação.
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
