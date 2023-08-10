import { DataFrame } from "danfojs";
import Sort from "./sort";
import testData from "../testData.spec";

describe("Sort", () => {
  it("Sorts data by column", () => {
    const testDf = new DataFrame(testData.names);
    const output = new Sort(testDf, ["year_of_birth"]).apply();
    const orderedYears = output.column("year_of_birth").values;
    expect(orderedYears).toEqual([1623, 1700, 1791, 1815]);
  });
  it("Sorts data in descending order", () => {
    const testDf = new DataFrame(testData.names);
    const output = new Sort(testDf, ["year_of_birth", "desc"]).apply();
    const orderedYears = output.column("year_of_birth").values;
    expect(orderedYears).toEqual([1815, 1791, 1700, 1623]);
  });
  it("Validates args", () => {
    const testDf = new DataFrame(testData.names);
    // Column not in data frame
    expect(() => new Sort(testDf, ["invalid_column"]).apply()).toThrowError(
      'ParamError: specified column "invalid_column" not found in columns'
    );
    // Direction arg invalid
    expect(() => new Sort(testDf, ["year_of_birth", "invalid_direction"]).apply()).toThrowError(
      "Arg validation error"
    );
  });
});
