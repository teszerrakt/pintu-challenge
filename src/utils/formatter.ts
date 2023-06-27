export function stringToCurrency(
  value: string,
  locales = 'id-ID',
  currency = 'IDR'
) {
  return Number(value).toLocaleString(locales, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  })
}

export function pairCodeSeparator(pair: string) {
  return pair.toUpperCase().split('/')
}

export function formatBaseURL(url: string) {
  if (url.endsWith('/')) {
    url = url.slice(0, -1)
  }

  return url
}
