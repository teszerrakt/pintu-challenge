import Movement from 'src/components/Icons/Movement'

interface IPercentageProps {
  value: string
}

export const MAP_COLOR = {
  up: 'text-green-600',
  down: 'text-red-600',
  stagnant: 'text-black',
}

function Percentage({ value }: IPercentageProps) {
  const getDirection = () => {
    if (Number(value) === 0) return 'stagnant'
    if (value.includes('-')) return 'down'
    return 'up'
  }

  const direction = getDirection()
  const formattedValue = value.replace('-', '')

  return (
    <div
      className={`flex gap-[5px] ${MAP_COLOR[direction]} justify-end md:justify-start`}
    >
      <Movement direction={direction} />
      <p className="font-semibold">{formattedValue}%</p>
    </div>
  )
}

export default Percentage
