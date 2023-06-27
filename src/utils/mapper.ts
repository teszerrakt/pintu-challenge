import { IGetSupportedCurrenciesResponse } from 'src/interface'

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
  currencies: IGetSupportedCurrenciesResponse[]
): TMappedSupportedCurrencies {
  const mappedCurrencies: TMappedSupportedCurrencies = {}

  currencies.forEach((currency) => {
    const { decimal_point, wallets, currencySymbol, ...rest } = currency
    mappedCurrencies[currencySymbol] = rest
  })

  return mappedCurrencies
}
