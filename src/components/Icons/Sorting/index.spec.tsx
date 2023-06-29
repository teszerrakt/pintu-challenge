import { render, screen } from '@testing-library/react'
import Sorting from 'src/components/Icons/Sorting'

jest.mock('src/components/Icons/Chevron', () => {
  return function MockChevron(props: any) {
    return (
      <div
        data-testid={`${props.direction}-chevron`}
        style={{ color: props.color }}
      >
        Mocked Chevron
      </div>
    )
  }
})

describe('Sorting', () => {
  it('renders Sorting component with correct chevron colors', () => {
    render(<Sorting type="asc" />)

    const upChevron = screen.getByTestId('up-chevron')
    const downChevron = screen.getByTestId('down-chevron')

    expect(upChevron).toHaveStyle('color: #000000')
    expect(downChevron).toHaveStyle('color: #94A3B8')
  })

  it('renders Sorting component with "desc" props', () => {
    render(<Sorting type="desc" />)

    const upChevron = screen.getByTestId('up-chevron')
    const downChevron = screen.getByTestId('down-chevron')

    expect(upChevron).toHaveStyle('color: #94A3B8')
    expect(downChevron).toHaveStyle('color: #000000')
  })
})
