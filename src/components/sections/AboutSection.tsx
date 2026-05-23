import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig } from "@/data/site";

const principles = [
  {
    title: "Design",
    description:
      "Interfaces claras, responsivas e alinhadas ao objetivo de cada projeto.",
  },
  {
    title: "Código",
    description:
      "Componentização, tipagem e estrutura preparada para manutenção.",
  },
  {
    title: "Estratégia",
    description:
      "Decisões técnicas orientadas pelo problema, pelo público e pelo resultado.",
  },
];

export function AboutSection() {
  return (
    <section className="py-16 sm:py-20" id="sobre">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeader
          eyebrow="Sobre"
          title="Desenvolvimento com visão de produto e execução técnica"
        />

        <div>
          <div className="space-y-5 text-lg leading-8 text-text-secondary">
            <p>{siteConfig.about}</p>
            <p>{siteConfig.aboutFocus}</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {principles.map((principle) => (
              <Card className="p-5" key={principle.title}>
                <h3 className="text-base font-semibold text-text-primary">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  {principle.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
