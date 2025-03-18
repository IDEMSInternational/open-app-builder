import type { FlowTypes } from "packages/data-models";
import { mergeTemplateRows, objectToArray, updateRowPropertyRecursively } from "./template-utils";

const MOCK_ROW = (): FlowTypes.TemplateRow => ({
  _nested_name: "",
  name: "",
  type: "button",
});

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/components/template/utils/template-utils.spec.ts
 */
describe("Template Utils", () => {
  it("updateRowPropertyRecursively", () => {
    const r: FlowTypes.TemplateRow = {
      ...MOCK_ROW(),
      _evalContext: { local: { string: "hello", number: 1 } },
      rows: [
        {
          ...MOCK_ROW(),
          _evalContext: { local: { string: "hello", number: 1 } },
        },
      ],
    };
    const res = updateRowPropertyRecursively(r, {
      _evalContext: { local: { number: 2 } },
    });
    // both top-level and nested row eval context should be updated
    expect(res._evalContext).toEqual({ local: { string: "hello", number: 2 } });
    expect(res.rows[0]._evalContext).toEqual({ local: { string: "hello", number: 2 } });
  });
  // TODO
  xit("mergeTemplateRows", () => {});
  // TODO
  xit("objectToArray", () => {});
});
