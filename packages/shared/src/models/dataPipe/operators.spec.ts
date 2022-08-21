import { DataFrame } from "danfojs";
import { OPERATORS } from "./operators";
import { DataPipe } from "./pipe";

// https://famous-mathematicians.com/list/
const testData = {
  names: [
    {
      id: "id_1",
      first_name: "Ada",
      last_name: "Lovelace",
      year_of_birth: 1815,
    },
    {
      id: "id_2",
      first_name: "Blaise",
      last_name: "Pascal",
      year_of_birth: 1623,
    },
    {
      id: "id_3",
      first_name: "Charles",
      last_name: "Babbage",
      year_of_birth: 1791,
    },
    {
      id: "id_4",
      first_name: "Daniel",
      last_name: "Bernoulli",
      year_of_birth: 1700,
    },
  ],
  concat_names: [
    {
      id: "id_5",
      first_name: "Edward",
      last_name: "Lorenz",
      // year_of_birth omitted, additional field added
      additonal_field: "EL",
    },
    {
      id: "id_6",
      first_name: "Felix",
      last_name: "Klein",
      // year_of_birth omitted, additional field added
      additonal_field: "FK",
    },
  ],
  merge_nationality: [
    {
      id: "invalid_id",
      nationality: "German",
    },
    {
      id: "id_1",
      nationality: "British",
    },
    {
      id: "id_2",
      nationality: "French",
    },
  ],
};

describe("Pipe Operators", () => {
  it("append_columns", () => {
    const testDf = new DataFrame(testData.names);
    const output = new OPERATORS.append_columns(testDf, [
      "full_name : @row.first_name @row.last_name",
      "greeting : Hello @row.full_name",
    ]).apply();
    const testOutputFullName = output.column("full_name").values[2];
    expect(testOutputFullName).toEqual("Charles Babbage");
    const testOutputGreeting = output.column("greeting").values[2];
    expect(testOutputGreeting).toEqual("Hello Charles Babbage");
  });
  it("concat", () => {
    const testDf = new DataFrame([]);
    const testPipe: DataPipe = new DataPipe([], testData);
    // throws on missing list
    expect(() => new OPERATORS.concat(testDf, ["names", "missing_list"], testPipe)).toThrow(
      new Error("Arg validation error")
    );
    // concatenates data, combining the 4+2 rows and 4+1 columns
    const output = new OPERATORS.concat(testDf, ["names", "concat_names"], testPipe).apply();
    expect(output.shape).toEqual([6, 5]);
  });
  it("filter", () => {
    const testDf = new DataFrame(testData.names);
    const output = new OPERATORS.filter(testDf, [
      "last_name.startsWith('B')",
      "year_of_birth > 1750",
    ]).apply();
    const outputIDs = output.column("id").values;
    expect(outputIDs).toEqual(["id_3"]);
  });
  it("filter_any", () => {
    const testDf = new DataFrame(testData.names);
    const output = new OPERATORS.filter_any(testDf, [
      "last_name.startsWith('B')",
      "year_of_birth > 1750",
    ]).apply();
    const outputIDs = output.column("id").values;
    expect(outputIDs).toEqual(["id_1", "id_3", "id_4"]);
  });
  fit("map", () => {
    const testDf = new DataFrame(testData.names);
    // throws on missing list
    expect(() => new OPERATORS.map(testDf, ["full_name | @row.first_name @row.last_name"])).toThrow(
      new Error("Arg validation error")
    );
    // merges data - additional nationality column appended for all entries and populated for available
    const output = new OPERATORS.map(testDf, [
      "id: @row.id",
      "full_name : @row.first_name @row.last_name",
    ]).apply();
    expect(output.columns).toEqual(["id", "full_name"]);
    expect(output.values).toEqual([
      ["id_1", "Ada Lovelace"],
      ["id_2", "Blaise Pascal"],
      ["id_3", "Charles Babbage"],
      ["id_4", "Daniel Bernoulli"],
    ]);
  });
  it("merge", () => {
    const testDf = new DataFrame(testData.names);
    const testPipe: DataPipe = new DataPipe([], testData);
    // throws on missing list
    expect(() => new OPERATORS.merge(testDf, ["names", "missing_list"], testPipe)).toThrow(
      new Error("Arg validation error")
    );
    // merges data - additional nationality column appended for all entries and populated for available
    const output = new OPERATORS.merge(testDf, ["merge_nationality"], testPipe).apply();
    const expectedOutput = ["British", "French", undefined, undefined];
    expect(output.column("nationality").values).toEqual(expectedOutput);
  });
});
