# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are tech leaders, VP/Directors of Engineering, hiring managers, and executive partners evaluating architectural depth (event-driven systems, Kafka, distributed scale) and senior engineering leadership. Secondary users include engineering peers and collaborators seeking architectural patterns and real-world system designs.

## Product Purpose

Showcase the engineering journey, architectural authority, and technical leadership of Rafael Martins Alves (`devRMA`). Success means establishing undeniable credibility as a Tech Lead / Systems Architect who designs and operates mission-critical distributed systems and leads high-performing engineering teams.

## Positioning

Real-world mission-critical scale: leading logistics systems (iShip driver ecosystem and iSend TMS at MadeiraMadeira), event-driven orchestration (Kafka with Avro, NestJS, AWS Lambdas, PostgreSQL), and bridging high-level architecture vision with pragmatic team execution. Unlike typical developer portfolios featuring toy projects or generic full-stack CRUDs, this platform demonstrates real enterprise scale, strong schema contracts (Apache Avro), multi-faceted observability (New Relic, direct DB, session replays), and hands-on technical leadership.

## Operating Context

Evaluators typically review this site on desktop during executive hiring reviews, technical interview evaluations, and client vetting sessions, as well as on mobile devices via direct links from LinkedIn and resumes. Reviewers need rapid access to technical depth, architectural topology, verified career milestones, and leadership impact without navigating through marketing fluff.

## Capabilities and Constraints

- Bilingual localization: Full Brazilian Portuguese (`pt-BR`) and English (`en`) parity across all content.
- Theme support: Responsive dark and light themes with system preference detection (`next-themes`).
- Strict truth in career data: Maintain verified tenures, roles, and company affiliations (MadeiraMadeira, SENAI, etc.).
- Performance and responsiveness: Fast initial load, optimized Core Web Vitals, accessible semantic layout, and fluid motion via Framer Motion with reduced-motion support.

## Brand Commitments

- Identity: Rafael Martins Alves / `devRMA`.
- Voice and tone: Confident, authoritative, pragmatic, and engineering-driven. Clear and direct without hype, buzzwords, or unsubstantiated claims.
- Domain expertise: Event-Driven Architecture, Apache Kafka (Avro), NestJS, TypeScript, React (Microfrontends), PostgreSQL, Python (AWS Lambda), New Relic, Docker, Technical Leadership, and Logistics Systems.

## Evidence on Hand

- Production case studies in `locales/en.ts` and `locales/pt-BR.ts`:
  - **iShip**: Driver ecosystem orchestrated by NestJS/PostgreSQL backend with Kafka (Avro) event streaming, Python AWS Lambdas, and Driver Scale web panel (React 19 MFE), connecting field drivers to national distribution hubs.
  - **iSend**: High-traffic Transportation Management System (TMS) with 1,100+ routes in Laravel/PHP for freight dispatch and cargo tracking.
- Career milestones and timeline in `data/experience.tsx`: Tech Lead, Senior Developer, Mid-level Developer, Junior Developer at MadeiraMadeira, and instructor at SENAI.
- Verifiable credentials and certifications in `data/certificates.tsx`.
- Open source and personal projects in `data/projects.tsx`.
- No customer testimonials or private proprietary metrics beyond what is documented in source code and locales.

## Product Principles

1. **Substance Over Fluff**: Lead with real engineering depth, system topology, architectural trade-offs, and operational realities rather than superficial claims or buzzwords.
2. **Ground Truth in Production**: Anchor every skill, project, and leadership claim in verified production systems, real codebases, and concrete business outcomes.
3. **Zero-Friction Evaluation**: Enable busy hiring managers and engineering leaders to rapidly assess seniority, tech stack fit, and leadership scope within seconds, while providing deep architectural dives on demand.
4. **Bilingual Parity**: Ensure every case study, technical detail, and career narrative reads naturally and authentically in both Portuguese and English.

## Accessibility & Inclusion

- WCAG 2.1 AA contrast compliance across both dark and light modes.
- Keyboard navigability across all interactive elements (theme switcher, language toggles, tabs, project cards, dialogs).
- Respect `prefers-reduced-motion` settings for motion safety.
