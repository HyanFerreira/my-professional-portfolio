import Image from "next/image";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { ProjectTechList } from "@/components/project/ProjectTechList";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/data/site";
import type { Project } from "@/types/project";

type ProjectDetailsProps = {
  project: Project;
};

export function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <article className="py-14 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div data-reveal="left">
          <Badge>{project.category}</Badge>
          <h1 className="mt-5 text-balance text-4xl font-semibold text-text-primary sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-text-secondary">
            {project.summary}
          </p>
          <div className="mt-5 rounded-lg border border-border bg-surface p-4 text-sm leading-6 text-text-secondary">
            <p>{project.notice ?? siteConfig.projectNotice}</p>
            {project.eventUrl ? (
              <a
                className="mt-2 inline-flex font-semibold text-accent transition hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                href={project.eventUrl}
                rel="noreferrer"
                target="_blank"
              >
                Conheça o Hackathon 2026
              </a>
            ) : null}
          </div>
        </div>

        <Card
          elevated
          className="p-0"
          data-reveal="right"
          data-reveal-delay="1"
        >
          {project.gallery?.length ? (
            <ProjectGallery
              images={project.gallery}
              projectTitle={project.title}
            />
          ) : (
            <div className="relative h-64 overflow-hidden rounded-t-lg border-b border-border bg-[linear-gradient(135deg,#071426_0%,#101B2D_48%,#06323F_100%)]">
              {project.image ? (
                <Image
                  alt={`Imagem do projeto ${project.title}`}
                  fill
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  src={project.image}
                />
              ) : (
                <div className="flex h-full flex-col justify-between p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-accent">
                      {project.category}
                    </span>
                    <span className="text-xs uppercase tracking-[0.18em] text-text-secondary">
                      Case
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 w-28 rounded-full bg-accent/70" />
                    <div className="h-3 w-full rounded-full bg-white/14" />
                    <div className="h-3 w-5/6 rounded-full bg-white/10" />
                    <div className="h-3 w-3/5 rounded-full bg-white/10" />
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="space-y-6 p-6">
            <ProjectTechList technologies={project.technologies} />
            <div className="flex flex-wrap gap-3">
              {project.demoUrl ? (
                <Button
                  href={project.demoUrl}
                  rel="noreferrer"
                  size="sm"
                  target="_blank"
                >
                  Abrir demo
                </Button>
              ) : null}
              {project.repositories?.map((repository) => (
                <Button
                  href={repository.url}
                  key={repository.url}
                  rel="noreferrer"
                  size="sm"
                  target="_blank"
                  variant="secondary"
                >
                  {repository.label}
                </Button>
              ))}
              {!project.repositories?.length && project.githubUrl ? (
                <Button
                  href={project.githubUrl}
                  rel="noreferrer"
                  size="sm"
                  target="_blank"
                  variant="secondary"
                >
                  Ver código
                </Button>
              ) : null}
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Card data-reveal>
          <h2 className="text-xl font-semibold text-text-primary">Desafio</h2>
          <p className="mt-4 leading-7 text-text-secondary">
            {project.challenge}
          </p>
        </Card>
        <Card data-reveal data-reveal-delay="1">
          <h2 className="text-xl font-semibold text-text-primary">Solução</h2>
          <p className="mt-4 leading-7 text-text-secondary">
            {project.solution}
          </p>
        </Card>
      </div>

      <Card className="mt-6" data-reveal>
        <h2 className="text-xl font-semibold text-text-primary">Destaques</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {project.highlights.map((highlight) => (
            <li
              className="rounded-md border border-border bg-surface-elevated p-4 text-sm leading-6 text-text-secondary"
              key={highlight}
            >
              {highlight}
            </li>
          ))}
        </ul>
      </Card>
    </article>
  );
}
