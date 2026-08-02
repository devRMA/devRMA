const labels = {
  "pt-BR": {
    year: "ano",
    years: "anos",
    month: "mês",
    months: "meses",
    invalid: "Menos de um mês",
    joiner: " e ",
  },
  en: {
    year: "year",
    years: "years",
    month: "month",
    months: "months",
    invalid: "Less than a month",
    joiner: " and ",
  },
} as const;

type SupportedLocale = keyof typeof labels;

type DurationConfig = {
  locale: SupportedLocale;
};

type YearMonth = { year: number; month: number };

function parseYearMonth(value: string | undefined): YearMonth | undefined {
  if (!value) {
    return undefined;
  }

  const match = /^(\d{4})-(\d{2})/.exec(value);
  if (!match) {
    return undefined;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);

  if (month < 1 || month > 12) {
    return undefined;
  }

  return { year, month: month - 1 };
}

function currentYearMonth(): YearMonth {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() };
}

function countMonthsInclusive(start: YearMonth, end: YearMonth) {
  return (end.year - start.year) * 12 + (end.month - start.month) + 1;
}

export function formatDurationRange(
  startInput: string,
  endInput: string | undefined,
  { locale }: DurationConfig,
) {
  const intlLabels = labels[locale];
  const start = parseYearMonth(startInput);

  if (!start) {
    return intlLabels.invalid;
  }

  const end = endInput ? parseYearMonth(endInput) : currentYearMonth();

  if (!end) {
    return intlLabels.invalid;
  }

  const totalMonths = countMonthsInclusive(start, end);

  if (totalMonths < 1) {
    return intlLabels.invalid;
  }

  const wholeYears = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;
  const parts: string[] = [];

  if (wholeYears > 0) {
    parts.push(`${wholeYears} ${wholeYears === 1 ? intlLabels.year : intlLabels.years}`);
  }

  if (remainingMonths > 0) {
    parts.push(
      `${remainingMonths} ${remainingMonths === 1 ? intlLabels.month : intlLabels.months}`,
    );
  }

  return parts.join(intlLabels.joiner);
}
