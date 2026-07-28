import { SkillBadge } from "@/components/skill/SkillBadge";
import { Card } from "@/components/ui/Card";
import type { SkillGroup as SkillGroupType } from "@/types/skill";

type SkillGroupProps = {
  group: SkillGroupType;
  revealDelay?: number;
};

export function SkillGroup({ group, revealDelay = 0 }: SkillGroupProps) {
  return (
    <Card className="h-full" data-reveal data-reveal-delay={revealDelay}>
      <h3 className="text-lg font-semibold text-text-primary">{group.title}</h3>
      <div className="mt-5 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <SkillBadge key={skill} skill={skill} />
        ))}
      </div>
    </Card>
  );
}
