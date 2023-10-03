import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import * as XLSX from "xlsx";
import prettier from "prettier";
import * as mappings from "./mappings";
import snippets from "./snippets";
import { ROOT_DIR } from "../../paths";

interface IProgramOptions {
  input: string;
  output: string;
}
/** [WIP] Helps turn XLSX data into cypress compatible test runs. */
const program = new Command("parse");
export default program
  .description("Parse worksheet into JS!")
  .requiredOption("-i --input <string>", "path to input xlsx file (relative to project root)")
  .requiredOption("-o --output <string>", "path to output spec file (relative to project root")
  .action((options: IProgramOptions) => {
    // Setup Input and Outputs
    const { input, output } = options;
    const inputPath = path.resolve(ROOT_DIR, input);
    const outputPath = path.resolve(ROOT_DIR, output);
    fs.ensureDirSync(path.dirname(outputPath));
    const workbook = XLSX.readFile(inputPath);
    const outputs = ["/** This file has been automatically generated. Do not modify directly */"];

    // Convert XLSX to JSON
    const worksheets = ["Run", "Specify", "Describe"].reduce((cargo, v) => {
      const worksheet = workbook.Sheets[v];
      const data = XLSX.utils.sheet_to_json(worksheet);
      const key = v.toLowerCase();
      return { ...cargo, [key]: data };
    }, {});

    // Generate Specs from data
    worksheets["describe"].forEach((data) => {
      const specifications = worksheets["specify"]
        .filter((o) => o.describe === data.name)
        .reduce((cargo, s) => {
          const runs = worksheets["run"].filter((r) => r.spec === s.name);
          const next = { ...s, runs };
          return [...cargo, next];
        }, [])
        .map((o) => it(o))
        .join("");

      const output = `describe("${data.name}", () => {
        ${before(data.before)}
        ${specifications}
        ${after(data.after)}
      });`;
      outputs.push(output);
    });
    const specData = outputs.join("\n");
    const formattedOutput = prettier.format(specData, { parser: "babel" });
    fs.writeFileSync(outputPath, formattedOutput);
  });

function it(options = { name: "", runs: [] }) {
  const map = options.runs.map((r) => {
    const f = mappings[r.func];

    return f(r.args);
  });

  return `
    it("${options.name}", () => {
      ${map.join(";")};
    });`;
}

function after(key = "") {
  if (key in snippets) {
    return `after(() => {
      ${snippets[key]}
    });`;
  }

  return "";
}

function before(key = "") {
  if (key in snippets) {
    return `before(() => {
      ${snippets[key]}
    });`;
  }

  return "";
}
