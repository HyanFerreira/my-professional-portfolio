import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  elevated?: boolean;
};

export function Card({ className, elevated = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)] transition duration-200",
        elevated && "bg-surface-elevated",
        className,
      )}
      {...props}
    />
  );
}
