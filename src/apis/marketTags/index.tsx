import { TGetMarketTagsResponse } from 'src/apis/marketTags/interface'
import { PINTU_CONTENT_API_URL } from 'src/constants/env'

async function getMarketTags(
  locales: 'ID' | 'EN' = 'ID'
): Promise<TGetMarketTagsResponse> {
  try {
    const response = await fetch(
      `${PINTU_CONTENT_API_URL}/market-tags?language.name=${locales}&_sort=order:ASC`
    )

    if (response.status !== 200) {
      return []
    }

    const data: TGetMarketTagsResponse = await response.json()

    return data
  } catch (error) {
    return []
  }
}

export default getMarketTags
