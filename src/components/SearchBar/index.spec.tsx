import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  SearchButton,
  SearchInput,
  Suggestion,
  SuggestionItem,
} from 'src/components/SearchBar'
import { MOCK_LATEST_PRICE_DATA } from 'src/__mocks__/latest-price'

jest.mock('src/components/Icons/Logo')

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
