import { render } from '@testing-library/react'
import Close from 'src/components/Icons/Close'

describe('Close', () => {
  it('renders correctly', () => {
    const { container } = render(<Close />)
    const svgElement = container.querySelector('svg')

    expect(svgElement).toBeInTheDocument()
  })
})
