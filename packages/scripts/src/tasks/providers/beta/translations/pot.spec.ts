import fs from "fs-extra";
import os from "os";
import path from "path";
import { toPot } from "./pot";
import { updateTranslations } from "./index";

/** yarn workspace scripts test -t pot.spec.ts */
describe("Beta translations pot", () => {
  it("writes the header and entries in the existing translation file layout", () => {
    const pot = toPot([
      { context: "data_list", text: "Hello" },
      { context: "global", text: "Your @global.app_name Code" },
    ]);
    expect(pot).toEqual(
      [
        'msgid ""',
        'msgstr ""',
        '"Content-Type: text/plain; charset=utf-8\\n"',
        "",
        "#. type=data_list",
        'msgctxt "data_list"',
        'msgid "Hello"',
        'msgstr ""',
        "",
        "#. type=global",
        "#. The string @global.app_name should not be translated.",
        'msgctxt "global"',
        'msgid "Your @global.app_name Code"',
        'msgstr ""',
        "",
      ].join("\n")
    );
  });

  it("lists multiple placeholders once each", () => {
    const pot = toPot([{ context: "template", text: "@fields.a and @fields.b and @fields.a" }]);
    expect(pot).toContain(
      [
        "#. The following strings should not be translated: ",
        "#.      @fields.a",
        "#.      @fields.b",
        'msgctxt "template"',
      ].join("\n")
    );
  });

  it("splits text with line breaks and escapes quotes and backslashes", () => {
    const pot = toPot([{ context: "global", text: 'Say "hi"\n\nC:\\path' }]);
    expect(pot).toContain(['msgid ""', '"Say \\"hi\\"\\n"', '"\\n"', '"C:\\\\path"'].join("\n"));
  });
});

describe("Beta updateTranslations", () => {
  let externalSourcePath: string;
  const sheetsFolder = () => path.join(externalSourcePath, "app_data", "sheets");
  const sourceFolder = () => path.join(externalSourcePath, "app_data", "translations", "source");

  beforeEach(() => {
    externalSourcePath = fs.mkdtempSync(path.join(os.tmpdir(), "beta-translations-"));
    fs.outputJsonSync(path.join(sheetsFolder(), "google_drive", "globals.json"), {
      flow_type: "global",
      flow_name: "globals",
      rows: [{ name: "a", value: "Hello" }],
    });
    fs.outputJsonSync(path.join(sheetsFolder(), "google_drive", "modules.json"), {
      flow_type: "data_list",
      flow_subtype: "modules",
      flow_name: "modules",
      rows: [{ id: "a", "title::eng": "Module", "title::es_mx": "Módulo" }],
    });
  });
  afterEach(() => fs.removeSync(externalSourcePath));

  it("writes one main.pot per language", () => {
    updateTranslations({ externalSourcePath });
    expect(fs.readdirSync(sourceFolder()).sort()).toEqual(["eng", "es_mx"]);
    expect(fs.readdirSync(path.join(sourceFolder(), "eng"))).toEqual(["main.pot"]);
    const engPot = fs.readFileSync(path.join(sourceFolder(), "eng", "main.pot"), "utf8");
    expect(engPot).toContain('msgid "Hello"');
    expect(engPot).toContain('msgid "Module"');
  });

  it("splits by subtype and replaces previous output", () => {
    fs.outputFileSync(path.join(sourceFolder(), "old", "main.pot"), "old");
    updateTranslations({ externalSourcePath, splitBySubtype: true });
    expect(fs.existsSync(path.join(sourceFolder(), "old"))).toBe(false);
    expect(fs.readdirSync(path.join(sourceFolder(), "eng")).sort()).toEqual([
      "main.pot",
      "modules.pot",
    ]);
    expect(fs.readdirSync(path.join(sourceFolder(), "es_mx"))).toEqual(["modules.pot"]);
  });
});
