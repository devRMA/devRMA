# 0100 — Copy

> Owner: content-writer · Gate: `copy`

Every user-visible string this change ships, in `pt-BR` and `en`, keyed as it will appear in `locales/*.ts`.

**Reading note for the tech-lead and the frontend-dev:** `design.md` was still being written in parallel when this was drafted, so no length budget had been published. The **Constraint** column states the intent I wrote to — the number of lines a slot is meant to occupy — rather than a figure taken from `design.md`. Where the designer's final measurement contradicts one of these, the string comes back to me; the developer does not trim copy (see *Open items*).

**Voice:** first person for anything Rafael did, third person only in alt text, where the reader needs to be told whose system they are looking at. Both versions were written as originals; neither is a translation of the other.

---

## Navigation

Five items, in page order. Values are unchanged from the current locales — only `nav.certificates` is removed (see Deletions).

### `nav.about`

| | Text | Chars |
|---|---|---|
| pt-BR | Sobre | 5 |
| en | About | 5 |

- **Constraint:** one word
- **Evidence:** existing key, unchanged

### `nav.experience`

| | Text | Chars |
|---|---|---|
| pt-BR | Experiência | 11 |
| en | Experience | 10 |

- **Constraint:** one word
- **Evidence:** existing key, unchanged

### `nav.projects`

| | Text | Chars |
|---|---|---|
| pt-BR | Projetos | 8 |
| en | Projects | 8 |

- **Constraint:** one word
- **Evidence:** existing key, unchanged

### `nav.skills`

| | Text | Chars |
|---|---|---|
| pt-BR | Habilidades | 11 |
| en | Skills | 6 |

- **Constraint:** one word
- **Evidence:** existing key, unchanged

### `nav.contact`

| | Text | Chars |
|---|---|---|
| pt-BR | Contato | 7 |
| en | Contact | 7 |

- **Constraint:** one word
- **Evidence:** existing key, unchanged

## Hero

`hero.badge`, `hero.role`, `hero.description`, `hero.stackLabel`, `hero.projects`, `hero.contact`, `hero.copyEmail`, `hero.emailCopied` are unchanged and not restated here. The three metrics are value + label pairs; the years value stays computed in the component.

### `hero.headline`

| | Text | Chars |
|---|---|---|
| pt-BR | Projeto sistemas distribuídos e lidero o time que os opera. | 59 |
| en | I design distributed systems and lead the team that runs them. | 62 |

- **Constraint:** 2 lines at 1440, 3 at 390 (designer to confirm)
- **Evidence:** `data/experience.tsx` (Tech Lead, Driver Experience) + `PRODUCT.md` § Positioning

### `hero.stats.experience`

| | Text | Chars |
|---|---|---|
| pt-BR | Anos de experiência | 19 |
| en | Years of experience | 19 |

- **Constraint:** single line under a numeric value
- **Evidence:** existing key, unchanged; value computed from `startDate` 2021-06-14

### `hero.stats.educationValue`

| | Text | Chars |
|---|---|---|
| pt-BR | Engenharia de Software | 22 |
| en | Software Engineering | 20 |

- **Constraint:** same visual slot as the years number — must not wrap past 2 lines
- **Evidence:** `data/experience.tsx` § academicData.software-engineering

### `hero.stats.education`

| | Text | Chars |
|---|---|---|
| pt-BR | Universidade Positivo · conclusão em dez. 2026 | 46 |
| en | Universidade Positivo · in progress, ends Dec 2026 | 50 |

- **Constraint:** label line, same slot as `hero.stats.experience`
- **Evidence:** `data/experience.tsx` § academicData — `inProgress: true`, `period: "Jun 2022 - Dec 2026"`. Asserts no completed degree (AC3, OQ1).

### `hero.stats.leadershipValue`

| | Text | Chars |
|---|---|---|
| pt-BR | Tech Lead | 9 |
| en | Tech Lead | 9 |

- **Constraint:** same visual slot as the years number
- **Evidence:** `data/experience.tsx` § madeira-madeira → Tech Lead, June 2026 – Present

### `hero.stats.leadership`

| | Text | Chars |
|---|---|---|
| pt-BR | Arquitetura e liderança de squad | 32 |
| en | Architecture and squad leadership | 33 |

- **Constraint:** label line
- **Evidence:** `data/experience.tsx` (capacity planning with PM and Product Designer, Kafka/Avro contracts, incident triage)

## Trajectory — the three phases

Sits above the existing professional/academic tabs. First person, matching the voice of the existing `experience.companies.*` descriptions. Every company, role, date and institution below was checked line by line against `data/experience.tsx` (AC7).

### `experience.phases.title`

| | Text | Chars |
|---|---|---|
| pt-BR | De Jovem Aprendiz a Tech Lead em cinco anos | 43 |
| en | From apprentice to Tech Lead in five years | 42 |

- **Constraint:** one line at 1440
- **Evidence:** `data/experience.tsx` — apprentice from 2021-06-14, Tech Lead from 2026-06-01: five years exactly

### `experience.phases.description`

| | Text | Chars |
|---|---|---|
| pt-BR | Três fases, duas empresas e dois domínios: dispositivos de triagem visual e logística nacional. O detalhamento cargo a cargo está nas abas abaixo. | 146 |
| en | Three phases, two companies, two domains: visual-screening devices and national logistics. The role-by-role detail is in the tabs below. | 136 |

- **Constraint:** 2 lines at 1440
- **Evidence:** `data/experience.tsx`; "national logistics" per `PRODUCT.md` § Evidence on Hand

### `experience.phases.foundation.number`

| | Text | Chars |
|---|---|---|
| pt-BR | 01 | 2 |
| en | 01 | 2 |

- **Constraint:** 2 characters
- **Evidence:** ordinal, no claim

### `experience.phases.foundation.badge`

| | Text | Chars |
|---|---|---|
| pt-BR | Fundamentos | 11 |
| en | Fundamentals | 12 |

- **Constraint:** ≤ 16 chars
- **Evidence:** `data/experience.tsx` § academicData.systems-analysis

### `experience.phases.foundation.period`

| | Text | Chars |
|---|---|---|
| pt-BR | 2019 — 2021 | 11 |
| en | 2019 — 2021 | 11 |

- **Constraint:** ≤ 16 chars
- **Evidence:** `data/experience.tsx`: SENAI Aug 2019 – Dec 2020; Junior Apprentice Jun 2021 – Dec 2021

### `experience.phases.foundation.title`

| | Text | Chars |
|---|---|---|
| pt-BR | O alicerce técnico | 18 |
| en | The technical foundation | 24 |

- **Constraint:** 1 line
- **Evidence:** narrative label, no factual claim

### `experience.phases.foundation.context`

| | Text | Chars |
|---|---|---|
| pt-BR | SENAI Dr. Celso Charuri · Adam Robo | 35 |
| en | SENAI Dr. Celso Charuri · Adam Robo | 35 |

- **Constraint:** 1 line
- **Evidence:** `data/experience.tsx` § academicData.systems-analysis + § adam-robo

### `experience.phases.foundation.description`

| | Text | Chars |
|---|---|---|
| pt-BR | No técnico em Desenvolvimento de Sistemas do SENAI Dr. Celso Charuri aprendi lógica, SQL, modelagem e testes — C no Arduino, Java no desktop, C# com ASP.NET Core e Python com Selenium no projeto final. Entrei na Adam Robo como Jovem Aprendiz ainda no ensino médio, entre suporte ao cliente, automação de testes com Selenium e as primeiras linhas de PHP. | 353 |
| en | The technical degree in Systems Development at SENAI Dr. Celso Charuri covered logic, SQL, modelling and testing — C on Arduino, Java on the desktop, C# with ASP.NET Core, and Python with Selenium for the final project. I joined Adam Robo as a Junior Apprentice while still in high school: customer support, Selenium test automation, and the first lines of PHP. | 361 |

- **Constraint:** 3–4 lines at 1440
- **Evidence:** `data/experience.tsx` § academicData.systems-analysis (description + achievements) and § adam-robo → Junior Apprentice

### `experience.phases.leadership.number`

| | Text | Chars |
|---|---|---|
| pt-BR | 02 | 2 |
| en | 02 | 2 |

- **Constraint:** 2 characters
- **Evidence:** ordinal, no claim

### `experience.phases.leadership.badge`

| | Text | Chars |
|---|---|---|
| pt-BR | Coordenação | 11 |
| en | Coordination | 12 |

