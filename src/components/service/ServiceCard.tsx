import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/service";

type ServiceCardProps = {
  className?: string;
  service: Service;
};

export function ServiceCard({ className, service }: ServiceCardProps) {
  return (
    <Card
      className={cn(
        "h-full hover:-translate-y-1 hover:border-accent/45",
        className,
      )}
    >
      <h3 className="text-xl font-semibold text-text-primary">
        {service.title}
      </h3>
      <p className="mt-3 leading-7 text-text-secondary">
        {service.description}
      </p>
      <ul className="mt-6 space-y-3">
        {service.deliverables.map((deliverable) => (
          <li
            className="flex gap-3 text-sm leading-6 text-text-secondary"
            key={deliverable}
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>{deliverable}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
