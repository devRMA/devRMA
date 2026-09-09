const translations = {
  nav: {
    about: "About",
    skills: "Skills",
    projects: "Projects",
    experience: "Experience",
    certificates: "Certificates",
    contact: "Contact",
  },
  theme: {
    toggle: "Toggle theme",
    light: "Light",
    dark: "Dark",
    system: "System",
  },
  language: {
    toggle: "Toggle language",
  },
  hero: {
    badge: "Tech Lead @ MadeiraMadeira",
    role: "Tech Lead & Senior Developer",
    headline:
      "Architecting scalable distributed systems and leading high-impact event-driven engineering.",
    description:
      "I technically lead the Driver Experience team at MadeiraMadeira, focusing on performance, observability, and sustainable code across the company's logistics ecosystem — from NestJS/TypeScript services to real-time event orchestration with Kafka and AWS.",
    stackLabel: "Core technologies",
    projects: "View projects",
    contact: "Get in touch",
    copyEmail: "Copy email",
    emailCopied: "Email copied!",
    stats: {
      experience: "Years of experience",
      certificates: "Certifications",
      companies: "Companies",
    },
  },
  skills: {
    title: "Skills & Specialties",
    description:
      "Core technologies, distributed systems architecture, and engineering domains I lead or master.",
    tabs: {
      know: "Used",
      studying: "Studying",
      future: "Want to learn",
    },
    bento: {
      architectureTitle: "Event-Driven Architecture",
      architectureDescription:
        "Asynchronous flow connecting driver app, NestJS API backed by PostgreSQL, and event broker",
      nodeDriverApp: "Driver App (iShip)",
      nodeDriverAppSub: "Flutter & Firebase",
      nodeBff: "Core NestJS API",
      nodeBffSub: "TypeScript & PostgreSQL",
      nodeKafka: "Apache Kafka",
      nodeKafkaSub: "Event Broker",
      nodeCloud: "AWS Cloud",
      nodeCloudSub: "ECS, Lambda (Python) & Terraform",
      yearsValue: "5+ Years",
      yearsExp: "Years of continuous software engineering",
      scaleValue: "High Scale",
      systemsScale: "Mission-critical logistics & real-time events",
      locationTitle: "Location",
      locationValue: "Curitiba, PR — Brazil (UTC-3)",
      liveBadge: "Live",
    },
  },
  projects: {
    title: "Projects & Case Studies",
    description:
      "Production systems at MadeiraMadeira and open-source software. Each built from a real engineering challenge.",
    openSourceTitle: "Personal & Open Source Projects",
    archivedBadge: "Archived",
    cases: {
      iship: {
        badge: "Current Focus • Tech Lead",
        team: "MadeiraMadeira • Driver Experience Team",
        title: "iShip — Driver Mobile App & Platform",
        subtitle:
          "Mobile app in Flutter and Firebase, orchestrated by the core NestJS API backed by PostgreSQL, managing the end-to-end driver journey from DC loading to delivery.",
        challengeTitle: "The Challenge",
        challenge:
          "Connect field drivers to nationwide distribution hubs with high availability, integrating the Flutter app via Firebase with the primary NestJS API using event-driven asynchronous messaging.",
        architectureTitle: "The Architecture",
        architecture:
          "Core NestJS / TypeScript API backed by PostgreSQL database, using KafkaJS and Outbox pattern for resilient asynchronous messaging with the transportation system (TMS), alongside AWS Lambda functions in Python for targeted processing and lightweight logic. Flutter mobile app with Firebase, and React panel with Vitest and SonarCloud.",
        resultTitle: "The Result",
        result:
          "Unified and observable driver journey from end to end, reduced staging times at distribution hubs, and high operational stability.",
        tagline: "Mission-Critical Architecture",
      },
      isend: {
        badge: "Backend Developer",
        team: "MadeiraMadeira • Operational Experience Team",
        title: "iSend — Transportation Management System (TMS)",
        subtitle:
          "Core transportation management system with over 1,100 routes in Laravel and PHP for freight dispatch and cargo tracking.",
        challengeTitle: "The Challenge",
        challenge:
          "Maintain stability, resolve complex bugs, and deliver features on a mission-critical platform with 1,100+ routes heavily used in daily freight operations.",
        architectureTitle: "The Architecture",
        architecture:
          "Laravel / PHP with relational MySQL and AWS Lambda functions in Python for specific routines and support tasks. Implementation of GitHub Actions CI pipelines with coverage enforcement and continuous SonarQube integration for automated PR analysis.",
        resultTitle: "The Result",
        result:
          "Substantial improvement in log traceability and observability with New Relic, performance optimizations in critical routes, and code quality standards with automated testing.",
        tagline: "Code Quality & CI/CD",
      },
    },
    items: {
      1: {
        title: "Androxus",
        shortDescription: "Discord bot in Python with PostgreSQL",
        longDescription:
          "Modular Discord bot built in Python using discord.py and relational PostgreSQL hosted on AWS RDS, featuring math and utility commands. Archived project.",
      },
      2: {
        title: "Python Stopwatch2",
        shortDescription: "Python time measurement and benchmark library",
        longDescription:
          "Simple and reusable library to measure execution time of Python code blocks, with support for comparative benchmarks and performance logging.",
      },
      3: {
        title: "Pybot with Docker",
        shortDescription: "Discord bot starter template with Docker and Redis",
        longDescription:
          "Base template created as an educational reference for developers building Discord bots using Python, Docker Compose, PostgreSQL, and Redis. Archived project.",
      },
      4: {
        title: "Stock Trader",
        shortDescription: "Stock trading simulation game with Vue.js and Laravel",
        longDescription:
          "Simulated stock market trading game featuring a Vue.js / Vuex frontend and a Laravel / PHP REST API with interactive documentation. Archived project.",
      },
    },
  },
  experience: {
    title: "Experience",
    description:
      "My professional and academic path: the companies I've worked for, the roles I've held, and the education behind it.",
    progression: {
      label: "Career progression:",
      intern: "Junior Apprentice",
      fullstack: "Full Stack Developer",
      techlead: "Tech Lead & Senior",
    },
    tabs: {
      professional: "Professional",
      academic: "Academic",
    },
    previousPositions: "Previous positions",
    inProgress: "In progress",
    keyAchievements: "Key achievements",
    companies: {
      "madeira-madeira": {
        name: "MadeiraMadeira",
        period: "March 2024 - Present",
        positions: [
          {
            title: "Tech Lead",
            period: "June 2026 - Present",
            description:
              "I technically lead the Driver Experience team, driving development of iShip — the app that follows drivers from loading to final delivery — along with the systems that support operations at our distribution centers. I define architecture decisions, guide the team, and stay hands-on in the code with NestJS/TypeScript and Python (AWS Lambda), orchestrating real-time events with Kafka to connect this ecosystem to the rest of the company's logistics operation. This role was formally recognized in September 2026 with my promotion to Senior Full Stack Developer.",
          },
          {
            title: "Full Stack Developer",
            period: "June 2025 - May 2026",
            description:
              "Focused on performance, observability, and best development practices on the Operational Experience team behind iTrack's iSend (TMS). I worked to improve the application's scalability and efficiency across 1,100+ routes and Python lambdas for auxiliary routines, implementing CI pipelines in GitHub Actions with SonarQube, log structuring and monitoring, refactoring critical areas of the system, and ensuring quality through unit and integration testing.",
          },
          {
            title: "Junior Full Stack Developer",
            period: "March 2024 - May 2025",
            description:
              "Worked on the Operational Experience team, dedicated to iSend — iTrack's transportation management system (TMS) — fixing bugs, developing new features, and driving continuous improvement with Laravel and MySQL. I implemented automated tests, code standardization, and documentation in close collaboration with the engineering team.",
          },
        ],
      },
      "adam-robo": {
        name: "Adam Robo",
        period: "June 2021 - March 2024",
        positions: [
          {
            title: "IT Coordinator",
            period: "July 2022 - March 2024",
            description:
              "Managed subdomain configurations, created CI/CD pipelines with GitHub Actions for application deployment, and developed REST APIs with Laravel. Also led the IT team, taking part in recruitment, task management, and technical support, gaining valuable hands-on leadership and team management experience.",
          },
          {
            title: "Full Stack Developer",
            period: "January 2022 - June 2022",
            description:
              "Worked on monolithic systems development, handling both backend (Laravel) and frontend (Blade templates, HTML, CSS), delivering complete solutions.",
          },
          {
            title: "Junior Apprentice",
            period: "June 2021 - December 2021",
            description:
              "During high school, I focused on customer support, test automation with Python and Selenium, and started learning PHP.",
          },
        ],
      },
    },
    education: {
      "software-engineering": {
        degree: "Bachelor's in Software Engineering",
        institution: "Faculdade Positivo",
        period: "Jun 2022 - Dec 2026",
        description:
          "I study Software Engineering at Universidade Positivo, deepening my knowledge in algorithms, data structures, systems architecture, DevOps, and cloud computing, with practical, market-aligned focus.",
        achievements: [
          "Participated in full app modeling, from requirements gathering to wireframes and user stories.",
          "Applied software engineering practices in academic projects, focusing on organization, analysis, and technical planning.",
          "Completed hands-on tasks solving problems using logic, algorithms, and data structures in various contexts.",
        ],
      },
      "systems-analysis": {
        degree: "Technical Degree in Systems Development",
        institution: "SENAI Dr. Celso Charuri",
        period: "Aug 2019 - Dec 2020",
        description:
          "In the SENAI technical course, I learned SQL, programming logic, modeling, and testing. Worked with C (Arduino), Java (desktop), C# with ASP.NET Core (web), Python with Selenium (testing), and HTML, CSS, JavaScript, always in a hands-on lab setting.",
        achievements: [
          "Collaborated on simple games using programming logic, flow control, and data structures.",
          "Helped create a website with ASP.NET integrated with an Arduino for environment temperature control.",
          "Implemented end-to-end testing with Python and Selenium as part of the final project.",
        ],
      },
    },
  },
  certificates: {
    title: "Certificates",
    description:
      "Certificates and courses completed throughout my career. Click any item to inspect the certificate and verify origin.",
    tabs: {
      frontend: "Frontend",
      backend: "Backend",
      devops: "DevOps",
      other: "Other",
    },
    verify: "Verify certificate",
    items: {
      1: {
        title: "Curso Vue JS 2 - O Guia Completo (incl. Vue Router & Vuex)",
        issuer: "Udemy",
      },
      2: {
        title: "Entendendo TypeScript",
        issuer: "Udemy",
      },
      3: {
        title: "SOLID - Os 5 Princípios Para as Boas Práticas da POO",
        issuer: "Udemy",
      },
      4: {
        title: "Fundamentos de Expressões Regulares (Regex)",
        issuer: "Udemy",
      },
      5: {
        title: "SASS e SCSS do básico ao avançado + Projetos",
        issuer: "Udemy",
      },
      6: {
        title: "Docker: Ferramenta essencial para Desenvolvedores",
        issuer: "Udemy",
      },
      7: {
        title: "Desenvolvimento Web Avançado com PHP, Laravel e Vue.JS",
        issuer: "Udemy",
      },
      8: {
        title: "Docker para Desenvolvedores (com Docker Swarm e Kubernetes)",
        issuer: "Udemy",
      },
      9: {
        title: "Vue JS 3 Completo com Composition API, Vuex & Vue Router",
        issuer: "Udemy",
      },
      10: {
        title: "Interface Gráfica para Apps Python com GTK e Glade",
        issuer: "Udemy",
      },
      11: {
        title: "Gestão Ágil com Scrum COMPLETO",
        issuer: "Udemy",
      },
      12: {
        title: "PRO FIGMA | UI DESIGN com Figma do Zero ao especialista",
        issuer: "Udemy",
      },
      13: {
        title: "Certificação AWS Solutions Architect Associate SAA-C03",
        issuer: "Udemy",
      },
      14: {
        title: "Fundamentos de Arquitetura de Software",
        issuer: "Desenvolvedor.io",
      },
    },
  },
  contact: {
    title: "Contact",
    description:
      "I'm open to conversations about projects, opportunities, and collaborations. Pick whichever channel you prefer — I usually reply within one business day.",
    connect: {
      title: "Let's connect",
      description: "You can find me on the channels below:",
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
  },
  terminal: {
    title: "Interactive Terminal",
    description:
      "For developers and technical recruiters — explore CLI commands right in your browser:",
    placeholder: "type a command (e.g. help, stack, contact)...",
    commandAriaLabel: "Terminal command",
    shortcutsLabel: "Quick shortcuts:",
    availableCommands: "Available commands:",
    stackTitle: "Primary Stack:",
    architectureTitle: "Logistics Ecosystem (MadeiraMadeira):",
    trajectoryTitle: "Rafael Martins Alves — Trajectory:",
    trajectoryItem1: "2026 - Present: Tech Lead & Senior Developer @ MadeiraMadeira",
    trajectoryItem2: "2025 - 2026: Mid-Level Full Stack Developer @ MadeiraMadeira",
    trajectoryItem3: "2024 - 2025: Junior Full Stack Developer @ MadeiraMadeira",
    trajectoryItem4: "2021 - 2024: IT Coordinator / Full Stack Developer @ Adam Robo",
    channelsTitle: "Direct Channels:",
    unknownCommand: 'Unknown command: "{command}". Type "help" to see available commands.',
    rootDenied: "Root access denied: you already have special visitor privileges!",
    helpStack: "Primary technologies and core tools",
    helpArchitecture: "Overview of event-driven architecture",
    helpExperience: "Current role and career progression",
    helpContact: "Direct contact channels",
    helpCv: "Technical resume overview",
    helpClear: "Clear terminal screen",
    stackBackend: "Backend: NestJS, TypeScript, Node.js, PHP, Laravel, Python",
    stackMessaging: "Messaging & Events: Apache Kafka, RabbitMQ",
    stackCloud:
      "Cloud & DevOps: AWS (ECS, Lambda, RDS, SQS), Terraform, Docker, GitHub Actions, Linux",
    stackDatabases: "Databases: PostgreSQL, MySQL, Redis",
    stackFrontend: "Frontend: Next.js, React, Tailwind CSS, TypeScript",
    archDriverTelemetry: "Driver App (iShip) in Flutter & Firebase ➔ NestJS API with PostgreSQL",
    archStreaming: "Asynchronous Streaming: Apache Kafka event topics",
    archProcessing: "Processing: Decoupled and resilient distributed services",
    archInfra:
      "Infrastructure: AWS Cloud (ECS, Lambda in Python, Terraform) with continuous observability",
    cvTitle: "Tech Lead & Software Architect | Curitiba, PR",
    cvSpecialty:
      "Specialty: Distributed systems, NestJS API with PostgreSQL, Python Lambdas, Kafka, and AWS Cloud (Terraform/ECS).",
    cvEducation: "Education: Bachelor of Software Engineering (Universidade Positivo)",
    cvStatus: "Status: Available for technical leadership and high-impact systems",
  },
  footer: {
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },
  a11y: {
    skipToContent: "Skip to content",
    githubProfile: "GitHub profile (opens in a new tab)",
    linkedinProfile: "LinkedIn profile (opens in a new tab)",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mobileNavigation: "Main navigation",
    scrollToSkills: "Go to Skills section",
    pauseCarousel: "Pause automatic scrolling",
    playCarousel: "Resume automatic scrolling",
    expandPositions: "View previous positions at {company}",
    collapsePositions: "Hide previous positions at {company}",
    viewCertificate: "View certificate: {title}",
  },
};

export default translations;
