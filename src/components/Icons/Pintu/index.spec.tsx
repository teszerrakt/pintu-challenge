import { render } from '@testing-library/react'
import PintuIcon from 'src/components/Icons/Pintu'

describe('PintuIcon', () => {
  it('renders with default props', () => {
    const { container } = render(<PintuIcon />)
    const svgElement = container.querySelector('svg')

    expect(svgElement).toBeInTheDocument()
  })
})
