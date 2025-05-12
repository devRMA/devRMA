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
        description:
            "Full Stack Developer passionate about creating modern, scalable, and high-performance web solutions.",
        downloadCV: "Download CV",
        contact: "Get in touch",
    },
    skills: {
        title: "Skills",
        description:
            "Technologies and tools I use to develop complete and efficient solutions.",
        tabs: {
            know: "I already know",
            studying: "I'm studying",
            future: "I want to learn",
        },
        learning: "Learning",
        iKnow: "I know",
        iUsed: "I've used",
    },
    projects: {
        title: "Projects",
        description:
            "Some of the projects I've developed, showcasing my skills and experience.",
        items: {
            1: {
                title: "E-commerce Platform",
                shortDescription: "Full-stack e-commerce solution",
                longDescription:
                    "A complete e-commerce platform with product management, cart functionality, payment processing, and order tracking.",
            },
            2: {
                title: "Task Management App",
                shortDescription: "Collaborative task manager",
                longDescription:
                    "A task management application with real-time collaboration, drag-and-drop interface, and team workspaces.",
            },
            3: {
                title: "Weather Dashboard",
                shortDescription: "Real-time weather visualization",
                longDescription:
                    "A weather dashboard that displays current conditions, forecasts, and historical data with interactive charts.",
            },
            4: {
                title: "Blog Platform",
                shortDescription: "Content management system",
                longDescription:
                    "A blog platform with markdown support, categories, tags, and a responsive design for optimal reading experience.",
            },
            5: {
                title: "Portfolio Generator",
                shortDescription: "Developer portfolio builder",
                longDescription:
                    "A tool that helps developers create professional portfolios by importing projects from GitHub and customizing the design.",
            },
            6: {
                title: "Recipe Finder",
                shortDescription: "Culinary discovery app",
                longDescription:
                    "A recipe finder application that allows users to search for recipes based on ingredients, dietary restrictions, and cuisine types.",
            },
        },
    },
    experience: {
        title: "Professional Experience",
        description:
            "My professional journey and the companies where I've had the opportunity to contribute.",
        tabs: {
            professional: "Professional",
            academic: "Academic",
        },
        previousPositions: "Previous positions",
        inProgress: "In progress",
        keyAchievements: "Key achievements",
        companies: {
            "tech-innovations": {
                name: "Tech Innovations Inc.",
                positions: {
                    0: {
                        title: "Senior Full Stack Developer",
                        description:
                            "Leading development of enterprise web applications, mentoring junior developers, and implementing CI/CD pipelines for streamlined deployments.",
                    },
                    1: {
                        title: "Full Stack Developer",
                        description:
                            "Developed and maintained multiple client web applications, implemented responsive designs, and integrated third-party APIs for enhanced functionality.",
                    },
                },
            },
            "digital-solutions": {
                name: "Digital Solutions Ltd.",
                positions: {
                    0: {
                        title: "Frontend Developer",
                        description:
                            "Created responsive and interactive user interfaces for client websites, collaborated with designers to implement pixel-perfect designs, and optimized web performance.",
                    },
                    1: {
                        title: "Junior Web Developer",
                        description:
                            "Assisted in developing web applications, fixed bugs, and implemented new features under senior developer guidance.",
                    },
                },
            },
            "startup-ventures": {
                name: "StartUp Ventures",
                positions: {
                    0: {
                        title: "Web Development Intern",
                        description:
                            "Gained hands-on experience in web development, assisted senior developers with coding tasks, and participated in team meetings and code reviews.",
                    },
                },
            },
        },
        education: {
            "software-engineering": {
                degree: "Bachelor's in Software Engineering",
                institution: "Faculdade Positivo",
                description:
                    "Comprehensive program covering software development methodologies, algorithms, data structures, database management, and software architecture. Focus on practical applications and industry-relevant skills.",
                achievements: {
                    0: "Maintained a GPA of 3.8/4.0",
                    1: "Developed a full-stack application for the university's internal use",
                    2: "Participated in the university's programming competition, securing 2nd place",
                },
            },
            "systems-analysis": {
                degree: "Technical Course in Systems Analysis and Development",
                institution: "SENAI",
                description:
                    "Technical program focused on practical software development skills, including programming fundamentals, database design, and web development. Emphasis on hands-on projects and industry collaboration.",
                achievements: {
                    0: "Graduated with distinction",
                    1: "Developed an inventory management system as final project",
                    2: "Completed an internship at a local software company during the course",
                },
            },
        },
    },
    certificates: {
        title: "Certificates",
        description:
            "Certifications and courses I've completed to enhance my technical skills.",
        tabs: {
            frontend: "Frontend",
            backend: "Backend",
            devops: "DevOps",
            other: "Other",
        },
        verify: "Verify certificate",
        items: {
            1: {
                title: "Advanced React and Redux",
                issuer: "Udemy",
            },
            2: {
                title: "Next.js & React - The Complete Guide",
                issuer: "Udemy",
            },
            3: {
                title: "TypeScript: The Complete Developer's Guide",
                issuer: "Udemy",
            },
            4: {
                title: "CSS - The Complete Guide",
                issuer: "Udemy",
            },
            5: {
                title: "Node.js, Express, MongoDB & More",
                issuer: "Udemy",
            },
            6: {
                title: "SQL Bootcamp",
                issuer: "Udemy",
            },
            7: {
                title: "GraphQL with Node.js",
                issuer: "Udemy",
            },
            8: {
                title: "Docker and Kubernetes: The Complete Guide",
                issuer: "Udemy",
            },
            9: {
                title: "AWS Certified Developer",
                issuer: "Amazon Web Services",
            },
            10: {
                title: "CI/CD with GitHub Actions",
                issuer: "GitHub Learning Lab",
            },
            11: {
                title: "Agile Methodologies",
                issuer: "Coursera",
            },
            12: {
                title: "UI/UX Design Fundamentals",
                issuer: "Udemy",
            },
            13: {
                title: "Project Management Professional (PMP)",
                issuer: "PMI",
            },
        },
    },
    contact: {
        title: "Contact",
        description:
            "Have a project in mind or want to chat? Get in touch with me!",
        form: {
            title: "Send a message",
            description:
                "Fill out the form below and I'll get back to you as soon as possible.",
            name: "Name",
            email: "Email",
            subject: "Subject",
            message: "Message",
            send: "Send message",
            sending: "Sending...",
        },
        connect: {
            title: "Connect with me",
            description: "You can also find me on the following platforms:",
            email: "Email",
            github: "GitHub",
            linkedin: "LinkedIn",
            whatsapp: "WhatsApp",
        },
        success: {
            title: "Message sent!",
            description:
                "Thank you for reaching out. I'll respond as soon as possible.",
        },
    },
    footer: {
        rights: "All rights reserved.",
        backToTop: "Back to top",
    },
    mobile: {
        swipeGuideTitle: "Swipe to Navigate",
        swipeGuideDesc: "Swipe up and down to navigate between sections",
        tapToExpand: "Tap to expand",
        dragToScroll: "Drag to scroll",
        pullToRefresh: "Pull down to refresh",
    },
};

export default translations;
