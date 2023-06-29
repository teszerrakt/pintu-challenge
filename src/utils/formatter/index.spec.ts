import {
  pairCodeSeparator,
  serializeQueryParams,
  stringToCurrency,
} from 'src/utils/formatter'

describe('stringToCurrency', () => {
  test('converts a string to currency format', () => {
    const result = stringToCurrency('1234567890')
    expect(result).toBe('Rp 1.234.567.890')
  })

  test('uses specified locales and currency', () => {
    const result = stringToCurrency('9876543210', 'en-US', 'USD')
    expect(result).toBe('$9,876,543,210')
  })

  test('rounds down decimal values', () => {
    const result = stringToCurrency('1234.5678')
    expect(result).toBe('Rp 1.235')
  })
})

describe('pairCodeSeparator', () => {
  test('splits a pair code into an array of two uppercase codes', () => {
    const result = pairCodeSeparator('usd/eur')
    expect(result).toEqual(['USD', 'EUR'])
  })

  test('handles uppercase pair codes', () => {
    const result = pairCodeSeparator('BTC/ETH')
    expect(result).toEqual(['BTC', 'ETH'])
  })

  test('handles single-letter pair codes', () => {
    const result = pairCodeSeparator('x/y')
    expect(result).toEqual(['X', 'Y'])
  })
})

describe('serializeQueryParams', () => {
  it('serializes query parameters correctly', () => {
    const params = {
      param1: 'value1',
      param2: 123,
      param3: true,
      param4: null,
      param5: undefined,
    }
    const result = serializeQueryParams(params)
    expect(result).toBe('param1=value1&param2=123&param3=true')
  })

  it('handles special characters in parameter values', () => {
    const params = {
      param1: 'Hello, World!',
      param2: 'foo&bar',
      param3: 'space in value',
    }
    const result = serializeQueryParams(params)
    expect(result).toBe(
      'param1=Hello%2C%20World!&param2=foo%26bar&param3=space%20in%20value'
    )
  })

  it('returns an empty string for empty parameters', () => {
    const params = {}
    const result = serializeQueryParams(params)
    expect(result).toBe('')
  })
})
