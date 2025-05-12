import type { ReactNode } from "react";

interface SkillCardProps {
    name: string;
    icon: ReactNode;
}

export function SkillCard({ name, icon }: SkillCardProps) {
    return (
        <div className="carousel-item flex flex-col items-center gap-4 p-4 rounded-lg hover:bg-muted transition-colors">
            <div
                className="w-16 h-16 flex items-center justify-center text-primary"
                aria-hidden="true"
            >
                <div className="w-10 h-10">{icon}</div>
            </div>
            <span className="font-medium text-center">{name}</span>
        </div>
    );
}
