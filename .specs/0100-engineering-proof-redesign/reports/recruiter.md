# 0100 — Recruiter report

> Owner: tech-recruiter · Run: 1

**Verdict:** `passed`

Judged against `https://portfolio-29dys2nqy-devrmas-projects.vercel.app` at 1440×900 and 390×844, dark and light, `pt-BR` and `en`, with all four case dialogs opened. Evidence in `evidence/recruiter/` (full-page captures) plus a scroll-driven pass that triggers the in-view animations the static capture misses.

---

## Ten seconds — verbatim, before I read anything

**Mobile, `pt-BR`, dark, first viewport only, nothing scrolled:**

> "Rafael Martins Alves. Tech Lead & Desenvolvedor Sênior. Tech Lead @ MadeiraMadeira, Curitiba. *Projeto sistemas distribuídos e lidero o time que os opera.* He leads the Driver Experience team at a logistics company; performance, observability, NestJS/TypeScript, Kafka, AWS."

Level: **yes**. Current scope: **yes** — and specific, which is rare. Education: **no**, that is one scroll down. Would I have kept scrolling: **yes**, and that is not a close call. "I design distributed systems and lead the team that runs them" is a claim with a testable shape, which is the opposite of "passionate full-stack developer."

Nothing in the first viewport reads junior, defensive or padded. There is no certification count, no animated gradient, no adjective doing work a noun should do. That alone puts this above most of the twenty portfolios I have open.

The one cost: the photo consumes roughly the top 45% of the mobile first viewport, so the name does not appear until ~430px down and the three credentials (5+ years / Engenharia de Software / Tech Lead) land about a viewport and a half below the fold. On desktop all of it is visible at once and the hero is genuinely excellent.

---

## Strongest element

**The four case dialogs — specifically the trade-off paragraphs.** These are the best thing on the site by a wide margin, and they are the reason my answer is yes:

- iSend: *"A decisão foi instrumentar e refatorar por dentro em vez de reescrever... Reescrever seria mais limpo e teria custado a operação — o legado ficou de pé, com um perímetro de qualidade em volta."*
- iShip: *"o schema é o acordo entre os dois lados — custa disciplina de versionamento e paga em contratos que não quebram em silêncio."*
- Electrolux: *"A contrapartida é rigidez: mexer no laudo significa mexer no fluxo."*

Every one of those names a decision **and the price paid for it**. Résumé padding never names the price. Someone who has actually run Kafka in production wrote this, and I would open an interview by asking about Avro schema evolution across the Laravel/NestJS boundary — which is exactly the outcome the page should be engineering.

The `"Diagrama desenhado para este portfólio. Não é uma captura do sistema."` label on the iSend schematic is the second-strongest thing here. Voluntarily flagging the one visual that is not real evidence buys credibility for the three that are. Do not let anyone talk you out of that line.

## Weakest element

**The personal-projects section** — an *archived* Discord bot (`Androxus`), a stopwatch library, an archived `pybot`. It is honestly framed ("Escala menor, propósito diferente") and correctly subordinated, but for a Tech Lead / Staff evaluation it is the residue of the portfolio this spec was written to replace. After four production cases with real architectural reasoning, "Bot para Discord — Arquivado" is the only place on the page where I stopped reading forward.

Running a close second: **career phase 01**, whose entire paragraph is SENAI coursework — "C no Arduino, Java no desktop, C# com ASP.NET Core e Python com Selenium no projeto final." The ascent narrative opens at its most junior possible altitude and spends its first card on a technical-school syllabus.

## Would I reach out?

**Yes.** Honest reason: the case dialogs prove he makes architectural decisions under operational constraint and can articulate what each one cost. That is the single hardest thing to fake and the single thing I am actually screening for. The trajectory — apprentice to Tech Lead in five years, across medical devices and national logistics, while finishing the degree — is unusual enough to be worth a conversation on its own.

The reservation I would carry into the screen, and that the page does not pre-empt: **he has been a Tech Lead for four months**, and the page tells me so in a pill. I would ask about scope on the call. That is fine — but see Finding 2, because the page could answer it before I have to ask.

## Answers to the five questions I was asked to rule on

