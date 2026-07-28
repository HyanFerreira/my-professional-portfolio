import { SkillGroup } from "@/components/skill/SkillGroup";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skillGroups } from "@/data/skills";

export function SkillsSection() {
  return (
    <section
      className="border-y border-border bg-surface/35 py-16 sm:py-20"
      id="tecnologias"
    >
      <Container>
        <SectionHeader
          description="Tecnologias que uso para construir interfaces modernas, sistemas administrativos, integrações e projetos web completos."
          eyebrow="Tecnologias"
          title="Stack organizada para entregar projetos completos"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, index) => (
            <SkillGroup
              group={group}
              key={group.title}
              revealDelay={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
