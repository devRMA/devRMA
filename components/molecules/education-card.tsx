import { Calendar } from "lucide-react";

interface EducationCardProps {
  period: string;
  description: string;
  inProgress: boolean;
  achievements?: string[];
  inProgressLabel: string;
  keyAchievementsLabel: string;
}

export function EducationCard({
  period,
  description,
  inProgress,
  achievements,
  inProgressLabel,
  keyAchievementsLabel,
}: Readonly<EducationCardProps>) {
  return (
    <>
      <div className="flex items-center mb-3">
        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" aria-hidden="true" />
        <span className="text-sm text-muted-foreground">{period}</span>
        {inProgress && (
          <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            {inProgressLabel}
          </span>
        )}
      </div>
      <p className="text-sm">{description}</p>
      {achievements && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">{keyAchievementsLabel}</h4>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {achievements.map((achievement) => (
              <li key={`achievement-${achievement}`}>{achievement}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
