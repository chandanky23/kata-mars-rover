type Directions = "NORTH" | "SOUTH" | "EAST" | "WEST"
type Command = "L" | "R" | "B" | "F"
class Rover {
  coordinates: number[]
  direction: Directions

  constructor(coordinates: number[], direction: Directions) {
    this.coordinates = coordinates
    this.direction = direction
  }

  getCoordinates() {
    return this.coordinates
  }

  getDirection() {
    return this.direction
  }

  validateCommand(command: string) {
    return /^[FBLR]*$/.test(command)
  }

  move(command: Command) {
    this.direction = getNewDirection(this.direction, command)
  }
}

export default Rover


const getNewDirection = (initialDirection: Directions, command: Command): Directions => {
  if(['F','B'].includes(command)) {
    return initialDirection
  }
  switch(initialDirection) {
    case 'NORTH':
      return command === 'L' ? 'WEST' : 'EAST'
    case 'WEST':
      return command === 'L' ? 'SOUTH' : 'NORTH'
    case 'SOUTH':
      return command === 'L' ? 'EAST' : 'WEST'
    case 'EAST':
      return command === 'L' ? 'NORTH' : 'SOUTH'
  }
}
