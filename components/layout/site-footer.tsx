import { Logo } from "@/components/logo";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <Logo />
        <Separator className="bg-border" />
        <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
            <span>matheus081105@gmail.com</span>
            <span>(11) 98564-8888</span>
            <a href="/politica-de-privacidade" className="hover:text-accent">
              Política de privacidade
            </a>
          </div>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/matheus-eduardo-mendonça-gomes-4aaa57270"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-accent"
            >
              <LinkedinIcon />
            </a>
            <a
              href="https://github.com/NewMatheusED"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-accent"
            >
              <GithubIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
