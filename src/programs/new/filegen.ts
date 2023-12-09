import { promises as fsPromises } from "fs";
import Handlebars from "handlebars";

Handlebars.registerHelper("json", function (context: any) {
  return JSON.stringify(context);
});

export async function generateFile(
  templatePath: string,
  data: { year: string; day: string; puzzleInput: string },
  outputPath: string
) {
  try {
    const source = await fsPromises.readFile(templatePath, "utf8");
    const template = Handlebars.compile(source);
    const html = template(data);
    await fsPromises.writeFile(outputPath, html);
  } catch (err) {
    throw err;
  }
}
