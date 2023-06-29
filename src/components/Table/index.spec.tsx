import { render, screen } from '@testing-library/react'
import { MOCK_LATEST_PRICE_DATA } from 'src/__mocks__/latest-price'
import Table from 'src/components/Table'

jest.mock('src/components/Icons/Logo')

const mockData = MOCK_LATEST_PRICE_DATA

describe('Table', () => {
  it('renders the table header correctly', () => {
    render(<Table data={mockData} />)

    // Assert the presence of the table headers
    const headerElements = screen.getAllByRole('columnheader')
    expect(headerElements.length).toBe(6)
    expect(headerElements[0]).toHaveTextContent('CRYPTO')
    expect(headerElements[1]).toHaveTextContent('HARGA')
    expect(headerElements[2]).toHaveTextContent('24 JAM')
    expect(headerElements[3]).toHaveTextContent('1 MGG')
    expect(headerElements[4]).toHaveTextContent('1 BLN')
    expect(headerElements[5]).toHaveTextContent('1 THN')
  })

  it('renders the table rows correctly', () => {
    render(<Table data={mockData} />)

    const rowElements = screen.getAllByRole('row')
    expect(rowElements.length).toBe(mockData.length + 1) // +1 for the header row

    const firstRow = rowElements[1]
    expect(firstRow).toMatchSnapshot()
  })
})
