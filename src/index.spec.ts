import Rover from './index'

describe("Initialise the Rover with [2,3] and direction 'NORTH'", () => {
  const marsRover = new Rover([2,3], 'NORTH') 
it("should be starting with coordinate [2,3]", () => {
    expect(marsRover.getCoordinates()).toEqual([2,3])
  })

  it("should be starting with direction 'NORTH'", () => {
    expect(marsRover.getDirection()).toEqual('NORTH')
  })
})

describe("Validation of commands", () => {
  const marsRover = new Rover([2,3], 'NORTH')
  it("throw no error message if valid", () => {
    expect(marsRover.validateCommand('FFBL')).toBeTruthy()
  })
  it("throw error message if not valid", () => {
    expect(marsRover.validateCommand('FBTDD')).toBeFalsy()
  })
})

describe("Rotation", () => {
  it('should turn LEFT if command is "L"', () => {
    const marsRover = new Rover([2,3], 'NORTH')
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
    const marsRover = new Rover([2,3], 'NORTH')
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
    const marsRover = new Rover([2,3], 'NORTH')
    marsRover.move('F')
    expect(marsRover.getDirection()).toEqual('NORTH')
    marsRover.move('B')
    expect(marsRover.getDirection()).toEqual('NORTH')
  })
})

describe("Move the Rover", () => { 
  it('Move the rover 1 unit Forward', () => {
    const marsRover = new Rover([2,3], 'NORTH')
    marsRover.move('F')
    expect(marsRover.getCoordinates()).toEqual([2,4])
  })
  it('Move the rover 1 unit Forward and then 1 unit Backward', () => {
    const marsRover = new Rover([2,3], 'NORTH')
    marsRover.move('F')
    expect(marsRover.getCoordinates()).toEqual([2,4])
    marsRover.move('B')
    expect(marsRover.getCoordinates()).toEqual([2,3])
  })

  it('does not move if the command string is any of "L" or "R"', () => {
    const marsRover = new Rover([2,3], 'NORTH')
    marsRover.move('L')
    expect(marsRover.getCoordinates()).toEqual([2,3])
  })
})