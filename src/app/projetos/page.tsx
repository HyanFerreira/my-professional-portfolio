import type { Metadata } from "next";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Projetos | Hyan Ferreira",
  description:
    "Projetos de sites, sistemas web, dashboards, catálogos digitais e landing pages desenvolvidos por Hyan Ferreira.",
};

export default function ProjectsPage() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeader
          description="Projetos, estudos de caso e versões adaptadas para portfólio com foco em arquitetura, experiência e execução técnica."
          eyebrow="Portfólio"
          reveal={false}
          title="Projetos desenvolvidos"
        />

        <p className="mt-8 max-w-3xl rounded-lg border border-border bg-surface p-4 text-sm leading-6 text-text-secondary">
          {siteConfig.projectNotice}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} reveal={false} />
          ))}
        </div>
      </Container>
    </section>
  );
}
