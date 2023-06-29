import { render, screen, fireEvent } from '@testing-library/react'
import Dropdown from 'src/components/Dropdown'

describe('Dropdown', () => {
  const options = [
    { key: 'option1', value: 'Option 1' },
    { key: 'option2', value: 'Option 2' },
    { key: 'option3', value: 'Option 3' },
  ]
  const initialValue = 'option2'
  let selectedValue = ''

  const handleChange = (value: string) => {
    selectedValue = value
  }

  beforeEach(() => {
    render(
      <Dropdown
        options={options}
        initialValue={initialValue}
        onChange={handleChange}
      />
    )
  })

  it('renders with initial value and options', () => {
    const dropdown = screen.getByRole('combobox')

    expect(dropdown).toBeInTheDocument()
    expect(dropdown).toHaveValue(initialValue)

    options.forEach((option) => {
      const { key, value } = option
      const optionElement = screen.getByText(value)

      expect(optionElement).toBeInTheDocument()
      expect(optionElement).toHaveValue(key)
    })
  })

  it('calls onChange handler with selected value', () => {
    const dropdown = screen.getByRole('combobox')

    fireEvent.change(dropdown, { target: { value: 'option3' } })

    expect(selectedValue).toBe('option3')
  })
})
