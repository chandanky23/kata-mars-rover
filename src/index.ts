type Directions = "NORTH" | "SOUTH" | "EAST" | "WEST"
export type Command = "L" | "R" | "B" | "F"
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
    if (["F", "B"].includes(command)) {
      this.coordinates = getNewCoordinates(
        this.coordinates,
        command,
        this.direction
      )
    }
    if (["R", "L"].includes(command)) {
      this.direction = getNewDirection(this.direction, command)
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
  direction: Directions
): number[] => {
  let [x,y] = initialCoordinates
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
  return [x, y]
}
