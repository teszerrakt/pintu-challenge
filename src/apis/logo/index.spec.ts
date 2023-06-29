import fetchLogo from 'src/apis/logo/getLogo'

describe('fetchLogo', () => {
  it('returns the logo when the API call is successful', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ payload: 'logo.png' }),
      })
    })

    const logo = await fetchLogo('http://example.com/logo')

    expect(logo).toBe('logo.png')
    expect(fetch).toHaveBeenCalledWith(
      '/api/logo?url=http%3A%2F%2Fexample.com%2Flogo'
    )
  })

  it('returns an empty string when the API call fails', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({ status: 404 })
    })

    const logo = await fetchLogo('http://example.com/logo')

    expect(logo).toBe('')
    expect(fetch).toHaveBeenCalledWith(
      '/api/logo?url=http%3A%2F%2Fexample.com%2Flogo'
    )
  })

  it('returns an empty string when the API response does not contain a logo', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ payload: null }),
      })
    })

    const logo = await fetchLogo('http://example.com/logo')

    expect(logo).toBe('')
    expect(fetch).toHaveBeenCalledWith(
      '/api/logo?url=http%3A%2F%2Fexample.com%2Flogo'
    )
  })
})
