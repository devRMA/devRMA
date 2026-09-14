const translations = {
  nav: {
    about: "Sobre",
    skills: "Habilidades",
    projects: "Projetos",
    experience: "Experiência",
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
    headline: "Projeto sistemas distribuídos e lidero o time que os opera.",
    description:
      "Lidero tecnicamente a equipe de Experiência do Motorista na MadeiraMadeira, com foco em performance, observabilidade e código sustentável no ecossistema logístico da empresa — dos serviços em NestJS/TypeScript à orquestração de eventos em tempo real com Kafka e AWS.",
    stackLabel: "Principais tecnologias",
    projects: "Ver projetos",
    contact: "Entre em contato",
    copyEmail: "Copiar e-mail",
    emailCopied: "E-mail copiado!",
    stats: {
      experience: "Anos de experiência",
      educationValue: "Engenharia de Software",
      education: "Universidade Positivo · conclusão em dez. 2026",
      leadershipValue: "Tech Lead",
      leadership: "Arquitetura e liderança de squad",
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
      zeroDataLoss: "Contratos Tipados (Avro)",
      nodeDriverApp: "App do Motorista (iShip)",
      nodeDriverAppSub: "Cliente de Borda (Campo)",
      nodeDriverAppBadge: "Borda em Campo",
      nodeDriverAppDetail: "Telemetria & Eventos",
      nodeBff: "API Principal em NestJS",
      nodeBffSub: "TypeScript & PostgreSQL",
      nodeBffBadge: "Core Logístico",
      nodeBffDetail: "Regras de Negócio & Producers",
      nodeKafka: "Apache Kafka",
      nodeKafkaSub: "Barramento de Eventos",
      nodeKafkaBadge: "Mensageria Distribuída",
      nodeKafkaDetail: "Schemas Avro Tipados",
      nodeCloud: "Workers & Lambdas AWS",
      nodeCloudSub: "Python & ECS",
      nodeCloudBadge: "Processamento & Legados",
      nodeCloudDetail: "Crons & Pontes Legadas",
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
    title: "Provas de engenharia",
    description:
      "Quatro sistemas em produção — dois de logística, dois de triagem visual. Cada um abre com o problema de engenharia, as decisões de arquitetura e o que coube a mim liderar.",
    openSourceTitle: "Projetos pessoais e open source",
    openSourceDescription:
      "Bibliotecas e utilitários que mantenho fora do trabalho de produção. Escala menor, propósito diferente.",
    archivedBadge: "Arquivado",
    previewSuccess: "[SUCESSO] Módulos:",
    previewArchivedStatus: "Status: Laboratório Arquivado",
    previewProductionStatus: "Memória: 24MB • Status: Pronto para Produção",
    previewVerified: "Arquitetura verificada",
    case: {
      challengeTitle: "O problema",
      architectureTitle: "Arquitetura e trade-offs",
      resultTitle: "Resultado e liderança",
      stackTitle: "Tecnologias",
      evidenceTitle: "O sistema",
      responsiveTitle: "A mesma aplicação no celular",
      open: "Ver arquitetura e decisões",
      kindCapture: "Captura",
      kindDiagram: "Diagrama",
    },
    cases: {
      iship: {
        badge: "Tech Lead · foco atual",
        team: "MadeiraMadeira · squad Experiência do Motorista",
        title: "Orquestrar a jornada do motorista entre serviços novos e transporte legado",
        subtitle:
          "Ecossistema que liga o motorista em campo aos centros de distribuição: app do motorista, API em NestJS sobre PostgreSQL, eventos em Kafka com contratos Avro, Lambdas em Python e o Painel de Escala em React 19.",
        challenge:
          "A jornada operacional inteira — oferta de carga, check-in no centro de distribuição, conferência de notas fiscais e volumes, comprovante de entrega — precisa fechar com alta disponibilidade. E os serviços novos em NestJS tinham que conviver com os sistemas de transporte legados, não substituí-los de uma vez.",
        architecture:
          "API central em NestJS/TypeScript sobre PostgreSQL. A conversa com o legado em Laravel passa por Kafka, com contratos tipados em Apache Avro: o schema é o acordo entre os dois lados — custa disciplina de versionamento e paga em contratos que não quebram em silêncio. Lambdas em Python carregam os cálculos agendados e as pontes de evento com os sistemas antigos, mantendo essa carga fora do serviço principal. O Painel de Escala é um microfrontend em React 19 com Vite, com ciclo de deploy próprio.",
        result:
          "Como Tech Lead faço o planejamento de capacidade trimestral com PM e Product Designer, cortando escopo até a entrega caber no trimestre. Em incidente, a triagem começa comigo: New Relic, query direta no banco e Microsoft Clarity antes de acionar o squad — o time só é interrompido quando já existe o que corrigir.",
        systemName: "Plataforma do Motorista (iShip)",
        status: "Produção · logística nacional",
        diagramTitle: "Fluxo de eventos do iShip",
        alt: "Montagem com seis telas do aplicativo do motorista do iShip, ecossistema que Rafael lidera tecnicamente: abertura do app, lista de paradas do dia, rota no mapa, detalhe da entrega com ações de contato e navegação, e a confirmação de entrega concluída.",
      },
      isend: {
        badge: "Desenvolvedor Full Stack",
        team: "MadeiraMadeira · squad Experiência Operacional",
        title: "Estabilizar um TMS legado e torná-lo observável",
        subtitle:
          "TMS em Laravel e PHP sobre MySQL que sustenta a expedição diária: emissão de romaneios, despacho de cargas e acompanhamento de notas fiscais.",
        challenge:
          "Um monólito grande, com mais de 1.100 rotas, em uso constante na operação diária de transporte — e sem logs estruturados nem telemetria montada. Quando algo quebrava, a investigação começava pela leitura do código em vez de pelo dado. Corrigir bug e entregar funcionalidade nova tinham que acontecer sem parar a expedição.",
        architecture:
          "Laravel e PHP sobre MySQL relacional, com Lambdas em Python para rotinas isoladas que não precisavam viver dentro do monólito. A decisão foi instrumentar e refatorar por dentro em vez de reescrever: New Relic para tracing e logs estruturados, pipeline de CI no GitHub Actions com checagem de cobertura e SonarQube analisando cada pull request. Reescrever seria mais limpo e teria custado a operação — o legado ficou de pé, com um perímetro de qualidade em volta.",
        result:
          "O incidente passou a começar pela telemetria: a rota que falha identificada por dado, não por suposição. Rotas críticas otimizadas, testes automatizados e quality gates barrando regressão antes do merge, e documentação e revisões de arquitetura deixando o sistema legível para quem chegasse depois.",
        systemName: "Sistema de Gestão de Transporte (iSend)",
        status: "Produção · expedição diária",
        alt: "Diagrama, não captura de tela: esquema dos pontos de instrumentação que Rafael implantou no iSend. O monólito Laravel/PHP com mais de 1.100 rotas no centro, ligado ao MySQL da operação e às Lambdas em Python; ao redor, o New Relic recebendo tracing e logs estruturados e o pipeline GitHub Actions com SonarQube barrando cada pull request.",
        schema: {
          title: "Esquema de instrumentação do iSend",
          caption: "Diagrama desenhado para este portfólio. Não é uma captura do sistema.",
          core: "Monólito Laravel/PHP",
          coreSub: "Mais de 1.100 rotas",
          db: "MySQL",
          dbSub: "Base relacional da operação",
          async: "AWS Lambda (Python)",
          asyncSub: "Rotinas isoladas",
          apm: "New Relic",
          apmSub: "Tracing e logs estruturados",
          ci: "GitHub Actions e SonarQube",
          ciSub: "Cobertura e quality gate por PR",
        },
      },
      a1: {
        badge: "Coordenador de TI e Desenvolvedor Full Stack",
        team: "Adam Robo",
        title: "Um fluxo de triagem visual em três modos, do navegador à impressão térmica",
        systemName: "Plataforma Adam Robo A1",
        status: "Produção · atendimento a pacientes",
        subtitle:
          "Plataforma web de triagem visual: acuidade em escala Snellen, teste de visão de cores, três modos de exame e laudo impresso em A4 ou em impressora térmica.",
        challenge:
          "Um exame de triagem visual tem ordem, e a ordem não pode depender de quem aplica. O mesmo protocolo precisava rodar em três modos de duração diferente, no desktop e no celular, e terminar sempre em um laudo imprimível — A4 ou bobina térmica, dois formatos com restrições opostas.",
        architecture:
          "Laravel com MySQL no backend, React.js com TypeScript no frontend, entregues como uma única aplicação web responsiva — sem cliente instalado, o que tira a deriva de versão do parque de máquinas e coloca o custo na compatibilidade de navegador. O ambiente roda em Docker e o deploy passa por pipeline de CI/CD no GitHub Actions; rotinas em Python cobrem o trabalho que não pertence ao ciclo de requisição.",
        result:
          "A plataforma entrou em operação atendendo pacientes, com o exame completo — configuração, acuidade, visão de cores, conclusão e impressão — fechando dentro do navegador. No mesmo período eu coordenava a equipe de TI da Adam Robo: participei do recrutamento, organizei as tarefas do time, respondi pelo suporte técnico e montei os pipelines de deploy que sustentavam essas entregas.",
        shots: {
          setup:
            "Etapa de configuração do exame na plataforma A1 de Rafael: o operador registra se o paciente usará correção e se o teste será feito com os dois olhos ou com apenas um, com uma barra de progresso acompanhando o fluxo.",
          acuity:
            "Aplicação do exame na plataforma A1 desenvolvida por Rafael: teste de visão de cores com três alvos coloridos, seguido de cinco linhas de acuidade em escala Snellen, de 20/200 a 20/30, cada linha com o registro de quanto o paciente errou e um campo de observações.",
          completed:
            "Conclusão do exame na plataforma A1 de Rafael: confirmação de teste finalizado e as ações seguintes — voltar à página inicial, iniciar um novo teste, imprimir o laudo em A4 ou imprimir em impressora térmica.",
          acuityMobile:
            "A aplicação do exame do A1 em largura de celular: as linhas Snellen e o registro de erro em coluna única, mantendo a ordem do protocolo.",
          completedMobile:
            "A conclusão do exame do A1 em largura de celular: as quatro ações finais, incluindo impressão em A4 e térmica, em grade de dois por dois.",
        },
      },
      electrolux: {
        badge: "Coordenador de TI e Desenvolvedor Full Stack",
        team: "Adam Robo · entrega para a Electrolux",
        title: "A sessão de teste precisa terminar em laudo ocupacional assinado",
        systemName: "Adam 4.0 — Electrolux",
        status: "Produção · implantação interna",
        subtitle:
          "Versão do Adam para saúde ocupacional: acuidade de longe e de perto e teste de Ishihara em interface escura, com laudo reunindo dados do trabalhador, anamnese e assinaturas.",
        challenge:
          "Em saúde ocupacional o resultado do exame não é o fim do trabalho: o que a empresa precisa é do laudo — matrícula, setor, cargo, motivo do exame, anamnese, resultado por olho e a assinatura do aplicador e do médico. A sessão de teste tinha que produzir esse documento inteiro, sem etapa manual depois.",
        architecture:
          "Laravel, React.js e TypeScript sobre MySQL, empacotados em Docker para implantação no cliente. O exame roda em interface escura de alto contraste, e o laudo é uma saída do próprio fluxo: cada etapa — dados do trabalhador, anamnese, acuidade de longe e de perto, Ishihara — grava no mesmo registro, e o documento final é montado a partir dele em vez de ser preenchido à parte. A contrapartida é rigidez: mexer no laudo significa mexer no fluxo.",
        result:
          "O Adam 4.0 foi entregue e passou a ser usado internamente pela Electrolux, com o exame e o laudo ocupacional fechando no mesmo fluxo. Conduzi a entrega enquanto coordenava a equipe de TI da Adam Robo, incluindo a infraestrutura de deploy em Docker e o pipeline no GitHub Actions por trás dela.",
        shots: {
          acuity:
            "Exame de acuidade de longe no Adam 4.0 que Rafael entregou à Electrolux: interface escura com seis linhas Snellen, de 20/400 a 20/20, cada uma classificada como normal ou reduzida, ao lado do registro dos símbolos identificados pelo trabalhador.",
          color:
            "Teste de visão de cores no Adam 4.0 construído por Rafael: seis cartelas de Ishihara em interface escura, cada uma com o número esperado e a marcação de normal ou alterado, mais um campo de observações.",
          report:
            "Laudo ocupacional gerado pelo Adam 4.0 desenvolvido por Rafael: dados do trabalhador (matrícula, setor, cargo, escolaridade), anamnese, resultados de visão de longe e de perto por olho, teste de cores e os campos de assinatura do aplicador e do médico.",
        },
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
    phases: {
      title: "De Jovem Aprendiz a Tech Lead em cinco anos",
      description:
        "Três fases, duas empresas e dois domínios: dispositivos de triagem visual e logística nacional. O detalhamento cargo a cargo está nas abas abaixo.",
      foundation: {
        number: "01",
        badge: "Fundamentos",
        period: "2019 — 2021",
        title: "O alicerce técnico",
        context: "SENAI Dr. Celso Charuri · Adam Robo",
        description:
          "No técnico em Desenvolvimento de Sistemas do SENAI Dr. Celso Charuri aprendi lógica, SQL, modelagem e testes — C no Arduino, Java no desktop, C# com ASP.NET Core e Python com Selenium no projeto final. Entrei na Adam Robo como Jovem Aprendiz ainda no ensino médio, entre suporte ao cliente, automação de testes com Selenium e as primeiras linhas de PHP.",
      },
      leadership: {
        number: "02",
        badge: "Coordenação",
        period: "2022 — 2024",
        title: "Liderar um time e cursar a faculdade ao mesmo tempo",
        context: "Adam Robo · Universidade Positivo",
        description:
          "Fui efetivado como Desenvolvedor Full Stack na Adam Robo em janeiro de 2022 e assumi a Coordenação de TI em julho do mesmo ano: APIs REST em Laravel, configuração de subdomínios, pipelines de CI/CD no GitHub Actions e a liderança da equipe — recrutamento, organização de tarefas e suporte técnico. No mesmo semestre comecei Engenharia de Software na Universidade Positivo. É desse período que vêm a plataforma A1 e o Adam 4.0 entregue à Electrolux.",
      },
      scale: {
        number: "03",
        badge: "Liderança técnica",
        period: "2024 — Presente",
        title: "Alta escala e governança técnica",
        context: "MadeiraMadeira · iSend e iShip",
        description:
          "Entrei na MadeiraMadeira em março de 2024 como Desenvolvedor Full Stack Júnior no time Experiência Operacional, no iSend — o TMS da iTrack —, onde passei a responder por observabilidade com New Relic, quality gates com SonarQube e refatoração de áreas críticas. Em junho de 2025 assumi como Pleno e, em junho de 2026, a liderança técnica do time Experiência do Motorista: iShip, eventos em Kafka com contratos Avro, serviços em NestJS e planejamento de capacidade trimestral.",
      },
    },
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
              "Lidero tecnicamente a equipe de Experiência do Motorista, à frente do ecossistema do iShip e das ferramentas operacionais nos centros de distribuição (incluindo o desenvolvimento do Painel de Escala web em React 19). Sou responsável pelo capacity planning trimestral e simplificação de escopo junto a PM e Product Designer para garantir previsibilidade nas entregas. Conduzo a triagem técnica prévia de bugs e incidentes via New Relic, queries diretas no banco de dados e Microsoft Clarity antes de acionar a equipe. No desenvolvimento, atuo diretamente no backend com NestJS/TypeScript, na criação de producers e consumers Kafka com contratos Avro e em funções AWS Lambda em Python para rotinas de cálculo e integrações com legados. Essa atuação foi reconhecida oficialmente em setembro de 2026 com minha promoção a Desenvolvedor Full Stack Sênior.",
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
        institution: "Universidade Positivo",
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
      "Ecossistema iShip (App de Campo ➔ API NestJS ➔ Kafka Avro ➔ Lambdas Python)",
    archStreaming: "Streaming assíncrono: Tópicos de eventos no Apache Kafka com Avro",
    archProcessing: "Processamento: Serviços distribuídos desacoplados e resilientes",
    archInfra: "Infraestrutura: Nuvem AWS (ECS, Lambdas em Python) com observabilidade contínua",
    cvTitle: "Tech Lead & Engenheiro de Software Sênior | Curitiba, PR",
    cvSpecialty:
      "Especialidade: Sistemas distribuídos, APIs em NestJS com PostgreSQL, mensageria Kafka (Avro), Lambdas Python e liderança técnica de times.",
    cvEducation:
      "Formação: Engenharia de Software (Universidade Positivo) · conclusão em dez. 2026",
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
    pauseCarousel: "Pausar rolagem automática",
    playCarousel: "Retomar rolagem automática",
    expandPositions: "Ver cargos anteriores em {company}",
    collapsePositions: "Ocultar cargos anteriores em {company}",
    closeCase: "Fechar o case (tecla Esc)",
    caseDialog: "Case de engenharia: {title}",
    openCase: "Abrir o case de engenharia: {title}",
    profilePhoto: "Retrato de Rafael Martins Alves",
    scrollToExperience: "Ir para a seção Experiência",
  },
};

export default translations;
