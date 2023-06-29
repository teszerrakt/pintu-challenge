import { useState } from 'react'

interface IDropdownProps {
  options: {
    key: string
    value: string
  }[]
  initialValue: string
  onChange?: (value: string) => void
}

function Dropdown({ options, initialValue, onChange }: IDropdownProps) {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    setValue(selectedValue)

    if (onChange) {
      onChange(selectedValue)
    }
  }

  return (
    <select
      className="p-1 text-xs font-semibold border rounded-md"
      value={value}
      onChange={handleChange}
    >
      {options.map((item) => (
        <option key={item.key} value={item.key}>
          {item.value}
        </option>
      ))}
    </select>
  )
}

export default Dropdown
