import fs from "fs";
import { Command } from "commander";
import process from "process";
import XLSX from "xlsx";
import prettier from "prettier";
import * as mappings from "./mappings";
import snippets from "./snippets";

interface IProgramOptions {}
const program = new Command("parse");
export default program
  .description("Parse worksheet into JS!")
  .argument("<path>", "Input .xlsl")
  .action((input, options: IProgramOptions) => {
    // [WIP] Helps turn XLSX data into cypress compatible test runs.
    const workbook = XLSX.readFile(input);

    const worksheets = ["Run", "Specify", "Describe"].reduce((cargo, v) => {
      const worksheet = workbook.Sheets[v];
      const data = XLSX.utils.sheet_to_json(worksheet);
      const key = v.toLowerCase();

      return { ...cargo, [key]: data };
    }, {});

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

      console.log(prettier.format(output, { parser: "babel" }));
    });
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
