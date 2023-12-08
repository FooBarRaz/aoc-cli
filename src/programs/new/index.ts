import tree from "tree-node-cli";
import fs from "fs";
import * as yup from "yup";

const Handlebars = require("handlebars");

Handlebars.registerHelper("json", function (context: any) {
  return JSON.stringify(context);
});

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

function generateFile(
  templatePath: fs.PathOrFileDescriptor,
  data: { year: string; day: string; input: any },
  outputPath: fs.PathOrFileDescriptor
) {
  // Read the template file
  fs.readFile(templatePath, "utf8", (err, source) => {
    if (err) throw err;
    const template = Handlebars.compile(source);

    const html = template(data);

    fs.writeFile(outputPath, html, (err) => {
      if (err) throw err;
      console.log(`File has been created at ${outputPath}`);
    });
  });
}

export const setupNewDay = async (
  basePath: string,
  yearNumber: number,
  dayNumber: number,
  template: string
) => {
  const year = yearNumber.toString();
  const day = dayNumber.toString();
  const path = `${basePath}/${year}/day${day}`;
  console.log("Setting up new day for year", year, "day", day, "at", path);
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  const directoryPath = `./src/templates/${template}`;

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files
      .map((file) => `${directoryPath}/${file}`)
      .forEach((template: string) => {
        const fileName = template.split("/").pop()?.replace(".hbs", "");
        if (fileName) {
          generateFile(
            template,
            { year, day, input: "TODO:Get Input Automagically" },
            `${path}/${fileName}`
          );
        }
      });

    const fileTree = tree(path, { trailingSlash: true });
    console.log(fileTree);
  });
};

type Args = {
  baseDirectory: string;
  year: number;
  day: number;
  template: string;
};

export const createNew = async (args: Args) => {
  await setupNewDay(args.baseDirectory, args.year, args.day, args.template);
};
