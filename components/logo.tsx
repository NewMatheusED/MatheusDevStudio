import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** false mostra só o símbolo (espaços pequenos) */
  showWordmark?: boolean;
}

/** Monograma: um M com uma segunda camada por dentro. O mesmo desenho está em public/logo/symbol.svg. */
export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-foreground", className)}>
      <svg
        viewBox="0 0 32 32"
        width={26}
        height={26}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        role={showWordmark ? undefined : "img"}
        aria-label={showWordmark ? undefined : "MatheusDevStudio"}
        aria-hidden={showWordmark ? true : undefined}
      >
        <path d="M5 27V5l11 11L27 5v22" />
        <path d="M10.5 18l5.5 5.5 5.5-5.5" />
      </svg>
      {showWordmark && <span className="display text-base">MatheusDevStudio</span>}
    </span>
  );
}
