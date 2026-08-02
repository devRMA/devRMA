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
      "Olá! 👋 Eu sou o Rafael, mas pode me chamar de Rafa. Apaixonado por tecnologia e sempre focado em desenvolver soluções que ofereçam uma experiência fluida, acessível e memorável para o usuário.",
    downloadCV: "Baixar CV",
    contact: "Entre em contato",
  },
  skills: {
    title: "Habilidades",
    description:
      "Ao longo do tempo fui mexendo com muitas tecnologias. Aqui eu separei o que já usei, o que estou estudando e o que ainda quero explorar.",
    tabs: {
      know: "Já usei",
      studying: "Estudando",
      future: "Quero aprender",
    },
  },
  projects: {
    title: "Projetos",
    description: "Alguns dos projetos que eu fiz.",
    items: {
      1: {
        title: "Androxus",
        shortDescription: "Bot para Discord em Python",
        longDescription:
          "Um bot desenvolvido em Python para o Discord, com comandos personalizados e lógica modular.",
      },
      2: {
        title: "Python Stopwatch2",
        shortDescription: "Biblioteca de medição de tempo em Python",
        longDescription:
          "Uma biblioteca simples e reutilizável para medir tempo de execução de blocos de código em Python. Para testes de performance, benchmarks e logs.",
      },
      3: {
        title: "Pybot com Docker",
        shortDescription: "Bot Discord com suporte a Docker",
        longDescription: "Exemplo de estrutura para bot de Discord em Python usando Docker.",
      },
      4: {
        title: "Stock Trader",
        shortDescription: "Jogo de compra e venda de ações",
        longDescription:
          "Jogo simples criado com Vue.js no frontend e Laravel no backend, onde o usuário pode simular a compra e venda de ações de empresas fictícias, com preços variando dinamicamente.",
      },
    },
  },
  experience: {
    title: "Experiências",
    description:
      "Minha trajetória profissional e acadêmica, com as empresas e instituições onde tive a oportunidade de estudar e contribuir.",
    tabs: {
      professional: "Profissional",
      academic: "Acadêmica",
    },
    previousPositions: "Cargos anteriores",
    inProgress: "Em andamento",
    keyAchievements: "Principais conquistas",
    companies: {
      "madeira-madeira": {
        name: "Madeira Madeira",
        period: "Março 2024 - Presente",
        positions: [
          {
            title: "Desenvolvedor Full Stack Pleno",
            period: "Junho 2025 - Presente",
            description:
              "Atuo com foco em performance, observabilidade e boas práticas de desenvolvimento. Tenho trabalhado para melhorar a escalabilidade e eficiência da aplicação, implementando estratégias de monitoramento com logs e métricas, refatorando trechos críticos do sistema e garantindo qualidade através de testes, documentação e revisão de arquitetura.",
          },
          {
            title: "Desenvolvedor Full Stack Júnior",
            period: "Março 2024 - Maio 2025",
            description:
              "Atuei no sistema logístico iSend da iTrack, realizando correções de bugs, desenvolvimento de novas funcionalidades e melhorias contínuas. Trabalhei com Laravel e banco de dados relacional, além de implementar testes unitários e de integração, padronização de código e documentação. Colaborei com outros desenvolvedores para entregar soluções eficientes e sustentáveis.",
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
    description: "Certificações e cursos que completei para aprimorar minhas habilidades técnicas.",
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
      "Ficou com alguma dúvida ou quer bater um papo? Me chama pelos links abaixo, vou adorar trocar uma ideia com você.",
    connect: {
      title: "Entre em contato",
      description: "Você também pode me encontrar nas seguintes plataformas:",
      email: "E-mail",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
  },
  footer: {
    rights: "Todos os direitos reservados.",
    backToTop: "Voltar ao topo",
  },
};

export default translations;
