/**
 * Part 1
 */

/**
 * Parse the lines and calculates the score
 */
export const getScores = (lines: string[]): number[] => {
  if (lines.length === 0) {
    return [];
  }

  const result: number[] = Array(lines[0].length).fill(0);
  return lines.reduce((acc, line) => parseLine(line, acc), result);
};

/**
 * Take a line and update the score for each colone
 */
export const parseLine = (line: string, state: number[]): number[] => {
  return state.map((counter, index) => counter + getCharValue(line[index]));
};

/**
 * @returns 1 when the char is '1' and -1 when the whar is '0'
 */
export const getCharValue = (char: string): number => {
  // Other values than 0 or 1 should not change the result
  return char === '0' ? -1 : char === '1' ? 1 : 0;
};

const getLevelFromScores = (
  scores: number[],
  useMostCommonValues: boolean
): number => {
  if (scores.length === 0) {
    return 0;
  }

  return parseInt(
    scores
      .map((score) => ((useMostCommonValues ? score : -score) < 0 ? '0' : '1'))
      .join(''),
    2
  );
};

export const getGamma = (scores: number[]): number => {
  return getLevelFromScores(scores, true);
};

export const getEpsilon = (scores: number[]): number => {
  return getLevelFromScores(scores, false);
};

/**
 * Part 2
 */

/**
 * Remove the lines which does not use the most common value at the given index when `useMostCommonValue` is true
 * Or remove the lines which does not use the most common value at the given index when `useMostCommonValue` is false
 */
export const filterLines = (
  lines: string[],
  index: number,
  useMostCommonValue: boolean
): string[] => {
  if (lines.length === 1) {
    return lines;
  }

  const counter = lines.reduce(
    (acc, line) => acc + getCharValue(line[index]),
    0
  );
  const mostCommonValue = counter < 0 ? '0' : '1';

  return lines.filter((line) => {
    return line[index] === mostCommonValue
      ? useMostCommonValue
      : !useMostCommonValue;
  });
};

export const getLevel = (
  lines: string[],
  useMostCommonValue: boolean
): number => {
  if (lines.length === 0) {
    return 0;
  }

  // Take the length of the first line as a generic case
  const matchingLine = Array(lines[0].length)
    .fill(0)
    .reduce(
      (acc, _, index) => filterLines(acc, index, useMostCommonValue),
      lines
    )[0];

  return parseInt(matchingLine, 2);
};

export const getOxygen = (lines: string[]): number => {
  return getLevel(lines, true);
};

export const getCO2 = (lines: string[]): number => {
  return getLevel(lines, false);
};
