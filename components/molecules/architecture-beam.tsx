"use client";

import { motion } from "framer-motion";
import { Cloud, Layers, Radio, Smartphone } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/language-provider";

interface ArchitectureNodeConfig {
  id: string;
  step: string;
  titleKey: string;
  subtitleKey: string;
  icon: typeof Smartphone;
  accentColor: string;
  badgeKey: string;
  protocol: string;
  detailKey: string;
}

const ARCHITECTURE_NODES: ArchitectureNodeConfig[] = [
  {
    id: "driver-app",
    step: "01",
    titleKey: "skills.bento.nodeDriverApp",
    subtitleKey: "skills.bento.nodeDriverAppSub",
    icon: Smartphone,
    accentColor: "from-sky-500/20 to-cyan-500/20 border-cyan-500/40 text-cyan-400",
    badgeKey: "skills.bento.nodeDriverAppBadge",
    protocol: "HTTPS / WS",
    detailKey: "skills.bento.nodeDriverAppDetail",
  },
  {
    id: "backend-api",
    step: "02",
    titleKey: "skills.bento.nodeBff",
    subtitleKey: "skills.bento.nodeBffSub",
    icon: Layers,
    accentColor: "from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400",
    badgeKey: "skills.bento.nodeBffBadge",
    protocol: "NestJS / Outbox",
    detailKey: "skills.bento.nodeBffDetail",
  },
  {
    id: "event-broker",
    step: "03",
    titleKey: "skills.bento.nodeKafka",
    subtitleKey: "skills.bento.nodeKafkaSub",
    icon: Radio,
    accentColor: "from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400",
    badgeKey: "skills.bento.nodeKafkaBadge",
    protocol: "Kafka Topics",
    detailKey: "skills.bento.nodeKafkaDetail",
  },
  {
    id: "cloud-workers",
    step: "04",
    titleKey: "skills.bento.nodeCloud",
    subtitleKey: "skills.bento.nodeCloudSub",
    icon: Cloud,
    accentColor: "from-sky-500/20 to-cyan-500/20 border-sky-500/40 text-sky-400",
    badgeKey: "skills.bento.nodeCloudBadge",
    protocol: "AWS ECS / Lambda",
    detailKey: "skills.bento.nodeCloudDetail",
  },
];

export function ArchitectureBeam() {
  const { t: translate } = useLanguage();
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl border border-border/80 bg-card/30 p-5 md:p-8 backdrop-blur-xl shadow-lg">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            <h3 className="font-mono text-xs md:text-sm font-semibold uppercase tracking-wider text-cyan-400">
              {translate("skills.bento.architectureTitle")}
            </h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground max-w-xl">
            {translate("skills.bento.architectureDescription")}
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs self-start sm:self-auto">
          <span className="rounded-md border border-border/80 bg-card/60 px-2.5 py-1 text-zinc-400">
            AVRO / JSON
          </span>
          <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-400 font-semibold flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {translate("skills.bento.zeroDataLoss")}
          </span>
        </div>
      </div>

      <div className="relative">
        <div className="hidden lg:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 pointer-events-none z-0">
          <svg
            className="w-full h-8 -translate-y-3.5"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                <stop offset="33%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="66%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <line
              x1="0"
              y1="16"
              x2="100%"
              y2="16"
              stroke="url(#beamGradient)"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="motion-reduce:stroke-dashoffset-0 [stroke-dashoffset:0] animate-[dash_20s_linear_infinite]"
            />
            <circle r="3.5" fill="#06b6d4" className="motion-reduce:hidden">
              <animate attributeName="cx" values="0%;100%" dur="4s" repeatCount="indefinite" />
              <animate attributeName="cy" values="16;16" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle r="3" fill="#10b981" className="motion-reduce:hidden">
              <animate
                attributeName="cx"
                values="0%;100%"
                dur="4s"
                begin="2s"
                repeatCount="indefinite"
              />
              <animate attributeName="cy" values="16;16" dur="4s" repeatCount="indefinite" />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur="4s"
                begin="2s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {ARCHITECTURE_NODES.map((node, nodeIndex) => {
            const NodeIcon = node.icon;
            const isHovered = activeNode === node.id;

            return (
              <motion.div
                key={node.titleKey}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: nodeIndex * 0.08, ease: [0.23, 1, 0.32, 1] }}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                className={`group relative flex flex-col justify-between rounded-xl border bg-card/80 p-5 shadow-sm backdrop-blur-md transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl cursor-default select-none ${
                  isHovered ? "border-primary/60 ring-1 ring-primary/20" : "border-border/80"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      NODE {node.step}
                    </span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded-full border border-border/80 bg-muted/40 text-muted-foreground">
                      {translate(node.badgeKey)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-background/90 shadow-inner transition-transform duration-200 ease-out group-hover:scale-105 ${node.accentColor}`}
                    >
                      <NodeIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-mono text-xs font-bold text-foreground truncate">
                        {translate(node.titleKey)}
                      </h4>
                      <p className="font-mono text-xs text-muted-foreground truncate">
                        {translate(node.subtitleKey)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/50 pt-3 mt-1 flex items-center justify-between font-mono text-xs text-muted-foreground">
                  <span className="text-zinc-400">{node.protocol}</span>
                  <span className="text-cyan-400/90">{translate(node.detailKey)}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
