import fs from "fs-extra";
import os from "os";
import path from "path";
import { getTranslation, loadTranslationStrings, parsePo } from "./po";

const PO = `msgid ""
msgstr ""
"Content-Type: text/plain; charset=UTF-8\\n"
"Language: fil_PH\\n"

#. type=data_list
msgctxt "data_list"
msgid "Hello"
msgstr "Kumusta"

#. type=global
#. The string @global.app_name should not be translated.
msgctxt "global"
msgid "Your @global.app_name Code"
msgstr "Ang iyong @global.app_name Code"

#. type=data_list
msgctxt "data_list"
msgid ""
"Line one\\n"
"Say \\"hi\\""
msgstr ""
"Unang linya\\n"
"Sabihin \\"hi\\""

msgctxt "template"
msgid "Untranslated"
msgstr ""

#, fuzzy
msgctxt "template"
msgid "Fuzzy"
msgstr "Malabo"

msgid "No context"
msgstr "Walang konteksto"
`;

/** yarn workspace scripts test -t po.spec.ts */
describe("Beta translations po", () => {
  it("parses translated entries, skipping the header, untranslated and fuzzy entries", () => {
    expect(parsePo(PO)).toEqual([
      { context: "data_list", msgid: "Hello", msgstr: "Kumusta" },
      {
        context: "global",
        msgid: "Your @global.app_name Code",
        msgstr: "Ang iyong @global.app_name Code",
      },
      { context: "data_list", msgid: 'Line one\nSay "hi"', msgstr: 'Unang linya\nSabihin "hi"' },
      { context: "", msgid: "No context", msgstr: "Walang konteksto" },
    ]);
  });

  it("handles windows line endings and entries without blank lines between them", () => {
    const po =
      'msgctxt "a"\r\nmsgid "One"\r\nmsgstr "Isa"\r\nmsgctxt "a"\r\nmsgid "Two"\r\nmsgstr "Dalawa"';
    expect(parsePo(po).map((e) => e.msgstr)).toEqual(["Isa", "Dalawa"]);
  });

  it("starts a new entry at a msgid after a msgstr, without inheriting the context", () => {
    const po = 'msgctxt "a"\nmsgid "One"\nmsgstr "Isa"\nmsgid "Two"\nmsgstr "Dalawa"';
    expect(parsePo(po)).toEqual([
      { context: "a", msgid: "One", msgstr: "Isa" },
      { context: "", msgid: "Two", msgstr: "Dalawa" },
    ]);
  });

  it("treats contexts and strings named like object properties as ordinary keys", () => {
    const folder = fs.mkdtempSync(path.join(os.tmpdir(), "beta-po-proto-"));
    try {
      fs.outputFileSync(
        path.join(folder, "fil", "fil_main.po"),
        'msgctxt "__proto__"\nmsgid "polluted"\nmsgstr "yes"\n\nmsgctxt "a"\nmsgid "constructor"\nmsgstr "Tagabuo"'
      );
      const strings = loadTranslationStrings(folder);
      expect(({} as any).polluted).toBeUndefined();
      expect(getTranslation(strings, "fil", "__proto__", "polluted")).toEqual("yes");
      expect(getTranslation(strings, "fil", "a", "constructor")).toEqual("Tagabuo");
      expect(getTranslation(strings, "fil", "a", "toString")).toBeUndefined();
      expect(getTranslation(strings, "constructor", "a", "constructor")).toBeUndefined();
    } finally {
      fs.removeSync(folder);
    }
  });

  it("reads only the first plural form", () => {
    const po = 'msgid "day"\nmsgid_plural "days"\nmsgstr[0] "araw"\nmsgstr[1] "mga araw"';
    expect(parsePo(po)).toEqual([{ context: "", msgid: "day", msgstr: "araw" }]);
  });

  describe("loadTranslationStrings", () => {
    let folder: string;
    beforeEach(() => (folder = fs.mkdtempSync(path.join(os.tmpdir(), "beta-po-"))));
    afterEach(() => fs.removeSync(folder));

    it("loads every po file by language folder", () => {
      fs.outputFileSync(path.join(folder, "fil", "fil_main.po"), PO);
      fs.outputFileSync(
        path.join(folder, "fil", "sub", "fil_modules.po"),
        'msgctxt "data_list"\nmsgid "Module"\nmsgstr "Modyul"'
      );
      fs.outputFileSync(path.join(folder, "notes.txt"), "ignored");
      const strings = loadTranslationStrings(folder);
      expect(Object.keys(strings)).toEqual(["fil"]);
      expect(strings.fil.data_list).toEqual({
        Hello: "Kumusta",
        'Line one\nSay "hi"': 'Unang linya\nSabihin "hi"',
        Module: "Modyul",
      });
    });

    it("returns no strings when the folder is missing", () => {
      expect(loadTranslationStrings(path.join(folder, "missing"))).toEqual({});
      expect(loadTranslationStrings(undefined)).toEqual({});
    });
  });

  it("matches the context, or else strings without a context", () => {
    const strings = {
      fil: { data_list: { Hello: "Kumusta" }, "": { Hello: "Hoy", Bye: "Paalam" } },
    };
    expect(getTranslation(strings, "fil", "data_list", "Hello")).toEqual("Kumusta");
    expect(getTranslation(strings, "fil", "template", "Hello")).toEqual("Hoy");
    expect(getTranslation(strings, "fil", "data_list", "Bye")).toEqual("Paalam");
    expect(getTranslation(strings, "fil", "data_list", "Other")).toBeUndefined();
    expect(getTranslation(strings, "spa", "data_list", "Hello")).toBeUndefined();
  });
});
