import { DataFrame } from "danfojs";
import testData from "../testData.spec";
import map from "./map";

describe("Map Operator", () => {
  const testDf = new DataFrame(testData.names);
  it("Throws on missing list", () => {
    // throws on missing list
    expect(() => new map(testDf, ["full_name | @row.first_name @row.last_name"])).toThrow(
      new Error("Arg validation error")
    );
  });
  it("Maps data with dynamic entries", () => {
    // merges data - additional nationality column appended for all entries and populated for available
    const output = new map(testDf, [
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
});
