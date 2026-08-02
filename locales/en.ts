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
    badge: "Full Stack Developer at MadeiraMadeira",
    role: "Full Stack Developer",
    description:
      "I build large-scale systems with Laravel, PHP, and TypeScript, focused on performance, observability, and maintainable code — software that stays easy to evolve long after it ships.",
    stackLabel: "Core technologies",
    projects: "View projects",
    contact: "Get in touch",
    stats: {
      experience: "Years of experience",
      certificates: "Certifications",
      companies: "Companies",
    },
  },
  skills: {
    title: "Skills",
    description:
      "The technologies I use day to day, the ones I'm going deeper on right now, and the ones I plan to explore next.",
    tabs: {
      know: "Used",
      studying: "Studying",
      future: "Want to learn",
    },
  },
  projects: {
    title: "Projects",
    description:
      "Personal and study projects, all open source on GitHub. Each one started from a real problem I wanted to solve or understand better.",
    items: {
      1: {
        title: "Androxus",
        shortDescription: "Discord bot in Python",
        longDescription:
          "A bot developed in Python for Discord, with custom commands and modular logic.",
      },
      2: {
        title: "Python Stopwatch2",
        shortDescription: "Python time measurement library",
        longDescription:
          "A simple and reusable library to measure code execution time in Python. Ideal for performance testing, benchmarks, and logging.",
      },
      3: {
        title: "Pybot with Docker",
        shortDescription: "Discord bot with Docker support",
        longDescription: "Example structure for a Discord bot in Python using Docker.",
      },
      4: {
        title: "Stock Trader",
        shortDescription: "Stock trading simulation game",
        longDescription:
          "Simple game created with Vue.js (frontend) and Laravel (backend), where users can simulate trading stocks from fictional companies, with dynamically changing prices.",
      },
    },
  },
  experience: {
    title: "Experience",
    description:
      "My professional and academic path: the companies I've worked for, the roles I've held, and the education behind it.",
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
            title: "Full Stack Developer",
            period: "June 2025 - Present",
            description:
              "Focused on performance, observability, and best development practices. I work on improving scalability and efficiency, implementing monitoring strategies with logs and metrics, refactoring critical code areas, and ensuring quality through tests, documentation, and architecture reviews.",
          },
          {
            title: "Junior Full Stack Developer",
            period: "March 2024 - May 2025",
            description:
              "Worked on the iSend logistics system from iTrack, fixing bugs, developing new features, and continuous improvement. Used Laravel and relational databases, and implemented unit/integration tests, code standardization, and documentation. Collaborated with developers to deliver efficient and sustainable solutions.",
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
      "Certifications and courses completed throughout my career. Click any of them to view the certificate and verify it at the source.",
    tabs: {
      frontend: "Frontend",
      backend: "Backend",
      devops: "DevOps",
      other: "Others",
    },
    verify: "Verify certificate",
    items: {
      1: {
        title: "Vue JS 2 Course - The Complete Guide (incl. Vue Router & Vuex)",
        issuer: "Udemy",
      },
      2: {
        title: "Understanding TypeScript",
        issuer: "Udemy",
      },
      3: {
        title: "SOLID - The 5 Principles of OOP Best Practices",
        issuer: "Udemy",
      },
      4: {
        title: "Regular Expressions Fundamentals (Regex)",
        issuer: "Udemy",
      },
      5: {
        title: "SASS and SCSS from Basics to Advanced + Projects",
        issuer: "Udemy",
      },
      6: {
        title: "Docker: Essential Tool for Developers",
        issuer: "Udemy",
      },
      7: {
        title: "Advanced Web Development with PHP, Laravel, and Vue.JS",
        issuer: "Udemy",
      },
      8: {
        title: "Docker for Developers (with Docker Swarm and Kubernetes)",
        issuer: "Udemy",
      },
      9: {
        title: "Complete Vue JS 3 with Composition API, Vuex & Vue Router",
        issuer: "Udemy",
      },
      10: {
        title: "GUI for Python Apps with GTK and Glade",
        issuer: "Udemy",
      },
      11: {
        title: "Complete Agile Management with Scrum",
        issuer: "Udemy",
      },
      12: {
        title: "PRO FIGMA | UI DESIGN with Figma from Zero to Expert",
        issuer: "Udemy",
      },
      13: {
        title: "AWS Solutions Architect Associate SAA-C03 Certification",
        issuer: "Udemy",
      },
      14: {
        title: "Software Architecture Fundamentals",
        issuer: "Desenvolvedor.io",
      },
    },
  },
  contact: {
    title: "Contact",
    description:
      "I'm open to conversations about projects, opportunities, and collaborations. Pick whichever channel works best — I usually reply within one business day.",
    connect: {
      title: "Let's talk",
      description: "You can reach me through the channels below:",
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
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
    scrollToSkills: "Go to the Skills section",
    pauseCarousel: "Pause automatic scrolling",
    playCarousel: "Resume automatic scrolling",
    expandPositions: "Show previous positions at {company}",
    collapsePositions: "Hide previous positions at {company}",
    viewCertificate: "View certificate: {title}",
  },
};

export default translations;
