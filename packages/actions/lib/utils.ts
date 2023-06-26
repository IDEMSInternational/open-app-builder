import { readFileSync } from "fs";
import { load } from "js-yaml";
import { resolve } from "path";

const TEMPLATES_FOLDER = resolve(__dirname, "../", "templates");

export function loadTemplateYml(templatePath: string) {
  return readFileSync(resolve(TEMPLATES_FOLDER, templatePath), "utf-8");
}

export function parseYml(ymlString: string) {
  return load(ymlString);
}
