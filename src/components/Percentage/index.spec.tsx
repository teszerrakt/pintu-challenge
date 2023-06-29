import { cleanup, render, screen } from '@testing-library/react'
import Percentage from 'src/components/Percentage'

describe('Percentage', () => {
  afterEach(cleanup)

  it('renders correctly with positive value', () => {
    render(<Percentage value="10" className="custom-class" />)

    const percentage = screen.getByTestId('percentage')

    expect(percentage).toHaveClass('text-green-600')
    expect(percentage).toHaveClass('custom-class')
    expect(screen.getByText('10%')).toBeInTheDocument()
  })

  it('renders correctly with negative value', () => {
    render(<Percentage value="-5" />)

    const percentage = screen.getByTestId('percentage')

    expect(percentage).toHaveClass('text-red-600')
    expect(screen.getByText('5%')).toBeInTheDocument()
  })

  it('renders correctly with zero value', () => {
    render(<Percentage value="0" />)

    const percentage = screen.getByTestId('percentage')

    expect(percentage).toHaveClass('text-black')
    expect(screen.getByText('0%')).toBeInTheDocument()
  })
})
