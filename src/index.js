#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
commander_1.program
    .name("Advent of Code CLI")
    .description("CLI for working with Advent of Code challenges")
    .version("0.1.0");
// Define commands and options
commander_1.program
    .command('example')
    .description('Example command')
    .action(() => {
    console.log('Command executed!');
});
commander_1.program.parse(process.argv);
