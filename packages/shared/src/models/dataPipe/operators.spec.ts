import { DataFrame, toJSON } from "danfojs";
import { OPERATORS } from "./operators";

const testData = {
  names: [
    {
      id: "id_1",
      first_name: "Alice",
      last_name: "Smith",
    },
    {
      id: "id_2",
      first_name: "Bob",
      last_name: "Jones",
    },
  ],
};

describe("Pipe Operators", () => {
  it("Filter (all)", () => {
    const testDf = new DataFrame(testData.names);
    const output = new OPERATORS.filter(testDf, ["first_name.startsWith('A')"]).apply();
    expect(toJSON(output)).toEqual([testData.names[0]]);
  });
  it("Filter (any)", () => {});
  it("Append Columns", () => {});
  it("Merge", () => {});
  it("Chained operations");
});
