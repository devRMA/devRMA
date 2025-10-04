const labels = {
  "pt-BR": {
    year: "ano",
    years: "anos",
    month: "mês",
    months: "meses",
    lessThanMonth: "Menos de um mês",
    joiner: " e ",
  },
  en: {
    year: "year",
    years: "years",
    month: "month",
    months: "months",
    lessThanMonth: "Less than a month",
    joiner: " and ",
  },
} as const;

type SupportedLocale = keyof typeof labels;

type DurationConfig = {
  locale: SupportedLocale;
};

function parseDate(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function clampToStart(start: Date | undefined, end: Date | undefined) {
  if (!start || !end) {
    return { start, end };
  }

  return end < start ? { start, end: start } : { start, end };
}

export function formatDurationRange(
  startInput: string,
  endInput: string | undefined,
  { locale }: DurationConfig,
) {
  const start = parseDate(startInput);
  const requestedEnd = parseDate(endInput) ?? new Date();
  const { start: validStart, end } = clampToStart(start, requestedEnd);

  if (!validStart || !end) {
    return labels[locale].lessThanMonth;
  }

  const yearDiff = end.getFullYear() - validStart.getFullYear();
  const monthDiff = end.getMonth() - validStart.getMonth();
  let totalMonths = yearDiff * 12 + monthDiff;

  if (end.getDate() < validStart.getDate()) {
    totalMonths -= 1;
  }

  if (totalMonths < 0) {
    totalMonths = 0;
  }

  const wholeYears = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;
  const intlLabels = labels[locale];
  const parts: string[] = [];

  if (wholeYears > 0) {
    parts.push(`${wholeYears} ${wholeYears === 1 ? intlLabels.year : intlLabels.years}`);
  }

  if (remainingMonths > 0) {
    parts.push(
      `${remainingMonths} ${remainingMonths === 1 ? intlLabels.month : intlLabels.months}`,
    );
  }

  if (parts.length === 0) {
    return intlLabels.lessThanMonth;
  }

  return parts.join(intlLabels.joiner);
}
