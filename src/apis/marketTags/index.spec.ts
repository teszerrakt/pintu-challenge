import getMarketTags from 'src/apis/marketTags'

describe('getMarketTags', () => {
  const mockTagsResponse = [
    { id: 1, name: 'Tag 1' },
    { id: 2, name: 'Tag 2' },
  ]

  it('returns an empty array when the API call fails', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({ status: 500 })
    })

    const result = await getMarketTags()

    expect(result).toEqual([])
  })

  it('returns an empty array when the API call rejected', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject({ status: 500 })
    })

    const result = await getMarketTags()

    expect(result).toEqual([])
  })

  it('returns the market tags data from the API response', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockTagsResponse),
      })
    })

    const result = await getMarketTags()

    expect(result).toEqual(mockTagsResponse)
  })

  it('sends the correct API request URL with query parameters', async () => {
    const mockSlug = 'example-slug'
    const mockLocales = 'EN'

    global.fetch = jest.fn().mockImplementation((url) => {
      expect(url).toContain(`/market-tags?`)

      const queryParams = url.split('?')[1]
      const queryParamsObj = Object.fromEntries(
        new URLSearchParams(queryParams)
      )

      expect(queryParamsObj['language.name']).toBe(mockLocales)
      expect(queryParamsObj['_sort']).toBe('order:ASC')
      expect(queryParamsObj['slug_eq']).toBe(mockSlug)

      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockTagsResponse),
      })
    })

    await getMarketTags(mockSlug, mockLocales)
  })
})
