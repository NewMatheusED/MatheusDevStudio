import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="wrap flex flex-col gap-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Logo />
          <span>{new Date().getFullYear()}</span>
          <a href="/politica-de-privacidade" className="hover:text-foreground">
            Política de privacidade
          </a>
        </div>
        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/in/matheus-eduardo-mendonça-gomes-4aaa57270"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:text-foreground"
          >
            <LinkedinIcon />
          </a>
          <a
            href="https://github.com/NewMatheusED"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-foreground"
          >
            <GithubIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
