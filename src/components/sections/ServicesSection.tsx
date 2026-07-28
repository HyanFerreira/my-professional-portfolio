import { ServiceCard } from "@/components/service/ServiceCard";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section className="py-16 sm:py-20" id="servicos">
      <Container>
        <SectionHeader
          description="Soluções digitais para quem precisa sair da ideia e chegar a uma presença ou sistema web funcionando de verdade."
          eyebrow="Serviços"
          title="Construção web para negócios, profissionais e projetos sob medida."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              className={index === services.length - 1 ? "lg:col-start-2" : ""}
              key={service.title}
              revealDelay={index % 3}
              service={service}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
