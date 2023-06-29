import { render, screen } from '@testing-library/react'
import Search from 'src/components/Icons/Search'

describe('Search', () => {
  it('renders the search icon', () => {
    const { container } = render(<Search />)
    const svgElement = container.querySelector('svg')

    expect(svgElement).toBeInTheDocument()
  })
})
