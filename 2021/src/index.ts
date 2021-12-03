#!/usr/bin/env node

import { scriptName } from 'yargs';
import { addCommands as day1 } from './day1/cli';
import { addCommands as day2 } from './day2/cli';

const program = scriptName('advent-of-code');

day1(program);
day2(program);

program.completion().help().parse();
