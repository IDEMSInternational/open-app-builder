import { DataFrame } from "danfojs";
import { DataPipe } from "../pipe";
import testData from "../testData.spec";
import concat from "./concat";

(testData as any).concat_names = [
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
];

describe("Concat Operator", () => {
  const emptyDf = new DataFrame([]);
  const testPipe: DataPipe = new DataPipe([], testData);
  it("Throws on missing data_list", () => {
    expect(() => new concat(emptyDf, ["missing_list"], testPipe)).toThrowError(
      "Arg validation error"
    );
  });
  it("Throws if concatenating lists with duplicate ids", () => {
    const duplicateDf = new DataFrame([{ id: "id_3", first_name: "Duplicated" }]);
    expect(() => new concat(duplicateDf, ["names"], testPipe).apply()).toThrowError(
      "Multiple entries exist for index: id_3"
    );
  });
  it("concatenates multiple lists", () => {
    const output = new concat(emptyDf, ["names", "concat_names"], testPipe).apply();
    expect(output.index).toEqual(["id_1", "id_2", "id_3", "id_4", "id_5", "id_6"]);
    const expectedCols = ["id", "first_name", "last_name", "year_of_birth", "additonal_field"];
    expect(output.columns).toEqual(expectedCols);
  });
});
