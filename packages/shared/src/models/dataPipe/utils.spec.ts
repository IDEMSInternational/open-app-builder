import { DataFrame } from "danfojs";
import * as DataPipeUtils from "./utils";

describe("DataPipe Utils", () => {
  it("Normalises json array data", () => {
    const input = [{ id: 1, value: 1 }, { id: 2 }];
    const output = DataPipeUtils.normalizeData(input);
    expect(output).toEqual([
      { id: 1, value: 1 },
      { id: 2, value: undefined },
    ]);
  });

  it("Replaces dataframe NaN with value", () => {
    const input = [{ id: 1, nan_value: NaN, undefined_value: undefined, null_value: null }];
    const df = new DataFrame(input);
    DataPipeUtils.replaceNaN(df, undefined);
    expect(df.values[0]).toEqual([1, undefined, undefined, null]);
  });
});

describe("DataPipe Utils: Set Index Column", () => {
  const input = [
    { id: "id_2", value: "value_2" },
    { id: "id_1", value: "value_1" },
  ];
  const df = new DataFrame(input);
  it("Sets index", () => {
    DataPipeUtils.setIndexColumn(df, "id");
    expect(df.index).toEqual(["id_2", "id_1"]);
  });
  it("Throws on empty dataframe", () => {
    const emptyDf = new DataFrame([]);
    const errMsg = "Cannot set an index on an empty dataframe";
    expect(() => DataPipeUtils.setIndexColumn(emptyDf, "id")).toThrowError(errMsg);
  });
  it("Throws on missing column", () => {
    const errMsg = "Column [missing_col] does not exist in data\nColumns: id, value";
    expect(() => DataPipeUtils.setIndexColumn(df, "missing_col")).toThrowError(errMsg);
  });
  const nonUniqueDf = new DataFrame([...input, ...input]);
  it("Throws on non-unique index values", () => {
    expect(() => DataPipeUtils.setIndexColumn(nonUniqueDf, "id")).toThrowError(
      `Duplicate ids found for entries: id_2, id_1`
    );
  });
});
