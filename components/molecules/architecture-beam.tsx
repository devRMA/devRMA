"use client";

import { motion } from "framer-motion";
import { Cloud, Layers, Radio, Smartphone } from "lucide-react";

import { useLanguage } from "@/components/language-provider";

interface ArchitectureNodeConfig {
  titleKey: string;
  subtitleKey: string;
  icon: typeof Smartphone;
  accentColor: string;
}

const ARCHITECTURE_NODES: ArchitectureNodeConfig[] = [
  {
    titleKey: "skills.bento.nodeDriverApp",
    subtitleKey: "skills.bento.nodeDriverAppSub",
    icon: Smartphone,
    accentColor: "from-blue-500/20 to-cyan-500/20 border-cyan-500/40 text-cyan-400",
  },
  {
    titleKey: "skills.bento.nodeBff",
    subtitleKey: "skills.bento.nodeBffSub",
    icon: Layers,
    accentColor: "from-rose-500/20 to-pink-500/20 border-rose-500/40 text-rose-400",
  },
  {
    titleKey: "skills.bento.nodeKafka",
    subtitleKey: "skills.bento.nodeKafkaSub",
    icon: Radio,
    accentColor: "from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400",
  },
  {
    titleKey: "skills.bento.nodeCloud",
    subtitleKey: "skills.bento.nodeCloudSub",
    icon: Cloud,
    accentColor: "from-violet-500/20 to-indigo-500/20 border-violet-500/40 text-violet-400",
  },
];

export function ArchitectureBeam() {
  const { t } = useLanguage();

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border/80 bg-card/40 p-6 backdrop-blur-xl">
      <div className="mb-6 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" aria-hidden="true" />
          <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-cyan-400">
            {t("skills.bento.architectureTitle")}
          </h3>
        </div>
        <p className="text-xs text-muted-foreground">{t("skills.bento.architectureDescription")}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ARCHITECTURE_NODES.map((node, nodeIndex) => {
          const NodeIcon = node.icon;

          return (
            <motion.div
              key={node.titleKey}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: nodeIndex * 0.1 }}
              className="relative flex flex-col items-center justify-center rounded-xl border bg-gradient-to-b p-4 text-center shadow-sm backdrop-blur-md transition-transform hover:-translate-y-1"
            >
              <div
                className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl border bg-background/80 shadow-inner ${node.accentColor}`}
              >
                <NodeIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <span className="font-mono text-xs font-bold text-foreground">
                {t(node.titleKey)}
              </span>
              <span className="mt-1 font-mono text-[11px] text-muted-foreground">
                {t(node.subtitleKey)}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
