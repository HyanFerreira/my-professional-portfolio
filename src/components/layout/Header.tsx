import Image from "next/image";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navigationItems } from "@/data/navigation";
import { siteConfig } from "@/data/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl">
      <Container className="relative flex min-h-16 items-center justify-between gap-5">
        <a
          className="brand-logo-link inline-flex shrink-0 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          href="/#inicio"
        >
          <Image
            alt={siteConfig.name}
            className="brand-logo-image h-9 w-auto sm:h-10"
            height={64}
            priority
            src={siteConfig.logo}
            width={303}
          />
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {navigationItems.map((item) => (
            <a
              className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/#contato" size="sm">
            Solicitar orçamento
          </Button>
        </div>

        <MobileMenu navigation={navigationItems} />
      </Container>
    </header>
  );
}
