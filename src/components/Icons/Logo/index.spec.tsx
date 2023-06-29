import { render, screen } from '@testing-library/react'
import { useQuery } from 'react-query'
import Logo from 'src/components/Icons/Logo'

jest.mock('react-query')

describe('Logo', () => {
  const mockUseQuery = useQuery as jest.Mock

  beforeEach(() => {
    mockUseQuery.mockReturnValue({
      data: '<svg>Mocked Logo</svg>',
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders logo when data is available', () => {
    render(<Logo url="mock-url" color="red" />)

    const logoElement = screen.getByTestId('logo')

    expect(logoElement).toBeInTheDocument()
    expect(logoElement).toHaveStyle('color: red; width: 32px; height: 32px;')
    expect(logoElement.innerHTML).toMatchInlineSnapshot(`"<svg class="w-full h-full">Mocked Logo</svg>"`)
  })

  it('renders placeholder when data is not available', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
    })

    render(<Logo url="mock-url" color="red" width={16} height={16} />)

    const placeholderElement = screen.getByTestId('logo-fallback')

    expect(placeholderElement).toBeInTheDocument()
    expect(placeholderElement).toHaveStyle(
      'background-color: red; width: 16px; height: 16px;'
    )
  })
})
