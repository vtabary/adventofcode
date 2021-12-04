import { Argv } from 'yargs';
import chalk from 'chalk';
import { readData } from '../helpers/file/file';
import {
  getCO2,
  getGamma,
  getEpsilon,
  getOxygen,
  getScores,
} from './utils/utils';

export const addCommands = (program: Argv): Argv => {
  program.command(
    'day3-part1',
    'Get the Gamma and Epsilon',
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
      const scores = getScores(data);
      const gamma = getGamma(scores);
      const epsilon = getEpsilon(scores);

      console.log(
        'Result is ... ',
        chalk.blueBright(
          `(Gamma) ${gamma} * (Epsilon) ${epsilon} = ${gamma * epsilon}`
        )
      );
    }
  );

  program.command(
    'day3-part2',
    'Get the oxygen and the CO2',
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
      const oxygen = getOxygen(data);
      const co2 = getCO2(data);
      console.log(
        'Result is ... ',
        chalk.blueBright(`(oxygen) ${oxygen} * (co2) ${co2} = ${oxygen * co2}`)
      );
    }
  );

  return program;
};
