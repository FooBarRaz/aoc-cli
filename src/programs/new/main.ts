import fs from "fs";
import tree from "tree-node-cli";
import * as yup from "yup";
import { generateFile } from "./filegen";
import { fetchPuzzleInput } from "../../aoc/fetchPuzzleInput";
import path from "path";
import chalk from "chalk";

export const schema = yup.object().shape({
  year: yup
    .number()
    .required("Year is required")
    .min(2000, "Year must be after 2015"),
  day: yup
    .number()
    .required("Day is required")
    .min(1, "Day must be at least 1")
    .max(25, "Day cannot be more than 25"),
  template: yup.string().default("defaultTemplate"),
});

const promiseToReadDir = (path: string): Promise<string[]> =>
  new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });

const getPuzzleInput = async (
  year: number,
  day: number,
  sessionToken?: string
): Promise<string> => {
  let puzzleInput = `Get your puzzle input at https://adventofcode.com/${year}/day/${day}/input`;
  
  if (sessionToken) {
    console.log("Fetching puzzle input...");
    puzzleInput = await fetchPuzzleInput(year, day, sessionToken);
    console.log(chalk.green("Successfully fetched your puzzle input!"));
  } else {
    console.log(chalk.yellow(`No session token provided, using placeholder input. Refer to \n[Puzzle Input Instructions](https://github.com/FooBarRaz/aoc-cli#puzzle-input)\n to learn how to get your session token.`));
  }
  return puzzleInput;
};

async function setupNewDay(
  basePath: string,
  yearNumber: number,
  dayNumber: number,
  template: string,
  sessionToken: string | undefined = process.env.AOC_SESSION
) {
  const year = yearNumber.toString();
  const day = dayNumber.toString().padStart(2, "0");
  const dayDirPath = `${basePath}/${year}/day${day}`;

  console.log("Setting up for year", year, "day", day, "at", dayDirPath);

  const puzzleInput = await getPuzzleInput(yearNumber, dayNumber, sessionToken);

  if (!fs.existsSync(dayDirPath)) {
    fs.mkdirSync(dayDirPath, { recursive: true });
  }
  const templatesDirPath = path.join(
    __dirname,
    "../../../",
    `templates/${template}`
  );
  await promiseToReadDir(templatesDirPath).then((files) => {
    files
      .map((file: string) => `${templatesDirPath}/${file}`)
      .forEach(async (template: string) => {
        const fileName = template.split("/").pop()?.replace(".hbs", "");
        if (fileName) {
          await generateFile(
            template,
            { year, day, puzzleInput },
            `${dayDirPath}/${fileName}`
          );
        }
      });
  });

  // wait for files to be generated
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const fileTree = tree(dayDirPath, { trailingSlash: true, allFiles: true });
  console.log(fileTree);
  console.log("🚀 LFG!");
}

type Args = {
  baseDirectory: string;
  year: number;
  day: number;
  template: string;
  sessionToken?: string;
};

export const createNew = async (args: Args) => {
  await setupNewDay(
    args.baseDirectory,
    args.year,
    args.day,
    args.template,
    args.sessionToken
  );
};
