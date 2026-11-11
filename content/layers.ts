export type LayerId = "interface" | "api" | "infra";

export interface Tech {
  /** nome do arquivo em public/icons/tech, sem extensão */
  slug: string;
  name: string;
  /** para que serve, em linguagem de quem não é da área */
  why: string;
}

export interface Layer {
  id: LayerId;
  label: string;
  title: string;
  body: string;
  techs: Tech[];
}

export const layers: Layer[] = [
  {
    id: "interface",
    label: "Interface",
    title: "A parte que as pessoas tocam.",
    body: "As telas, os botões, os gráficos. Tudo o que o seu cliente vê e usa, rápido no celular e no computador.",
    techs: [
      { slug: "react", name: "React", why: "Monta as telas em peças que se reaproveitam, o que deixa tudo rápido e consistente." },
      { slug: "typescript", name: "TypeScript", why: "Pega erros de programação antes de o sistema ir ao ar." },
      { slug: "nextdotjs", name: "Next.js", why: "Faz o site carregar rápido e aparecer bem no Google. Este site usa." },
      { slug: "reactrouter", name: "React Router", why: "Organiza as páginas de um sistema grande, como o painel do Beergam." },
      { slug: "tailwindcss", name: "Tailwind CSS", why: "Cuida do visual e faz a tela se adaptar a qualquer tamanho." },
      { slug: "vite", name: "Vite", why: "Ferramenta que monta o projeto e deixa o desenvolvimento ágil." },
      { slug: "reactquery", name: "TanStack Query", why: "Busca os dados no servidor e mantém a tela sempre atualizada." },
      { slug: "shadcnui", name: "shadcn/ui", why: "Base de componentes acessíveis: botões, formulários, janelas." },
      { slug: "socketdotio", name: "Socket.IO", why: "Atualiza a tela em tempo real, sem precisar recarregar." },
      { slug: "sap", name: "SAP Fiori", why: "Aplicativos para empresas que usam SAP, no padrão visual da própria SAP." },
      { slug: "html5", name: "HTML e CSS", why: "A base de toda página na web." },
      { slug: "javascript", name: "JavaScript", why: "A linguagem que dá comportamento às páginas." },
    ],
  },
  {
    id: "api",
    label: "API",
    title: "As regras do negócio.",
    body: "O que acontece quando alguém clica: cálculos, cadastros, pagamentos e integrações com outros sistemas.",
    techs: [
      { slug: "python", name: "Python", why: "A linguagem em que as regras do negócio são escritas." },
      { slug: "flask", name: "Flask", why: "Recebe os pedidos que vêm das telas e devolve as respostas." },
      { slug: "sqlalchemy", name: "SQLAlchemy", why: "Faz a ponte entre o código e o banco de dados." },
      { slug: "celery", name: "Celery", why: "Roda tarefas demoradas em segundo plano, sem travar ninguém." },
      { slug: "redis", name: "Redis", why: "Memória rápida para filas e para dados consultados toda hora." },
      { slug: "mysql", name: "MySQL", why: "Onde ficam guardados os dados principais." },
      { slug: "mongodb", name: "MongoDB", why: "Banco para dados em grande volume e formato variado." },
      { slug: "nodedotjs", name: "Node.js", why: "JavaScript rodando no servidor." },
      { slug: "php", name: "PHP", why: "Linguagem dos sites com painel administrativo que já entreguei." },
      { slug: "stripe", name: "Stripe", why: "Cobrança e assinaturas com cartão." },
      { slug: "pytest", name: "Pytest", why: "Testes automáticos que avisam quando algo quebra." },
      { slug: "sap", name: "ABAP e OData", why: "Programação e integração dentro do SAP." },
    ],
  },
  {
    id: "infra",
    label: "Infraestrutura",
    title: "O que mantém tudo de pé.",
    body: "Os servidores onde o sistema mora, preparados para ficar no ar o dia inteiro e crescer junto com o uso.",
    techs: [
      { slug: "docker", name: "Docker", why: "Empacota o sistema para rodar igual em qualquer servidor." },
      { slug: "kubernetes", name: "Kubernetes", why: "Distribui o sistema em várias partes e religa o que cair." },
      { slug: "argo", name: "Argo CD", why: "Publica cada versão nova automaticamente, sem passo manual." },
      { slug: "githubactions", name: "GitHub Actions", why: "Testa e empacota o código a cada alteração." },
      { slug: "traefikproxy", name: "Traefik", why: "Recebe os acessos e encaminha para a parte certa do sistema." },
      { slug: "cloudflare", name: "Cloudflare", why: "Protege o site de ataques e acelera a entrega." },
      { slug: "prometheus", name: "Prometheus", why: "Mede a saúde dos servidores o tempo todo." },
      { slug: "grafana", name: "Grafana", why: "Painéis para acompanhar essas medições." },
      { slug: "sentry", name: "Sentry", why: "Avisa quando um erro acontece com um usuário de verdade." },
      { slug: "vercel", name: "Vercel", why: "Hospedagem para sites em Next.js." },
      { slug: "git", name: "Git", why: "Guarda o histórico de tudo o que foi alterado no código." },
    ],
  },
];
