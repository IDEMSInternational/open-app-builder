import { DataFrame } from "danfojs";
import filters from "./filter";
import testData from "../testData.spec";
const { filter, filter_any } = filters;

describe("Filter", () => {
  it("Filters data with ALL condtion", () => {
    const testDf = new DataFrame(testData.names);
    const output = new filter(testDf, [
      "last_name.startsWith('B')",
      "year_of_birth > 1750",
    ]).apply();
    const outputIDs = output.column("id").values;
    expect(outputIDs).toEqual(["id_3"]);
  });
  it("Filters datawith ANY condition", () => {
    const testDf = new DataFrame(testData.names);
    const output = new filter_any(testDf, [
      "last_name.startsWith('B')",
      "year_of_birth > 1750",
    ]).apply();
    const outputIDs = output.column("id").values;
    expect(outputIDs).toEqual(["id_1", "id_3", "id_4"]);
  });
});
