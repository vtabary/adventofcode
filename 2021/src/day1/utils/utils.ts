import { promises } from 'fs';
import { resolve } from 'path';

/**
 * Read data file
 */
export const readData = async (
  filePath: string,
  options: { cwd?: string } = {}
): Promise<number[]> => {
  const content = await promises.readFile(
    resolve(options.cwd || process.cwd(), filePath),
    'utf-8'
  );
  return content
    .split('\n')
    .map((line) => parseInt(line))
    .filter((item) => !isNaN(item));
};

export const countDualIncrease = (data: number[]): number => {
  // Ignore the first item since it doesn't have any precedence
  return data.slice(1).filter((item, index) => item > data[index]).length;
};

export const prepareTripleIncrease = (data: number[]): number[] => {
  // Ignore the first item since it doesn't have any precedence
  return data.slice(2).map((_, index) => sum(data, index, 3));
};

/**
 * Sums up all the number in a window
 * @param data the array of number
 * @param start the beginning of the array to consider, included
 * @param length the number of number to sum up including the number à the start inex
 * @returns the sum
 */
export const sum = (data: number[], start: number, length: number): number => {
  const end = start + length;
  start = start < 0 ? 0 : start;
  if (end < start) {
    return 0;
  }

  return data.slice(start, end).reduce((acc, item) => acc + item, 0);
};
