import { DataFrame } from "danfojs";
import append_columns from "./appendColumns";
import testData from "../testData.spec";

describe("Append Columns Operator", () => {
  it("appends columns with dynamic data", () => {
    const testDf = new DataFrame(testData.names);
    const output = new append_columns(testDf, [
      "full_name : @row.first_name @row.last_name",
      "greeting : Hello @row.full_name",
    ]).apply();
    const testOutputFullName = output.column("full_name").values[2];
    expect(testOutputFullName).toEqual("Charles Babbage");
    const testOutputGreeting = output.column("greeting").values[2];
    expect(testOutputGreeting).toEqual("Hello Charles Babbage");
  });
});
