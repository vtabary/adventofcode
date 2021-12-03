import { Argv } from 'yargs';
import chalk from 'chalk';
import { readData, getPosition, getPositionAndAim } from './utils/utils';

export const addCommands = (program: Argv): Argv => {
  program.command(
    'day2-part1',
    'Calculate the position from the directions',
    {
      file: {
        alias: 'f',
        type: 'string',
        describe: 'the file to read containing the data, one by line',
      },
      cwd: { type: 'string', describe: 'the working directory' },
    },
    async (args: { file?: string; cwd?: string }) => {
      if (!args.file) {
        throw new Error('Missing file path');
      }

      const data = await readData(args.file, { cwd: args.cwd });
      const position = getPosition(data);
      console.log(
        'Result is ... ',
        chalk.blueBright(
          `${position.horizontal} * ${position.depth} = ${
            position.horizontal * position.depth
          }`
        )
      );
    }
  );

  program.command(
    'day2-part2',
    'Calculate the position from the directions',
    {
      file: {
        alias: 'f',
        type: 'string',
        describe: 'the file to read containing the data, one by line',
      },
      cwd: {
        type: 'string',
        describe: 'the working directory',
        default: process.cwd(),
      },
    },
    async (args: { file?: string; cwd?: string }) => {
      if (!args.file) {
        throw new Error('Missing file path');
      }

      const data = await readData(args.file, { cwd: args.cwd });
      const position = getPositionAndAim(data);
      console.log(
        'Result is ... ',
        chalk.blueBright(
          `${position.horizontal} * ${position.depth} = ${
            position.horizontal * position.depth
          }`
        )
      );
    }
  );

  return program;
};
