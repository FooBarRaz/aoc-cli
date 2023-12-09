import fs from "fs";
import tree from "tree-node-cli";
import * as yup from "yup";
import { generateFile } from "./filegen";
import { fetchPuzzleInput } from "../../aoc/fetchPuzzleInput";
import path from "path";

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

export async function setupNewDay(
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

  if (!fs.existsSync(dayDirPath)) {
    fs.mkdirSync(dayDirPath, { recursive: true });
  }

  let puzzleInput = `Get your puzzle input at https://adventofcode.com/${year}/day/${day}/input`;
  if (sessionToken) {
    console.log("Fetching puzzle input...");
    puzzleInput = await fetchPuzzleInput(yearNumber, dayNumber, sessionToken);
  }


  const directoryPath = path.join(__dirname, "../../../", `templates/${template}`);
  const files = await promiseToReadDir(directoryPath);

  await files
    .map((file) => `${directoryPath}/${file}`)
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

  const fileTree = tree(dayDirPath, { trailingSlash: true, allFiles: true });
  console.log(fileTree);
  console.log("LFG!🚀");
}

type Args = {
  baseDirectory: string;
  year: number;
  day: number;
  template: string;
  sessionToken?: string;
};

export const createNew = async (args: Args) => {
  await setupNewDay(args.baseDirectory, args.year, args.day, args.template, args.sessionToken);
};