- **Constraint:** ≤ 16 chars
- **Evidence:** `data/experience.tsx` § adam-robo → IT Coordinator

### `experience.phases.leadership.period`

| | Text | Chars |
|---|---|---|
| pt-BR | 2022 — 2024 | 11 |
| en | 2022 — 2024 | 11 |

- **Constraint:** ≤ 16 chars
- **Evidence:** `data/experience.tsx`: Full Stack Jan 2022 – Jun 2022; IT Coordinator Jul 2022 – Mar 2024

### `experience.phases.leadership.title`

| | Text | Chars |
|---|---|---|
| pt-BR | Liderar um time e cursar a faculdade ao mesmo tempo | 51 |
| en | Leading a team and going through university at the same time | 60 |

- **Constraint:** 1–2 lines
- **Evidence:** `data/experience.tsx`: IT Coordinator from Jul 2022; degree started Jun 2022

### `experience.phases.leadership.context`

| | Text | Chars |
|---|---|---|
| pt-BR | Adam Robo · Universidade Positivo | 33 |
| en | Adam Robo · Universidade Positivo | 33 |

- **Constraint:** 1 line
- **Evidence:** `data/experience.tsx` § adam-robo + § academicData.software-engineering

### `experience.phases.leadership.description`

| | Text | Chars |
|---|---|---|
| pt-BR | Fui efetivado como Desenvolvedor Full Stack na Adam Robo em janeiro de 2022 e assumi a Coordenação de TI em julho do mesmo ano: APIs REST em Laravel, configuração de subdomínios, pipelines de CI/CD no GitHub Actions e a liderança da equipe — recrutamento, organização de tarefas e suporte técnico. No mesmo semestre comecei Engenharia de Software na Universidade Positivo. É desse período que vêm a plataforma A1 e o Adam 4.0 entregue à Electrolux. | 448 |
| en | I moved up to Full Stack Developer at Adam Robo in January 2022 and took over IT coordination in July of that year: Laravel REST APIs, subdomain configuration, CI/CD pipelines in GitHub Actions, and running the team — hiring, task management, technical support. That same semester I started Software Engineering at Universidade Positivo. The A1 platform and the Adam 4.0 build delivered to Electrolux both come out of this period. | 430 |

- **Constraint:** 4–5 lines at 1440
- **Evidence:** `data/experience.tsx` § adam-robo (both positions, verbatim dates); `.specs/0100-.../assets/screenshots/a1-*.png` + Adam Robo tenure in `data/experience.tsx`; `.specs/0100-.../assets/screenshots/electrolux-*.png` + Adam Robo tenure in `data/experience.tsx`

### `experience.phases.scale.number`

| | Text | Chars |
|---|---|---|
| pt-BR | 03 | 2 |
| en | 03 | 2 |

- **Constraint:** 2 characters
- **Evidence:** ordinal, no claim

### `experience.phases.scale.badge`

| | Text | Chars |
|---|---|---|
| pt-BR | Liderança técnica | 17 |
| en | Technical leadership | 20 |

- **Constraint:** ≤ 22 chars
- **Evidence:** `data/experience.tsx` § madeira-madeira → Tech Lead

### `experience.phases.scale.period`

| | Text | Chars |
|---|---|---|
| pt-BR | 2024 — Presente | 15 |
| en | 2024 — Present | 14 |

- **Constraint:** ≤ 16 chars
- **Evidence:** `data/experience.tsx`: MadeiraMadeira from 2024-03-18

### `experience.phases.scale.title`

| | Text | Chars |
|---|---|---|
| pt-BR | Alta escala e governança técnica | 32 |
| en | High scale and technical governance | 35 |

- **Constraint:** 1 line
- **Evidence:** narrative label; scope per `PRODUCT.md` § Positioning

### `experience.phases.scale.context`

| | Text | Chars |
|---|---|---|
| pt-BR | MadeiraMadeira · iSend e iShip | 30 |
| en | MadeiraMadeira · iSend and iShip | 32 |

- **Constraint:** 1 line
- **Evidence:** `data/experience.tsx` § madeira-madeira

### `experience.phases.scale.description`

| | Text | Chars |
|---|---|---|
| pt-BR | Entrei na MadeiraMadeira em março de 2024 como Desenvolvedor Full Stack Júnior no time Experiência Operacional, no iSend — o TMS da iTrack —, onde passei a responder por observabilidade com New Relic, quality gates com SonarQube e refatoração de áreas críticas. Em junho de 2025 assumi como Pleno e, em junho de 2026, a liderança técnica do time Experiência do Motorista: iShip, eventos em Kafka com contratos Avro, serviços em NestJS e planejamento de capacidade trimestral. | 475 |
| en | I joined MadeiraMadeira in March 2024 as a Junior Full Stack Developer on the Operational Experience team, working on iSend — iTrack's TMS — where I took on observability with New Relic, quality gates with SonarQube, and the refactoring of critical areas. In June 2025 I stepped up to mid-level Full Stack and, in June 2026, to technical lead of the Driver Experience team: iShip, Kafka events under Avro contracts, NestJS services, and quarterly capacity planning. | 465 |

- **Constraint:** 4–5 lines at 1440
- **Evidence:** `data/experience.tsx` § madeira-madeira (three positions, verbatim dates); `locales/*.ts` (existing copy)

## Engineering proof — section frame

### `projects.title`

| | Text | Chars |
|---|---|---|
| pt-BR | Provas de engenharia | 20 |
| en | Engineering proof | 17 |

- **Constraint:** section heading
- **Evidence:** narrative label

### `projects.description`

| | Text | Chars |
|---|---|---|
| pt-BR | Quatro sistemas em produção — dois de logística, dois de triagem visual. Cada um abre com o problema de engenharia, as decisões de arquitetura e o que coube a mim liderar. | 171 |
| en | Four production systems — two in logistics, two in visual screening. Each one opens with the engineering problem, the architectural decisions, and what I led. | 158 |

- **Constraint:** 2 lines at 1440
- **Evidence:** `data/experience.tsx`; `.specs/0100-.../assets/screenshots/a1-*.png` + Adam Robo tenure in `data/experience.tsx`; `.specs/0100-.../assets/screenshots/electrolux-*.png` + Adam Robo tenure in `data/experience.tsx`

### `projects.openSourceTitle`

| | Text | Chars |
|---|---|---|
| pt-BR | Projetos pessoais e open source | 31 |
| en | Personal and open-source projects | 33 |

- **Constraint:** subordinate heading — one type step below `projects.title`
- **Evidence:** existing key, rewritten in sentence case to sit below the production cases (AC17)

### `projects.openSourceDescription`

| | Text | Chars |
|---|---|---|
| pt-BR | Bibliotecas e utilitários que mantenho fora do trabalho de produção. Escala menor, propósito diferente. | 103 |
| en | Libraries and utilities I maintain outside of production work. Smaller scale, different purpose. | 96 |

- **Constraint:** 1–2 lines
- **Evidence:** `data/projects.tsx` — the four archived/personal repositories

## Case interaction — shared strings

One set of pillar headings for all four cases, replacing the per-case `challengeTitle` / `architectureTitle` / `resultTitle` keys (see Deletions). `{title}` is interpolated with the case's `title`, exactly like the existing `a11y.expandPositions` pattern.

### `projects.case.challengeTitle`

| | Text | Chars |
|---|---|---|
| pt-BR | O problema | 10 |
| en | The problem | 11 |

- **Constraint:** ≤ 24 chars
- **Evidence:** pillar heading

### `projects.case.architectureTitle`

| | Text | Chars |
|---|---|---|
| pt-BR | Arquitetura e trade-offs | 24 |
| en | Architecture and trade-offs | 27 |

- **Constraint:** ≤ 32 chars
- **Evidence:** pillar heading — AC15

### `projects.case.resultTitle`

| | Text | Chars |
|---|---|---|
| pt-BR | Resultado e liderança | 21 |
| en | Outcome and leadership | 22 |

- **Constraint:** ≤ 32 chars
- **Evidence:** pillar heading — AC15

### `projects.case.stackTitle`

| | Text | Chars |
|---|---|---|
| pt-BR | Tecnologias | 11 |
| en | Technologies | 12 |

- **Constraint:** ≤ 24 chars
- **Evidence:** pillar heading — AC15

### `projects.case.evidenceTitle`

| | Text | Chars |
|---|---|---|
| pt-BR | O sistema | 9 |
| en | The system | 10 |

- **Constraint:** ≤ 24 chars
- **Evidence:** heading above the capture(s)

