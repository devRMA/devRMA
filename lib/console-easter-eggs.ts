import type { PerformanceTier } from "@/components/performance-provider";

export interface TelemetryLogPayload {
  tier: PerformanceTier;
  cpuCores: number;
  memoryGb: number;
  gpuRenderer: string;
  hasFinePointer: boolean;
  prefersReducedMotion: boolean;
}

declare global {
  interface Window {
    __DEVRMA_LOGGED__?: boolean;
    devrma?: {
      version: string;
      tier: PerformanceTier;
      tierName: string;
      specs: {
        cores: number;
        memory: string;
        gpu: string;
        pointer: string;
        reducedMotion: boolean;
      };
      help: () => string;
      stats: () => Record<string, unknown>;
      hireMe: () => string;
      ping: () => string;
      coffee: () => string;
      architecture: () => Record<string, string>;
    };
  }
}

export function logPerformanceAndEasterEggs(payload: TelemetryLogPayload): void {
  if (typeof window === "undefined" || process.env.NODE_ENV === "test") {
    return;
  }

  if (window.__DEVRMA_LOGGED__) {
    return;
  }
  window.__DEVRMA_LOGGED__ = true;

  const { tier, cpuCores, memoryGb, gpuRenderer, hasFinePointer, prefersReducedMotion } = payload;

  const tierMeta = {
    2: {
      name: "TIER 2 (Ultra Fluidity Engine / Beast Mode ⚡)",
      color: "#0ea5e9",
      features: [
        "Fundo Interativo em Canvas 2D com física de amortecimento",
        "Cursor Cinético Duplo desacoplado do React",
        "Tilt 3D via GPU sem re-renders (useMotionValue + useSpring)",
        "Navegação com pílula fluida e progresso contínuo de scroll",
      ],
    },
    1: {
      name: "TIER 1 (Modo Equilibrado / Desempenho Estável 🚀)",
      color: "#06b6d4",
      features: [
        "Transições suaves com desaceleração quártica",
        "Tilt 3D otimizado nos cards",
        "Progresso de scroll e revelações com Framer Motion",
      ],
    },
    0: {
      name: "TIER 0 (Modo Econômico / Baixo Consumo 🍃)",
      color: "#10b981",
      features: [
        "Zero impacto de CPU ociosa",
        "Transições estáticas e foco total em acessibilidade",
      ],
    },
  }[tier];

  // Console CSS Styles
  const brandBadge =
    "background: #0ea5e9; color: #090b10; font-weight: 800; font-family: monospace; padding: 4px 8px; border-radius: 8px 0 0 8px;";
  const subtitleBadge =
    "background: #12151d; color: #f1f5f9; font-family: monospace; padding: 4px 10px; border: 1px solid #272c38; border-radius: 0 8px 8px 0;";
  const headerStyle = `color: ${tierMeta.color}; font-family: monospace; font-weight: bold; margin-top: 8px;`;
  const textStyle = "color: #97a3b3; font-family: monospace; line-height: 1.5;";
  const accentStyle = "color: #f1f5f9; font-family: monospace; font-weight: 600;";
  const commandStyle =
    "background: #1e222b; color: #06b6d4; font-family: monospace; padding: 2px 6px; border-radius: 8px; font-weight: bold;";

  console.log(
    "%c devRMA %c Distributed Systems & Engineering Leadership ",
    brandBadge,
    subtitleBadge,
  );

  console.log(`%c🖥️ [TELEMETRIA DE HARDWARE DETECTADA] -> ${tierMeta.name}`, headerStyle);

  console.log(
    `%c  • Núcleos de CPU (Concurrency): %c${cpuCores} threads\n` +
      `%c  • Memória RAM Estimada: %c~${memoryGb} GB\n` +
      `%c  • Renderizador Gráfico (GPU): %c${gpuRenderer || "Acelerador Gráfico Integrado/Discreto"}\n` +
      `%c  • Dispositivo de Entrada: %c${hasFinePointer ? "Mouse / Trackpad de Alta Precisão (Fine Pointer)" : "Touch / Dispositivo Coarse"}\n` +
      `%c  • Preferência de Movimento: %c${prefersReducedMotion ? "Reduzido (prefers-reduced-motion ativado)" : "Padrão (Física de Mola & Efeitos 120 FPS Ativos)"}\n` +
      `%c  • Recursos Ativos no seu PC: %c\n${tierMeta.features.map((f) => `      ✔ ${f}`).join("\n")}`,
    textStyle,
    accentStyle,
    textStyle,
    accentStyle,
    textStyle,
    accentStyle,
    textStyle,
    accentStyle,
    textStyle,
    accentStyle,
    textStyle,
    accentStyle,
  );

  console.log(
    "%c💡 Easter Egg de Engenharia:%c Abra o console e digite %cdevrma.help()%c para comandos interativos!",
    "color: #f59e0b; font-weight: bold; font-family: monospace;",
    textStyle,
    commandStyle,
    textStyle,
  );

  // Register interactive window.devrma API
  window.devrma = {
    version: "2.4.0",
    tier,
    tierName: tierMeta.name,
    specs: {
      cores: cpuCores,
      memory: `~${memoryGb}GB`,
      gpu: gpuRenderer || "Unknown",
      pointer: hasFinePointer ? "fine (mouse/trackpad)" : "coarse (touch)",
      reducedMotion: prefersReducedMotion,
    },
    help() {
      console.log(
        `%c🛠️ COMANDOS DISPONÍVEIS NO CONSOLE devRMA:
  • devrma.specs          -> Especificações do hardware detectado
  • devrma.stats()        -> Métricas de telemetria e uptime da sessão
  • devrma.architecture() -> Visão geral dos padrões de arquitetura usados
  • devrma.ping()         -> Teste de latência simulado com a borda de Curitiba
  • devrma.hireMe()       -> Informações de contato direto
  • devrma.coffee()       -> Uma pausa pro café dos sistemas distribuídos`,
        "color: #0ea5e9; font-family: monospace; line-height: 1.6;",
      );
      return "Execute qualquer função acima chamando no console (ex: devrma.stats()).";
    },
    stats() {
      return {
        tier,
        tierDescription: tierMeta.name,
        targetFps: tier === 2 ? 120 : 60,
        activeFeatures: tierMeta.features,
        uptime: `${Math.round(performance.now() / 1000)}s nesta sessão`,
        clusterLocation: "Curitiba, PR - Brasil (UTC-3)",
      };
    },
    hireMe() {
      console.log(
        "%c📫 Vamos construir sistemas resilientes e escaláveis juntos?\nE-mail: contact@devrma.com\nLinkedIn: https://linkedin.com/in/devRMA\nGitHub: https://github.com/devRMA",
        "color: #10b981; font-weight: bold; font-family: monospace; line-height: 1.6;",
      );
      return "contact@devrma.com";
    },
    ping() {
      const simulatedLatency = (Math.random() * 0.5 + 0.1).toFixed(2);
      return `pong! [${simulatedLatency}ms] Curitiba Edge Cluster • 0% packet loss`;
    },
    coffee() {
      console.log(`
      ( (
       ) )
    .______.
    |   ☕ |]
    \\______/
    "Compilando microsserviços e garantindo zero perda de dados com Outbox Pattern."
      `);
      return "Café quentinho servido com sucesso!";
    },
    architecture() {
      return {
        frontend:
          "Next.js 15 App Router + React 19 + Tailwind CSS + Motion (GPU-accelerated, 0 re-render loops)",
        backendExperience:
          "NestJS, TypeScript, PostgreSQL, Apache Kafka (Avro), Outbox Pattern, AWS ECS & Lambda",
        performanceEngine:
          "Hardware-Adaptive Engine (Tier 0, 1, 2) com Canvas 2D nativo e física de amortecimento",
        codeQuality:
          "TypeScript strict, Vitest unit-tested, Biome linter, Impeccable 0-slop verified",
      };
    },
  };
}
