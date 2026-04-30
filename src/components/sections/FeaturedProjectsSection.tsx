import { ProjectCard } from "@/components/project/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getFeaturedProjects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export function FeaturedProjectsSection() {
  const featuredProjects = getFeaturedProjects();

  return (
    <section
      className="border-y border-border bg-surface/40 py-16 sm:py-20"
      id="projetos"
    >
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            description="Uma seleção de interfaces, sistemas e estudos de caso preparados para mostrar abordagem técnica, organização e qualidade visual."
            eyebrow="Projetos"
            title="Projetos em destaque"
          />
          <Button className="w-fit" href="/projetos" variant="secondary">
            Ver todos
          </Button>
        </div>

        <p className="mt-8 max-w-3xl rounded-lg border border-border bg-background/60 p-4 text-sm leading-6 text-text-secondary">
          {siteConfig.projectNotice}
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
