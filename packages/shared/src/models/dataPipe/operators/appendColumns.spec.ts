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
  it("appends columns with boolean values", () => {
    const testDf = new DataFrame(testData.names);
    const output = new append_columns(testDf, [
      "full_name : Ada Lovelace",
      "boolean : FALSE",
      "number : -3.75 ",
    ]).apply();
    const testOutputFullName = output.column("full_name").values[2];
    expect(testOutputFullName).toEqual("Ada Lovelace");
    const testOutputBoolean = output.column("boolean").values[2];
    expect(testOutputBoolean).toEqual(false);
    const testOutputNumber = output.column("number").values[2];
    expect(testOutputNumber).toEqual(-3.75);
  });
});
