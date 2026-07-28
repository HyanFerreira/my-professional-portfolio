import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { navigationItems } from "@/data/navigation";
import { siteConfig, socialLinks } from "@/data/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/55 py-10">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <a
              className="brand-logo-link inline-flex items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              href="/#inicio"
            >
              <Image
                alt={siteConfig.name}
                className="brand-logo-image-dark h-10 w-auto"
                height={64}
                src={siteConfig.logo}
                width={303}
              />
              <Image
                alt={siteConfig.name}
                className="brand-logo-image-light h-10 w-auto"
                height={119}
                src={siteConfig.lightLogo}
                width={560}
              />
            </a>
            <p className="mt-5 max-w-md leading-7 text-text-secondary">
              {siteConfig.shortDescription}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <nav aria-label="Links do rodapé">
              <h2 className="text-sm font-semibold text-text-primary">
                Navegação
              </h2>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-3">
                {navigationItems.map((item) => (
                  <a
                    className="text-sm text-text-secondary transition hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  className="text-sm text-text-secondary transition hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  href="/projetos"
                >
                  Todos os projetos
                </a>
              </div>
            </nav>

            <nav aria-label="Links sociais">
              <h2 className="text-sm font-semibold text-text-primary">
                Social
              </h2>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-3">
                {socialLinks.map((link) => (
                  <a
                    className="text-sm text-text-secondary transition hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    href={link.href}
                    key={link.href}
                    rel="noreferrer"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-text-secondary">
          © {currentYear} {siteConfig.name}. Todos os direitos reservados.
        </div>
      </Container>
    </footer>
  );
}