### `projects.case.responsiveTitle`

| | Text | Chars |
|---|---|---|
| pt-BR | A mesma aplicação no celular | 28 |
| en | The same application at phone width | 35 |

- **Constraint:** ≤ 40 chars
- **Evidence:** heading for the four optional A1 mobile captures (OQ4)

### `projects.case.open`

| | Text | Chars |
|---|---|---|
| pt-BR | Ver arquitetura e decisões | 26 |
| en | See the architecture and decisions | 34 |

- **Constraint:** button label, ≤ 36 chars
- **Evidence:** affordance label, no claim

### `projects.case.close`

| | Text | Chars |
|---|---|---|
| pt-BR | Fechar | 6 |
| en | Close | 5 |

- **Constraint:** ≤ 12 chars
- **Evidence:** affordance label, no claim

### `a11y.openCase`

| | Text | Chars |
|---|---|---|
| pt-BR | Abrir o case de engenharia: {title} | 35 |
| en | Open the engineering case: {title} | 34 |

- **Constraint:** screen-reader only
- **Evidence:** AC16 — accessible name of the trigger

### `a11y.closeCase`

| | Text | Chars |
|---|---|---|
| pt-BR | Fechar o case (tecla Esc) | 25 |
| en | Close the case (Esc key) | 24 |

- **Constraint:** accessible name of the close button
- **Evidence:** AC16 — `Esc` is the documented shortcut

### `a11y.caseDialog`

| | Text | Chars |
|---|---|---|
| pt-BR | Case de engenharia: {title} | 27 |
| en | Engineering case: {title} | 25 |

- **Constraint:** dialog accessible name
- **Evidence:** AC16 — `aria-label` on the dialog

### `a11y.profilePhoto`

| | Text | Chars |
|---|---|---|
| pt-BR | Retrato de Rafael Martins Alves | 31 |
| en | Portrait of Rafael Martins Alves | 32 |

- **Constraint:** alt text
- **Evidence:** replaces the hardcoded pt-BR alt at `components/organisms/hero-section.tsx:76` — AC21

## Case 1 — iShip

### `projects.cases.iship.badge`

| | Text | Chars |
|---|---|---|
| pt-BR | Tech Lead · foco atual | 22 |
| en | Tech Lead · current focus | 25 |

- **Constraint:** ≤ 28 chars
- **Evidence:** `data/experience.tsx` § madeira-madeira → Tech Lead, June 2026 – Present

### `projects.cases.iship.team`

| | Text | Chars |
|---|---|---|
| pt-BR | MadeiraMadeira · squad Experiência do Motorista | 47 |
| en | MadeiraMadeira · Driver Experience squad | 40 |

- **Constraint:** 1 line
- **Evidence:** `data/experience.tsx`; `locales/*.ts` (existing copy)

### `projects.cases.iship.title`

| | Text | Chars |
|---|---|---|
| pt-BR | Orquestrar a jornada do motorista entre serviços novos e transporte legado | 74 |
| en | Orchestrating the driver journey across new services and legacy transport systems | 81 |

- **Constraint:** 2 lines on the card at 1440 — AC9: names the engineering problem
- **Evidence:** `locales/*.ts` (existing copy) `projects.cases.iship.challenge`; `data/experience.tsx`

### `projects.cases.iship.systemName`

| | Text | Chars |
|---|---|---|
| pt-BR | Plataforma do Motorista (iShip) | 31 |
| en | Driver Platform (iShip) | 23 |

- **Constraint:** ≤ 36 chars
- **Evidence:** `locales/*.ts` (existing copy); `PRODUCT.md` § Evidence on Hand

### `projects.cases.iship.status`

| | Text | Chars |
|---|---|---|
| pt-BR | Produção · logística nacional | 29 |
| en | Production · national logistics | 31 |

- **Constraint:** ≤ 34 chars — non-URL environment label (AC13)
- **Evidence:** `PRODUCT.md` § Evidence on Hand — "national distribution hubs"

### `projects.cases.iship.subtitle`

| | Text | Chars |
|---|---|---|
| pt-BR | Ecossistema que liga o motorista em campo aos centros de distribuição: app do motorista, API em NestJS sobre PostgreSQL, eventos em Kafka com contratos Avro, Lambdas em Python e o Painel de Escala em React 19. | 209 |
| en | The ecosystem that connects field drivers to the distribution hubs: the driver app, a NestJS API on PostgreSQL, Kafka events under Avro contracts, Python Lambdas, and the Driver Scale panel in React 19. | 202 |

- **Constraint:** 2–3 lines
- **Evidence:** `locales/*.ts` (existing copy); `data/experience.tsx`

### `projects.cases.iship.challenge`

| | Text | Chars |
|---|---|---|
| pt-BR | A jornada operacional inteira — oferta de carga, check-in no centro de distribuição, conferência de notas fiscais e volumes, comprovante de entrega — precisa fechar com alta disponibilidade. E os serviços novos em NestJS tinham que conviver com os sistemas de transporte legados, não substituí-los de uma vez. | 309 |
| en | The whole operational journey — load offers, check-in at the distribution hub, invoice and volume scanning, proof of delivery — has to close with high availability. And the new NestJS services had to coexist with the legacy transport systems rather than replace them in one move. | 279 |

- **Constraint:** 4 lines in the detail view
- **Evidence:** `locales/*.ts` (existing copy) `projects.cases.iship.challenge`; `data/experience.tsx`

### `projects.cases.iship.architecture`

| | Text | Chars |
|---|---|---|
| pt-BR | API central em NestJS/TypeScript sobre PostgreSQL. A conversa com o legado em Laravel passa por Kafka, com contratos tipados em Apache Avro: o schema é o acordo entre os dois lados — custa disciplina de versionamento e paga em contratos que não quebram em silêncio. Lambdas em Python carregam os cálculos agendados e as pontes de evento com os sistemas antigos, mantendo essa carga fora do serviço principal. O Painel de Escala é um microfrontend em React 19 com Vite, com ciclo de deploy próprio. | 497 |
| en | A core NestJS/TypeScript API on PostgreSQL. It talks to the Laravel legacy through Kafka under typed Apache Avro contracts: the schema is the agreement between both sides — it costs versioning discipline and pays back in contracts that never break silently. Python Lambdas carry the scheduled calculations and the event bridges to the older systems, keeping that load off the core service. The Driver Scale panel is a React 19 microfrontend on Vite, with its own deploy cycle. | 476 |

- **Constraint:** 6–7 lines in the detail view
- **Evidence:** `locales/*.ts` (existing copy) `projects.cases.iship.architecture`; `data/experience.tsx`

### `projects.cases.iship.result`

| | Text | Chars |
|---|---|---|
| pt-BR | Como Tech Lead faço o planejamento de capacidade trimestral com PM e Product Designer, cortando escopo até a entrega caber no trimestre. Em incidente, a triagem começa comigo: New Relic, query direta no banco e Microsoft Clarity antes de acionar o squad — o time só é interrompido quando já existe o que corrigir. | 313 |
| en | As Tech Lead I run quarterly capacity planning with the PM and the Product Designer, cutting scope until the delivery fits the quarter. When something breaks, triage starts with me: New Relic, a direct database query, Microsoft Clarity — the squad is only interrupted once there is something real to fix. | 304 |

- **Constraint:** 4–5 lines in the detail view
- **Evidence:** `data/experience.tsx` § madeira-madeira → Tech Lead; `locales/*.ts` (existing copy)

### `projects.cases.iship.tagline`

| | Text | Chars |
|---|---|---|
| pt-BR | Arquitetura de eventos e liderança técnica | 42 |
| en | Event-driven architecture and technical leadership | 50 |

- **Constraint:** ≤ 52 chars
- **Evidence:** `locales/*.ts` (existing copy), unchanged in substance

### `projects.cases.iship.diagramTitle`

| | Text | Chars |
|---|---|---|
| pt-BR | Fluxo de eventos do iShip | 25 |
| en | The iShip event flow | 20 |

- **Constraint:** ≤ 32 chars
- **Evidence:** heading for the architecture diagram moved into the detail view (AC15)

### `projects.cases.iship.alt`

| | Text | Chars |
|---|---|---|
| pt-BR | Montagem com seis telas do aplicativo do motorista do iShip, ecossistema que Rafael lidera tecnicamente: abertura do app, lista de paradas do dia, rota no mapa, detalhe da entrega com ações de contato e navegação, e a confirmação de entrega concluída. | 251 |
| en | A composite of six screens from the iShip driver app, the ecosystem Rafael leads technically: app launch, the day's stop list, the route on a map, a delivery detail with contact and navigation actions, and the delivery-completed confirmation. The app interface is in Brazilian Portuguese. | 288 |

