import { getNewCoordinates, getNewDirection, checkIfAnObstacle } from './helper'

export type Directions = "NORTH" | "SOUTH" | "EAST" | "WEST"
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
    if (!this.destination.length) {
      return "Destination cannot be empty"
    }

    let route: string = ""

    while (this.coordinates[0] !== this.destination[0]) {
      if (["NORTH", "SOUTH"].includes(this.direction)) {
        if (this.coordinates[0] < this.destination[0]) {
          route += this.direction === "NORTH" ? "R" : "L"
          this.move(this.direction === "NORTH" ? "R" : "L")
        } else if (this.coordinates[0] > this.destination[0]) {
          route += this.direction === "NORTH" ? "L" : "R"
          this.move(this.direction === "NORTH" ? "L" : "R")
        }
      }
      this.move("F")
      route += this.jumpObstacle()
    }

    while (this.coordinates[1] !== this.destination[1]) {
      if (["EAST", "WEST"].includes(this.direction)) {
        if (this.coordinates[1] < this.destination[1]) {
          route += this.direction === "EAST" ? "L" : "R"
          this.move(this.direction === "EAST" ? "L" : "R")
        } else if (this.coordinates[1] > this.destination[1]) {
          route += this.direction === "EAST" ? "R" : "L"
          this.move(this.direction === "EAST" ? "R" : "L")
        }
      }
      this.move("F")
      route += this.jumpObstacle()
    }
    return route
  }

  // For every obstacle there will be a sequence LFRFFRFL,
  // turn left and move 1 unit forward, turn right and move 2 units forward, turn right and move 1 unit forward
  // Finally turn Left to return back to trajectory if not destination
  jumpObstacle() {
    const jumpOverObstacle = "LFRFFRF"
    let route: string = ''
    if (this.roverStatus === ROVER_STATUS.STOPPED) {
      for (let i = 0; i < jumpOverObstacle.length; i++) {
        this.move(jumpOverObstacle[i] as Command)
        route += jumpOverObstacle[i]
      }
    } else {
      route += "F"
    }
    return route
  }
}

export default Rover

