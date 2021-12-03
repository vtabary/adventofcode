import chalk from 'chalk';
import { Argv } from 'yargs';
import {
  countDualIncrease,
  prepareTripleIncrease,
  readData,
} from './utils/utils';

export const addCommands = (program: Argv): Argv => {
  program.command(
    'day1-part1',
    'Count each line which is greater than the previous one',
    {
      file: {
        alias: 'f',
        type: 'string',
        describe: 'the file to read containing the data, one by line',
      },
      cwd: {
        type: 'string',
        describe: 'the working directory, default: process.cwd()',
        default: process.cwd(),
      },
    },
    async (args: { file?: string; cwd?: string }) => {
      if (!args.file) {
        throw new Error('Missing file path');
      }

      const data = await readData(args.file, { cwd: args.cwd });
      console.log('Result is ... ', chalk.blueBright(countDualIncrease(data)));
    }
  );

  program.command(
    'day1-part2',
    'Count each line which is greater than the previous triple measurements',
    {
      file: {
        alias: 'f',
        type: 'string',
        describe: 'the file to read containing the data, one by line',
      },
      cwd: {
        type: 'string',
        describe: 'the working directory, default: process.cwd()',
        default: process.cwd(),
      },
    },
    async (args: { file?: string; cwd?: string }) => {
      if (!args.file) {
        throw new Error('Missing file path');
      }

      const data = await readData(args.file, { cwd: args.cwd });
      console.log(
        'Result is ... ',
        chalk.blueBright(countDualIncrease(prepareTripleIncrease(data)))
      );
    }
  );

  return program;
};
