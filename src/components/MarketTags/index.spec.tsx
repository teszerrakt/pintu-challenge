import { cleanup, render, screen } from '@testing-library/react'
import { useQuery } from 'react-query'
import MarketTags from 'src/components/MarketTags'

jest.mock('react-query')

describe('MarketTags', () => {
  const mockUseQuery = useQuery as jest.Mock

  beforeEach(() => {
    mockUseQuery.mockReturnValue({
      data: [
        { id: 1, title: 'Tag 1', slug: 'tag-1', icon: { url: 'tag-1.svg' } },
        { id: 2, title: 'Tag 2', slug: 'tag-2', icon: { url: 'tag-2.svg' } },
      ],
      isLoading: false,
      isError: false,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('renders market tags', () => {
    render(<MarketTags />)

    const tagElements = screen.getAllByRole('link', { name: /tag \d/i })

    expect(tagElements).toHaveLength(2)
    expect(tagElements[0]).toHaveAttribute('href', '/market/tags/tag-1')
    expect(tagElements[1]).toHaveAttribute('href', '/market/tags/tag-2')
  })
})
