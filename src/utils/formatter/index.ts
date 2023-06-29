export function stringToCurrency(
  value: string,
  locales = 'id-ID',
  currency = 'IDR'
): string {
  return Number(value).toLocaleString(locales, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  })
}

export function pairCodeSeparator(pair: string): string[] {
  return pair.toUpperCase().split('/')
}

export function serializeQueryParams(params: Record<string, any>): string {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&')
}
