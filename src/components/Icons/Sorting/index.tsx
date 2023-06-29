import Chevron from 'src/components/Icons/Chevron'

interface ISortingProps {
  type?: 'asc' | 'desc'
}

const COLORS = {
  gray: '#94A3B8',
  black: '#000000',
}

function Sorting({ type }: ISortingProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Chevron
        data-testid="up-chevron"
        direction="up"
        color={type === 'asc' ? COLORS.black : COLORS.gray}
      />
      <Chevron
        data-testid="down-chevron"
        direction="down"
        color={type === 'desc' ? COLORS.black : COLORS.gray}
      />
    </div>
  )
}

export default Sorting
