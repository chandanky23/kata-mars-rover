import Rover, { Command } from './index'

describe("Initialise the Rover with [2,3] and direction 'NORTH'", () => {
  const marsRover = new Rover([2,3], 'NORTH', [10,10], [[1,4], [3,5], [7,4]]) 
it("should be starting with coordinate [2,3]", () => {
    expect(marsRover.getCoordinates()).toEqual([2,3])
  })

  it("should be starting with direction 'NORTH'", () => {
    expect(marsRover.getDirection()).toEqual('NORTH')
  })
})

describe("Validation of commands", () => {
  const marsRover = new Rover([2,3], 'NORTH', [10,10], [[1,4], [3,5], [7,4]])
  it("throw no error message if valid", () => {
    expect(marsRover.validateCommand('FFBL')).toBeTruthy()
  })
  it("throw error message if not valid", () => {
    expect(marsRover.validateCommand('FBTDD')).toBeFalsy()
  })
})

describe("Rotation", () => {
  it('should turn LEFT if command is "L"', () => {
    const marsRover = new Rover([2,3], 'NORTH', [10,10], [[1,4], [3,5], [7,4]])
    marsRover.move('L')
    expect(marsRover.getDirection()).toEqual('WEST')
    marsRover.move('L')
    expect(marsRover.getDirection()).toEqual('SOUTH')
    marsRover.move('L')
    expect(marsRover.getDirection()).toEqual('EAST')
    marsRover.move('L')
    expect(marsRover.getDirection()).toEqual('NORTH')
  })
  it('should turn RIGHT if command is "R"', () => {
    const marsRover = new Rover([2,3], 'NORTH', [10,10], [[1,4], [3,5], [7,4]])
    marsRover.move('R')
    expect(marsRover.getDirection()).toEqual('EAST')
    marsRover.move('R')
    expect(marsRover.getDirection()).toEqual('SOUTH')
    marsRover.move('R')
    expect(marsRover.getDirection()).toEqual('WEST')
    marsRover.move('R')
    expect(marsRover.getDirection()).toEqual('NORTH')
  })
  it('should not turn at all if command is "F" or "B"', () => {
    const marsRover = new Rover([2,3], 'NORTH', [10,10], [[1,4], [3,5], [7,4]])
    marsRover.move('F')
    expect(marsRover.getDirection()).toEqual('NORTH')
    marsRover.move('B')
    expect(marsRover.getDirection()).toEqual('NORTH')
  })
})

describe("Move the Rover", () => { 
  it('Move the rover 1 unit Forward', () => {
    const marsRover = new Rover([2,3], 'NORTH', [10,10], [[1,4], [3,5], [7,4]])
    marsRover.move('F')
    expect(marsRover.getCoordinates()).toEqual([2,4])
  })
  it('Move the rover 1 unit Forward and then 1 unit Backward', () => {
    const marsRover = new Rover([2,3], 'NORTH', [10,10], [[1,4], [3,5], [7,4]])
    marsRover.move('F')
    expect(marsRover.getCoordinates()).toEqual([2,4])
    marsRover.move('B')
    expect(marsRover.getCoordinates()).toEqual([2,3])
  })
  it('does not move if the command string is any of "L" or "R"', () => {
    const marsRover = new Rover([2,3], 'NORTH', [10,10], [[1,4], [3,5], [7,4]])
    marsRover.move('L')
    expect(marsRover.getCoordinates()).toEqual([2,3])
  })
  it('Test the rover with a command string "FLFFFRFLB"', () => {
    const marsRover = new Rover([4,2], 'EAST',  [10,10], [[1,4], [3,5], [7,4]])
    const command = 'FLFFFRFLB'
    for(let i=0; i < command.length; i++) {
      marsRover.move(command[i] as Command)
    }
    expect(marsRover.getCoordinates()).toEqual([6,4])
    expect(marsRover.getDirection()).toEqual('NORTH')
  })
})

describe("Test the Rover at the end of a Grid", () => {
  it("Initialise the grid of Mars", () => {
    const marsRover = new Rover([4,2], 'NORTH', [10,10], [[1,4], [3,5], [7,4]])
    expect(marsRover.getGrid()).toEqual([10,10])
  })
  it("Move the rover to 0 index in Y axis Mars", () => {
    const marsRover = new Rover([4,9], 'NORTH', [10,10], [[1,4], [3,5], [7,4]])
    marsRover.move('F')
    expect(marsRover.getCoordinates()).toEqual([4,0])
  })
  it("Move the rover at the end of one of the quadrant, it restarts from base index", () => {
    const marsRover = new Rover([-9,6], 'WEST', [10,10], [[1,4], [3,5], [7,4]])
    marsRover.move('F')
    expect(marsRover.getCoordinates()).toEqual([0,6])
    marsRover.move('R')
    expect(marsRover.getCoordinates()).toEqual([0,6])
    expect(marsRover.getDirection()).toEqual('NORTH')
    marsRover.move('F')
    expect(marsRover.getCoordinates()).toEqual([0,7])
    marsRover.move('F')
    expect(marsRover.getCoordinates()).toEqual([0,8])
    marsRover.move('F')
    expect(marsRover.getCoordinates()).toEqual([0,9])
    marsRover.move('F')
    expect(marsRover.getCoordinates()).toEqual([0,0])
  })
})

describe("Test for obstacles", () => {
  it("List the known obstacles on Mars", () => {
    const marsRover = new Rover([4,2], 'NORTH', [10,10], [[1,4], [3,5], [7,4]])
    expect(marsRover.getObstacles()).toEqual([[1,4], [3,5], [7,4]])
  })

  it("Report status as MOVING if no obstacles met", () => {
    const marsRover = new Rover([4,2], 'NORTH', [10,10], [])
    marsRover.move('F')
    marsRover.move('L')
    marsRover.move('F')
    marsRover.move('B')
    expect(marsRover.getRoverStatus()).toEqual('MOVING')
  })

  it("Rover meets an obstacle, stops at previous position and reports", () => {
    const marsRover = new Rover([3,0], 'NORTH', [10,10], [[3,2],[4,3]])
    marsRover.move('F')
    marsRover.move('R')
    marsRover.move('F')
    marsRover.move('L')
    marsRover.move('F')
    marsRover.move('F')
    expect(marsRover.getRoverStatus()).toEqual('STOPPED')
    expect(marsRover.getCoordinates()).toEqual([4,2])
    expect(marsRover.getDirection()).toEqual('NORTH')
  })
})

describe("Escape the obstaclec to reach destination", () => {
  it("Get the destination of the Rover", () => {
    const marsRover = new Rover([3,0], 'NORTH', [10,10], [[3,2],[4,3]])
    marsRover.setDestination([4,5])
    expect(marsRover.getDestination()).toEqual([4,5])
  })
})