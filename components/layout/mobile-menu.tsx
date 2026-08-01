"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navLinks } from "./nav-links";

interface MobileMenuProps {
  activeId: string;
}

export function MobileMenu({ activeId }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Abrir menu" className="md:hidden">
            <Menu />
          </Button>
        }
      />
      <SheetContent side="right" className="bg-background border-border">
        <nav className="mt-10 flex flex-col gap-6 font-mono text-sm">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-muted-foreground transition-colors hover:text-accent",
                activeId === link.id && "text-accent",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
