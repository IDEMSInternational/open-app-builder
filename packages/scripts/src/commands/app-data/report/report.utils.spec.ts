import { generateMarkdownTable, generateReportMarkdown } from "./report.utils";

/** yarn workspace scripts test -t report.utils.spec.ts */
describe("report utils", () => {
  it("generateMarkdownTable", () => {
    const res = generateMarkdownTable([
      { key_1: "value_1a", key_2: "value_1b" },
      { key_1: "value_2a", key_2: "value_2b" },
    ]);
    const expected = `
    | key_1 | key_2 |
    | --- | --- |
    | value_1a | value_1b |
    | value_2a | value_2b |
    `;
    // when checking against expected remove additional whitespace indents
    expect(res).toEqual(expected.trim().replace(/    /g, ""));
  });

  it("generateMarkdownTable with named columns", () => {
    const res = generateMarkdownTable(
      [
        { key_1: "value_1a", key_2: "value_1b" },
        { key_1: "value_2a", key_2: "value_2b" },
      ],
      ["key_1"]
    );
    const expected = `
    | key_1 |
    | --- |
    | value_1a |
    | value_2a |
    `;
    expect(res).toEqual(expected.trim().replace(/    /g, ""));
  });

  it("generates report with collapsed section", () => {
    const res = generateReportMarkdown({
      data: [{ key: "value" }],
      display: "collapse_closed",
      title: "Mock Info",
      type: "table",
      description: "Mock Description",
      footer: "Mock Footer",
    });
    const expected = `
    <details >
    <summary><h2>Mock Info</h2</summary>
    
    Mock Description

    | key |
    | --- |
    | value |

    Mock Footer
    </details>
    `;
    expect(res).toEqual(expected.trim().replace(/    /g, ""));
  });
});
