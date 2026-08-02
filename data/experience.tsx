type DateRange = {
  startDate: string;
  endDate?: string;
};

type Position = DateRange & {
  title: string;
  period: string;
  description: string;
  technologies: string[];
};

type Company = DateRange & {
  id: string;
  name: string;
  period: string;
  positions: Position[];
};

type Education = DateRange & {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
  inProgress: boolean;
  achievements?: string[];
};

export const experienceData: Company[] = [
  {
    id: "madeira-madeira",
    name: "MadeiraMadeira",
    period: "March 2024 - Present",
    startDate: "2024-03-18",
    positions: [
      {
        title: "Full Stack Developer",
        period: "June 2025 - Present",
        startDate: "2025-06-01",
        description:
          "Focused on performance, observability, and best development practices. I work on improving scalability and efficiency, implementing monitoring strategies with logs and metrics, refactoring critical code areas, and ensuring quality through tests, documentation, and architecture reviews.",
        technologies: ["Laravel", "Vue.js", "MySQL", "AWS", "Docker", "Python"],
      },
      {
        title: "Junior Full Stack Developer",
        period: "March 2024 - May 2025",
        startDate: "2024-03-18",
        endDate: "2025-05-31",
        description:
          "Worked on the iSend logistics system from iTrack, fixing bugs, developing new features, and continuous improvement. Used Laravel and relational databases, and implemented unit/integration tests, code standardization, and documentation. Collaborated with developers to deliver efficient and sustainable solutions.",
        technologies: ["Laravel", "Vue.js", "MySQL", "AWS", "Docker"],
      },
    ],
  },
  {
    id: "adam-robo",
    name: "Adam Robo",
    period: "June 2021 - March 2024",
    startDate: "2021-06-14",
    endDate: "2024-03-17",
    positions: [
      {
        title: "IT Coordinator",
        period: "July 2022 - March 2024",
        startDate: "2022-07-01",
        endDate: "2024-03-17",
        description:
          "Managed subdomain configurations, created CI/CD pipelines with GitHub Actions for application deployment, and developed REST APIs with Laravel. Also led the IT team, taking part in recruitment, task management, and technical support, gaining valuable hands-on leadership and team management experience.",
        technologies: ["Laravel", "React.js", "TypeScript", "MySQL", "Docker", "Python"],
      },
      {
        title: "Full Stack Developer",
        period: "January 2022 - June 2022",
        startDate: "2022-01-01",
        endDate: "2022-06-30",
        description:
          "Worked on monolithic systems development, handling both backend (Laravel) and frontend (Blade templates, HTML, CSS), delivering complete solutions.",
        technologies: [
          "Laravel",
          "jQuery",
          "Blade",
          "React.js",
          "TypeScript",
          "MySQL",
          "Docker",
          "Python",
          "FileZilla",
        ],
      },
      {
        title: "Junior Apprentice",
        period: "June 2021 - December 2021",
        startDate: "2021-06-14",
        endDate: "2021-12-31",
        description:
          "During high school, I focused on customer support, test automation with Python and Selenium, and started learning PHP.",
        technologies: ["HTML", "CSS", "JavaScript", "PHP", "Bootstrap", "MySQL"],
      },
    ],
  },
];

export const academicData: Education[] = [
  {
    id: "software-engineering",
    degree: "Bachelor's in Software Engineering",
    institution: "Faculdade Positivo",
    period: "Jun 2022 - Dec 2026",
    startDate: "2022-06-01",
    description:
      "I study Software Engineering at Universidade Positivo, deepening my knowledge in algorithms, data structures, systems architecture, DevOps, and cloud computing, with practical, market-aligned focus.",
    inProgress: true,
    achievements: [
      "Participated in full app modeling, from requirements gathering to wireframes and user stories.",
      "Applied software engineering practices in academic projects, focusing on organization, analysis, and technical planning.",
      "Completed hands-on tasks solving problems using logic, algorithms, and data structures in various contexts.",
    ],
  },
  {
    id: "systems-analysis",
    degree: "Technical Degree in Systems Development",
    institution: "SENAI Dr. Celso Charuri",
    period: "Aug 2019 - Dec 2020",
    startDate: "2019-08-01",
    endDate: "2020-12-31",
    description:
      "In the SENAI technical course, I learned SQL, programming logic, modeling, and testing. Worked with C (Arduino), Java (desktop), C# with ASP.NET Core (web), Python with Selenium (testing), and HTML, CSS, JavaScript, always in a hands-on lab setting.",
    inProgress: false,
    achievements: [
      "Collaborated on simple games using programming logic, flow control, and data structures.",
      "Helped create a website with ASP.NET integrated with an Arduino for environment temperature control.",
      "Implemented end-to-end testing with Python and Selenium as part of the final project.",
    ],
  },
];
