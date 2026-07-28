import { ContactModal } from "@/components/contact/ContactModal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";

export function ContactSection() {
  return (
    <section className="py-16 sm:py-20" id="contato">
      <Container>
        <div
          className="rounded-lg border border-border bg-surface-elevated p-6 shadow-[var(--shadow-feature)] sm:p-8 lg:p-10"
          data-reveal
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                Contato
              </p>
              <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold text-text-primary sm:text-4xl">
                Tem uma ideia de site, sistema ou projeto web? Vamos conversar.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-text-secondary">
                Me envie uma mensagem com o contexto do projeto, objetivo e
                prazo desejado. Você pode falar comigo pelo e-mail{" "}
                <span className="font-mono text-text-primary">
                  {siteConfig.email}
                </span>{" "}
                ou pelo WhatsApp{" "}
                <span className="font-mono text-text-primary">
                  {siteConfig.phone}
                </span>
                .
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ContactModal />
              <Button
                href={siteConfig.whatsapp}
                rel="noreferrer"
                size="lg"
                target="_blank"
                variant="secondary"
              >
                Chamar no WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
