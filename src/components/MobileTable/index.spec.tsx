import { render, screen, fireEvent } from '@testing-library/react'
import { MOCK_LATEST_PRICE_DATA } from 'src/__mocks__/latest-price'
import MobileTable from 'src/components/MobileTable'

jest.mock('src/components/Icons/Logo')

const mockData = MOCK_LATEST_PRICE_DATA

describe('MobileTable', () => {
  it('renders the table rows correctly', () => {
    render(<MobileTable data={mockData} />)

    const rowElements = screen.getAllByRole('link')
    expect(rowElements.length).toBe(mockData.length)

    const firstRow = rowElements[0]
    expect(firstRow).toMatchSnapshot()
  })

  it('updates the table rows when the filter is changed', () => {
    render(<MobileTable data={mockData} />)

    const selectedFilterOption = screen.getByDisplayValue('24 JAM')

    const initialRowElements = screen.getAllByRole('link')
    expect(initialRowElements.length).toBe(mockData.length)

    fireEvent.change(selectedFilterOption, { target: { value: 'week' } })

    expect(selectedFilterOption).toHaveTextContent('1 MGG')

    const updatedRowElements = screen.getAllByRole('link')
    expect(updatedRowElements.length).toBe(mockData.length)

    const firstRow = updatedRowElements[0]
    expect(firstRow).toHaveTextContent('Bitcoin')
    expect(firstRow).toHaveTextContent('BTC')
  })
})
