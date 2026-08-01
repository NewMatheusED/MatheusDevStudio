import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Política de Privacidade — MatheusDevStudio",
  description: "Política de privacidade do site MatheusDevStudio.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="font-display text-3xl font-semibold text-foreground">Política de Privacidade</h1>
        <p className="mt-2 text-xs text-muted-foreground">Última atualização: 19/04/2024</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            Bem-vindo ao meu site. Esta página informa sobre minha política em relação à coleta, uso e divulgação
            de informações pessoais quando você usa meu site.
          </p>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">Coleta e Uso de Informações</h2>
            <p className="mt-2">
              Ao usar meu site, posso solicitar que você me forneça algumas informações pessoais identificáveis
              que podem ser usadas para contatá-lo ou identificá-lo. As informações pessoais podem incluir, mas
              não estão limitadas a, seu nome e endereço de e-mail.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">Uso Futuro de Cookies</h2>
            <p className="mt-2">
              Atualmente, meu site não usa &quot;cookies&quot;. No entanto, reservo o direito de implementar o uso
              de &quot;cookies&quot; no futuro para melhorar a experiência do usuário em meu site. Se decidir
              implementar o uso de &quot;cookies&quot;, atualizarei minha Política de Privacidade para refletir
              essa mudança e fornecerei informações claras sobre quais &quot;cookies&quot; estou usando e para
              que finalidade.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">Segurança</h2>
            <p className="mt-2">
              A segurança de suas informações pessoais é importante para mim, mas lembre-se de que nenhum método
              de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro. Embora eu me
              esforce para usar meios comercialmente aceitáveis para proteger suas informações pessoais, não
              posso garantir sua segurança absoluta.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Alterações nesta Política de Privacidade
            </h2>
            <p className="mt-2">
              Posso atualizar minha Política de Privacidade de tempos em tempos. Recomendo que você revise esta
              Política de Privacidade periodicamente para quaisquer alterações.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">Contate-Me</h2>
            <p className="mt-2">
              Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato comigo.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