**Proof vs. advertising — resolved.** Every case is titled by its engineering problem ("Estabilizar um TMS legado e torná-lo observável"), carries a role badge naming Rafael's position, and the outcome section is written in the first person about decisions he made. I came away thinking about **Rafael's** systems. Not once did I think about what MadeiraMadeira sells, and Electrolux reads as the client he delivered to, not as a logo he is borrowing. The spec's central risk is genuinely closed.

**The career ascent — legible, but subordinated.** "De Jovem Aprendiz a Tech Lead em cinco anos" is the right headline and it works. It sits *below* a generic section title, "Experiência", with the subtitle "Minha trajetória profissional e acadêmica". A skimmer reads section titles; "Experiência" tells me nothing while the line beneath it would have stopped me. The hook is one line lower than it should be.

**Honesty as a signal — reads as credibility, not weakness.** "Universidade Positivo · conclusão em dez. 2026" is more persuasive than a completed degree would be, because the specificity signals that every other number on the page is also exact. Dropping the unsourced "100k+ visual tests" was correct — an unfalsifiable metric would have contaminated the four cases that *are* falsifiable. Restraint cost nothing here.

**Both languages — the English is native.** "I design distributed systems and lead the team that runs them." "A rewrite would have been cleaner and would have cost the operation." Not one sentence reads as translated. A US-based VP gets the same candidate. One word: `Pleno` → "mid-level" in phase 03 is the only self-diminishing render in the English; "stepped up to mid-level" reads as a demotion word inside an ascent sentence.

**What is missing — this is the highest-value finding.** See Finding 2.

---

## Acceptance criteria — outcome-level only

I rule on the spec's § Outcome and on the criteria that are visible to an evaluator. AC1–AC7, AC16, AC18–AC22 belong to QA and the auditor and are not re-litigated here.

| # | Status | Evidence |
|---|---|---|
| Outcome, clause 1 | **partially met** | "Tech Lead with formal engineering education and five years of production experience, without scrolling" is true at 1440 but **not at 390** — the credentials row sits ~1.5 viewports below the fold on mobile. Level and scope do land without scrolling in both |
| Outcome, clause 2 | met | Within two minutes I could name legacy TMS instrumentation-over-rewrite (logistics) and a single-record exam-to-signed-report flow (occupational health) — two domains, both attributed to Rafael |
| Outcome, clause 3 | met | All four dialogs are architecture, not marketing; every one names a trade-off and its cost |
| AC8 | met | Four cases, identical structure: role badge, engineering-challenge headline, tech set, visual. Verified at 1440 and 390 |
| AC9 | met | No headline is a value proposition. Badges name Rafael's role ("Tech Lead · foco atual", "Coordenador de TI e Desenvolvedor Full Stack"), never the employer's |
| AC12 | met | The iSend visual is labelled `Diagrama` and carries an explicit "not a screenshot" disclaimer |
| AC14 | met | All four cases are fully comprehensible in `en` without reading any pt-BR product UI inside the captures |
| AC15 | met | Problem / architecture and trade-offs / outcome and leadership / technologies present in all four; the iShip beam diagram lives inside the dialog and not on the page |
| AC17 | met structurally, **costly strategically** | Personal projects are subordinate and visually lighter — but see Finding 4 |
| AC23 | met | Spot-audited against `data/experience.tsx` and `PRODUCT.md` § Evidence on Hand as reconciled on `fix/accessibility-hardening`. Dates, titles, promotions and the Electrolux delivery all trace. Nothing on the page would embarrass him in an interview |

---

## Findings

### major — The best evidence on the site is behind a click that a skimmer never makes

- **Where:** `components/molecules/case-card.tsx` — the four case cards on the projects section
- **What is wrong:** On the card surface a two-minute skimmer gets a truncated sentence ("TMS em Laravel e PHP sobre MySQL que sustenta a expedição diária: emissão de romaneios, despacho de cargas e…"), a tech pill row, and "Ver arquitetura e decisões →". The sentence that would actually make me want to interview him — *"Reescrever seria mais limpo e teria custado a operação"* — is inside a dialog. In twenty portfolios I open zero dialogs. The page is currently optimised for the reader who already decided to dig, which is not the reader the spec names.
- **What correct looks like:** Promote one trade-off line per case onto the card face, replacing the truncated capability description. The card should read: role badge → engineering-problem headline → **the decision and its cost, in one sentence** → tech pills → open. The dialog keeps the full architecture. The card stops being a summary of *what the system is* and becomes a summary of *what Rafael decided*.

