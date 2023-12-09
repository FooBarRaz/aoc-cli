#!/usr/bin/env node

import { program } from "commander";
import { createNew } from "./programs/new/main";
import chalk from "chalk";
import { schema as newCommandSchema } from "./programs/new/main";
import figlet from "figlet";

program
  .name("aoc")
  .description("CLI for working with Advent of Code challenges")
  .version("0.1.0");

program
  .command("new <baseDirectory> <year> <day>")
  .description("Set up code and test files for a new challenge")
  .option(
    "-t, --template [template]",
    "Specify a template (optional)",
    "typescript"
  )
  // add option for session token
  .option(
    "-s, --session [session]",
    "Specify a session token with which to fetch your puzzle input (optional)",
  )
  .action(async (baseDirectory, year, day, options) => {
    try {
      newCommandSchema.validateSync({
        year,
        day,
        template: options.template,
      });
    } catch (err: any) {
      console.error(`${chalk.red("Invalid input:")} ${err.errors}`);
      process.exit(1);
    }

    await createNew({
      baseDirectory,
      year: parseInt(year),
      day: parseInt(day),
      template: options.template,
      sessionToken: options.session,
    });
  });


// write Advent of Code CLI using figlet

figlet('Advent of Code CLI', function(_, data) {
    console.log(chalk.blue(data));
    program.parse(process.argv);
});
