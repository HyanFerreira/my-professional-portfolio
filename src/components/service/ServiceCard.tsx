import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/service";

type ServiceCardProps = {
  className?: string;
  revealDelay?: number;
  service: Service;
};

export function ServiceCard({
  className,
  revealDelay = 0,
  service,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "h-full",
        className,
      )}
      data-reveal
      data-reveal-delay={revealDelay}
    >
      <Card className="h-full transform-gpu transition-[transform,border-color] duration-300 ease-out hover:border-accent/55 hover:[transform:translate3d(0,-0.375rem,0)]">
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
    </div>
  );
}
