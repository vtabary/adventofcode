import { promises } from 'fs';
import { resolve } from 'path';

interface IDirection {
  direction: 'forward' | 'down' | 'up';
  distance: number;
}

const DIRECTIONS = ['forward', 'down', 'up'];

/**
 * Read data file
 */
export const readData = async (
  filePath: string,
  options: { cwd?: string } = {}
): Promise<IDirection[]> => {
  const content = await promises.readFile(
    resolve(options.cwd || process.cwd(), filePath),
    'utf-8'
  );
  return content
    .split('\n')
    .map(readLine)
    .filter(
      (
        item
      ): item is { direction: 'forward' | 'down' | 'up'; distance: number } =>
        !!item
    );
};

export const readLine = (line: string): IDirection | undefined => {
  const content = line.split(' ');
  const direction = DIRECTIONS[DIRECTIONS.indexOf(content[0])] as
    | IDirection['direction']
    | undefined;
  const distance = parseInt(content[1]);

  if (isNaN(distance) || !direction) {
    return undefined;
  }

  return { direction, distance };
};

export const getPosition = (
  directions: IDirection[]
): { depth: number; horizontal: number } => {
  return directions.reduce(
    (acc, item) => {
      switch (item.direction) {
        case 'forward':
          acc.horizontal += item.distance;
          break;
        case 'down':
          acc.depth += item.distance;
          break;
        case 'up':
          acc.depth -= item.distance;
          break;
      }
      return acc;
    },
    { depth: 0, horizontal: 0 }
  );
};

export const getPositionAndAim = (
  directions: IDirection[]
): { depth: number; horizontal: number; aim: number } => {
  return directions.reduce(
    (acc, item) => {
      switch (item.direction) {
        case 'forward':
          acc.horizontal += item.distance;
          acc.depth += acc.aim * item.distance;
          break;
        case 'down':
          acc.aim += item.distance;
          break;
        case 'up':
          acc.aim -= item.distance;
          break;
      }
      return acc;
    },
    { depth: 0, horizontal: 0, aim: 0 }
  );
};
