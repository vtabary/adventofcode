import {
  getCharValue,
  getEpsilon,
  getGamma,
  parseLine,
  getScores,
  filterLines,
  getOxygen,
  getCO2,
  getLevel,
} from './utils';

describe('getCharValue', () => {
  it('should support an empty string', () => {
    expect(getCharValue('')).toEqual(0);
  });

  it('should support an invalid char', () => {
    expect(getCharValue('a')).toEqual(0);
  });

  it('should return a negative value for a 0', () => {
    expect(getCharValue('0')).toEqual(-1);
  });

  it('should return a positive value for a 1', () => {
    expect(getCharValue('1')).toEqual(1);
  });
});

describe('parseLine', () => {
  it('should not change the state for an empty line', () => {
    expect(parseLine('', [0, 1, 2])).toEqual([0, 1, 2]);
  });

  it('should update the score only for the matching positions', () => {
    expect(parseLine('01', [0, 1, 2])).toEqual([-1, 2, 2]);
  });

  it('should ignore an invalid line', () => {
    expect(parseLine('abcd', [0, 1, 2])).toEqual([0, 1, 2]);
  });
});

describe('getScores', () => {
  it('should support an empty array', () => {
    expect(getScores([])).toEqual([]);
  });

  it('should return the score for each column', () => {
    expect(getScores(['0101', '0110', '0111'])).toEqual([-3, 3, 1, 1]);
  });

  it('should ignore extra character when the current line is longer than the first one', () => {
    expect(getScores(['0101', '01101', '01111'])).toEqual([-3, 3, 1, 1]);
  });
});

describe('getGamma', () => {
  it('should support an empty array of data', () => {
    expect(getGamma([])).toEqual(0);
  });

  it('should get the greater numbers to gamma', () => {
    // Should result to gamma: 010 and epsilon: 101
    expect(getGamma([-50, 50, -50])).toEqual(2);
  });
});

describe('getEpsilon', () => {
  it('should support an empty array of data', () => {
    expect(getEpsilon([])).toEqual(0);
  });

  it('should get the lower numbers to epsilon', () => {
    // Should result to gamma: 010 and epsilon: 101
    expect(getEpsilon([-50, 50, -50])).toEqual(5);
  });
});

describe('filterLines', () => {
  it('should support an empty array of data', () => {
    expect(filterLines([], 0, true)).toEqual([]);
  });

  it('should get the lines based on the most common value', () => {
    // Should result to gamma: 010 and epsilon: 101
    expect(filterLines(['111', '010', '000'], 0, true)).toEqual(['010', '000']);
  });

  it('should get the lines based on the less common value', () => {
    // Should result to gamma: 010 and epsilon: 101
    expect(filterLines(['111', '010', '000'], 0, false)).toEqual(['111']);
  });

  it('should use the given index', () => {
    // Should result to gamma: 010 and epsilon: 101
    expect(filterLines(['111', '010', '000'], 1, true)).toEqual(['111', '010']);
  });

  it('should use the value 1 when there is an equality', () => {
    // Should result to gamma: 010 and epsilon: 101
    expect(filterLines(['111', '010', '000', '100'], 0, true)).toEqual([
      '111',
      '100',
    ]);
  });
});

describe('getLevel', () => {
  it('should support an empty array', () => {
    expect(getLevel([], true)).toEqual(0);
  });

  it('should get the number based on the most common value', () => {
    expect(getLevel(['010', '111', '000'], true)).toEqual(2);
  });

  it('should get the number based on the less common value', () => {
    expect(getLevel(['010', '111', '000'], false)).toEqual(7);
  });
});

describe('getOxygen', () => {
  it('should support an empty array', () => {
    expect(getOxygen([])).toEqual(0);
  });

  it('should get the number', () => {
    expect(getOxygen(['010', '111', '000'])).toEqual(2);
  });
});

describe('getCO2', () => {
  it('should support an empty array', () => {
    expect(getCO2([])).toEqual(0);
  });

  it('should get the number', () => {
    expect(getCO2(['010', '111', '000'])).toEqual(7);
  });
});
