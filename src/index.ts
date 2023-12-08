#!/usr/bin/env node

import { program } from "commander";
import { createNew } from "./programs/new";
import * as yup from "yup";
import chalk from "chalk";
import { schema as newCommandSchema } from "./programs/new";

program
  .name("Advent of Code CLI")
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
  .action((baseDirectory, year, day, options) => {
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

    createNew({
      baseDirectory,
      year: parseInt(year),
      day: parseInt(day),
      template: options.template,
    });
  });

program.parse(process.argv);
