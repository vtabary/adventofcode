import { getPosition, getPositionAndAim, readLine } from './utils';

describe('readLine', () => {
  it('should support an empty string', () => {
    expect(readLine('')).toBeUndefined();
  });

  it('should support an invalid direction', () => {
    expect(readLine('other 12')).toBeUndefined();
  });

  it('should support an invalid distance', () => {
    expect(readLine('up other')).toBeUndefined();
  });

  it('should return the direction: UP', () => {
    expect(readLine('up 12')).toEqual({ direction: 'up', distance: 12 });
  });

  it('should return the direction: DOWN', () => {
    expect(readLine('down 12')).toEqual({ direction: 'down', distance: 12 });
  });

  it('should return the direction: FORWARD', () => {
    expect(readLine('forward 12')).toEqual({
      direction: 'forward',
      distance: 12,
    });
  });
});

describe('getPosition', () => {
  it('should support an empty array of data', () => {
    expect(getPosition([])).toEqual({ horizontal: 0, depth: 0 });
  });

  it('should support sums all directions', () => {
    expect(
      getPosition([
        {
          direction: 'up',
          distance: 5,
        },
        {
          direction: 'down',
          distance: 10,
        },
        {
          direction: 'forward',
          distance: 2,
        },
      ])
    ).toEqual({ horizontal: 2, depth: 5 });
  });
});

describe('getPositionAndAim', () => {
  it('should support an empty array of data', () => {
    expect(getPositionAndAim([])).toEqual({ horizontal: 0, depth: 0, aim: 0 });
  });

  it('should support sums all directions', () => {
    expect(
      getPositionAndAim([
        {
          direction: 'up',
          distance: 5,
        },
        {
          direction: 'down',
          distance: 10,
        },
        {
          direction: 'forward',
          distance: 2,
        },
      ])
    ).toEqual({ horizontal: 2, depth: 10, aim: 5 });
  });
});
