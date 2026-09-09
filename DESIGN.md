---
name: devRMA Portfolio
description: High-precision design system for Rafael Martins Alves's engineering leadership portfolio.
colors:
  primary: "#0ea5e9"
  primary-light: "#0b63eb"
  secondary: "#1e222b"
  secondary-light: "#dbe9fe"
  background: "#090b10"
  background-light: "#f7f9fc"
  card: "#12151d"
  card-light: "#ffffff"
  border: "#272c38"
  border-light: "#a3b8cc"
  text: "#f1f5f9"
  text-light: "#1f1f1f"
  text-muted: "#97a3b3"
  text-muted-light: "#5f6d7e"
  accent-cyan: "#06b6d4"
  accent-indigo: "#6366f1"
  accent-amber: "#f59e0b"
  accent-emerald: "#10b981"
typography:
  display:
    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title:
    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  body:
    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.025em"
rounded:
  sm: "8px"
  md: "10px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.xl}"
    padding: "10px 20px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "#0284c7"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.xl}"
    padding: "10px 20px"
    height: "40px"
  button-outline-hover:
    backgroundColor: "{colors.secondary}"
  card-surface:
    backgroundColor: "{colors.card}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "24px"
  badge-pill:
    backgroundColor: "rgba(14, 165, 233, 0.1)"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
    height: "24px"
  tab-trigger:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.sm}"
    padding: "6px 12px"
    height: "36px"
  tab-trigger-active:
    backgroundColor: "{colors.card}"
    textColor: "{colors.text}"
---

# Design System: devRMA Portfolio

## Overview

**Creative North Star: "The Distributed Systems Terminal"**

The visual language reflects an instrument-grade, high-reliability engineering control room. Deep slate and obsidian backgrounds provide a calm, low-glare canvas where signal cyan and electric blue pulses guide attention with intentional hierarchy. Monospaced indicators, timestamp clocks, and event-flow diagrams are not decorative motifs — they function as authentic telemetry that anchors technical credibility and architectural mastery.

Craft is communicated through restraint, precision, and tactile responsiveness. Rather than superficial gradients or distracting animations, surfaces communicate depth through subtle 1px translucent wire borders, frosted backdrop blurs, and natural quartic deceleration physics (`cubic-bezier(0.23, 1, 0.32, 1)`). Evaluators perceive an interface crafted by a systems architect: disciplined, observable, resilient, and performant.

**Key Characteristics:**
- Deep obsidian and slate canvases paired with high-contrast, crystal-clear typography.
- Electric cyan/blue signals reserved strictly for active states, key affordances, and real-time telemetry.
- Purposeful dual-font hierarchy: Inter for crisp, accessible human prose; JetBrains Mono for metrics, code architectures, timestamps, and badges.
- Frosted glass containers (`backdrop-blur-xl`) with 1px border lighting that reacts to cursor proximity and hover states.
- Micro-interactions built with physical feedback: 0.97 scale tap feedback, 0.5px hover elevation, and immediate status confirmations.

## Colors

A high-contrast, dark-first dual palette that balances mission-critical technical precision with effortless readability across dark and light environments.

### Primary
- **Signal Electric Blue / Cyan Flux** (`#0ea5e9` in dark, `#0b63eb` in light): Used exclusively for primary interactive triggers, active navigation markers, key milestone badges, and focal telemetry indicators.

### Secondary
- **Deep Circuit Slate** (`#1e222b` in dark, `#dbe9fe` in light): Subtle background fills for inactive interactive elements, muted button surfaces, secondary badges, and hover states.

### Tertiary
- **Telemetry Cyan** (`#06b6d4`): Architectural beam highlights, driver mobile ecosystem signals, and experience counters.
- **Telemetry Amber** (`#f59e0b`): High-scale operational alerts, challenges, and CPU/throughput status indicators.
- **Telemetry Emerald** (`#10b981`): Live operational status, Curitiba local clock pulse, and copy-to-clipboard success states.

