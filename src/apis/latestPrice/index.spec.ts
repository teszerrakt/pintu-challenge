import { MOCK_LATEST_PRICE_DATA } from 'src/__mocks__/latest-price'
import getLatestPrice, {
  comparePrice,
} from 'src/apis/latestPrice/getLatestPrice'
import { IGetLatestPricePayload } from './interface'

describe('comparePrice', () => {
  it('returns "same" when previousPrice is undefined', () => {
    const result = comparePrice(undefined, MOCK_LATEST_PRICE_DATA[0])

    expect(result).toBe('same')
  })

  it('returns "up" when the latest price is higher than the previous price', () => {
    const previousPrice = {
      priceChanges: { latestPrice: 100 },
    } as unknown as IGetLatestPricePayload
    const currentPrice = {
      priceChanges: { latestPrice: 150 },
    } as unknown as IGetLatestPricePayload

    const result = comparePrice(previousPrice, currentPrice)

    expect(result).toBe('up')
  })

  it('returns "down" when the latest price is lower than the previous price', () => {
    const previousPrice = {
      priceChanges: { latestPrice: 150 },
    } as unknown as IGetLatestPricePayload
    const currentPrice = {
      priceChanges: { latestPrice: 100 },
    } as unknown as IGetLatestPricePayload

    const result = comparePrice(previousPrice, currentPrice)

    expect(result).toBe('down')
  })

  it('returns "same" when the latest price is the same as the previous price', () => {
    const previousPrice = {
      priceChanges: { latestPrice: 100 },
    } as unknown as IGetLatestPricePayload
    const currentPrice = {
      priceChanges: { latestPrice: 100 },
    } as unknown as IGetLatestPricePayload

    const result = comparePrice(previousPrice, currentPrice)

    expect(result).toBe('same')
  })
})

describe('getLatestPrice', () => {
  it('returns an empty array when the API call fails', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject('API call failed')
    })

    const result = await getLatestPrice()

    expect(result).toEqual([])
  })

  it('returns the payload data from the API response', async () => {
    const mockPayload = [
      { pair: 'BTC/USD', priceChanges: { latestPrice: 50000 } },
      { pair: 'ETH/USD', priceChanges: { latestPrice: 2000 } },
    ]

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ payload: mockPayload }),
      })
    })

    const result = await getLatestPrice()

    expect(result).toEqual(mockPayload)
  })

  it('modifies the latestPriceStatus property for each data entry when previousData is provided', async () => {
    const mockPreviousData = [
      { pair: 'BTC/USD', priceChanges: { latestPrice: 40000 } },
      { pair: 'ETH/USD', priceChanges: { latestPrice: 1800 } },
    ] as unknown as IGetLatestPricePayload[]

    const mockPayload = [
      { pair: 'BTC/USD', priceChanges: { latestPrice: 50000 } },
      { pair: 'ETH/USD', priceChanges: { latestPrice: 2000 } },
    ]

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ payload: mockPayload }),
      })
    })

    const result = await getLatestPrice(mockPreviousData)

    expect(result).toEqual([
      {
        pair: 'BTC/USD',
        priceChanges: { latestPrice: 50000, latestPriceStatus: 'up' },
      },
      {
        pair: 'ETH/USD',
        priceChanges: { latestPrice: 2000, latestPriceStatus: 'up' },
      },
    ])
  })
})
