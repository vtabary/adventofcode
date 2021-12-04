import {
  countDualIncrease,
  parseData,
  prepareTripleIncrease,
  sum,
} from './utils';

describe('parseData', () => {
  it('should support an empty array', () => {
    expect(parseData([])).toEqual([]);
  });

  it('should parse the numbers', () => {
    expect(parseData(['42', '145', '0'])).toEqual([42, 145, 0]);
  });

  it('should exclude invalid value', () => {
    expect(parseData(['42', 'abc'])).toEqual([42]);
  });
});

describe('countDualIncrease', () => {
  it('should support an empty array of data', () => {
    expect(countDualIncrease([])).toEqual(0);
  });

  it('should support a array with only one line of data', () => {
    expect(countDualIncrease([42])).toEqual(0);
  });

  it('should support return 0 when all data are decreasing', () => {
    expect(countDualIncrease([42, 41, 40, 39])).toEqual(0);
  });

  it('should support return 0 when all data are the same', () => {
    expect(countDualIncrease([42, 42, 42, 42])).toEqual(0);
  });

  it('should support return the length of the array minus 1 when all data are increasing', () => {
    expect(countDualIncrease([0, 1, 2, 3, 4])).toEqual(4);
  });

  it('should support return the number of data increasing', () => {
    expect(
      countDualIncrease([42, 40, 45, 39, 37, 37, 50, 45, 60, 70, 80])
    ).toEqual(5);
  });
});

describe('prepareTripleIncrease', () => {
  it('should support an empty array of data', () => {
    expect(prepareTripleIncrease([])).toEqual([]);
  });

  it('should support a array with only one line of data', () => {
    expect(prepareTripleIncrease([42])).toEqual([]);
  });

  it('should support a array with only two lines of data', () => {
    expect(prepareTripleIncrease([1, 2])).toEqual([]);
  });

  it('should support return the sum', () => {
    expect(prepareTripleIncrease([42, 41, 40, 39])).toEqual([123, 120]);
  });

  it('should support return the number of data increasing', () => {
    expect(
      prepareTripleIncrease([199, 200, 208, 210, 200, 207, 240, 269, 260, 263])
    ).toEqual([607, 618, 618, 617, 647, 716, 769, 792]);
  });
});

describe('sum', () => {
  it('should return 0 when the length is zero', () => {
    expect(sum([0, 1, 2, 3], 1, 0)).toEqual(0);
  });

  it('should return 0 when the bounds are below the array', () => {
    expect(sum([0, 1, 2, 3], -5, 3)).toEqual(0);
  });

  it('should return the matching part of the arraywhen the start index is negative but the length is high enough', () => {
    expect(sum([0, 1, 2, 3], -1, 3)).toEqual(1);
  });

  it('should return 0 when the length is negative', () => {
    expect(sum([0, 1, 2, 3], 1, -1)).toEqual(0);
  });

  it('should return the number at the start item', () => {
    expect(sum([0, 1, 2, 3], 1, 1)).toEqual(1);
  });

  it('should consider the maximum array length of the array', () => {
    expect(sum([0, 1, 2, 3], 3, 6)).toEqual(3);
  });

  it('should return the result', () => {
    expect(sum([0, 1, 2, 3], 1, 3)).toEqual(6);
  });
});
