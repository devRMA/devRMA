---
id: 004
title: Exercite todo estado interativo que o spec entrega antes de declarar um gate verde: um axe que só vê a primeira pintura não vê o dialog onde o conteúdo mora
applies-to: tech-lead
domain: plan
spec: 0100
confirmed: 0
created: 2026-09-12
---

## What happened

O spec 0100 levou o conteúdo principal do portfólio para dentro de quatro `CaseDialog`s. O `preview.mjs` — a ferramenta que produz a evidência de todos os gates — carrega a página e roda o axe-core sobre a primeira pintura, sem nunca abrir um dialog. Resultado: a legenda do `MediaPlate`, entregue por este mesmo spec, reprovou WCAG AA (4.23:1 em light, piso 4.5:1) em todas as oito combinações de light, e atravessou dois runs completos, um gate de QA aprovado e um gate de auditoria aprovado naquele ponto, até um auditor dirigir o browser à mão no run 2.

## Why it happened

O plano tratou a ferramenta de gate como infraestrutura pronta, e não como parte da superfície que o spec tinha de cobrir. Quando um spec move conteúdo para um estado que só existe depois de uma interação — dialog aberto, aba trocada, item sob o cursor, `prefers-reduced-motion` ativo — a checagem automatizada existente passa a medir um subconjunto do que foi entregue, e continua ficando verde. Verde por não ter olhado é indistinguível de verde por estar correto, e é justamente o modo de falha que ninguém investiga.

## The rule

Ao planejar, liste os estados interativos que o spec entrega e confirme, arquivo por arquivo, que alguma ferramenta de `.agents/tools/` entra em cada um antes de reportar. Onde não entrar, a mudança na ferramenta é uma tarefa do próprio spec — ordenada **antes** da correção que ela precisa enxergar, para que a primeira execução falhe e prove o defeito. Vale também para os `incomplete` do axe: resultado que a ferramenta não conseguiu decidir tem de aparecer no report, nunca virar silêncio.

## How to verify it was applied

Antes de fechar o `plan.md`: para cada estado interativo nomeado no `spec.md`/`design.md`, aponte a linha da ferramenta que o alcança (`grep -n 'role="dialog"\|hover\|reducedMotion' .agents/tools/*.mjs`). Se algum estado não tiver linha, o plano está incompleto. Depois do build, o `STATUS.md` tem de trazer a saída em que a ferramenta **falhou antes** da correção — sem ela, o check não foi provado.