- **Constraint:** alt text — AC11, AC14
- **Evidence:** `public/app-iship.png` (read directly); authorship per `data/experience.tsx`

## Case 2 — iSend

The "1,100+ routes" figure survives only inside the prose of `challenge` and inside one schematic sublabel, as description of the system's size. It is not the title, not a badge, not a metric (spec § E).

### `projects.cases.isend.badge`

| | Text | Chars |
|---|---|---|
| pt-BR | Desenvolvedor Full Stack | 24 |
| en | Full Stack Developer | 20 |

- **Constraint:** ≤ 28 chars
- **Evidence:** `data/experience.tsx` § madeira-madeira → Full Stack Developer, June 2025 – May 2026

### `projects.cases.isend.team`

| | Text | Chars |
|---|---|---|
| pt-BR | MadeiraMadeira · squad Experiência Operacional | 46 |
| en | MadeiraMadeira · Operational Experience squad | 45 |

- **Constraint:** 1 line
- **Evidence:** `data/experience.tsx`; `locales/*.ts` (existing copy)

### `projects.cases.isend.title`

| | Text | Chars |
|---|---|---|
| pt-BR | Estabilizar um TMS legado e torná-lo observável | 47 |
| en | Stabilising a legacy TMS and making it observable | 49 |

- **Constraint:** 2 lines on the card — AC9
- **Evidence:** `data/experience.tsx` § madeira-madeira → Full Stack Developer; `locales/*.ts` (existing copy)

### `projects.cases.isend.systemName`

| | Text | Chars |
|---|---|---|
| pt-BR | Sistema de Gestão de Transporte (iSend) | 39 |
| en | Transportation Management System (iSend) | 40 |

- **Constraint:** ≤ 44 chars
- **Evidence:** `locales/*.ts` (existing copy); `PRODUCT.md` § Evidence on Hand

### `projects.cases.isend.status`

| | Text | Chars |
|---|---|---|
| pt-BR | Produção · expedição diária | 27 |
| en | Production · daily dispatch | 27 |

- **Constraint:** ≤ 34 chars — non-URL environment label (AC13)
- **Evidence:** `locales/*.ts` (existing copy) `projects.cases.isend.challenge`

### `projects.cases.isend.subtitle`

| | Text | Chars |
|---|---|---|
| pt-BR | TMS em Laravel e PHP sobre MySQL que sustenta a expedição diária: emissão de romaneios, despacho de cargas e acompanhamento de notas fiscais. | 141 |
| en | A Laravel and PHP TMS on MySQL carrying the daily dispatch operation: shipping manifests, freight release, and invoice tracking. | 128 |

- **Constraint:** 2–3 lines
- **Evidence:** `locales/*.ts` (existing copy); `data/experience.tsx`

### `projects.cases.isend.challenge`

| | Text | Chars |
|---|---|---|
| pt-BR | Um monólito grande, com mais de 1.100 rotas, em uso constante na operação diária de transporte — e sem logs estruturados nem telemetria montada. Quando algo quebrava, a investigação começava pela leitura do código em vez de pelo dado. Corrigir bug e entregar funcionalidade nova tinham que acontecer sem parar a expedição. | 322 |
| en | A large monolith — over 1,100 routes — in constant use by the daily transport operation, with no structured logging and no telemetry in place. When something broke, the investigation started by reading code instead of reading data. Bug fixes and new features had to land without stopping dispatch. | 297 |

- **Constraint:** 4–5 lines in the detail view
- **Evidence:** `locales/*.ts` (existing copy) `projects.cases.isend.challenge` and `.result`; `data/experience.tsx` § madeira-madeira

### `projects.cases.isend.architecture`

| | Text | Chars |
|---|---|---|
| pt-BR | Laravel e PHP sobre MySQL relacional, com Lambdas em Python para rotinas isoladas que não precisavam viver dentro do monólito. A decisão foi instrumentar e refatorar por dentro em vez de reescrever: New Relic para tracing e logs estruturados, pipeline de CI no GitHub Actions com checagem de cobertura e SonarQube analisando cada pull request. Reescrever seria mais limpo e teria custado a operação — o legado ficou de pé, com um perímetro de qualidade em volta. | 462 |
| en | Laravel and PHP over relational MySQL, with Python Lambdas for isolated routines that did not need to live inside the monolith. The decision was to instrument and refactor in place rather than rewrite: New Relic for tracing and structured logs, a GitHub Actions CI pipeline with coverage enforcement, and SonarQube on every pull request. A rewrite would have been cleaner and would have cost the operation — the legacy stayed standing, with a quality perimeter around it. | 471 |

- **Constraint:** 6–7 lines in the detail view
- **Evidence:** `locales/*.ts` (existing copy) `projects.cases.isend.architecture`; `data/experience.tsx` § madeira-madeira

### `projects.cases.isend.result`

| | Text | Chars |
|---|---|---|
| pt-BR | O incidente passou a começar pela telemetria: a rota que falha identificada por dado, não por suposição. Rotas críticas otimizadas, testes automatizados e quality gates barrando regressão antes do merge, e documentação e revisões de arquitetura deixando o sistema legível para quem chegasse depois. | 298 |
| en | Incidents started from telemetry: the failing route identified from data rather than from a guess. Critical routes optimised, automated tests and quality gates blocking regressions before merge, and documentation and architecture reviews leaving the system readable for whoever came next. | 288 |

- **Constraint:** 4 lines in the detail view
- **Evidence:** `locales/*.ts` (existing copy) `projects.cases.isend.result`; `data/experience.tsx`

### `projects.cases.isend.tagline`

| | Text | Chars |
|---|---|---|
| pt-BR | Estabilização de legado e observabilidade | 41 |
| en | Legacy stabilisation and observability | 38 |

- **Constraint:** ≤ 52 chars
- **Evidence:** spec § E — replaces the retired "1,100+ routes" framing

## Case 2 — the iSend schematic

AC12: this visual must read as a diagram, never as a simulated interface. The caption states it outright, in both locales, so the distinction survives even for a reader who only skims.

### `projects.cases.isend.schema.title`

| | Text | Chars |
|---|---|---|
| pt-BR | Esquema de instrumentação do iSend | 34 |
| en | iSend instrumentation schematic | 31 |

- **Constraint:** ≤ 40 chars
- **Evidence:** AC12

### `projects.cases.isend.schema.caption`

| | Text | Chars |
|---|---|---|
| pt-BR | Diagrama desenhado para este portfólio. Não é uma captura do sistema. | 69 |
| en | Diagram drawn for this portfolio. It is not a screenshot of the system. | 71 |

- **Constraint:** 2 lines, always visible — AC12
- **Evidence:** AC12 / STATUS.md decisions log, run 1

### `projects.cases.isend.schema.core`

| | Text | Chars |
|---|---|---|
| pt-BR | Monólito Laravel/PHP | 20 |
| en | Laravel/PHP monolith | 20 |

- **Constraint:** node label, ≤ 24 chars
- **Evidence:** `locales/*.ts` (existing copy); `data/experience.tsx`

### `projects.cases.isend.schema.coreSub`

| | Text | Chars |
|---|---|---|
| pt-BR | Mais de 1.100 rotas | 19 |
| en | Over 1,100 routes | 17 |

- **Constraint:** node sublabel, ≤ 24 chars
- **Evidence:** `locales/*.ts` (existing copy) — descriptive, not a badge (spec § E)

### `projects.cases.isend.schema.db`

| | Text | Chars |
|---|---|---|
| pt-BR | MySQL | 5 |
| en | MySQL | 5 |

- **Constraint:** node label
- **Evidence:** `data/experience.tsx` § madeira-madeira

### `projects.cases.isend.schema.dbSub`

| | Text | Chars |
|---|---|---|
| pt-BR | Base relacional da operação | 27 |
| en | Operational relational store | 28 |

- **Constraint:** node sublabel, ≤ 30 chars
- **Evidence:** `locales/*.ts` (existing copy)

### `projects.cases.isend.schema.async`

| | Text | Chars |
|---|---|---|
| pt-BR | AWS Lambda (Python) | 19 |
| en | AWS Lambda (Python) | 19 |

- **Constraint:** node label
- **Evidence:** `locales/*.ts` (existing copy); `data/experience.tsx`

