interface IMovementProps {
  direction?: 'up' | 'down' | 'stagnant'
}

const MAP_ICON = {
  up: '▲',
  down: '▼',
  stagnant: '🟰',
}

function Movement({ direction = 'up' }: IMovementProps) {
  return <div>{MAP_ICON[direction]}</div>
}

export default Movement
