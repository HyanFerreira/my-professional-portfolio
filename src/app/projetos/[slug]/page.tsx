import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetails } from "@/components/project/ProjectDetails";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getProjectBySlug, projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Projeto não encontrado | Hyan Ferreira",
    };
  }

  return {
    title: `${project.title} | Hyan Ferreira`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <Container>
      <div className="pt-10">
        <Button href="/projetos" size="sm" variant="ghost">
          Voltar para projetos
        </Button>
      </div>
      <ProjectDetails project={project} />
    </Container>
  );
}
