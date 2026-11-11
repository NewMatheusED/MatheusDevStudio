import Image from "next/image";

const links = [
  { label: "Assistir ao vídeo de apresentação", href: "https://youtu.be/oW6opek-WDE" },
  { label: "Baixar currículo", href: "/img/CV.pdf", download: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/matheus-eduardo-mendonça-gomes-4aaa57270" },
  { label: "GitHub", href: "https://github.com/NewMatheusED" },
];

export function AboutSection() {
  return (
    <section id="sobre" className="border-t border-border">
      <div className="wrap grid gap-10 py-[clamp(72px,8vw,120px)] md:grid-cols-[minmax(220px,320px)_1fr] md:gap-16">
        <Image
          src="/img/perfil3.jpg"
          alt="Matheus Eduardo"
          width={640}
          height={800}
          sizes="(min-width: 768px) 320px, 220px"
          className="aspect-[4/5] w-full max-w-[220px] rounded-[14px] object-cover md:max-w-none"
        />
        <div>
          <h2 className="display text-[clamp(28px,3vw,52px)]">Sobre mim</h2>
          <div className="mt-6 max-w-[58ch] space-y-4 text-[clamp(17px,1.15vw,21px)] leading-relaxed text-muted-foreground">
            <p>
              Programo desde os 14 anos. Tenho formação técnica em multimídia e curso Ciência da Computação, o que me
              deixa à vontade tanto no desenho da tela quanto na arquitetura por trás dela.
            </p>
            <p>
              <strong className="font-medium text-foreground">Também desenvolvo em ABAP e Fiori.</strong> É uma área
              em que venho investindo bastante e onde quero trabalhar mais: relatórios, aplicativos SAPUI5 e
              integrações via OData.
            </p>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  download={link.download}
                  target={link.download ? undefined : "_blank"}
                  rel="noreferrer"
                  className="underline decoration-[#3a4350] underline-offset-[6px] transition-colors hover:decoration-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
