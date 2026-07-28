import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  elevated?: boolean;
};

export function Card({ className, elevated = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface p-6 shadow-[var(--shadow-card)] transition duration-200",
        elevated && "bg-surface-elevated",
        className,
      )}
      {...props}
    />
  );
}