### `projects.cases.isend.schema.asyncSub`

| | Text | Chars |
|---|---|---|
| pt-BR | Rotinas isoladas | 16 |
| en | Isolated routines | 17 |

- **Constraint:** node sublabel, ≤ 24 chars
- **Evidence:** `locales/*.ts` (existing copy)

### `projects.cases.isend.schema.apm`

| | Text | Chars |
|---|---|---|
| pt-BR | New Relic | 9 |
| en | New Relic | 9 |

- **Constraint:** node label
- **Evidence:** `locales/*.ts` (existing copy); `data/experience.tsx`

### `projects.cases.isend.schema.apmSub`

| | Text | Chars |
|---|---|---|
| pt-BR | Tracing e logs estruturados | 27 |
| en | Tracing and structured logs | 27 |

- **Constraint:** node sublabel, ≤ 30 chars
- **Evidence:** `locales/*.ts` (existing copy)

### `projects.cases.isend.schema.ci`

| | Text | Chars |
|---|---|---|
| pt-BR | GitHub Actions e SonarQube | 26 |
| en | GitHub Actions and SonarQube | 28 |

- **Constraint:** node label, ≤ 30 chars
- **Evidence:** `locales/*.ts` (existing copy)

### `projects.cases.isend.schema.ciSub`

| | Text | Chars |
|---|---|---|
| pt-BR | Cobertura e quality gate por PR | 31 |
| en | Coverage and quality gate per PR | 32 |

- **Constraint:** node sublabel, ≤ 34 chars
- **Evidence:** `locales/*.ts` (existing copy)

### `projects.cases.isend.alt`

| | Text | Chars |
|---|---|---|
| pt-BR | Diagrama, não captura de tela: esquema dos pontos de instrumentação que Rafael implantou no iSend. O monólito Laravel/PHP com mais de 1.100 rotas no centro, ligado ao MySQL da operação e às Lambdas em Python; ao redor, o New Relic recebendo tracing e logs estruturados e o pipeline GitHub Actions com SonarQube barrando cada pull request. | 338 |
| en | A diagram, not a screenshot: a schematic of the instrumentation Rafael put into iSend. The Laravel/PHP monolith with its 1,100-plus routes sits at the centre, wired to the operational MySQL database and to the Python Lambdas; around it, New Relic receiving tracing and structured logs, and the GitHub Actions pipeline with SonarQube gating every pull request. | 359 |

- **Constraint:** alt text — AC11, AC12
- **Evidence:** `locales/*.ts` (existing copy); `data/experience.tsx` § madeira-madeira

## Case 3 — Adam Robo A1

Per OQ2 this case carries no quantitative claim. Every statement below is either visible in the captures or written in `data/experience.tsx`.

### `projects.cases.a1.badge`

| | Text | Chars |
|---|---|---|
| pt-BR | Coordenador de TI e Desenvolvedor Full Stack | 44 |
| en | IT Coordinator and Full Stack Developer | 39 |

- **Constraint:** ≤ 46 chars
- **Evidence:** `data/experience.tsx` § adam-robo

### `projects.cases.a1.team`

| | Text | Chars |
|---|---|---|
| pt-BR | Adam Robo | 9 |
| en | Adam Robo | 9 |

- **Constraint:** 1 line
- **Evidence:** `data/experience.tsx` § adam-robo

### `projects.cases.a1.title`

| | Text | Chars |
|---|---|---|
| pt-BR | Um fluxo de triagem visual em três modos, do navegador à impressão térmica | 74 |
| en | One visual-screening flow in three modes, from the browser to the thermal printer | 81 |

- **Constraint:** 2 lines on the card — AC9
- **Evidence:** `.specs/0100-.../assets/screenshots/a1-*.png` + Adam Robo tenure in `data/experience.tsx` — `a1-home-*` (three modes), `a1-test-completed-*` (A4 and thermal printing)

### `projects.cases.a1.systemName`

| | Text | Chars |
|---|---|---|
| pt-BR | Plataforma Adam Robo A1 | 23 |
| en | Adam Robo A1 platform | 21 |

- **Constraint:** ≤ 32 chars
- **Evidence:** `.specs/0100-.../assets/screenshots/a1-*.png` + Adam Robo tenure in `data/experience.tsx`

### `projects.cases.a1.status`

| | Text | Chars |
|---|---|---|
| pt-BR | Produção · atendimento a pacientes | 34 |
| en | Production · patient screening | 30 |

- **Constraint:** ≤ 34 chars — non-URL environment label (AC13)
- **Evidence:** `.specs/0100-.../assets/screenshots/a1-*.png` + Adam Robo tenure in `data/experience.tsx` — the product UI addresses "o paciente" throughout

### `projects.cases.a1.subtitle`

| | Text | Chars |
|---|---|---|
| pt-BR | Plataforma web de triagem visual: acuidade em escala Snellen, teste de visão de cores, três modos de exame e laudo impresso em A4 ou em impressora térmica. | 155 |
| en | A web platform for visual screening: Snellen acuity, colour-vision testing, three exam modes, and a report printed on A4 or on a thermal printer. | 145 |

- **Constraint:** 2–3 lines
- **Evidence:** `.specs/0100-.../assets/screenshots/a1-*.png` + Adam Robo tenure in `data/experience.tsx`

### `projects.cases.a1.challenge`

| | Text | Chars |
|---|---|---|
| pt-BR | Um exame de triagem visual tem ordem, e a ordem não pode depender de quem aplica. O mesmo protocolo precisava rodar em três modos de duração diferente, no desktop e no celular, e terminar sempre em um laudo imprimível — A4 ou bobina térmica, dois formatos com restrições opostas. | 279 |
| en | A screening exam has an order, and that order cannot depend on whoever is running it. The same protocol had to work in three modes of different length, on the desktop and on a phone, and always end in a printable report — A4 or thermal roll, two formats with opposite constraints. | 280 |

- **Constraint:** 4–5 lines in the detail view
- **Evidence:** `.specs/0100-.../assets/screenshots/a1-*.png` + Adam Robo tenure in `data/experience.tsx` — mode selection, guided step flow with a progress indicator, responsive captures, dual print output

### `projects.cases.a1.architecture`

| | Text | Chars |
|---|---|---|
| pt-BR | Laravel com MySQL no backend, React.js com TypeScript no frontend, entregues como uma única aplicação web responsiva — sem cliente instalado, o que tira a deriva de versão do parque de máquinas e coloca o custo na compatibilidade de navegador. O ambiente roda em Docker e o deploy passa por pipeline de CI/CD no GitHub Actions; rotinas em Python cobrem o trabalho que não pertence ao ciclo de requisição. | 404 |
| en | Laravel with MySQL on the back end, React.js with TypeScript on the front, delivered as a single responsive web application — no installed client, which takes version drift off the machines and puts the cost onto browser compatibility. The environment runs in Docker and ships through a GitHub Actions CI/CD pipeline; Python routines cover the work that does not belong in the request cycle. | 391 |

- **Constraint:** 5–6 lines in the detail view
- **Evidence:** `data/experience.tsx` § adam-robo (Laravel, React.js, TypeScript, MySQL, Docker, Python, GitHub Actions CI/CD); `.specs/0100-.../assets/screenshots/a1-*.png` + Adam Robo tenure in `data/experience.tsx` for the responsive delivery

### `projects.cases.a1.result`

| | Text | Chars |
|---|---|---|
| pt-BR | A plataforma entrou em operação atendendo pacientes, com o exame completo — configuração, acuidade, visão de cores, conclusão e impressão — fechando dentro do navegador. No mesmo período eu coordenava a equipe de TI da Adam Robo: participei do recrutamento, organizei as tarefas do time, respondi pelo suporte técnico e montei os pipelines de deploy que sustentavam essas entregas. | 381 |
| en | The platform went into operation screening patients, with the full exam — setup, acuity, colour vision, completion, printing — closing inside the browser. Over the same period I was coordinating Adam Robo's IT team: I took part in hiring, organised the team's work, answered for technical support, and built the deployment pipelines behind these releases. | 355 |

- **Constraint:** 5 lines in the detail view
- **Evidence:** `.specs/0100-.../assets/screenshots/a1-*.png` + Adam Robo tenure in `data/experience.tsx`; `data/experience.tsx` § adam-robo → IT Coordinator

### `projects.cases.a1.tagline`

| | Text | Chars |
|---|---|---|
| pt-BR | Software de triagem e liderança de equipe | 41 |
| en | Screening software and team leadership | 38 |

