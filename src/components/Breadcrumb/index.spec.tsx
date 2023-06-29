import { render, screen } from '@testing-library/react'
import Breadcrumb from 'src/components/Breadcrumb'

describe('Breadcrumb', () => {
  const items = [
    { name: 'Home', href: '/' },
    { name: 'Category', href: '/category' },
    { name: 'Product' },
  ]

  it('renders correctly with items', () => {
    render(<Breadcrumb items={items} />)

    const breadcrumbItems = screen.getAllByTestId('breadcrumb-item')
    const breadcrumbSeparators = screen.getAllByTestId('breadcrumb-separator')

    expect(breadcrumbItems).toHaveLength(items.length)
    expect(breadcrumbSeparators).toHaveLength(items.length - 1)
    expect(breadcrumbSeparators[0].textContent).toBe('>')
  })

  it('renders custom separator', () => {
    const items = [
      { name: 'Home', href: '/' },
      { name: 'Category', href: '/category' },
      { name: 'Product' },
    ]
    const separator = '🐟'

    render(<Breadcrumb items={items} separator={separator} />)

    const breadcrumbSeparators = screen.getAllByTestId('breadcrumb-separator')

    expect(breadcrumbSeparators[0].textContent).toBe(separator)
  })
})
