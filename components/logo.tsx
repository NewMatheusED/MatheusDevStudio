import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return <span className={cn("display text-base text-foreground", className)}>MatheusDevStudio</span>;
}
