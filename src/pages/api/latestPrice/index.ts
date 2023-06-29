import { TMovement } from 'src/interface'
import {
  TMappedSupportedCurrencies,
  mapSupportedCurrencies,
} from 'src/utils/mapper'

import {
  IGetLatestPricePayload,
  IGetPriceChangePayload,
  IGetSupportedCurrenciesPayload,
  TGetPriceChangeResponse,
  TGetSupportedCurrenciesResponse,
} from 'src/apis/latestPrice/interface'
import { pairCodeSeparator } from 'src/utils/formatter'
import { PINTU_API_URL } from 'src/constants/env'
import { NextApiRequest, NextApiResponse } from 'next'

let supportedCurrencies: IGetSupportedCurrenciesPayload[] = []
let mappedSupportedCurrencies: TMappedSupportedCurrencies = {}

let previousPrice: IGetPriceChangePayload[] = []
let currentPrice: IGetPriceChangePayload[] = []

async function init() {
  try {
    if (supportedCurrencies.length > 0) return
    const response = await fetch(
      `${PINTU_API_URL}/v2/wallet/supportedCurrencies`
    )

    const data: TGetSupportedCurrenciesResponse = await response.json()

    if (data.code !== 'success') {
      throw new Error(data.message)
    }

    supportedCurrencies = data.payload
    mappedSupportedCurrencies = mapSupportedCurrencies(supportedCurrencies)
  } catch (error) {
    throw new Error('Error: Failed to fetch supported currencies')
  }
}

function comparePrice(
  previousPrice: IGetPriceChangePayload | undefined,
  currentPrice: IGetPriceChangePayload
): TMovement {
  if (!previousPrice) {
    return 'same'
  }
  if (previousPrice.latestPrice > currentPrice.latestPrice) {
    return 'down'
  }
  if (previousPrice.latestPrice < currentPrice.latestPrice) {
    return 'up'
  }

  return 'same'
}

async function fetchPrice() {
  try {
    const response = await fetch(`${PINTU_API_URL}/v2/trade/price-changes`, {
      cache: 'no-cache',
    })

    const data: TGetPriceChangeResponse = await response.json()

    if (data.code !== 'success') {
      throw new Error(data.message)
    }

    previousPrice = currentPrice
    currentPrice = data.payload
  } catch (error) {
    throw new Error('Error: Failed to fetch latest price')
  }
}

export async function getPayload(): Promise<IGetLatestPricePayload[]> {
  await init()
  await fetchPrice()

  const payload: IGetLatestPricePayload[] = []

  for (const price of currentPrice) {
    const { pair, ...restPrice } = price
    const [code] = pairCodeSeparator(pair)
    const currency = mappedSupportedCurrencies[code]

    if (!currency) {
      await init()
    }

    if (!currency?.name || !currency?.logo) {
      continue
    }

    payload.push({
      pair: pair,
      priceChanges: restPrice,
      currency: {
        currencySymbol: code,
        ...currency,
      },
    })
  }

  payload.sort((a, b) => {
    const currencyA = mappedSupportedCurrencies[a.currency.currencySymbol]
    const currencyB = mappedSupportedCurrencies[b.currency.currencySymbol]

    if (!currencyA || !currencyB) {
      return 0
    }

    const dateA = new Date(currencyA.listingDate)
    const dateB = new Date(currencyB.listingDate)

    return dateA.getTime() - dateB.getTime()
  })

  return payload
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const payload = await getPayload()

    return res.status(200).json({
      message: 'success',
      code: 200,
      payload,
    })
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
      code: 500,
      payload: null,
    })
  }
}
