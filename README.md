# Portfolio

Welcome to my digital playground! This project is a bold, bilingual portfolio built with Next.js and crafted to showcase experience, skills, and personality with flair. Smooth animations, responsive layouts, and data-driven sections come together to tell a compelling story.

## ✨ Highlights
- Dynamic professional timeline with live duration counters per role and per company
- Academic journey, skills, projects, and certificates organized in elegant sections
- Light/dark themes, micro-interactions, and buttery-smooth Framer Motion animations
- Language switcher (pt-BR 🇧🇷 / en 🇺🇸) keeping every detail localized
- Component-driven architecture with reusable building blocks and clean TypeScript models

## 🛠 Tech Stack
| Category | Technologies |
| --- | --- |
| Core | Next.js 15, React 19, TypeScript |
| Styling & UI | Tailwind CSS, Tailwind Merge, Lucide Icons |
| Animations | Framer Motion |
| Tooling | pnpm, Biome, Vitest |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm 8+

### Installation
```bash
pnpm install
```

### Local Development
```bash
pnpm dev
```
Visit [http://localhost:3000](http://localhost:3000) to explore the portfolio locally.

## 🧰 Useful Commands
| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server with hot reload |
| `pnpm build` | Generate the production build |
| `pnpm start` | Run the production build locally |
| `pnpm lint` | Format and lint with Biome (auto-fixes enabled) |
| `pnpm lint:next` | Run Next.js linting (requires ESLint configuration) |
| `pnpm format` | Format source files via Biome |
| `pnpm test` | Execute the Vitest suite once |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:coverage` | Collect coverage metrics |

## 🧱 Project Structure
```
├─ app/                 # Next.js app router pages & layouts
├─ components/          # Atomic design system (atoms → organisms → templates)
├─ data/                # Structured content for experience, projects, skills, certificates
├─ hooks/               # Shared React hooks
├─ lib/                 # Utilities (e.g., duration formatter)
├─ locales/             # i18n dictionaries
├─ public/              # Static assets
└─ styles/              # Global styles & Tailwind config
```

## 🛠 Customization Tips
- Update `data/*.tsx` to refresh experience, academic records, and projects without touching components
- Extend `locales/en.ts` and `locales/pt-BR.ts` to localize new sections instantly
- Drop new UI pieces into the component library and enjoy consistent styling out of the box

## ☁️ Deployment
This portfolio is ready for platforms like Vercel, Netlify, or any Node-compatible host. Run `pnpm build` and deploy the `.next` output or hook the repository directly for CI/CD magic.

## 🤝 Contributing & Feedback
Spotted a bug, have an idea, or just want to say hi? Issues and pull requests are welcome. Let’s keep shipping delightful experiences!

Made with ❤️, sleepless nights, and way too much coffee.
