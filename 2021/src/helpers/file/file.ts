import { promises } from 'fs';
import { resolve } from 'path';

/**
 * Read data file
 */
export const readData = async (
  filePath: string,
  options: { cwd?: string } = {}
): Promise<string[]> => {
  const content = await promises.readFile(
    resolve(options.cwd || process.cwd(), filePath),
    'utf-8'
  );
  return content.split('\n').filter((line) => line.length > 0);
};
