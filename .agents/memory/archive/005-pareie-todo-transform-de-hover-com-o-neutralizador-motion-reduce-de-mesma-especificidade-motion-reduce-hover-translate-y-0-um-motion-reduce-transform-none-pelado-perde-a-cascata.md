---
id: 005
title: Pareie todo transform de hover com o neutralizador motion-reduce de mesma especificidade (motion-reduce:hover:translate-y-0); um motion-reduce:transform-none pelado perde a cascata
applies-to: frontend-dev
domain: a11y
spec: 0100
confirmed: 0
created: 2026-09-12
---

## What happened

O `frontend-dev` adicionou `motion-reduce:transform-none` a uma célula do hero com `hover:-translate-y-0.5` (T18) e a um `DialogContent` com as animações do Radix (run 1). Nos dois casos a classe estava presente e a regra estava morta: `.hover\:-translate-y-0\.5:hover` tem especificidade `0-2-0` e `.motion-reduce\:transform-none` tem `0-1-0`, então o hover vence exatamente enquanto o elemento está sob o cursor, mesmo com `prefers-reduced-motion: reduce`. Medido em Chromium: `transform: none` em repouso, `matrix(1,0,0,1,0,-2)` no hover. O mesmo defeito foi rejeitado em dois bounces seguidos, em dois arquivos vizinhos.

## Why it happened

Um utilitário `motion-reduce:` pelado é uma regra de estado de repouso. O movimento a suprimir é de outro estado — `hover`, `focus-visible`, `group-hover`, `data-[state=open]` — e a media query não adiciona especificidade nenhuma. Escrever a classe dá a sensação de conformidade, o teste em jsdom confirma que a classe está lá, e nada nesse circuito toca no browser que decide a cascata.

## The rule

Todo utilitário de transform preso a um estado precisa do neutralizador `motion-reduce:` **no mesmo estado**: `hover:-translate-y-1` pede `motion-reduce:hover:translate-y-0`; `group-hover:scale-110` pede `motion-reduce:group-hover:scale-100`; `group-hover:rotate-12` pede `motion-reduce:group-hover:rotate-0`. O `motion-reduce:transform-none` pelado pode ficar — ele cobre o repouso — mas nunca sozinho. Contra estilos de estado de uma biblioteca (Radix `data-[state=*]:animate-in`), use o modificador `!` do Tailwind 3 depois da variante: `motion-reduce:!animate-none`.

## How to verify it was applied

`node .agents/tools/check-reduced-motion.mjs` sai `0` com `0 FAIL`. Asserção de classe em jsdom não conta (lição 002): o probe hover cada elemento com transform de estado sob `reducedMotion: 'reduce'` e compara o `transform` computado em repouso e sob o cursor; valores diferentes são falha.


## Retired

2026-09-13 — promoted — merged into the same frontend-dev.md rule as lesson 002 (same-state motion-reduce neutraliser) and into AGENTS.md §8
