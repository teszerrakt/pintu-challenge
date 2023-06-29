import React from 'react'
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react'
import SearchBar, {
  SearchButton,
  SearchInput,
  Suggestion,
  SuggestionItem,
} from 'src/components/SearchBar'
import { MOCK_LATEST_PRICE_DATA } from 'src/__mocks__/latest-price'
import { useQuery } from 'react-query'

jest.mock('react-query')
jest.mock('src/components/Header')
jest.mock('src/components/Icons/Logo')

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('SearchButton', () => {
  const mockClick = jest.fn()
  it('renders the search button', () => {
    render(<SearchButton onClick={mockClick} />)

    const mobileSearch = screen.getByTestId('mobile-search-button')
    const desktopSearch = screen.getByTestId('desktop-search-button')

    expect(mobileSearch).toBeInTheDocument()
    expect(desktopSearch).toBeInTheDocument()

    mobileSearch.click()
    desktopSearch.click()

    expect(mockClick).toBeCalledTimes(2)
  })
})

describe('SearchInput', () => {
  const mockClose = jest.fn()
  const mockChange = jest.fn()

  it('displays the search input', () => {
    const { container } = render(
      <SearchInput value="testing" onChange={mockChange} onClose={mockClose} />
    )

    const searchInput = container.querySelector('input') as HTMLInputElement
    expect(searchInput).toBeInTheDocument()
    expect(searchInput.value).toBe('testing')
  })

  it('trigger onChange event', () => {
    const { container } = render(
      <SearchInput value="testing" onChange={mockChange} onClose={mockClose} />
    )

    const searchInput = container.querySelector('input') as HTMLInputElement

    fireEvent.change(searchInput, {
      target: {
        value: 'hola',
      },
    })

    expect(mockChange).toBeCalledWith('hola')
  })

  it('trigger onClose event', () => {
    render(
      <SearchInput value="testing" onChange={mockChange} onClose={mockClose} />
    )

    fireEvent.click(screen.getByTestId('close-icon'))
    expect(mockClose).toHaveBeenCalled()
  })
})

describe('SuggestionItem', () => {
  it('renders the suggestion item', () => {
    const suggestion = {
      code: 'BTC',
      name: 'Bitcoin',
      logo: {
        url: 'https://example.com/bitcoin.png',
        color: '#FF0000',
      },
    }

    const { container } = render(
      <SuggestionItem
        code={suggestion.code}
        name={suggestion.name}
        logo={suggestion.logo}
      />
    )

    const link = container.querySelector('a')

    expect(link).toBeInTheDocument()
    expect(link?.href).toContain('/market/BTC')
  })
})

describe('Suggestion', () => {
  it('displays the suggestion list', () => {
    const data = MOCK_LATEST_PRICE_DATA

    render(<Suggestion data={data} query="" showErrorText={false} />)

    data.forEach((item) => {
      expect(screen.getByText(item.currency.name)).toBeInTheDocument()
      expect(screen.getByText(item.currency.currencySymbol)).toBeInTheDocument()
    })
  })

  it('displays the error text when no suggestions are found', () => {
    render(<Suggestion data={[]} query="Nonexistent" showErrorText={true} />)

    const errorText = screen.getByText(/"Nonexistent" Tidak Ditemukan/i)
    expect(errorText).toBeInTheDocument()
  })
})

describe('SearchBar', () => {
  const mockUseQuery = useQuery as jest.Mock

  it('renders the search bar and handles search input', async () => {
    mockUseQuery.mockReturnValue({ data: null })

    render(<SearchBar />)

    act(() => {
      screen.getByTestId('desktop-search-button').click()
    })

    const searchInput = screen.getByTestId('search-input')

    expect(searchInput).toBeInTheDocument()

    fireEvent.change(searchInput, {
      target: {
        value: 'hola',
      },
    })

    expect(searchInput).toHaveValue('hola')
  })

  it('renders the search bar and close it', async () => {
    mockUseQuery.mockReturnValue({ data: [] })

    render(<SearchBar />)

    act(() => {
      screen.getByTestId('desktop-search-button').click()
    })

    expect(screen.getByTestId('search-input')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('close-icon'))

    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument()
  })

  it('renders filtered suggestion', async () => {
    Object.defineProperty(window, 'location', {
      value: {
        href: '',
      },
      writable: true,
    })

    mockUseQuery.mockReturnValue({ data: MOCK_LATEST_PRICE_DATA })

    const { container } = render(<SearchBar />)

    act(() => {
      screen.getByTestId('desktop-search-button').click()
    })

    const searchInput = screen.getByTestId('search-input')

    expect(searchInput).toBeInTheDocument()

    fireEvent.change(searchInput, {
      target: {
        value: 'btc',
      },
    })

    const link = container.querySelectorAll('a')
    expect(link).toHaveLength(1)
  })
})
