import { Badge } from "@/components/ui/Badge";

type SkillBadgeProps = {
  skill: string;
};

export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <Badge className="bg-surface text-text-primary hover:border-accent/55 hover:text-accent">
      {skill}
    </Badge>
  );
}
