import { DataFrame } from "danfojs";
import { OPERATORS } from ".";
import { DataPipe } from "../pipe";

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
      first_name: "override",
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
  describe("concat", () => {
    const emptyDf = new DataFrame([]);
    const testPipe: DataPipe = new DataPipe([], testData);
    it("Throws on missing data_list", () => {
      expect(() => new OPERATORS.concat(emptyDf, ["missing_list"], testPipe)).toThrowError(
        "Arg validation error"
      );
    });
    it("Throws on duplicate rows", () => {
      const duplicateDf = new DataFrame([{ id: "id_3", first_name: "Duplicated" }]);
      expect(() => new OPERATORS.concat(duplicateDf, ["names"], testPipe).apply()).toThrowError(
        "Multiple entries exist for index: id_3"
      );
    });
    it("concatenates multiple lists", () => {
      const output = new OPERATORS.concat(emptyDf, ["names", "concat_names"], testPipe).apply();
      expect(output.index).toEqual(["id_1", "id_2", "id_3", "id_4", "id_5", "id_6"]);
      const expectedCols = ["id", "first_name", "last_name", "year_of_birth", "additonal_field"];
      expect(output.columns).toEqual(expectedCols);
    });
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
  it("map", () => {
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
  describe("merge", () => {
    const testDf = new DataFrame(testData.names);
    const testPipe: DataPipe = new DataPipe([], testData);

    it("Throws on missing list", () => {
      // throws on missing list
      expect(() => new OPERATORS.merge(testDf, ["names", "missing_list"], testPipe)).toThrow(
        new Error("Arg validation error")
      );
    });
    it("Merges multiple lists", () => {
      // merges data - additional nationality column appended for all entries and populated for available
      const output = new OPERATORS.merge(testDf, ["merge_nationality"], testPipe).apply();
      expect(output.index).toEqual(["id_1", "id_2", "id_3", "id_4"]);
      // merges new nationality column
      const expectedNationalities = ["British", "French", undefined, undefined];
      expect(output.column("nationality").values).toEqual(expectedNationalities);
      // merges existing name overrides
      const expectedNames = ["override", "Blaise", "Charles", "Daniel"];
      expect(output.column("first_name").values).toEqual(expectedNames);
    });
  });
});
