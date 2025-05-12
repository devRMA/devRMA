const translations = {
    nav: {
        about: "Sobre",
        skills: "Habilidades",
        projects: "Projetos",
        experience: "Experiência",
        certificates: "Certificados",
        contact: "Contato",
    },
    theme: {
        toggle: "Alternar tema",
        light: "Claro",
        dark: "Escuro",
        system: "Sistema",
    },
    language: {
        toggle: "Alternar idioma",
    },
    hero: {
        description:
            "Desenvolvedor Full Stack apaixonado por criar soluções web modernas, escaláveis e de alta performance.",
        downloadCV: "Baixar CV",
        contact: "Entre em contato",
    },
    skills: {
        title: "Habilidades",
        description:
            "Tecnologias e ferramentas que utilizo para desenvolver soluções completas e eficientes.",
        tabs: {
            know: "Já conheço",
            studying: "Estou estudando",
            future: "Quero aprender",
        },
        learning: "Aprendendo",
        iKnow: "Eu conheço",
        iUsed: "Já utilizei",
    },
    projects: {
        title: "Projetos",
        description:
            "Alguns dos projetos que desenvolvi, demonstrando minhas habilidades e experiência.",
        items: {
            1: {
                title: "Plataforma de E-commerce",
                shortDescription: "Solução completa de e-commerce",
                longDescription:
                    "Uma plataforma completa de e-commerce com gerenciamento de produtos, funcionalidade de carrinho, processamento de pagamentos e rastreamento de pedidos.",
            },
            2: {
                title: "App de Gerenciamento de Tarefas",
                shortDescription: "Gerenciador de tarefas colaborativo",
                longDescription:
                    "Um aplicativo de gerenciamento de tarefas com colaboração em tempo real, interface de arrastar e soltar e espaços de trabalho em equipe.",
            },
            3: {
                title: "Painel de Clima",
                shortDescription: "Visualização de clima em tempo real",
                longDescription:
                    "Um painel de clima que exibe condições atuais, previsões e dados históricos com gráficos interativos.",
            },
            4: {
                title: "Plataforma de Blog",
                shortDescription: "Sistema de gerenciamento de conteúdo",
                longDescription:
                    "Uma plataforma de blog com suporte a markdown, categorias, tags e um design responsivo para uma experiência de leitura ideal.",
            },
            5: {
                title: "Gerador de Portfólio",
                shortDescription:
                    "Construtor de portfólio para desenvolvedores",
                longDescription:
                    "Uma ferramenta que ajuda desenvolvedores a criar portfólios profissionais importando projetos do GitHub e personalizando o design.",
            },
            6: {
                title: "Buscador de Receitas",
                shortDescription: "App de descoberta culinária",
                longDescription:
                    "Um aplicativo de busca de receitas que permite aos usuários pesquisar receitas com base em ingredientes, restrições alimentares e tipos de culinária.",
            },
        },
    },
    experience: {
        title: "Experiência Profissional",
        description:
            "Minha trajetória profissional e as empresas onde tive a oportunidade de contribuir.",
        tabs: {
            professional: "Profissional",
            academic: "Acadêmica",
        },
        previousPositions: "Cargos anteriores",
        inProgress: "Em andamento",
        keyAchievements: "Principais conquistas",
        companies: {
            "tech-innovations": {
                name: "Tech Innovations Inc.",
                positions: {
                    0: {
                        title: "Desenvolvedor Full Stack Sênior",
                        description:
                            "Liderando o desenvolvimento de aplicações web empresariais, mentorando desenvolvedores juniores e implementando pipelines de CI/CD para implantações otimizadas.",
                    },
                    1: {
                        title: "Desenvolvedor Full Stack",
                        description:
                            "Desenvolvi e mantive várias aplicações web para clientes, implementei designs responsivos e integrei APIs de terceiros para funcionalidades aprimoradas.",
                    },
                },
            },
            "digital-solutions": {
                name: "Digital Solutions Ltda.",
                positions: {
                    0: {
                        title: "Desenvolvedor Frontend",
                        description:
                            "Criei interfaces de usuário responsivas e interativas para sites de clientes, colaborei com designers para implementar designs perfeitos e otimizei o desempenho da web.",
                    },
                    1: {
                        title: "Desenvolvedor Web Júnior",
                        description:
                            "Auxiliei no desenvolvimento de aplicações web, corrigi bugs e implementei novos recursos sob orientação de desenvolvedores seniores.",
                    },
                },
            },
            "startup-ventures": {
                name: "StartUp Ventures",
                positions: {
                    0: {
                        title: "Estagiário de Desenvolvimento Web",
                        description:
                            "Obtive experiência prática em desenvolvimento web, auxiliei desenvolvedores seniores com tarefas de codificação e participei de reuniões de equipe e revisões de código.",
                    },
                },
            },
        },
        education: {
            "software-engineering": {
                degree: "Bacharelado em Engenharia de Software",
                institution: "Faculdade Positivo",
                description:
                    "Programa abrangente cobrindo metodologias de desenvolvimento de software, algoritmos, estruturas de dados, gerenciamento de banco de dados e arquitetura de software. Foco em aplicações práticas e habilidades relevantes para a indústria.",
                achievements: {
                    0: "Mantive um GPA de 3.8/4.0",
                    1: "Desenvolvi uma aplicação full-stack para uso interno da universidade",
                    2: "Participei da competição de programação da universidade, garantindo o 2º lugar",
                },
            },
            "systems-analysis": {
                degree: "Curso Técnico em Análise e Desenvolvimento de Sistemas",
                institution: "SENAI",
                description:
                    "Programa técnico focado em habilidades práticas de desenvolvimento de software, incluindo fundamentos de programação, design de banco de dados e desenvolvimento web. Ênfase em projetos práticos e colaboração com a indústria.",
                achievements: {
                    0: "Graduado com distinção",
                    1: "Desenvolvi um sistema de gerenciamento de inventário como projeto final",
                    2: "Completei um estágio em uma empresa local de software durante o curso",
                },
            },
        },
    },
    certificates: {
        title: "Certificados",
        description:
            "Certificações e cursos que completei para aprimorar minhas habilidades técnicas.",
        tabs: {
            frontend: "Frontend",
            backend: "Backend",
            devops: "DevOps",
            other: "Outros",
        },
        verify: "Verificar certificado",
        items: {
            1: {
                title: "React e Redux Avançado",
                issuer: "Udemy",
            },
            2: {
                title: "Next.js & React - O Guia Completo",
                issuer: "Udemy",
            },
            3: {
                title: "TypeScript: Guia Completo do Desenvolvedor",
                issuer: "Udemy",
            },
            4: {
                title: "CSS - O Guia Completo",
                issuer: "Udemy",
            },
            5: {
                title: "Node.js, Express, MongoDB e Mais",
                issuer: "Udemy",
            },
            6: {
                title: "Bootcamp de SQL",
                issuer: "Udemy",
            },
            7: {
                title: "GraphQL com Node.js",
                issuer: "Udemy",
            },
            8: {
                title: "Docker e Kubernetes: O Guia Completo",
                issuer: "Udemy",
            },
            9: {
                title: "AWS Certified Developer",
                issuer: "Amazon Web Services",
            },
            10: {
                title: "CI/CD com GitHub Actions",
                issuer: "GitHub Learning Lab",
            },
            11: {
                title: "Metodologias Ágeis",
                issuer: "Coursera",
            },
            12: {
                title: "Fundamentos de UI/UX Design",
                issuer: "Udemy",
            },
            13: {
                title: "Project Management Professional (PMP)",
                issuer: "PMI",
            },
        },
    },
    contact: {
        title: "Contato",
        description:
            "Tem um projeto em mente ou quer conversar? Entre em contato comigo!",
        form: {
            title: "Envie uma mensagem",
            description:
                "Preencha o formulário abaixo e entrarei em contato o mais breve possível.",
            name: "Nome",
            email: "E-mail",
            subject: "Assunto",
            message: "Mensagem",
            send: "Enviar mensagem",
            sending: "Enviando...",
        },
        connect: {
            title: "Conecte-se comigo",
            description:
                "Você também pode me encontrar nas seguintes plataformas:",
            email: "E-mail",
            github: "GitHub",
            linkedin: "LinkedIn",
            whatsapp: "WhatsApp",
        },
        success: {
            title: "Mensagem enviada!",
            description:
                "Obrigado pelo contato. Responderei o mais breve possível.",
        },
    },
    footer: {
        rights: "Todos os direitos reservados.",
        backToTop: "Voltar ao topo",
    },
    mobile: {
        swipeGuideTitle: "Deslize para Navegar",
        swipeGuideDesc:
            "Deslize para cima e para baixo para navegar entre as seções",
        tapToExpand: "Toque para expandir",
        dragToScroll: "Arraste para rolar",
        pullToRefresh: "Puxe para atualizar",
    },
};

export default translations;
