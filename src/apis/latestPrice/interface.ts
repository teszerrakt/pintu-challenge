import { IResponse, TMovement } from 'src/interface'

export type TGetPriceChangeResponse = IResponse<IGetPriceChangePayload[]>
export type TGetSupportedCurrenciesResponse = IResponse<
  IGetSupportedCurrenciesPayload[]
>
export type TGetLatestPriceResponse = IResponse<IGetLatestPricePayload[]>

export interface IGetPriceChangePayload {
  pair: string
  latestPrice: string
  day: string
  week: string
  month: string
  year: string
}

export interface IGetSupportedCurrenciesPayload {
  currencyGroup: string
  color: string
  currencySymbol: string
  name: string
  logo: string
  decimal_point: number
  listingDate: string
  wallets: IWallet[]
}

export interface IWallet {
  currencyGroup: string
  tokenSymbol: string
  decimal_point: number
  tokenType: string
  blockchain: string
  explorer: string
  listingDate: string
  blockchainName: string
  logo: string
}

interface IPriceChanges extends Omit<IGetPriceChangePayload, 'pair'> {
  latestPriceStatus?: TMovement
}

export interface IGetLatestPricePayload {
  pair: string
  priceChanges: IPriceChanges
  currency: Omit<IGetSupportedCurrenciesPayload, 'wallets' | 'decimal_point'>
}
