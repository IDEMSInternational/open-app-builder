import { DataFrame } from "danfojs";
import { DataPipe } from "../pipe";
import testData from "../testData.spec";
import merge from "./merge";

(testData as any).merge_nationality = [
  {
    id: "invalid_id",
    nationality: "German",
  },
  {
    id: "id_1",
    nationality: "British",
    first_name: "override",
  },
  {
    id: "id_2",
    nationality: "French",
  },
];

describe("Merge Operator", () => {
  const testDf = new DataFrame(testData.names);
  const testPipe: DataPipe = new DataPipe([], testData);

  it("Throws on missing list", () => {
    // throws on missing list
    expect(() => new merge(testDf, ["names", "missing_list"], testPipe)).toThrow(
      new Error("Arg validation error")
    );
  });
  it("Merges multiple lists", () => {
    // merges data - additional nationality column appended for all entries and populated for available
    const output = new merge(testDf, ["merge_nationality"], testPipe).apply();
    expect(output.index).toEqual(["id_1", "id_2", "id_3", "id_4"]);
    // merges new nationality column
    const expectedNationalities = ["British", "French", undefined, undefined];
    expect(output.column("nationality").values).toEqual(expectedNationalities);
    // merges existing name overrides
    const expectedNames = ["override", "Blaise", "Charles", "Daniel"];
    expect(output.column("first_name").values).toEqual(expectedNames);
  });
});
