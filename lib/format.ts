const currencyFormatters = new Map<string, Intl.NumberFormat>();

function getCurrencyFormatter(fractionDigits: number) {
  const key = String(fractionDigits);
  let formatter = currencyFormatters.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
    currencyFormatters.set(key, formatter);
  }
  return formatter;
}

/** Formata um valor em Reais, ex: 12.5 -> "R$ 12,50" */
export function formatBRL(value: number, fractionDigits = 2) {
  return getCurrencyFormatter(fractionDigits).format(value);
}

/** Formata uma variação percentual com sinal, ex: 3.4 -> "+3,4%" */
export function formatPct(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1).replace(".", ",")}%`;
}

export function formatDateShort(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(date);
}
