import { IGetLatestPricePayload } from 'src/apis/latestPrice/interface'

export const MOCK_LATEST_PRICE_DATA: IGetLatestPricePayload[] = [
  {
    pair: 'btc/idr',
    priceChanges: {
      latestPrice: '458103826',
      day: '0.66',
      week: '2.26',
      month: '10.47',
      year: '51.33',
    },
    currency: {
      currencySymbol: 'BTC',
      currencyGroup: 'BTC',
      color: '#F78B1A',
      name: 'Bitcoin',
      logo: 'https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_BTC.svg',
      listingDate: '2020-09-15T09:43:45Z',
    },
  },
  {
    pair: 'eth/idr',
    priceChanges: {
      latestPrice: '27806628',
      day: '-0.17',
      week: '-1.04',
      month: '-1.83',
      year: '62.84',
    },
    currency: {
      currencySymbol: 'ETH',
      currencyGroup: 'ETH',
      color: '#9011FE',
      name: 'Ethereum',
      logo: 'https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_ETH.svg',
      listingDate: '2020-09-15T09:43:46Z',
    },
  },
  {
    pair: 'usdt/idr',
    priceChanges: {
      latestPrice: '15002',
      day: '0.04',
      week: '0.33',
      month: '0.14',
      year: '1.11',
    },
    currency: {
      currencySymbol: 'USDT',
      currencyGroup: 'USDT',
      color: '#15A57C',
      name: 'Tether',
      logo: 'https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_USDT.svg',
      listingDate: '2020-09-15T09:43:47Z',
    },
  },
]