### Neutral
- **Obsidian Dark Void** (`#090b10`): The primary dark mode background canvas, providing maximum depth with zero OLED-smear black harshness.
- **Midnight Card Surface** (`#12151d` in dark, `#ffffff` in light): Elevated container background for glass cards, dialogs, and bento cells.
- **Precision Wire Border** (`#272c38` in dark, `#a3b8cc` in light): 1px structural framing defining component edges.
- **Crisp Text Foreground** (`#f1f5f9` in dark, `#1f1f1f` in light): Primary headlines, titles, and body content.
- **Telemetry Slate Text** (`#97a3b3` in dark, `#5f6d7e` in light): Subheadings, descriptions, timestamps, and secondary captions.

### Named Rules
**The Signal Rarity Rule.** Primary electric blue and cyan are strictly rationed to interactive triggers, active tabs, and telemetry focal points. They occupy less than 10% of any viewport to preserve high signal-to-noise ratio.

**The Wireframe Contrast Rule.** Surface boundaries never rely on opaque solid block colors; they are defined by 1px translucent borders with subtle hover illumination (`border-primary/40`).

## Typography

**Display Font:** Inter (with `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`)  
**Body Font:** Inter (with `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`)  
**Label/Mono Font:** JetBrains Mono (with `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`)  

**Character:** The pairing of Inter's clean, neutral geometric sans with JetBrains Mono's distinct code ligatures and technical rhythm establishes an authoritative, engineer-first aesthetic.

### Hierarchy
- **Display** (Bold 700, `clamp(2rem, 5vw, 3.75rem)`, line-height 1.15): Primary hero statements and candidate identity.
- **Headline** (Bold 700, `2.25rem` / `text-3xl md:text-4xl`, line-height 1.25): Major section titles ("Skills & Specialties", "Projects & Case Studies").
- **Title** (Semi-bold 600, `1.25rem`–`1.5rem`, line-height 1.3): Project titles, company roles, and card headings.
- **Body** (Regular 400 & Medium 500, `1rem`–`1.125rem`, line-height 1.6): Architectural narratives and role responsibilities; constrained to `max-w-prose` (65–75ch).
- **Label** (Medium 500, `0.75rem`–`0.875rem`, letter-spacing 0.025em): Monospace tags, status indicators, dates, and technology badges.

### Named Rules
**The Technical Anchor Rule.** Monospaced numbers, dates, tech stacks, and badges anchor qualitative headings, grounding narrative statements in precise technical syntax.

**The 70ch Prose Rule.** Long-form project narratives, challenges, and architecture explanations never exceed 75 characters per line to maintain effortless readability.

## Layout

The spatial model is built around a centralized 12-column responsive container (`max-w-7xl`, `px-4 md:px-6`) with generous rhythmic vertical spacing (`py-20 md:py-28`).

- **Header Layer:** Fixed sticky top bar (`h-16`) utilizing dynamic backdrop blur (`backdrop-blur-xl`) and a bottom border that activates upon scrolling (`scrollY > 10`).
- **Hero Grid:** Asymmetrical two-column grid on desktop (photo with ambient pulse halo on the right, executive narrative and action buttons on the left).
- **Bento Telemetry Grid:** 3-column modular cards displaying live time (Curitiba, Brazil), high-scale throughput, and cumulative engineering years.
- **Case Study Architecture Grid:** 3-column breakdown for flagship systems (Challenge, Architecture, Result), providing structured technical scanning.

## Elevation & Depth

Surfaces employ a hybrid of tonal layering and frosted glassmorphism over an ambient dot-matrix background grid (`32px x 32px` radial dots) with dual overhead ambient light cones (cyan and indigo).

Depth is communicated through translucent background fills (`bg-card/70`), heavy backdrop filters (`backdrop-blur-xl`), and delicate 1px borders rather than heavy opaque drop shadows.

