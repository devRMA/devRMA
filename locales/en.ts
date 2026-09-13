const translations = {
  nav: {
    about: "About",
    skills: "Skills",
    projects: "Projects",
    experience: "Experience",
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
    headline: "I design distributed systems and lead the team that runs them.",
    description:
      "I technically lead the Driver Experience team at MadeiraMadeira, focusing on performance, observability, and sustainable code across the company's logistics ecosystem — from NestJS/TypeScript services to real-time event orchestration with Kafka and AWS.",
    stackLabel: "Core technologies",
    projects: "View projects",
    contact: "Get in touch",
    copyEmail: "Copy email",
    emailCopied: "Email copied!",
    stats: {
      experience: "Years of experience",
      educationValue: "Software Engineering",
      education: "Universidade Positivo · in progress, ends Dec 2026",
      leadershipValue: "Tech Lead",
      leadership: "Architecture and squad leadership",
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
      zeroDataLoss: "Typed Contracts (Avro)",
      nodeDriverApp: "Driver App (iShip)",
      nodeDriverAppSub: "Field Edge Client",
      nodeDriverAppBadge: "Field Edge",
      nodeDriverAppDetail: "Telemetry & Events",
      nodeBff: "Core NestJS API",
      nodeBffSub: "TypeScript & PostgreSQL",
      nodeBffBadge: "Core Logistics",
      nodeBffDetail: "Business Rules & Producers",
      nodeKafka: "Apache Kafka",
      nodeKafkaSub: "Event Broker",
      nodeKafkaBadge: "Distributed Messaging",
      nodeKafkaDetail: "Typed Avro Schemas",
      nodeCloud: "AWS Workers & Lambdas",
      nodeCloudSub: "Python & ECS",
      nodeCloudBadge: "Processing & Legacy",
      nodeCloudDetail: "Crons & Legacy Bridges",
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
    title: "Engineering proof",
    description:
      "Four production systems — two in logistics, two in visual screening. Each one opens with the engineering problem, the architectural decisions, and what I led.",
    openSourceTitle: "Personal and open-source projects",
    openSourceDescription:
      "Libraries and utilities I maintain outside of production work. Smaller scale, different purpose.",
    archivedBadge: "Archived",
    previewSuccess: "[SUCCESS] Modules:",
    previewArchivedStatus: "Status: Archived Lab",
    previewProductionStatus: "Memory: 24MB • Status: Production-Ready",
    previewVerified: "Architecture verified",
    case: {
      challengeTitle: "The problem",
      architectureTitle: "Architecture and trade-offs",
      resultTitle: "Outcome and leadership",
      stackTitle: "Technologies",
      evidenceTitle: "The system",
      responsiveTitle: "The same application at phone width",
      open: "See the architecture and decisions",
      kindCapture: "Capture",
      kindDiagram: "Diagram",
    },
    cases: {
      iship: {
        badge: "Tech Lead · current focus",
        team: "MadeiraMadeira · Driver Experience squad",
        title: "Orchestrating the driver journey across new services and legacy transport systems",
        subtitle:
          "The ecosystem that connects field drivers to the distribution hubs: the driver app, a NestJS API on PostgreSQL, Kafka events under Avro contracts, Python Lambdas, and the Driver Scale panel in React 19.",
        challenge:
          "The whole operational journey — load offers, check-in at the distribution hub, invoice and volume scanning, proof of delivery — has to close with high availability. And the new NestJS services had to coexist with the legacy transport systems rather than replace them in one move.",
        architecture:
          "A core NestJS/TypeScript API on PostgreSQL. It talks to the Laravel legacy through Kafka under typed Apache Avro contracts: the schema is the agreement between both sides — it costs versioning discipline and pays back in contracts that never break silently. Python Lambdas carry the scheduled calculations and the event bridges to the older systems, keeping that load off the core service. The Driver Scale panel is a React 19 microfrontend on Vite, with its own deploy cycle.",
        result:
          "As Tech Lead I run quarterly capacity planning with the PM and the Product Designer, cutting scope until the delivery fits the quarter. When something breaks, triage starts with me: New Relic, a direct database query, Microsoft Clarity — the squad is only interrupted once there is something real to fix.",
        systemName: "Driver Platform (iShip)",
        status: "Production · national logistics",
        diagramTitle: "The iShip event flow",
        alt: "A composite of six screens from the iShip driver app, the ecosystem Rafael leads technically: app launch, the day's stop list, the route on a map, a delivery detail with contact and navigation actions, and the delivery-completed confirmation. The app interface is in Brazilian Portuguese.",
      },
      isend: {
        badge: "Full Stack Developer",
        team: "MadeiraMadeira · Operational Experience squad",
        title: "Stabilising a legacy TMS and making it observable",
        subtitle:
          "A Laravel and PHP TMS on MySQL carrying the daily dispatch operation: shipping manifests, freight release, and invoice tracking.",
        challenge:
          "A large monolith — over 1,100 routes — in constant use by the daily transport operation, with no structured logging and no telemetry in place. When something broke, the investigation started by reading code instead of reading data. Bug fixes and new features had to land without stopping dispatch.",
        architecture:
          "Laravel and PHP over relational MySQL, with Python Lambdas for isolated routines that did not need to live inside the monolith. The decision was to instrument and refactor in place rather than rewrite: New Relic for tracing and structured logs, a GitHub Actions CI pipeline with coverage enforcement, and SonarQube on every pull request. A rewrite would have been cleaner and would have cost the operation — the legacy stayed standing, with a quality perimeter around it.",
        result:
          "Incidents started from telemetry: the failing route identified from data rather than from a guess. Critical routes optimised, automated tests and quality gates blocking regressions before merge, and documentation and architecture reviews leaving the system readable for whoever came next.",
        systemName: "Transportation Management System (iSend)",
        status: "Production · daily dispatch",
        alt: "A diagram, not a screenshot: a schematic of the instrumentation Rafael put into iSend. The Laravel/PHP monolith with its 1,100-plus routes sits at the centre, wired to the operational MySQL database and to the Python Lambdas; around it, New Relic receiving tracing and structured logs, and the GitHub Actions pipeline with SonarQube gating every pull request.",
        schema: {
          title: "iSend instrumentation schematic",
          caption: "Diagram drawn for this portfolio. It is not a screenshot of the system.",
          core: "Laravel/PHP monolith",
          coreSub: "Over 1,100 routes",
          db: "MySQL",
          dbSub: "Operational relational store",
          async: "AWS Lambda (Python)",
          asyncSub: "Isolated routines",
          apm: "New Relic",
          apmSub: "Tracing and structured logs",
          ci: "GitHub Actions and SonarQube",
          ciSub: "Coverage and quality gate per PR",
        },
      },
      a1: {
        badge: "IT Coordinator and Full Stack Developer",
        team: "Adam Robo",
        title: "One visual-screening flow in three modes, from the browser to the thermal printer",
        systemName: "Adam Robo A1 platform",
        status: "Production · patient screening",
        subtitle:
          "A web platform for visual screening: Snellen acuity, colour-vision testing, three exam modes, and a report printed on A4 or on a thermal printer.",
        challenge:
          "A screening exam has an order, and that order cannot depend on whoever is running it. The same protocol had to work in three modes of different length, on the desktop and on a phone, and always end in a printable report — A4 or thermal roll, two formats with opposite constraints.",
        architecture:
          "Laravel with MySQL on the back end, React.js with TypeScript on the front, delivered as a single responsive web application — no installed client, which takes version drift off the machines and puts the cost onto browser compatibility. The environment runs in Docker and ships through a GitHub Actions CI/CD pipeline; Python routines cover the work that does not belong in the request cycle.",
        result:
          "The platform went into operation screening patients, with the full exam — setup, acuity, colour vision, completion, printing — closing inside the browser. Over the same period I was coordinating Adam Robo's IT team: I took part in hiring, organised the team's work, answered for technical support, and built the deployment pipelines behind these releases.",
        shots: {
          setup:
            "The exam setup step in Rafael's A1 platform: the operator records whether the patient will wear corrective lenses and whether the test covers both eyes or only one, with a progress bar tracking the flow. The interface is in Brazilian Portuguese.",
          acuity:
            "The exam screen in the A1 platform Rafael built: a colour-vision check with three coloured targets, followed by five Snellen acuity lines from 20/200 to 20/30, each with a control for how much of the line the patient missed, plus a notes field. The interface is in Brazilian Portuguese.",
          completed:
            "The end of an exam in Rafael's A1 platform: a success confirmation and the next actions — return home, start a new test, print the report on A4, or print it on a thermal printer. The interface is in Brazilian Portuguese.",
          acuityMobile:
            "The A1 exam at phone width: the Snellen lines and the miss controls in a single column, holding the order of the protocol. The interface is in Brazilian Portuguese.",
          completedMobile:
            "The end of the A1 exam at phone width: the four closing actions, A4 and thermal printing among them, in a two-by-two grid. The interface is in Brazilian Portuguese.",
        },
      },
      electrolux: {
        badge: "IT Coordinator and Full Stack Developer",
        team: "Adam Robo · delivered to Electrolux",
        title: "The test session has to end in a signed occupational-health record",
        systemName: "Adam 4.0 — Electrolux",
        status: "Production · internal deployment",
        subtitle:
          "The occupational-health build of Adam: far and near acuity plus Ishihara testing in a dark interface, with a report gathering worker data, anamnesis, and signatures.",
        challenge:
          "In occupational health the exam result is not the end of the job: what the company needs is the record — payroll number, department, role, reason for the exam, anamnesis, per-eye result, and the signatures of the applicator and the physician. The test session had to produce that whole document, with no manual step afterwards.",
        architecture:
          "Laravel, React.js, and TypeScript over MySQL, packaged in Docker for deployment at the client. The exam runs in a dark, high-contrast interface, and the report is an output of the flow itself: every step — worker data, anamnesis, far and near acuity, Ishihara — writes into the same record, and the final document is assembled from it rather than filled in separately. The trade-off is rigidity: changing the report means changing the flow.",
        result:
          "Adam 4.0 was delivered and put into internal use at Electrolux, with the exam and the occupational-health record closing in the same flow. I ran the delivery while coordinating Adam Robo's IT team, including the Docker deployment setup and the GitHub Actions pipeline behind it.",
        shots: {
          acuity:
            "The far-acuity exam in Adam 4.0, the system Rafael delivered to Electrolux: a dark interface with six Snellen lines from 20/400 down to 20/20, each classified as normal or reduced, beside a record of the symbols the worker identified. The interface is in Brazilian Portuguese.",
          color:
            "Colour-vision testing in the Adam 4.0 system Rafael built: six Ishihara plates in a dark interface, each with its expected number and a normal-or-altered mark, plus a notes field. The interface is in Brazilian Portuguese.",
          report:
            "The occupational-health record produced by the Adam 4.0 system Rafael built: worker data (payroll number, department, role, education), anamnesis, far and near vision results per eye, the colour-vision result, and signature fields for the applicator and the physician. The document is in Brazilian Portuguese.",
        },
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
    phases: {
      title: "From apprentice to Tech Lead in five years",
      description:
        "Three phases, two companies, two domains: visual-screening devices and national logistics. The role-by-role detail is in the tabs below.",
      foundation: {
        number: "01",
        badge: "Fundamentals",
        period: "2019 — 2021",
        title: "The technical foundation",
        context: "SENAI Dr. Celso Charuri · Adam Robo",
        description:
          "The technical degree in Systems Development at SENAI Dr. Celso Charuri covered logic, SQL, modelling and testing — C on Arduino, Java on the desktop, C# with ASP.NET Core, and Python with Selenium for the final project. I joined Adam Robo as a Junior Apprentice while still in high school: customer support, Selenium test automation, and the first lines of PHP.",
      },
      leadership: {
        number: "02",
        badge: "Coordination",
        period: "2022 — 2024",
        title: "Leading a team and going through university at the same time",
        context: "Adam Robo · Universidade Positivo",
        description:
          "I moved up to Full Stack Developer at Adam Robo in January 2022 and took over IT coordination in July of that year: Laravel REST APIs, subdomain configuration, CI/CD pipelines in GitHub Actions, and running the team — hiring, task management, technical support. That same semester I started Software Engineering at Universidade Positivo. The A1 platform and the Adam 4.0 build delivered to Electrolux both come out of this period.",
      },
      scale: {
        number: "03",
        badge: "Technical leadership",
        period: "2024 — Present",
        title: "High scale and technical governance",
        context: "MadeiraMadeira · iSend and iShip",
        description:
          "I joined MadeiraMadeira in March 2024 as a Junior Full Stack Developer on the Operational Experience team, working on iSend — iTrack's TMS — where I took on observability with New Relic, quality gates with SonarQube, and the refactoring of critical areas. In June 2025 I stepped up to mid-level Full Stack and, in June 2026, to technical lead of the Driver Experience team: iShip, Kafka events under Avro contracts, NestJS services, and quarterly capacity planning.",
      },
    },
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
              "I technically lead the Driver Experience team, driving the iShip ecosystem and operational tools at distribution centers (including the Driver Scale web panel in React 19). I manage quarterly capacity planning and scope simplification with PM and Product Designer for predictable deliveries. I lead proactive incident triage and diagnostics using New Relic, direct database queries, and Microsoft Clarity before engaging the squad. Hands-on in NestJS/TypeScript backend development, creating Kafka producers and consumers with Avro schema contracts, and Python AWS Lambdas for scheduled calculations and legacy integrations. This role was formally recognized in September 2026 with my promotion to Senior Full Stack Developer.",
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
        institution: "Universidade Positivo",
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
    archDriverTelemetry:
      "iShip Ecosystem (Field Edge Client ➔ NestJS API ➔ Kafka Avro ➔ Python Lambdas)",
    archStreaming: "Asynchronous Streaming: Apache Kafka event topics with Avro",
    archProcessing: "Processing: Decoupled and resilient distributed services",
    archInfra: "Infrastructure: AWS Cloud (ECS, Lambdas in Python) with continuous observability",
    cvTitle: "Tech Lead & Senior Software Engineer | Curitiba, PR",
    cvSpecialty:
      "Specialty: Distributed systems, NestJS API with PostgreSQL, Kafka (Avro) messaging, Python Lambdas, and team tech leadership.",
    cvEducation:
      "Education: Software Engineering (Universidade Positivo) · in progress, ends Dec 2026",
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
    pauseCarousel: "Pause automatic scrolling",
    playCarousel: "Resume automatic scrolling",
    expandPositions: "View previous positions at {company}",
    collapsePositions: "Hide previous positions at {company}",
    closeCase: "Close the case (Esc key)",
    caseDialog: "Engineering case: {title}",
    openCase: "Open the engineering case: {title}",
    profilePhoto: "Portrait of Rafael Martins Alves",
    scrollToExperience: "Go to Experience section",
  },
};

export default translations;
