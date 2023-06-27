import {
  IGetPriceChangeResponse,
  IGetSupportedCurrenciesResponse,
  TMovement,
} from 'src/interface'

interface IPriceChanges extends Omit<IGetPriceChangeResponse, 'pair'> {
  latestPriceStatus?: TMovement
}

export interface IGetLatestPriceResponse {
  pair: string
  priceChanges: IPriceChanges
  currency: Omit<
    IGetSupportedCurrenciesResponse,
    'wallets' | 'listingDate' | 'decimal_point'
  >
}
