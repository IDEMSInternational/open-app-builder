import { DataFrame } from "danfojs";
import testData from "../testData.spec";
import { DataPipe } from "../pipe";
import merge from "./merge";

const nationality_data = [
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

const nested_data = [
  {
    id: "id_1",
    nested: {
      value: "test",
    },
  },
];

describe("Merge Operator", () => {
  const testDf = new DataFrame(testData.names);
  const testPipe = new DataPipe([], { ...testData, nationality_data, nested_data });

  it("Throws on missing list", () => {
    // throws on missing list
    expect(() => new merge(testDf, ["names", "missing_list"], testPipe)).toThrow(
      new Error("Arg validation error")
    );
  });
  it("Merges multiple lists", () => {
    // merges data - additional nationality column appended for all entries and populated for available
    const output = new merge(testDf, ["nationality_data"], testPipe).apply();
    expect(output.index).toEqual(["id_1", "id_2", "id_3", "id_4"]);
    // merges new nationality column
    const expectedNationalities = ["British", "French", undefined, undefined];
    expect(output.column("nationality").values).toEqual(expectedNationalities);
    // merges existing name overrides
    const expectedNames = ["override", "Blaise", "Charles", "Daniel"];
    expect(output.column("first_name").values).toEqual(expectedNames);
  });

  it("Supports nested json in merge list", () => {
    // merges data - additional nationality column appended for all entries and populated for available
    const output = new merge(testDf, ["nested_data"], testPipe).apply();
    expect(output.index).toEqual(["id_1", "id_2", "id_3", "id_4"]);
    // merges nested column
    // TODO - danfo stringifies nested data, should it be handled differently?
    const expectedNested = ['{"value":"test"}', "undefined", "undefined", "undefined"];
    expect(output.column("nested").values).toEqual(expectedNested as any);
  });

  it("Supports translations in base list (nested json)", () => {
    // test for issue raised in #2343
    const sourceDf = new DataFrame([
      { id: "id_1", text: "Hello", _translations: { eng: "Hello" } },
    ]);
    const sourcePipe = new DataPipe([], {
      nested_data: [{ id: "id_1", column_b: 2, column_c: 2 }],
    });
    const output = new merge(sourceDf, ["nested_data"], sourcePipe).apply();
    expect(output.values.length).toEqual(1);
    expect(output.values[0] as any).toEqual(["id_1", "Hello", { eng: "Hello" }, 2, 2]);
  });

  // QC
  it("Throws error if no no input_source provided", () => {
    const emptyDf = new DataFrame([]);
    // merges data - additional nationality column appended for all entries and populated for available
    expect(() => new merge(emptyDf, ["names", "nationality_data"], testPipe).apply()).toThrowError(
      "Merge: No data in base dataframe - an input_source must be provided"
    );
  });
});
