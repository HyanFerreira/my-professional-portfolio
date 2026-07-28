"use client";

import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/types/navigation";

type MobileMenuProps = {
  activeHref: string;
  navigation: NavigationItem[];
  onNavigate: (href: string) => void;
};

export function MobileMenu({
  activeHref,
  navigation,
  onNavigate,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    if (menuRef.current) {
      menuRef.current.open = false;
    }
  }

  function navigateTo(href: string) {
    onNavigate(href);
    closeMenu();
  }

  return (
    <details className="group relative xl:hidden" ref={menuRef}>
      <summary
        aria-controls="mobile-navigation"
        aria-label="Abrir ou fechar menu"
        className="inline-flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-md border border-border bg-surface text-text-primary transition hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden"
      >
        <span className="sr-only">Abrir ou fechar menu</span>
        <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
          <span className="h-0.5 rounded-full bg-current transition group-open:translate-y-2 group-open:rotate-45" />
          <span className="h-0.5 rounded-full bg-current transition group-open:opacity-0" />
          <span className="h-0.5 rounded-full bg-current transition group-open:-translate-y-2 group-open:-rotate-45" />
        </span>
      </summary>

      <nav
        aria-label="Navegação mobile"
        className="absolute right-0 top-full z-50 mt-3 w-[min(calc(100vw-2.5rem),22rem)] rounded-lg border border-border bg-surface-elevated p-4 shadow-[var(--shadow-menu)]"
        id="mobile-navigation"
      >
        <div className="grid gap-1">
          {navigation.map((item) => (
            <Link
              aria-current={activeHref === item.href ? "location" : undefined}
              className={cn(
                "rounded-md border-l-2 border-transparent px-3 py-3 text-sm font-medium text-text-secondary transition hover:bg-surface hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                activeHref === item.href &&
                  "border-accent bg-surface text-text-primary",
              )}
              href={item.href}
              key={item.href}
              onClick={() => navigateTo(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Button
          className="mt-4 w-full"
          href="/#contato"
          onClick={() => navigateTo("/#contato")}
        >
          Solicitar orçamento
        </Button>
      </nav>
    </details>
  );
}
