import { readFileSync } from "fs";
import { load } from "js-yaml";
import { resolve } from "path";

const ACTION_TEMPLATES_FOLDER = resolve(__dirname, "../", "templates");

export function loadActionYml(templatePath: string) {
  return readFileSync(resolve(ACTION_TEMPLATES_FOLDER, templatePath), "utf-8");
}

export function parseYml(ymlString: string) {
  return load(ymlString);
}
