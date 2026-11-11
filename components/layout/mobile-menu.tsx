"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navLinks } from "./nav-links";

/** Menu do celular: painel de tela cheia com links grandes e o WhatsApp no pé. */
export function MobileMenu({ activeId }: { activeId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button
            type="button"
            aria-label="Abrir menu"
            className="-mr-2 grid size-10 place-items-center rounded-full text-foreground md:hidden"
          >
            <Menu size={22} />
          </button>
        }
      />
      <SheetContent side="right" className="w-full border-border bg-background px-6 pt-20 pb-10 data-[side=right]:w-full sm:max-w-none">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <nav className="flex flex-col">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "display border-b border-border py-5 text-[32px] text-muted-foreground transition-colors hover:text-foreground",
                activeId === link.id && "text-foreground",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a className="btn mt-auto justify-center" href="https://wa.me/5511985648888" target="_blank" rel="noreferrer">
          Chamar no WhatsApp
        </a>
      </SheetContent>
    </Sheet>
  );
}
