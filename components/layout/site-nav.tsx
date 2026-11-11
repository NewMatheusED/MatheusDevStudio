"use client";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { navLinks } from "./nav-links";
import { MobileMenu } from "./mobile-menu";
import { useActiveSection } from "./use-active-section";

const sectionIds = navLinks.map((link) => link.id);

export function SiteNav() {
  const activeId = useActiveSection(sectionIds);

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-background/70 px-6 py-4 backdrop-blur-lg">
      <a href="/" aria-label="MatheusDevStudio, início">
        <Logo />
      </a>
      <nav className="hidden gap-7 text-[15px] text-muted-foreground md:flex">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className={cn("transition-colors hover:text-foreground", activeId === link.id && "text-foreground")}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <MobileMenu activeId={activeId} />
    </header>
  );
}
