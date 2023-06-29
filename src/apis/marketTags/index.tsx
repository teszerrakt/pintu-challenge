import { TGetMarketTagsResponse } from 'src/apis/marketTags/interface'
import { PINTU_CONTENT_API_URL } from 'src/constants/env'
import { serializeQueryParams } from 'src/utils/formatter'

async function getMarketTags(
  slug?: string,
  locales: 'ID' | 'EN' = 'ID'
): Promise<TGetMarketTagsResponse> {
  try {
    const queryParam = serializeQueryParams({
      'language.name': locales,
      _sort: 'order:ASC',
      slug_eq: slug,
    })

    const response = await fetch(
      `${PINTU_CONTENT_API_URL}/market-tags?${queryParam}`
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
