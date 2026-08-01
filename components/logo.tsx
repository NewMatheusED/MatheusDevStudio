import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image src="/img/logo-gold.png" alt="MatheusDevStudio" width={28} height={28} />
      {showWordmark && (
        <span className="font-display text-base font-semibold text-foreground">
          MatheusDevStudio
        </span>
      )}
    </span>
  );
}
