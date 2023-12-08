#!/usr/bin/env node

import { program } from 'commander';

program
  .name("Advent of Code CLI")
  .description("CLI for working with Advent of Code challenges")
  .version("0.1.0");

// Define commands and options
program
  .command('example')
  .description('Example command')
  .action(() => {
    console.log('Command executed!');
  });

program.parse(process.argv);
