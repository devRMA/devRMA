import { Badge } from "@/components/ui/badge";

interface ExperiencePositionProps {
  title: string;
  period: string;
  description: string;
  technologies: string[];
  isPrevious?: boolean;
}

export function ExperiencePosition({
  title,
  period,
  description,
  technologies,
  isPrevious = false,
}: Readonly<ExperiencePositionProps>) {
  return (
    <div className={isPrevious ? "relative pl-4 border-l border-border" : ""}>
      <h4 className="font-medium text-base">{title}</h4>
      <p className="text-sm text-muted-foreground mb-2">{period}</p>
      <p className="text-sm">{description}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {technologies.map((tech) => (
          <Badge key={tech} variant="outline" className="text-xs">
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
}
