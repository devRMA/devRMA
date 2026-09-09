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
    badge: "Tech Lead @ MadeiraMadeira",
    role: "Tech Lead & Desenvolvedor Sênior",
    headline:
      "Arquitetando sistemas distribuídos escaláveis e liderando produtos orientados a eventos de alto impacto.",
    description:
      "Lidero tecnicamente a equipe de Experiência do Motorista na MadeiraMadeira, com foco em performance, observabilidade e código sustentável no ecossistema logístico da empresa — dos serviços em NestJS/TypeScript à orquestração de eventos em tempo real com Kafka e AWS.",
    stackLabel: "Principais tecnologias",
    projects: "Ver projetos",
    contact: "Entre em contato",
    copyEmail: "Copiar e-mail",
    emailCopied: "E-mail copiado!",
    stats: {
      experience: "Anos de experiência",
      certificates: "Certificações",
      companies: "Empresas",
    },
  },
  skills: {
    title: "Habilidades & Especialidades",
    description:
      "As tecnologias que uso no dia a dia, arquitetura de sistemas e áreas que domino ou estou aprofundando.",
    tabs: {
      know: "Já usei",
      studying: "Estudando",
      future: "Quero aprender",
    },
    bento: {
      architectureTitle: "Arquitetura Orientada a Eventos",
      architectureDescription:
        "Fluxo assíncrono conectando o app do motorista, API em NestJS com PostgreSQL, e barramento de eventos",
      zeroDataLoss: "Zero Perda de Dados",
      nodeDriverApp: "App Motorista (iShip)",
      nodeDriverAppSub: "Flutter & Firebase",
      nodeDriverAppBadge: "Borda em Campo",
      nodeDriverAppDetail: "Telemetria & Geolocalização",
      nodeBff: "API Principal em NestJS",
      nodeBffSub: "TypeScript & PostgreSQL",
      nodeBffBadge: "API Central",
      nodeBffDetail: "PostgreSQL & Idempotência",
      nodeKafka: "Apache Kafka",
      nodeKafkaSub: "Barramento de Eventos",
      nodeKafkaBadge: "Barramento de Mensageria",
      nodeKafkaDetail: "Particionado & Replicado",
      nodeCloud: "Nuvem AWS",
      nodeCloudSub: "ECS, Lambda (Python) & Terraform",
      nodeCloudBadge: "Consumidores Assíncronos",
      nodeCloudDetail: "Auto-Scaling Multi-AZ",
      yearsValue: "5+ Anos",
      yearsExp: "Anos de engenharia contínua",
      scaleValue: "Alta Escala",
      systemsScale: "Eventos e logística de missão crítica",
      locationTitle: "Base de Atuação",
      locationValue: "Curitiba, PR — Brasil (UTC-3)",
      liveBadge: "Ao Vivo",
    },
  },
  projects: {
    title: "Projetos & Estudos de Caso",
    description:
      "Projetos em produção na MadeiraMadeira e projetos de código aberto. Cada um nasceu de um desafio técnico real.",
    openSourceTitle: "Projetos Pessoais & Open Source",
    archivedBadge: "Arquivado",
    previewSuccess: "[SUCESSO] Módulos:",
    previewArchivedStatus: "Status: Laboratório Arquivado",
    previewProductionStatus: "Memória: 24MB • Status: Pronto para Produção",
    previewVerified: "Arquitetura verificada",
    cases: {
      iship: {
        badge: "Foco Atual • Tech Lead",
        team: "MadeiraMadeira • Equipe Experiência do Motorista",
        title: "iShip — Aplicativo e Ecossistema do Motorista",
        productionBadge: "Logística em Produção",
        subtitle:
          "App mobile em Flutter, orquestrado pela API principal em NestJS com PostgreSQL, cobrindo a jornada completa do motorista do CD até a entrega final.",
        challengeTitle: "O Desafio",
        challenge:
          "Conectar motoristas em campo aos centros de distribuição com alta disponibilidade, orquestrando a jornada completa (ofertas de carga, check-in no CD, conferência de notas fiscais e volumes, e comprovantes de entrega) de forma resiliente entre o app Flutter, a API principal em NestJS e os demais sistemas logísticos.",
        architectureTitle: "A Arquitetura",
        architecture:
          "API principal em NestJS / TypeScript com banco de dados PostgreSQL, utilizando KafkaJS e Outbox pattern para comunicação assíncrona resiliente com o sistema de transporte (TMS), além de Painel de Escala web em Microfrontend (React 19 / Vite Module Federation) com Vitest e SonarCloud, e funções AWS Lambda em Python para tarefas auxiliares.",
        resultTitle: "O Resultado",
        result:
          "Jornada do motorista unificada e observável de ponta a ponta, redução de tempo no pátio dos CDs, conferência ágil de notas fiscais e volumes, e alta estabilidade operacional.",
        tagline: "Arquitetura de Missão Crítica",
      },
      isend: {
        badge: "Desenvolvedor Full Stack",
        team: "MadeiraMadeira • Equipe Experiência Operacional",
        title: "iSend — Sistema de Gestão de Transporte (TMS)",
        telemetryUrl: "tms.isend.interno/telemetria",
        activeRoutesBadge: "1.100+ ROTAS DE EXPEDIÇÃO ATIVAS",
        apmCategory: "APM & Observabilidade",
        apmTitle: "Telemetria New Relic",
        apmDesc: "Logs estruturados e tracing",
        qualityCategory: "Qualidade de Código",
        qualityTitle: "Pipeline de CI SonarQube",
        qualityDesc: "Quality gates automatizados de cobertura",
        asyncCategory: "Processamento Assíncrono",
        asyncTitle: "AWS Lambda (Python)",
        asyncDesc: "Rotinas isoladas de suporte",
        subtitle:
          "Sistema central de transporte com mais de 1.100 rotas em Laravel e PHP para expedição, emissão de romaneios e controle operacional de cargas.",
        challengeTitle: "O Desafio",
        challenge:
          "Manter a estabilidade, corrigir bugs complexos e implementar novas funcionalidades em um sistema de grande porte com mais de 1.100 rotas utilizado intensamente na operação diária de transportes e expedição de notas fiscais.",
        architectureTitle: "A Arquitetura",
        architecture:
          "Laravel / PHP com MySQL relacional e funções AWS Lambda em Python para tarefas isoladas e rotinas auxiliares. Implementação de pipelines de CI no GitHub Actions com checagem de coverage e integração contínua com SonarQube para análise de PRs.",
        resultTitle: "O Resultado",
        result:
          "Melhoria substancial na rastreabilidade e estruturação de logs e telemetria com New Relic, otimização de performance em rotas críticas e elevação consistente da qualidade de código com testes automatizados.",
        tagline: "Qualidade de Código & CI/CD",
      },
    },
    items: {
      1: {
        title: "Androxus",
        shortDescription: "Bot para Discord em Python com PostgreSQL",
        longDescription:
          "Bot modular desenvolvido em Python para o Discord utilizando discord.py e banco relacional PostgreSQL na AWS RDS, com comandos matemáticos e utilitários. Projeto arquivado.",
      },
      2: {
        title: "Python Stopwatch2",
        shortDescription: "Biblioteca de medição de tempo e benchmarks em Python",
        longDescription:
          "Biblioteca simples e reutilizável para medir tempo de execução de blocos de código em Python, com suporte a benchmarks comparativos e logs de performance.",
      },
      3: {
        title: "Pybot com Docker",
        shortDescription: "Código base de bot Discord com Docker e Redis",
        longDescription:
          "Estrutura base desenvolvida como referência didática para novos desenvolvedores criarem bots para Discord com Python, Docker Compose, PostgreSQL e Redis. Projeto arquivado.",
      },
      4: {
        title: "Stock Trader",
        shortDescription: "Jogo de negociação de ações com Vue.js e Laravel",
        longDescription:
          "Simulador de compra e venda de ações de empresas fictícias com frontend em Vue.js / Vuex e API REST em Laravel / PHP com documentação interativa. Projeto arquivado.",
      },
    },
  },
  experience: {
    title: "Experiência",
    description:
      "Minha trajetória profissional e acadêmica: as empresas onde atuei, os cargos que ocupei e a formação que sustenta esse percurso.",
    progression: {
      label: "Evolução contínua:",
      intern: "Jovem Aprendiz",
      fullstack: "Desenvolvedor Full Stack",
      techlead: "Tech Lead & Sênior",
    },
    tabs: {
      professional: "Profissional",
      academic: "Acadêmica",
    },
    previousPositions: "Cargos anteriores",
    inProgress: "Em andamento",
    keyAchievements: "Principais conquistas",
    companies: {
      "madeira-madeira": {
        name: "MadeiraMadeira",
        period: "Março 2024 - Presente",
        positions: [
          {
            title: "Tech Lead",
            period: "Junho 2026 - Presente",
            description:
              "Lidero tecnicamente a equipe de Experiência do Motorista, à frente do desenvolvimento do iShip — o aplicativo que acompanha o motorista do carregamento à entrega — e dos sistemas que dão suporte à operação nos centros de distribuição. Defino decisões de arquitetura, oriento o time e continuo atuando diretamente no código em NestJS/TypeScript e Python (AWS Lambda), orquestrando eventos em tempo real com Kafka para conectar esse ecossistema ao restante da operação logística da empresa. Essa atuação foi reconhecida oficialmente em setembro de 2026, com minha promoção a Desenvolvedor Full Stack Sênior.",
          },
          {
            title: "Desenvolvedor Full Stack Pleno",
            period: "Junho 2025 - Maio 2026",
            description:
              "Atuei com foco em performance, observabilidade e boas práticas de desenvolvimento, no time Experiência Operacional, por trás do iSend (TMS) da iTrack. Trabalhei para melhorar a escalabilidade e eficiência da aplicação com mais de 1.100 rotas e lambdas em Python para tarefas auxiliares, implementando pipelines de CI no GitHub Actions com SonarQube, estruturação de logs e monitoramento, refatorando trechos críticos do sistema e garantindo qualidade com testes unitários e de integração.",
          },
          {
            title: "Desenvolvedor Full Stack Júnior",
            period: "Março 2024 - Maio 2025",
            description:
              "Atuei no time Experiência Operacional, dedicado ao iSend — sistema de gestão de transporte (TMS) da iTrack — realizando correções de bugs, desenvolvimento de novas funcionalidades e melhorias contínuas em Laravel e MySQL. Implementei testes automatizados, padronização de código e documentação técnica em colaboração direta com a equipe.",
          },
        ],
      },
      "adam-robo": {
        name: "Adam Robo",
        period: "Junho 2021 - Março 2024",
        positions: [
          {
            title: "Coordenador de TI",
            period: "Julho 2022 - Março 2024",
            description:
              "Fui responsável pelas configurações de subdomínios, criação de pipelines de CI/CD com GitHub Actions para deploy de aplicações e desenvolvimento de APIs REST com Laravel. Também liderei a equipe de TI, participando ativamente do recrutamento, organização de tarefas e suporte técnico, o que me proporcionou um aprendizado prático valioso sobre liderança e gestão de equipe.",
          },
          {
            title: "Desenvolvedor Full Stack",
            period: "Janeiro 2022 - Junho 2022",
            description:
              "Atuei no desenvolvimento de sistemas monolíticos, sendo responsável tanto pelo backend (Laravel) quanto pelo frontend (Blade templates, HTML e CSS), entregando soluções completas.",
          },
          {
            title: "Jovem Aprendiz",
            period: "Junho 2021 - Dezembro 2021",
            description:
              "Durante o ensino médio, atuei na empresa com foco em suporte ao cliente, automatização de testes com Python e Selenium, além de iniciar meus estudos em PHP.",
          },
        ],
      },
    },
    education: {
      "software-engineering": {
        degree: "Bacharelado em Engenharia de Software",
        institution: "Faculdade Positivo",
        period: "Junho 2022 - Dezembro 2026",
        description:
          "Curso Engenharia de Software na Universidade Positivo, onde aprofundo meus conhecimentos em algoritmos, estrutura de dados, arquitetura de sistemas, DevOps e cloud, com foco prático e alinhado ao mercado.",
        achievements: [
          "Participei da modelagem completa de um aplicativo, desde o levantamento de requisitos até wireframes e definição de histórias de usuário.",
          "Apliquei práticas de engenharia de software em projetos acadêmicos, com foco em organização, análise e planejamento técnico.",
          "Desenvolvi atividades práticas com foco em resolução de problemas, utilizando lógica, algoritmos e estrutura de dados em diferentes contextos.",
        ],
      },
      "systems-analysis": {
        degree: "Técnico em Desenvolvimento de Sistemas",
        institution: "SENAI Dr. Celso Charuri",
        period: "Agosto 2019 - Dezembro 2020",
        description:
          "No curso técnico do SENAI, aprendi SQL, lógica de programação, modelagem e testes; trabalhei com C (Arduino), Java (desktop), C# com ASP.NET Core (web), Python com Selenium (testes), além de HTML, CSS e JavaScript, sempre com foco prático e estrutura de laboratório.",
        achievements: [
          "Desenvolvi, em equipe, jogos simples aplicando lógica de programação, controle de fluxo e estrutura de dados.",
          "Participei da criação de um site com ASP.NET integrado a um Arduino para controle de temperatura de ambientes.",
          "Implementei testes end-to-end com Python e Selenium como parte do projeto de TCC.",
        ],
      },
    },
  },
  certificates: {
    title: "Certificados",
    description:
      "Certificações e cursos concluídos ao longo da carreira. Clique em qualquer um para ver o certificado e validá-lo na origem.",
    tabs: {
      frontend: "Frontend",
      backend: "Backend",
      devops: "DevOps",
      other: "Outros",
    },
    verify: "Verificar certificado",
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
    title: "Contato",
    description:
      "Estou aberto a conversas sobre projetos, oportunidades e colaborações. Escolha o canal que preferir — costumo responder em até um dia útil.",
    connect: {
      title: "Vamos conversar",
      description: "Você me encontra nos canais abaixo:",
      email: "E-mail",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
  },
  terminal: {
    title: "Terminal Interativo",
    description:
      "Para desenvolvedores e recrutadores técnicos — explore comandos rápidos no navegador:",
    placeholder: "digite um comando (ex: help, stack, contact)...",
    commandAriaLabel: "Comando de terminal",
    shortcutsLabel: "Atalhos rápidos:",
    availableCommands: "Comandos disponíveis:",
    stackTitle: "Stack Primária:",
    architectureTitle: "Ecossistema Logístico (MadeiraMadeira):",
    trajectoryTitle: "Rafael Martins Alves — Trajetória:",
    trajectoryItem1: "2026 - Presente: Tech Lead & Desenvolvedor Sênior @ MadeiraMadeira",
    trajectoryItem2: "2025 - 2026: Desenvolvedor Full Stack Pleno @ MadeiraMadeira",
    trajectoryItem3: "2024 - 2025: Desenvolvedor Full Stack Júnior @ MadeiraMadeira",
    trajectoryItem4: "2021 - 2024: Coordenador de TI / Desenvolvedor Full Stack @ Adam Robo",
    channelsTitle: "Canais Diretos:",
    unknownCommand: 'Comando não reconhecido: "{command}". Digite "help" para ver as opções.',
    rootDenied: "Acesso root negado: você já possui privilégios de visitante especial!",
    helpStack: "Tecnologias e ferramentas principais",
    helpArchitecture: "Visão da arquitetura de eventos",
    helpExperience: "Posição atual e trajetória",
    helpContact: "Informações diretas de contato",
    helpCv: "Resumo do currículo técnico",
    helpClear: "Limpar tela do terminal",
    stackBackend: "Backend: NestJS, TypeScript, Node.js, PHP, Laravel, Python",
    stackMessaging: "Mensageria & Eventos: Apache Kafka, RabbitMQ",
    stackCloud:
      "Cloud & DevOps: AWS (ECS, Lambda, RDS, SQS), Terraform, Docker, GitHub Actions, Linux",
    stackDatabases: "Bancos de Dados: PostgreSQL, MySQL, Redis",
    stackFrontend: "Frontend: Next.js, React, Tailwind CSS, TypeScript",
    archDriverTelemetry:
      "App Motorista (iShip) em Flutter & Firebase ➔ API em NestJS com PostgreSQL",
    archStreaming: "Streaming assíncrono: Tópicos de eventos no Apache Kafka",
    archProcessing: "Processamento: Serviços distribuídos desacoplados e resilientes",
    archInfra:
      "Infraestrutura: Nuvem AWS (ECS, Lambda em Python, Terraform) com observabilidade contínua",
    cvTitle: "Tech Lead & Arquiteto de Software | Curitiba, PR",
    cvSpecialty:
      "Especialidade: Sistemas distribuídos, APIs em NestJS com PostgreSQL, Lambdas em Python, Kafka e Nuvem AWS (Terraform/ECS).",
    cvEducation: "Formação: Bacharelado em Engenharia de Software (Universidade Positivo)",
    cvStatus: "Status: Disponível para liderança técnica e projetos de alto impacto",
  },
  footer: {
    rights: "Todos os direitos reservados.",
    backToTop: "Voltar ao topo",
  },
  a11y: {
    skipToContent: "Pular para o conteúdo",
    githubProfile: "Perfil no GitHub (abre em nova aba)",
    linkedinProfile: "Perfil no LinkedIn (abre em nova aba)",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    mobileNavigation: "Navegação principal",
    scrollToSkills: "Ir para a seção Habilidades",
    pauseCarousel: "Pausar rolagem automática",
    playCarousel: "Retomar rolagem automática",
    expandPositions: "Ver cargos anteriores em {company}",
    collapsePositions: "Ocultar cargos anteriores em {company}",
    viewCertificate: "Ver certificado: {title}",
  },
};

export default translations;
