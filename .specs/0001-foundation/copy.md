# 0001 — Copy

> Owner: content-writer · Gate: `copy` · Baseline

All shipped copy lives in **`locales/en.ts`** and **`locales/pt-BR.ts`**, at full key parity. The factual record behind it lives in `data/experience.tsx`, `data/projects.tsx`, and `data/certificates.tsx`.

It is not duplicated here — the locale files are the authority, and a transcription would drift on the first edit.

## Standing rules

Voice, per `PRODUCT.md` § Brand Commitments: confident, authoritative, pragmatic, engineering-driven. Clear and direct, without hype, buzzwords, or unsubstantiated claims.

- **Parity is absolute.** Every key exists in both files, carrying the same meaning and the same force. A hedged version in one language is a parity failure.
- **Both are originals**, not translations. Each is written to land natively for its reader.
- **Nothing is invented.** Every metric, year, team size, role, and technology traces to `data/` or `PRODUCT.md`. This is the single worst failure mode available to this squad — a fabricated claim on a portfolio is discovered at the interview.
- The ban list and phrasing rules are in `.agents/agents/content-writer.md`.

## Parity check

- [x] Every key exists in both `locales/en.ts` and `locales/pt-BR.ts`
- [x] Each version reads as a native original
- [x] Every factual claim cited to `data/` or `PRODUCT.md`
