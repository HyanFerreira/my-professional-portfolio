import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";

const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Laravel",
  "Tailwind CSS",
  "MySQL",
];

const highlights = [
  "Projetos reais entregues",
  "Desenvolvimento de ponta a ponta",
  "Experiência com sistemas administrativos",
  "Soluções web sob medida",
];

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden border-b border-border bg-[linear-gradient(180deg,rgba(0,229,255,0.08)_0%,rgba(0,7,26,0)_42%)] py-16 sm:py-20 lg:py-24"
      id="inicio"
    >
      <Container className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div>
          <Badge className="border-accent/40 bg-accent/10 text-accent">
            Desenvolvedor web full stack
          </Badge>
          <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-tight text-text-primary sm:text-5xl lg:text-6xl">
            Desenvolvimento web para transformar ideias em sistemas reais.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
            Crio sites, portfólios, sistemas web, dashboards, e-commerces e
            soluções sob medida com foco em performance, design e experiência do
            usuário.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#projetos" size="lg">
              Ver projetos
            </Button>
            <Button href="/#contato" size="lg" variant="secondary">
              Solicitar orçamento
            </Button>
          </div>

          <div className="mt-9">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-text-secondary">
              Stack em destaque
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {stack.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface p-5 shadow-[var(--shadow-hero)]">
          <div className="rounded-md border border-border bg-background">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              <span className="h-2.5 w-2.5 rounded-full bg-text-secondary/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="ml-auto text-xs text-text-secondary">
                {siteConfig.domain}
              </span>
            </div>
            <div className="space-y-5 p-5">
              <div>
                <p className="text-sm text-text-secondary">Projeto web</p>
                <p className="mt-2 text-2xl font-semibold text-text-primary">
                  Estratégia, interface e código em um fluxo completo.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <div
                    className="rounded-md border border-border bg-surface-elevated p-4"
                    key={highlight}
                  >
                    <span className="mb-4 block h-1 w-10 rounded-full bg-accent" />
                    <p className="text-sm leading-6 text-text-secondary">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
              <div className="rounded-md border border-border bg-surface-elevated p-4 font-mono text-sm leading-7 text-text-secondary">
                <p>
                  <span className="text-accent">const</span> solução ={" "}
                  <span className="text-text-primary">
                    "web moderna, clara e escalável"
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