### major — Nothing on the page quantifies the scope of the leadership it claims

- **Where:** hero credentials row, `data/experience.tsx`, the iShip case § Resultado e liderança
- **What is wrong:** The only number offered as an authority signal is **"5+ anos"**, restated a second time in the skills section as a "5+ Anos" card. Five years is the weakest fact available about this candidate and it is the one the page quantifies twice. Meanwhile "Alta Escala" is asserted as a skills card with no number attached, and the current role carries a **"4 meses"** tenure pill. Read cold by a VP, that trio — *5 years total, 4 months as lead, scale asserted not measured* — invites exactly the seniority doubt the redesign was meant to remove. For a Tech Lead / Staff hire I expect and do not find: **how many engineers he leads**, **how many services or repos the squad owns**, **what volume the ecosystem moves** (deliveries, events/day, distribution centres), and **whether he carries on-call**. Every one of those would be a stronger number than "5+", and at least squad size and CD/route coverage are almost certainly sourceable from the record.
- **What correct looks like:** Replace the "Anos de experiência 5+" hero credential with squad scope ("Lidero N engenheiros · squad Experiência do Motorista"), or add scope as a fourth credential. Put one operational magnitude inside the iShip case's § Resultado — the page already earns the right to it and currently declines to use it. If no number can be sourced without inventing it, the honest move is to name the surface instead of the volume ("app do motorista, API central e Painel de Escala, em N centros de distribuição"). Do not add a number that cannot be traced; do not keep "5+" as the headline credential either.

### minor — The ascent headline is buried under a generic section title

- **Where:** `components/organisms/experience-section.tsx` — "Experiência" / "Minha trajetória profissional e acadêmica: as empresas onde atuei, os cargos que ocupei e a formação que sustenta esse percurso."
- **What is wrong:** A skimmer reads section titles and nothing else. "Experiência" is the title every portfolio uses; "De Jovem Aprendiz a Tech Lead em cinco anos" is the differentiator, and it is the second line. The generic title also spends a full mobile viewport before the hook appears.
- **What correct looks like:** Make the ascent line the section heading. The nav label stays "Experiência"; the on-page `h2` becomes the claim. One less viewport between the hero and the strongest narrative fact.

### minor — Career phase 01 spends the ascent's opening card on coursework

- **Where:** phase 01, "O alicerce técnico" — "aprendi lógica, SQL, modelagem e testes — C no Arduino, Java no desktop, C# com ASP.NET Core e Python com Selenium no projeto final"
- **What is wrong:** The list of languages learned at technical school is the only paragraph on the page written from the perspective of someone with nothing yet to point at. It undercuts the card that follows it. A VP does not care that he learned C on Arduino; a VP cares that he was *shipping production PHP as a secondary-school apprentice*, which is buried in the same paragraph's last clause.
- **What correct looks like:** Cut the technology inventory. Keep SENAI as the institution and lead with the fact that he entered Adam Robo as an apprentice *while still in secondary school* and was already writing production code. Same truth, one third the words, and it starts the ascent at the surprising fact instead of at the syllabus.

### minor — The personal-projects section dilutes the four cases it follows

- **Where:** `data/projects.tsx` — `Androxus` (arquivado), `Pybot com Docker` (arquivado), `Python Stopwatch2`
- **What is wrong:** Two of the three are explicitly archived, and one is a Discord bot. Directly after four production systems with real architectural reasoning, the page's last technical impression is hobby-grade. The framing sentence is honest and correct, and it does not fully offset the signal.
- **What correct looks like:** Keep the section — an open-source presence is worth having — but cut it to the one artefact that still argues for him (`Python Stopwatch2`, a published, non-archived library), or collapse the whole section behind a single line linking to GitHub. Fewer, none archived.

### minor — "mid-level" is the wrong English for `Pleno` inside an ascent sentence

- **Where:** `locales/en.ts`, career phase 03 — "In June 2025 I stepped up to mid-level Full Stack"
- **What is wrong:** `Pleno` is a Brazilian level with no clean US equivalent. "Mid-level" is the word a US reader associates with *not yet senior*, and placing it in the middle of a promotion sentence makes the ascent read flatter than it is.
- **What correct looks like:** Render the progression by what changed rather than by the local band — "In June 2025 I moved off the junior track, and in June 2026 to technical lead of the Driver Experience team." Content-writer's call on the exact wording; the rule is that the English narrative should not import a Brazilian seniority band as a self-description.

