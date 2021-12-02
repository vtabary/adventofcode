import { Command } from 'commander';
import chalk from 'chalk';
import {
  countDualIncrease,
  prepareTripleIncrease,
  readData,
} from './utils/utils';

const program = new Command();

program
  .command('part1')
  .description('Count each line which is greater than the previous one')
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
    console.log('Result is ... ', chalk.blueBright(countDualIncrease(data)));
  });

program
  .command('part2')
  .description(
    'Count each line which is greater than the previous triple measurements'
  )
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
    console.log(
      'Result is ... ',
      chalk.blueBright(countDualIncrease(prepareTripleIncrease(data)))
    );
  });

program.parse();
