import { render } from '@testing-library/react'
import Header from 'src/components/Header'

describe('Header', () => {
  it('renders with default props', () => {
    const { container } = render(<Header />)
    const headerElement = container.querySelector('header')

    expect(headerElement).toBeInTheDocument()
  })
})