### minor — The skills section carries two junior-coded elements

- **Where:** `components/organisms/skills-section.tsx` — the "Quero aprender" tab and the live Curitiba clock card
- **What is wrong:** "Want to learn" is a tab that belongs on a junior portfolio; it invites an evaluator to read the gaps rather than the depth. The live clock with an "Ao Vivo" badge is decoration occupying one of three card slots directly beneath the section heading — a slot that Finding 2 wants for scope. Neither is in this spec's scope, which is why they are minor and listed last.
- **What correct looks like:** Fold "Quero aprender" into "Estudando" (one forward-looking tab, not two), and give the third card slot to a scope or magnitude fact. Candidate for spec 0101, which already owns the skills restructure.

### minor — The iSend schematic renders its label list twice in the text layer

- **Where:** `components/molecules/case-schematic.tsx`
- **What is wrong:** The five schematic labels (MySQL / AWS Lambda / Monólito Laravel / New Relic / GitHub Actions e SonarQube) appear duplicated in the dialog's text content — presumably a marquee or looped track. Visually fine; a screen-reader user or anyone reading the text layer gets the stack twice. Flagged for the auditor rather than ruled on here.
- **What correct looks like:** `aria-hidden` on the duplicated track, as marquee patterns normally do.

### minor — No résumé artefact and no statement of what he is looking for

- **Where:** header, hero CTAs, contact section, `components/organisms/contact-section.tsx`
- **What is wrong:** There is no CV or résumé download anywhere on the page, while the interactive terminal advertises `curl devrma.com/cv` as an available command. The contact copy is "Estou aberto a conversas sobre projetos, oportunidades e colaborações" — the most generic sentence on the site, and the one closest to the conversion point. A recruiter who decides to act needs a file to forward to a hiring manager, and wants to know in one line whether the role they have matches what he wants.
- **What correct looks like:** A résumé link in the header or beside the hero CTAs, and one concrete line in the contact section naming the direction he is looking for (level, domain, remote/hybrid). Out of this spec's scope — the contact section is explicitly excluded — so this belongs to a follow-up spec, not a bounce.

---

## Competitive read

Against the senior portfolios I actually see: the median is a hero adjective, a grid of logos, a tab of certifications, and three CRUD apps. **This one is in the top decile**, and the specific reason is falsifiability — it states decisions with their costs, dates a degree as in-progress, and labels its one non-photographic visual as a drawing. Almost nobody does the third thing, and it is the one that made me believe the first two.

What makes it memorable in one sentence: *the engineer who chose to instrument a 1,100-route legacy monolith instead of rewriting it, and can tell you what that choice cost.* That sentence is on the site — it is just one click deeper than the reader who needs it will ever go. Finding 1 is the whole gap between "good portfolio" and "I am emailing him today."

---

## Checked and clean

- **Vendor-showcase risk (the spec's central risk): resolved.** Four cases, four role badges, four engineering-problem headlines, zero product value propositions. Attribution lands on Rafael in all four.
- **No claim I would be embarrassed to challenge.** Dates, titles, promotion months, the degree's in-progress status and the Electrolux delivery all trace to `data/experience.tsx` and `PRODUCT.md` § Evidence on Hand (as reconciled on `fix/accessibility-hardening`). Nothing on the page is inflated.
- **English is native-quality**, not translated, in hero, phases and all four dialogs.
- **Both themes read as professional** at 1440 and 390; light theme is not an afterthought.
- **No certificates surface anywhere** — not by scroll, not in either nav. The deleted section is not missed for a second.
- axe-core 0 violations, 0 console errors on the deployed preview (`evidence/recruiter/report.json`) — confirming G8, not replacing it.
- The static full-page captures in `evidence/recruiter/` show large blank regions. This is a capture artefact of in-view animations, **not a rendering defect**: a scroll-driven pass renders every section correctly. Recorded so the next reviewer does not re-open it.

## One thing, if only one thing changes

**Finding 1.** Lift one trade-off sentence per case onto the card face. The site already contains the sentences that win the interview; today they are gated behind an interaction that the reader this spec was written for does not perform.
