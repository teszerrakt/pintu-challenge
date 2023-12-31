import { IGetSupportedCurrenciesPayload } from 'src/apis/latestPrice/interface'

export type TMappedSupportedCurrencies = Record<
  string,
  {
    currencyGroup: string
    color: string
    name: string
    logo: string
    listingDate: string
  }
>

export function mapSupportedCurrencies(
  currencies: IGetSupportedCurrenciesPayload[]
): TMappedSupportedCurrencies {
  const mappedCurrencies: TMappedSupportedCurrencies = {}

  currencies.forEach((currency) => {
    const { decimal_point, wallets, currencySymbol, ...rest } = currency
    mappedCurrencies[currencySymbol] = rest
  })

  return mappedCurrencies
}
