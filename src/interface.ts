export type TMovement = 'up' | 'down' | 'same'
export type TDirection = 'up' | 'down'

export interface IResponse<TPayload> {
  code: string
  message: string
  payload: TPayload
}

export interface IGetPriceChangeResponse {
  pair: string
  latestPrice: string
  day: string
  week: string
  month: string
  year: string
}

export interface IGetSupportedCurrenciesResponse {
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
