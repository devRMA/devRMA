"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { CaseSchematic } from "@/components/molecules/case-schematic";
import { MediaPlate } from "@/components/molecules/media-plate";
import { CaseDialog } from "@/components/organisms/case-dialog";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { EngineeringCase } from "@/data/cases";
import { COVER_ALT_KEY } from "@/lib/case-keys";

const EASE = [0.23, 1, 0.32, 1] as const;
const CHIP_LIMIT = 5;

interface CaseCardProps {
  engineeringCase: EngineeringCase;
  index: number;
}

export function CaseCard({ engineeringCase, index }: CaseCardProps) {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const { id, technologies } = engineeringCase;

  const title = t(`projects.cases.${id}.title`);
  const visibleTechnologies = technologies.slice(0, CHIP_LIMIT);
  const overflowCount = technologies.length - CHIP_LIMIT;

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: prefersReducedMotion ? 0.15 : 0.4,
        delay: prefersReducedMotion ? 0 : index * 0.06,
        ease: EASE,
      }}
      className="h-full"
    >
      <Dialog>
        <article className="group relative flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-[180ms] ease-out-expo hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl active:scale-[0.99] motion-reduce:transform-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100">
          {engineeringCase.cover ? (
            <MediaPlate
              variant="capture"
              aspect="16/10"
              kindLabel={t("projects.case.kindCapture")}
              year={engineeringCase.year}
              alt={t(COVER_ALT_KEY[id])}
              src={engineeringCase.cover.src}
              width={engineeringCase.cover.width}
              height={engineeringCase.cover.height}
              sizes={engineeringCase.cover.sizes}
            />
          ) : (
            <MediaPlate
              variant="diagram"
              aspect="16/10"
              kindLabel={t("projects.case.kindDiagram")}
              year={engineeringCase.year}
              alt={t(COVER_ALT_KEY[id])}
              note={t("projects.cases.isend.schema.caption")}
            >
              <CaseSchematic />
            </MediaPlate>
          )}

          <span className="inline-flex w-fit items-center rounded-full border border-border/70 bg-muted/60 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">
            {t(`projects.cases.${id}.badge`)}
          </span>

          <h3 className="text-lg font-semibold leading-snug tracking-tight text-balance text-foreground md:text-xl">
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label={t("a11y.openCase", { title })}
                className="text-left after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring focus-visible:after:ring-offset-2 focus-visible:after:ring-offset-background"
              >
                {title}
              </button>
            </DialogTrigger>
          </h3>

          <p className="truncate font-mono text-xs text-muted-foreground">
            {t(`projects.cases.${id}.systemName`)}
          </p>

          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {t(`projects.cases.${id}.subtitle`)}
          </p>

          <ul className="flex flex-wrap gap-2">
            {visibleTechnologies.map((technology) => (
              <li key={technology}>
                <Badge
                  variant="outline"
                  className="border-border/80 bg-muted/60 font-mono text-xs text-muted-foreground"
                >
                  {technology}
                </Badge>
              </li>
            ))}
            {overflowCount > 0 ? (
              <li>
                <Badge
                  variant="outline"
                  className="border-border/80 bg-muted/60 font-mono text-xs text-muted-foreground"
                >
                  {`+${overflowCount}`}
                </Badge>
              </li>
            ) : null}
          </ul>

          <div
            className="mt-auto flex items-center gap-1 border-t border-border/50 pt-4 font-mono text-xs text-primary"
            aria-hidden="true"
          >
            {t("projects.case.open")}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-[180ms] ease-out-expo group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:group-hover:translate-x-0" />
          </div>
        </article>

        <CaseDialog engineeringCase={engineeringCase} />
      </Dialog>
    </motion.div>
  );
}
