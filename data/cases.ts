export type CaseId = "iship" | "isend" | "a1" | "electrolux";

export type CasePlate = {
  src: string;
  width: number;
  height: number;
  sizes: string;
  /** suffix under `projects.cases.<id>.shots.` */
  altKey: string;
  aspect: "16/10" | "9/16" | "11/16";
};

export type EngineeringCase = {
  id: CaseId;
  year: string;
  variant: "capture" | "diagram";
  /** absent when variant === "diagram" */
  cover?: Omit<CasePlate, "altKey" | "aspect">;
  technologies: string[];
  /** rendered in the dialog's evidence gallery, 2-up */
  evidence: CasePlate[];
  /** rendered in the dialog as a 2-col row of portrait plates */
  mobileEvidence: CasePlate[];
  hasArchitectureBeam: boolean;
};

export const casesData: EngineeringCase[] = [
  {
    id: "iship",
    year: "2026",
    variant: "capture",
    cover: {
      src: "/projects/iship-card.webp",
      width: 1280,
      height: 720,
      sizes: "(max-width: 1024px) 100vw, 600px",
    },
    technologies: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Apache Kafka",
      "Apache Avro",
      "Python (AWS Lambda)",
      "React 19",
      "Vite",
      "New Relic",
      "Docker",
    ],
    evidence: [],
    mobileEvidence: [],
    hasArchitectureBeam: true,
  },
  {
    id: "isend",
    year: "2025–2026",
    variant: "diagram",
    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "Python (AWS Lambda)",
      "GitHub Actions",
      "SonarQube",
      "New Relic",
      "Docker",
    ],
    evidence: [],
    mobileEvidence: [],
    hasArchitectureBeam: false,
  },
  {
    id: "a1",
    year: "2022–2024",
    variant: "capture",
    cover: {
      src: "/projects/a1-card.webp",
      width: 1200,
      height: 750,
      sizes: "(max-width: 1024px) 100vw, 600px",
    },
    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "React.js",
      "TypeScript",
      "Docker",
      "Python",
      "GitHub Actions",
    ],
    evidence: [
      {
        src: "/projects/a1-setup.webp",
        width: 1248,
        height: 496,
        sizes: "(max-width: 640px) 100vw, 340px",
        altKey: "setup",
        aspect: "16/10",
      },
      {
        src: "/projects/a1-completed.webp",
        width: 1200,
        height: 600,
        sizes: "(max-width: 640px) 100vw, 340px",
        altKey: "completed",
        aspect: "16/10",
      },
    ],
    mobileEvidence: [
      {
        src: "/projects/a1-mobile-acuity.webp",
        width: 619,
        height: 1100,
        sizes: "(max-width: 640px) 50vw, 170px",
        altKey: "acuityMobile",
        aspect: "9/16",
      },
      {
        src: "/projects/a1-mobile-completed.webp",
        width: 619,
        height: 1100,
        sizes: "(max-width: 640px) 50vw, 170px",
        altKey: "completedMobile",
        aspect: "9/16",
      },
    ],
    hasArchitectureBeam: false,
  },
  {
    id: "electrolux",
    year: "2022–2024",
    variant: "capture",
    cover: {
      src: "/projects/electrolux-card.webp",
      width: 1200,
      height: 750,
      sizes: "(max-width: 1024px) 100vw, 600px",
    },
    technologies: ["Laravel", "PHP", "MySQL", "React.js", "TypeScript", "Docker"],
    evidence: [
      {
        src: "/projects/electrolux-ishihara.webp",
        width: 1280,
        height: 798,
        sizes: "(max-width: 640px) 100vw, 340px",
        altKey: "color",
        aspect: "16/10",
      },
      {
        src: "/projects/electrolux-report.webp",
        width: 880,
        height: 1283,
        sizes: "(max-width: 640px) 100vw, 340px",
        altKey: "report",
        aspect: "11/16",
      },
    ],
    mobileEvidence: [],
    hasArchitectureBeam: false,
  },
];
