"use client";

import { useId } from "react";
import { useLanguage } from "@/components/language-provider";

interface SchematicNode {
  labelKey: string;
  sublabelKey: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const CENTRE_SPINE_NODES: SchematicNode[] = [
  {
    labelKey: "projects.cases.isend.schema.db",
    sublabelKey: "projects.cases.isend.schema.dbSub",
    x: 40,
    y: 40,
    width: 300,
    height: 80,
  },
  {
    labelKey: "projects.cases.isend.schema.async",
    sublabelKey: "projects.cases.isend.schema.asyncSub",
    x: 460,
    y: 40,
    width: 300,
    height: 80,
  },
  {
    labelKey: "projects.cases.isend.schema.core",
    sublabelKey: "projects.cases.isend.schema.coreSub",
    x: 250,
    y: 200,
    width: 300,
    height: 100,
  },
  {
    labelKey: "projects.cases.isend.schema.apm",
    sublabelKey: "projects.cases.isend.schema.apmSub",
    x: 40,
    y: 380,
    width: 300,
    height: 80,
  },
  {
    labelKey: "projects.cases.isend.schema.ci",
    sublabelKey: "projects.cases.isend.schema.ciSub",
    x: 460,
    y: 380,
    width: 300,
    height: 80,
  },
];

const STACKED_LABEL_KEYS = [
  ["projects.cases.isend.schema.db", "projects.cases.isend.schema.dbSub"],
  ["projects.cases.isend.schema.async", "projects.cases.isend.schema.asyncSub"],
  ["projects.cases.isend.schema.core", "projects.cases.isend.schema.coreSub"],
  ["projects.cases.isend.schema.apm", "projects.cases.isend.schema.apmSub"],
  ["projects.cases.isend.schema.ci", "projects.cases.isend.schema.ciSub"],
] as const;

const STACKED_Y = [10, 110, 210, 310, 410];
const STACKED_RAIL_MID_Y = [50, 150, 250, 350, 450];

interface CentreSpineNodeProps {
  node: SchematicNode;
  label: string;
  sublabel: string;
}

function CentreSpineNode({ node, label, sublabel }: CentreSpineNodeProps) {
  return (
    <g>
      <rect
        x={node.x}
        y={node.y}
        width={node.width}
        height={node.height}
        rx="10"
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <text
        x={node.x + 24}
        y={node.y + 34}
        fontFamily="var(--font-mono, monospace)"
        fontSize="15"
        fill="hsl(var(--muted-foreground))"
      >
        {label}
      </text>
      <text
        x={node.x + 24}
        y={node.y + 58}
        fontFamily="var(--font-mono, monospace)"
        fontSize="13"
        fill="hsl(var(--muted-foreground))"
      >
        {sublabel}
      </text>
    </g>
  );
}

export function CaseSchematic() {
  const { t: translate } = useLanguage();
  const id = useId();
  const arrowId = `${id}-arrow`;
  const arrowPrimaryId = `${id}-arrow-primary`;

  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-desc`}
      className="h-full w-full"
    >
      <title id={`${id}-title`}>{translate("projects.cases.isend.schema.title")}</title>
      <desc id={`${id}-desc`}>{translate("projects.cases.isend.alt")}</desc>

      <defs>
        <marker id={arrowId} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="hsl(var(--border))" />
        </marker>
        <marker
          id={arrowPrimaryId}
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="hsl(var(--primary))" />
        </marker>
      </defs>

      <g className="hidden sm:block">
        {CENTRE_SPINE_NODES.map((node) => (
          <CentreSpineNode
            key={node.labelKey}
            node={node}
            label={translate(node.labelKey)}
            sublabel={translate(node.sublabelKey)}
          />
        ))}
        <line
          x1="190"
          y1="120"
          x2="310"
          y2="200"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          markerEnd={`url(#${arrowId})`}
        />
        <line
          x1="610"
          y1="120"
          x2="490"
          y2="200"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          markerEnd={`url(#${arrowId})`}
        />
        <line
          x1="310"
          y1="300"
          x2="190"
          y2="380"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          markerEnd={`url(#${arrowPrimaryId})`}
        />
        <line
          x1="490"
          y1="300"
          x2="610"
          y2="380"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          markerEnd={`url(#${arrowId})`}
        />
      </g>

      <g className="sm:hidden">
        {STACKED_LABEL_KEYS.map(([labelKey, sublabelKey], index) => (
          <CentreSpineNode
            key={labelKey}
            node={{
              labelKey,
              sublabelKey,
              x: 40,
              y: STACKED_Y[index],
              width: 720,
              height: 80,
            }}
            label={translate(labelKey)}
            sublabel={translate(sublabelKey)}
          />
        ))}
        {STACKED_RAIL_MID_Y.slice(0, -1).map((y, index) => {
          const nextY = STACKED_RAIL_MID_Y[index + 1];
          const isPrimary = index === 2;
          const stroke = isPrimary ? "hsl(var(--primary))" : "hsl(var(--border))";
          return (
            <line
              key={`rail-${y}`}
              x1="20"
              y1={y}
              x2="20"
              y2={nextY}
              stroke={stroke}
              strokeWidth="1"
            />
          );
        })}
        {STACKED_RAIL_MID_Y.map((y) => (
          <line
            key={`stub-${y}`}
            x1="20"
            y1={y}
            x2="40"
            y2={y}
            stroke="hsl(var(--border))"
            strokeWidth="1"
          />
        ))}
      </g>
    </svg>
  );
}
