"use client";

import { Activity, CheckCircle2, Cpu } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { ArchitectureBeam } from "@/components/molecules/architecture-beam";
import { CasePillar } from "@/components/molecules/case-pillar";
import { CaseSchematic } from "@/components/molecules/case-schematic";
import { MediaPlate } from "@/components/molecules/media-plate";
import { Badge } from "@/components/ui/badge";
import { DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { EngineeringCase } from "@/data/cases";
import { COVER_ALT_KEY } from "@/lib/case-keys";

const SECTION_HEADING_CLASS =
  "mb-3 font-mono text-[11px] font-bold uppercase tracking-wider text-muted-foreground";

interface CaseDialogProps {
  engineeringCase: EngineeringCase;
}

export function CaseDialog({ engineeringCase }: CaseDialogProps) {
  const { t } = useLanguage();
  const { id } = engineeringCase;
  const title = t(`projects.cases.${id}.title`);

  return (
    <DialogContent
      className="grid max-h-[90dvh] max-w-3xl grid-rows-[auto_1fr] gap-0 overflow-hidden p-0"
      closeLabel={t("a11y.closeCase")}
    >
      <div className="border-b border-border/60 bg-background/95 px-5 py-4 pr-16 backdrop-blur-xl">
        <span className="inline-flex items-center rounded-full border border-border/70 bg-muted/60 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">
          {t(`projects.cases.${id}.badge`)}
        </span>
        <DialogTitle className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">
          {title}
        </DialogTitle>
        <DialogDescription className="font-mono text-xs text-muted-foreground">
          {t(`projects.cases.${id}.systemName`)} · {t(`projects.cases.${id}.team`)}
        </DialogDescription>
      </div>

      <div
        className="overflow-y-auto p-5 space-y-8 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring"
        tabIndex={0}
        role="group"
        aria-label={t("a11y.caseDialog", { title })}
      >
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

        <div className="space-y-4">
          <CasePillar
            icon={Activity}
            iconClassName="text-amber-600 dark:text-amber-400"
            title={t("projects.case.challengeTitle")}
            body={t(`projects.cases.${id}.challenge`)}
          />
          <CasePillar
            icon={Cpu}
            iconClassName="text-cyan-700 dark:text-cyan-400"
            title={t("projects.case.architectureTitle")}
            body={t(`projects.cases.${id}.architecture`)}
          >
            {engineeringCase.hasArchitectureBeam ? (
              <div className="mt-4">
                <h5 className={SECTION_HEADING_CLASS}>{t("projects.cases.iship.diagramTitle")}</h5>
                <ArchitectureBeam />
              </div>
            ) : null}
          </CasePillar>
          <CasePillar
            icon={CheckCircle2}
            iconClassName="text-emerald-700 dark:text-emerald-400"
            title={t("projects.case.resultTitle")}
            body={t(`projects.cases.${id}.result`)}
          />
        </div>

        <div className="border-t border-border/60 pt-5">
          <h4 className={SECTION_HEADING_CLASS}>{t("projects.case.stackTitle")}</h4>
          <ul className="flex flex-wrap gap-2">
            {engineeringCase.technologies.map((technology) => (
              <li key={technology}>
                <Badge
                  variant="outline"
                  className="border-border/80 bg-muted/60 font-mono text-xs text-muted-foreground"
                >
                  {technology}
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        {engineeringCase.evidence.length > 0 ? (
          <div>
            <h4 className={SECTION_HEADING_CLASS}>{t("projects.case.evidenceTitle")}</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {engineeringCase.evidence.map((plate) => (
                <MediaPlate
                  key={plate.altKey}
                  variant="capture"
                  aspect={plate.aspect}
                  kindLabel={t("projects.case.kindCapture")}
                  year={engineeringCase.year}
                  alt={t(`projects.cases.${id}.shots.${plate.altKey}`)}
                  src={plate.src}
                  width={plate.width}
                  height={plate.height}
                  sizes={plate.sizes}
                />
              ))}
            </div>
          </div>
        ) : null}

        {engineeringCase.mobileEvidence.length > 0 ? (
          <div>
            <h4 className={SECTION_HEADING_CLASS}>{t("projects.case.responsiveTitle")}</h4>
            <div className="grid grid-cols-2 gap-3">
              {engineeringCase.mobileEvidence.map((plate) => (
                <MediaPlate
                  key={plate.altKey}
                  variant="capture"
                  aspect="9/16"
                  kindLabel={t("projects.case.kindCapture")}
                  year={engineeringCase.year}
                  alt={t(`projects.cases.${id}.shots.${plate.altKey}`)}
                  src={plate.src}
                  width={plate.width}
                  height={plate.height}
                  sizes={plate.sizes}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </DialogContent>
  );
}