- **Constraint:** ≤ 52 chars
- **Evidence:** `data/experience.tsx` § adam-robo

## Case 3 — alt text for each A1 capture

AC11 and AC14. The captures are pt-BR product UI and are never translated, so each English alt carries the information an English reader cannot get from the image, and says so.

### `projects.cases.a1.shots.home`

| | Text | Chars |
|---|---|---|
| pt-BR | Tela inicial da plataforma A1 construída por Rafael: o operador é recebido pelo nome e escolhe entre três modos de triagem — Completo, Rápido e Express —, cada um marcado com o percentual de prevenção que cobre. | 211 |
| en | Home screen of the A1 screening platform Rafael built: the operator is greeted by name and picks one of three exam modes — full, quick, express — each labelled with the share of prevention it covers. The interface is in Brazilian Portuguese. | 241 |

- **Constraint:** alt text
- **Evidence:** `.specs/0100-.../assets/screenshots/a1-*.png` + Adam Robo tenure in `data/experience.tsx` `a1-home-desktop.png`

### `projects.cases.a1.shots.setup`

| | Text | Chars |
|---|---|---|
| pt-BR | Etapa de configuração do exame na plataforma A1 de Rafael: o operador registra se o paciente usará correção e se o teste será feito com os dois olhos ou com apenas um, com uma barra de progresso acompanhando o fluxo. | 216 |
| en | The exam setup step in Rafael's A1 platform: the operator records whether the patient will wear corrective lenses and whether the test covers both eyes or only one, with a progress bar tracking the flow. The interface is in Brazilian Portuguese. | 245 |

- **Constraint:** alt text
- **Evidence:** `.specs/0100-.../assets/screenshots/a1-*.png` + Adam Robo tenure in `data/experience.tsx` `a1-test-setup-desktop.png`

### `projects.cases.a1.shots.acuity`

| | Text | Chars |
|---|---|---|
| pt-BR | Aplicação do exame na plataforma A1 desenvolvida por Rafael: teste de visão de cores com três alvos coloridos, seguido de cinco linhas de acuidade em escala Snellen, de 20/200 a 20/30, cada linha com o registro de quanto o paciente errou e um campo de observações. | 264 |
| en | The exam screen in the A1 platform Rafael built: a colour-vision check with three coloured targets, followed by five Snellen acuity lines from 20/200 to 20/30, each with a control for how much of the line the patient missed, plus a notes field. The interface is in Brazilian Portuguese. | 286 |

- **Constraint:** alt text
- **Evidence:** `.specs/0100-.../assets/screenshots/a1-*.png` + Adam Robo tenure in `data/experience.tsx` `a1-test-acuity-desktop.png`

### `projects.cases.a1.shots.completed`

| | Text | Chars |
|---|---|---|
| pt-BR | Conclusão do exame na plataforma A1 de Rafael: confirmação de teste finalizado e as ações seguintes — voltar à página inicial, iniciar um novo teste, imprimir o laudo em A4 ou imprimir em impressora térmica. | 207 |
| en | The end of an exam in Rafael's A1 platform: a success confirmation and the next actions — return home, start a new test, print the report on A4, or print it on a thermal printer. The interface is in Brazilian Portuguese. | 220 |

- **Constraint:** alt text
- **Evidence:** `.specs/0100-.../assets/screenshots/a1-*.png` + Adam Robo tenure in `data/experience.tsx` `a1-test-completed-desktop.png`

### `projects.cases.a1.shots.homeMobile`

| | Text | Chars |
|---|---|---|
| pt-BR | A mesma tela inicial do A1 em largura de celular: os três modos de triagem empilhados em coluna única, sem nada do conteúdo do desktop ficar de fora. | 149 |
| en | The same A1 home screen at phone width: the three screening modes stack into a single column with none of the desktop content dropped. The interface is in Brazilian Portuguese. | 176 |

- **Constraint:** alt text — optional capture (OQ4)
- **Evidence:** `.specs/0100-.../assets/screenshots/a1-*.png` + Adam Robo tenure in `data/experience.tsx` `a1-home-mobile.png`

### `projects.cases.a1.shots.setupMobile`

| | Text | Chars |
|---|---|---|
| pt-BR | A configuração do exame do A1 em largura de celular: as mesmas opções de correção e de olhos testados, reordenadas em coluna única acima do botão de avançar. | 157 |
| en | The A1 exam setup at phone width: the same corrective-lens and which-eye options, reflowed into a single column above the continue button. The interface is in Brazilian Portuguese. | 180 |

- **Constraint:** alt text — optional capture (OQ4)
- **Evidence:** `.specs/0100-.../assets/screenshots/a1-*.png` + Adam Robo tenure in `data/experience.tsx` `a1-test-setup-mobile.png`

### `projects.cases.a1.shots.acuityMobile`

| | Text | Chars |
|---|---|---|
| pt-BR | A aplicação do exame do A1 em largura de celular: as linhas Snellen e o registro de erro em coluna única, mantendo a ordem do protocolo. | 136 |
| en | The A1 exam at phone width: the Snellen lines and the miss controls in a single column, holding the order of the protocol. The interface is in Brazilian Portuguese. | 164 |

- **Constraint:** alt text — optional capture (OQ4)
- **Evidence:** `.specs/0100-.../assets/screenshots/a1-*.png` + Adam Robo tenure in `data/experience.tsx` `a1-test-acuity-mobile.png`

### `projects.cases.a1.shots.completedMobile`

| | Text | Chars |
|---|---|---|
| pt-BR | A conclusão do exame do A1 em largura de celular: as quatro ações finais, incluindo impressão em A4 e térmica, em grade de dois por dois. | 137 |
| en | The end of the A1 exam at phone width: the four closing actions, A4 and thermal printing among them, in a two-by-two grid. The interface is in Brazilian Portuguese. | 164 |

- **Constraint:** alt text — optional capture (OQ4)
- **Evidence:** `.specs/0100-.../assets/screenshots/a1-*.png` + Adam Robo tenure in `data/experience.tsx` `a1-test-completed-mobile.png`

## Case 4 — Adam 4.0 at Electrolux

Electrolux is named as context for the engineering problem only (OQ3). No brand asset is introduced; the wordmark appears solely inside the unmodified report capture (AC10).

### `projects.cases.electrolux.badge`

| | Text | Chars |
|---|---|---|
| pt-BR | Coordenador de TI e Desenvolvedor Full Stack | 44 |
| en | IT Coordinator and Full Stack Developer | 39 |

- **Constraint:** ≤ 46 chars
- **Evidence:** `data/experience.tsx` § adam-robo

### `projects.cases.electrolux.team`

| | Text | Chars |
|---|---|---|
| pt-BR | Adam Robo · entrega para a Electrolux | 37 |
| en | Adam Robo · delivered to Electrolux | 35 |

- **Constraint:** 1 line
- **Evidence:** `data/experience.tsx` § adam-robo; `.specs/0100-.../assets/screenshots/electrolux-*.png` + Adam Robo tenure in `data/experience.tsx`; OQ3

### `projects.cases.electrolux.title`

| | Text | Chars |
|---|---|---|
| pt-BR | A sessão de teste precisa terminar em laudo ocupacional assinado | 64 |
| en | The test session has to end in a signed occupational-health record | 66 |

- **Constraint:** 2 lines on the card — AC9
- **Evidence:** `.specs/0100-.../assets/screenshots/electrolux-*.png` + Adam Robo tenure in `data/experience.tsx` `electrolux-report-desktop.png` — worker data, anamnesis, results, applicator and physician signature fields

### `projects.cases.electrolux.systemName`

| | Text | Chars |
|---|---|---|
| pt-BR | Adam 4.0 — Electrolux | 21 |
| en | Adam 4.0 — Electrolux | 21 |

- **Constraint:** ≤ 32 chars
- **Evidence:** `.specs/0100-.../assets/screenshots/electrolux-*.png` + Adam Robo tenure in `data/experience.tsx`

### `projects.cases.electrolux.status`

| | Text | Chars |
|---|---|---|
| pt-BR | Produção · implantação interna | 30 |
| en | Production · internal deployment | 32 |

- **Constraint:** ≤ 34 chars — non-URL environment label (AC13)
- **Evidence:** `.specs/0100-.../assets/screenshots/electrolux-*.png` + Adam Robo tenure in `data/experience.tsx` — the report header reads "Saúde ocupacional" and "Unidade Electrolux S/A"

### `projects.cases.electrolux.subtitle`

