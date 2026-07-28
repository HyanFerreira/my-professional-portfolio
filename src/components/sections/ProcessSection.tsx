import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { processSteps } from "@/data/process";

export function ProcessSection() {
  return (
    <section className="py-16 sm:py-20" id="processo">
      <Container>
        <SectionHeader
          description="Um fluxo direto para transformar a necessidade inicial em uma entrega web clara, testável e pronta para evoluir."
          eyebrow="Processo"
          title="Da primeira conversa à publicação"
        />

        <ol className="mt-10 grid gap-5 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <li
              className="rounded-lg border border-border bg-surface p-5"
              data-reveal
              data-reveal-delay={index}
              key={step.title}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-md border border-accent/35 bg-accent/10 font-mono text-sm font-semibold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-text-primary">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-text-secondary">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
