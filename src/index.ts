type Directions = "NORTH" | "SOUTH" | "EAST" | "WEST"
export type Command = "L" | "R" | "B" | "F"

enum ROVER_STATUS {
  MOVING = "MOVING",
  STOPPED = "STOPPED",
}

class Rover {
  coordinates: number[]
  direction: Directions
  grid: number[]
  obstacles: number[][]
  roverStatus: ROVER_STATUS
  destination: number[]

  constructor(
    coordinates: number[],
    direction: Directions,
    grid: number[],
    obstacles: number[][]
  ) {
    this.coordinates = coordinates
    this.direction = direction
    this.grid = grid
    this.obstacles = obstacles
    this.roverStatus = ROVER_STATUS.MOVING
    this.destination = []
  }

  setDestination(destination: number[]) {
    this.destination = destination
  }

  getDestination() {
    return this.destination
  }

  getCoordinates() {
    return this.coordinates
  }

  getDirection() {
    return this.direction
  }

  getGrid() {
    return this.grid
  }

  getObstacles() {
    return this.obstacles
  }

  getRoverStatus() {
    return this.roverStatus
  }

  validateCommand(command: string) {
    return /^[FBLR]*$/.test(command)
  }

  move(command: Command) {
    if (["F", "B"].includes(command)) {
      const updatedCoordinates = getNewCoordinates(
        this.coordinates,
        command,
        this.direction,
        this.grid
      )
      if (checkIfAnObstacle(updatedCoordinates, this.obstacles)) {
        this.roverStatus = ROVER_STATUS.STOPPED
      } else {
        this.coordinates = updatedCoordinates
      }
    }
    if (["R", "L"].includes(command)) {
      this.direction = getNewDirection(this.direction, command)
    }
  }

  getCommandStringToReachDestination() {
    if(!this.destination.length) {
      return 'Destination cannot be empty'
    }
  }
}

export default Rover

const getNewDirection = (
  initialDirection: Directions,
  command: Command
): Directions => {
  switch (initialDirection) {
    case "NORTH":
      return command === "L" ? "WEST" : "EAST"
    case "WEST":
      return command === "L" ? "SOUTH" : "NORTH"
    case "SOUTH":
      return command === "L" ? "EAST" : "WEST"
    case "EAST":
      return command === "L" ? "NORTH" : "SOUTH"
  }
}

const getNewCoordinates = (
  initialCoordinates: number[],
  command: Command,
  direction: Directions,
  grid: number[]
): number[] => {
  let [x, y] = initialCoordinates
  switch (direction) {
    case "NORTH":
      command === "F" ? ++y : --y
      break
    case "WEST":
      command === "F" ? --x : ++x
      break
    case "SOUTH":
      command === "F" ? --y : ++y
      break
    case "EAST":
      command === "F" ? ++x : --x
      break
  }

  return calWRTEdgeOfMars([x, y], grid)
}

const calWRTEdgeOfMars = (coordinates: number[], grid: number[]): number[] => {
  if (Math.pow(coordinates[1], 2) === Math.pow(grid[1], 2)) {
    coordinates[1] = 0
  }
  if (Math.pow(coordinates[0], 2) === Math.pow(grid[0], 2)) {
    coordinates[0] = 0
  }

  return coordinates
}

const checkIfAnObstacle = (
  coordinates: number[],
  obstacles: number[][]
): boolean => {
  for(let i=0; i<obstacles.length; i++) {
    if(coordinates.toString() === obstacles[i].toString()) {
      return true
    }
  }
  return false
}
