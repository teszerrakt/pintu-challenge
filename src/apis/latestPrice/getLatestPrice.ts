import { IGetLatestPricePayload } from 'src/apis/latestPrice/interface'
import { TMovement } from 'src/interface'

export function comparePrice(
  previousPrice: IGetLatestPricePayload | undefined,
  currentPrice: IGetLatestPricePayload
): TMovement {
  if (!previousPrice) {
    return 'same'
  }

  if (
    previousPrice.priceChanges.latestPrice >
    currentPrice.priceChanges.latestPrice
  ) {
    return 'down'
  }
  if (
    previousPrice.priceChanges.latestPrice <
    currentPrice.priceChanges.latestPrice
  ) {
    return 'up'
  }

  return 'same'
}

async function getLatestPrice(
  previousData?: IGetLatestPricePayload[]
): Promise<IGetLatestPricePayload[]> {
  try {
    const response = await fetch(`/api/latestPrice`)
    const data = await response.json()
    const payload = data.payload

    if (previousData) {
      const previousPrice: Record<string, IGetLatestPricePayload> =
        previousData.reduce(
          (acc: Record<string, any>, current: IGetLatestPricePayload) => {
            acc[current.pair] = current
            return acc
          },
          {}
        )

      payload.forEach((current: IGetLatestPricePayload) => {
        const previous = previousPrice[current.pair]
        current.priceChanges.latestPriceStatus = comparePrice(previous, current)
      })
    }

    return payload
  } catch (error) {
    return []
  }
}

export default getLatestPrice
