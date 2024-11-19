import { FlowTypes } from "packages/data-models";
import {
  coerceDataUpdateTypes,
  evaluateDynamicDataUpdate,
  isItemChanged,
} from "./dynamic-data.utils";
import { JsonSchema } from "rxdb";

const itemRows: FlowTypes.Data_listRow[] = [
  { id: "id_0", number: 0, string: "hello" },
  { id: "id_1", number: 1, string: "hello", boolean: true },
];

/********************************************************************************
 * Tests
 * yarn ng test --include src/app/shared/services/dynamic-data/dynamic-data.utils.spec.ts
 *******************************************************************************/
describe("DynamicDataService Utils", () => {
  /*************************************************************
   *  Main Tests
   ************************************************************/
  it("evaluateDynamicDataUpdate", async () => {
    const res = evaluateDynamicDataUpdate(itemRows, { number: "@item.number+10" });
    expect(res).toEqual([
      { id: "id_0", number: 10 },
      { id: "id_1", number: 11 },
    ]);
  });

  it("isItemChanged true", async () => {
    const res1 = isItemChanged({ id: "id_1", number: 1, string: "hello" }, { number: 2 });
    expect(res1).toEqual(true);
    const res2 = isItemChanged({ id: "id_1", number: 1 }, { number: 1 });
    expect(res2).toEqual(false);
  });

  it("coerceDataUpdateTypes", () => {
    const schemaMapping: Record<string, JsonSchema> = {
      number: { type: "number" },
      boolean: { type: "boolean" },
      text: { type: "string" },
    };
    const res1 = coerceDataUpdateTypes(schemaMapping, [
      {
        number: "1",
        boolean: "true",
        text: "hello",
        additional: "string",
      },
    ]);
    expect(res1).toEqual([
      {
        number: 1,
        boolean: true,
        text: "hello",
        additional: "string",
      },
    ]);
    // does not coerce missing or undefined properties
    const res2 = coerceDataUpdateTypes(schemaMapping, [
      {
        number: undefined,
      },
    ]);
    expect(res2).toEqual([{ number: undefined }]);
  });
});
