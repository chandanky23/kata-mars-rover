import { Command, Directions } from './index'

export const getNewDirection = (
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

export const getNewCoordinates = (
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

export const checkIfAnObstacle = (
  coordinates: number[],
  obstacles: number[][]
): boolean => {
  for (let i = 0; i < obstacles.length; i++) {
    if (coordinates.toString() === obstacles[i].toString()) {
      return true
    }
  }
  return false
}