### Shadow Vocabulary
- **Ambient Rest** (`box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)`): Standard baseline card rest state.
- **Reactive Hover Lift** (`box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.15)`): Applied dynamically alongside `-translate-y-0.5` on hover.
- **Primary Glow** (`box-shadow: 0 8px 24px -4px rgba(14, 165, 233, 0.25)`): Subtle diffused glow beneath primary action buttons.

### Named Rules
**The Ambient Rest Rule.** Surfaces rest flat with frosted backdrop blur and 1px borders; shadows awaken strictly on hover and active focus states.

## Shapes

The form language is structured, geometric, and modern, using proportional corner radii mapped to scale and hierarchy:

- **16px (`rounded-xl`):** Primary action buttons, featured project cards, and bento metric cells.
- **12px (`rounded-lg`):** Standard cards, dialog windows, and tech category containers.
- **10px (`rounded-md`):** Buttons, inputs, and tab triggers.
- **8px (`rounded-sm`):** Inner active indicators and nested list triggers.
- **Full Pill (`rounded-full`):** Floating navigation container, status indicator badges, and profile image frame.

## Components

### Buttons
- **Shape:** Rounded rectangle with 16px radius (`rounded-xl`) or 10px radius (`rounded-md`).
- **Primary:** Electric blue fill (`bg-primary`), white text, subtle diffused glow (`shadow-md shadow-primary/20`), active micro-press (`active:scale-[0.97]`).
- **Outline / Ghost:** Transparent background with 1px border (`border-border/70`), elevating to muted hover (`hover:bg-muted`) and crisp contrast.
- **Copy Trigger:** Monospace utility button with checkmark swap animation and feedback tooltip state.

### Cards / Containers
- **Corner Style:** 12px or 16px radius.
- **Background:** Semi-translucent card surface (`bg-card/70`) with `backdrop-blur-xl`.
- **Border:** 1px translucent border (`border-border/70`), transitioning to `border-primary/40` on hover.
- **Internal Padding:** `p-5` on compact widgets, `p-6 md:p-8` on featured case studies.

### Badges & Chips
- **Status Pill:** Rounded full pill with embedded animated pulse dot (green for live operational status, blue for role/team badges).
- **Tech Stack Tag:** Compact monospace tag (`rounded-md border border-border/80 bg-muted/60 px-2.5 py-1 text-xs font-mono`) with subtle hover lift.

### Navigation
- **Header:** Sticky translucent bar with centered floating capsule pill (`rounded-full border border-border/60 bg-card/60 px-5 py-1.5 backdrop-blur-md`).
- **Mobile Menu:** Sheet overlay with accessible full-height backdrop blur and high-contrast navigation links.

### Signature Component: Telemetry Bento & Architecture Beam
- **Description:** Real-time engineering dashboard component featuring an interactive live Curitiba local time clock, pulsing status indicators, and SVG event-stream beam illustrating Kafka and NestJS asynchronous flows.

## Do's and Don'ts

### Do:
- **Do** anchor qualitative claims with monospaced statistics, verifiable tech stacks, and architecture case studies.
- **Do** maintain smooth quartic deceleration (`cubic-bezier(0.23, 1, 0.32, 1)`) across all hover and layout transitions.
- **Do** strictly support `prefers-reduced-motion: reduce` by suppressing infinite pulse loops and keyframe carousels.
- **Do** maintain minimum 44x44px touch targets for all interactive icons, buttons, and switches on mobile screens.

### Don't:
- **Don't** use solid pure black (`#000000`) for surfaces; use layered obsidian tones (`#090b10`, `#12151d`) with 1px translucent borders.
- **Don't** decorate with generic stock illustrations, cartoon avatars, or decorative fluff; let real system topology and verifiable career milestones tell the story.
- **Don't** allow accent colors (cyan, amber, emerald) to clash simultaneously; reserve electric blue/cyan for primary focus and use others contextually for telemetry.
- **Don't** break bilingual parity (`pt-BR` and `en`) when introducing new components or section revisions.
