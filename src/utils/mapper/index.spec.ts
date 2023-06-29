import { mapSupportedCurrencies } from 'src/utils/mapper'
import { MOCK_SUPPORTED_CURRENCIES } from 'src/__mocks__/supported-currencies'
import { IGetSupportedCurrenciesPayload } from 'src/apis/latestPrice/interface'

describe('mapSupportedCurrencies', () => {
  test('maps supported currencies correctly', () => {
    const result = mapSupportedCurrencies(MOCK_SUPPORTED_CURRENCIES)

    expect(result).toEqual({
      BUSD: {
        currencyGroup: 'BUSD',
        color: '#FEBF11',
        name: 'Binance USD',
        logo: 'https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_BUSD.svg',
        listingDate: '2023-02-06T07:00:00Z',
      },
      '1INCH': {
        currencyGroup: '1INCH',
        color: '#3B76BA',
        name: '1inch',
        logo: 'https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_1INCH.svg',
        listingDate: '2021-08-26T05:15:18Z',
      },
      ALPHA: {
        currencyGroup: 'ALPHA',
        color: '#1F66E6',
        name: 'Alpha Finance',
        logo: 'https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_ALPHA.svg',
        listingDate: '2022-01-13T18:15:20Z',
      },
      LDO: {
        currencyGroup: 'LDO',
        color: '#469BF0',
        name: 'Lido DAO',
        logo: 'https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_LDO.svg',
        listingDate: '2022-05-20T04:00:18Z',
      },
      VET: {
        currencyGroup: 'VET',
        color: '#23B2F9',
        name: 'VeChain',
        logo: 'https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_VET.svg',
        listingDate: '2022-07-28T07:00:09Z',
      },
    })
  })

  test('returns an empty object for empty currencies array', () => {
    const currencies: IGetSupportedCurrenciesPayload[] = []
    const result = mapSupportedCurrencies(currencies)
    expect(result).toEqual({})
  })
})
