import { render } from '@testing-library/react'
import Chevron from 'src/components/Icons/Chevron'

describe('Chevron', () => {
  it('renders with default props', () => {
    const { container } = render(<Chevron />)
    const svgElement = container.querySelector('svg')

    expect(svgElement).toBeInTheDocument()
    expect(svgElement).toHaveAttribute('color', '#929396')
    expect(svgElement).toHaveStyle('transform: rotate(0deg)')

    const pathElement = container.querySelector('path')

    expect(pathElement).toBeInTheDocument()
    expect(pathElement).toHaveAttribute('fill', '#929396')
  })

  it('renders with custom props', () => {
    const { container } = render(<Chevron color="red" direction="down" />)
    const svgElement = container.querySelector('svg')

    expect(svgElement).toHaveAttribute('color', 'red')
    expect(svgElement).toHaveStyle('transform: rotate(180deg)')
  })
})