| | Text | Chars |
|---|---|---|
| pt-BR | Versão do Adam para saúde ocupacional: acuidade de longe e de perto e teste de Ishihara em interface escura, com laudo reunindo dados do trabalhador, anamnese e assinaturas. | 173 |
| en | The occupational-health build of Adam: far and near acuity plus Ishihara testing in a dark interface, with a report gathering worker data, anamnesis, and signatures. | 165 |

- **Constraint:** 2–3 lines
- **Evidence:** `.specs/0100-.../assets/screenshots/electrolux-*.png` + Adam Robo tenure in `data/experience.tsx`

### `projects.cases.electrolux.challenge`

| | Text | Chars |
|---|---|---|
| pt-BR | Em saúde ocupacional o resultado do exame não é o fim do trabalho: o que a empresa precisa é do laudo — matrícula, setor, cargo, motivo do exame, anamnese, resultado por olho e a assinatura do aplicador e do médico. A sessão de teste tinha que produzir esse documento inteiro, sem etapa manual depois. | 301 |
| en | In occupational health the exam result is not the end of the job: what the company needs is the record — payroll number, department, role, reason for the exam, anamnesis, per-eye result, and the signatures of the applicator and the physician. The test session had to produce that whole document, with no manual step afterwards. | 327 |

- **Constraint:** 4–5 lines in the detail view
- **Evidence:** `.specs/0100-.../assets/screenshots/electrolux-*.png` + Adam Robo tenure in `data/experience.tsx` `electrolux-report-desktop.png`

### `projects.cases.electrolux.architecture`

| | Text | Chars |
|---|---|---|
| pt-BR | Laravel, React.js e TypeScript sobre MySQL, empacotados em Docker para implantação no cliente. O exame roda em interface escura de alto contraste, e o laudo é uma saída do próprio fluxo: cada etapa — dados do trabalhador, anamnese, acuidade de longe e de perto, Ishihara — grava no mesmo registro, e o documento final é montado a partir dele em vez de ser preenchido à parte. A contrapartida é rigidez: mexer no laudo significa mexer no fluxo. | 443 |
| en | Laravel, React.js, and TypeScript over MySQL, packaged in Docker for deployment at the client. The exam runs in a dark, high-contrast interface, and the report is an output of the flow itself: every step — worker data, anamnesis, far and near acuity, Ishihara — writes into the same record, and the final document is assembled from it rather than filled in separately. The trade-off is rigidity: changing the report means changing the flow. | 440 |

- **Constraint:** 6 lines in the detail view
- **Evidence:** `data/experience.tsx` § adam-robo (Laravel, React.js, TypeScript, MySQL, Docker); `.specs/0100-.../assets/screenshots/electrolux-*.png` + Adam Robo tenure in `data/experience.tsx` for the dark UI and the aggregated report

### `projects.cases.electrolux.result`

| | Text | Chars |
|---|---|---|
| pt-BR | O Adam 4.0 foi entregue e passou a ser usado internamente pela Electrolux, com o exame e o laudo ocupacional fechando no mesmo fluxo. Conduzi a entrega enquanto coordenava a equipe de TI da Adam Robo, incluindo a infraestrutura de deploy em Docker e o pipeline no GitHub Actions por trás dela. | 293 |
| en | Adam 4.0 was delivered and put into internal use at Electrolux, with the exam and the occupational-health record closing in the same flow. I ran the delivery while coordinating Adam Robo's IT team, including the Docker deployment setup and the GitHub Actions pipeline behind it. | 278 |

- **Constraint:** 4 lines in the detail view
- **Evidence:** `.specs/0100-.../assets/screenshots/electrolux-*.png` + Adam Robo tenure in `data/experience.tsx`; `data/experience.tsx` § adam-robo → IT Coordinator

### `projects.cases.electrolux.tagline`

| | Text | Chars |
|---|---|---|
| pt-BR | Entrega corporativa com o laudo como saída do sistema | 53 |
| en | Enterprise delivery, with the record as a system output | 55 |

- **Constraint:** ≤ 56 chars
- **Evidence:** `.specs/0100-.../assets/screenshots/electrolux-*.png` + Adam Robo tenure in `data/experience.tsx`

## Case 4 — alt text for each Electrolux capture

AC11 and AC14.

### `projects.cases.electrolux.shots.acuity`

| | Text | Chars |
|---|---|---|
| pt-BR | Exame de acuidade de longe no Adam 4.0 que Rafael entregou à Electrolux: interface escura com seis linhas Snellen, de 20/400 a 20/20, cada uma classificada como normal ou reduzida, ao lado do registro dos símbolos identificados pelo trabalhador. | 245 |
| en | The far-acuity exam in Adam 4.0, the system Rafael delivered to Electrolux: a dark interface with six Snellen lines from 20/400 down to 20/20, each classified as normal or reduced, beside a record of the symbols the worker identified. The interface is in Brazilian Portuguese. | 276 |

- **Constraint:** alt text
- **Evidence:** `.specs/0100-.../assets/screenshots/electrolux-*.png` + Adam Robo tenure in `data/experience.tsx` `electrolux-acuity-desktop.png`

### `projects.cases.electrolux.shots.color`

| | Text | Chars |
|---|---|---|
| pt-BR | Teste de visão de cores no Adam 4.0 construído por Rafael: seis cartelas de Ishihara em interface escura, cada uma com o número esperado e a marcação de normal ou alterado, mais um campo de observações. | 202 |
| en | Colour-vision testing in the Adam 4.0 system Rafael built: six Ishihara plates in a dark interface, each with its expected number and a normal-or-altered mark, plus a notes field. The interface is in Brazilian Portuguese. | 221 |

- **Constraint:** alt text
- **Evidence:** `.specs/0100-.../assets/screenshots/electrolux-*.png` + Adam Robo tenure in `data/experience.tsx` `electrolux-color-desktop.png`

### `projects.cases.electrolux.shots.report`

| | Text | Chars |
|---|---|---|
| pt-BR | Laudo ocupacional gerado pelo Adam 4.0 desenvolvido por Rafael: dados do trabalhador (matrícula, setor, cargo, escolaridade), anamnese, resultados de visão de longe e de perto por olho, teste de cores e os campos de assinatura do aplicador e do médico. | 252 |
| en | The occupational-health record produced by the Adam 4.0 system Rafael built: worker data (payroll number, department, role, education), anamnesis, far and near vision results per eye, the colour-vision result, and signature fields for the applicator and the physician. The document is in Brazilian Portuguese. | 309 |

- **Constraint:** alt text
- **Evidence:** `.specs/0100-.../assets/screenshots/electrolux-*.png` + Adam Robo tenure in `data/experience.tsx` `electrolux-report-desktop.png`


---

## Technology sets — not locale strings

Each case ships a technology set (AC8, AC15). These are product names and must **not** be translated or placed in `locales/*.ts`; they belong in the case data module the tech-lead defines, the same way `data/experience.tsx` already holds `technologies`. Listed here so the set is decided once, by evidence, and not invented at build time.

| Case | Technology set | Evidence |
|---|---|---|
| iShip | NestJS, TypeScript, PostgreSQL, Apache Kafka, Apache Avro, Python (AWS Lambda), React 19, Vite, New Relic, Docker | `data/experience.tsx` § madeira-madeira → Tech Lead; `locales/*` `projects.cases.iship.architecture` |
| iSend | Laravel, PHP, MySQL, Python (AWS Lambda), GitHub Actions, SonarQube, New Relic, Docker | `data/experience.tsx` § madeira-madeira → Full Stack Developer; `locales/*` `projects.cases.isend.architecture` |
| Adam Robo A1 | Laravel, PHP, MySQL, React.js, TypeScript, Docker, Python, GitHub Actions | `data/experience.tsx` § adam-robo → IT Coordinator (`technologies`) |
| Adam 4.0 @ Electrolux | Laravel, PHP, MySQL, React.js, TypeScript, Docker | `data/experience.tsx` § adam-robo → IT Coordinator (`technologies`) |

Note the two Adam Robo cases draw from the same recorded stack, because the record does not distinguish per-product technologies. Adding anything to either set — computer vision, a hardware SDK, an "enterprise API" — would be invention. The request document proposed exactly that for the Electrolux case ("Visão Computacional 4.0", "API Enterprise"); both are dropped.

---

## Keys to delete

Flagged for the tech-lead to plan (AC2, AC21). Nothing below survives this change.

