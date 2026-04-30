import { SkillBadge } from "@/components/skill/SkillBadge";
import { Card } from "@/components/ui/Card";
import type { SkillGroup as SkillGroupType } from "@/types/skill";

type SkillGroupProps = {
  group: SkillGroupType;
};

export function SkillGroup({ group }: SkillGroupProps) {
  return (
    <Card className="h-full">
      <h3 className="text-lg font-semibold text-text-primary">{group.title}</h3>
      <div className="mt-5 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <SkillBadge key={skill} skill={skill} />
        ))}
      </div>
    </Card>
  );
}
