import { Command } from 'commander';
import chalk from 'chalk';
import { readData, getPosition, getPositionAndAim } from './utils/utils';

export const addDay2Commands = (program: Command): void => {
  program
    .command('day2-part1')
    .description('Calculate the position from the directions')
    .option(
      '-f, --file <value>',
      'the file to read containing the data, one by line'
    )
    .option('--cwd <value>', 'the working directory', process.cwd())
    .action(async (args: { file?: string; cwd?: string }) => {
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
    });

  program
    .command('day2-part2')
    .description('Calculate the position from the directions')
    .option(
      '-f, --file <value>',
      'the file to read containing the data, one by line'
    )
    .option('--cwd <value>', 'the working directory', process.cwd())
    .action(async (args: { file?: string; cwd?: string }) => {
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
    });
};
