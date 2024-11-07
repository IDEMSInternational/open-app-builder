import { FlowTypes } from "packages/data-models";
import { evaluateDynamicDataUpdate } from "./dynamic-data.utils";

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
});
