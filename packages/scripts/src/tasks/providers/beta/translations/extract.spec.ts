import { FlowTypes } from "data-models";
import type { IFlowsByType } from "../processFlows";
import { extractTranslationEntries, getPlaceholders, getTranslationFile } from "./extract";

function flows(partial: Partial<IFlowsByType>): IFlowsByType {
  return { data_list: [], global: [], template: [], ...partial };
}
function flow(flow_type: string, rows: any[], extra: Record<string, any> = {}) {
  return {
    flow_type,
    flow_name: `test_${flow_type}`,
    rows,
    ...extra,
  } as FlowTypes.FlowTypeWithData;
}

/** yarn workspace scripts test -t extract.spec.ts */
describe("Beta translations extract", () => {
  it("extracts global values unless excluded from translation", () => {
    const global = flow("global", [
      { name: "a", value: "Hello" },
      { name: "b", value: "panama", exclude_from_translation: true },
      { name: "c", value: "Kept", exclude_from_translation: false },
      { name: "d", value: "Excluded", exclude_from_translation: "TRUE" },
    ]);
    expect(extractTranslationEntries(flows({ global: [global] }))).toEqual([
      { language: "eng", file: "main", context: "global", text: "Hello" },
      { language: "eng", file: "main", context: "global", text: "Kept" },
    ]);
  });

  it("extracts template values only when included in translation", () => {
    const template = flow("template", [
      { type: "text", value: "Not included" },
      { type: "text", value: "Included", include_in_translation: true },
      { type: "text", value: "Text TRUE", include_in_translation: "TRUE" },
    ]);
    expect(extractTranslationEntries(flows({ template: [template] })).map((e) => e.text)).toEqual([
      "Included",
      "Text TRUE",
    ]);
  });

  it("extracts data_list columns with a language suffix, using that language", () => {
    const dataList = flow(
      "data_list",
      [
        { id: "${metadata}", "title::eng": "type: string" },
        { id: "a", title: "Untagged", "title::eng": "Hello", "title::es_mx": "Hola", "n::eng": 1 },
      ],
      { language: "fra" }
    );
    expect(extractTranslationEntries(flows({ data_list: [dataList] }))).toEqual([
      { language: "eng", file: "main", context: "data_list", text: "Hello" },
      { language: "es_mx", file: "main", context: "data_list", text: "Hola" },
    ]);
  });

  it("uses the flow language, or a value column suffix", () => {
    const global = flow("global", [{ name: "a", value: "Hola", "value::eng": "Hello" }], {
      language: "es_mx",
    });
    expect(extractTranslationEntries(flows({ global: [global] }))).toEqual([
      { language: "es_mx", file: "main", context: "global", text: "Hola" },
      { language: "eng", file: "main", context: "global", text: "Hello" },
    ]);
  });

  it("lists each string once per language, file and flow_type", () => {
    const rows = [
      { name: "a", value: "Hello" },
      { name: "b", value: "Hello" },
    ];
    const template = flow("template", [{ value: "Hello", include_in_translation: true }]);
    const entries = extractTranslationEntries(
      flows({ global: [flow("global", rows)], template: [template] })
    );
    expect(entries.map((e) => e.context)).toEqual(["global", "template"]);
  });

  it("skips values that are empty, not text, or only placeholders", () => {
    const global = flow("global", [
      { name: "a", value: "" },
      { name: "b", value: 3 },
      { name: "c", value: true },
      { name: "d", value: "@global.app_name" },
      { name: "e", value: " ${local.name} " },
      { name: "f", value: "Hi @fields.name" },
    ]);
    expect(extractTranslationEntries(flows({ global: [global] })).map((e) => e.text)).toEqual([
      "Hi @fields.name",
    ]);
  });

  describe("getTranslationFile", () => {
    it("uses main unless splitting by subtype", () => {
      const withSubtype = { flow_type: "data_list", flow_name: "a", flow_subtype: "modules" };
      expect(getTranslationFile(withSubtype as any)).toEqual("main");
      expect(getTranslationFile(withSubtype as any, { splitBySubtype: true })).toEqual("modules");
      expect(
        getTranslationFile({ flow_type: "data_list", flow_name: "a" }, { splitBySubtype: true })
      ).toEqual("main");
    });

    it("replaces characters that are not safe in file names", () => {
      const flowBase = { flow_type: "data_list", flow_name: "a", flow_subtype: "../a/b" } as any;
      expect(getTranslationFile(flowBase, { splitBySubtype: true })).toEqual(".._a_b");
    });
  });

  it("finds placeholders", () => {
    expect(getPlaceholders("Hi @fields.name, from @global.app_name. ${local.x}!")).toEqual([
      "@fields.name",
      "@global.app_name",
      "${local.x}",
    ]);
  });
});
