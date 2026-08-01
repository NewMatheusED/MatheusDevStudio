"use client";

import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { navLinks } from "./nav-links";
import { MobileMenu } from "./mobile-menu";
import { useActiveSection } from "./use-active-section";
import { useIsPastHero } from "./use-is-past-hero";

const sectionIds = navLinks.map((link) => link.id);

export function SiteNav() {
  const activeId = useActiveSection(sectionIds);
  const isPastHero = useIsPastHero("hero");

  return (
    <>
      {/* Mobile: always a horizontal bar with a Sheet menu, regardless of scroll */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-border bg-background/90 px-6 py-4 backdrop-blur md:hidden">
        <Logo />
        <MobileMenu activeId={activeId} />
      </header>

      {/* Desktop: top bar before the hero, fixed sidebar after */}
      <div className="hidden md:block">
        <AnimatePresence mode="wait">
          {!isPastHero ? (
            <motion.header
              key="top-bar"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-border bg-background/90 px-10 py-5 backdrop-blur"
            >
              <Logo />
              <nav className="flex gap-8 font-mono text-xs text-muted-foreground">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className={cn("transition-colors hover:text-accent", activeId === link.id && "text-accent")}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.header>
          ) : (
            <motion.aside
              key="sidebar"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col justify-between border-r border-border bg-background px-6 py-10"
            >
              <Logo showWordmark={false} />
              <nav className="flex flex-col gap-4 font-mono text-xs text-muted-foreground">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className={cn("flex items-center gap-2 transition-colors hover:text-accent", activeId === link.id && "text-accent")}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full bg-current")} />
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
