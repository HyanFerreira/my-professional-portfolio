import { Badge } from "@/components/ui/Badge";

type ProjectTechListProps = {
  technologies: string[];
};

export function ProjectTechList({ technologies }: ProjectTechListProps) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tecnologias utilizadas">
      {technologies.map((technology) => (
        <li key={technology}>
          <Badge>{technology}</Badge>
        </li>
      ))}
    </ul>
  );
}