| Key | Why |
|---|---|
| `nav.certificates` | Section removed (spec § B, AC1) |
| `certificates.*` — the entire subtree: `title`, `description`, `tabs.frontend`, `tabs.backend`, `tabs.devops`, `tabs.other`, `verify`, `items.1` … `items.14` (each with `title` and `issuer`) | Section removed. 36 string values in each locale |
| `a11y.viewCertificate` | Only consumer was `certificates-section.tsx` |
| `hero.stats.certificates` | Replaced by `hero.stats.educationValue` + `hero.stats.education` (AC4) |
| `hero.stats.companies` | Replaced by `hero.stats.leadershipValue` + `hero.stats.leadership` (AC4) |
| `projects.cases.iship.productionBadge` | Replaced by `projects.cases.iship.status`, for one consistent field name across all four cases (AC8) |
| `projects.cases.isend.telemetryUrl` | **Fabricated hostname** (`tms.isend.interno/telemetria`). Forbidden by AC13 |
| `projects.cases.isend.activeRoutesBadge` | The "1,100+ routes" badge is retired as a headline claim (spec § E). The figure survives only inside `projects.cases.isend.challenge` and `…schema.coreSub`, as description |
| `projects.cases.isend.apmCategory`, `apmTitle`, `apmDesc`, `qualityCategory`, `qualityTitle`, `qualityDesc`, `asyncCategory`, `asyncTitle`, `asyncDesc` | The simulated telemetry HUD is replaced by the explicit schematic (AC12). Its content is re-expressed in `projects.cases.isend.schema.*` |
| `projects.cases.iship.challengeTitle`, `architectureTitle`, `resultTitle` | Replaced by the shared `projects.case.*` pillar headings |
| `projects.cases.isend.challengeTitle`, `architectureTitle`, `resultTitle` | Same |

**Not deleted, deliberately:** `projects.previewSuccess`, `projects.previewArchivedStatus`, `projects.previewProductionStatus`, `projects.previewVerified`, `projects.archivedBadge` and `projects.items.1…4` all belong to the open-source cards, which stay (AC17). `experience.progression.*` also stays: the spec adds the phase summary above the tabs, it does not retire the progression ribbon.

---

## Rejected phrasings

| Considered | Language | Why it lost |
|---|---|---|
| `hero.stats.educationValue` = "Bacharel em Engenharia de Software" / "Bachelor in Software Engineering" | both | Asserts a completed degree. `data/experience.tsx` records `inProgress: true` through Dec 2026. Binding decision on OQ1, and the failure mode is severe: a hiring manager who checks LinkedIn and finds the degree unfinished discounts every other claim on the page |
| `hero.stats.education` = "Universidade Positivo · cursando" / "Universidade Positivo · studying" | both | Truthful but defensive — "studying" reads as a student's word. Naming the end date ("conclusão em dez. 2026" / "ends Dec 2026") is equally honest and reads as a plan rather than an apology |
| `hero.headline` = "Arquiteto sistemas resilientes e lidero equipes de engenharia focadas em alta disponibilidade, otimização de custos de nuvem e mensageria orientada a eventos." | pt-BR | The request document's proposal. "Otimização de custos de nuvem" appears nowhere in `data/`, `locales/` or the Evidence table — it would be an invented competency. Cut the whole sentence rather than the clause: the shorter headline hits harder anyway |
| `projects.cases.a1.status` = "+100k testes visuais realizados" / "100,000+ visual tests performed" | both | No source. Binding decision on OQ2. The case does not need it: three modes, two print formats and a responsive delivery are all visible in the captures and none of them can be disputed |
| `projects.cases.iship.title` = "Escala Distribuída & Mensageria de Eventos" / "Distributed Scale & Event Messaging" | both | A category, not a problem. It names a technology family and could sit on any of a thousand portfolios. AC9 asks what was hard; "orchestrating the driver journey across new services and legacy transport systems" answers it |
| `projects.cases.electrolux.title` = "Integração Hardware-Software Sob Medida (Enterprise)" / "Custom Hardware-Software Integration (Enterprise)" | both | Two problems. "Enterprise" is a buzzword, and the hardware-integration claim has no source — the Evidence table lists a dark-themed test flow and a report, nothing about hardware |
| `projects.cases.electrolux.team` = "Solução Enterprise Sob Medida" / "Custom Enterprise Solution" | both | Reads as a vendor's slide. AC9 forbids a value proposition in the badge; the badge is where Rafael's role goes |
| `projects.cases.isend.title` = "Domar um monólito de 1.100 rotas" / "Taming a 1,100-route monolith" | both | The route count as a headline is exactly what spec § E retires — and "taming" makes the size the achievement instead of the observability work |
| `projects.case.open` = "Ver detalhes" / "View details" | both | Generic; promises nothing. "Ver arquitetura e decisões" tells the reader precisely what is behind the click, which is what a VP of Engineering is deciding whether to spend thirty seconds on |
| `projects.cases.isend.schema.caption` omitted entirely | both | Relying on visual styling alone to signal "this is a diagram" fails AC12 the moment the reader is skimming. One sentence closes the question permanently, in both locales |
| `projects.openSourceTitle` = "Laboratório & Código Aberto" / "Lab & Open Source" | both | "Lab" flatters the four archived repositories into something they are not. The subordination should come from position and type size plus a plain description, not from a label that oversells |
| `experience.phases.leadership.title` = "Liderança, Autonomia & Base Universitária" / "Leadership, Autonomy & University" | both | Three abstract nouns stacked with an ampersand, which is the house style of the generic portfolio. The fact is stronger stated plainly: he ran a team and went through university at the same time |
| Alt text ending at "sistema desenvolvido por Rafael na Adam Robo" | both | Fails AC11 — it names the company and the author but never says what the system does, which is the one thing a screen-reader user cannot recover from the image |

---

## Open items for the tech-lead

1. **`data/experience.tsx` records the institution as `"Faculdade Positivo"`**, while the same file's `description` field, `locales/*` `terminal.cvEducation`, and the spec's Evidence table all say **Universidade Positivo**. I wrote **Universidade Positivo** — it is what the spec's Evidence table names and what two of the three records say. An auditor diffing `hero.stats.education` against the `institution` field alone will flag a mismatch. Fixing the data field is a `data/` change and therefore not mine; flagging it is.
2. **`terminal.cvEducation` asserts a completed degree** — "Formação: Bacharelado em Engenharia de Software (Universidade Positivo)" / "Education: Bachelor's in Software Engineering (Universidade Positivo)". This contradicts the OQ1 ruling that the site must not claim a completed degree, but the interactive terminal is explicitly **out of scope** in `spec.md`. I have not touched it. It needs its own spec, or an in-scope exception granted by the product-manager, because the page will otherwise state both positions at once.
3. **`components/organisms/hero-section.tsx:76` carries a hardcoded pt-BR alt** (`"Rafael Martins Alves, desenvolvedor full stack"`) that renders identically in the English locale. The hero is changed by this spec, so AC21 catches it. `a11y.profilePhoto` above replaces it.
4. **Length budgets.** `design.md` had not published a copy-constraints table when this was written. Once it does, the slots most likely to bounce are the four `…title` case headlines (64–80 chars) and `experience.phases.leadership.title` (51/59). If any of them overflows at 390, it returns to me — the constraint is mine to solve with a different sentence, not the developer's to solve with an ellipsis.
5. **`projects.cases.*.status` doubles as the window-chrome environment label** where the design keeps that affordance (AC13). One key, one string; there is no second, shorter variant, so the chrome must fit ~34 characters.

---

## Parity check

- [x] Every key exists in both `locales/en.ts` and `locales/pt-BR.ts` — 113 keys, same paths, same nesting
- [x] Each version reads as a native original, not a translation. The two that diverge most on purpose: `experience.phases.leadership.title` (pt-BR uses two infinitives, en uses two gerunds, because the Portuguese gerund construction would read as a literal calque) and every alt text, where the English adds "The interface is in Brazilian Portuguese" — information the Portuguese reader does not need and would find strange (AC14)
- [x] Every factual claim cited to `data/`, `locales/`, the spec's Evidence table, or a named capture
- [x] No fabricated hostname, URL, metric, date, team size or technology. Three specific fabrications carried by the request document — the four simulated hostnames, the completed-degree claim, and "+100k visual tests" — are rejected above with their reasons
- [x] Ban list clean: no "passionate about", "cutting-edge", "seamless", "robust", "leverage" as a verb, "best practices" as a standalone claim, "10x". No vague scale where a number exists in the record, and no number where one does not
