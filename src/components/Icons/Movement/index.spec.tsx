import { render, screen } from '@testing-library/react'
import Movement from 'src/components/Icons/Movement'

describe('Movement', () => {
  it('renders the up arrow icon when direction is "up"', () => {
    render(<Movement />)
    const iconElement = screen.getByText('▲')
    expect(iconElement).toBeInTheDocument()
  })

  it('renders the down arrow icon when direction is "down"', () => {
    render(<Movement direction="down" />)
    const iconElement = screen.getByText('▼')
    expect(iconElement).toBeInTheDocument()
  })

  it('renders no icon when direction is "stagnant"', () => {
    render(<Movement direction="stagnant" />)
    const iconElement = screen.queryByTestId('movement-icon')
    expect(iconElement).toBeNull()
  })
})
