import { generateMarkdownTable, sortJsonByKey } from "./report.utils";

/** yarn workspace scripts test -t report.utils.spec.ts */
describe("report utils", () => {
  it("sortJsonByKey", () => {
    const mockJson = { b: "first entry", a: "second entry" };
    const res = sortJsonByKey(mockJson);
    expect(Object.keys(res)).toStrictEqual(["a", "b"]);
  });
  it("generateMarkdownTable", () => {
    const res = generateMarkdownTable([
      { key_1: "value_1a", key_2: "value_1b" },
      { key_1: "value_2a", key_2: "value_2b" },
    ]);
    expect(res).toEqual(
      `| key_1 | key_2 |\n| --- | --- |\n| value_1a | value_1b |\n| value_2a | value_2b |`
      /* When formatted output in form:
        
        | key_1 | key_2 |
        | --- | --- |
        | value_1a | value_1b |
        | value_2a | value_2b |
    */
    );
  });
});
