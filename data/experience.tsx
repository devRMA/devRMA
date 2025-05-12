type Position = {
    title: string;
    period: string;
    description: string;
    technologies: string[];
};

type Company = {
    id: string;
    name: string;
    period: string;
    positions: Position[];
};

type Education = {
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
        id: "tech-innovations",
        name: "Tech Innovations Inc.",
        period: "Jan 2020 - Present",
        positions: [
            {
                title: "Senior Full Stack Developer",
                period: "Jan 2022 - Present",
                description:
                    "Leading development of enterprise web applications, mentoring junior developers, and implementing CI/CD pipelines for streamlined deployments.",
                technologies: [
                    "Next.js",
                    "TypeScript",
                    "Node.js",
                    "PostgreSQL",
                    "AWS",
                    "Docker",
                ],
            },
            {
                title: "Full Stack Developer",
                period: "Jan 2020 - Dec 2021",
                description:
                    "Developed and maintained multiple client web applications, implemented responsive designs, and integrated third-party APIs for enhanced functionality.",
                technologies: [
                    "React",
                    "JavaScript",
                    "Express",
                    "MongoDB",
                    "Redux",
                    "Bootstrap",
                ],
            },
        ],
    },
    {
        id: "digital-solutions",
        name: "Digital Solutions Ltd.",
        period: "Mar 2018 - Dec 2019",
        positions: [
            {
                title: "Frontend Developer",
                period: "Jun 2019 - Dec 2019",
                description:
                    "Created responsive and interactive user interfaces for client websites, collaborated with designers to implement pixel-perfect designs, and optimized web performance.",
                technologies: [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "Vue.js",
                    "SASS",
                    "Webpack",
                ],
            },
            {
                title: "Junior Web Developer",
                period: "Mar 2018 - May 2019",
                description:
                    "Assisted in developing web applications, fixed bugs, and implemented new features under senior developer guidance.",
                technologies: [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "PHP",
                    "jQuery",
                    "MySQL",
                ],
            },
        ],
    },
    {
        id: "startup-ventures",
        name: "StartUp Ventures",
        period: "Jan 2017 - Feb 2018",
        positions: [
            {
                title: "Web Development Intern",
                period: "Jan 2017 - Feb 2018",
                description:
                    "Gained hands-on experience in web development, assisted senior developers with coding tasks, and participated in team meetings and code reviews.",
                technologies: ["HTML", "CSS", "JavaScript", "PHP", "WordPress"],
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
        description:
            "Comprehensive program covering software development methodologies, algorithms, data structures, database management, and software architecture. Focus on practical applications and industry-relevant skills.",
        inProgress: true,
        achievements: [
            "Maintained a GPA of 3.8/4.0",
            "Developed a full-stack application for the university's internal use",
            "Participated in the university's programming competition, securing 2nd place",
        ],
    },
    {
        id: "systems-analysis",
        degree: "Technical Course in Systems Analysis and Development",
        institution: "SENAI",
        period: "Aug 2019 - Dec 2020",
        description:
            "Technical program focused on practical software development skills, including programming fundamentals, database design, and web development. Emphasis on hands-on projects and industry collaboration.",
        inProgress: false,
        achievements: [
            "Graduated with distinction",
            "Developed an inventory management system as final project",
            "Completed an internship at a local software company during the course",
        ],
    },
];
