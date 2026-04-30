import Image from "next/image";
import { ProjectTechList } from "@/components/project/ProjectTechList";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden p-0 hover:-translate-y-1 hover:border-accent/55">
      <div className="relative h-48 overflow-hidden border-b border-border bg-surface-elevated">
        {project.image ? (
          <Image
            alt={`Prévia do projeto ${project.title}`}
            fill
            className="h-full w-full object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            src={project.image}
          />
        ) : (
          <div className="flex h-48 flex-col justify-between bg-[linear-gradient(135deg,#071426_0%,#101B2D_52%,#062E39_100%)] p-5">
            <div className="flex items-center justify-between">
              <span className="h-3 w-3 rounded-full bg-accent" />
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
                Portfolio
              </span>
            </div>
            <div>
              <div className="mb-3 h-2 w-20 rounded-full bg-accent/60" />
              <div className="space-y-2">
                <div className="h-2 w-full rounded-full bg-white/16" />
                <div className="h-2 w-4/5 rounded-full bg-white/10" />
                <div className="h-2 w-3/5 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col mt-6">
        <Badge className="w-fit">{project.category}</Badge>
        <h3 className="mt-5 text-xl font-semibold text-text-primary">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 leading-7 text-text-secondary">
          {project.description}
        </p>
        <div className="mt-6">
          <ProjectTechList technologies={project.technologies} />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={`/projetos/${project.slug}`} size="sm">
            Ver detalhes
          </Button>
          {project.demoUrl ? (
            <Button href={project.demoUrl} size="sm" variant="secondary">
              Demo
            </Button>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
