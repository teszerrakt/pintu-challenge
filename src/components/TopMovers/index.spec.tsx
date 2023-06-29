import { render, screen } from '@testing-library/react'
import { MOCK_LATEST_PRICE_DATA } from 'src/__mocks__/latest-price'
import TopMovers from 'src/components/TopMovers'

jest.mock('src/components/Icons/Logo')

const mockData = MOCK_LATEST_PRICE_DATA

describe('TopMovers', () => {
  it('renders the correct number of top mover cards', () => {
    render(<TopMovers data={mockData} limit={3} />)

    const headingElement = screen.getByText(/top movers/i)
    expect(headingElement).toBeInTheDocument()

    const moverCardElements = screen.getAllByTestId('top-mover-card')
    expect(moverCardElements.length).toBe(3)
  })
})
