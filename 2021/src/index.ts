import { Command } from 'commander';
import { addDay1Commands } from './day1/cli';
import { addDay2Commands } from './day2/cli';

const program = new Command();

addDay1Commands(program);
addDay2Commands(program);

program.parse();
