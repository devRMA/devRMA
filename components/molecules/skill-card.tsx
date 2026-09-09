import type { ReactNode } from "react";

interface SkillCardProps {
  name: string;
  icon: ReactNode;
}

export function SkillCard({ name, icon }: Readonly<SkillCardProps>) {
  return (
    <div className="carousel-item group flex flex-col items-center gap-4 rounded-lg p-4 hover:bg-muted transition-colors duration-200 ease-out hover:-translate-y-1 active:scale-[0.97] cursor-default select-none">
      <div
        className="flex h-16 w-16 items-center justify-center text-primary transition-transform duration-200 ease-out group-hover:scale-110"
        aria-hidden="true"
      >
        <div className="h-10 w-10">{icon}</div>
      </div>
      <span className="font-medium text-center">{name}</span>
    </div>
  );
}
